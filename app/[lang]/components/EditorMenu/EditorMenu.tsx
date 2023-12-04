import { Link } from '@/components/Link/Link';
import { useAuth } from '@/context/Auth/AuthContext';
import { useI18n } from '@/context/I18n/I18nContext';
import { FC } from 'react';

export const EditorMenu: FC = () => {
  const { isInGroup } = useAuth();
  const { t } = useI18n();
  if (!(isInGroup('Admin') || isInGroup('Editor'))) {
    return null;
  }
  return <Link to="content">{t('content')}</Link>;
};
