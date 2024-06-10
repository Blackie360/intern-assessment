import { Box, Flex, Heading, Text, Button, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <Box className="container mx-auto px-4 py-16">
      <Flex direction={{ base: 'column', md: 'row' }} align="center">
        <Box flex="1" mb={{ base: 8, md: 0 }} textAlign={{ base: 'center', md: 'left' }}>
          <Heading as="h1" size="2xl" mb="4" className="font-bold">
            Discover Your Next Favorite Book
          </Heading>
          <Text fontSize="lg" mb="6">
            Join our community of book lovers. Explore, share, and discuss your favorite reads.
          </Text>
         <Link to="/post">
         <Button colorScheme="teal" size="lg">
            Get Started
          </Button>
         </Link>
        </Box>
        <Box flex="1" textAlign="center">
          <Image
            src="https://img.freepik.com/free-vector/realistic-book-lover-composition-with-stack-colorful-books-with-eyeglasses-home-plants-tea-cup-vector-illustration_1284-77312.jpg?t=st=1717962071~exp=1717965671~hmac=f5bb422790ef382d25db8cd66a05d51dffcf4b9197e805e0ab4b1f1d895d8fe1&w=740"
            alt="Books"
            borderRadius="md"
            className="mx-auto"
            maxW={{ base: '80%', md: '100%' }}
            h="auto"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default Hero;
