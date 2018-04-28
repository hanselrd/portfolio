import firebase from '@app/core/firebase';
import { RootState } from '@app/ducks';
import { createAction, createReducer } from 'redux-act';
import { Epic, combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import { authActions } from './auth';

interface IUser {
  email?: string;
  provider: string;
  role?: number;
  created: number;
}

interface IUsers {
  [userId: string]: IUser;
}

export const metadataActions = {
  internal: {
    userUpdated: createAction<{ id: string; user: IUser }>(
      '@@metadata/USER UPDATED'
    )
  },
  loadUser: createAction<string>('@@metadata/LOAD USER')
};

export type MetadataEpic = Epic<
  | ReturnType<typeof authActions.internal.userFound>
  | ReturnType<typeof authActions.internal.userMissing>
  | ReturnType<typeof metadataActions.internal.userUpdated>
  | ReturnType<typeof metadataActions.loadUser>,
  RootState
>;

const metadataRef = firebase.database().ref('metadata');
const getUserRef = (userId: string) => metadataRef.child('users').child(userId);

const startEpic: MetadataEpic = (action$, store) =>
  action$
    .ofType(authActions.internal.userFound.getType())
    .map(action =>
      metadataActions.loadUser((action.payload as firebase.User).uid)
    );

// currently loads one user at a time
// because itll be used to lazily load user data
// from those using the chat
const loadUserEpic: MetadataEpic = (action$, store) =>
  action$
    .ofType(metadataActions.loadUser.getType())
    .filter(() => store.getState().auth.user != null)
    .switchMap(action =>
      Observable.fromEvent<firebase.database.DataSnapshot>(
        getUserRef(action.payload as string) as any,
        'value'
      )
        .filter(snapshot => snapshot && snapshot.key != null)
        .map(snapshot =>
          metadataActions.internal.userUpdated({
            id: snapshot.key!,
            user: snapshot.val()
          })
        )
    );

export const metadataEpic = combineEpics<MetadataEpic>(startEpic, loadUserEpic);

export type MetadataState = Readonly<{
  users: IUsers;
}>;

const reducer = createReducer<MetadataState>({}, { users: {} });

reducer.on(metadataActions.internal.userUpdated, (state, payload) => ({
  ...state,
  users: { ...state.users, [payload.id]: payload.user }
}));

reducer.on(authActions.internal.userMissing, (state, payload) => ({
  ...state,
  users: {}
}));

export default reducer;
