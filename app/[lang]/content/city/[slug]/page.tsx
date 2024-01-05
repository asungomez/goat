import { ValidLanguage } from '@/i18n';
import { getTranslatedCity } from '@/services/citiesService';
import { Description } from './components/Description/Description';
import { Gallery } from './components/Gallery/Gallery';
import { Heading } from './components/Heading/Heading';

type ContentCityPageParams = {
  slug: string;
  lang: string;
};

export default async function ContentCityPage({
  params,
}: Readonly<{
  params: ContentCityPageParams;
}>) {
  const city = await getTranslatedCity(
    params.slug,
    params.lang as ValidLanguage,
  );
  return (
    <>
      <Gallery images={city.images} mb="30px" />
      <Heading name={city.name} />
      <Description description={city.description} />
    </>
  );
}
