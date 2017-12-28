import { createAction } from 'redux-act';
import { createActionAsync } from 'redux-act-async';
import firebase from '../firebase';

export const start = createAction('@@auth/start');
export const userFound = createAction('@@auth/user found');
export const userNotFound = createAction('@@auth/user not found');

export const handleAuthStateChanged = () => {
  return dispatch => {
    dispatch(start());
    firebase.auth().onAuthStateChanged(auth => {
      if (auth) dispatch(userFound(auth));
      else dispatch(userNotFound());
    });
  };
};

export const login = createActionAsync('@@auth/login', credentials => {
  if (
    credentials.hasOwnProperty('email') &&
    credentials.hasOwnProperty('password')
  ) {
    const { email, password } = credentials;
    return firebase.auth().signInWithEmailAndPassword(email, password);
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
        return firebase.auth().signInWithPopup(authProvider);
      case 'redirect':
        return firebase.auth().signInWithRedirect(authProvider);
      default:
        throw new Error('Invalid type');
    }
  }
});

export const logout = createActionAsync('@@auth/logout', () => {
  return firebase.auth().signOut();
});
