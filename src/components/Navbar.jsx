import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.8rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2000;
  background: transparent !important;
  box-shadow: none !important;
  border-bottom: none !important;
`;

const Logo = styled(motion.div)`
  img {
    height: 60px;
    width: auto;
    filter: drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.5));
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (window.scrollY > lastScrollY.current && window.scrollY > 100) {
        setShowNav(false); // Hide navbar on scroll down
      } else {
        setShowNav(true); // Show navbar on scroll up
      }
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Nav
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: showNav ? 0 : -120, opacity: showNav ? 1 : 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      style={{
        background: scrolled ? 'rgba(0, 0, 0, 0.95)' : 'transparent',
        boxShadow: scrolled ? '0 8px 25px rgba(0, 0, 0, 0.35)' : 'none'
      }}
    >
      {/* Left Logo */}
      <Logo>
        <Link to="/home">
          <img src="/images/totlogod.png" alt="Threads of Time Logo" />
        </Link>
      </Logo>

      {/* Right Logo */}
      <Logo>
        <img src="/images/uit.png" alt="UI Icon" style={{ height: 80, width: 80 }} />
      </Logo>
    </Nav>
  );
};

export default Navbar; 