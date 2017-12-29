export default actionCreator => {
  let nameableActionCreator = (obj, ...args) => {
    let action = actionCreator(...args);
    if (obj) {
      action.type = `${action.type} (${obj.__name})`;
    }
    return action;
  };
  nameableActionCreator.toString = actionCreator.toString;
  return nameableActionCreator;
};
