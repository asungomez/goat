'use client';

import { useUsers } from '@/hooks/useUsers';
import { Box, Container, Divider, Skeleton, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { UserItem } from '../UserItem/UserItem';

export const Users: FC = () => {
  const { users, isLoading } = useUsers();
  if (isLoading) {
    return (
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    );
  }
  return (
    <>
      {!!users?.length && (
        <Container>
          <SearchBar />
          <Box borderWidth="1px" borderRadius="lg" mt={4}>
            {users.map((user, index) => (
              <>
                <UserItem user={user} key={user.id} />
                {index < users.length - 1 && <Divider />}
              </>
            ))}
          </Box>
        </Container>
      )}
    </>
  );
};
