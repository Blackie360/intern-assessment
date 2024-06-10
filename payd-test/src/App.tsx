import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Hero from './components/Hero';
import PostPage from './components/PostPage';
import NewPost from './components/Newpost';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/post" element={<PostPage />} />
        <Route path='/add' element={<NewPost />} />
      </Routes>
    </Router>
  );
};

export default App;
