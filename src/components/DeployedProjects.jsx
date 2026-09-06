import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, Github, Globe, Sparkles, Cpu, Layers, Share2, Zap, Terminal, Shield,
  Activity, MessageSquareDiff, Compass, UserCheck, GraduationCap, ShieldAlert, Leaf, Code2, Table2
} from 'lucide-react';
import './DeployedProjects.css';

const spotlightProject = {
  id: 'pulse-ai',
  title: 'Pulse AI',
  subtitle: 'AI Telemetry & Real-Time Diagnostics Engine',
  badge: 'FLAGSHIP SYSTEM // START HERE',
  problem: 'Manual log inspection during production microservice outages slows incident response times (MTTR) and increases downtime costs.',
  solution: 'Engineered a concurrent Go telemetry ingestor and custom npm client SDK that routes real-time exceptions through Claude LLMs for automated root-cause diagnostics.',
  performance: 'Ingestion: 10,000+ logs/sec | Diagnostics latency: ~1.2s | Client SDK latency: <0.5ms',
  pipeline: 'Node/React SDK ➔ Go Ingestor ➔ Redis Queue ➔ Claude 3.5 Sonnet ➔ Mongo DB ➔ React Dashboard',
  tech: ['Go', 'FastAPI', 'Claude API', 'Redis', 'MongoDB', 'React', 'Docker'],
  demoUrl: 'https://pulse-ai-pi.vercel.app/',
  githubUrl: 'https://github.com/vedantdubey19/Pulse_AI'
};

