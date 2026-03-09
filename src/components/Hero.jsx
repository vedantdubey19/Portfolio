import React from 'react';
import './Hero.css';
import { ArrowRight } from 'lucide-react';
import heroBwPhoto from '../assets/hero-bw-photo.jpg';

const Hero = () => {
  return (
    <section className="hero-section" id="home">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text hover-glow">Vedant Dubey</span>
          </h1>
          <h2 className="hero-subtitle">
            AI Engineer
          </h2>
          <p className="hero-description">
            Building intelligent systems that learn, adapt, and scale. 
            Bridging the gap between machine learning and robust software engineering.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="cta-button magnetic">
              View My Work <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </a>
            <a href="#contact" className="cta-button secondary magnetic">
              Let's Connect
            </a>
          </div>
        </div>
        
        <div className="hero-image-wrapper">
          <div className="hero-image-container glass-panel">
            <img 
              src={heroBwPhoto} 
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
