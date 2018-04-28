import rootReducer, { RootState, rootEpic, rootSaga } from '@app/ducks';
import { Store, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import createSagaMiddleware from 'redux-saga';

let store: Store<RootState>;

const sagaMiddleware = createSagaMiddleware();
const epicMiddleware = createEpicMiddleware(rootEpic);

if (process.env.NODE_ENV !== 'production') {
  store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(logger, sagaMiddleware, epicMiddleware))
  );
} else {
  store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware, epicMiddleware)
  );
}

sagaMiddleware.run(rootSaga);

export default store;
