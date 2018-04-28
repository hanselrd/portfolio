import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import authReducer, { AuthEpic, AuthState, authEpic } from './auth';
import chatReducer, { ChatEpic, ChatState, chatEpic } from './chat';

export type RootEpic = AuthEpic | ChatEpic;

export const rootEpic = combineEpics<RootEpic>(authEpic, chatEpic);

export type RootState = Readonly<{
  auth: AuthState;
  chat: ChatState;
}>;

export default combineReducers<RootState>({
  auth: authReducer,
  chat: chatReducer
});
