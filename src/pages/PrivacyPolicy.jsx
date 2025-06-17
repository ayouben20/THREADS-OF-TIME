import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';

const PolicySection = styled.section`
  min-height: 100vh;
  width: 100vw;
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: none;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 1000vh;
    background: linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.4));
    z-index: 0;
    pointer-events: none;
  }
`;

const PolicyContent = styled.div`
  position: relative;
  z-index: 1;
  color: #fff;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 2rem;
  h1 {
    color: #FFD700;
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
  h2 {
    color: #FFD700;
    font-size: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  p, li {
    color: #fff;
    font-size: 1.1rem;
    margin-bottom: 1.2rem;
    line-height: 1.7;
    text-align: left;
  }
  ul {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
    text-align: left;
  }
  a {
    color: #FFD700;
    text-decoration: underline;
    &:hover { color: #fff; }
  }
`;

export default function PrivacyPolicy() {
  return (
    <>
      <PolicySection>
        <PolicyContent>
          <h1>Privacy Policy – Threads of Time</h1>
          <p><strong>Last updated: 09-06-2025</strong></p>
          <h2>1. Introduction</h2>
          <p>Thank you for choosing to play Threads of Time. We are committed to protecting your privacy and ensuring a safe experience while you enjoy our mobile game. This Privacy Policy outlines what data may be collected, how it may be used, and the steps we take to protect it.</p>
          <p>By playing Threads of Time, you agree to the practices described below.</p>
          <h2>2. Data Collection</h2>
          <p>Threads of Time does not collect any personally identifiable information such as your name, email address, phone number, or physical location.</p>
          <p>However, to help improve the game and ensure a better user experience, the game may make use of third-party services that automatically collect anonymous, non-personal data, including:</p>
          <ul>
            <li><strong>Device Information:</strong> Type, model, operating system, language, and screen resolution.</li>
            <li><strong>Usage Data:</strong> General gameplay metrics such as level progress, session length, and actions taken in-game.</li>
            <li><strong>Crash Reports:</strong> Technical issues or performance data that help us improve stability and fix bugs.</li>
          </ul>
          <p>All of this data is collected without identifying you personally.</p>
          <h2>3. Use of Data</h2>
          <p>Any collected data is used strictly for technical and development purposes, such as:</p>
          <ul>
            <li>Enhancing performance and optimizing gameplay</li>
            <li>Identifying bugs or crashes and ensuring app stability</li>
            <li>Analyzing user behavior to improve user experience</li>
            <li>Testing compatibility with different devices and Android versions</li>
          </ul>
          <p>We do not use this data for advertising, profiling, or any commercial purposes.<br />We do not sell, rent, or trade any data with third parties.</p>
          <h2>4. Third-Party Services</h2>
          <p>To help us manage and improve the game, Threads of Time integrates third-party tools which may collect anonymous data. These services follow their own privacy policies. We currently use:</p>
          <ul>
            <li><strong>Google Play Services</strong> – for game compatibility, performance monitoring, and achievements</li>
            <li><strong>Unity Analytics</strong> – for anonymous gameplay tracking and crash reporting</li>
          </ul>
          <p>You can learn more about their data policies here:</p>
          <ul>
            <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
            <li><a href="https://unity.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Unity Privacy Policy</a></li>
          </ul>
          <p>These services may collect information automatically through SDKs included in the game build.</p>
          <h2>5. Data Retention</h2>
          <p>Anonymous usage data and crash reports, if collected, are retained only as long as necessary for debugging, analytics, or gameplay optimization purposes.</p>
          <p>After serving their intended use, this data is either deleted or further anonymized so it cannot be linked to any specific individual or device.</p>
          <h2>6. Security</h2>
          <p>We take technical and organizational measures to ensure that any collected data remains secure, such as:</p>
          <ul>
            <li>Minimizing the type and amount of data collected</li>
            <li>Using secure communication protocols</li>
            <li>Regularly updating third-party SDKs and Unity services</li>
          </ul>
          <p>While we strive to protect data integrity, no method of transmission or storage is 100% secure. We encourage players to also manage their privacy through their own device settings.</p>
          <h2>7. Your Rights and Controls</h2>
          <p>You have several options to control the information shared while using Threads of Time:</p>
          <ul>
            <li>Manage permissions through your Android device settings</li>
            <li>Disable analytics or tracking via your operating system (if available)</li>
            <li>Uninstall the game, which will stop all data collection</li>
            <li>Contact us with questions, feedback, or concerns regarding data</li>
          </ul>
          <p>We respect your rights and will respond promptly to any inquiries related to data privacy.</p>
          <h2>8. Changes to This Policy</h2>
          <p>We may occasionally update this Privacy Policy to reflect:</p>
          <ul>
            <li>Changes in legislation</li>
            <li>New features in the game</li>
            <li>Updates to third-party services</li>
          </ul>
          <p>When changes occur, they will be posted in-game and/or on the official website:<br />
          <span role="img" aria-label="globe">🌐</span> <a href="https://threadsoftime.ayoubben.com" target="_blank" rel="noopener noreferrer">https://threadsoftime.ayoubben.com</a></p>
          <p>We encourage you to review this page regularly for the latest updates.</p>
          <h2>9. Contact</h2>
          <p>If you have any questions about this Privacy Policy or how we handle your data, you can visit our official website:<br />
          <span role="img" aria-label="globe">🌐</span> <a href="https://threadsoftime.ayoubben.com" target="_blank" rel="noopener noreferrer">https://threadsoftime.ayoubben.com</a></p>
        </PolicyContent>
      </PolicySection>
      <Footer />
    </>
  );
} 