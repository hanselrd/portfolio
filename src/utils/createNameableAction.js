import { createAction } from 'redux-act';
import makeActionNameable from './makeActionNameable';

export default (description, payloadReducer, metaReducer) => {
  const actionCreator = createAction(description, payloadReducer, metaReducer);
  return makeActionNameable(actionCreator);
};
