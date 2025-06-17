import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '@fontsource/kufam/700.css'; // Use Kufam as a visually similar font
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

gsap.registerPlugin(ScrollTrigger);

// Reusable styled component for full-height sections
const Section = styled(motion.section)`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 0;
  text-align: center;
  color: #fff;
`;

// Hero Section specific styles
const HeroSection = styled(Section)`
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.4));
    z-index: 0;
    pointer-events: none;
  }
`;

const AnimatedParticle = styled(motion.img)`
  position: absolute;
  width: 60px;
  height: 60px;
  pointer-events: none;
  z-index: 2;
  will-change: transform;
  @media (max-width: 600px) {
    width: 36px;
    height: 36px;
  }
`;

const HeroCenterWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 60vh;
`;

const CharacterImg = styled(motion.img)`
  width: 340px;
  max-width: 80vw;
  height: auto;
  position: relative;
  z-index: 3;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 8px 32px rgba(0,0,0,0.7));
`;

const HeroTitle = styled(motion.h1)`
  font-family: 'Kufam', sans-serif;
  font-size: 6rem;
  text-transform: uppercase;
  color: #FFD700;
  letter-spacing: 0.15em;
  text-align: center;
  margin: 0;
  margin-top: -8rem;
  z-index: 4;
  position: relative;
  @media (max-width: 768px) {
    font-size: 3rem;
    margin-top: -8rem;
  }
`;

// Features Section specific styles
const FeaturesSection = styled(Section)`
  background: linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.95) 100%);
  position: relative;
  overflow: hidden;

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
  }
`;

const FeaturesHeading = styled(motion.h2)`
  color: #FFD700;
  font-size: 4rem;
  font-family: 'Kufam', sans-serif;
  margin-bottom: 4rem;
  text-align: center;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, transparent, #FFD700, transparent);
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  padding: 3rem 2.5rem;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 215, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-15px) scale(1.02);
    border-color: rgba(255, 215, 0, 0.3);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4),
                0 0 20px rgba(255, 215, 0, 0.1);

    &::before {
      opacity: 1;
    }

    h3 {
      color: #FFD700;
      transform: translateY(-5px);
    }
  }

  h3 {
    color: #FFD700;
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    font-family: 'Kufam', sans-serif;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: all 0.3s ease;
    
    span {
      font-size: 2.5rem;
    }
  }

  p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.2rem;
    line-height: 1.8;
    margin: 0;
    white-space: pre-line;
  }
`;

// Download Section specific styles
const DownloadSection = styled(Section)`
  background: linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.95) 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/images/download-bg.png') repeat;
    opacity: 0.05;
    z-index: 0;
  }
`;

const DownloadContent = styled(motion.div)`
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
  padding: 0 2rem;
`;

const DownloadTitle = styled(motion.h2)`
  color: #FFD700;
  font-size: 4rem;
  font-family: 'Kufam', sans-serif;
  margin-bottom: 2rem;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, transparent, #FFD700, transparent);
  }
`;

const DownloadDescription = styled(motion.p)`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.3rem;
  line-height: 1.8;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const DownloadButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
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
  text-decoration: none;
  box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    transform: translateY(-8px) scale(1.05);
    box-shadow: 0 15px 40px rgba(255, 215, 0, 0.4);
    background: linear-gradient(135deg, #FFA500 0%, #FFD700 100%);
  }

  img {
    width: 32px;
    height: 32px;
  }
`;

// Contact Section specific styles
const ContactSection = styled(Section)`
  background: linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.95) 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/images/contact-bg.png') repeat;
    opacity: 0.05;
    z-index: 0;
  }
`;

const ContactContent = styled(motion.div)`
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
  padding: 0 2rem;
`;

const ContactTitle = styled(motion.h2)`
  color: #FFD700;
  font-size: 4rem;
  font-family: 'Kufam', sans-serif;
  margin-bottom: 2rem;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, transparent, #FFD700, transparent);
  }
`;

const ContactDescription = styled(motion.p)`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.3rem;
  line-height: 1.8;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
`;

const SocialLink = styled(motion.a)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 215, 0, 0.1);
  border: 2px solid rgba(255, 215, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFD700;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  &:hover {
    background: rgba(255, 215, 0, 0.2);
    transform: translateY(-5px) scale(1.1);
    border-color: #FFD700;
    box-shadow: 0 10px 20px rgba(255, 215, 0, 0.2);
  }
`;

