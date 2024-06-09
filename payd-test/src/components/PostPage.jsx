

import React, { useState, useEffect } from 'react';

const PostPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts: ', error));
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600 mt-2">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostPage;
