import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Loading from './pages/Loading';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  background: url('/images/bggame.png') center/cover no-repeat fixed;
  background-size: cover;
  background-color: #000;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </AppContainer>
    </Router>
  );
}

export default App; 