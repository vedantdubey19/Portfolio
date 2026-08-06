import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Bot, Cloud, Briefcase, Sparkles, Code, ExternalLink, X, CheckCircle2 } from 'lucide-react';
import './Certifications.css';

const certificates = [
  { 
    id: 'bedrock', 
    name: "Amazon Bedrock", 
    issuer: "Amazon Web Services (AWS)", 
    date: "2026", 
    category: "AI & LLM Services",
    details: "Expertise in deploying LLM APIs, building automated RAG agents, and configuring safety guardrails.",
    icon: Bot,
    image: "/certificates/Amazon Bedrock.jpeg",
    resting: { top: "35px", left: "10px", rotate: -18, scale: 0.92, zIndex: 1 },
    fanned: { rotate: -26, x: -160, y: -15, scale: 0.96, zIndex: 1 }
  },
  { 
    id: 'gcp', 
    name: "Google Cloud Associate", 
    issuer: "Google Cloud Platform", 
    date: "2026", 
    category: "Cloud Engineering",
    details: "Certified competencies in managing, configuring, and scaling containerized ML/LLM application workloads.",
    icon: Cloud,
    image: "/certificates/Google.jpeg",
    resting: { top: "20px", left: "45px", rotate: -9, scale: 0.94, zIndex: 2 },
    fanned: { rotate: -13, x: -80, y: -30, scale: 0.99, zIndex: 2 }
  },
  { 
    id: 'ibm', 
    name: "IBM AI Internship", 
    issuer: "IBM", 
    date: "Nov 2025", 
    category: "AI Engineering",
    details: "Completed 3 months hands-on ML internship, building FastAPI endpoints and vector search indices.",
    icon: Briefcase,
    image: "/certificates/IBM CERTIFICATE_page-0001.jpg",
    resting: { top: "10px", left: "80px", rotate: 0, scale: 0.97, zIndex: 3 },
    fanned: { rotate: 0, x: 0, y: -40, scale: 1.03, zIndex: 3 }
  },
  { 
    id: 'genai-rag', 
    name: "Generative AI & RAG", 
    issuer: "DeepLearning.AI / Industry", 
    date: "2026", 
    category: "GenAI & Agents",
    details: "Certified proficiency in foundation model configurations, vector databases, and secure prompt engineering.",
    icon: Sparkles,
    image: "/certificates/GenAi RAG.jpeg",
    resting: { top: "25px", left: "115px", rotate: 9, scale: 1.0, zIndex: 4 },
    fanned: { rotate: 13, x: 80, y: -20, scale: 1.06, zIndex: 4 }
  },
  { 
    id: 'react', 
    name: "Frontend Developer", 
    issuer: "HackerRank", 
    date: "2024", 
    category: "React Development",
    details: "Advanced skills in React, component state management, hooks, and scalable frontend architectures.",
    icon: Code,
    image: "/certificates/react.jpg",
    resting: { top: "45px", left: "150px", rotate: 18, scale: 1.03, zIndex: 5 },
    fanned: { rotate: 26, x: 160, y: 10, scale: 1.09, zIndex: 5 }
  }
];


