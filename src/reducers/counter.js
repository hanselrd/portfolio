import { createNameableReducer } from '../utils';
import { increment, decrement, add } from '../actions/counter';

const initialState = 0;

export default createNameableReducer(
  {
    [increment]: state => {
      return state + 1;
    },
    [decrement]: state => {
      return state - 1;
    },
    [add]: (state, payload) => {
      return state + payload;
    }
  },
  initialState
);
