import { combineReducers } from 'redux';
import counterReducer from './counter';
import userReducer from './user';

export default combineReducers({
  counter1: counterReducer(1),
  counter2: counterReducer(2),
  user1: userReducer(1),
  user2: userReducer(2)
});
