import { Text } from '@chakra-ui/react';
import { FC } from 'react';

type DescriptionProps = {
  description: string;
};

export const Description: FC<DescriptionProps> = ({ description }) => (
  <Text
    padding={{
      base: '0 20px 20px 20px',
      sm: '0 20px 30px 20px',
      md: '0 0 40px 0',
    }}
    width={{ base: '100%', md: '600px' }}
  >
    {description}
  </Text>
);
