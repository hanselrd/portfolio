import { createAction } from 'redux-act';
import firebase from '../firebase';

/*
  _ signifies these should never be called implicitly
  and are for internal use only
*/
export const _start = createAction('@@auth/start');
export const _login = createAction('@@auth/login');
export const _logout = createAction('@@auth/logout');
export const _error = createAction('@@auth/error');

export const handleAuthStateChanged = () => {
  return dispatch => {
    dispatch(_start());
    firebase.auth().onAuthStateChanged(
      auth => {
        if (auth) dispatch(_login(auth));
        else dispatch(_logout());
      },
      authError => {
        dispatch(_error(authError));
      }
    );
  };
};

export const login = credentials => {
  return dispatch => {
    if (
      credentials.hasOwnProperty('email') &&
      credentials.hasOwnProperty('password')
    ) {
      const { email, password } = credentials;
      firebase.auth().signInWithEmailAndPassword(email, password);
    } else if (
      credentials.hasOwnProperty('provider') &&
      credentials.hasOwnProperty('type')
    ) {
      const { provider, type } = credentials;
      let authProvider = null;
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
        default:
          throw new Error('Invalid provider');
      }
      switch (type) {
        case 'popup':
          firebase.auth().signInWithPopup(authProvider);
          break;
        case 'redirect':
          firebase.auth().signInWithRedirect(authProvider);
          break;
        default:
          throw new Error('Invalid type');
      }
    }
  };
};

export const logout = () => {
  return dispatch => {
    firebase.auth().signOut();
  };
};
