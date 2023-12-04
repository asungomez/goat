import { ValidLanguage } from '@/i18n';

export type City = {
  id: string;
  images: string[];
  translations: { [language in ValidLanguage]: CityTranslation };
};

export type CityTranslation = {
  name: string;
  slug: string;
  description: string;
};

export type TranslatedCity = {
  id: string;
  images: string[];
  name: string;
  slug: string;
  description: string;
};
