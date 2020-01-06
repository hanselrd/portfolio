import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import history from '../core/history';
import localization from '../core/localization';
import localeReducer, { LocaleAction, localeEpic, LocaleEpic, LocaleState } from './locale';
import routerReducer, { RouterAction, routerEpic, RouterEpic, RouterState } from './router';

export const dependencies = {
  history,
  localization,
  localStorage
};

export type RootState = Readonly<{ locale: LocaleState; router: RouterState }>;

export type RootAction = LocaleAction & RouterAction;

export type RootEpic = LocaleEpic | RouterEpic;

export const rootEpic = combineEpics<RootEpic>(localeEpic, routerEpic);

export default combineReducers<RootState, RootAction>({
  locale: localeReducer,
  router: routerReducer
});
