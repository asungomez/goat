'use client';

import { Alert, AlertIcon, Container, Skeleton, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { UserItem } from '../UserItem/UserItem';
import { InfiniteList } from '@/components/InfiniteList/InfiniteList';
import { useUsers } from '@/context/UsersManagement/UsersManagementContext';
import { InternalError } from '@/components/InternalError/InternalError';
import { useI18n } from '@/context/I18n/I18nContext';

export const Users: FC = () => {
  const {
    users,
    isLoading,
    hasMore,
    loadMore,
    search,
    isLoadingMore,
    isSearching,
    error,
  } = useUsers();

  const { t } = useI18n();

  if (isLoading) {
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
  if (error === 'FAILED_TO_FETCH') {
    return <InternalError />;
  }
  return (
    <Container>
      <SearchBar
        onSearch={search}
        loading={isSearching}
        error={error === 'FAILED_TO_SEARCH'}
      />
      <InfiniteList
        items={users.map((user) => (
          <UserItem user={user} key={user.id} />
        ))}
        hasMore={hasMore}
        onLoadMore={loadMore}
        loading={isLoadingMore}
      />
      {error === 'FAILED_TO_LOAD_MORE' && (
        <Alert status="warning" mt={3}>
          <AlertIcon />
          {t('load-failed')}
        </Alert>
      )}
    </Container>
  );
};
