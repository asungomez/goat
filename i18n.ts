export const defaultLocale = 'es-ES';
export const locales = ['en-US', 'es-ES'] as const;
export const languages = ['en', 'es'] as const;
export type ValidLanguage = (typeof languages)[number];
export type ValidLocale = (typeof locales)[number];

type PathnameLocale = {
  pathname: string;
  locale?: never;
};
type ISOLocale = {
  pathname?: never;
  locale: string;
};

type LocaleSource = PathnameLocale | ISOLocale;

export const getLocalePartsFrom = ({ pathname, locale }: LocaleSource) => {
  if (locale) {
    const localeParts = locale.toLowerCase().split('-');
    return {
      lang: localeParts[0],
      country: localeParts[1],
    };
  }
  const pathnameParts = pathname!.toLowerCase().split('/');
  return {
    lang: pathnameParts[1],
  };
};

export const getTranslator = (dictionary: Record<string, unknown>) => {
  return (key: string, params?: { [key: string]: string | number }): string => {
    const keyParts = key.split('.');
    let partialDictionary: unknown = dictionary;
    for (const part of keyParts) {
      partialDictionary = (partialDictionary as Record<string, unknown>)[part];
      if (
        partialDictionary === undefined ||
        typeof partialDictionary === 'string'
      ) {
        break;
      }
    }
    if (typeof partialDictionary !== 'string') {
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

const routeNames = ['users', 'root', 'content', 'content/create-city'] as const;
export type RouteName = (typeof routeNames)[number];

type RouteTranslations = { [lang in ValidLanguage]: string };
export const routes: {
  [name in RouteName]: RouteTranslations;
} = {
  content: {
    es: '/contenido',
    en: '/content',
  },
  'content/create-city': {
    es: '/contenido/crear-ciudad',
    en: '/content/create-city',
  },
  root: {
    en: '/',
    es: '/',
  },
  users: {
    es: '/usuarios',
    en: '/users',
  },
} as const;

export const getRouteName = (
  name: string,
  language: ValidLanguage,
): RouteName | null => {
  for (const routeName in routes) {
    if (Object.hasOwn(routes, routeName)) {
      const route = routes[routeName as RouteName];
      if (route[language] === name) {
        return routeName as RouteName;
      }
    }
  }
  return null;
};

export const getLocalizedRoute = (name: RouteName, language: ValidLanguage) => {
  return `/${language}${routes[name][language]}`;
};