const deployedAppsData = [
  {
    id: 'pulse-ai',
    title: 'Pulse AI',
    category: 'AI & RAG',
    badge: 'LIVE 🟢',
    icon: Activity,
    cardClass: 'card-pulse',
    iconColor: '#00f2fe',
    hudLabel: 'TELEMETRY // LOG_INSPECT',
    hudMetric: 'LATENCY < 0.5ms',
    hudGradient: 'radial-gradient(circle at 50% 0%, rgba(0, 242, 254, 0.25) 0%, rgba(0, 0, 0, 0.6) 80%)',
    description: 'High-performance AI observability platform monitoring microservice API traffic, detecting anomalies, and calling Claude for automated root-cause diagnostics.',
    tech: ['Go', 'FastAPI', 'Claude API', 'Redis', 'MongoDB', 'React'],
    demoUrl: 'https://pulse-ai-pi.vercel.app/',
    githubUrl: 'https://github.com/vedantdubey19/Pulse_AI'
  },
  {
    id: 'nexchat',
    title: 'NexChat',
    category: 'AI & RAG',
    badge: 'LIVE 🟢',
    icon: MessageSquareDiff,
    cardClass: 'card-nexchat',
    iconColor: '#e100ff',
    hudLabel: 'RAG ENGINE // VECTOR_DB',
    hudMetric: 'CHROMADB // SOURCE-CITED',
    hudGradient: 'radial-gradient(circle at 50% 0%, rgba(225, 0, 255, 0.25) 0%, rgba(0, 0, 0, 0.6) 80%)',
    description: 'Real-time chat & enterprise RAG platform indexing corporate documents with ChromaDB vector embeddings, so answers stay grounded in cited source passages, plus instant media sharing.',
    tech: ['Python', 'FastAPI', 'ChromaDB', 'LangChain', 'React', 'OpenAI'],
    demoUrl: 'https://nex-chat-ivory.vercel.app',
    githubUrl: 'https://github.com/vedantdubey19/NexChat'
  },
  {
    id: 'tripnest',
    title: 'TripNest',
    category: 'Full-Stack & Web',
    badge: 'LIVE 🟢',
    icon: Compass,
    cardClass: 'card-tripnest',
    iconColor: '#ff4b2b',
    hudLabel: 'TRAVEL GATEWAY // FLIGHT_API',
    hudMetric: 'REDIS CACHED // <800ms',
    hudGradient: 'radial-gradient(circle at 50% 0%, rgba(255, 75, 43, 0.25) 0%, rgba(0, 0, 0, 0.6) 80%)',
    description: 'Unified travel planning platform aggregating third-party travel APIs into a cached, JWT-secured booking engine with fast multi-service search speeds.',
    tech: ['Node.js', 'Express', 'React', 'MongoDB', 'JWT Auth', 'Redis'],
    demoUrl: 'https://tripnest-5flq.onrender.com',
    githubUrl: 'https://github.com/vedantdubey19/TripNest'
  },
  {
    id: 'hiresense-ai',
    title: 'HireSense-AI',
    category: 'AI & RAG',
    badge: 'LIVE 🟢',
    icon: UserCheck,
    cardClass: 'card-hiresense',
    iconColor: '#00c6ff',
    hudLabel: 'HR ENGINE // RESUME_RANK',
    hudMetric: 'NLP MATCH: 98.4%',
    hudGradient: 'radial-gradient(circle at 50% 0%, rgba(0, 198, 255, 0.25) 0%, rgba(0, 0, 0, 0.6) 80%)',
    description: 'Automated candidate screening engine using NLP and vector embeddings to parse resumes, match skill criteria, and rank applicants efficiently.',
    tech: ['JavaScript', 'NLP', 'Text Embeddings', 'React', 'Node.js'],
    demoUrl: 'https://hire-sense-ai-beta.vercel.app',
    githubUrl: 'https://github.com/vedantdubey19/HireSense-AI'
  },
  {
    id: 'study-ai',
    title: 'Study_Ai',
    category: 'AI & RAG',
    badge: 'LIVE 🟢',
    icon: GraduationCap,
    cardClass: 'card-study',
    iconColor: '#6a11cb',
    hudLabel: 'DOC RAG // PDF_INDEXER',
    hudMetric: 'OLLAMA + GEMINI HYBRID',
    hudGradient: 'radial-gradient(circle at 50% 0%, rgba(106, 17, 203, 0.25) 0%, rgba(0, 0, 0, 0.6) 80%)',
    description: 'RAG-powered study assistant. Upload textbooks/PDFs to receive precise document-grounded answers powered by local Ollama or cloud Groq/Gemini APIs.',
    tech: ['Python', 'Streamlit', 'Ollama', 'LlamaIndex', 'Gemini API'],
    demoUrl: 'https://studyai-6q5gxcbbl4l63jh8clpnf5.streamlit.app/',
    githubUrl: 'https://github.com/vedantdubey19/Study_Ai'
  },
  {
    id: 'guardian-ai',
    title: 'Guardian-AI',
    category: 'Security & Tools',
    badge: 'LIVE 🟢',
    icon: ShieldAlert,
    cardClass: 'card-guardian',
    iconColor: '#ff0844',
    hudLabel: 'SECURITY // THREAT_RADAR',
    hudMetric: 'STATUS: ACTIVE_DEFENSE',
    hudGradient: 'radial-gradient(circle at 50% 0%, rgba(255, 8, 68, 0.25) 0%, rgba(0, 0, 0, 0.6) 80%)',
    description: 'Automated web threat monitoring and AI-driven security analysis platform designed for web infrastructure protection.',
    tech: ['TypeScript', 'Next.js', 'AI Security', 'Tailwind CSS'],
    demoUrl: 'https://guardian-ai-puce-theta.vercel.app',
    githubUrl: 'https://github.com/vedantdubey19/Guardian-AI'
  },
  {
    id: 'ecotrace',
    title: 'EcoTrace (Carbon Footprint)',
    category: 'Full-Stack & Web',
    badge: 'LIVE 🟢',
    icon: Leaf,
    cardClass: 'card-ecotrace',
    iconColor: '#38ef7d',
    hudLabel: 'SUSTAINABILITY // CARBON_TRACK',
    hudMetric: 'PRIVACY FIRST METRICS',
    hudGradient: 'radial-gradient(circle at 50% 0%, rgba(56, 239, 125, 0.25) 0%, rgba(0, 0, 0, 0.6) 80%)',
    description: 'Privacy-first sustainability web application measuring personal carbon emissions and providing actionable recommendations to lower environmental impact.',
    tech: ['JavaScript', 'Node.js', 'Express', 'HTML5', 'Chart.js'],
    demoUrl: 'https://eco-trace-carbon-footprint.onrender.com',
    githubUrl: 'https://github.com/vedantdubey19/Carbon-Footprint'
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    category: 'Full-Stack & Web',
    badge: 'LIVE 🟢',
    icon: Code2,
    cardClass: 'card-portfolio',
    iconColor: '#ffffff',
    hudLabel: 'CONTAINER // VITE_REACT',
    hudMetric: 'THREE.JS + 3D CARDS',
    hudGradient: 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0.6) 80%)',
    description: 'Personal developer showcase featuring interactive 3D card decks, custom web applications, and AI engineering projects.',
    tech: ['React', 'Vite', 'Framer Motion', 'CSS3'],
    demoUrl: 'https://portfolio-ruby-six-52.vercel.app',
    githubUrl: 'https://github.com/vedantdubey19/Portfolio'
  },
  {
    id: 'csv-imposter',
    title: 'CMR CSV Imposter',
    category: 'Security & Tools',
    badge: 'LIVE 🟢',
    icon: Table2,
    cardClass: 'card-csv',
    iconColor: '#8e9eab',
    hudLabel: 'DATA ENGINE // CSV_PARSER',
    hudMetric: '50,000+ ROWS / SEC',
    hudGradient: 'radial-gradient(circle at 50% 0%, rgba(142, 158, 171, 0.25) 0%, rgba(0, 0, 0, 0.6) 80%)',
    description: 'High-speed CSV dataset processor and mock data generation tool engineered for developers and QA workflows.',
    tech: ['TypeScript', 'React', 'Vite', 'CSV Engine'],
    demoUrl: 'https://cmr-csv-imposter-kappa.vercel.app',
    githubUrl: 'https://github.com/vedantdubey19/CMR_CSV_imposter'
  }
];

