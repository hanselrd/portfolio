import { Location } from 'history';
import { Reducer } from 'redux';
import { eventChannel } from 'redux-saga';
import { all, call, put, take, takeLatest } from 'redux-saga/effects';
import { ActionType, createAction, getType } from 'typesafe-actions';
import history from '../core/history';

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

export const routerServices = {
  subscribe: () =>
    eventChannel(emit => {
      return history.listen(location => {
        emit(routerActions.internal.locationChanged(location));
      });
    }),
  push: (path: string, state?: any) => history.push(path, state),
  replace: (path: string, state?: any) => history.replace(path, state),
  go: (n: number) => history.go(n),
  goBack: () => history.goBack(),
  goForward: () => history.goForward()
};

export const routerSagas = {
  *start() {
    const channel = yield call(routerServices.subscribe);
    while (true) {
      const action = yield take(channel);
      yield put(action);
    }
  },
  *push(action: ReturnType<typeof routerActions.push>) {
    const { path, state } = action.payload;
    yield call(routerServices.push, path, state);
  },
  *replace(action: ReturnType<typeof routerActions.replace>) {
    const { path, state } = action.payload;
    yield call(routerServices.replace, path, state);
  },
  *go(action: ReturnType<typeof routerActions.go>) {
    const { n } = action.payload;
    yield call(routerServices.go, n);
  },
  *goBack() {
    yield call(routerServices.goBack);
  },
  *goForward() {
    yield call(routerServices.goForward);
  }
};

export const routerSaga = function*() {
  yield all([
    takeLatest(getType(routerActions.start), routerSagas.start),
    takeLatest(getType(routerActions.push), routerSagas.push),
    takeLatest(getType(routerActions.replace), routerSagas.replace),
    takeLatest(getType(routerActions.go), routerSagas.go),
    takeLatest(getType(routerActions.goBack), routerSagas.goBack),
    takeLatest(getType(routerActions.goForward), routerSagas.goForward)
  ]);
};

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
