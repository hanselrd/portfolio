import { Reducer } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { map, mapTo, tap } from 'rxjs/operators';
import { ActionType, createAction, getType } from 'typesafe-actions';
import { dependencies, RootState } from '../ducks';

export const localeActions = {
  internal: {
    languageChanged: createAction('@@locale/LANGUAGE CHANGED', action => (language: string) =>
      action({ language })
    )
  },
  start: createAction('@@locale/START', action => () => action()),
  change: createAction('@@locale/CHANGE', action => (language: string) => action({ language })),
  showModal: createAction('@@locale/SHOW MODAL', action => () => action()),
  hideModal: createAction('@@locale/HIDE MODAL', action => () => action())
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
        localization.setLanguage(
          (action as ReturnType<typeof localeActions.change>).payload.language
        )
      ),
      map(action =>
        localeActions.internal.languageChanged(
          (action as ReturnType<typeof localeActions.change>).payload.language
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
      return { ...state, language: action.payload.language };
    case getType(localeActions.showModal):
      return { ...state, showModal: true };
    case getType(localeActions.hideModal):
      return { ...state, showModal: false };
    default:
      return state;
  }
};

export default reducer;
