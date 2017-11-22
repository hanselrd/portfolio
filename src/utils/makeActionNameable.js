export default actionCreator => {
  return (slice, ...args) => {
    let action = actionCreator(...args);
    if (slice) {
      action.type = `${action.type} (${slice.__metadata})`;
    }
    return action;
  };
};
