import { languages, ValidLanguage } from '@/i18n';
import { Factory } from 'fishery';
import { City, TranslatedCity } from './types';

export const cityFactory = Factory.define<City>(({ sequence, params }) => {
  const translations: Partial<City['translations']> = {};
  for (const lang of languages) {
    translations[lang] = {
      name: `City ${sequence} in ${lang}`,
      slug: `city-${sequence}-in-${lang}`,
      description: `Description of city ${sequence} in ${lang}`,
      ...params?.translations?.[lang],
    };
  }
  return {
    id: `city-${sequence}`,
    images: ['https://picsum.photos/900/600'],
    ...params,
    translations: translations as City['translations'],
  };
});

type TranslatedCityTransientParams = {
  fromCity: { city: City; language: ValidLanguage };
};

export const translatedCityFactory = Factory.define<
  TranslatedCity,
  TranslatedCityTransientParams
>(({ sequence, params, transientParams: { fromCity } }) => {
  if (fromCity) {
    const { city, language } = fromCity;
    return {
      id: city.id,
      images: city.images,
      ...city.translations[language],
    };
  }
  return {
    id: `city-${sequence}`,
    images: ['https://picsum.photos/900/600'],
    name: `City ${sequence}`,
    slug: `city-${sequence}`,
    description: `Description of city ${sequence}`,
    ...params,
  };
});
