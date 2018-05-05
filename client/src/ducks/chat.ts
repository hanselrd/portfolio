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

interface IBan {
  uid: string;
  text: string;
}

interface IBans {
  [uid: string]: IBan;
}

export const chatActions = {
  internal: {
    messageAdded: createAction<{ id: string; message: IMessage }>(
      '@@chat/MESSAGE ADDED'
    ),
    messageRemoved: createAction<{ id: string; message: IMessage }>(
      '@@chat/MESSAGE REMOVED'
    ),
    enabledUpdated: createAction<boolean>('@@chat/ENABLED UPDATED'),
    banUpdated: createAction<{ id: string; ban: IBan }>('@@chat/BAN UPDATED')
  },
  start: createAction('@@chat/START'),
  sendMessage: createAction<string>('@@chat/SEND MESSAGE'),
  deleteMessage: createAction<string>('@@chat/DELETE MESSAGE'),
  loadBan: createAction<string>('@@chat/LOAD BAN')
};

export type ChatEpic = Epic<
  | ReturnType<typeof authActions.internal.userFound>
  | ReturnType<typeof authActions.internal.userMissing>
  | ReturnType<typeof chatActions.internal.messageAdded>
  | ReturnType<typeof chatActions.internal.messageRemoved>
  | ReturnType<typeof chatActions.internal.enabledUpdated>
  | ReturnType<typeof chatActions.internal.banUpdated>
  | ReturnType<typeof chatActions.start>
  | ReturnType<typeof chatActions.sendMessage>
  | ReturnType<typeof chatActions.deleteMessage>
  | ReturnType<typeof chatActions.loadBan>,
  RootState
>;

const chatRef = firebase.database().ref('chat');
const messagesRef = chatRef.child('messages');
const enabledRef = chatRef.child('enabled');
const getBanRef = (uid: string) => chatRef.child('bans').child(uid);
const getQueueMessagesRef = (user: firebase.User) =>
  firebase
    .database()
    .ref('queue/chat/messages')
    .child(user.uid);

const startEpic: ChatEpic = action$ =>
  Observable.merge(
    action$.ofType(chatActions.start.getType()).switchMap(() =>
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
    ),
    action$
      .ofType(authActions.internal.userFound.getType())
      .map(action => chatActions.loadBan((action.payload as firebase.User).uid))
  );

const sendMessageEpic: ChatEpic = (action$, store) =>
  action$
    .ofType(chatActions.sendMessage.getType())
    .throttleTime(1000)
    .filter(() => store.getState().auth.user != null)
    .filter(() => store.getState().chat.enabled)
    .filter(
      () => store.getState().chat.bans[store.getState().auth.user!.uid] == null
    )
    .do(action =>
      getQueueMessagesRef(store.getState().auth.user!)
        .push()
        .set(action.payload)
    )
    .ignoreElements()
    .retry();

const deleteMessageEpic: ChatEpic = (action$, store) =>
  action$
    .ofType(chatActions.deleteMessage.getType())
    .filter(() => store.getState().auth.user != null)
    .filter(
      () => store.getState().users[store.getState().auth.user!.uid].role >= 10
    )
    .do(action => messagesRef.child(action.payload as string).remove())
    .ignoreElements()
    .retry();

const loadBanEpic: ChatEpic = (action$, store) =>
  action$
    .ofType(chatActions.loadBan.getType())
    .filter(() => store.getState().auth.user != null)
    .switchMap(action =>
      Observable.fromEvent<firebase.database.DataSnapshot | null>(
        getBanRef(action.payload as string) as any,
        'value'
      )
        .filter(snapshot => snapshot != null && snapshot.key != null)
        .map(snapshot =>
          chatActions.internal.banUpdated({
            id: snapshot!.key!,
            ban: snapshot!.val()
          })
        )
    );

export const chatEpic = combineEpics<ChatEpic>(
  startEpic,
  sendMessageEpic,
  deleteMessageEpic,
  loadBanEpic
);

export type ChatState = Readonly<{
  messages: IMessages;
  enabled: boolean;
  bans: IBans;
}>;

const reducer = createReducer<ChatState>(
  {},
  { messages: {}, enabled: false, bans: {} }
);

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

reducer.on(chatActions.internal.banUpdated, (state, payload) => ({
  ...state,
  bans: { ...state.bans, [payload.id]: payload.ban }
}));

reducer.on(authActions.internal.userMissing, (state, payload) => ({
  ...state,
  messages: {}
}));

export default reducer;
