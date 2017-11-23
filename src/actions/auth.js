import { createAction } from 'redux-act';
import firebase from '../firebase';

export const start = createAction('@@auth/start');
export const login = createAction('@@auth/login');
export const logout = createAction('@@auth/logout');
export const error = createAction('@@auth/error');

// async
export const getUser = () => {
  return dispatch => {
    dispatch(start());
    // timeout to simulate latency and show cool spinner in App container
    setTimeout(() => {
      firebase.auth().onAuthStateChanged(
        auth => {
          if (auth) dispatch(login(auth));
          else dispatch(logout());
        },
        authError => {
          dispatch(error(authError));
        }
      );
    }, 4000);
  };
  // firebase.auth().onAuthStateChanged(
  //   auth => {
  //     if (auth) dispatch(login(auth));
  //     else dispatch(logout());
  //   },
  //   authError => {
  //     dispatch(error(authError));
  //   }
  // );
};
