import history from '@app/core/history';
import store from '@app/core/redux';
import * as React from 'react';
// import registerServiceWorker from './registerServiceWorker';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
// registerServiceWorker();
