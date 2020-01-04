import { Location } from 'history';
import { Reducer } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { ignoreElements, map, switchMap, tap } from 'rxjs/operators';
import { ActionType, createAction, getType } from 'typesafe-actions';
import { dependencies, RootState } from '../ducks';

export const routerActions = {
  internal: {
    locationChanged: createAction('@@router/LOCATION CHANGED', action => (location: Location) =>
      action({ location })
    )
  },
  start: createAction('@@router/START', action => () => action()),
  push: createAction('@@router/PUSH', action => (path: string, state?: any) =>
    action({ path, state })
  ),
  replace: createAction('@@router/REPLACE', action => (path: string, state?: any) =>
    action({ path, state })
  ),
  go: createAction('@@router/GO', action => (n: number) => action({ n })),
  goBack: createAction('@@router/GO BACK', action => () => action()),
  goForward: createAction('@@router/GO FORWARD', action => () => action())
};

export type RouterAction = ActionType<typeof routerActions>;

export type RouterEpic = Epic<RouterAction, RouterAction, RootState, typeof dependencies>;

export const routerEpics = {
  start: ((action$, state$, { history }) =>
    action$.pipe(
      ofType(getType(routerActions.start)),
      switchMap(
        () =>
          new Observable<Location>(observer => history.listen(location => observer.next(location)))
      ),
      map(location => routerActions.internal.locationChanged(location))
    )) as RouterEpic,
  push: ((action$, state$, { history }) =>
    action$.pipe(
      ofType(getType(routerActions.push)),
      tap(action => {
        const { path, state } = (action as ReturnType<typeof routerActions.push>).payload;
        history.push(path, state);
      }),
      ignoreElements()
    )) as RouterEpic,
  replace: ((action$, state$, { history }) =>
    action$.pipe(
      ofType(getType(routerActions.replace)),
      tap(action => {
        const { path, state } = (action as ReturnType<typeof routerActions.replace>).payload;
        history.replace(path, state);
      }),
      ignoreElements()
    )) as RouterEpic,
  go: ((action$, state$, { history }) =>
    action$.pipe(
      ofType(getType(routerActions.go)),
      tap(action => {
        const { n } = (action as ReturnType<typeof routerActions.go>).payload;
        history.go(n);
      }),
      ignoreElements()
    )) as RouterEpic,
  goBack: ((action$, state$, { history }) =>
    action$.pipe(
      ofType(getType(routerActions.goBack)),
      tap(() => history.goBack()),
      ignoreElements()
    )) as RouterEpic,
  goForward: ((action$, state$, { history }) =>
    action$.pipe(
      ofType(getType(routerActions.goForward)),
      tap(() => history.goBack()),
      ignoreElements()
    )) as RouterEpic
};

export const routerEpic = combineEpics<RouterEpic>(
  routerEpics.start,
  routerEpics.push,
  routerEpics.replace,
  routerEpics.go,
  routerEpics.goBack,
  routerEpics.goForward
);

export type RouterState = Readonly<{ location?: Location }>;

const reducer: Reducer<RouterState, RouterAction> = (
  state: RouterState = {},
  action: RouterAction
) => {
  switch (action.type) {
    case getType(routerActions.internal.locationChanged):
      return { ...state, location: action.payload.location };
    default:
      return state;
  }
};

export default reducer;
