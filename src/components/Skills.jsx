import React, { useEffect, useRef } from 'react';
import TagCloud from 'TagCloud';
import { motion } from 'framer-motion';
import './Skills.css';
import { Cpu } from 'lucide-react';

// Tech badge sub-component rendering official/premium SVGs
const TechBadge = ({ name }) => {
  const getSvg = (tech) => {
    const strokeProps = { stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" };
    switch (tech) {
      case 'Python':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2c5.522 0 6 3 6 5.5v2.5h-5v1h7V7.5C20 4 18.5 2 12 2zm0 20c-5.522 0-6-3-6-5.5v-2.5h5v-1h-7V16.5C2 20 3.5 22 12 22z" opacity="0.8"/>
            <circle cx="9" cy="6" r="1" fill="#fff"/>
            <circle cx="15" cy="18" r="1" fill="#fff"/>
          </svg>
        );
      case 'LangChain':
        return (
          // Official brand link/parrot hybrid representation
          <svg width="14" height="14" viewBox="0 0 24 24" {...strokeProps}>
            <path d="M9 17H7A5 5 0 0 1 7 7h2m6 0h2a5 5 0 0 1 0 10h-2m-7-5h8" stroke="#10b981" strokeWidth="2" />
            <circle cx="12" cy="7" r="1" fill="#10b981"/>
          </svg>
        );
      case 'LangGraph':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" {...strokeProps}>
            <circle cx="12" cy="5" r="3" />
            <circle cx="6" cy="15" r="3" />
            <circle cx="18" cy="15" r="3" />
            <path d="M12 8l-4 4.5M12 8l4 4.5" />
          </svg>
        );
      case 'OpenAI':
      case 'LLMs':
        return (
          // OpenAI swirling whorl logo
          <svg width="14" height="14" viewBox="0 0 24 24" {...strokeProps} stroke="#ff2a2a">
            <path d="M4.5 16.5c-1.5-1.2-2.5-3-2.5-5 0-3.3 2.7-6 6-6 1.2 0 2.3.4 3.2 1m5.6 1.8c1.2 1.2 1.8 2.8 1.8 4.7 0 3.3-2.7 6-6 6-1.2 0-2.3-.4-3.2-1" />
            <path d="M12 8v8M8 12h8" />
          </svg>
        );
      case 'RAG':
      case 'Prompt Engineering':
        return (
          // Custom RAG context document lookup SVG
          <svg width="14" height="14" viewBox="0 0 24 24" {...strokeProps}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        );
      case 'FastAPI':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#00f0ff' }}>
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
        );
      case 'MongoDB':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5">
            <path d="M12 2c0 0-4 4.5-4 9.5s4 10.5 4 10.5 4-5.5 4-10.5S12 2 12 2z"/>
            <path d="M12 2v20"/>
          </svg>
        );
      case 'Docker':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#00f0ff' }}>
            <path d="M2 10.08v2.92h2.92v-2.92H2zm3.92 0v2.92H8.8v-2.92H5.92zm3.92 0v2.92h2.92v-2.92H9.84zm3.92 0v2.92h2.92v-2.92h-2.92zm3.92 0v2.92h2.92v-2.92H17.7M5.92 6.16v2.92H8.8V6.16H5.92zm3.92 0v2.92h2.92V6.16H9.84zm3.92 0v2.92h2.92V6.16h-2.92zm-3.92-3.92v2.92h2.92V2.24H9.84z"/>
          </svg>
        );
      case 'AWS':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 14.5a3 3 0 0 0 3-3c0-3.5-3-5.5-3-5.5S3 8 3 11.5a3 3 0 0 0 3 3z"/>
            <path d="M18 14.5a3 3 0 0 0 3-3c0-3.5-3-5.5-3-5.5S15 8 15 11.5a3 3 0 0 0 3 3z"/>
            <path d="M4 18c4 3 12 3 16 0"/>
          </svg>
        );
      case 'GitHub':
      case 'Git':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
          </svg>
        );
      case 'React':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="1.5">
            <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(30 12 12)"/>
            <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(90 12 12)"/>
            <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(150 12 12)"/>
            <circle cx="12" cy="12" r="1.5" fill="#00f0ff"/>
          </svg>
        );
      case 'Node.js':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5">
            <polyline points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
            <polyline points="2 8.5 12 15 22 8.5"/>
            <line x1="12" y1="15" x2="12" y2="22"/>
          </svg>
        );
      case 'Tailwind':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="1.5">
            <path d="M12 6a6 6 0 0 0-6 6c0 3.3 2.7 6 6 6s6-2.7 6-6a6 6 0 0 0-6-6z" opacity="0.3"/>
            <path d="M18 12c0-3.3-2.7-6-6-6s-6 2.7-6 6c3 0 5-1.5 6-3 1 1.5 3 3 6 3z"/>
          </svg>
        );
      default:
        // Default generic tag icon
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" {...strokeProps}>
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        );
    }
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        borderColor: 'rgba(255, 42, 42, 0.4)',
        boxShadow: '0 0 15px rgba(255, 42, 42, 0.25)',
        backgroundColor: 'rgba(255, 255, 255, 0.04)'
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.4rem 0.8rem',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '8px',
        background: 'rgba(255, 255, 255, 0.02)',
        fontSize: '0.82rem',
        color: 'var(--text-secondary)',
        cursor: 'default',
        fontFamily: 'var(--font-sans)',
        transition: 'border-color 0.25s ease'
      }}
      className="magnetic"
    >
      <motion.div
        whileHover={{ rotate: 15 }}
        transition={{ duration: 0.2 }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {getSvg(name)}
      </motion.div>
      <span style={{ fontWeight: 500 }}>{name}</span>
    </motion.div>
  );
};

