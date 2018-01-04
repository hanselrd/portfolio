import LocalizedStrings from 'react-localization';

const requireFile = (locale, file) => {
  return require(`./${locale}/${file}`).default;
};

const requireLocale = locale => {
  return {
    header: requireFile(locale, 'components/header'),
    footer: requireFile(locale, 'containers/footer'),
    home: requireFile(locale, 'containers/routes/home'),
    counter: requireFile(locale, 'components/counter')
  };
};

const strings = new LocalizedStrings({
  en: requireLocale('en'),
  es: requireLocale('es'),
  ja: requireLocale('ja')
});

export default strings;
