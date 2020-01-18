import { createBrowserHistory, createHashHistory, History } from 'history';

let history: History;

if (window.location.hostname.includes('github.io')) {
  history = createHashHistory();
} else {
  history = createBrowserHistory();
}

export default history;
