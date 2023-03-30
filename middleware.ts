import { NextRequest, NextResponse } from 'next/server';
import langParser from 'accept-language-parser';
import {
  defaultLocale,
  getLocalePartsFrom,
  getRouteName,
  locales,
  ValidLanguage,
} from './i18n';

const findBestMatchingLocale = (acceptLangHeader: string) => {
  // parse the locales acceptable in the header, and sort them by priority (q)
  const recommendedLocales = langParser.parse(acceptLangHeader);

  // iterate the list of acceptable locales
  for (const recommendedLocale of recommendedLocales) {
    // attempt to match the language
    const matchedLanguage = locales.find((locale) => {
      const localeParts = getLocalePartsFrom({ locale });
      return recommendedLocale.code === localeParts.lang;
    });
    if (matchedLanguage) {
      return matchedLanguage;
    }
  }
  // if we didn't find a match, return the default locale
  return defaultLocale;
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const defaultLocaleParts = getLocalePartsFrom({ locale: defaultLocale });

  const pathnameIsMissingValidLocale = locales.every((locale) => {
    const localeParts = getLocalePartsFrom({ locale });
    return !pathname.startsWith(`/${localeParts.lang}`);
  });

  if (pathnameIsMissingValidLocale) {
    const matchedLocale = findBestMatchingLocale(
      request.headers.get('Accept-Language') || defaultLocale,
    );
    if (matchedLocale !== defaultLocale) {
      // redirect to user's preferred language
      const matchedLocaleParts = getLocalePartsFrom({ locale: matchedLocale });
      return NextResponse.redirect(
        new URL(`/${matchedLocaleParts.lang}/${pathname}`, request.url),
      );
    }
    // redirect to default locale
    return NextResponse.redirect(
      new URL(`/${defaultLocaleParts.lang}${pathname}`, request.url),
    );
  }

  let localizedRoute = `/${pathname.split('/').slice(2).join('/')}`;
  const language = pathname.split('/')[1] as ValidLanguage;
  if (localizedRoute.endsWith('/')) {
    localizedRoute = localizedRoute.slice(0, localizedRoute.length - 1);
  }
  const routeName = getRouteName(localizedRoute, language);
  if (routeName) {
    return NextResponse.rewrite(
      new URL(`/${language}/${routeName}`, request.url),
    );
  }
}

export const config = {
  // do not localize next.js paths
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
};
