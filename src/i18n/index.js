import { createI18n } from "vue-i18n";
import langEN from "./lang-en.json";
import langFR from "./lang-fr.json";

const messages = {
  en: langEN,
  fr: langFR,
};

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages,
});

export default i18n;
