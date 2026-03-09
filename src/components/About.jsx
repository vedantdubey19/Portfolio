import React from 'react';
import './About.css';
import { User } from 'lucide-react';
import aboutPhoto from '../assets/about-photo.jpg';

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <h2 className="section-title">
          <User className="section-icon" /> About Me
        </h2>
        
        <div className="about-content glass-panel">
          <div className="about-text">
            <h3 className="about-subtitle gradient-text">AI & Machine Learning Engineer</h3>
            <p className="mb-3">
              I am passionate about creating real-world AI applications that solve complex problems. 
              With a solid foundation in computer science and specialized expertise in machine learning, 
              I design and deploy robust intelligent systems.
            </p>
            <p className="mb-4">
              I am currently pursuing my <strong>B.Tech in Computer Science and Engineering (2023-2027)</strong> at the 
              <strong> Lloyd Institute of Engineering and Technology</strong>. This academic journey has equipped me with 
              strong analytical skills, while my hands-on experience has honed my ability to architect scalable solutions 
              combining deep learning, NLP, and computer vision.
            </p>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-number gradient-text">A.I.</span>
                <span className="stat-label">Core Focus</span>
              </div>
              <div className="stat-card">
                <span className="stat-number gradient-text">MLOps</span>
                <span className="stat-label">Production</span>
              </div>
              <div className="stat-card">
                <span className="stat-number gradient-text">LLMs</span>
                <span className="stat-label">Specialty</span>
              </div>
            </div>
          </div>
          
          <div className="about-image-wrapper">
            <div className="image-placeholder magnetic" style={{ padding: '0', overflow: 'hidden', border: 'none', background: 'transparent' }}>
              <img 
                src={aboutPhoto} 
                alt="Vedant Dubey" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
              />
              <div className="glow-effect"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
