import { createAction } from 'redux-act';

export const increment = createAction('COUNTER_INCREMENT');
export const decrement = createAction('COUNTER_DECREMENT');
export const add = createAction('COUNTER_ADD');
