import { ActionsObservable, StateObservable } from 'redux-observable';
import { Subject } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { dependencies, RootState } from '../ducks';
import { localeActions, localeEpics } from './locale';

it('start epic executes correctly', async () => {
  const action$ = ActionsObservable.of(localeActions.start());
  const state$ = new StateObservable<RootState>(new Subject(), {
    auth: {},
    locale: { showModal: false },
    router: {}
  });

  const mockLocalizationGetLanguage = jest.spyOn(dependencies.localization, 'getLanguage');
  mockLocalizationGetLanguage.mockImplementation(() => 'en');

  const result = await localeEpics
    .start(action$, state$, dependencies)
    .pipe(toArray())
    .toPromise();

  expect(mockLocalizationGetLanguage.mock.calls.length).toBe(1);
  expect(result).toEqual([localeActions.internal.languageChanged('en')]);
});

it('change saga executes correctly', async () => {
  const action$ = ActionsObservable.of(localeActions.change('en'));
  const state$ = new StateObservable<RootState>(new Subject(), {
    auth: {},
    locale: { showModal: false },
    router: {}
  });

  const mockLocalizationSetLanguage = jest.spyOn(dependencies.localization, 'setLanguage');

  const result = await localeEpics
    .change(action$, state$, dependencies)
    .pipe(toArray())
    .toPromise();

  expect(mockLocalizationSetLanguage.mock.calls.length).toBe(1);
  expect(mockLocalizationSetLanguage.mock.calls[0][0]).toBe('en');
  expect(result).toEqual([localeActions.internal.languageChanged('en')]);
});
