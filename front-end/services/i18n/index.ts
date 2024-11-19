import esDictionary from "./dictionaries/es";
import enDictionary from "./dictionaries/en";

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export type TranslatorFunction = (
  key: string,
  params?: { [key: string]: string | number }
) => string;

const dictionaries = {
  en: enDictionary,
  es: esDictionary,
};

export const getDictionary = (locale: Locale) => dictionaries[locale];

export const createLanguageTranslator = (
  locale: Locale
): TranslatorFunction => {
  const dictionary = getDictionary(locale);
  return (key: string, params?: { [key: string]: string | number }): string => {
    const keyParts = key.split(".");
    let partialDictionary: unknown = dictionary;
    for (const part of keyParts) {
      partialDictionary = (partialDictionary as Record<string, unknown>)[part];
      if (
        partialDictionary === undefined ||
        typeof partialDictionary === "string"
      ) {
        break;
      }
    }
    if (typeof partialDictionary !== "string") {
      return key;
    }
    let translation: string = partialDictionary;
    if (params && Object.entries(params).length) {
      Object.entries(params).forEach(([key, value]) => {
        translation = translation.replace(`{{ ${key} }}`, String(value));
      });
    }
    return translation;
  };
};
