import { ValidLanguage } from '@/i18n';
import { translatedCityFactory } from '@/model/city/factory';
import { City, CityFormValues, TranslatedCity } from '@/model/city/types';

import { cache } from 'react';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getTranslatedCities = cache(
  async (language: ValidLanguage): Promise<TranslatedCity[]> => {
    await sleep(1000);
    const cities = translatedCityFactory.buildList(5);
    return cities;
  },
);

export const createCity = async (city: CityFormValues): Promise<City> => {
  await sleep(1000);
  return { ...city, id: '1' };
};
