import { useI18n } from '@/context/I18n/I18nContext';
import { Box, Center, Divider, Link, Text } from '@chakra-ui/react';
import { FC, Fragment, ReactNode } from 'react';

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
    return <Text>{t('empty-message')}</Text>;
  }
  return (
    <>
      <Box borderWidth="1px" borderRadius="lg" mt={4} mb={4}>
        {items.map((item, index) => (
          <Fragment key={index}>
            {item}
            {index < items.length - 1 && <Divider />}
          </Fragment>
        ))}
      </Box>
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
