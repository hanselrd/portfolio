import firebase from '@app/core/firebase';
import { RootState } from '@app/ducks';
import { createAction, createReducer } from 'redux-act';
import { Epic, combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import { authActions } from './auth';

interface IMessage {
  uid: string;
  text: string;
  created: number;
}

interface IMessages {
  [pushid: string]: IMessage;
}

export const chatActions = {
  internal: {
    messageAdded: createAction<{ id: string; message: IMessage }>(
      '@@chat/MESSAGE ADDED'
    ),
    messageRemoved: createAction<{ id: string; message: IMessage }>(
      '@@chat/MESSAGE REMOVED'
    ),
    enabledUpdated: createAction<boolean>('@@chat/ENABLED UPDATED')
  },
  sendMessage: createAction<string>('@@chat/SEND MESSAGE'),
  deleteMessage: createAction<string>('@@chat/DELETE MESSAGE')
};

export type ChatEpic = Epic<
  | ReturnType<typeof authActions.internal.userFound>
  | ReturnType<typeof authActions.internal.userMissing>
  | ReturnType<typeof chatActions.internal.messageAdded>
  | ReturnType<typeof chatActions.internal.messageRemoved>
  | ReturnType<typeof chatActions.internal.enabledUpdated>
  | ReturnType<typeof chatActions.sendMessage>
  | ReturnType<typeof chatActions.deleteMessage>,
  RootState
>;

const chatRef = firebase.database().ref('chat');
const messagesRef = chatRef.child('messages');
const enabledRef = chatRef.child('enabled');
const getQueueMessagesRef = (user: firebase.User) =>
  firebase
    .database()
    .ref('queue/chat/messages')
    .child(user.uid);

const startEpic: ChatEpic = action$ =>
  action$.ofType(authActions.internal.userFound.getType()).switchMap(() =>
    Observable.merge(
      Observable.fromEvent<firebase.database.DataSnapshot | null>(
        messagesRef as any,
        'child_added'
      )
        .filter(snapshot => snapshot != null && snapshot.key != null)
        .map(snapshot =>
          chatActions.internal.messageAdded({
            id: snapshot!.key!,
            message: snapshot!.val()
          })
        ),
      Observable.fromEvent<firebase.database.DataSnapshot | null>(
        messagesRef as any,
        'child_removed'
      )
        .filter(snapshot => snapshot != null && snapshot.key != null)
        .map(snapshot =>
          chatActions.internal.messageRemoved({
            id: snapshot!.key!,
            message: snapshot!.val()
          })
        ),
      Observable.fromEvent<firebase.database.DataSnapshot | null>(
        enabledRef as any,
        'value'
      )
        .filter(snapshot => snapshot != null)
        .map(snapshot => chatActions.internal.enabledUpdated(snapshot!.val()))
    )
  );

const sendMessageEpic: ChatEpic = (action$, store) =>
  action$
    .ofType(chatActions.sendMessage.getType())
    .throttleTime(1000)
    .filter(() => store.getState().auth.user != null)
    .filter(() => store.getState().chat.enabled)
    // filter if banned
    .switchMap(action =>
      Observable.from(
        getQueueMessagesRef(store.getState().auth.user!)
          .push()
          .set(action.payload)
      )
    )
    .switchMap(() => Observable.empty<never>())
    .retry();

// broken @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
const deleteMessageEpic: ChatEpic = (action$, store) =>
  action$
    .ofType(chatActions.deleteMessage.getType())
    .filter(() => store.getState().auth.user != null)
    .filter(
      () => store.getState().users[store.getState().auth.user!.uid].role >= 10
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
  enabled: boolean;
}>;

const reducer = createReducer<ChatState>({}, { messages: {}, enabled: false });

reducer.on(chatActions.internal.messageAdded, (state, payload) => ({
  ...state,
  messages: { ...state.messages, [payload.id]: payload.message }
}));

reducer.on(chatActions.internal.messageRemoved, (state, payload) => {
  const { [payload.id]: omit, ...messages } = state.messages;
  return { ...state, messages };
});

reducer.on(chatActions.internal.enabledUpdated, (state, payload) => ({
  ...state,
  enabled: payload
}));

reducer.on(authActions.internal.userMissing, (state, payload) => ({
  ...state,
  messages: {}
}));

export default reducer;
