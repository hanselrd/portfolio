import rootReducer, { RootAction, RootState, dependencies, rootEpic } from "@/ducks";
import { AnyAction, Store, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import { createEpicMiddleware } from "redux-observable";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

export let store: Store<RootState, RootAction>;

const epicMiddleware = createEpicMiddleware({ dependencies });

const persistedReducer = persistReducer(
  { key: "root", storage, blacklist: ["router"] },
  rootReducer
);

if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test") {
  store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(logger, epicMiddleware))
  );
} else {
  store = createStore(persistedReducer, applyMiddleware(epicMiddleware));
}

export const persistor = persistStore((store as unknown) as Store<any, AnyAction>);

epicMiddleware.run(rootEpic as any);
