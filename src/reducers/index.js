import { combineReducers } from 'redux';
import { nameReducer } from '../utils';
import counterReducer from './counter';

export default combineReducers({
  counter1: nameReducer(counterReducer, 1),
  counter2: nameReducer(counterReducer, 2)
});
