import { TranslatedCity } from '@/model/city/types';
import { Container, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { CityCard } from '../CityCard/CityCard';

type CitiesProps = {
  cities: TranslatedCity[];
};

export const Cities: FC<CitiesProps> = ({ cities }) => {
  return (
    <Container
      maxW={{
        base: 'container.sm',
        sm: 'container.sm',
        md: 'container.md',
        lg: 'container.lg',
        xl: 'container.xl',
      }}
    >
      <Stack
        spacing="3"
        direction={{ sm: 'column', md: 'row' }}
        wrap="wrap"
        m={{
          base: 3,
        }}
        justifyContent="center"
      >
        {cities.map((city) => (
          <CityCard city={city} key={city.id} />
        ))}
      </Stack>
    </Container>
  );
};
