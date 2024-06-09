
import { useNavigate } from 'react-router-dom';
import { Box, Flex, Heading, Text, Button, Image } from '@chakra-ui/react';

const Hero = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
      navigate('/post');
    };
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
          <Button colorScheme="teal" size="lg"  onClick={handleButtonClick}>
            Get Started
          </Button>
        </Box>
        <Box flex="1" textAlign="center">
          <Image
            src="https://img.freepik.com/free-vector/realistic-book-lover-composition-with-stack-colorful-books-with-eyeglasses-home-plants-tea-cup-vector-illustration_1284-77312.jpg?t=st=1717962071~exp=1717965671~hmac=f5bb422790ef382d25db8cd66a05d51dffcf4b9197e805e0ab4b1f1d895d8fe1&w=740"
            alt="Books"
            borderRadius="md"
            className="mx-auto"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default Hero;
