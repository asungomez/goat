import { useAuth } from '@/context/Auth/AuthContext';
import { useI18n } from '@/context/I18n/I18nContext';
import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { FC } from 'react';
import { CgProfile } from 'react-icons/cg';
import { VscSettings } from 'react-icons/vsc';
import { MdOutlineLogout } from 'react-icons/md';

export const UserMenu: FC = () => {
  const { t } = useI18n();
  const { user, logOut } = useAuth();
  const email = user?.attributes?.email;
  return (
    <Menu>
      <MenuButton as={Button} aria-label={t('my-account')}>
        <Icon as={CgProfile} />
      </MenuButton>
      <MenuList>
        {email && (
          <>
            <Text paddingLeft="12px">{email}</Text>
            <MenuDivider />
          </>
        )}
        <MenuItem icon={<Icon as={VscSettings} />}>{t('settings')}</MenuItem>
        <MenuItem icon={<Icon as={MdOutlineLogout} />} onClick={logOut}>
          {t('log-out')}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
