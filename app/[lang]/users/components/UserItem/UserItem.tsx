import { useI18n } from '@/context/I18n/I18nContext';
import { useUsers } from '@/context/UsersManagement/UsersManagementContext';
import { Role, User } from '@/services/usersService';
import { Box, Flex, Select, useToast } from '@chakra-ui/react';
import { ChangeEventHandler, FC, useCallback, useState } from 'react';
type UserItemProps = {
  user: User;
};
export const UserItem: FC<UserItemProps> = ({ user }) => {
  const { t } = useI18n();
  const { changeRole } = useUsers();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const changeHandler: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (event) => {
      const role = event.target.value as Role;
      if (role !== user.role) {
        setIsLoading(true);
        changeRole(user.id, role)
          .then(() => {
            setIsLoading(false);
          })
          .catch(() => {
            setIsLoading(false);
            toast({
              title: t('role-update-failed'),
              description: t('try-again-later'),
              status: 'error',
              isClosable: true,
            });
          });
      }
    },
    [changeRole, t, toast, user.id, user.role],
  );
  return (
    <Box p={4} data-testid={`user-item-${user.email}`}>
      <Flex justify="space-between">
        <Box>{user.email}</Box>
        <Box>
          <Select
            value={user.role}
            onChange={changeHandler}
            isDisabled={isLoading}
          >
            <option value="Admin">{t('admin')}</option>
            <option value="Editor">{t('editor')}</option>
            <option value="Visitor">{t('visitor')}</option>
          </Select>
        </Box>
      </Flex>
    </Box>
  );
};
