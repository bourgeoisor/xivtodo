import { createI18n } from "vue-i18n";

const messages = {
  en: {
    page: {
      home: "Home",
      profile: "Profile",
      encounters: "Encounters",
      questlines: "Questlines",
      challenges: "Challenges",
      checklist: "Checklist",
      settings: "Settings",
      about: "About",
      help: "Help",
      privacy: "Privacy Policy",
      contact: "Contact",
    },
    message: {
      changeActiveCharacter: "Change active character",
    },
  },
  fr: {
    page: {
      home: "Accueil ",
      profile: "Profil",
      encounters: "Combats",
      questlines: "Quêtes",
      challenges: "Défis",
      checklist: "Tâches",
      settings: "Paramètres",
    },
    message: {
      changeActiveCharacter: "Change personnage actif",
    },
  },
};

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages,
});

export default i18n;
