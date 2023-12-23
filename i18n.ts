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

const routeNames = ['users', 'root', 'content', 'create-city', 'city'] as const;
export type RouteName = (typeof routeNames)[number];

type RouteTranslations = { [lang in ValidLanguage]: string };
export const routes: {
  [name in RouteName]: RouteTranslations;
} = {
  city: {
    es: 'ciudad',
    en: 'city',
  },
  content: {
    es: 'contenido',
    en: 'content',
  },
  'create-city': {
    es: 'crear-ciudad',
    en: 'create-city',
  },
  root: {
    en: '',
    es: '',
  },
  users: {
    es: 'usuarios',
    en: 'users',
  },
} as const;

export const getRouteName = (
  path: string,
  language: ValidLanguage,
): string | null => {
  if (path === '') {
    return '';
  }
  const transformedPath = path
    .split('/')
    .filter((part) => part.length > 0)
    .map((part) => {
      const lowercasePart = part.toLowerCase();
      for (const pathSegment in routes) {
        const translations = routes[pathSegment as RouteName];
        if (translations[language] === lowercasePart) {
          return pathSegment;
        }
      }
      return lowercasePart;
    })
    .join('/');

  return transformedPath;
};

export const getLocalizedRoute = (name: string, language: ValidLanguage) => {
  let route = `/${language}`;
  const nameParts = name.split('/').filter((part) => part.length > 0);
  for (const part of nameParts) {
    if (routes[part as RouteName] && routes[part as RouteName][language]) {
      route += `/${routes[part as RouteName][language]}`;
    } else {
      route += `/${part}`;
    }
  }

  return route;
};
