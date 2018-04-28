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

const getUserRef = (user: firebase.User) =>
  firebase
    .database()
    .ref('users')
    .child(user.uid);

const startAuthStateChangedEpic: AuthEpic = action$ =>
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
    );

const startHandlePresenceEpic: AuthEpic = (action$, store) =>
  action$
    .ofType(authActions.internal.userFound.getType())
    .switchMap(() =>
      Observable.fromEvent<firebase.database.DataSnapshot>(
        firebase.database().ref('.info/connected') as any,
        'value'
      )
        .filter(snapshot => snapshot !== null)
        .switchMap(() => {
          const userRef = getUserRef(store.getState().auth.user!);
          return Observable.from(
            userRef
              .onDisconnect()
              .update({ online: false })
              .then(() => userRef.update({ online: true }))
          );
        })
    )
    .switchMap(() => Observable.empty<never>())
    .retry();

const startEpic = combineEpics<AuthEpic>(
  startAuthStateChangedEpic,
  startHandlePresenceEpic
);

const signInWithEmailAndPasswordEpic: AuthEpic = action$ =>
  action$
    .ofType(authActions.signInWithEmailAndPassword.getType())
    .switchMap(action => {
      const { email, password } = action.payload as {
        email: string;
        password: string;
      };
      return Observable.from(
        firebase.auth().signInWithEmailAndPassword(email, password)
      );
    })
    .switchMap(() => Observable.empty<never>())
    .retry();

const signInWithProviderEpic: AuthEpic = action$ =>
  action$
    .ofType(authActions.signInWithProvider.getType())
    .switchMap(action => {
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
          return Observable.from(firebase.auth().signInWithPopup(authProvider));
        case 'redirect':
          return Observable.from(
            firebase.auth().signInWithRedirect(authProvider)
          );
      }
    })
    .switchMap(() => Observable.empty<never>())
    .retry();

const signUpWithEmailAndPasswordEpic: AuthEpic = action$ =>
  action$
    .ofType(authActions.signUpWithEmailAndPassword.getType())
    .switchMap(action => {
      const { email, password } = action.payload as {
        email: string;
        password: string;
      };
      return Observable.from(
        firebase.auth().createUserWithEmailAndPassword(email, password)
      );
    })
    .switchMap(() => Observable.empty<never>())
    .retry();

const signOutEpic: AuthEpic = (action$, store) =>
  action$
    .ofType(authActions.signOut.getType())
    .filter(() => store.getState().auth.user !== null)
    .switchMap(() => {
      const userRef = getUserRef(store.getState().auth.user!);
      return Observable.from(
        userRef.update({ online: false }).then(() => firebase.auth().signOut())
      );
    })
    .switchMap(() => Observable.empty<never>())
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
