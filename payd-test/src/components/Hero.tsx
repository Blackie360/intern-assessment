import { Box, Flex, Heading, Text, Button, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);
const MotionImage = motion(Image);

const Hero = () => {
  return (
    <MotionBox className="container mx-auto px-4 py-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <Flex direction={{ base: 'column', md: 'row' }} align="center">
        <Box flex="1" mb={{ base: 8, md: 0 }} textAlign={{ base: 'center', md: 'left' }}>
          <MotionHeading as="h1" size="2xl" mb="4" className="font-bold" initial={{ x: -100 }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
            Discover Your Next Favorite Book
          </MotionHeading>
          <MotionText fontSize="lg" mb="6" initial={{ x: -100 }} animate={{ x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            Join our community of book lovers. Explore, share, and discuss your favorite reads.
          </MotionText>
         <Link to="/post">
         <MotionButton colorScheme="teal" size="lg" initial={{ y: 100 }} animate={{ y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
            Get Started
          </MotionButton>
         </Link>
        </Box>
        <Box flex="1" textAlign="center">
          <MotionImage
            src="https://img.freepik.com/free-vector/realistic-book-lover-composition-with-stack-colorful-books-with-eyeglasses-home-plants-tea-cup-vector-illustration_1284-77312.jpg?t=st=1717962071~exp=1717965671~hmac=f5bb422790ef382d25db8cd66a05d51dffcf4b9197e805e0ab4b1f1d895d8fe1&w=740"
            alt="Books"
            borderRadius="md"
            className="mx-auto"
            maxW={{ base: '80%', md: '100%' }}
            h="auto"
            initial={{ scale: 0.5, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          />
        </Box>
      </Flex>
    </MotionBox>
  );
};

export default Hero;
