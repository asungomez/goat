import { FC } from 'react';
import { Heading as HeadingUI } from '@chakra-ui/react';

type HeadingProps = {
  name: string;
};

export const Heading: FC<HeadingProps> = ({ name }) => (
  <HeadingUI mb={5}>{name}</HeadingUI>
);
