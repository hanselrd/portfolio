export default (reducer, name) => {
  let namedHandlers = {};
  Object.keys(reducer.handlers).forEach(key => {
    namedHandlers[`${key} (${name})`] = reducer.handlers[key];
  });
  return (state = reducer.initialState, action) => {
    if (namedHandlers.hasOwnProperty(action.type)) {
      return namedHandlers[action.type](state, action.payload, action.meta);
    } else {
      return {
        ...state,
        __name: name
      };
    }
  };
};
