import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Bot, Cloud, Sparkles, Terminal, Code, Cpu, Shield, Layers, Compass } from 'lucide-react';
import './SlidingProjects.css';

const slidingProjects = [
  {
    id: 'pulse-ai',
    title: 'Pulse AI',
    subtitle: 'AI Telemetry & Diagnostics Engine',
    category: 'AI OBSERVABILITY',
    icon: Bot,
    color: '#ff2a2a',
    tech: ['Go', 'FastAPI', 'Claude API', 'Redis', 'React'],
    demo: 'https://pulse-ai-pi.vercel.app/',
    github: 'https://github.com/vedantdubey19/Pulse_AI',
    description: 'Real-time telemetry agent monitoring API traffic, detecting outages, and running Claude LLMs for automated root-cause fixes.'
  },
  {
    id: 'nexchat',
    title: 'NexChat',
    subtitle: 'Enterprise RAG & Chat Platform',
    category: 'GEN AI & RAG',
    icon: Sparkles,
    color: '#00f0ff',
    tech: ['Python', 'FastAPI', 'ChromaDB', 'LangChain', 'OpenAI'],
    demo: 'https://nex-chat-ivory.vercel.app',
    github: 'https://github.com/vedantdubey19/NexChat',
    description: 'WhatsApp-inspired RAG platform indexing corporate documents with ChromaDB vector embeddings for zero-hallucination queries.'
  },
  {
    id: 'tripnest',
    title: 'TripNest',
    subtitle: 'Unified Travel Engine & Gateway',
    category: 'FULL-STACK WEB',
    icon: Compass,
    color: '#10b981',
    tech: ['Node.js', 'Express', 'React', 'MongoDB', 'Redis'],
    demo: 'https://tripnest-5flq.onrender.com',
    github: 'https://github.com/vedantdubey19/TripNest',
    description: 'Unified booking platform consolidating third-party travel REST APIs secured by JWT auth and TTL Redis caching.'
  },
  {
    id: 'hiresense-ai',
    title: 'HireSense-AI',
    category: 'RECRUITMENT AI',
    subtitle: 'Automated Candidate Screening',
    icon: Cpu,
    color: '#7000ff',
    tech: ['JavaScript', 'NLP', 'Embeddings', 'React', 'Node'],
    demo: 'https://hire-sense-ai-beta.vercel.app',
    github: 'https://github.com/vedantdubey19/HireSense-AI',
    description: 'AI recruitment engine using NLP embeddings to parse resumes, match skill criteria, and rank candidates automatically.'
  },
  {
    id: 'study-ai',
    title: 'Study_Ai',
    subtitle: 'RAG Document Assistant',
    category: 'AI EDUCATION',
    icon: Terminal,
    color: '#ff9900',
    tech: ['Python', 'Streamlit', 'Ollama', 'LlamaIndex', 'Gemini'],
    demo: 'https://studyai-6q5gxcbbl4l63jh8clpnf5.streamlit.app/',
    github: 'https://github.com/vedantdubey19/Study_Ai',
    description: 'Interactive study notes generator grounding Q&A responses in uploaded textbook PDFs using Ollama or Groq/Gemini.'
  },
  {
    id: 'guardian-ai',
    title: 'Guardian-AI',
    subtitle: 'Threat Monitoring Platform',
    category: 'SECURITY',
    icon: Shield,
    color: '#ff0055',
    tech: ['TypeScript', 'Next.js', 'AI Security', 'Tailwind'],
    demo: 'https://guardian-ai-puce-theta.vercel.app',
    github: 'https://github.com/vedantdubey19/Guardian-AI',
    description: 'Automated web threat monitoring and AI-driven security analysis platform for real-time web infrastructure defense.'
  },
  {
    id: 'ecotrace',
    title: 'EcoTrace',
    subtitle: 'Carbon Footprint Tracker',
    category: 'SUSTAINABILITY',
    icon: Cloud,
    color: '#00e676',
    tech: ['JavaScript', 'Node.js', 'Express', 'Chart.js'],
    demo: 'https://eco-trace-carbon-footprint.onrender.com',
    github: 'https://github.com/vedantdubey19/Carbon-Footprint',
    description: 'Privacy-first sustainability web app tracking daily carbon emissions and delivering smart environmental recommendations.'
  },
  {
    id: 'csv-imposter',
    title: 'CMR CSV Imposter',
    subtitle: 'Developer Data Processor',
    category: 'DEV TOOLS',
    icon: Code,
    color: '#00b0ff',
    tech: ['TypeScript', 'React', 'Vite', 'CSV Engine'],
    demo: 'https://cmr-csv-imposter-kappa.vercel.app',
    github: 'https://github.com/vedantdubey19/CMR_CSV_imposter',
    description: 'High-speed CSV dataset processor and mock data generation tool engineered for developer and QA workflows.'
  }
];

