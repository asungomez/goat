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
import { Link } from '@/components/Link/Link';
import { truncate } from 'lodash';

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
          <Link to={`/content/city/${city.slug}`}>
            <Heading size="md">{city.name}</Heading>
          </Link>
          <Text>
            {truncate(city.description, { length: 100, separator: /\s/g })}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter justifyContent="flex-end" display="flex" flexDir="row">
        <ButtonGroup spacing="2">
          <Link to={`/content/city/${city.slug}/edit`}>
            <Button
              variant="solid"
              leftIcon={<Icon as={MdModeEdit} />}
              size="sm"
            >
              {t('edit-city')}
            </Button>
          </Link>

          <Button
            variant="solid"
            colorScheme="red"
            leftIcon={<Icon as={MdDelete} />}
            size="sm"
          >
            {t('delete-city')}
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