const Certifications = () => {
  const [activeCert, setActiveCert] = useState(null);
  const [isStackHovered, setIsStackHovered] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  return (
    <section className="certifications-section" id="certifications">
      {/* Studio Shadow & Overlay */}
      <div className="cert-shadow-overlay"></div>

      {/* Watermark Background Typography */}
      <div className="cert-watermark" aria-hidden="true">
        <span>CERTIFICATIONS</span>
      </div>

      <div className="container cert-container">
        {/* Left Column: Heading & Education */}
        <div className="cert-info-col">
          <div className="cert-subtitle-badge">
            <Award size={14} className="cert-badge-icon" />
            <span>WHAT I EARNED</span>
          </div>

          <h2 className="cert-main-heading">
            CERTIFIED EXPERTISE IN <br />
            <span className="cert-heading-highlight">AI, CLOUD & SYSTEMS.</span>
          </h2>

          <p className="cert-description">
            Industry-recognized credentials proving hands-on proficiency in building 
            production AI models, scalable GCP cloud infrastructure, and modern web applications.
          </p>

          {/* Academic Degree Card */}
          <div className="edu-card-glass">
            <div className="edu-header">
              <span className="edu-tag">ACADEMIC DEGREE</span>
              <span className="edu-years">2023 - 2027</span>
            </div>
            <h3 className="edu-degree-title">B.Tech in Data Science</h3>
            <p className="edu-inst">Lloyd Institute of Engineering & Technology</p>
            <p className="edu-summary">
              Focused track in Machine Learning, Neural Networks, Large Language Models (LLMs), 
              Retrieval-Augmented Generation (RAG), and Distributed AI Backend Infrastructure.
            </p>
          </div>
        </div>

        {/* Right Column: Himanshu 3D Fanned Card Stack */}
        <div className="services-right-col">
          <div 
            className="services-card-stack"
            onMouseEnter={() => setIsStackHovered(true)}
            onMouseLeave={() => setIsStackHovered(false)}
          >
            {certificates.map((cert) => {
              const isCardHovered = hoveredCardId === cert.id;
              const IconComp = cert.icon;

              let targetRotate = cert.resting.rotate;
              let targetX = 0;
              let targetY = 0;
              let targetScale = cert.resting.scale;
              let targetZIndex = cert.resting.zIndex;

              if (isCardHovered) {
                targetRotate = 0;
                targetX = cert.fanned.x;
                targetY = -55;
                targetScale = 1.14;
                targetZIndex = 100;
              } else if (isStackHovered) {
                targetRotate = cert.fanned.rotate;
                targetX = cert.fanned.x;
                targetY = cert.fanned.y;
                targetScale = cert.fanned.scale;
                targetZIndex = cert.fanned.zIndex;
              }

              return (
                <motion.div
                  key={cert.id}
                  className={`stack-card ${cert.id}`}
                  onMouseEnter={() => setHoveredCardId(cert.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  onClick={() => setActiveCert(cert)}
                  style={{
                    top: cert.resting.top,
                    left: cert.resting.left,
                  }}
                  animate={{
                    rotate: targetRotate,
                    x: targetX,
                    y: targetY,
                    scale: targetScale,
                    zIndex: targetZIndex
                  }}
                  transition={{
                    duration: 0.55,
                    ease: [0.25, 1, 0.5, 1]
                  }}
                >
                  <div className="stack-card-inner">
                    <div className="stack-icon-box">
                      <IconComp size={18} color="#ffffff" />
                    </div>
                    <h4 className="stack-card-title">{cert.name}</h4>
                    <p className="stack-card-sub">{cert.issuer}</p>

                    <div className="stack-card-img-wrapper">
                      <img src={cert.image} alt={cert.name} className="stack-preview-img" />
                      <div className="stack-img-overlay">
                        <span>Click to Open 🔍</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Certificate Modal Lightbox */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="cert-modal-backdrop"
            onClick={() => setActiveCert(null)}
          >
            <motion.div
              initial={{ scale: 0.82, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.82, opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="cert-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="cert-modal-close" 
                onClick={() => setActiveCert(null)}
              >
                <X size={20} />
              </button>

              <div className="cert-modal-header">
                <div className="modal-badge-row">
                  <span className="modal-category">{activeCert.category}</span>
                  <span className="modal-verified"><CheckCircle2 size={13} /> Verified Certificate</span>
                </div>
                <h2 className="modal-title">{activeCert.name}</h2>
                <p className="modal-issuer">Issued by <strong>{activeCert.issuer}</strong> ({activeCert.date})</p>
              </div>

              <div className="cert-modal-image-box">
                <img src={activeCert.image} alt={activeCert.name} className="modal-cert-img" />
              </div>

              <p className="modal-details">{activeCert.details}</p>

              <div className="cert-modal-footer">
                <a 
                  href={activeCert.image} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="modal-open-link"
                >
                  <span>Open High-Res Certificate</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;


