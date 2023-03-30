import { listUsers, ListUsersResponse, User } from '@/services/usersService';
import { useCallback, useEffect, useState } from 'react';
import useSWRMutation from 'swr/mutation';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [nextToken, setNextToken] = useState<string | undefined>();
  const [hasMore, setHasMore] = useState(true);
  const { data, trigger, isMutating } = useSWRMutation<ListUsersResponse>(
    'listUsers',
    () =>
      listUsers(nextToken).then((response) => {
        setHasMore(!!response.nextToken);
        setNextToken(response.nextToken);
        return response;
      }),
  );

  useEffect(() => {
    trigger();
  }, [trigger]);

  const loadMore = useCallback(() => {
    trigger();
  }, [trigger]);

  useEffect(() => {
    if (data && data?.users.length > 0) {
      setUsers((users) => [...users, ...data.users]);
    }
  }, [data]);
  return { users, hasMore, loadMore, isLoading: isMutating };
};
