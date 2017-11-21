import { createAction } from '../utils';
import { COUNTER_UP, COUNTER_DOWN } from './types';

export const counterUp = createAction(COUNTER_UP);
export const counterDown = createAction(COUNTER_DOWN);
