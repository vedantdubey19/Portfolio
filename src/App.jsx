import React, { useState } from 'react';
import CustomCursor from './components/CustomCursor';
import LiquidTrail from './components/LiquidTrail';
import Preloader from './components/Preloader';
import Background from './components/Background';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Navbar from './components/Navbar';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <CustomCursor />
      <LiquidTrail />
      
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <>
          <Background />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Certifications />
            <Contact />
          </main>
          
          <footer style={{ 
            textAlign: 'center', 
            padding: '2rem', 
            color: 'var(--text-muted)', 
            borderTop: '1px solid rgba(255,255,255,0.05)', 
            marginTop: '2rem', 
            zIndex: 10, 
            position: 'relative' 
          }}>
            <p>&copy; {new Date().getFullYear()} Vedant Dubey. All rights reserved.</p>
          </footer>
        </>
      )}
    </>
  );
}

export default App;
