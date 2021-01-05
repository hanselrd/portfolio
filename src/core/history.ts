import { History, createBrowserHistory, createHashHistory } from "history";

let history: History;

if (
  window.location.hostname.includes("github.io") ||
  window.location.hostname.includes("dev.hanseldelacruz.com")
) {
  history = createHashHistory();
} else {
  history = createBrowserHistory();
}

export default history;
