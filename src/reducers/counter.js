import { createNameableReducer } from '../utils';
import { increment, decrement, add } from '../actions/counter';

const initialState = {
  count: 0
};

export default createNameableReducer(
  {
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
  },
  initialState
);
