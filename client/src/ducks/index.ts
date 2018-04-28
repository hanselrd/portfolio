import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { all, fork } from 'redux-saga/effects';
import authReducer, { AuthState, authSaga } from './auth';
import chatReducer, { ChatState, chatEpic, ChatEpic } from './chat';

export const rootSaga = function*() {
  yield all([fork(authSaga)]);
};

export type RootEpic = ChatEpic;

export const rootEpic = combineEpics<RootEpic>(chatEpic);

export type RootState = Readonly<{
  auth: AuthState;
  chat: ChatState;
}>;

export default combineReducers<RootState>({
  auth: authReducer,
  chat: chatReducer
});
