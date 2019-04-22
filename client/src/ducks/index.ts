import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import authReducer, { AuthAction, authSaga, AuthState } from './auth';

export const rootSaga = function*() {
  yield all([fork(authSaga)]);
};

export type RootState = Readonly<{ auth: AuthState }>;
export type RootAction = AuthAction;

export default combineReducers<RootState, RootAction>({ auth: authReducer });
