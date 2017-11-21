import { createAction } from '../utils';
import { USER_CHANGE_NAME, USER_CHANGE_AGE } from './types';

// export const changeName = name => {
//   return {
//     type: USER_CHANGE_NAME,
//     payload: name
//   };
// };

// export const changeAge = age => {
//   return {
//     type: USER_CHANGE_AGE,
//     payload: age
//   };
// };

export const changeName = createAction(USER_CHANGE_NAME);
export const changeAge = createAction(USER_CHANGE_AGE);
