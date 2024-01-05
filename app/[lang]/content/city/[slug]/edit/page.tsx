import { ValidLanguage } from '@/i18n';
import { getCity } from '@/services/citiesService';
import { CityForm } from '../../../../../../components/CityForm/CityForm';
import { Heading } from './components/Heading/Heading';

type ContentEditCityPageParams = {
  slug: string;
  lang: string;
};

export default async function ContentEditCityPage({
  params,
}: Readonly<{ params: ContentEditCityPageParams }>) {
  const city = await getCity(params.slug, params.lang as ValidLanguage);
  return (
    <>
      <Heading />
      {city && <CityForm initialValues={city} />}
    </>
  );
}
