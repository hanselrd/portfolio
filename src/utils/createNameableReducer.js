import { createReducer } from 'redux-act';

export default (handlers, initialState) => {
  return name => {
    let namedHandlers = null;
    if (name) {
      namedHandlers = {};
      Object.keys(handlers).forEach(key => {
        namedHandlers[`${key} (${name})`] = handlers[key];
      });
    }
    return createReducer(
      namedHandlers ? namedHandlers : handlers,
      initialState
    );
  };
};
