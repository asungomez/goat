import { useI18n } from '@/context/I18n/I18nContext';
import { logIn } from '@/services/authenticationService';
import { Button, Icon } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { BsGoogle } from 'react-icons/bs';

export const LogInButton: FC = () => {
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);

  const clickHandler = () => {
    setLoading(true);
    logIn()
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  return (
    <Button
      colorScheme="blue"
      leftIcon={<Icon as={BsGoogle} />}
      onClick={clickHandler}
      isLoading={loading}
      loadingText={t('logging-in')}
    >
      {t('log-in')}
    </Button>
  );
};
