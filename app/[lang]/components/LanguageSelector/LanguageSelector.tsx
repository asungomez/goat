import { useI18n } from '@/context/I18n/I18nContext';
import { ValidLanguage } from '@/i18n';
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

  const changeLanguage = (language: ValidLanguage) => {
    if (language !== currentLanguage) {
      const newPathname = `/${language}/${(
        path?.split('/').slice(2) || []
      ).join('/')}`;
      router.push(newPathname);
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
