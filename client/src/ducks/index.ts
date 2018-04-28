import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import authReducer, { AuthEpic, AuthState, authEpic } from './auth';
import chatReducer, { ChatEpic, ChatState, chatEpic } from './chat';
import metadataReducer, {
  MetadataEpic,
  MetadataState,
  metadataEpic
} from './metadata';

export type RootEpic = AuthEpic | ChatEpic | MetadataEpic;

export const rootEpic = combineEpics<RootEpic>(
  authEpic,
  chatEpic,
  metadataEpic
);

export type RootState = Readonly<{
  auth: AuthState;
  chat: ChatState;
  metadata: MetadataState;
}>;

export default combineReducers<RootState>({
  auth: authReducer,
  chat: chatReducer,
  metadata: metadataReducer
});
