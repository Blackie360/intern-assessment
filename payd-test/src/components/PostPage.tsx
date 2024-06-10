import React, { useEffect, useState } from 'react';
import { Box, Text, Input, Button, Flex, Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { RiAddLine, RiHome2Line } from 'react-icons/ri';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  shadowColor: string;
}

const PostPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchUserId, setSearchUserId] = useState<number | ''>('');

  useEffect(() => {
    toast.info('Welcome!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then((data: Post[]) =>
        setPosts(
          data
            .slice(0, 20)
            .map(post => ({ ...post, userId: Math.floor(Math.random() * 10) + 1, shadowColor: randomColor() }))
        )
      )
      .catch(error => console.error('Error fetching posts: ', error));
  }, []);

  useEffect(() => {
    if (searchUserId === '') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.userId === searchUserId));
    }
  }, [searchUserId, posts]);

  const randomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <Box>
      <Box p={4} display="flex" flexDirection={{ base: 'column', md: 'row' }} justifyContent="space-between" alignItems="center">
  <Box p={4} pb={{ base: 8, md: 0 }} display="flex" justifyContent="space-between" alignItems="center">
    <Link to="/" className="flex items-center text-teal-800 hover:text-gray-600">
      <Icon as={RiHome2Line} boxSize={{ base: 6, md: 8 }} color="gray.800" />
      Home
    </Link>
    <Link to="/add" className="flex items-center text-teal-800 hover:text-gray-600 ml-4">
      <Icon as={RiAddLine} boxSize={{ base: 6, md: 8 }} color="green.800" />
      Add Post
    </Link>
  </Box>

  <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" textAlign="center" mt={{ base: 4, md: 0 }}>
    Posts
  </Text>
  <Flex mt={{ base: 4, md: 0 }}>
    <Input
      type="number"
      placeholder="Search by User ID"
      value={searchUserId}
      onChange={(e) => setSearchUserId(Number(e.target.value))}
      mr={2}
    />
    <Button onClick={() => setSearchUserId('')} mr={2}>Clear</Button>
  </Flex>
</Box>

      <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={4} p={4}>
        {filteredPosts.map(post => (
          <motion.div
            key={post.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Box
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
          </motion.div>
        ))}
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default PostPage;
