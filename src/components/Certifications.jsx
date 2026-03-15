import React, { useState, useEffect } from 'react';
import './Certifications.css';
import { Award } from 'lucide-react';

const initialCertData = [
  { 
    name: "Generative AI Certification", 
    issuer: "Oracle", 
    date: "Sept 2025", 
    imageUrl: "/certificates/genai.jpg" 
  },
  { 
    name: "AI Foundations Certification", 
    issuer: "Oracle", 
    date: "Sept 2025", 
    imageUrl: "/certificates/cloud.jpg" 
  },
  { 
    name: "Frontend Developer (React)", 
    issuer: "HackerRank", 
    date: "Recent", 
    imageUrl: "/certificates/react.jpg" 
  }
];

const Certifications = () => {
  const [certs, setCerts] = useState(initialCertData);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/certificates');
        const data = await response.json();
        if (data && data.length > 0) {
          setCerts([...data, ...initialCertData]); // combine backend certs with hardcoded ones
        }
      } catch (error) {
        console.error('Error fetching certificates:', error);
      }
    };
    fetchCerts();
  }, []);

  return (
    <section className="certifications-section" id="certifications">
      <div className="container">
        <h2 className="section-title">
          <Award className="section-icon" /> Education & Certifications
        </h2>
        
        <div className="certs-grid">
          <div className="education-card glass-panel magnetic">
            <h3 className="edu-degree">B.Tech in Computer Science & Engineering</h3>
            <p className="edu-university">Lloyd Institute of Engineering and Technology</p>
            <span className="edu-date">2023 - 2027</span>
            <p className="edu-details">
              Focused on core computer science subjects, Data Structures & Algorithms, Machine Learning, and Scalable Systems. 
              Actively building AI-driven solutions and exploring MLOps architectures.
            </p>
          </div>

          <div className="certs-list">
            {certs.map((cert, idx) => (
              <div key={idx} className="cert-card glass-panel magnetic" style={cert.imageUrl ? { padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', textAlign: 'center' } : {}}>
                {cert.imageUrl ? (
                  <div className="cert-image-wrapper" style={{ width: '100%', height: '180px', borderRadius: '12px', overflow: 'hidden', marginBottom: '0.5rem', background: 'rgba(0,0,0,0.2)' }}>
                    <img 
                      src={cert.imageUrl.startsWith('/uploads') ? `http://localhost:5001${cert.imageUrl}` : cert.imageUrl} 
                      alt={cert.title || cert.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                    />
                  </div>
                ) : (
                  <div className="cert-icon-wrapper">{cert.icon}</div>
                )}
                <div className="cert-info">
                  <h4 className="cert-name">{cert.title || cert.name}</h4>
                  <div className="cert-meta">
                    <span className="cert-issuer">{cert.issuer}</span>
                    <span className="cert-dot">•</span>
                    <span className="cert-date">{cert.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
