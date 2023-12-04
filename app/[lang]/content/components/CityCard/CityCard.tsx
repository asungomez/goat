'use client';
import { useI18n } from '@/context/I18n/I18nContext';
import { TranslatedCity } from '@/model/city/types';
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FC } from 'react';

type CityCardProps = {
  city: TranslatedCity;
};

export const CityCard: FC<CityCardProps> = ({ city }) => {
  const { t } = useI18n();
  return (
    <Card
      w={{
        base: '100%',
        md: '48%',
        lg: '32%',
      }}
    >
      <CardBody>
        <Image src={city.images[0]} alt={city.name} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{city.name}</Heading>
          <Text>{city.description}</Text>
        </Stack>
      </CardBody>
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid">{t('edit-city')}</Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
