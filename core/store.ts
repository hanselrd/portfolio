import { RootModel, rootModel } from "@/models";
import { createStore, createTypedHooks, persist } from "easy-peasy";

export const { useStoreActions, useStoreState, useStoreDispatch } = createTypedHooks<RootModel>();

export default createStore(persist(rootModel, { storage: "localStorage" }));
