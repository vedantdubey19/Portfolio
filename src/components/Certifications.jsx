import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Certifications.css';
import { Award } from 'lucide-react';

const Certifications = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const certificates = [
    { 
      id: 'bedrock', 
      name: "Amazon Bedrock Certification", 
      issuer: "Amazon Web Services (AWS)", 
      date: "2026", 
      category: "Artificial Intelligence",
      details: "Expertise in deploying LLM APIs, building automated RAG agents, and configuring safety guardrails.",
      color: "linear-gradient(135deg, #1f1f2e 0%, #0d0d13 100%)",
      border: "1px solid rgba(255, 153, 0, 0.4)",
      link: "/certificates/Amazon Bedrock.jpeg"
    },
    { 
      id: 'gcp', 
      name: "Google Cloud Associate Engineer", 
      issuer: "Google Cloud", 
      date: "2026", 
      category: "Cloud",
      details: "Certified competencies in managing, configuring, and scaling containerized ML/LLM application workloads.",
      color: "linear-gradient(135deg, #1b263b 0%, #0d1b2a 100%)",
      border: "1px solid rgba(66, 133, 244, 0.4)",
      link: "/certificates/Google.jpeg"
    },
    { 
      id: 'ibm', 
      name: "IBM Internship Certificate", 
      issuer: "IBM", 
      date: "Nov 2025", 
      category: "Artificial Intelligence",
      details: "Completed 3 months hands-on ML internship, building FastAPI endpoints and vector search indices.",
      color: "linear-gradient(135deg, #0f1c2e 0%, #050a14 100%)",
      border: "1px solid rgba(9, 117, 240, 0.4)",
      link: "/certificates/IBM CERTIFICATE_page-0001.jpg"
    },
    { 
      id: 'genai-rag', 
      name: "Generative AI & RAG", 
      issuer: "DeepLearning.AI / Industry", 
      date: "2026", 
      category: "Artificial Intelligence",
      details: "Certified proficiency in foundation model configurations, vector databases, and secure prompt engineering.",
      color: "linear-gradient(135deg, #2a1f1f 0%, #130d0d 100%)",
      border: "1px solid rgba(255, 42, 42, 0.4)",
      link: "/certificates/GenAi RAG.jpeg"
    },
    { 
      id: 'react', 
      name: "Frontend Developer (React)", 
      issuer: "HackerRank", 
      date: "2024", 
      category: "Frontend Development",
      details: "Advanced skills in React, component state management, hooks, and scalable frontend architectures.",
      color: "linear-gradient(135deg, #151b22 0%, #090c10 100%)",
      border: "1px solid rgba(97, 218, 251, 0.4)",
      link: "/certificates/frontend_developer_react certificate.pdf"
    }
  ];

  const handleCardClick = (id) => {
    if (selectedId === id) {
      setSelectedId(null); // Collapse on click again
    } else {
      setSelectedId(id);
    }
  };

  return (
    <section className="certifications-section" id="certifications">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">
            <Award className="section-icon" /> Education & Certifications
          </h2>
        </motion.div>
        
        <div className="certs-grid" style={{ gap: '3rem', alignItems: 'center' }}>
          {/* Left Column: B.Tech Details */}
          <div className="education-card glass-panel magnetic" style={{ padding: '2.5rem', height: 'auto' }}>
            <h3 className="edu-degree" style={{ fontSize: '1.6rem', marginBottom: '0.25rem' }}>B.Tech in Data Science</h3>
            <p className="edu-university" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Lloyd Institute of Engineering and Technology</p>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', margin: '0.75rem 0' }}>
              <span className="edu-date" style={{ marginBottom: 0, fontSize: '0.85rem' }}>2023 - 2027</span>
            </div>
            <p className="edu-details" style={{ fontSize: '0.95rem', lineHeight: '1.65', color: 'var(--text-muted)' }}>
              Specialized academic track focused on Machine Learning, Large Language Models, Retrieval-Augmented Generation (RAG), vector databases, and scalable backend AI systems. Built data-centric pipelines and deployed prototype models using industry-standard frameworks.
            </p>
          </div>

          {/* Right Column: Apple Wallet stacked Deck */}
          <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ 
              position: 'relative', 
              height: selectedId ? '550px' : '260px', 
              width: '100%',
              maxWidth: '520px', // slightly wider to contain the fanned out cards
              margin: '0 auto',
              transition: 'height 0.4s ease'
            }}
          >
            {certificates.map((cert, idx) => {
              const isSelected = selectedId === cert.id;
              const anySelected = selectedId !== null;
              
              let yOffset = idx * 28; // overlapping translation collapsed
              let scale = 1 - (idx * 0.02);
              let opacity = 1;
              let zIndex = certificates.length - idx;
              let xOffset = 0;
              let rotate = 0;

              if (anySelected) {
                if (isSelected) {
                  yOffset = -35;
                  xOffset = 0;
                  rotate = 0;
                  scale = 1.05;
                  zIndex = 100;
                  opacity = 1;
                } else {
                  // Other cards slide down to a stacked pile at the bottom
                  const otherIdx = certificates.findIndex(c => c.id === selectedId);
                  const relativeIdx = idx > otherIdx ? idx - 1 : idx;
                  yOffset = 210 + relativeIdx * 12;
                  xOffset = 0;
                  rotate = 0;
                  scale = 0.9 - relativeIdx * 0.02;
                  opacity = 0.45;
                  zIndex = idx;
                }
              } else if (isHovered) {
                // Fan out in a triangle/arc (like a hand of playing cards)
                const centerIdx = (certificates.length - 1) / 2;
                const offsetFromCenter = idx - centerIdx;
                
                xOffset = offsetFromCenter * 35; // Horizontal spread (slightly tighter to prevent escaping)
                yOffset = Math.abs(offsetFromCenter) * 12 - 10; // Arc shape
                rotate = offsetFromCenter * 6; // Rotation angle
                scale = 1.0; 
                zIndex = idx + 10;
              }

              return (
                <motion.div
                  key={cert.id}
                  className="hover-target"
                  onClick={() => handleCardClick(cert.id)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '5%',
                    width: '90%', // Reduce slightly so the parent box fully engulfs them for hover stability
                    background: cert.color,
                    border: cert.border,
                    borderRadius: '16px',
                    padding: '1.25rem 1.5rem',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                    boxShadow: isSelected 
                      ? '0 20px 40px rgba(0,0,0,0.5)' 
                      : '0 8px 16px rgba(0,0,0,0.3)',
                    zIndex: zIndex,
                    color: 'var(--text-primary)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: isSelected ? '220px' : '90px',
                    height: isSelected ? 'auto' : 'auto',
                    overflow: 'hidden',
                    transformOrigin: 'bottom center'
                  }}
                  animate={{
                    x: xOffset,
                    y: yOffset,
                    rotate: rotate,
                    scale: scale,
                    opacity: opacity
                  }}
                  whileHover={
                    (!anySelected && isHovered) ? {
                      y: yOffset - 30,
                      scale: 1.05,
                      rotate: 0,
                      zIndex: 50,
                      transition: { duration: 0.2, ease: "easeOut" }
                    } : (!anySelected ? { y: yOffset - 5 } : {})
                  }
                  transition={{ 
                    type: "spring", 
                    stiffness: isSelected ? 220 : 180, 
                    damping: isSelected ? 20 : 22,
                    mass: 0.5
                  }}
                  className="magnetic"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ minWidth: 0, flexGrow: 1 }}>
                      <span style={{ 
                        fontSize: '0.7rem', 
                        color: 'rgba(255, 255, 255, 0.4)', 
                        textTransform: 'uppercase', 
                        fontWeight: 700, 
                        letterSpacing: '0.05em' 
                      }}>
                        {cert.category}
                      </span>
                      <h4 style={{ 
                        fontSize: '1.1rem', 
                        fontWeight: '700', 
                        margin: '0.15rem 0 0 0', 
                        lineHeight: '1.3',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: isSelected ? 'normal' : 'nowrap'
                      }}>
                        {cert.name}
                      </h4>
                    </div>
                    <span style={{ fontSize: '1.25rem', paddingLeft: '0.5rem' }}>🎖️</span>
                  </div>

                  {/* Expanded Content Details */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden', marginTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}
                      >
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: '0 0 1rem 0' }}>
                          {cert.details}
                        </p>
                        
                        {cert.link && cert.link.match(/\.(jpeg|jpg|gif|png)$/i) ? (
                          <div style={{ margin: '1rem 0', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <img src={cert.link} alt={cert.name} style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '200px', objectFit: 'cover', objectPosition: 'top' }} />
                          </div>
                        ) : cert.link && cert.link.endsWith('.pdf') ? (
                          <div style={{ margin: '1rem 0', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', height: '200px', position: 'relative' }}>
                            <iframe src={`${cert.link}#toolbar=0&navpanes=0&scrollbar=0`} width="100%" height="100%" style={{ border: 'none' }} title={cert.name} />
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'transparent', zIndex: 10 }}></div>
                          </div>
                        ) : null}

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)' }}>Issuer: <strong>{cert.issuer}</strong></span>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            {cert.link && (
                              <a href={cert.link} target="_blank" rel="noopener noreferrer" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'var(--text-primary)', padding: '0.1rem 0.5rem', borderRadius: '4px', textDecoration: 'none', fontSize: '0.65rem', position: 'relative', zIndex: 20 }}>Open</a>
                            )}
                            <span style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', padding: '0.1rem 0.5rem', borderRadius: '10px', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.65rem' }}>✓ Verified</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: isSelected ? '1rem' : '0.5rem', borderTop: isSelected ? 'none' : '1px solid rgba(255,255,255,0.03)', paddingTop: isSelected ? 0 : '0.35rem' }}>
                    <span style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.4)' }}>Issued: {cert.date}</span>
                    {!isSelected && (
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.3)', fontStyle: 'italic' }}>Click to expand</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
