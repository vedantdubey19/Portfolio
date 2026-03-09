import React from 'react';
import './Contact.css';
import { Mail, Linkedin, Github, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });
  const [status, setStatus] = React.useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    
    try {
      const response = await fetch('http://localhost:5001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message.');
      }
    } catch (error) {
      setStatus('Error sending message.');
      console.error(error);
    }
    
    setTimeout(() => setStatus(''), 3000);
  };

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
        
        <div className="contact-grid">
          <div className="contact-info glass-panel magnetic">
            <h3 className="contact-subtitle gradient-text">Get in Touch</h3>
            <p className="contact-text">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. 
              Let's build the future together.
            </p>
            
            <div className="social-links">
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
          
          <div className="contact-form-wrapper glass-panel">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={formData.name} onChange={handleChange} className="form-input magnetic" placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={formData.email} onChange={handleChange} className="form-input magnetic" placeholder="john@example.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" value={formData.message} onChange={handleChange} rows="4" className="form-input magnetic" placeholder="Hello Vedant..." required></textarea>
              </div>
              <button type="submit" className="submit-btn cta-button magnetic">
                Send Message <Send size={18} style={{ marginLeft: '8px' }} />
              </button>
              {status && <p className="form-status">{status}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
