import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const NotFoundSection = styled(motion.section)`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.95) 100%);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/images/pattern.png') repeat;
    opacity: 0.05;
    z-index: 0;
    pointer-events: none;
  }
`;

const NotFoundContent = styled(motion.div)`
  position: relative;
  z-index: 1;
  color: #fff;
  text-align: center;
  max-width: 800px;
  padding: 2rem;
`;

const NotFoundTitle = styled(motion.h1)`
  font-family: 'Kufam', sans-serif;
  font-size: 8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #FFD700;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
  @media (max-width: 768px) {
    font-size: 5rem;
  }
`;

const NotFoundMsg = styled(motion.p)`
  font-family: 'Kufam', sans-serif;
  font-size: 1.8rem;
  margin-bottom: 2.5rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const BackButton = styled(motion.button)`
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  color: #000;
  border: none;
  padding: 1.5rem 4rem;
  font-size: 1.8rem;
  border-radius: 50px;
  cursor: pointer;
  font-family: 'Kufam', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    transform: translateY(-8px) scale(1.05);
    box-shadow: 0 15px 40px rgba(255, 215, 0, 0.4);
    background: linear-gradient(135deg, #FFA500 0%, #FFD700 100%);
  }
  @media (max-width: 600px) {
    padding: 1rem 2rem;
    font-size: 1.4rem;
  }
`;

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <NotFoundSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <NotFoundContent
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <NotFoundTitle
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            404
          </NotFoundTitle>
          <NotFoundMsg
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Oops! The page you're looking for doesn't exist.
          </NotFoundMsg>
          <BackButton
            onClick={() => navigate('/')}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Go Back Home
          </BackButton>
        </NotFoundContent>
      </NotFoundSection>
      <Footer />
    </>
  );
} 