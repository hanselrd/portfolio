import { createReducer } from '../utils';
import { increment, decrement, add } from '../actions/counter';

const initialState = {
  count: 0
};

export default createReducer(
  {
    [increment]: state => {
      return { ...state, count: state.count + 1 };
    },
    [decrement]: state => {
      return { ...state, count: state.count - 1 };
    },
    [add]: (state, payload) => {
      return { ...state, count: state.count + payload };
    }
  },
  initialState
);
