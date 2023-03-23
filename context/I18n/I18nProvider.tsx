import { defaultLocale, getTranslator, ValidLanguage } from '@/i18n';
import { usePathname } from 'next/navigation';
import { FC, ReactNode, useMemo } from 'react';
import { I18nContext } from './I18nContext';

type I18nProviderProps = {
  children: ReactNode;
  dictionaries: { [language in ValidLanguage]: any };
};

export const I18nProvider: FC<I18nProviderProps> = ({
  children,
  dictionaries,
}) => {
  const pathname = usePathname();
  const language = (pathname?.split('/')[1] ||
    defaultLocale.split('-')[0]) as ValidLanguage;

  const contextValue = useMemo(() => {
    const dictionary = dictionaries[language];
    const translator = getTranslator(dictionary);
    return { t: translator, currentLanguage: language };
  }, [language, dictionaries]);

  return (
    <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
  );
};
