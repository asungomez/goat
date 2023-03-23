'use client';

import { useI18n } from '@/context/I18n/I18nContext';
import { Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FC } from 'react';
import { BsSearch } from 'react-icons/bs';

export const SearchBar: FC = () => {
  const { t } = useI18n();
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <Icon color="gray.300" as={BsSearch} />
      </InputLeftElement>
      <Input type="text" placeholder={t('search')} />
    </InputGroup>
  );
};