const BackToTopButton = styled.button`
  position: fixed;
  bottom: 2.5rem;
  right: 2.5rem;
  z-index: 3000;
  background: rgba(0,0,0,0.5);
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0,0,0,0.25);
  transition: background 0.2s, opacity 0.3s;
  opacity: ${props => props.$visible ? 1 : 0};
  pointer-events: ${props => props.$visible ? 'auto' : 'none'};
  &:hover {
    background: rgba(0,0,0,0.7);
  }
`;

// Video Section specific styles
const VideoSection = styled(Section)`
  background: rgba(0, 0, 0, 0.8);
  padding: 4rem 2rem;
`;

const VideoContainer = styled(motion.div)`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
`;

const VideoTitle = styled(motion.h2)`
  font-family: 'Kufam', sans-serif;
  font-size: 3.5rem;
  margin-bottom: 2rem;
  color: #fff;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
`;

const StyledVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const VideoSectionContent = () => {
  return (
    <VideoSection
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <VideoTitle
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Game Trailer
      </VideoTitle>
      <VideoContainer
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <VideoWrapper>
          <StyledVideo
            controls
            playsInline
            poster="/images/video-poster.jpg"
          >
            <source src="/video/trailer.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </StyledVideo>
        </VideoWrapper>
      </VideoContainer>
    </VideoSection>
  );
};

// Story Section specific styles
const StorySection = styled(Section)`
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.4);
    z-index: 0;
    pointer-events: none;
  }
`;

const StoryContent = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100vw;
  max-width: 1600px;
  height: 80vh;
  position: relative;
  z-index: 1;
  color: #fff;
  gap: 4rem;
  padding-left: 5vw;
  padding-right: 5vw;
  @media (max-width: 1200px) {
    gap: 2rem;
  }
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    height: auto;
    min-height: 80vh;
    padding-left: 2vw;
    padding-right: 2vw;
  }
`;

const StoryText = styled.div`
  flex: 1;
  text-align: left;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.3rem;
  line-height: 1.7;
  h2, p { color: #fff; }
`;

const StoryImages = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2.5rem;
  @media (max-width: 900px) {
    align-items: center;
    width: 100%;
  }
`;

const StoryImg = styled.img`
  width: 100%;
  max-width: 500px;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.35);
  background: #222;
  @media (max-width: 600px) {
    max-width: 90vw;
  }
`;

// New Gameplay Mechanics Section Styles
const MechanicsSection = styled(Section)`
  background: linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(15,15,15,0.9) 100%);
  position: relative;
  overflow: hidden;
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
  }
`;

const MechanicsContent = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
  z-index: 1;
`;

const MechanicsTitle = styled(FeaturesHeading)`
  margin-bottom: 3rem;
`;

const MechanicsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MechanicCard = styled(motion.div)`
  background: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem;
  border: 1px solid rgba(255, 215, 0, 0.15);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  text-align: left;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.4);
    border-color: rgba(255, 215, 0, 0.4);
  }
  h3 {
    color: #FFD700;
    font-size: 1.6rem;
    margin-bottom: 1rem;
    font-family: 'Kufam', sans-serif;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    span {
      font-size: 2rem;
    }
  }
  p {
    color: rgba(255, 255, 255, 0.85);
    font-size: 1.1rem;
    line-height: 1.7;
  }
`;

// New Explore the World Section Styles
const WorldSection = styled(Section)`
  background: linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.95) 100%);
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/images/world-bg.png') repeat;
    opacity: 0.05;
    z-index: 0;
  }
`;

const WorldContent = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
  z-index: 1;
`;

const WorldTitle = styled(FeaturesHeading)`
  margin-bottom: 3rem;
`;

const WorldDescription = styled(motion.p)`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.3rem;
  line-height: 1.8;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const WorldImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
`;

const WorldImageCard = styled(motion.div)`
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
  cursor: pointer;
  position: relative;
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  &:hover img {
    transform: scale(1.05);
  }
  h4 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
    padding: 1rem;
    color: #FFD700;
    font-family: 'Kufam', sans-serif;
    font-size: 1.2rem;
    text-align: left;
  }
`;

