import { getRequestConfig } from "next-intl/server";
import en from "@/i18n/messages/en.json";
import id from "@/i18n/messages/id.json";

const DEFAULT_LOCALE = "en";
const messagesMap = {
  en,
  id,
};

export default getRequestConfig(async ({ locale }) => {
  const localeToLoad = Object.prototype.hasOwnProperty.call(messagesMap, locale)
    ? locale
    : DEFAULT_LOCALE;

  if (process.env.NODE_ENV !== "production") {
    console.log("getRequestConfig locale:", locale, "resolved:", localeToLoad);
    console.log(
      "hero heading sample:",
      messagesMap[localeToLoad]?.hero?.heading
    );
  }

  return {
    locale: localeToLoad,
    messages: messagesMap[localeToLoad],
  };
});
