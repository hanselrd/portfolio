import { createReducer } from 'redux-act';
import { increment, decrement, add } from '../actions/counter';

const handlers = {
  [increment]: state => ({
    ...state,
    count: state.count + 1
  }),
  [decrement]: state => ({
    ...state,
    count: state.count - 1
  }),
  [add]: (state, payload) => ({
    ...state,
    count: state.count + payload
  })
};

const initialState = {
  count: 0
};

let counterReducer = createReducer(handlers, initialState);
counterReducer.handlers = handlers;
counterReducer.initialState = initialState;

export default counterReducer;