const Skills = () => {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = '.tagcloud';
    const rawTexts = [
      'Python', 'LangChain', 'Prompt Engineering', 'RAG', 'LLMs', 
      'AI Agents', 'FastAPI', 'Machine Learning', 'Deep Learning', 'Computer Vision',
      'Node.js', 'Express', 'REST APIs', 
      'MongoDB', 'PostgreSQL', 'Redis', 
      'AWS', 'Docker', 'Git', 'GitHub'
    ];

    const iconMap = {
      'Python': 'devicon-python-plain colored',
      'FastAPI': 'devicon-fastapi-plain colored',
      'Docker': 'devicon-docker-plain colored',
      'Git': 'devicon-git-plain colored',
      'AWS': 'devicon-amazonwebservices-plain-wordmark colored',
      'PostgreSQL': 'devicon-postgresql-plain colored',
      'MongoDB': 'devicon-mongodb-plain colored',
      'Redis': 'devicon-redis-plain colored',
      'Node.js': 'devicon-nodejs-plain colored',
      'Express': 'devicon-express-original colored',
      'GitHub': 'devicon-github-original colored',
      'LangChain': 'https://cdn.simpleicons.org/langchain/38B2AC'
    };

    // Format texts to include HTML icons
    const texts = rawTexts.map(text => {
      if (iconMap[text]) {
        if (iconMap[text].startsWith('http')) {
          return `<span class="skill-cloud-item" style="display: inline-flex; align-items: center; gap: 0.5rem;"><img src="${iconMap[text]}" style="width: 1.5rem; height: 1.5rem;" alt="" /> ${text}</span>`;
        }
        return `<span class="skill-cloud-item"><i class="${iconMap[text]}"></i> ${text}</span>`;
      }
      return `<span class="skill-cloud-item">${text}</span>`;
    });

    const options = {
      radius: window.innerWidth > 768 ? 320 : 160,
      maxSpeed: 'normal',
      initSpeed: 'normal',
      keep: true,
      useHTML: true,
      containerClass: 'tagcloud',
      itemClass: 'tagcloud-item'
    };

    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    TagCloud(container, texts, options);
    
    const items = document.querySelectorAll('.tagcloud-item');
    items.forEach(item => {
      item.style.color = 'var(--text-primary)';
      item.onmouseover = () => {
        item.style.color = 'var(--accent-red)';
      };
      item.onmouseout = () => {
        item.style.color = 'var(--text-primary)';
      };
    });

  }, []);

  const groups = [
    {
      title: "AI Engineering",
      skills: ["Python", "LangChain", "LangGraph", "Prompt Engineering", "RAG", "LLMs", "AI Agents", "FastAPI", "Machine Learning", "Deep Learning", "Computer Vision"]
    },
    {
      title: "Backend & Databases",
      skills: ["Node.js", "Express", "REST APIs", "MongoDB", "PostgreSQL", "Redis"]
    },
    {
      title: "Cloud & Devops",
      skills: ["AWS", "Docker", "Git", "GitHub", "Tailwind"]
    }
  ];

  return (
    <section className="skills-section" id="skills">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">
            <Cpu className="section-icon" /> Technical Arsenal
          </h2>
        </motion.div>
        
        <div className="skills-container glass-panel">
          <div className="skills-text">
            <h3 className="skills-subtitle gradient-text">AI Engineering, Backend, Databases & Cloud</h3>
            <p className="skills-description" style={{ marginBottom: '2rem' }}>
              My engineering stack focuses on architecting and serving robust AI applications. I specialize in model integration, scalable pipelines, database optimizations, and containerized deployments.
            </p>
            
            {/* Grid of Grouped Tech Badges with SVGs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {groups.map((group, gIdx) => (
                <div key={gIdx}>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.75rem', fontFamily: 'var(--font-display)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {group.title}
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                    {group.skills.map((skill, sIdx) => (
                      <TechBadge key={sIdx} name={skill} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="skills-globe magnetic">
            <div className="tagcloud" ref={containerRef}></div>
            <div className="globe-glow"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
