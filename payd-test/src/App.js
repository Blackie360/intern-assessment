import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import { Box } from '@chakra-ui/react';
import Hero from './components/Hero';
import PostPage from './components/PostPage';

function App() {
  return (
    <Router>
      <Box className="bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/post" element={<PostPage />} />
          {/* Add more routes here */}
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
