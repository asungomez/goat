import { Box, Divider, Flex } from '@chakra-ui/react';
import { FC, Fragment, ReactNode } from 'react';
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
      <Box borderWidth="1px" borderRadius="lg" mt={4} mb={4}>
        {items.map((item, index) => (
          <Fragment key={item?.toLocaleString()}>
            {item}
            {index < items.length - 1 && <Divider />}
          </Fragment>
        ))}
      </Box>
      {totalCount > pageSize && (
        <Flex direction="row" justifyContent="flex-end">
          <PageNumbers currentPage={currentPage} totalPages={totalPages} />
        </Flex>
      )}
    </>
  );
};
