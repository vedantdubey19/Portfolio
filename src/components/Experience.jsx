import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './Experience.css';
import { Briefcase, Milestone } from 'lucide-react';

// Animated stats counter component
const Counter = ({ value, duration = 1.5, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime = null;
          const end = parseInt(value, 10);
          if (isNaN(end)) return;

          const animateCount = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / (duration * 1000), 1);
            const easeOutValue = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
            setCount(Math.floor(easeOutValue * end));
            if (percentage < 1) {
              requestAnimationFrame(animateCount);
            }
          };
          requestAnimationFrame(animateCount);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return <span ref={elementRef}>{count}{suffix}</span>;
};

const experienceData = [
  {
    role: "Machine Learning Engineer Intern",
    company: "IBM",
    duration: "Sept 2025 - Nov 2025 (3 Months)",
    impact: "Engineered high-performance machine learning inference pipelines using Docker containerization and FastAPI backend APIs, reducing end-to-end latency by 35% through serialization optimizations and caching layers. Architected and integrated a robust Retrieval-Augmented Generation (RAG) system using LangChain for LLM integration and vector databases, achieving a 94% retrieval precision rate. Orchestrated automated production pipelines via GitHub Actions for model validation, automated testing, and regression checking, accelerating code-to-production cycles by 40%."
  }
];

const roadmapData = [
  { year: "2023", title: "Started Data Science", desc: "Initiated B.Tech Data Science track, specializing in statistical models and linear algebra foundations." },
  { year: "2024", title: "Full Stack Development", desc: "Engineered low-latency web applications, REST APIs, and containerized microservice architectures." },
  { year: "2025", title: "IBM ML Internship", desc: "Deployed production-ready RAG pipelines, FastAPI services, and automated validation checkers." },
  { year: "2025", title: "Amazon Bedrock", desc: "Validated deep foundation model APIs, custom RAG agents, and prompt security guardrail rules." },
  { year: "2026", title: "Production AI Projects", desc: "Scaling high-performance LLM observability software and microservices for incident root-cause diagnosis." },
  { year: "2027", title: "AI Engineer", desc: "Targeting deployment of state-of-the-art Generative AI applications and intelligent systems at scale." }
];

const statsData = [
  { count: "10", suffix: "+", label: "AI Projects Completed" },
  { count: "15", suffix: "+", label: "Certifications & Credentials" },
  { count: "500", suffix: "+", label: "LinkedIn Connections" },
  { count: "100", suffix: "+", label: "GitHub Commits" }
];

const Experience = () => {
  return (
    <section className="experience-section" id="experience">
      <div className="container">
        {/* Animated Stats Section */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1.5rem', 
          marginBottom: '4.5rem' 
        }}>
          {statsData.map((stat, idx) => (
            <div 
              key={idx} 
              className="glass-panel" 
              style={{ padding: '1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.25rem', border: '1px solid rgba(255, 255, 255, 0.04)' }}
            >
              <span className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
                <Counter value={stat.count} suffix={stat.suffix} />
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500, letterSpacing: '0.02em' }}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">
            <Briefcase className="section-icon" /> Experience & Roadmap
          </h2>
        </motion.div>
        
        {/* Two Column Layout: Experience Card and Timeline Roadmap */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'start' }} className="exp-timeline-grid">
          
          {/* Left Column: Work Experience Cards */}
          <div className="timeline" style={{ paddingLeft: 0 }}>
            {experienceData.map((item, idx) => (
              <div key={idx} className="timeline-item" style={{ marginBottom: 0 }}>
                <div className="timeline-content glass-panel magnetic" style={{ marginLeft: 0, padding: '2.5rem' }}>
                  <div className="timeline-header" style={{ marginBottom: '0.75rem' }}>
                    <h3 className="timeline-role" style={{ fontSize: '1.6rem' }}>{item.role}</h3>
                    <span className="timeline-duration"><span className="gradient-text">{item.duration}</span></span>
                  </div>
                  <h4 className="timeline-company" style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>{item.company}</h4>
                  <p className="timeline-impact" style={{ fontSize: '0.95rem', lineHeight: '1.65', color: 'var(--text-muted)' }}>{item.impact}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Career Roadmap Vertical Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', fontWeight: 600 }}>
              <Milestone size={22} className="gradient-text" style={{ color: 'var(--accent-red)' }} /> Career Milestone Roadmap
            </h3>

            <div style={{ position: 'relative', paddingLeft: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Vertical line indicator */}
              <div style={{ position: 'absolute', left: '7px', top: '10px', bottom: '10px', width: '2px', background: 'rgba(255, 255, 255, 0.08)' }}></div>

              {roadmapData.map((node, nIdx) => (
                <motion.div 
                  key={nIdx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: nIdx * 0.1, duration: 0.4 }}
                  style={{ position: 'relative' }}
                >
                  {/* Timeline point */}
                  <div style={{ 
                    position: 'absolute', 
                    left: '-26px', 
                    top: '4px', 
                    width: '12px', 
                    height: '12px', 
                    borderRadius: '50%', 
                    background: node.year === '2027' ? 'var(--accent-red)' : 'var(--bg-primary)',
                    border: '3px solid var(--accent-red)',
                    boxShadow: node.year === '2027' ? '0 0 10px rgba(255,42,42,0.6)' : 'none',
                    zIndex: 2
                  }}></div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.2rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: '700', padding: '0.15rem 0.5rem', background: 'rgba(255, 42, 42, 0.1)', color: 'var(--accent-light-blue)', borderRadius: '12px', fontFamily: 'var(--font-display)' }}>
                        {node.year}
                      </span>
                      <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{node.title}</h4>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>{node.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Experience;
