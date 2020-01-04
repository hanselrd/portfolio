import { Reducer } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { filter, map, mapTo, switchMap, tap } from 'rxjs/operators';
import { ActionType, createAction, getType } from 'typesafe-actions';
import { dependencies, RootState } from '../ducks';

interface IUser {
  email: string;
  password: string;
  created: number;
}

export const authActions = {
  internal: {
    userFound: createAction('@@auth/USER FOUND', action => (user: IUser) => action({ user })),
    userNotFound: createAction('@@auth/USER NOT FOUND', action => () => action())
  },
  start: createAction('@@auth/START', action => () => action()),
  signIn: createAction('@@auth/SIGN IN', action => (email: string, password: string) =>
    action({ email, password })
  ),
  signOut: createAction('@@auth/SIGN OUT', action => () => action())
};

export type AuthAction = ActionType<typeof authActions>;

export type AuthEpic = Epic<AuthAction, AuthAction, RootState, typeof dependencies>;

export const authEpics = {
  start: ((action$, state$, { localStorage }) =>
    action$.pipe(
      ofType(getType(authActions.start)),
      switchMap(() => of(localStorage.getItem('@@@USER'))),
      map(item =>
        item
          ? authActions.internal.userFound(JSON.parse(item))
          : authActions.internal.userNotFound()
      )
    )) as AuthEpic,
  signIn: ((action$, state$, { localStorage }) =>
    action$.pipe(
      ofType(getType(authActions.signIn)),
      filter(() => state$.value.auth.user == null),
      map(
        action =>
          ({
            ...(action as ReturnType<typeof authActions.signIn>).payload,
            created: 0
          } as IUser)
      ),
      tap(user => localStorage.setItem('@@@USER', JSON.stringify(user))),
      map(user => authActions.internal.userFound(user))
    )) as AuthEpic,
  signOut: ((action$, state$, { localStorage }) =>
    action$.pipe(
      ofType(getType(authActions.signOut)),
      filter(() => state$.value.auth.user != null),
      tap(() => localStorage.removeItem('@@@USER')),
      mapTo(authActions.internal.userNotFound())
    )) as AuthEpic
};

export const authEpic = combineEpics<AuthEpic>(
  authEpics.start,
  authEpics.signIn,
  authEpics.signOut
);

export type AuthState = Readonly<{ user?: IUser }>;

const reducer: Reducer<AuthState, AuthAction> = (state: AuthState = {}, action: AuthAction) => {
  switch (action.type) {
    case getType(authActions.internal.userFound):
      return { ...state, user: action.payload.user };
    case getType(authActions.internal.userNotFound):
      return { ...state, user: undefined };
    default:
      return state;
  }
};

export default reducer;