// Duplicate projects array to make an infinite seamless loop
const duplicatedProjectsRow1 = [...slidingProjects, ...slidingProjects];
const duplicatedProjectsRow2 = [...slidingProjects].reverse().concat([...slidingProjects].reverse());

const SlidingProjects = () => {
  return (
    <section className="sliding-projects-section" id="projects">
      {/* Background Lighting */}
      <div className="sliding-bg-glow"></div>

      <div className="container text-center mb-6">
        <div className="section-subtitle-badge">
          <Layers size={14} color="var(--accent-red)" />
          <span>PROJECT GALLERY</span>
        </div>
        <h2 className="section-title">
          FEATURED <span className="headline-red">SLIDING PROJECT SHOWCASE //</span>
        </h2>
        <p className="sliding-desc">
          Explore my production applications in interactive continuous motion. Hover any card to pause and inspect.
        </p>
      </div>

      {/* Row 1: Sliding Left */}
      <div className="marquee-wrapper mb-4">
        <div className="marquee-track track-left">
          {duplicatedProjectsRow1.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div key={`row1-${idx}`} className="sliding-card glass-panel">
                {/* Card Banner with Icon */}
                <div className="card-banner" style={{ background: `radial-gradient(circle at 50% 0%, ${item.color}22 0%, rgba(0,0,0,0.4) 80%)` }}>
                  <div className="banner-icon-box" style={{ borderColor: `${item.color}44`, background: `${item.color}15` }}>
                    <IconComp size={24} color={item.color} />
                  </div>
                  <span className="card-cat-badge">{item.category}</span>
                </div>

                {/* Body */}
                <div className="card-body">
                  <h3 className="card-title">{item.title}</h3>
                  <span className="card-sub">{item.subtitle}</span>
                  <p className="card-desc">{item.description}</p>

                  <div className="card-tech-row">
                    {item.tech.map((t, i) => (
                      <span key={i} className="card-tech-pill">{t}</span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="card-actions">
                    <a href={item.demo} target="_blank" rel="noopener noreferrer" className="card-btn-demo">
                      <span>Live Demo</span>
                      <ExternalLink size={14} />
                    </a>
                    <a href={item.github} target="_blank" rel="noopener noreferrer" className="card-btn-github" aria-label="GitHub Repo">
                      <Github size={16} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 2: Sliding Right */}
      <div className="marquee-wrapper">
        <div className="marquee-track track-right">
          {duplicatedProjectsRow2.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div key={`row2-${idx}`} className="sliding-card glass-panel">
                {/* Card Banner with Icon */}
                <div className="card-banner" style={{ background: `radial-gradient(circle at 50% 0%, ${item.color}22 0%, rgba(0,0,0,0.4) 80%)` }}>
                  <div className="banner-icon-box" style={{ borderColor: `${item.color}44`, background: `${item.color}15` }}>
                    <IconComp size={24} color={item.color} />
                  </div>
                  <span className="card-cat-badge">{item.category}</span>
                </div>

                {/* Body */}
                <div className="card-body">
                  <h3 className="card-title">{item.title}</h3>
                  <span className="card-sub">{item.subtitle}</span>
                  <p className="card-desc">{item.description}</p>

                  <div className="card-tech-row">
                    {item.tech.map((t, i) => (
                      <span key={i} className="card-tech-pill">{t}</span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="card-actions">
                    <a href={item.demo} target="_blank" rel="noopener noreferrer" className="card-btn-demo">
                      <span>Live Demo</span>
                      <ExternalLink size={14} />
                    </a>
                    <a href={item.github} target="_blank" rel="noopener noreferrer" className="card-btn-github" aria-label="GitHub Repo">
                      <Github size={16} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SlidingProjects;
