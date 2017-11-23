import { createReducer } from 'redux-act';
import { _start, _login, _logout, _error } from '../actions/auth';

const initialState = {
  running: false,
  user: null,
  error: null
};

export default createReducer(
  {
    [_start]: state => ({
      ...state,
      running: true
    }),
    [_login]: (state, payload) => ({
      ...state,
      running: false,
      user: payload
    }),
    [_logout]: state => ({
      ...state,
      running: false,
      user: null
    }),
    [_error]: (state, payload) => ({
      ...state,
      running: false,
      error: payload
    })
  },
  initialState
);
