export default (actionCreator, name) => {
  return (...args) => {
    let action = actionCreator(...args);
    if (name) {
      action.type = `${action.type} (${name})`;
    }
    return action;
  };
};
