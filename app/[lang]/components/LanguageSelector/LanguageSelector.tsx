import { useI18n } from '@/context/I18n/I18nContext';
import { ValidLanguage } from '@/i18n';
import { getLocalizedRoute, getRouteName } from '@/i18n';
import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import { FC } from 'react';
import { HiLanguage } from 'react-icons/hi2';

export const LanguageSelector: FC = () => {
  const { t, currentLanguage } = useI18n();
  const path = usePathname();
  const router = useRouter();

  if (!currentLanguage) {
    return null;
  }

  const changeLanguage = (language: ValidLanguage) => {
    if (language !== currentLanguage) {
      let currentRoute = `/${(path?.split('/').slice(2) || []).join('/')}`;
      if (currentRoute.endsWith('/') && currentRoute !== '/') {
        currentRoute = currentRoute.slice(0, currentRoute.length - 1);
      }
      const routeName = getRouteName(currentRoute, currentLanguage);
      const newPathname = routeName
        ? getLocalizedRoute(routeName, language)
        : path;
      if (newPathname) {
        router.push(newPathname);
      }
    }
  };

  return (
    <Menu>
      <MenuButton as={Button} aria-label={t('language')}>
        <Icon as={HiLanguage} />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => changeLanguage('es')}>{t('es')}</MenuItem>
        <MenuItem onClick={() => changeLanguage('en')}>{t('en')}</MenuItem>
      </MenuList>
    </Menu>
  );
};
