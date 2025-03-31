import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Traducciones básicas
const resources = {
  en: {
    translation: {
      home: "Home",
      about: "About",
      projects: "Projects",
      resume: "Resume",
      blogs: "Blogs",
    },
  },
  es: {
    translation: {
      home: "Inicio",
      about: "Sobre mí",
      projects: "Proyectos",
      resume: "CV",
      blogs: "Blogs",
    },
  },
};

i18n
  .use(LanguageDetector) // detecta automáticamente el idioma del navegador
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en", // idioma por defecto
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
