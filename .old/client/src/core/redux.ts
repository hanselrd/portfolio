import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

import rootReducer, { dependencies, RootAction, rootEpic, RootState } from '../ducks';

let store: Store<RootState, RootAction>;

const epicMiddleware = createEpicMiddleware({ dependencies });

if (process.env.NODE_ENV !== 'production') {
  store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, epicMiddleware)));
} else {
  store = createStore(rootReducer, applyMiddleware(epicMiddleware));
}

epicMiddleware.run(rootEpic as any);

export default store;
