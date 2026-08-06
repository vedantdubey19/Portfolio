import React, { useState, useEffect } from 'react';
import './Navbar.css';
import resumePdf from '../assets/Resume.pdf';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Live Apps 🚀', href: '#deployed' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Left Section: Brand Logo */}
        <div className="nav-left-group">
          <a href="#home" className="logo">
            Vedant's Portfolio <span className="logo-dots">● ●</span>
          </a>
        </div>


        {/* Center / Right Links */}
        <div className="nav-links">
          {navLinks.map((link, index) => (
            <a key={index} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}
        </div>

        {/* Far Right Resume & Hire Me Buttons */}
        <div className="nav-right-actions" style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
          <a href={resumePdf} target="_blank" rel="noopener noreferrer" download="Vedant_Dubey_Resume.pdf" className="nav-link" style={{ fontSize: '0.85rem', fontWeight: '700' }}>
            Resume 📄
          </a>
          <a href="#contact" className="nav-hire-btn">
            Hire Me
          </a>
          
          {/* Mobile Menu Toggle */}
          <div 
            className={`mobile-toggle ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
        {navLinks.map((link, index) => (
          <a 
            key={index} 
            href={link.href} 
            className="mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            {link.name}
          </a>
        ))}
        <a href="#contact" className="mobile-hire-btn" onClick={() => setMenuOpen(false)}>
          Hire Me
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

