import { createReducer } from '../utils';

// utility functions
const changeName = (state, payload) => {
  return {
    ...state,
    name: payload.name
  };
};

const changeAge = (state, payload) => {
  return {
    ...state,
    age: payload.age
  };
};

// case reducers
const userChangeName = (state, action) => {
  return changeName(state, action.payload);
};

const userChangeAge = (state, action) => {
  return changeAge(state, action.payload);
};

const initialState = {
  name: '',
  age: 0
};

export default createReducer(initialState, {
  USER_CHANGE_NAME: userChangeName,
  USER_CHANGE_AGE: userChangeAge
});
