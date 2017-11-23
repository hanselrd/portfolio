import makeActionsNameable from './makeActionsNameable';
import * as counterActions from '../actions/counter';

export default {
  ...makeActionsNameable(counterActions)
};
