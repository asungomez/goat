import { Flex } from '@chakra-ui/react';
import { FC, Fragment, ReactNode } from 'react';
import { List } from '../List/List';
import { PageNumbers } from '../PageNumbers/PageNumbers';

type PaginatedListProps = {
  items: ReactNode[];
  totalCount: number;
  currentPage?: number;
};

export const PaginatedList: FC<PaginatedListProps> = ({
  items,
  totalCount,
  currentPage = 1,
}) => {
  const pageSize = items.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  return (
    <>
      <List items={items} />
      {totalCount > pageSize && (
        <Flex direction="row" justifyContent="flex-end">
          <PageNumbers currentPage={currentPage} totalPages={totalPages} />
        </Flex>
      )}
    </>
  );
};
