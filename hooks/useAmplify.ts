import { useI18n } from '@/context/I18n/I18nContext';
import { configureAmplify } from '@/src/configureAmplify';
import { useEffect } from 'react';

export const useAmplify = () => {
  const { currentLanguage } = useI18n();

  useEffect(() => {
    if (currentLanguage) {
      configureAmplify(currentLanguage);
    }
  }, [currentLanguage]);
};
