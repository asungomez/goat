import { useI18n } from '@/context/I18n/I18nContext';
import { Skeleton, Stack, VisuallyHidden } from '@chakra-ui/react';
import { FC } from 'react';

export const LoadingSkeleton: FC = () => {
  const { t } = useI18n();
  return (
    <Stack>
      <VisuallyHidden>{t('loading')}</VisuallyHidden>
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
    </Stack>
  );
};
