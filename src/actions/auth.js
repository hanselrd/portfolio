import { createAction } from 'redux-act';
import firebase from '../firebase';

export const start = createAction('@@auth/start');
export const login = createAction('@@auth/login');
export const logout = createAction('@@auth/logout');
export const error = createAction('@@auth/error');

export const handleAuthStateChanged = () => {
  return dispatch => {
    dispatch(start());
    firebase.auth().onAuthStateChanged(
      auth => {
        if (auth) dispatch(login(auth));
        else dispatch(logout());
      },
      authError => {
        dispatch(error(authError));
      }
    );
  };
};
