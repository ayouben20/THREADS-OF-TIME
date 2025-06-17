import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const LoadingContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('/images/bggame.png') center/cover no-repeat;
  z-index: 9999;
`;

const LoadingContent = styled(motion.div)`
  text-align: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Hourglass = styled(motion.img)`
  width: 100px;
  height: 100px;
  margin: 0 auto 20px;
`;

const LoadingText = styled(motion.div)`
  font-size: 1.5rem;
  margin-top: 20px;
`;

const ProgressBar = styled(motion.div)`
  width: 200px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  margin: 20px auto;
  border-radius: 2px;
  overflow: hidden;
`;

const Progress = styled(motion.div)`
  width: 100%;
  height: 100%;
  background: var(--color-primary);
`;

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <LoadingContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LoadingContent>
        <Hourglass
          src="/images/hourglass.png"
          alt="Loading"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <LoadingText
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Loading Threads of Time...
        </LoadingText>
        <ProgressBar>
          <Progress
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        </ProgressBar>
      </LoadingContent>
    </LoadingContainer>
  );
};

export default Loading; 