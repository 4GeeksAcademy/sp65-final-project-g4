import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "es",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        title: "Welcome",
        description: "Look for your house",
        about: "About",
        home: "Home",
      },
    },
    es: {
      translation: {
        title: "Bienvenido",
        description: "Busca tu piso!",
        about: "Sobre mí",
        home: "Inicio",
      },
    },
  },
});

export default i18n;