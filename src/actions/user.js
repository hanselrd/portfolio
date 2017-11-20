export const USER_CHANGE_NAME = 'USER_CHANGE_NAME';
export const USER_CHANGE_AGE = 'USER_CHANGE_AGE';

export const changeName = name => {
  return {
    type: USER_CHANGE_NAME,
    payload: name
  };
};

export const changeAge = age => {
  return {
    type: USER_CHANGE_AGE,
    payload: age
  };
};
