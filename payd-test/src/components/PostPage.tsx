import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiHome2Line, RiAddLine } from 'react-icons/ri';
import { ChakraProvider, Box, Text, Icon } from '@chakra-ui/react';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  shadowColor: string;
}

const PostPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then((data: Post[]) =>
        setPosts(
          data
            .slice(0, 10)
            .map(post => ({ ...post, userId: Math.floor(Math.random() * 10) + 1, shadowColor: randomColor() }))
        )
      )
      .catch(error => console.error('Error fetching posts: ', error));
  }, []);

  const randomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <ChakraProvider>
      <Box>
      <Box p={4} display="flex" justifyContent="space-between" alignItems="center">
  <Link to="/" className="flex items-center text-gray-800 hover:text-gray-600">
    <Icon as={RiHome2Line} boxSize={6} color="gray.800" />
    Home
  </Link>
  <Link to="/add" className="flex items-center text-gray-800 hover:text-gray-600">
    <Icon as={RiAddLine} boxSize={6} color="green.800" />
    Add Post
  </Link>
</Box>
        <Text fontSize="xl" fontWeight="bold" mb={4} textAlign="center">
          Posts
        </Text>
        <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={4} p={4}>
          {posts.map(post => (
            <Box
              key={post.id}
              bg="white"
              rounded="lg"
              boxShadow={`0 4px 6px ${post.shadowColor}`}
              p={4}
            >
              <Text fontSize="xl" fontWeight="semibold" mb={2}>
                {post.title}
              </Text>
              <Text color="gray.600">{post.body}</Text>
              <Text color="gray.600" mt={2}>
                User ID: {post.userId}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default PostPage;
