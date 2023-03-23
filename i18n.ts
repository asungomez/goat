export const defaultLocale = 'es-ES';
export const locales = ['en-US', 'es-ES'] as const;
const languages = ['en', 'es'] as const;
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
  } else {
    const pathnameParts = pathname!.toLowerCase().split('/');
    return {
      lang: pathnameParts[1],
    };
  }
};

export const getTranslator = (dictionary: any) => {
  return (key: string, params?: { [key: string]: string | number }): string => {
    let translation = key
      .split('.')
      .reduce((obj, key) => obj && obj[key], dictionary);
    if (!translation) {
      return key;
    }
    if (params && Object.entries(params).length) {
      Object.entries(params).forEach(([key, value]) => {
        translation = translation.replace(`{{ ${key} }}`, String(value));
      });
    }
    return translation;
  };
};

const routeNames = ['users', 'root'] as const;
export type RouteName = (typeof routeNames)[number];

type RouteTranslations = { [lang in ValidLanguage]: string };
export const routes: {
  [name in RouteName]: RouteTranslations;
} = {
  users: {
    es: '/usuarios',
    en: '/users',
  },
  root: {
    en: '/',
    es: '/',
  },
} as const;

export const getRouteName = (
  name: string,
  language: ValidLanguage,
): RouteName | null => {
  for (const routeName in routes) {
    if (Object.prototype.hasOwnProperty.call(routes, routeName)) {
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
