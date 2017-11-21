import { combineReducers } from 'redux';
import userReducer from './user';
import counterReducer from './counter';

export default combineReducers({
  user1: userReducer(1),
  user2: userReducer(2),
  counter1: counterReducer(1),
  counter2: counterReducer(2)
});
