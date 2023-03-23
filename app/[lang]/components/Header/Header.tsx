import { Box, Flex } from '@chakra-ui/react';
import { FC } from 'react';
import { LanguageSelector } from '../LanguageSelector/LanguageSelector';

export const Header: FC = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
    >
      <Flex align="center">GOAT</Flex>
      <Box flexBasis="auto">
        <Flex align="center" justify="space-between" direction="row" pt={4}>
          <LanguageSelector />
        </Flex>
      </Box>
    </Flex>
  );
};
