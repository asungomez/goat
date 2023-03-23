import { useAuth } from '@/context/Auth/AuthContext';
import { CircularProgress } from '@chakra-ui/react';
import { FC } from 'react';
import { AdminMenu } from '../AdminMenu/AdminMenu';
import { LogInButton } from '../LogInButton/LogInButton';
import { UserMenu } from '../UserMenu/UserMenu';

export const AuthMenu: FC = () => {
  const { authStatus } = useAuth();
  switch (authStatus) {
    case 'checking':
      return <CircularProgress isIndeterminate size="30px" />;
    case 'unauthenticated':
      return <LogInButton />;
    case 'authenticated':
      return (
        <>
          <AdminMenu />
          <UserMenu />
        </>
      );
  }
};
