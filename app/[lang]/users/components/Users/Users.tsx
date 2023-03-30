'use client';

import { useUsers } from '@/hooks/useUsers';
import { Container, Skeleton, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { UserItem } from '../UserItem/UserItem';
import { InfiniteList } from '@/components/InfiniteList/InfiniteList';

export const Users: FC = () => {
  const { users, isLoading, hasMore, loadMore } = useUsers();

  if (isLoading && users.length === 0) {
    return (
      <Container>
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      </Container>
    );
  }
  return (
    <>
      {!!users?.length && (
        <Container>
          <SearchBar />
          <InfiniteList
            items={users.map((user) => (
              <UserItem user={user} key={user.id} />
            ))}
            hasMore={hasMore}
            onLoadMore={loadMore}
            loading={isLoading}
          />
        </Container>
      )}
    </>
  );
};
