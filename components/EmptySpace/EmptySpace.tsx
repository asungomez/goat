import { FC } from 'react';
import Image from 'next/image';
import image from './empty-room.png';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useI18n } from '@/context/I18n/I18nContext';

export const EmptySpace: FC = () => {
  const { t } = useI18n();
  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      <Text align="center" marginBottom={4}>
        {t('empty-message')}
      </Text>
      <Box maxW="sm">
        <Image src={image} alt={t('empty-message')} />
      </Box>
    </Flex>
  );
};