// Interactive Stack Graph Nodes (Connecting Projects via Shared Tech Hubs)
const techHubNodes = [
  { id: 'fastapi', label: 'FastAPI / Python', projects: ['pulse-ai', 'nexchat', 'study-ai'] },
  { id: 'redis', label: 'Redis Queue & Cache', projects: ['pulse-ai', 'tripnest'] },
  { id: 'rag', label: 'RAG & ChromaDB', projects: ['nexchat', 'study-ai', 'hiresense-ai'] },
  { id: 'react', label: 'React & TypeScript', projects: ['pulse-ai', 'nexchat', 'tripnest', 'guardian-ai', 'portfolio', 'csv-imposter'] },
  { id: 'llm', label: 'Claude / OpenAI APIs', projects: ['pulse-ai', 'nexchat', 'study-ai', 'hiresense-ai'] }
];

const categories = ['ALL', 'AI & RAG', 'Full-Stack & Web', 'Security & Tools'];

const DeployedProjects = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [hoveredTech, setHoveredTech] = useState(null);

  // Filter apps based on filter bar OR clicked stack graph node
  const filteredApps = deployedAppsData.filter((app) => {
    if (hoveredTech) {
      const hub = techHubNodes.find((h) => h.id === hoveredTech);
      return hub ? hub.projects.includes(app.id) : true;
    }
    if (activeFilter === 'ALL') return true;
    return app.category === activeFilter;
  });

  return (
    <section className="deployed-section" id="deployed">
      <div className="container">
        {/* Header */}
        <div className="deployed-header text-center">
          <div className="section-subtitle-badge">
            <Globe size={14} className="subtitle-icon" />
            <span>COMMAND DECK & SYSTEMS MAP</span>
          </div>

          <h2 className="section-title">
            INTERACTIVE <span className="title-red">SYSTEMS STACK GRAPH //</span>
          </h2>
          <p className="deployed-subtitle">
            Hover over tech hubs to trace inter-connected architecture nodes, or use the Command Deck to launch live deployments.
          </p>
        </div>

        {/* 🌟 1. SPOTLIGHT SLOT ("START HERE") */}
        <div className="spotlight-card glass-panel">
          <div className="spotlight-badge-row">
            <span className="spotlight-tag">
              <Zap size={13} color="var(--accent-red)" />
              {spotlightProject.badge}
            </span>
            <span className="spotlight-perf">{spotlightProject.performance}</span>
          </div>

          <div className="spotlight-content-grid">
            <div className="spotlight-left">
              <h3 className="spotlight-title">{spotlightProject.title}</h3>
              <p className="spotlight-subtitle">{spotlightProject.subtitle}</p>

              <div className="spotlight-info-block">
                <span className="spotlight-lbl">PROBLEM:</span>
                <p className="spotlight-desc">{spotlightProject.problem}</p>
              </div>

              <div className="spotlight-info-block">
                <span className="spotlight-lbl">SOLUTION:</span>
                <p className="spotlight-desc">{spotlightProject.solution}</p>
              </div>
            </div>

            <div className="spotlight-right">
              {/* Architecture Pipeline Banner */}
              <div className="pipeline-box">
                <div className="pipeline-header">
                  <Terminal size={14} color="var(--accent-red)" />
                  <span>SYSTEM PIPELINE ARCHITECTURE</span>
                </div>
                <div className="pipeline-flow">
                  <code>{spotlightProject.pipeline}</code>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="spotlight-tech-row">
                {spotlightProject.tech.map((t, i) => (
                  <span key={i} className="spotlight-tech-pill">{t}</span>
                ))}
              </div>

              {/* Actions */}
              <div className="spotlight-actions">
                <a
                  href={spotlightProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="spotlight-btn-demo"
                >
                  <span>Launch Live System</span>
                  <ExternalLink size={16} />
                </a>
                <a
                  href={spotlightProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="spotlight-btn-github"
                  aria-label="GitHub Repo"
                >
                  <Github size={18} />
                  <span>View Source</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 🕸️ 2. INTERACTIVE STACK GRAPH MAP */}
        <div className="stack-graph-container glass-panel">
          <div className="graph-header">
            <Share2 size={16} color="var(--accent-red)" />
            <span>SYSTEM TECH HUBS (Hover hub to trace connected systems)</span>
          </div>

          <div className="graph-nodes-row">
            {techHubNodes.map((hub) => {
              const isSelected = hoveredTech === hub.id;
              return (
                <button
                  key={hub.id}
                  type="button"
                  className={`graph-node-btn ${isSelected ? 'active' : ''}`}
                  onMouseEnter={() => setHoveredTech(hub.id)}
                  onMouseLeave={() => setHoveredTech(null)}
                  onClick={() => setHoveredTech(isSelected ? null : hub.id)}
                  aria-pressed={isSelected}
                >
                  <Cpu size={14} className="node-icon" aria-hidden="true" />
                  <span>{hub.label}</span>
                  <span className="node-count">{hub.projects.length} Systems</span>
                </button>
              );
            })}
          </div>

          {hoveredTech && (
            <div className="graph-status-msg" role="status" aria-live="polite">
              <span>Tracing connections for <strong>{techHubNodes.find(h => h.id === hoveredTech)?.label}</strong>: Showing {filteredApps.length} linked systems below.</span>
            </div>
          )}
        </div>

        {/* 🎛️ 3. COMMAND DECK FILTER & CARDS GRID */}
        <div className="command-deck-header">
          <div className="deployed-filter-bar">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                type="button"
                className={`filter-tab ${activeFilter === cat && !hoveredTech ? 'active' : ''}`}
                onClick={() => {
                  setHoveredTech(null);
                  setActiveFilter(cat);
                }}
                aria-pressed={activeFilter === cat && !hoveredTech}
              >
                {cat}
                {cat === 'ALL' && <span className="count-pill">{deployedAppsData.length}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Apps Grid */}
        <motion.div layout className="deployed-grid">
          <AnimatePresence>
            {filteredApps.map((app) => {
              const CardIcon = app.icon;
              return (
                <motion.div
                  key={app.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.35 }}
                  className={`deployed-card ${app.cardClass}`}
                >
                  {/* Top Header with Pulsing Live Badge & Top-Right Project Icon Anchor */}
                  <div className="deployed-card-top">
                    <div className="status-badge-wrapper">
                      <span className="live-pulse-dot"></span>
                      <span className="live-status-pill">LIVE</span>
                    </div>
                    
                    <div className="card-top-icon-anchor" style={{ color: app.iconColor }}>
                      <CardIcon size={20} />
                    </div>
                  </div>

                  {/* 🖼️ Themed High-Tech Visual Preview Banner Box */}
                  <div className="card-hud-banner" style={{ background: app.hudGradient }}>
                    <div className="hud-banner-icon">
                      <CardIcon size={32} color={app.iconColor} />
                    </div>
                    <div className="hud-banner-info">
                      <span className="hud-banner-label">{app.hudLabel}</span>
                      <span className="hud-banner-metric" style={{ color: app.iconColor }}>{app.hudMetric}</span>
                    </div>
                  </div>

                  {/* Title & Category */}
                  <div className="title-row">
                    <h3 className="deployed-card-title">{app.title}</h3>
                    <span className="app-cat-tag">{app.category}</span>
                  </div>

                  {/* Description */}
                  <p className="deployed-card-desc">{app.description}</p>

                  {/* Tech Pills */}
                  <div className="deployed-tech-list">
                    {app.tech.map((t, i) => (
                      <span key={i} className="deployed-tech-pill">{t}</span>
                    ))}
                  </div>

                  {/* Card Footer Actions */}
                  <div className="deployed-card-footer">
                    <a
                      href={app.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="deployed-btn-demo"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={14} />
                    </a>

                    <a
                      href={app.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="deployed-btn-github"
                      aria-label="GitHub Repo"
                    >
                      <Github size={16} />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default DeployedProjects;
