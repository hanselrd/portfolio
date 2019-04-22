import { Reducer } from 'redux';
import { eventChannel } from 'redux-saga';
import { all, call, put, take, takeLatest } from 'redux-saga/effects';
import { ActionType, createAction, getType } from 'typesafe-actions';

interface IUser {
  email: string;
  password: string;
  created: number;
}

export const authActions = {
  internal: {
    userFound: createAction('@@auth/USER FOUND', action => (user: IUser) => action({ user })),
    userNotFound: createAction('@@auth/USER NOT FOUND', action => () => action())
  },
  start: createAction('@@auth/START', action => () => action()),
  signIn: createAction('@@auth/SIGN IN', action => (email: string, password: string) =>
    action({ email, password })
  ),
  signOut: createAction('@@auth/SIGN OUT', action => () => action())
};

export type AuthAction = ActionType<typeof authActions>;

export const authServices = {
  subscribe: () =>
    eventChannel(emit => {
      emit(authActions.internal.userNotFound());

      return () => {};
    })
};

export const authSagas = {
  *start() {
    //   const channel = yield call(authServices.subscribe);
    //   while (true) {
    //     const action = yield take(channel);
    //     yield put(action);
    //   }

    const lsUser: string | null = yield call([localStorage, localStorage.getItem], '@@@USER');

    if (lsUser) {
      const user: IUser = JSON.parse(lsUser);
      yield put(authActions.internal.userFound(user));
    } else {
      yield put(authActions.internal.userNotFound());
    }
  },
  *signIn(action: ReturnType<typeof authActions.signIn>) {
    const lsUser: string | null = yield call([localStorage, localStorage.getItem], '@@@USER');
    if (!lsUser) {
      const user: IUser = { ...action.payload, created: Date.now() };
      yield call([localStorage, localStorage.setItem], '@@@USER', JSON.stringify(user));
      yield put(authActions.internal.userFound(user));
    }
  },
  *signOut() {
    const lsUser: string | null = yield call([localStorage, localStorage.getItem], '@@@USER');
    if (lsUser) {
      yield call([localStorage, localStorage.removeItem], '@@@USER');
      yield put(authActions.internal.userNotFound());
    }
  }
};

export const authSaga = function*() {
  yield all([
    takeLatest(getType(authActions.start), authSagas.start),
    takeLatest(getType(authActions.signIn), authSagas.signIn),
    takeLatest(getType(authActions.signOut), authSagas.signOut)
  ]);
};

export type AuthState = Readonly<{ user?: IUser }>;

const reducer: Reducer<AuthState, AuthAction> = (state: AuthState = {}, action: AuthAction) => {
  switch (action.type) {
    case getType(authActions.internal.userFound):
      return { ...state, user: action.payload.user };
    case getType(authActions.internal.userNotFound):
      return { ...state, user: undefined };
    default:
      return state;
  }
};

export default reducer;
