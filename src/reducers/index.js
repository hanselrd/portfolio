import { combineReducers } from 'redux';
import authReducer from './auth';
import counterReducer from './counter';

export default combineReducers({
  auth: authReducer,
  counter1: counterReducer(1),
  counter2: counterReducer(2)
});
