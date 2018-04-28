import firebase from '@app/core/firebase';
import { RootState } from '@app/ducks';
import { createAction, createReducer } from 'redux-act';
import { eventChannel } from 'redux-saga';
import { all, call, put, select, take, takeLatest } from 'redux-saga/effects';
import { chatActions } from './chat';

const actions = {
  userFound: createAction<firebase.User>('@@auth/USER FOUND [internal]'),
  userMissing: createAction('@@auth/USER MISSING [internal]')
};

export const authActions = {
  start: createAction('@@auth/START'),

  signInWithEmailAndPassword: createAction<{
    email: string;
    password: string;
  }>('@@auth/SIGN IN WITH EMAIL AND PASSWORD'),

  signInWithProvider: createAction<{
    provider: 'google' | 'facebook' | 'twitter' | 'github';
    type: 'popup' | 'redirect';
  }>('@@auth/SIGN IN WITH PROVIDER'),

  signUpWithEmailAndPassword: createAction<{
    email: string;
    password: string;
  }>('@@auth/SIGN UP WITH EMAIL AND PASSWORD'),

  signOut: createAction('@@auth/SIGN OUT')
};

export const authServices = {
  getUserRef: (user: firebase.User) =>
    firebase
      .database()
      .ref('users')
      .child(user.uid)
};

export const authChannels = {
  onAuthStateChanged: () =>
    eventChannel<{ user: firebase.User | null }>(emitter =>
      firebase.auth().onAuthStateChanged(user => {
        emitter({ user });
        if (user) {
          const userRef = authServices.getUserRef(user);
          firebase
            .database()
            .ref('.info/connected')
            .on('value', snapshot => {
              if (snapshot && snapshot.val()) {
                userRef
                  .onDisconnect()
                  .update({ online: false })
                  .then(() => {
                    userRef.update({ online: true });
                  });
              }
            });
        }
      })
    )
};

export const authSagas = {
  *start(action: ReturnType<typeof authActions.start>) {
    const authStateChannel = yield call(authChannels.onAuthStateChanged);
    while (true) {
      const authState: { user: firebase.User | null } = yield take(
        authStateChannel
      );
      if (authState.user) {
        yield put(actions.userFound(authState.user));
        yield put(chatActions.start());
      } else {
        yield put(actions.userMissing());
        yield put(chatActions.clear());
      }
    }
  },

  *signInWithEmailAndPassword(
    action: ReturnType<typeof authActions.signInWithEmailAndPassword>
  ) {
    const { email, password } = action.payload;
    try {
      yield call(
        [firebase.auth(), firebase.auth().signInWithEmailAndPassword],
        email,
        password
      );
    } catch (error) {
      console.error(error);
    }
  },

  *signInWithProvider(
    action: ReturnType<typeof authActions.signInWithProvider>
  ) {
    const { provider, type } = action.payload;
    let authProvider: firebase.auth.AuthProvider = new firebase.auth.EmailAuthProvider();

    switch (provider) {
      case 'google':
        authProvider = new firebase.auth.GoogleAuthProvider();
        break;
      case 'facebook':
        authProvider = new firebase.auth.FacebookAuthProvider();
        break;
      case 'twitter':
        authProvider = new firebase.auth.TwitterAuthProvider();
        break;
      case 'github':
        authProvider = new firebase.auth.GithubAuthProvider();
        break;
    }

    try {
      switch (type) {
        case 'popup':
          yield call(
            [firebase.auth(), firebase.auth().signInWithPopup],
            authProvider
          );
          break;
        case 'redirect':
          yield call(
            [firebase.auth(), firebase.auth().signInWithRedirect],
            authProvider
          );
          break;
      }
    } catch (error) {
      console.error(error);
    }
  },

  *signUpWithEmailAndPassword(
    action: ReturnType<typeof authActions.signUpWithEmailAndPassword>
  ) {
    const { email, password } = action.payload;
    try {
      yield call(
        [firebase.auth(), firebase.auth().createUserWithEmailAndPassword],
        email,
        password
      );
    } catch (error) {
      console.error(error);
    }
  },

  *signOut(action: ReturnType<typeof authActions.signOut>) {
    const state: RootState = yield select();
    if (state.auth.user) {
      const userRef = yield call(authServices.getUserRef, state.auth.user);
      yield call([userRef, userRef.update], { online: false });
    }
    yield call([firebase.auth(), firebase.auth().signOut]);
  }
};

export const authSaga = function*() {
  yield all([
    takeLatest(authActions.start.getType(), authSagas.start),
    takeLatest(
      authActions.signInWithEmailAndPassword.getType(),
      authSagas.signInWithEmailAndPassword
    ),
    takeLatest(
      authActions.signInWithProvider.getType(),
      authSagas.signInWithProvider
    ),
    takeLatest(
      authActions.signUpWithEmailAndPassword.getType(),
      authSagas.signUpWithEmailAndPassword
    ),
    takeLatest(authActions.signOut.getType(), authSagas.signOut)
  ]);
};

export type AuthState = Readonly<{
  user?: firebase.User;
}>;

const reducer = createReducer<AuthState>({}, {});

reducer.on(actions.userFound, (state, payload) => ({
  ...state,
  user: payload
}));

reducer.on(actions.userMissing, state => ({
  ...state,
  user: undefined
}));

export default reducer;
