import { ValidLanguage } from '@/i18n';
import { createContext, useContext } from 'react';

type I18nContextType = {
  t: (key: string) => string;
  currentLanguage: ValidLanguage;
};

export const I18nContext = createContext<I18nContextType>({
  t: () => '',
  currentLanguage: 'es',
});

export const useI18n = () => useContext(I18nContext);
