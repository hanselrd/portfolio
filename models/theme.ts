import { Action, Thunk, action, thunk } from "easy-peasy";

export interface ThemeModel {
  mode: "light" | "dark";
  start: Thunk<ThemeModel>;
  changeMode: Thunk<ThemeModel, ThemeModel["mode"]>;
  changeModeInternal: Action<ThemeModel, ThemeModel["mode"]>;
}

export const themeModel: ThemeModel = {
  mode: "light",
  start: thunk((actions) => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      actions.changeMode("dark");
    } else {
      actions.changeMode("light");
    }
  }),
  changeMode: thunk((actions, payload) => {
    if (payload === "dark") {
      document.querySelector("html")?.classList.add("dark");
    } else if (payload === "light") {
      document.querySelector("html")?.classList.remove("dark");
    }

    actions.changeModeInternal(payload);
  }),
  changeModeInternal: action((state, payload) => {
    state.mode = payload;
  }),
};
