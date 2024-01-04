import { getTranslatedCity } from '@/services/citiesService';
import { Description } from './components/Description/Description';
import { Gallery } from './components/Gallery/Gallery';
import { Heading } from './components/Heading/Heading';

export default async function ContentCityPage() {
  const city = await getTranslatedCity('en');
  return (
    <>
      <Gallery images={city.images} mb="30px" />
      <Heading name={city.name} />
      <Description description={city.description} />
    </>
  );
}
