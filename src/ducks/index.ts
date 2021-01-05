import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import history from "../core/history";
import localization from "../core/localization";
import localeReducer, { LocaleAction, LocaleEpic, LocaleState, localeEpic } from "./locale";
import routerReducer, { RouterAction, RouterEpic, RouterState, routerEpic } from "./router";
import themeReducer, { ThemeAction, ThemeEpic, ThemeState, themeEpic } from "./theme";

export const dependencies = {
  document,
  history,
  localization,
  window,
};

export type RootState = Readonly<{ locale: LocaleState; router: RouterState; theme: ThemeState }>;

export type RootAction = LocaleAction & RouterAction & ThemeAction;

export type RootEpic = LocaleEpic | RouterEpic | ThemeEpic;

export const rootEpic = combineEpics<RootEpic>(localeEpic, routerEpic, themeEpic);

export default combineReducers<RootState, RootAction>({
  locale: localeReducer,
  router: routerReducer,
  theme: themeReducer,
});
