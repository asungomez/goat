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
  Icon,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FC } from 'react';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import { FaList } from 'react-icons/fa';

type CityCardProps = {
  city: TranslatedCity;
};

export const CityCard: FC<CityCardProps> = ({ city }) => {
  const { t } = useI18n();
  return (
    <Card
      w={{
        base: '100%',
        lg: '48%',
        xl: '32%',
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
          <Button variant="solid" leftIcon={<Icon as={MdModeEdit} />} size="sm">
            {t('edit-city')}
          </Button>
          <Button
            variant="solid"
            colorScheme="red"
            leftIcon={<Icon as={MdDelete} />}
            size="sm"
          >
            {t('delete-city')}
          </Button>
          <Button variant="outline" leftIcon={<Icon as={FaList} />} size="sm">
            {t('list-city-points')}
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
