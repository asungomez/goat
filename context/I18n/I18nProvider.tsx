import { getTranslator, ValidLanguage } from '@/i18n';
import { usePathname } from 'next/navigation';
import { FC, ReactNode, useMemo } from 'react';
import { I18nContext } from './I18nContext';
import { dictionaries as defaultDictionaries } from '@/dictionaries';

type I18nProviderProps = {
  children: ReactNode;
  dictionaries: { [language in ValidLanguage]: Record<string, string> };
};

export const I18nProvider: FC<I18nProviderProps> = ({
  children,
  dictionaries,
}) => {
  const pathname = usePathname();
  const language = useMemo(
    () => pathname?.split('/')[1] as ValidLanguage,
    [pathname],
  );

  const contextValue = useMemo(() => {
    const defaultDictionary = defaultDictionaries[language];
    const dictionary = dictionaries[language];
    const translator = getTranslator({ ...defaultDictionary, ...dictionary });
    return { t: translator, currentLanguage: language };
  }, [language, dictionaries]);

  return (
    <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
  );
};
