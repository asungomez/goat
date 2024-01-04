'use client';
import { ImageSlider } from '@/components/ImageSlider/ImageSlider';
import { Box, ChakraProps } from '@chakra-ui/react';
import { FC } from 'react';

type GalleryProps = ChakraProps & {
  images: string[];
};

export const Gallery: FC<GalleryProps> = ({ images, ...boxProps }) => {
  return (
    <Box {...boxProps}>
      <ImageSlider images={images} />
    </Box>
  );
};
