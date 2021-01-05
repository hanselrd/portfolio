import { Reducer } from "redux";
import { combineEpics, ofType, Epic } from "redux-observable";
import { map, tap, withLatestFrom } from "rxjs/operators";
import { createAction, getType, ActionType } from "typesafe-actions";
import { dependencies, RootState } from "../ducks";

export const localeActions = {
  internal: {
    languageChanged: createAction(
      "@@locale-internal/LANGUAGE CHANGED",
      (language: string) => language
    )(),
  },
  start: createAction("@@locale/START")(),
  change: createAction("@@locale/CHANGE", (language: string) => language)(),
};

export type LocaleAction = ActionType<typeof localeActions>;

export type LocaleEpic = Epic<LocaleAction, LocaleAction, RootState, typeof dependencies>;

export const localeEpics = {
  start: ((action$, state$, { localization }) =>
    action$.pipe(
      ofType(getType(localeActions.start)),
      withLatestFrom(state$),
      map(([, state]) =>
        localeActions.internal.languageChanged(
          state.locale.language ? state.locale.language : localization.getLanguage()
        )
      ),
      tap((action) =>
        localization.setLanguage(
          (action as ReturnType<typeof localeActions.internal.languageChanged>).payload
        )
      )
    )) as LocaleEpic,
  change: ((action$, state$, { localization }) =>
    action$.pipe(
      ofType(getType(localeActions.change)),
      tap((action) =>
        localization.setLanguage((action as ReturnType<typeof localeActions.change>).payload)
      ),
      map((action) =>
        localeActions.internal.languageChanged(
          (action as ReturnType<typeof localeActions.change>).payload
        )
      )
    )) as LocaleEpic,
};

export const localeEpic = combineEpics<LocaleEpic>(localeEpics.start, localeEpics.change);

export type LocaleState = Readonly<{ language?: string }>;

const reducer: Reducer<LocaleState, LocaleAction> = (
  state: LocaleState = {},
  action: LocaleAction
) => {
  switch (action.type) {
    case getType(localeActions.internal.languageChanged):
      return { ...state, language: action.payload };
    default:
      return state;
  }
};

export default reducer;
