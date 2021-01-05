import { applyMiddleware, createStore, AnyAction, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import { createEpicMiddleware } from "redux-observable";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer, { dependencies, rootEpic, RootAction, RootState } from "../ducks";

export let store: Store<RootState, RootAction>;

const epicMiddleware = createEpicMiddleware({ dependencies });

const persistedReducer = persistReducer(
  { key: "root", storage, blacklist: ["router"] },
  rootReducer
);

if (process.env.NODE_ENV !== "production") {
  store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(logger, epicMiddleware))
  );
} else {
  store = createStore(persistedReducer, applyMiddleware(epicMiddleware));
}

export const persistor = persistStore((store as unknown) as Store<any, AnyAction>);

epicMiddleware.run(rootEpic as any);
