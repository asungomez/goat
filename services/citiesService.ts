import { ValidLanguage } from '@/i18n';
import { translatedCityFactory } from '@/model/city/factory';
import { TranslatedCity } from '@/model/city/types';
import { cache } from 'react';

export const getTranslatedCities = cache(
  async (language: ValidLanguage): Promise<TranslatedCity[]> => {
    const cities = translatedCityFactory.buildList(5);
    return cities;
  },
);
