import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import es from "./locales/es.json";
const resources = {
  en: { translation: en },
  es: { translation: es },
} as const;
i18n

  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",

    // 👇 sigue bastando 'es' y 'en'
    supportedLngs: ["es", "en"],
    nonExplicitSupportedLngs: true, // ★ la clave

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      // ya no necesitamos checkWhitelist
    },

    interpolation: { escapeValue: false },
    debug: true, // mira la consola para verificar
  });

export default i18n;
