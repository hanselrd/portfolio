import { createAction } from '../utils';

export const COUNTER_UP = 'COUNTER_UP';
export const COUNTER_DOWN = 'COUNTER_DOWN';

export const counterUp = createAction(COUNTER_UP);
export const counterDown = createAction(COUNTER_DOWN);
