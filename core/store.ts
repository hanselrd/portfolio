import { RootModel, rootModel } from "@/models";
import { createStore, createTypedHooks, persist } from "easy-peasy";
import logger from "redux-logger";

export const { useStoreActions, useStoreState, useStoreDispatch } = createTypedHooks<RootModel>();

export default createStore(persist(rootModel, { storage: "localStorage" }), {
  name: "__store",
  middleware: process.env.NODE_ENV === "development" ? [logger] : [],
});
