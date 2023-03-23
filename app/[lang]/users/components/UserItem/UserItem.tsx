import { useI18n } from '@/context/I18n/I18nContext';
import { User } from '@/services/usersService';
import { Box, Flex, Select } from '@chakra-ui/react';
import { FC } from 'react';
type UserItemProps = {
  user: User;
};
export const UserItem: FC<UserItemProps> = ({ user }) => {
  const { t } = useI18n();
  return (
    <Box p={4}>
      <Flex justify="space-between">
        <Box>{user.email}</Box>
        <Box>
          <Select value={user.role}>
            <option value="Admin">{t('admin')}</option>
            <option value="Visitor">{t('visitor')}</option>
          </Select>
        </Box>
      </Flex>
    </Box>
  );
};
