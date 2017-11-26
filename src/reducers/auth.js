import { createReducer } from 'redux-act';
import { userFound, userNotFound } from '../actions/auth';

const initialState = {
  user: null
};

export default createReducer(
  {
    [userFound]: (state, payload) => ({
      ...state,
      user: payload
    }),
    [userNotFound]: state => ({
      ...state,
      user: null
    })
  },
  initialState
);
