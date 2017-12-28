import { createReducer } from 'redux-act';
import nameReducer from './nameReducer';

export default (handlers, initialState) => {
  let reducer = createReducer(handlers, initialState);
  reducer.handlers = handlers;
  reducer.initialState = initialState;
  return name => {
    if (name) {
      return nameReducer(reducer, name);
    } else {
      return reducer;
    }
  };
};
