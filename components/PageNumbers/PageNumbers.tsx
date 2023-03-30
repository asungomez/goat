import { Button, Stack } from '@chakra-ui/react';
import { FC } from 'react';

type PageNumbersProps = {
  totalPages: number;
  currentPage: number;
};

export const PageNumbers: FC<PageNumbersProps> = ({
  totalPages,
  currentPage,
}) => {
  const numberLinks = [];
  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
    if (pageNumber === currentPage) {
      numberLinks.push(
        <Button key={pageNumber} isDisabled size="xs">
          {pageNumber}
        </Button>,
      );
    } else {
      numberLinks.push(
        <Button key={pageNumber} variant="ghost" size="xs">
          {pageNumber}
        </Button>,
      );
    }
  }
  return (
    <Stack spacing={2} direction="row" align="center">
      {numberLinks}
    </Stack>
  );
};
