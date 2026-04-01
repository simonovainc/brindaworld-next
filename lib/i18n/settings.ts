import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import fr from './fr.json';

export const defaultNS = 'common';
export const resources = {
  en: {
    common: en,
  },
  fr: {
    common: fr,
  },
};

if (typeof window !== 'undefined') {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      defaultNS,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
      },
    });
}

export default i18n;
