import { client } from '@app/core/apollo';
import * as React from 'react';
// import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
);
// registerServiceWorker();
