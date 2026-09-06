import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, Terminal, Zap, Shield, Sparkles, Bot, Compass, Cpu, Cloud, Code } from 'lucide-react';
import './BrutalistProjects.css';

const projectsList = [
  {
    num: '01',
    id: 'pulse-ai',
    name: 'PULSE AI',
    tagline: 'REAL-TIME AI OBSERVABILITY & DIAGNOSTICS ENGINE',
    category: 'AI OBSERVABILITY / GO BACKEND',
    specs: '10,000+ LOGS/SEC INGESTION | ~1.2s DIAGNOSTICS | <0.5ms CLIENT SDK',
    description: 'Concurrent Go telemetry agent monitoring API traffic, detecting anomalies, and calling Claude to suggest automated root-cause fixes.',
    tech: ['Go', 'Claude 3.5 API', 'Redis Queue', 'MongoDB', 'React', 'Docker'],
    bgGradient: 'radial-gradient(circle at 70% 30%, rgba(255, 42, 42, 0.35) 0%, rgba(10, 0, 0, 0.95) 70%)',
    demoUrl: 'https://pulse-ai-pi.vercel.app/',
    githubUrl: 'https://github.com/vedantdubey19/Pulse_AI'
  },
  {
    num: '02',
    id: 'nexchat',
    name: 'NEXCHAT',
    tagline: 'ENTERPRISE GENERATIVE AI & RAG PLATFORM',
    category: 'VECTOR DB / RAG ENGINE',
    specs: 'CHROMADB EMBEDDINGS | ~48ms VECTOR MATCH | SOURCE-CITED ANSWERS',
    description: 'WhatsApp-inspired RAG platform indexing corporate documents with ChromaDB vector embeddings so every answer is grounded in a retrieved, cited source passage.',
    tech: ['Python', 'FastAPI', 'ChromaDB', 'LangChain', 'OpenAI', 'React'],
    bgGradient: 'radial-gradient(circle at 70% 30%, rgba(0, 240, 255, 0.3) 0%, rgba(0, 10, 20, 0.95) 70%)',
    demoUrl: 'https://nex-chat-ivory.vercel.app',
    githubUrl: 'https://github.com/vedantdubey19/NexChat'
  },
  {
    num: '03',
    id: 'tripnest',
    name: 'TRIPNEST',
    tagline: 'UNIFIED TRAVEL ENGINE & API GATEWAY',
    category: 'FULL-STACK / API ARCHITECTURE',
    specs: '<800ms AGGREGATED SEARCH | REDIS TTL CACHING | JWT AUTH',
    description: 'Unified travel booking platform consolidating third-party travel APIs into a cached Express/MongoDB engine secured by JWT authentication.',
    tech: ['Node.js', 'Express', 'React', 'MongoDB', 'JWT Auth', 'Redis'],
    bgGradient: 'radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.3) 0%, rgba(0, 15, 10, 0.95) 70%)',
    demoUrl: 'https://tripnest-5flq.onrender.com',
    githubUrl: 'https://github.com/vedantdubey19/TripNest'
  },
  {
    num: '04',
    id: 'hiresense-ai',
    name: 'HIRESENSE AI',
    tagline: 'AI RECRUITMENT & RESUME SCREENING ENGINE',
    category: 'NLP / CANDIDATE RANKING',
    specs: 'NLP RESUME MATCHING | AUTOMATED EMBEDDINGS SCORE',
    description: 'AI-powered recruitment engine using NLP embeddings to parse resumes, match candidate skill criteria, and rank applicants efficiently.',
    tech: ['JavaScript', 'NLP', 'Text Embeddings', 'React', 'Node.js'],
    bgGradient: 'radial-gradient(circle at 70% 30%, rgba(112, 0, 255, 0.35) 0%, rgba(15, 0, 25) 0.95) 70%)',
    demoUrl: 'https://hire-sense-ai-beta.vercel.app',
    githubUrl: 'https://github.com/vedantdubey19/HireSense-AI'
  },
  {
    num: '05',
    id: 'study-ai',
    name: 'STUDY AI',
    tagline: 'RAG-POWERED DOCUMENT STUDY ASSISTANT',
    category: 'AI EDUCATION / OLLAMA',
    specs: 'LOCAL OLLAMA + CLOUD GEMINI/GROQ INTEGRATION',
    description: 'RAG study assistant that ground answers in uploaded textbook PDFs using local Ollama or cloud Groq/Gemini LLM inference APIs.',
    tech: ['Python', 'Streamlit', 'Ollama', 'LlamaIndex', 'Gemini API'],
    bgGradient: 'radial-gradient(circle at 70% 30%, rgba(255, 153, 0, 0.3) 0%, rgba(25, 10, 0, 0.95) 70%)',
    demoUrl: 'https://studyai-6q5gxcbbl4l63jh8clpnf5.streamlit.app/',
    githubUrl: 'https://github.com/vedantdubey19/Study_Ai'
  },
  {
    num: '06',
    id: 'guardian-ai',
    name: 'GUARDIAN AI',
    tagline: 'AUTOMATED THREAT MONITORING PLATFORM',
    category: 'AI SECURITY / INFRASTRUCTURE',
    specs: 'REAL-TIME THREAT SCANNING | INFRASTRUCTURE DEFENSE',
    description: 'Automated web threat monitoring and AI-driven security analysis platform designed for modern web infrastructure protection.',
    tech: ['TypeScript', 'Next.js', 'AI Security', 'Tailwind CSS'],
    bgGradient: 'radial-gradient(circle at 70% 30%, rgba(255, 0, 85, 0.35) 0%, rgba(25, 0, 10, 0.95) 70%)',
    demoUrl: 'https://guardian-ai-puce-theta.vercel.app',
    githubUrl: 'https://github.com/vedantdubey19/Guardian-AI'
  },
  {
    num: '07',
    id: 'ecotrace',
    name: 'ECOTRACE',
    tagline: 'PRIVACY-FIRST CARBON EMISSIONS TRACKER',
    category: 'SUSTAINABILITY / WEB APP',
    specs: 'PRIVACY-FIRST EMISSION METRICS & INSIGHTS',
    description: 'Lightweight web application helping users track personal carbon emissions with actionable recommendations to reduce environmental impact.',
    tech: ['JavaScript', 'Node.js', 'Express', 'HTML5', 'Chart.js'],
    bgGradient: 'radial-gradient(circle at 70% 30%, rgba(0, 230, 118, 0.3) 0%, rgba(0, 20, 10, 0.95) 70%)',
    demoUrl: 'https://eco-trace-carbon-footprint.onrender.com',
    githubUrl: 'https://github.com/vedantdubey19/Carbon-Footprint'
  },
  {
    num: '08',
    id: 'csv-imposter',
    name: 'CSV IMPOSTER',
    tagline: 'HIGH-SPEED DEVELOPER DATA PROCESSOR',
    category: 'DEV TOOLS / DATA ENGINE',
    specs: 'CLIENT-SIDE PARSING | MOCK DATA GENERATION',
    description: 'High-speed CSV dataset processor and mock data generation tool engineered for developers and QA automation workflows.',
    tech: ['TypeScript', 'React', 'Vite', 'CSV Engine'],
    bgGradient: 'radial-gradient(circle at 70% 30%, rgba(0, 176, 255, 0.3) 0%, rgba(0, 15, 25, 0.95) 70%)',
    demoUrl: 'https://cmr-csv-imposter-kappa.vercel.app',
    githubUrl: 'https://github.com/vedantdubey19/CMR_CSV_imposter'
  }
];

