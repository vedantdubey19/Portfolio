import React from 'react';
import './Certifications.css';
import { Award } from 'lucide-react';

const certData = [
  { name: "Generative AI Certification", issuer: "Oracle", date: "Sept 2025", icon: "🤖" },
  { name: "AI Foundations Certification", issuer: "Oracle", date: "Sept 2025", icon: "🧠" }
];

const Certifications = () => {
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
            {certData.map((cert, idx) => (
              <div key={idx} className="cert-card glass-panel magnetic">
                <div className="cert-icon-wrapper">{cert.icon}</div>
                <div className="cert-info">
                  <h4 className="cert-name">{cert.name}</h4>
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
