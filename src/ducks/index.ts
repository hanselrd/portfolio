import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import history from '../core/history';
import localization from '../core/localization';
import localeReducer, { LocaleAction, localeEpic, LocaleEpic, LocaleState } from './locale';

export const dependencies = {
  history,
  localization,
  localStorage
};

export type RootState = Readonly<{ locale: LocaleState }>;

export type RootAction = LocaleAction; // &

export type RootEpic = LocaleEpic; // |

export const rootEpic = combineEpics<RootEpic>(localeEpic);

export default combineReducers<RootState, RootAction>({ locale: localeReducer });
