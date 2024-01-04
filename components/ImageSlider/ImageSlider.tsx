import { Box, Stack, Image, IconButton, Icon, Fade } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { useSwipeable } from 'react-swipeable';

type ImageSliderProps = {
  images: string[];
};

export const ImageSlider: FC<ImageSliderProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextHandler = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const previousHandler = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const mouseEnterHandler = () => {
    setIsHovered(true);
  };

  const mouseLeaveHandler = () => {
    setIsHovered(false);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextHandler,
    onSwipedRight: previousHandler,
  });

  return (
    <Box
      position="relative"
      maxW="100%"
      height={{ base: '300px', sm: '400px' }}
      width="100%"
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      {...swipeHandlers}
    >
      <Image
        src={images[activeIndex]}
        alt={`Image ${activeIndex + 1}`}
        maxW="100%"
        height="100%"
        objectFit="cover"
        borderRadius={{ md: 'var(--chakra-sizes-3)', sm: 0 }}
      />
      <Fade in={isHovered}>
        <ImageSliderNavigation
          onNext={nextHandler}
          onPrevious={previousHandler}
        />
      </Fade>
      <ImageSliderBullets length={images.length} activeIndex={activeIndex} />
    </Box>
  );
};

type ImageSliderBulletsProps = {
  length: number;
  activeIndex: number;
};

const ImageSliderBullets: FC<ImageSliderBulletsProps> = ({
  length,
  activeIndex,
}) => {
  const bullets = Array.from({ length }, (_, i) => (
    <ImageSliderBullet active={i === activeIndex} key={i} index={i + 1} />
  ));
  return (
    <Stack
      direction="row"
      position="absolute"
      bottom="4"
      left="50%"
      transform="translateX(-50%)"
    >
      {bullets}
    </Stack>
  );
};

type ImageSliderBulletProps = {
  active?: boolean;
  index: number;
};

const ImageSliderBullet: FC<ImageSliderBulletProps> = ({ active, index }) => {
  return (
    <Box
      w="var(--chakra-sizes-2)"
      h="var(--chakra-sizes-2)"
      borderRadius="50%"
      backgroundColor={
        active
          ? 'var(--chakra-colors-white)'
          : 'var(--chakra-colors-whiteAlpha-400)'
      }
      borderColor="var(--chakra-colors-chakra-border-color)"
      display="flex"
      flexGrow={0}
      aria-label={`Bullet ${index}`}
    />
  );
};

type ImageSliderNavigationProps = {
  onNext: () => void;
  onPrevious: () => void;
};

export const ImageSliderNavigation: FC<ImageSliderNavigationProps> = ({
  onNext,
  onPrevious,
}) => {
  return (
    <Stack
      direction="row"
      position="absolute"
      top="50%"
      transform="translateY(-50%)"
      left="4"
      right="4"
      spacing="4"
    >
      <IconButton
        isRound={true}
        variant="solid"
        aria-label="Previous image"
        icon={<Icon as={GrPrevious} />}
        onClick={onPrevious}
      />
      <IconButton
        isRound={true}
        variant="solid"
        aria-label="Next image"
        icon={<Icon as={GrNext} />}
        onClick={onNext}
        ml="auto"
      />
    </Stack>
  );
};
