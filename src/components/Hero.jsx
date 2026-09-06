import React from 'react';
import { ArrowRight, FileText } from 'lucide-react';
import './Hero.css';
import heroPhoto from '../assets/hero-portrait.webp';
import resumePdf from '../assets/Resume.pdf';

const Hero = () => {
  return (
    <section className="hero-section" id="home">
      {/* Background Venetian Window Shadows & Ambient Lighting */}
      <div className="hero-shadow-overlay"></div>
      <div className="hero-ambient-glow"></div>

      {/* Huge Background Watermark Typography */}
      <div className="hero-watermark" aria-hidden="true">
        <span className="watermark-first">VEDANT</span>
        <span className="watermark-second">DUBEY</span>
      </div>

      <div className="container hero-container">
        {/* Left Column Content */}
        <div className="hero-content">
          {/* Status Badge Pill */}
          <div className="hero-status-pill">
            <span className="status-dot"></span>
            <span>Available for New Opportunities</span>
          </div>

          {/* Impact Punchy Headline */}
          <h1 className="hero-main-title">
            I DON'T JUST BUILD <span className="title-white-outline">WEBSITES.</span><br />
            I CREATE <span className="title-red-highlight">AI EXPERIENCES.</span>
          </h1>

          {/* Sub-headline Description */}
          <p className="hero-main-desc">
            I transform complex algorithms & raw data into intelligent, high-performance web systems 
            that captivate users, automate workflows, and leave a lasting impression.
          </p>

          {/* Action Pill Buttons */}
          <div className="hero-btn-row">
            <a href="#projects" className="hero-btn-primary">
              <span>View Projects</span>
              <ArrowRight size={18} />
            </a>
            <a href={resumePdf} target="_blank" rel="noopener noreferrer" download="Vedant_Dubey_Resume.pdf" className="hero-btn-secondary">
              <FileText size={16} />
              <span>Resume</span>
            </a>
            <a href="#contact" className="hero-btn-secondary">
              Contact Me
            </a>
          </div>

          {/* Bottom Left Glass Stats Card */}
          <div className="hero-stats-card">
            <div className="stat-item">
              <span className="stat-num">2+</span>
              <span className="stat-lbl">YEARS<br />EXPERIENCE</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-num">15+</span>
              <span className="stat-lbl">PROJECTS<br />COMPLETED</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-num">9</span>
              <span className="stat-lbl">APPS<br />DEPLOYED LIVE</span>
            </div>
          </div>
        </div>

        {/* Right Side Portrait Image */}
        <div className="hero-portrait-wrapper">
          <div className="hero-portrait-container">
            <img
              src={heroPhoto}
              alt="Vedant Dubey, AI Engineer"
              className="hero-portrait-img"
              width="1024"
              height="1536"
              fetchPriority="high"
              decoding="async"
            />
            <div className="portrait-blend-gradient"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

