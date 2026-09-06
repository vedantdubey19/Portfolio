import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import resumePdf from '../assets/Resume.pdf';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Escape closes the mobile menu and returns focus to the toggle that opened it.
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

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
          <button
            type="button"
            ref={toggleRef}
            className={`mobile-toggle ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? 'active' : ''}`}
        /*
         * `inert` (not `hidden`) keeps the closed panel out of the tab order and
         * the accessibility tree while still allowing the slide-in transition —
         * `hidden` would set display:none and kill the animation.
         */
        inert={!menuOpen}
      >
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

