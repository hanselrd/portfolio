export default actionCreator => {
  return (obj, ...args) => {
    let action = actionCreator(...args);
    if (obj) {
      action.type = `${action.type} (${obj.__name})`;
    }
    return action;
  };
};
