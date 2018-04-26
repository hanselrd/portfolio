import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import authReducer, { AuthState, authSaga } from './auth';

export const rootSaga = function*() {
  yield all([fork(authSaga)]);
};

export type RootState = Readonly<{
  auth: AuthState;
}>;

export default combineReducers<RootState>({
  auth: authReducer
});