const HeroSectionContent = () => {
  // Particle animation setup
  const [particles, setParticles] = useState([]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Create 18 particles with random positions, rotations, and delays
    setParticles(Array.from({ length: 18 }, (_, i) => ({
      id: i,
      top: Math.random() * 70 + 10,
      left: Math.random() * 80 + 5,
      rotation: Math.random() * 360,
      float: Math.random() * 20 + 10,
      floatDuration: 2 + Math.random() * 2
    })));
  }, []);

  // Parallax effect for flowers
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      setMouse({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <HeroSection>
      {particles.map(p => (
        <AnimatedParticle
          key={p.id}
          src="/images/flower.png"
          alt="Floating Flower"
          loading="lazy"
          animate={{
            y: [0, -p.float, 0],
            rotate: [p.rotation, p.rotation + 10, p.rotation],
          }}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: p.floatDuration,
            ease: 'easeInOut',
            delay: p.id * 0.1
          }}
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            transform: `rotate(${p.rotation}deg) translate3d(${mouse.x * p.id * 4}px, ${mouse.y * p.id * 4}px, 0)`
          }}
        />
      ))}
      <HeroCenterWrap>
        <CharacterImg
          src="/images/noor.png"
          alt="Noor Character"
          loading="lazy"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <HeroTitle
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          THREADS OF TIME
        </HeroTitle>
      </HeroCenterWrap>
    </HeroSection>
  );
};

