import { getTranslatedCities } from '@/services/citiesService';
import { AddCityButton } from './components/AddCityButton/AddCityButton';
import { Cities } from './components/Cities/Cities';
import { Heading } from './components/Heading/Heading';

export default async function ContentPage() {
  const cities = await getTranslatedCities('en');
  return (
    <>
      <Heading />
      <AddCityButton />
      <Cities cities={cities} />
    </>
  );
}
