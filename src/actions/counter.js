import { createNameableAction } from '../utils';

export const increment = createNameableAction('Increment counter');
export const decrement = createNameableAction('Decrement counter');
export const add = createNameableAction('Add to counter with payload');
