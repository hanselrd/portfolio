import { createReducer } from '../utils';

const initialState = {
  count: 0
};

export default createReducer(initialState, {
  COUNTER_UP: (state, action) => {
    return {
      ...state,
      count: state.count + 1
    };
  },
  COUNTER_DOWN: (state, action) => {
    return {
      ...state,
      count: state.count - 1
    };
  }
});
