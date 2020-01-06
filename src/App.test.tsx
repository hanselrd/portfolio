import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from './App';
import history from './core/history';
import store from './core/redux';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
  const linkElement = getByText(/Contact/i);
  expect(linkElement).toBeInTheDocument();
});
