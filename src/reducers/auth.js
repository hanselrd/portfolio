import { createReducer } from 'redux-act';
import { createReducerAsync } from 'redux-act-async';
import { combineReducers } from 'redux';
import { userFound, userNotFound, login, logout } from '../actions/auth';

const userReducer = createReducer(
  {
    [userFound]: (state, payload) => payload,
    [userNotFound]: state => null
  },
  null
);

const loginReducer = createReducerAsync(login);
const logoutReducer = createReducerAsync(logout);

export default combineReducers({
  user: userReducer,
  login: loginReducer,
  logout: logoutReducer
});
