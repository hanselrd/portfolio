import { createReducer } from 'redux-act';
import { start, login, logout, error } from '../actions/auth';

const initialState = {
  running: false,
  user: null,
  error: null
};

export default createReducer(
  {
    [start]: state => ({
      ...state,
      running: true
    }),
    [login]: (state, payload) => ({
      ...state,
      running: false,
      user: payload
    }),
    [logout]: state => ({
      ...state,
      running: false,
      user: null
    }),
    [error]: (state, payload) => ({
      ...state,
      running: false,
      error: payload
    })
  },
  initialState
);
