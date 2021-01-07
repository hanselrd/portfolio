import { RootState, dependencies } from "@/ducks";
import { Location } from "history";
import { Reducer } from "redux";
import { Epic, combineEpics, ofType } from "redux-observable";
import { Observable } from "rxjs";
import { ignoreElements, map, switchMap, tap } from "rxjs/operators";
import { ActionType, createAction, getType } from "typesafe-actions";

export const routerActions = {
  internal: {
    locationChanged: createAction(
      "@@router-internal/LOCATION CHANGED",
      (location: Location) => location
    )(),
  },
  start: createAction("@@router/START")(),
  push: createAction("@@router/PUSH", (path: string, state?: any) => ({
    path,
    state,
  }))(),
  replace: createAction("@@router/REPLACE", (path: string, state?: any) => ({
    path,
    state,
  }))(),
  go: createAction("@@router/GO", (n: number) => n)(),
  back: createAction("@@router/BACK")(),
  forward: createAction("@@router/FORWARD")(),
};

export type RouterAction = ActionType<typeof routerActions>;

export type RouterEpic = Epic<RouterAction, RouterAction, RootState, typeof dependencies>;

export const routerEpics = {
  start: ((action$, state$, { history }) =>
    action$.pipe(
      ofType(getType(routerActions.start)),
      switchMap(
        () =>
          new Observable<Location>((observer) =>
            history.listen((update) => observer.next(update.location))
          )
      ),
      map((location) => routerActions.internal.locationChanged(location))
    )) as RouterEpic,
  push: ((action$, state$, { history }) =>
    action$.pipe(
      ofType(getType(routerActions.push)),
      tap((action) => {
        const { path, state } = (action as ReturnType<typeof routerActions.push>).payload;
        history.push(path, state);
      }),
      ignoreElements()
    )) as RouterEpic,
  replace: ((action$, state$, { history }) =>
    action$.pipe(
      ofType(getType(routerActions.replace)),
      tap((action) => {
        const { path, state } = (action as ReturnType<typeof routerActions.replace>).payload;
        history.replace(path, state);
      }),
      ignoreElements()
    )) as RouterEpic,
  go: ((action$, state$, { history }) =>
    action$.pipe(
      ofType(getType(routerActions.go)),
      tap((action) => {
        history.go((action as ReturnType<typeof routerActions.go>).payload);
      }),
      ignoreElements()
    )) as RouterEpic,
  back: ((action$, state$, { history }) =>
    action$.pipe(
      ofType(getType(routerActions.back)),
      tap(() => history.back()),
      ignoreElements()
    )) as RouterEpic,
  forward: ((action$, state$, { history }) =>
    action$.pipe(
      ofType(getType(routerActions.forward)),
      tap(() => history.forward()),
      ignoreElements()
    )) as RouterEpic,
};

export const routerEpic = combineEpics<RouterEpic>(
  routerEpics.start,
  routerEpics.push,
  routerEpics.replace,
  routerEpics.go,
  routerEpics.back,
  routerEpics.forward
);

export type RouterState = Readonly<{ location?: Location }>;

const reducer: Reducer<RouterState, RouterAction> = (
  state: RouterState = {},
  action: RouterAction
) => {
  switch (action.type) {
    case getType(routerActions.internal.locationChanged):
      return { ...state, location: action.payload };
    default:
      return state;
  }
};

export default reducer;
