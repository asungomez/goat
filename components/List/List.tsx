import { Box, Divider } from '@chakra-ui/react';
import { FC, Fragment, ReactNode } from 'react';

type ListProps = {
  items: ReactNode[];
};

export const List: FC<ListProps> = ({ items }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" mt={4} mb={4}>
      {items.map((item, index) => (
        <Fragment key={'' + index}>
          {item}
          {index < items.length - 1 && <Divider />}
        </Fragment>
      ))}
    </Box>
  );
};
