'use client';
import { useI18n } from '@/context/I18n/I18nContext';
import { FC } from 'react';
import { Heading as ChakraHeading } from '@chakra-ui/react';

export const Heading: FC = () => {
  const { t } = useI18n();
  return <ChakraHeading mb={8}>{t('users')}</ChakraHeading>;
};
