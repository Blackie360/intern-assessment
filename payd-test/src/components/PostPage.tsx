import React, { useEffect, useState } from 'react';
import { Box, Text, Input, Button, Flex, Icon, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, FormControl, FormLabel, Textarea, VStack } from '@chakra-ui/react';
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchUserId, setSearchUserId] = useState<number | ''>('');
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [userId, setUserId] = useState<number | ''>('');

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

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          body,
          userId
        })
      });
      if (!response.ok) {
        throw new Error('Failed to create post');
      }
      // Reset form fields after successful submission
      setTitle('');
      setBody('');
      setUserId('');
      toast.success('Post created successfully!');
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    }
  };

  return (
    <Box>
      <Box p={4} display="flex" flexDirection={{ base: 'column', md: 'row' }} justifyContent="space-between" alignItems="center">
        <Box p={4} pb={{ base: 8, md: 0 }} display="flex" justifyContent="space-between" alignItems="center">
          <Link to="/" className="flex items-center text-teal-800 hover:text-gray-600">
            <Icon as={RiHome2Line} boxSize={{ base: 6, md: 8 }} color="gray.800" />
            Home
          </Link>
          <Button onClick={onOpen} className="flex items-center text-teal-800 hover:text-gray-600 ml-4">
            <Icon as={RiAddLine} boxSize={{ base: 6, md: 8 }} color="green.800" />
            Add Post
          </Button>
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="start">
              <FormControl id="title" mb={4}>
                <FormLabel>Title</FormLabel>
                <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </FormControl>
              <FormControl id="body" mb={4}>
                <FormLabel>Body</FormLabel>
                <Textarea value={body} onChange={(e) => setBody(e.target.value)} required />
              </FormControl>
              <FormControl id="userId" mb={4}>
                <FormLabel>User ID</FormLabel>
                <Input type="number" value={userId} onChange={(e) => setUserId(Number(e.target.value))} required />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="teal" onClick={handleSubmit}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <ToastContainer />
    </Box>
  );
};

export default PostPage;
