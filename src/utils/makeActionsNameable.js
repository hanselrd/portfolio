import makeActionNameable from './makeActionNameable';

export default actionCreators => {
  let namedActionCreators = {};
  Object.keys(actionCreators).forEach(key => {
    namedActionCreators[key] = makeActionNameable(actionCreators[key]);
  });
  return namedActionCreators;
};
