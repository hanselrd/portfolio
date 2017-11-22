import makeActionsNameable from './makeActionsNameable';
import * as counterActions from '../actions/counter';
import * as userActions from '../actions/user';

export default {
  ...makeActionsNameable(counterActions),
  ...makeActionsNameable(userActions)
};
