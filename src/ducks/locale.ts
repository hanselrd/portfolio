import { Reducer } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { map, mapTo, tap } from 'rxjs/operators';
import { ActionType, createAction, getType } from 'typesafe-actions';
import { dependencies, RootState } from '../ducks';

export const localeActions = {
  internal: {
    languageChanged: createAction(
      '@@locale-internal/LANGUAGE CHANGED',
      (language: string) => language
    )()
  },
  start: createAction('@@locale/START')(),
  change: createAction('@@locale/CHANGE', (language: string) => language)(),
  showModal: createAction('@@locale/SHOW MODAL')(),
  hideModal: createAction('@@locale/HIDE MODAL')(),
  toggleModal: createAction('@@locale/TOGGLE MODAL')()
};

export type LocaleAction = ActionType<typeof localeActions>;

export type LocaleEpic = Epic<LocaleAction, LocaleAction, RootState, typeof dependencies>;

export const localeEpics = {
  start: ((action$, state$, { localization }) =>
    action$.pipe(
      ofType(getType(localeActions.start)),
      mapTo(localeActions.internal.languageChanged(localization.getLanguage()))
    )) as LocaleEpic,
  change: ((action$, state$, { localization }) =>
    action$.pipe(
      ofType(getType(localeActions.change)),
      tap(action =>
        localization.setLanguage((action as ReturnType<typeof localeActions.change>).payload)
      ),
      map(action =>
        localeActions.internal.languageChanged(
          (action as ReturnType<typeof localeActions.change>).payload
        )
      )
    )) as LocaleEpic
};

export const localeEpic = combineEpics<LocaleEpic>(localeEpics.start, localeEpics.change);

export type LocaleState = Readonly<{ language?: string; showModal: boolean }>;

const reducer: Reducer<LocaleState, LocaleAction> = (
  state: LocaleState = {
    showModal: false
  },
  action: LocaleAction
) => {
  switch (action.type) {
    case getType(localeActions.internal.languageChanged):
      return { ...state, language: action.payload };
    case getType(localeActions.showModal):
      return { ...state, showModal: true };
    case getType(localeActions.hideModal):
      return { ...state, showModal: false };
    case getType(localeActions.toggleModal):
      return { ...state, showModal: !state.showModal };
    default:
      return state;
  }
};

export default reducer;
