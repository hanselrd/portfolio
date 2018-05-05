import strings from '@app/core/strings';
import { RootState } from '@app/ducks';
import { createAction, createReducer } from 'redux-act';
import { Epic, combineEpics } from 'redux-observable';

export const localeActions = {
  internal: {
    languageChanged: createAction<string>('@@locale/LANGUAGE CHANGED')
  },
  start: createAction('@@locale/START'),
  change: createAction<string>('@@locale/CHANGE'),
  showModal: createAction('@@locale/SHOW MODAL'),
  hideModal: createAction('@@locale/HIDE MODAL')
};

export type LocaleEpic = Epic<
  | ReturnType<typeof localeActions.internal.languageChanged>
  | ReturnType<typeof localeActions.start>
  | ReturnType<typeof localeActions.change>
  | ReturnType<typeof localeActions.showModal>
  | ReturnType<typeof localeActions.hideModal>,
  RootState
>;

const startEpic: LocaleEpic = action$ =>
  action$
    .ofType(localeActions.start.getType())
    .mapTo(localeActions.internal.languageChanged(strings.getLanguage()));

const changeEpic: LocaleEpic = action$ =>
  action$
    .ofType(localeActions.change.getType())
    .do(action => strings.setLanguage(action.payload as string))
    .map(action =>
      localeActions.internal.languageChanged(action.payload as string)
    );

export const localeEpic = combineEpics<LocaleEpic>(startEpic, changeEpic);

export type LocaleState = Readonly<{
  language?: string;
  showModal: boolean;
}>;

const reducer = createReducer<LocaleState>({}, { showModal: false });

reducer.on(localeActions.internal.languageChanged, (state, payload) => ({
  ...state,
  language: payload
}));

reducer.on(localeActions.showModal, (state, payload) => ({
  ...state,
  showModal: true
}));

reducer.on(localeActions.hideModal, (state, payload) => ({
  ...state,
  showModal: false
}));

export default reducer;
