import firebase from '@app/core/firebase';
import { RootState } from '@app/ducks';
import { createAction, createReducer } from 'redux-act';
import { Epic, combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import { authActions } from './auth';

interface IMessage {
  user: string;
  text: string;
  created: number;
}

interface IMessages {
  [messageId: string]: IMessage;
}

interface IStatus {
  enabled: boolean;
}

export const chatActions = {
  internal: {
    messageAdded: createAction<{ id: string; message: IMessage }>(
      '@@chat/MESSAGE ADDED'
    ),
    messageRemoved: createAction<{ id: string; message: IMessage }>(
      '@@chat/MESSAGE REMOVED'
    ),
    statusUpdated: createAction<IStatus>('@@chat/STATUS UPDATED')
  },
  sendMessage: createAction<string>('@@chat/SEND MESSAGE'),
  deleteMessage: createAction<string>('@@chat/DELETE MESSAGE')
};

export type ChatEpic = Epic<
  | ReturnType<typeof authActions.internal.userFound>
  | ReturnType<typeof authActions.internal.userMissing>
  | ReturnType<typeof chatActions.internal.messageAdded>
  | ReturnType<typeof chatActions.internal.messageRemoved>
  | ReturnType<typeof chatActions.internal.statusUpdated>
  | ReturnType<typeof chatActions.sendMessage>
  | ReturnType<typeof chatActions.deleteMessage>,
  RootState
>;

const chatRef = firebase.database().ref('chat');
const messagesRef = chatRef.child('messages');
const statusRef = chatRef.child('status');

const startMessageAddedEpic: ChatEpic = action$ =>
  action$.ofType(authActions.internal.userFound.getType()).switchMap(() =>
    Observable.fromEvent<firebase.database.DataSnapshot>(
      messagesRef as any,
      'child_added'
    )
      .filter(snapshot => snapshot && snapshot.key !== null)
      .map(snapshot =>
        chatActions.internal.messageAdded({
          id: snapshot.key!,
          message: snapshot.val()
        })
      )
  );

const startMessageRemovedEpic: ChatEpic = action$ =>
  action$.ofType(authActions.internal.userFound.getType()).switchMap(() =>
    Observable.fromEvent<firebase.database.DataSnapshot>(
      messagesRef as any,
      'child_removed'
    )
      .filter(snapshot => snapshot && snapshot.key !== null)
      .map(snapshot =>
        chatActions.internal.messageRemoved({
          id: snapshot.key!,
          message: snapshot.val()
        })
      )
  );

const startStatusUpdatedEpic: ChatEpic = action$ =>
  action$.ofType(authActions.internal.userFound.getType()).switchMap(() =>
    Observable.fromEvent<firebase.database.DataSnapshot>(
      statusRef as any,
      'value'
    )
      .filter(snapshot => snapshot !== null)
      .map(snapshot => chatActions.internal.statusUpdated(snapshot.val()))
  );

const startEpic = combineEpics<ChatEpic>(
  startMessageAddedEpic,
  startMessageRemovedEpic,
  startStatusUpdatedEpic
);

const sendMessageEpic: ChatEpic = (action$, store) =>
  action$
    .ofType(chatActions.sendMessage.getType())
    .throttleTime(1000)
    .filter(() => store.getState().auth.user !== null)
    .filter(() => store.getState().chat.status.enabled)
    // filter if banned
    .switchMap(action =>
      Observable.from(
        messagesRef.push().set({
          user: store.getState().auth.user!.uid,
          text: action.payload,
          created: firebase.database.ServerValue.TIMESTAMP
        })
      )
    )
    .switchMap(() => Observable.empty<never>())
    .retry();

const deleteMessageEpic: ChatEpic = (action$, store) =>
  action$
    .ofType(chatActions.deleteMessage.getType())
    .filter(() => store.getState().auth.user !== null)
    .filter(
      () =>
        store.getState().metadata.users[store.getState().auth.user!.uid]
          .role !== null
    )
    .filter(
      () =>
        store.getState().metadata.users[store.getState().auth.user!.uid]
          .role! >= 10
    )
    .switchMap(action =>
      Observable.from(messagesRef.child(action.payload as string).remove())
    )
    .switchMap(() => Observable.empty<never>())
    .retry();

export const chatEpic = combineEpics<ChatEpic>(
  startEpic,
  sendMessageEpic,
  deleteMessageEpic
);

export type ChatState = Readonly<{
  messages: IMessages;
  status: IStatus;
}>;

const reducer = createReducer<ChatState>(
  {},
  { messages: {}, status: { enabled: false } }
);

reducer.on(chatActions.internal.messageAdded, (state, payload) => ({
  ...state,
  messages: { ...state.messages, [payload.id]: payload.message }
}));

reducer.on(chatActions.internal.messageRemoved, (state, payload) => {
  const { [payload.id]: omit, ...messages } = state.messages;
  return { ...state, messages };
});

reducer.on(chatActions.internal.statusUpdated, (state, payload) => ({
  ...state,
  status: payload
}));

reducer.on(authActions.internal.userMissing, (state, payload) => ({
  ...state,
  messages: {}
}));

export default reducer;
