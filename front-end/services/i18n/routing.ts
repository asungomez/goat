import { Locale } from ".";

const routeNames = [
  "users",
  "root",
  "content",
  "create-city",
  "city",
  "edit",
] as const;
export type RouteName = (typeof routeNames)[number];

type RouteTranslations = { [locale in Locale]: string };
export const routes: {
  [name in RouteName]: RouteTranslations;
} = {
  city: {
    es: "ciudad",
    en: "city",
  },
  content: {
    es: "contenido",
    en: "content",
  },
  "create-city": {
    es: "crear-ciudad",
    en: "create-city",
  },
  edit: {
    es: "editar",
    en: "edit",
  },
  root: {
    en: "",
    es: "",
  },
  users: {
    es: "usuarios",
    en: "users",
  },
} as const;

export const getLocalizedRoute = (name: string, locale: Locale) => {
  let route = `/${locale}`;
  const nameParts = name.split("/").filter((part) => part.length > 0);
  for (const part of nameParts) {
    if (routes[part as RouteName] && routes[part as RouteName][locale]) {
      route += `/${routes[part as RouteName][locale]}`;
    } else {
      route += `/${part}`;
    }
  }

  return route;
};

export const getRouteName = (path: string, language: Locale): string | null => {
  if (path === "") {
    return "";
  }
  const transformedPath = path
    .split("/")
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
    .join("/");

  return transformedPath;
};
