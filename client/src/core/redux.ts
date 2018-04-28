import rootReducer, { RootState, rootEpic } from '@app/ducks';
import { Store, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

let store: Store<RootState>;

const epicMiddleware = createEpicMiddleware(rootEpic as any);

if (process.env.NODE_ENV !== 'production') {
  store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(logger, epicMiddleware))
  );
} else {
  store = createStore(rootReducer, applyMiddleware(epicMiddleware));
}

export default store;
