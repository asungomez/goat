import serverContext from "server-only-context";
import { Locale, TranslatorFunction, createLanguageTranslator } from ".";
import { setTimeout } from "timers/promises";

export const [getTranslator, setTranslator] =
  serverContext<TranslatorFunction | null>(null);
export const [getCurrentLanguage, setCurrentLanguage] =
  serverContext<Locale>("en");

export const getPageTranslator = async () => {
  const maxRetries = 10;
  for (let i = 0; i < maxRetries; i++) {
    const translator = getTranslator();
    if (translator) {
      return translator;
    }
    await setTimeout(100);
  }
  return (key: string) => key;
};

export const setupLocale = (locale: Locale) => {
  const translator = createLanguageTranslator(locale);
  setTranslator(translator);
  setCurrentLanguage(locale);
};