const BrutalistProjects = () => {
  const [activeProject, setActiveProject] = useState(projectsList[0]);
  const [hoveredId, setHoveredId] = useState(null);

  const currentProject = projectsList.find(p => p.id === hoveredId) || activeProject;

  return (
    <section className="brutalist-projects-section" id="projects">
      {/* Dynamic Full-Screen Background Shift */}
      <div 
        className="brutalist-bg-backdrop"
        style={{ background: currentProject.bgGradient }}
      >
        <div className="brutalist-grid-overlay"></div>
      </div>

      <div className="container brutalist-container">
        {/* Top Header */}
        <div className="brutalist-header">
          <div className="brutalist-tag-pill">
            <Zap size={14} color="var(--accent-red)" />
            <span>PRODUCTION SHIPMENTS // HYPER-CATALOG</span>
          </div>

          <h2 className="brutalist-heading">
            SYSTEMS <span className="text-red-glitch">ARCHIVE.</span>
          </h2>
          <p className="brutalist-sub-desc">
            Hover any project headline below to shift the full-screen backdrop & inspect live specs.
          </p>
        </div>

        {/* Hyper-Typography Project List */}
        <div className="brutalist-list">
          {projectsList.map((proj) => {
            const isHovered = hoveredId === proj.id;
            return (
              <div
                key={proj.id}
                className={`brutalist-row ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={() => {
                  setHoveredId(proj.id);
                  setActiveProject(proj);
                }}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Left Number & Title */}
                <div className="brutalist-row-left">
                  <span className="row-num">{proj.num}</span>
                  <div className="row-title-box">
                    <h3 className="row-title">{proj.name}</h3>
                    <span className="row-category">{proj.category}</span>
                  </div>
                </div>

                {/* Right Specs & Quick Action Buttons */}
                <div className="brutalist-row-right">
                  <span className="row-specs">{proj.specs}</span>
                  <div className="row-actions">
                    <a 
                      href={proj.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="row-btn-demo"
                    >
                      <span>LIVE DEMO</span>
                      <ArrowUpRight size={16} />
                    </a>
                    <a 
                      href={proj.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="row-btn-github"
                      aria-label="GitHub Repo"
                    >
                      <Github size={18} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Project Inspector Box */}
        <AnimatePresence mode="wait">
          {currentProject && (
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="inspector-box glass-panel"
            >
              <div className="inspector-top">
                <div className="inspector-left">
                  <span className="inspector-tagline">{currentProject.tagline}</span>
                  <p className="inspector-desc">{currentProject.description}</p>
                </div>
                <div className="inspector-tech-stack">
                  <span className="inspector-tech-label">TECHNOLOGY STACK:</span>
                  <div className="inspector-tech-pills">
                    {currentProject.tech.map((t, idx) => (
                      <span key={idx} className="tech-chip-glow">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BrutalistProjects;
