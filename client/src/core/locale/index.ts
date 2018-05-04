import LocalizedStrings, { LocalizedStringsMethods } from 'react-localization';
import en from './en';
import es from './es';

export interface IStrings extends LocalizedStringsMethods {
  language: string;
  navigation: string;
  home: string;
  blog: string;
  projects: string;
  cv: string;
  logIn: string;
  signUp: string;
  profile: string;
  settings: string;
  logOut: string;
}

const strings: IStrings = new LocalizedStrings({ en, es });

strings.setLanguage('es');

export default strings;
