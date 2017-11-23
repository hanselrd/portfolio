import { combineReducers } from 'redux';
import counterReducer from './counter';

export default combineReducers({
  counter1: counterReducer(1),
  counter2: counterReducer(2)
});
