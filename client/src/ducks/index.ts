import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import authReducer, { AuthEpic, AuthState, authEpic } from './auth';
import chatReducer, { ChatEpic, ChatState, chatEpic } from './chat';
import usersReducer, { UsersEpic, UsersState, usersEpic } from './users';

export type RootEpic = AuthEpic | ChatEpic | UsersEpic;

export const rootEpic = combineEpics<RootEpic>(authEpic, chatEpic, usersEpic);

export type RootState = Readonly<{
  auth: AuthState;
  chat: ChatState;
  users: UsersState;
}>;

export default combineReducers<RootState>({
  auth: authReducer,
  chat: chatReducer,
  users: usersReducer
});
