import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation files
import translationTR from './locales/tr/translation.json';
import translationEN from './locales/en/translation.json';

const resources = {
  tr: {
    translation: translationTR
  },
  en: {
    translation: translationEN
  }
};

i18n
  .use(LanguageDetector) // Detect browser language
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'tr', // fallback to Turkish if browser language not supported
    supportedLngs: ['en', 'tr'], // Only support English and Turkish
    detection: {
      order: ['localStorage', 'navigator'], // Check localStorage first, then browser language
      caches: ['localStorage'], // Cache the selected language in localStorage
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
