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
    }),
  getUser: () => {
    const item = localStorage.getItem('@@@USER');
    if (item) {
      return JSON.parse(item) as IUser;
    }
  },
  setUser: (user: IUser) => localStorage.setItem('@@@USER', JSON.stringify(user)),
  removeUser: () => localStorage.removeItem('@@@USER')
};

export const authSagas = {
  *start() {
    //   const channel = yield call(authServices.subscribe);
    //   while (true) {
    //     const action = yield take(channel);
    //     yield put(action);
    //   }

    const user: IUser | undefined = yield call(authServices.getUser);

    if (user) {
      yield put(authActions.internal.userFound(user));
    } else {
      yield put(authActions.internal.userNotFound());
    }
  },
  *signIn(action: ReturnType<typeof authActions.signIn>) {
    let user: IUser | undefined = yield call(authServices.getUser);
    if (!user) {
      user = { ...action.payload, created: 0 };
      yield call(authServices.setUser, user);
      yield put(authActions.internal.userFound(user));
    }
  },
  *signOut() {
    const user: IUser | undefined = yield call(authServices.getUser);
    if (user) {
      yield call(authServices.removeUser);
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
