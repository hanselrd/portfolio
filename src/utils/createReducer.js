/*
  When calling a reducer created by this function you can optionally
  pass in a name, for example:

  const rootReducer = combineReducers({
    exampleA: exampleReducer('A'),
    exampleB: exampleReducer('B')
    user: userReducer() // default handlers
  });
*/
export default (initialState, handlers) => {
  return name => {
    let computedHandlers = null;
    if (name) {
      computedHandlers = {};
      Object.keys(handlers).forEach(key => {
        computedHandlers[`${key}_${name}`] = handlers[key];
      });
    }
    const activeHandlers = computedHandlers ? computedHandlers : handlers;
    return (state = initialState, action) => {
      if (activeHandlers.hasOwnProperty(action.type)) {
        return activeHandlers[action.type](state, action);
      } else {
        return {
          ...state,
          _____name: name
        };
      }
    };
  };
};
