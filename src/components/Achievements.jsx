import React from 'react';
import { motion } from 'framer-motion';
import './Achievements.css';
import { Trophy } from 'lucide-react';

const achievementsData = [
  {
    icon: "🏆",
    title: "IBM Machine Learning Internship",
    description: "Engineered scalable model containerization pipelines and FastAPI backend systems, optimizing end-to-end inference latency by 35%.",
    date: "Sept 2025 - Nov 2025",
    verified: true
  },
  {
    icon: "☁",
    title: "Amazon Bedrock Certification",
    description: "AWS validated credentials for building prompt guardrails, agent workflows, and active RAG models.",
    date: "2025",
    verified: true
  },
  {
    icon: "🤖",
    title: "Google Cloud AI",
    description: "GCP Cloud Engineering credentials validating Kubernetes and VM ML model scaling.",
    date: "2025",
    verified: true
  },
  {
    icon: "🚀",
    title: "AI Impact Summit",
    description: "Participated in the AI Impact Summit, engaging with industry leaders to explore cutting-edge developments in enterprise AI and agentic architectures.",
    date: "2025",
    verified: true
  },
  {
    icon: "💻",
    title: "GSSoC '26 Contributor",
    description: "Selected as an active open-source contributor for GirlScript Summer of Code 2026, building and optimizing agentic and observability developer tools.",
    date: "2026",
    verified: true
  },
  {
    icon: "🏅",
    title: "Hackathon Participation",
    description: "Awarded Samsung AI Hackathon Runner-up for low-latency computer vision edge edge pipelines.",
    date: "2025",
    verified: true
  }
];

const Achievements = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  return (
    <section className="achievements-section" id="achievements">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">
            <Trophy className="section-icon" /> Key Achievements
          </h2>
        </motion.div>
        
        <motion.div 
          className="achievements-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {achievementsData.map((item, idx) => (
            <motion.div 
              key={idx} 
              variants={cardVariants}
              whileHover={{ 
                y: -6, 
                borderColor: 'rgba(255, 42, 42, 0.35)', 
                boxShadow: '0 12px 24px rgba(255, 42, 42, 0.1)'
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                position: 'relative'
              }}
              className="achievement-card glass-panel magnetic"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.75rem' }}>{item.icon}</span>
                {item.verified && (
                  <span style={{ 
                    fontSize: '0.68rem', 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '3px', 
                    background: 'rgba(16, 185, 129, 0.08)', 
                    color: '#10b981', 
                    border: '1px solid rgba(16, 185, 129, 0.25)', 
                    padding: '0.15rem 0.5rem', 
                    borderRadius: '10px', 
                    fontWeight: '700', 
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    ✓ Verified
                  </span>
                )}
              </div>

              <div style={{ flexGrow: 1 }}>
                <h3 className="achievement-title" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem', marginTop: '0.2rem' }}>
                  {item.title}
                </h3>
                <p className="achievement-description" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                  {item.description}
                </p>
              </div>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.04)', paddingTop: '0.5rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-display)', fontWeight: 500 }}>{item.date}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
