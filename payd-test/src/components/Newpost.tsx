import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';

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
      alert('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post');
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
      <form onSubmit={handleSubmit}>
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
        <Button type="submit" colorScheme="teal">Submit</Button>
      </form>
    </Box>
  );
};

export default NewPost;
