import { createStore } from "easy-peasy";
import { ThemeModel, themeModel } from "./theme";

export interface RootModel {
  theme: ThemeModel;
}

export const rootModel: RootModel = {
  theme: themeModel,
};

export default createStore(rootModel);
