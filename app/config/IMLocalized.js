import memoize from "lodash.memoize"; // Use for caching/memoize for better performance
import i18n from "i18n-js";
import * as Localization from "expo-localization";
import { I18nManager } from "react-native";

export const translationGetters = {
  es: () => require("./../assets/i18n/es.json"),
  en: () => require("./../assets/i18n/en.json"),
  fr: () => require("./../assets/i18n/fr.json"),
  "es-US": () => require("./../assets/i18n/es.json"),
  "en-US": () => require("./../assets/i18n/en.json"),
  "fr-FR": () => require("./../assets/i18n/fr.json"),
};
export const IMLocalized = memoize(
  (key, config) =>
    i18n.t(key, config).includes("missing") ? key : i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);
export const init = () => {
  let localeLanguageTag = Localization.locale;

  let isRTL = Localization.isRTL;
  IMLocalized.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config

  if (translationGetters[localeLanguageTag]) {
    i18n.translations = {
      [localeLanguageTag]: translationGetters[localeLanguageTag](),
    };
  } else {
    i18n.translations = {
      ["en"]: translationGetters["en"](),
    };
  }

  i18n.locale = localeLanguageTag;
};
