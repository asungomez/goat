"use client";
import { FC, ReactNode, createContext, useContext, useMemo } from "react";
import { Locale, createLanguageTranslator } from ".";
import { usePathname } from "next/navigation";

type I18nContextType = {
  t: (key: string) => string;
  currentLanguage: Locale;
};

export const I18nContext = createContext<I18nContextType>({
  t: (key: string) => key,
  currentLanguage: "en",
});

export const useI18n = () => useContext(I18nContext);

type I18nProviderProps = {
  children: ReactNode;
};

export const I18nProvider: FC<I18nProviderProps> = ({ children }) => {
  const pathname = usePathname();
  const locale = useMemo(() => pathname?.split("/")[1] as Locale, [pathname]);

  const contextValue = useMemo(() => {
    const translator = createLanguageTranslator(locale);
    return { t: translator, currentLanguage: locale };
  }, [locale]);

  return (
    <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
  );
};
