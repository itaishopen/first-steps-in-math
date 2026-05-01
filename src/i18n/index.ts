import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import he from './locales/he';
import nl from './locales/nl';

const saved = localStorage.getItem('lang');
const browserLang = navigator.language.slice(0, 2);
const supported = ['en', 'he', 'nl'];
const defaultLng = saved ?? (supported.includes(browserLang) ? browserLang : 'en');

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    he: { translation: he },
    nl: { translation: nl },
  },
  lng: defaultLng,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
