import { FC } from 'react';
import Image from 'next/image';
import image from './stop-sign.png';
import { useI18n } from '@/context/I18n/I18nContext';
import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react';
import { RxReload } from 'react-icons/rx';

export const InternalError: FC = () => {
  const { t } = useI18n();
  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      <Text align="center" marginBottom={4}>
        {t('something-went-wrong')}
      </Text>
      <Button
        onClick={() => window.location.reload()}
        leftIcon={<Icon as={RxReload} />}
      >
        {t('reload')}
      </Button>
      <Box maxW="sm">
        <Image src={image} alt={t('internal-error')} />
      </Box>
    </Flex>
  );
};
