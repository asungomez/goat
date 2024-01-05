'use client';
import { useI18n } from '@/context/I18n/I18nContext';
import { Heading as HeadingUI } from '@chakra-ui/react';
import { FC } from 'react';

export const Heading: FC = () => {
  const { t } = useI18n();
  return <HeadingUI mb={5}>{t('title')}</HeadingUI>;
};
