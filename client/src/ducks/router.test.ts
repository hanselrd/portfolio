import { call, put, take } from 'redux-saga/effects';
import { routerActions, routerSagas, routerServices } from './router';

it('start saga executes correctly', () => {
  const gen = routerSagas.start();

  expect(gen.next().value).toEqual(call(routerServices.subscribe));
  const channel = routerServices.subscribe();
  expect(gen.next(channel).value).toEqual(take(channel));
  const action = routerActions.internal.locationChanged({
    pathname: '',
    search: '',
    state: null,
    hash: ''
  });
  expect(gen.next(action).value).toEqual(put(action));
  expect(gen.next(channel).value).toEqual(take(channel));
});

it('push saga executes correctly', () => {
  const action = routerActions.push('', null);
  const gen = routerSagas.push(action);

  const { path, state } = action.payload;
  expect(gen.next().value).toEqual(call(routerServices.push, path, state));
  expect(gen.next().done).toEqual(true);
});

it('replace saga executes correctly', () => {
  const action = routerActions.replace('', null);
  const gen = routerSagas.replace(action);

  const { path, state } = action.payload;
  expect(gen.next().value).toEqual(call(routerServices.replace, path, state));
  expect(gen.next().done).toEqual(true);
});

it('go saga executes correctly', () => {
  const action = routerActions.go(0);
  const gen = routerSagas.go(action);

  const { n } = action.payload;
  expect(gen.next().value).toEqual(call(routerServices.go, n));
  expect(gen.next().done).toEqual(true);
});

it('goBack saga executes correctly', () => {
  const gen = routerSagas.goBack();

  expect(gen.next().value).toEqual(call(routerServices.goBack));
  expect(gen.next().done).toEqual(true);
});

it('goForward saga executes correctly', () => {
  const gen = routerSagas.goForward();

  expect(gen.next().value).toEqual(call(routerServices.goForward));
  expect(gen.next().done).toEqual(true);
});
