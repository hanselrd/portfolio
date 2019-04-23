import { call, put, take } from 'redux-saga/effects';
import { authActions, authSagas, authServices } from './auth';

it('start saga executes correctly', () => {
  {
    const gen = authSagas.start();

    expect(gen.next().value).toEqual(call(authServices.getUser));
    const action = authActions.internal.userFound({ email: '', password: '', created: 0 });
    expect(gen.next(action.payload.user).value).toEqual(put(action));
    expect(gen.next().done).toEqual(true);
  }

  {
    const gen = authSagas.start();

    expect(gen.next().value).toEqual(call(authServices.getUser));
    const action = authActions.internal.userNotFound();
    expect(gen.next().value).toEqual(put(action));
    expect(gen.next().done).toEqual(true);
  }
});

it('signIn saga executes correctly', () => {
  {
    const action = authActions.signIn('', '');
    const gen = authSagas.signIn(action);

    expect(gen.next().value).toEqual(call(authServices.getUser));
    const user = { ...action.payload, created: 0 };
    expect(gen.next().value).toEqual(call(authServices.setUser, user));
    expect(gen.next().value).toEqual(put(authActions.internal.userFound(user)));
    expect(gen.next().done).toEqual(true);
  }

  {
    const action = authActions.signIn('', '');
    const gen = authSagas.signIn(action);

    expect(gen.next().value).toEqual(call(authServices.getUser));
    const user = {
      ...action.payload,
      created: 0
    };
    expect(gen.next(user).done).toEqual(true);
  }
});

it('signOut saga executes correctly', () => {
  {
    const gen = authSagas.signOut();

    expect(gen.next().value).toEqual(call(authServices.getUser));
    const user = { email: '', password: '', created: 0 };
    expect(gen.next(user).value).toEqual(call(authServices.removeUser));
    expect(gen.next().value).toEqual(put(authActions.internal.userNotFound()));
    expect(gen.next().done).toEqual(true);
  }

  {
    const gen = authSagas.signOut();

    expect(gen.next().value).toEqual(call(authServices.getUser));
    expect(gen.next().done).toEqual(true);
  }
});
