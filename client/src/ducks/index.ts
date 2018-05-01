import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import authReducer, { AuthEpic, AuthState, authEpic } from './auth';
import chatReducer, { ChatEpic, ChatState, chatEpic } from './chat';
import routerReducer, { RouterEpic, RouterState, routerEpic } from './router';
import usersReducer, { UsersEpic, UsersState, usersEpic } from './users';

export type RootEpic = AuthEpic | ChatEpic | RouterEpic | UsersEpic;

export const rootEpic = combineEpics<RootEpic>(
  authEpic,
  chatEpic,
  routerEpic,
  usersEpic
);

export type RootState = Readonly<{
  auth: AuthState;
  chat: ChatState;
  router: RouterState;
  users: UsersState;
}>;

export default combineReducers<RootState>({
  auth: authReducer,
  chat: chatReducer,
  router: routerReducer,
  users: usersReducer
});
