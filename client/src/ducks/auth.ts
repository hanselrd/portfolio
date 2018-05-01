import firebase from '@app/core/firebase';
import { RootState } from '@app/ducks';
import { createAction, createReducer } from 'redux-act';
import { Epic, combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';

export const authActions = {
  internal: {
    userFound: createAction<firebase.User>('@@auth/USER FOUND'),
    userMissing: createAction('@@auth/USER MISSING')
  },
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

export type AuthEpic = Epic<
  | ReturnType<typeof authActions.internal.userFound>
  | ReturnType<typeof authActions.internal.userMissing>
  | ReturnType<typeof authActions.start>
  | ReturnType<typeof authActions.signInWithEmailAndPassword>
  | ReturnType<typeof authActions.signInWithProvider>
  | ReturnType<typeof authActions.signUpWithEmailAndPassword>
  | ReturnType<typeof authActions.signOut>,
  RootState
>;

const getUpdateUserRef = (user: firebase.User) =>
  firebase
    .database()
    .ref('userWriteable/updateUser')
    .child(user.uid);

const startEpic: AuthEpic = (action$, store) =>
  action$
    .ofType(authActions.start.getType())
    .switchMap(() =>
      new Observable<firebase.User | null>(observer =>
        firebase.auth().onAuthStateChanged(observer)
      ).map(
        user =>
          user
            ? authActions.internal.userFound(user)
            : authActions.internal.userMissing()
      )
    )
    .merge(
      action$
        .ofType(authActions.internal.userFound.getType())
        .switchMap(() =>
          Observable.fromEvent<firebase.database.DataSnapshot | null>(
            firebase.database().ref('.info/connected') as any,
            'value'
          )
            .filter(snapshot => snapshot != null)
            .switchMap(() => {
              const updateUserRef = getUpdateUserRef(
                store.getState().auth.user!
              );
              return Observable.from(
                updateUserRef
                  .onDisconnect()
                  .set({ online: false })
                  .then(() => updateUserRef.set({ online: true }))
              );
            })
        )
        .ignoreElements()
        .retry()
    );

const signInWithEmailAndPasswordEpic: AuthEpic = (action$, store) =>
  action$
    .ofType(authActions.signInWithEmailAndPassword.getType())
    .filter(() => store.getState().auth.user == null)
    .do(action => {
      const { email, password } = action.payload as {
        email: string;
        password: string;
      };
      return firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .ignoreElements()
    .retry();

const signInWithProviderEpic: AuthEpic = (action$, store) =>
  action$
    .ofType(authActions.signInWithProvider.getType())
    .filter(() => store.getState().auth.user == null)
    .do(action => {
      const { provider, type } = action.payload as {
        provider: 'google' | 'facebook' | 'twitter' | 'github';
        type: 'popup' | 'redirect';
      };
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

      switch (type) {
        case 'popup':
          return firebase.auth().signInWithPopup(authProvider);
        case 'redirect':
          return firebase.auth().signInWithRedirect(authProvider);
      }
    })
    .ignoreElements()
    .retry();

const signUpWithEmailAndPasswordEpic: AuthEpic = (action$, store) =>
  action$
    .ofType(authActions.signUpWithEmailAndPassword.getType())
    .filter(() => store.getState().auth.user == null)
    .do(action => {
      const { email, password } = action.payload as {
        email: string;
        password: string;
      };
      return firebase.auth().createUserWithEmailAndPassword(email, password);
    })
    .ignoreElements()
    .retry();

const signOutEpic: AuthEpic = (action$, store) =>
  action$
    .ofType(authActions.signOut.getType())
    .filter(() => store.getState().auth.user != null)
    .do(() => {
      const updateUserRef = getUpdateUserRef(store.getState().auth.user!);
      return updateUserRef
        .set({ online: false })
        .then(() => firebase.auth().signOut());
    })
    .ignoreElements()
    .retry();

export const authEpic = combineEpics<AuthEpic>(
  startEpic,
  signInWithEmailAndPasswordEpic,
  signInWithProviderEpic,
  signUpWithEmailAndPasswordEpic,
  signOutEpic
);

export type AuthState = Readonly<{
  user?: firebase.User;
}>;

const reducer = createReducer<AuthState>({}, {});

reducer.on(authActions.internal.userFound, (state, payload) => ({
  ...state,
  user: payload
}));

reducer.on(authActions.internal.userMissing, state => ({
  ...state,
  user: undefined
}));

export default reducer;
