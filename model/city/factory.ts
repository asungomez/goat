import { languages, ValidLanguage } from '@/i18n';
import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';
import { City, TranslatedCity } from './types';

export const cityFactory = Factory.define<City>(({ sequence, params }) => {
  const translations: Partial<City['translations']> = {};
  for (const lang of languages) {
    translations[lang] = {
      name: faker.location.city(),
      slug: `city-${sequence}-in-${lang}`,
      description: faker.lorem.paragraphs(3),
      ...params?.translations?.[lang],
    };
  }
  return {
    id: `city-${sequence}`,
    images: [
      'https://picsum.photos/900/600',
      'https://picsum.photos/900/600',
      'https://picsum.photos/900/600',
    ],
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
    images: [
      'https://loremflickr.com/900/600',
      'https://picsum.photos/900/600',
      'https://placekitten.com/900/600',
    ],
    name: faker.location.city(),
    slug: `city-${sequence}`,
    description: faker.lorem.paragraphs(3),
    ...params,
  };
});
