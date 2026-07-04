import React from 'react';
import './Contact.css';
import { Mail, Linkedin, Github, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
          <h2 className="section-title" style={{ marginBottom: 0 }}>
            <Mail className="section-icon" /> Let's Connect
          </h2>
          <a href="/Software Engineer Resume.pdf" target="_blank" download="Vedant_Dubey_Resume.pdf" className="cta-button magnetic" style={{ borderColor: 'var(--accent-red)' }}>
            <span style={{ color: 'var(--text-primary)' }}>Download Resume</span>
            <Send size={16} style={{ marginLeft: '10px', transform: 'rotate(90deg)' }} />
          </a>
        </div>
        
        <div className="contact-grid" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="contact-info glass-panel magnetic" style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>
            <h3 className="contact-subtitle gradient-text">Get in Touch</h3>
            <p className="contact-text">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. 
              Let's build the future together.
            </p>
            
            <div className="social-links" style={{ justifyContent: 'center', marginTop: '2rem' }}>
              <a href="mailto:vedantdubey.1302@gmail.com" className="social-link magnetic">
                <div className="social-icon"><Mail size={20} /></div>
                <span>Email</span>
              </a>
              <a href="https://www.linkedin.com/in/vedant-dubey-a9697b278/" target="_blank" rel="noopener noreferrer" className="social-link magnetic">
                <div className="social-icon"><Linkedin size={20} /></div>
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/vedantdubey19" target="_blank" rel="noopener noreferrer" className="social-link magnetic">
                <div className="social-icon"><Github size={20} /></div>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
