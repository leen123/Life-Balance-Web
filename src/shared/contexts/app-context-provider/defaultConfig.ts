import AppLocale from "../../localization";

const defaultConfig = {
  locale: {
    languageId: 'english',
    code: 'en' as keyof typeof AppLocale,
    name: 'English',
    icon: 'us',
  },
  direction: 'ltr',
  themeMode: 'dark',
  rtlLocale: ['ar'],
};
export default defaultConfig;
