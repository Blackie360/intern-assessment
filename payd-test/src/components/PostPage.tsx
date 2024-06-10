import { Box, Icon, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { RiAddLine, RiHome2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
      </motion.div>
    
  );
};

export default PostPage;
