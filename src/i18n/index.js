import { createI18n } from "vue-i18n";
import langEN from "./lang-en.json";
import langFR from "./lang-fr.json";
import langDE from "./lang-de.json";
import langJA from "./lang-ja.json";

const messages = {
  en: langEN,
  fr: langFR,
  de: langDE,
  ja: langJA,
};

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages,
});

export default i18n;
