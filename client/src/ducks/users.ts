import firebase from '@app/core/firebase';
import { RootState } from '@app/ducks';
import { createAction, createReducer } from 'redux-act';
import { Epic, combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import { authActions } from './auth';

interface IUser {
  displayName: string;
  photoUrl?: string;
  email?: string;
  provider?: string;
  role: number;
  created: number;
  online: boolean;
}

interface IUsers {
  [uid: string]: IUser;
}

export const usersActions = {
  internal: {
    userUpdated: createAction<{ id: string; user: IUser }>(
      '@@users/USER UPDATED'
    )
  },
  loadUser: createAction<string>('@@users/LOAD USER')
};

export type UsersEpic = Epic<
  | ReturnType<typeof authActions.internal.userFound>
  | ReturnType<typeof authActions.internal.userMissing>
  | ReturnType<typeof usersActions.internal.userUpdated>
  | ReturnType<typeof usersActions.loadUser>,
  RootState
>;

const getUserRef = (uid: string) =>
  firebase
    .database()
    .ref('users')
    .child(uid);

const startEpic: UsersEpic = action$ =>
  action$
    .ofType(authActions.internal.userFound.getType())
    .map(action =>
      usersActions.loadUser((action.payload as firebase.User).uid)
    );

const loadUserEpic: UsersEpic = (action$, store) =>
  action$
    .ofType(usersActions.loadUser.getType())
    .filter(() => store.getState().auth.user != null)
    .switchMap(action =>
      Observable.fromEvent<firebase.database.DataSnapshot | null>(
        getUserRef(action.payload as string) as any,
        'value'
      )
        .filter(snapshot => snapshot != null && snapshot.key != null)
        .map(snapshot =>
          usersActions.internal.userUpdated({
            id: snapshot!.key!,
            user: snapshot!.val()
          })
        )
    );

export const usersEpic = combineEpics<UsersEpic>(startEpic, loadUserEpic);

export type UsersState = Readonly<IUsers>;

const reducer = createReducer<UsersState>({}, {});

reducer.on(usersActions.internal.userUpdated, (state, payload) => ({
  ...state,
  [payload.id]: payload.user
}));

reducer.on(authActions.internal.userMissing, (state, payload) => ({}));

export default reducer;
