import { RootState, dependencies } from "@/ducks";
import { Reducer } from "redux";
import { Epic, combineEpics, ofType } from "redux-observable";
import { map, tap, withLatestFrom } from "rxjs/operators";
import { ActionType, createAction, getType } from "typesafe-actions";

export const themeActions = {
  internal: {
    modeChanged: createAction("@@theme-internal/MODE CHANGED", (mode: string) => mode)(),
  },
  start: createAction("@@theme/START")(),
  change: createAction("@@theme/CHANGE", (mode: string) => mode)(),
};

export type ThemeAction = ActionType<typeof themeActions>;

export type ThemeEpic = Epic<ThemeAction, ThemeAction, RootState, typeof dependencies>;

export const themeEpics = {
  start: ((action$, state$, { document, window }) =>
    action$.pipe(
      ofType(getType(themeActions.start)),
      withLatestFrom(state$),
      map(([, state]) =>
        themeActions.internal.modeChanged(
          state.theme.mode === "dark" ||
            (!state.theme.mode && window.matchMedia("(prefers-color-scheme: dark)").matches)
            ? "dark"
            : "light"
        )
      ),
      tap((action) => {
        if (action.payload === "dark") {
          document?.querySelector("html")?.classList.add("dark");
        } else {
          document?.querySelector("html")?.classList.remove("dark");
        }
      })
    )) as ThemeEpic,
  change: ((action$, state$, { document }) =>
    action$.pipe(
      ofType(getType(themeActions.change)),
      tap((action) => {
        if ((action as ReturnType<typeof themeActions.change>).payload === "dark") {
          document?.querySelector("html")?.classList.add("dark");
        } else {
          document?.querySelector("html")?.classList.remove("dark");
        }
      }),
      map((action) =>
        themeActions.internal.modeChanged(
          (action as ReturnType<typeof themeActions.change>).payload
        )
      )
    )) as ThemeEpic,
};

export const themeEpic = combineEpics<ThemeEpic>(themeEpics.start, themeEpics.change);

export type ThemeState = Readonly<{ mode?: string }>;

const reducer: Reducer<ThemeState, ThemeAction> = (state: ThemeState = {}, action: ThemeAction) => {
  switch (action.type) {
    case getType(themeActions.internal.modeChanged):
      return { ...state, mode: action.payload };
    default:
      return state;
  }
};

export default reducer;