const Home = () => {
  const [showTop, setShowTop] = useState(false);
  
  const handleScroll = useCallback(() => {
    setShowTop(window.scrollY > 200);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const features = [
    {
      icon: '🕰️',
      title: 'Innovative Time Mechanics & Puzzles',
      desc: `Master Time: Rewind, pause, or fast-forward events to solve complex, time-driven puzzles.

Integrated Challenges: Each puzzle is intricately tied to the world's story and environment, requiring creativity and insight.`
    },
    {
      icon: '🎨',
      title: 'Hand-Drawn Art & Cultural Immersion',
      desc: `Vivid Visuals: Discover detailed hand-crafted scenes inspired by Moroccan mosaics, vibrant souks, and serene landscapes.

Authentic Atmosphere: The art style blends rich fantasy with cultural authenticity for a unique visual journey.`
    },
    {
      icon: '📱',
      title: 'Designed for Mobile with Immersive Audio',
      desc: `Seamless Mobile Experience: Optimized for Android with intuitive controls and crisp visuals.

Rich Soundscape: Traditional Moroccan instruments and ambient sound effects bring emotional depth to your adventure.`
    }
  ];

  const gameplayMechanics = [
    {
      icon: '⏱️',
      title: 'Time Manipulation',
      desc: 'Master the flow of time: rewind, pause, and fast-forward to navigate intricate puzzles and unforeseen obstacles.'
    },
    {
      icon: '🧩',
      title: 'Logic & Deduction',
      desc: 'Solve mind-bending puzzles that challenge your intellect, combining environmental clues with time-based actions.'
    },
   ,
    {
      icon: '💬',
      title: 'Rich Narrative',
      desc: 'Engage with a deep story inspired by Moroccan heritage, discovering ancient lore and character backstories.'
    }
  ];

  const worldLocations = [
    { img: '/images/screenshot1.png', title: 'Ancient Medina' },
    { img: '/images/screenshot2.png', title: 'Desert Oasis' },
    { img: '/images/screenshot3.png', title: 'New Medina' },
    { img: '/images/screenshot4.png', title: 'Casablanca 2.0' }
  ];

  return (
    <>
      <Helmet>
        <title>Threads of Time - Mobile Adventure Puzzle Game</title>
        <meta name="description" content="Experience an enchanting adventure through time in Threads of Time, a mobile puzzle game inspired by Moroccan culture. Manipulate time, solve intricate puzzles, and explore hand-drawn worlds." />
        <meta name="keywords" content="mobile game, puzzle game, adventure game, time manipulation, Moroccan culture, hand-drawn art, puzzle adventure, narrative game" />
        <meta property="og:title" content="Threads of Time - Mobile Adventure Puzzle Game" />
        <meta property="og:description" content="Experience an enchanting adventure through time in Threads of Time, a mobile puzzle game inspired by Moroccan culture. Manipulate time, solve intricate puzzles, and explore hand-drawn worlds." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta property="og:url" content="https://threadsoftime.com" />
        <link rel="canonical" href="https://threadsoftime.com" />
      </Helmet>

      <HeroSectionContent />
      <VideoSectionContent />

      <StorySection>
        <StoryContent
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <StoryText>
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Our Story
            </motion.h2>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              In Threads of Time, players embark on a unique journey inspired by the rich and diverse cultural heritage of Morocco. Set against a breathtaking backdrop of hand-crafted 2D environments reminiscent of zellige mosaics and traditional Moroccan architecture, the game follows Nour, a determined young tisserande. When she discovers a magical thread capable of altering time, her quest to repair fractures across the past, present, and future begins.
            </motion.p>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Each step Nour takes is filled with challenges that test her wit and courage. By traveling through different eras, players experience a deep narrative about the importance of heritage, the consequences of our actions, and the timeless bonds that connect generations. The game combines rich storytelling with innovative gameplay mechanics, creating an immersive experience that celebrates art, culture, and the human spirit.
            </motion.p>
          </StoryText>
          <StoryImages>
            <StoryImg src="/images/screenshot1.png" alt="Gameplay screenshot showing time manipulation mechanics" loading="lazy" />
            <StoryImg src="/images/screenshot2.png" alt="Gameplay screenshot showing Moroccan-inspired environment" loading="lazy" />
          </StoryImages>
        </StoryContent>
      </StorySection>

      {/* New Gameplay Mechanics Section */}
      <MechanicsSection>
        <MechanicsContent
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <MechanicsTitle
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Master Unique Gameplay Mechanics
          </MechanicsTitle>
          <MechanicsGrid>
            {gameplayMechanics.map((mechanic, idx) => (
              <MechanicCard
                key={mechanic.title + idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                viewport={{ once: true }}
              >
                <h3><span>{mechanic.icon}</span> {mechanic.title}</h3>
                <p>{mechanic.desc}</p>
              </MechanicCard>
            ))}
          </MechanicsGrid>
        </MechanicsContent>
      </MechanicsSection>

      {/* New Explore the World Section */}
      <WorldSection>
        <WorldContent
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <WorldTitle
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Explore the Enchanting World
          </WorldTitle>
          <WorldDescription
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Journey through richly detailed 2D environments, from bustling souks to serene desert landscapes, each handcrafted to immerse you in the beauty of Moroccan culture.
          </WorldDescription>
          <WorldImageGrid>
            {worldLocations.map((location, idx) => (
              <WorldImageCard
                key={location.title + idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <img src={location.img} alt={location.title} loading="lazy" />
                <h4>{location.title}</h4>
              </WorldImageCard>
            ))}
          </WorldImageGrid>
        </WorldContent>
      </WorldSection>

      <FeaturesSection>
        <FeaturesHeading
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Why Play Threads of Time?
        </FeaturesHeading>
        <FeaturesGrid>
          {features.map((feature, idx) => (
            <FeatureCard
              key={feature.title + idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <h3><span>{feature.icon}</span> {feature.title}</h3>
              <p>{feature.desc}</p>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </FeaturesSection>

      <DownloadSection>
        <DownloadContent
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <DownloadTitle
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Get Threads of Time Today
          </DownloadTitle>
          <DownloadDescription
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Begin your journey through time with Threads of Time, now available for download on Android devices. Immerse yourself in a beautifully crafted adventure that blends culture, magic, and storytelling.
          </DownloadDescription>
          <DownloadButton
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Download Threads of Time on Google Play"
          >
            Download Now
          </DownloadButton>
        </DownloadContent>
      </DownloadSection>

      <ContactSection>
        <ContactContent
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <ContactTitle
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Stay Connected
          </ContactTitle>
          <ContactDescription
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join our community and stay updated with the latest news, updates, and exclusive content. Follow us on social media to be part of the Threads of Time journey.
          </ContactDescription>
          <SocialLinks
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <SocialLink 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer" 
              whileHover={{ scale: 1.1 }}
              aria-label="Follow us on Twitter"
            >
              <i className="fab fa-twitter"></i>
            </SocialLink>
            <SocialLink 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer" 
              whileHover={{ scale: 1.1 }}
              aria-label="Follow us on Instagram"
            >
              <i className="fab fa-instagram"></i>
            </SocialLink>
            <SocialLink 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer" 
              whileHover={{ scale: 1.1 }}
              aria-label="Join our Discord community"
            >
              <i className="fab fa-discord"></i>
            </SocialLink>
          </SocialLinks>
        </ContactContent>
      </ContactSection>

      <Footer />
      <BackToTopButton $visible={showTop} onClick={scrollToTop} aria-label="Back to top">
        <img src="/images/top.png" alt="Back to top" style={{ width: 32, height: 32 }} loading="lazy" />
      </BackToTopButton>
    </>
  );
};

export default Home; 