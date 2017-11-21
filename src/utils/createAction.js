/*
  When calling an action created by this function you can optionally
  pass in an object, for example:

  changeName(user1)('Example');
  changeAge()(12); // default action types
*/
export default type => {
  return (obj, payload) => {
    const { _____name } = obj;
    return {
      type: _____name ? `${type}_${_____name}` : type,
      payload
    };
  };
};
