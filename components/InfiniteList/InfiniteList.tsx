import { useI18n } from '@/context/I18n/I18nContext';
import { Box, Center, Link, Text } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { EmptySpace } from '../EmptySpace/EmptySpace';
import { List } from '../List/List';

type InfiniteListProps = {
  items: ReactNode[];
  onLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
};

export const InfiniteList: FC<InfiniteListProps> = ({
  items,
  onLoadMore,
  hasMore = false,
  loading = false,
}) => {
  const { t } = useI18n();
  if (items.length === 0) {
    return (
      <Box p={4}>
        <EmptySpace />
      </Box>
    );
  }
  return (
    <>
      <List items={items} />
      {hasMore && (
        <Center w="100%">
          {loading ? (
            <Text>{t('loading')}...</Text>
          ) : (
            <Link onClick={onLoadMore}>{t('load-more')}</Link>
          )}
        </Center>
      )}
    </>
  );
};
