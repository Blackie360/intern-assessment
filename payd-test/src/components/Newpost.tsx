import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

interface NewPostProps {}

const NewPost: React.FC<NewPostProps> = () => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [userId, setUserId] = useState<number | ''>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    }
  };

  return (
    <Box
      p={4}
      bg="white"
      rounded="lg"
      shadow="md"
      maxWidth="500px"
      margin="auto"
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link to="/post" className="flex items-center text-gray-800 mb-4">
          <AiOutlineArrowLeft className="mr-2" />
          Back
        </Link>
      </motion.div>
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
        <form onSubmit={handleSubmit}>
          <Button type="submit" colorScheme="teal" w="full">Submit</Button>
        </form>
      </VStack>
    </Box>
  );
};

export default NewPost;
