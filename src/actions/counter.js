import { createAction } from 'redux-act';

export const increment = createAction('Increment counter');
export const decrement = createAction('Decrement counter');
export const add = createAction('Add to counter with payload');
