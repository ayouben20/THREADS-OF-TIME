import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterContainer = styled(motion.footer)`
  background: rgba(0,0,0,0.7);
  color: #fff;
  padding: 3rem 2rem;
  text-align: center;
  border-top: var(--border-fancy);
  box-shadow: var(--shadow-strong) inset;
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .footer-logo {
    margin-bottom: 1.5rem;
    img { height: 60px; }
  }
  .footer-desc {
    font-size: 1.1rem;
    color: #fff;
    margin-bottom: 2rem;
    max-width: 600px;
  }
  hr {
    width: 100%;
    max-width: 700px;
    border: none;
    border-top: 1.5px solid #FFD70044;
    margin: 2rem 0;
  }
  .footer-bottom {
    font-size: 1rem;
    color: #fff;
    margin-top: 1rem;
    a {
      color: #FFD700;
      margin-left: 0.5rem;
      text-decoration: underline;
      transition: color 0.2s;
      &:hover { color: #fff; }
    }
  }
  @media (max-width: 600px) {
    .footer-logo img {
      height: 40px;
    }
    .footer-desc {
      font-size: 1rem;
      margin-bottom: 1.2rem;
    }
    .footer-bottom {
      font-size: 0.9rem;
    }
  }
`;

const Footer = () => (
  <FooterContainer>
    <div className="footer-logo">
      <img src="/images/totlogo.png" alt="Threads of Time Logo" />
    </div>
    <div className="footer-desc">
      Threads of Time is a mobile adventure puzzle game inspired by Moroccan culture. Manipulate time, solve intricate puzzles, and explore hand-drawn worlds in a magical journey through past, present, and future.
    </div>
    <hr />
    <div className="footer-bottom">
      © 2025 Threads of Time. All rights reserved. | <a href="/privacy-policy">Privacy Policy</a>
    </div>
  </FooterContainer>
);

export default Footer; 