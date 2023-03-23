import { useAuth } from '@/context/Auth/AuthContext';
import { useI18n } from '@/context/I18n/I18nContext';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Skeleton,
  Stack,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

type AdminOnlyProps = {
  children: ReactNode;
};

export const AdminOnly: FC<AdminOnlyProps> = ({ children }) => {
  const { isInGroup, authStatus } = useAuth();
  const { t } = useI18n();

  if (authStatus === 'checking') {
    return (
      <Stack>
        <VisuallyHidden>{t('loading')}</VisuallyHidden>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    );
  }

  if (isInGroup('Admin')) {
    return <>{children}</>;
  }
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>{t('forbidden')}</AlertTitle>
      <AlertDescription>{t('admin-only')}</AlertDescription>
    </Alert>
  );
};
