import React, { useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import LiquidTrail from './components/LiquidTrail';
import Preloader from './components/Preloader';
import Background from './components/Background';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import BrutalistProjects from './components/BrutalistProjects';
import DeployedProjects from './components/DeployedProjects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Navbar from './components/Navbar';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    // reducedMotion="user" makes every framer-motion animation on the page
    // honour the OS "reduce motion" setting. CSS alone cannot do this because
    // Framer Motion animates via inline styles in JS.
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">Skip to content</a>

      <CustomCursor />
      <LiquidTrail />
      <div className="noise-overlay" aria-hidden="true"></div>

      <AnimatePresence mode="wait">
        {loading && (
          <Preloader key="preloader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <Background />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <BrutalistProjects />
        <DeployedProjects />
        <Experience />
        <Achievements />
        <Certifications />
        <Contact />
      </main>

      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} Vedant Dubey. All rights reserved.</p>
      </footer>
    </MotionConfig>
  );
}

export default App;
