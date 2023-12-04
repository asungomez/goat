import { useAuth } from '@/context/Auth/AuthContext';
import { useI18n } from '@/context/I18n/I18nContext';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { LoadingSkeleton } from '../LoadingSkeleton/LoadingSkeleton';

type EditorOnlyProps = {
  children: ReactNode;
};

export const EditorOnly: FC<EditorOnlyProps> = ({ children }) => {
  const { isInGroup, authStatus } = useAuth();
  const { t } = useI18n();

  if (authStatus === 'checking') {
    return <LoadingSkeleton />;
  }

  if (isInGroup('Admin') || isInGroup('Editor')) {
    return <>{children}</>;
  }
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>{t('forbidden')}</AlertTitle>
      <AlertDescription>{t('editor-only')}</AlertDescription>
    </Alert>
  );
};
