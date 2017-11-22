export default actionCreator => {
  return (name, ...args) => {
    let action = actionCreator(...args);
    if (name) {
      action.type = `${action.type} (${name})`;
    }
    return action;
  };
};
