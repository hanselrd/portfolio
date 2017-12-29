import { createNameableAction } from '../utils';

export const increment = createNameableAction('@@counter/increment');
export const decrement = createNameableAction('@@counter/decrement');
export const add = createNameableAction('@@counter/add');
