import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import authReducer, { AuthEpic, AuthState, authEpic } from './auth';
import chatReducer, { ChatEpic, ChatState, chatEpic } from './chat';
import localeReducer, { LocaleEpic, LocaleState, localeEpic } from './locale';
import routerReducer, { RouterEpic, RouterState, routerEpic } from './router';
import usersReducer, { UsersEpic, UsersState, usersEpic } from './users';

export type RootEpic =
  | AuthEpic
  | ChatEpic
  | LocaleEpic
  | RouterEpic
  | UsersEpic;

export const rootEpic = combineEpics<RootEpic>(
  authEpic,
  chatEpic,
  localeEpic,
  routerEpic,
  usersEpic
);

export type RootState = Readonly<{
  auth: AuthState;
  chat: ChatState;
  locale: LocaleState;
  router: RouterState;
  users: UsersState;
}>;

export default combineReducers<RootState>({
  auth: authReducer,
  chat: chatReducer,
  locale: localeReducer,
  router: routerReducer,
  users: usersReducer
});
