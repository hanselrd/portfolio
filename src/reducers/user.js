import { createNameableReducer } from '../utils';
import { changeName, changeAge } from '../actions/user';

const initialState = {
  name: '',
  age: 0
};

export default createNameableReducer(
  {
    [changeName]: (state, payload) => {
      return {
        ...state,
        name: payload
      };
    },
    [changeAge]: (state, payload) => {
      return {
        ...state,
        age: payload
      };
    }
  },
  initialState
);
