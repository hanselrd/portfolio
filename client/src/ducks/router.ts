import history from '@app/core/history';
import { RootState } from '@app/ducks';
import { Location } from 'history';
import { createAction, createReducer } from 'redux-act';
import { Epic, combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';

export const routerActions = {
  internal: {
    locationChanged: createAction<Location>('@@router/LOCATION CHANGE')
  },
  start: createAction('@@router/START'),
  push: createAction<string>('@@router/PUSH'),
  replace: createAction<string>('@@router/REPLACE'),
  go: createAction<number>('@@router/GO'),
  goBack: createAction('@@router/GO BACK'),
  goForward: createAction('@@router/GO FORWARD')
};

export type RouterEpic = Epic<
  | ReturnType<typeof routerActions.internal.locationChanged>
  | ReturnType<typeof routerActions.push>
  | ReturnType<typeof routerActions.replace>
  | ReturnType<typeof routerActions.go>
  | ReturnType<typeof routerActions.goBack>
  | ReturnType<typeof routerActions.goForward>,
  RootState
>;

const startEpic: RouterEpic = action$ =>
  action$
    .ofType(routerActions.start.getType())
    .switchMap(() =>
      new Observable<Location>(observer =>
        history.listen(location => observer.next(location))
      ).map(location => routerActions.internal.locationChanged(location))
    )
    .merge(
      action$
        .ofType(routerActions.start.getType())
        .mapTo(routerActions.internal.locationChanged(history.location))
    );

const pushEpic: RouterEpic = action$ =>
  action$
    .ofType(routerActions.push.getType())
    .do(action => history.push(action.payload as string))
    .ignoreElements();

const replaceEpic: RouterEpic = action$ =>
  action$
    .ofType(routerActions.replace.getType())
    .do(action => history.replace(action.payload as string))
    .ignoreElements();

const goEpic: RouterEpic = action$ =>
  action$
    .ofType(routerActions.goBack.getType())
    .do(action => history.go(action.payload as number))
    .ignoreElements();

const goBackEpic: RouterEpic = action$ =>
  action$
    .ofType(routerActions.goBack.getType())
    .do(() => history.goBack())
    .ignoreElements();

const goForwardEpic: RouterEpic = action$ =>
  action$
    .ofType(routerActions.goForward.getType())
    .do(() => history.goForward())
    .ignoreElements();

export const routerEpic = combineEpics<RouterEpic>(
  startEpic,
  pushEpic,
  replaceEpic,
  goEpic,
  goBackEpic,
  goForwardEpic
);

export type RouterState = Readonly<{
  location?: Location;
}>;

const reducer = createReducer<RouterState>({}, {});

reducer.on(routerActions.internal.locationChanged, (state, payload) => ({
  ...state,
  location: payload
}));

export default reducer;
