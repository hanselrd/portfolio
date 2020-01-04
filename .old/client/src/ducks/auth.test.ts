import { ActionsObservable, StateObservable } from 'redux-observable';
import { Subject } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { dependencies, RootState } from '.';
import { authActions, authEpics } from './auth';

it('start epic executes correctly', async () => {
  {
    const action$ = ActionsObservable.of(authActions.start());
    const state$ = new StateObservable<RootState>(new Subject(), {
      auth: {},
      locale: { showModal: false },
      router: {}
    });

    const mockLocalStorageGetItem = jest.spyOn(
      Object.getPrototypeOf(dependencies.localStorage),
      'getItem'
    );
    const user = { email: '', password: '', created: 0 };
    mockLocalStorageGetItem.mockImplementation(((key: string) =>
      key ? JSON.stringify(user) : null) as any);

    const result = await authEpics
      .start(action$, state$, dependencies)
      .pipe(toArray())
      .toPromise();

    expect(mockLocalStorageGetItem.mock.calls.length).toBe(1);
    expect(mockLocalStorageGetItem.mock.calls[0][0]).toBe('@@@USER');
    expect(result).toEqual([authActions.internal.userFound(user)]);
  }

  {
    // user not found
  }
});

it('signIn epic executes correctly', async () => {
  {
    // no existing user
  }

  {
    // existing user
  }
});

it('signOut epic executes correctly', async () => {
  {
    // existing user
  }

  {
    // no existing user
  }
});
