import { listUsers, Role, setUserRole, User } from '@/services/usersService';
import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import {
  UsersManagementContext,
  UsersManagementErrorType,
} from './UsersManagementContext';

type UsersManagementProviderProps = {
  children: ReactNode;
};

export const UsersManagementProvider: FC<UsersManagementProviderProps> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [nextToken, setNextToken] = useState<string>('');
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<UsersManagementErrorType | null>(null);

  const sendRequest = useCallback(async (token?: string, email?: string) => {
    return await listUsers(token, email).then((response) => {
      setHasMore(!!response.nextToken);
      setNextToken(response.nextToken ?? '');
      return { ...response };
    });
  }, []);

  useEffect(() => {
    setError(null);
    sendRequest('')
      .then((data) => {
        setIsLoading(false);
        if (data && data?.users.length > 0) {
          setUsers(data.users);
        }
      })
      .catch(() => {
        setError('FAILED_TO_FETCH');
        setIsLoading(false);
      });
  }, [sendRequest]);

  const loadMore = useCallback(() => {
    setIsLoadingMore(true);
    setError(null);
    sendRequest(nextToken)
      .then((data) => {
        setIsLoadingMore(false);
        if (data && data?.users.length > 0) {
          setUsers((users) => [...users, ...data.users]);
        }
      })
      .catch(() => {
        setError('FAILED_TO_LOAD_MORE');
        setIsLoadingMore(false);
      });
  }, [nextToken, sendRequest]);

  const search = useCallback(
    (email: string) => {
      setIsSearching(true);
      setError(null);
      sendRequest('', email)
        .then((data) => {
          setIsSearching(false);
          if (data && data?.users.length > 0) {
            setUsers(data.users);
          } else {
            setUsers([]);
          }
        })
        .catch(() => {
          setError('FAILED_TO_SEARCH');
          setIsSearching(false);
        });
    },
    [sendRequest],
  );

  const changeRole = useCallback(async (id: string, role: Role) => {
    return setUserRole(id, role).then(() => {
      setUsers((users) =>
        [...users].map((user) => (user.id === id ? { ...user, role } : user)),
      );
    });
  }, []);

  return (
    <UsersManagementContext.Provider
      value={{
        users,
        hasMore,
        loadMore,
        isLoading,
        search,
        isLoadingMore,
        isSearching,
        changeRole,
        error,
      }}
    >
      {children}
    </UsersManagementContext.Provider>
  );
};
