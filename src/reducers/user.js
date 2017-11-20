import { USER_CHANGE_NAME, USER_CHANGE_AGE } from '../actions/user';

const initialState = {
  name: '',
  age: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_CHANGE_NAME:
      return {
        ...state,
        name: action.payload
      };
    case USER_CHANGE_AGE:
      return {
        ...state,
        age: action.payload
      };
    default:
      return state;
  }
};
