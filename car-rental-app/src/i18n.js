import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation files
import translationTR from './locales/tr/translation.json';
import translationEN from './locales/en/translation.json';
import translationRU from './locales/ru/translation.json';
import translationAR from './locales/ar/translation.json';

const resources = {
  tr: {
    translation: translationTR
  },
  en: {
    translation: translationEN
  },
  ru: {
    translation: translationRU
  },
  ar: {
    translation: translationAR
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'tr', // default language is Turkish
    fallbackLng: 'tr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
