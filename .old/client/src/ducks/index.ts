import { combineReducers } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import history from '../core/history';
import localization from '../core/localization';
import authReducer, { AuthAction, authEpic, AuthEpic, AuthState } from './auth';
import localeReducer, { LocaleAction, localeEpic, LocaleEpic, LocaleState } from './locale';
import routerReducer, { RouterAction, routerEpic, RouterEpic, RouterState } from './router';

export const dependencies = {
  history,
  localization,
  localStorage
};

export type RootState = Readonly<{ auth: AuthState; locale: LocaleState; router: RouterState }>;
export type RootAction = AuthAction & LocaleAction & RouterAction;

export type RootEpic = AuthEpic | LocaleEpic | RouterEpic;

export const rootEpic = combineEpics<RootEpic>(authEpic, localeEpic, routerEpic);

export default combineReducers<RootState, RootAction>({
  auth: authReducer,
  locale: localeReducer,
  router: routerReducer
});
