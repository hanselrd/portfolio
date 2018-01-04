import LocalizedStrings from 'react-localization';

const requireFile = (locale, file) => {
  return require(`./${locale}/${file}`).default;
};

const requireLocale = locale => {
  return {
    footer: requireFile(locale, 'footer'),
    home: requireFile(locale, 'home')
  };
};

const strings = new LocalizedStrings({
  en: requireLocale('en'),
  es: requireLocale('es'),
  ja: requireLocale('ja')
});

export default strings;
