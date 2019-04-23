import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import authReducer, { AuthAction, authSaga, AuthState } from './auth';
import routerReducer, { RouterAction, routerSaga, RouterState } from './router';

export const rootSaga = function*() {
  yield all([fork(authSaga), fork(routerSaga)]);
};

export type RootState = Readonly<{ auth: AuthState; router: RouterState }>;
export type RootAction = AuthAction & RouterAction;

export default combineReducers<RootState, RootAction>({ auth: authReducer, router: routerReducer });
