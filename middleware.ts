import { NextRequest, NextResponse } from 'next/server';
import langParser from 'accept-language-parser';
import { defaultLocale, getLocalePartsFrom, locales } from './i18n';

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
    } else {
      // rewrite it so next.js will render `/` as if it was `/es`
      return NextResponse.rewrite(
        new URL(`/${defaultLocaleParts.lang}${pathname}`, request.url),
      );
    }
  }
}

export const config = {
  // do not localize next.js paths
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
};
