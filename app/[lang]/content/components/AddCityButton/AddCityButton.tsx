'use client';
import { Link } from '@/components/Link/Link';
import { useI18n } from '@/context/I18n/I18nContext';
import { Button, Icon } from '@chakra-ui/react';
import { FC } from 'react';
import { FiPlus } from 'react-icons/fi';

export const AddCityButton: FC = () => {
  const { t } = useI18n();
  return (
    <Link to="content/create-city">
      <Button variant="solid" leftIcon={<Icon as={FiPlus} />}>
        {t('add-city')}
      </Button>
    </Link>
  );
};
