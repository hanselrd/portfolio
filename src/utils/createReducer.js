import { createReducer } from 'redux-act';

export default (handlers, initialState) => {
  return name => {
    let customHandlers = null;
    if (name) {
      customHandlers = {};
      Object.keys(handlers).forEach(key => {
        customHandlers[`${key} (${name})`] = handlers[key];
      });
    }
    return createReducer(
      customHandlers ? customHandlers : handlers,
      initialState
    );
  };
};
