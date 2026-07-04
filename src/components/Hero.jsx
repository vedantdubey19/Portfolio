import React from 'react';
import './Hero.css';
import { ArrowRight, Github, Linkedin } from 'lucide-react';
import heroPhoto from '../assets/IMG_0068.PNG';

const Hero = () => {
  return (
    <section className="hero-section" id="home">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text hover-glow">Vedant Dubey</span>
          </h1>
          <h2 className="hero-headline" style={{ fontSize: '2.25rem', fontWeight: '700', marginTop: '0.5rem', marginBottom: '0.75rem', lineHeight: '1.2' }}>
            Building Intelligent AI Applications for Real-World Problems
          </h2>
          <h3 className="hero-subtitle" style={{ fontSize: '1.25rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            AI Engineer focused on Large Language Models, Retrieval-Augmented Generation, AI Agents, scalable backend systems, and production-ready AI applications.
          </h3>
          <p className="hero-description" style={{ marginBottom: '2rem' }}>
            Transforming cutting-edge AI research into scalable software that delivers measurable impact.
          </p>
          <div className="hero-actions" style={{ flexWrap: 'wrap' }}>
            <a href="#projects" className="cta-button magnetic">
              View AI Projects <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </a>
            <a href="/Software Engineer Resume.pdf" target="_blank" download="Vedant_Dubey_Resume.pdf" className="cta-button secondary magnetic">
              Download Resume
            </a>
            <a href="https://github.com/vedantdubey19" target="_blank" rel="noopener noreferrer" className="cta-button secondary magnetic" style={{ gap: '8px' }}>
              <Github size={18} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/vedant-dubey-a9697b278/" target="_blank" rel="noopener noreferrer" className="cta-button secondary magnetic" style={{ gap: '8px' }}>
              <Linkedin size={18} /> LinkedIn
            </a>
          </div>
        </div>
        
        <div className="hero-image-wrapper">
          <div className="hero-image-container glass-panel">
            <img 
              src={heroPhoto} 
              alt="Vedant Dubey" 
              className="hero-profile-image"
            />
            <div className="image-glow"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
