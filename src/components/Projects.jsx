import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Projects.css';
import { Layers, Github, ExternalLink } from 'lucide-react';

// Sub-component for rendering interactive SVG Architecture Flows
const InteractiveArchitecture = ({ title }) => {
  const [hoveredNode, setHoveredNode] = useState(null);

  if (title === 'Pulse AI') {
    // Pulse AI Ingestion pipeline SVG
    return (
      <div className="svg-arch-wrapper" style={{ marginTop: '1.25rem', marginBottom: '1.25rem', width: '100%' }}>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
          Interactive Telemetry Pipeline (Hover nodes to trace)
        </p>
        <svg viewBox="0 0 500 80" width="100%" style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
          <defs>
            <filter id="pulse-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connection Path */}
          <path 
            id="pulse-path" 
            d="M 50,40 L 450,40" 
            fill="none" 
            stroke={hoveredNode ? 'var(--accent-red)' : 'rgba(255, 255, 255, 0.12)'} 
            strokeWidth={hoveredNode ? 2 : 1}
            style={{ 
              transition: 'stroke 0.3s ease, stroke-width 0.3s ease',
              filter: hoveredNode ? 'url(#pulse-glow)' : 'none' 
            }}
          />

          {/* Moving Telemetry Particle */}
          <circle r="3" fill="var(--accent-red)">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M 50,40 L 450,40" />
          </circle>

          {/* Nodes */}
          {[
            { id: 'SDK', label: 'SDK Client', x: 50 },
            { id: 'GoInjest', label: 'Go API', x: 130 },
            { id: 'Queue', label: 'Redis Queue', x: 210 },
            { id: 'Claude', label: 'Claude LLM', x: 290 },
            { id: 'DB', label: 'MongoDB', x: 370 },
            { id: 'UI', label: 'React UI', x: 450 }
          ].map((node) => {
            const isHovered = hoveredNode === node.id;
            return (
              <g 
                key={node.id} 
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle 
                  cx={node.x} 
                  cy={40} 
                  r={isHovered ? 12 : 9} 
                  fill={isHovered ? 'var(--accent-red)' : 'var(--bg-secondary)'} 
                  stroke={isHovered ? 'var(--text-primary)' : 'rgba(255,255,255,0.2)'}
                  strokeWidth={1.5}
                  style={{ transition: 'all 0.25s ease' }}
                />
                <text 
                  x={node.x} 
                  y={68} 
                  textAnchor="middle" 
                  fill={isHovered ? 'var(--text-primary)' : 'var(--text-muted)'} 
                  style={{ fontSize: '9px', fontFamily: 'var(--font-display)', fontWeight: isHovered ? 600 : 400, transition: 'fill 0.2s ease' }}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  if (title === 'NexChat') {
    // NexChat RAG pipeline SVG (Interconnected flow)
    return (
      <div className="svg-arch-wrapper" style={{ marginTop: '1.25rem', marginBottom: '1.25rem', width: '100%' }}>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
          Interactive RAG Pipeline (Hover components to trace flow)
        </p>
        <svg viewBox="0 0 500 110" width="100%" style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
          <defs>
            <filter id="rag-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Ingestion Path */}
          <path 
            id="ingest-path" 
            d="M 50,30 L 150,30 L 250,30" 
            fill="none" 
            stroke={hoveredNode === 'VectorDB' || hoveredNode === 'Embeddings' ? 'var(--accent-light-blue)' : 'rgba(255, 255, 255, 0.12)'} 
            strokeWidth={hoveredNode === 'VectorDB' || hoveredNode === 'Embeddings' ? 2 : 1}
            style={{ transition: 'stroke 0.3s ease, stroke-width 0.3s ease' }}
          />

          {/* Query/Retrieval Path */}
          <path 
            id="query-path" 
            d="M 50,80 L 150,80 C 190,80 210,30 250,30" 
            fill="none" 
            stroke={hoveredNode === 'LangChain' || hoveredNode === 'VectorDB' ? '#00f0ff' : 'rgba(255, 255, 255, 0.12)'} 
            strokeWidth={hoveredNode === 'LangChain' || hoveredNode === 'VectorDB' ? 2 : 1}
            style={{ 
              transition: 'stroke 0.3s ease, stroke-width 0.3s ease',
              filter: (hoveredNode === 'LangChain' || hoveredNode === 'VectorDB') ? 'url(#rag-glow)' : 'none' 
            }}
          />

          {/* Context/Response Path */}
          <path 
            id="response-path" 
            d="M 250,30 C 290,30 310,80 350,80 L 450,80" 
            fill="none" 
            stroke={hoveredNode === 'LLM' || hoveredNode === 'LangChain' || hoveredNode === 'VectorDB' ? '#00f0ff' : 'rgba(255, 255, 255, 0.12)'} 
            strokeWidth={hoveredNode === 'LLM' || hoveredNode === 'LangChain' || hoveredNode === 'VectorDB' ? 2 : 1}
            style={{ 
              transition: 'stroke 0.3s ease, stroke-width 0.3s ease',
              filter: (hoveredNode === 'LLM' || hoveredNode === 'LangChain') ? 'url(#rag-glow)' : 'none' 
            }}
          />

          {/* Ingestion Particle */}
          <circle r="3" fill="#ff2a2a">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M 50,30 L 150,30 L 250,30" />
          </circle>

          {/* Query Retrieval Particle */}
          <circle r="3.5" fill="#00f0ff">
            <animateMotion dur="3.5s" repeatCount="indefinite" path="M 50,80 L 150,80 C 190,80 210,30 250,30 C 290,30 310,80 350,80 L 450,80" />
          </circle>

          {/* Ingestion Row Nodes */}
          {[
            { id: 'Docs', label: 'Documents', x: 50, y: 30 },
            { id: 'Embeddings', label: 'Embeddings', x: 150, y: 30 },
            { id: 'VectorDB', label: 'Vector DB', x: 250, y: 30 }
          ].map((node) => {
            const isHovered = hoveredNode === node.id;
            return (
              <g 
                key={node.id} 
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{ cursor: 'pointer' }}
              >
                {node.id === 'VectorDB' ? (
                  // Cylindrical vector db icon
                  <path 
                    d="M 238,20 C 238,17 262,17 262,20 L 262,36 C 262,39 238,39 238,36 Z" 
                    fill={isHovered ? 'var(--accent-light-blue)' : 'var(--bg-secondary)'} 
                    stroke={isHovered ? 'var(--text-primary)' : 'rgba(255,255,255,0.2)'}
                    strokeWidth={1.5}
                    style={{ transition: 'all 0.2s ease' }}
                  />
                ) : (
                  <rect 
                    x={node.x - 22} 
                    y={node.y - 10} 
                    width={44} 
                    height={20} 
                    rx={4}
                    fill={isHovered ? 'var(--accent-light-blue)' : 'var(--bg-secondary)'} 
                    stroke={isHovered ? 'var(--text-primary)' : 'rgba(255,255,255,0.2)'}
                    strokeWidth={1.5}
                    style={{ transition: 'all 0.2s ease' }}
                  />
                )}
                <text 
                  x={node.x} 
                  y={node.y - 16} 
                  textAnchor="middle" 
                  fill={isHovered ? 'var(--text-primary)' : 'var(--text-muted)'} 
                  style={{ fontSize: '9px', fontFamily: 'var(--font-display)', fontWeight: isHovered ? 600 : 400, transition: 'fill 0.2s ease' }}
                >
                  {node.label}
                </text>
              </g>
            );
          })}

          {/* Retrieval Row Nodes */}
          {[
            { id: 'Query', label: 'User Query', x: 50, y: 80 },
            { id: 'LangChain', label: 'LangChain', x: 150, y: 80 },
            { id: 'LLM', label: 'LLM (OpenAI)', x: 350, y: 80 },
            { id: 'Response', label: 'Response', x: 450, y: 80 }
          ].map((node) => {
            const isHovered = hoveredNode === node.id;
            return (
              <g 
                key={node.id} 
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{ cursor: 'pointer' }}
              >
                <rect 
                  x={node.x - 24} 
                  y={node.y - 10} 
                  width={48} 
                  height={20} 
                  rx={4}
                  fill={isHovered ? 'var(--accent-teal)' : 'var(--bg-secondary)'} 
                  stroke={isHovered ? 'var(--text-primary)' : 'rgba(255,255,255,0.2)'}
                  strokeWidth={1.5}
                  style={{ transition: 'all 0.2s ease' }}
                />
                <text 
                  x={node.x} 
                  y={node.y + 24} 
                  textAnchor="middle" 
                  fill={isHovered ? 'var(--text-primary)' : 'var(--text-muted)'} 
                  style={{ fontSize: '9px', fontFamily: 'var(--font-display)', fontWeight: isHovered ? 600 : 400, transition: 'fill 0.2s ease' }}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  // TripNest diagram
  return (
    <div className="svg-arch-wrapper" style={{ marginTop: '1.25rem', marginBottom: '1.25rem', width: '100%' }}>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
        API Mapping Pipeline (Hover nodes to trace)
      </p>
      <svg viewBox="0 0 500 80" width="100%" style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
        <defs>
          <filter id="nest-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path 
          id="nest-path" 
          d="M 50,40 L 450,40" 
          fill="none" 
          stroke={hoveredNode ? 'var(--accent-red)' : 'rgba(255, 255, 255, 0.12)'} 
          strokeWidth={hoveredNode ? 2 : 1}
          style={{ 
            transition: 'stroke 0.3s ease, stroke-width 0.3s ease',
            filter: hoveredNode ? 'url(#nest-glow)' : 'none' 
          }}
        />

        <circle r="3" fill="var(--accent-red)">
          <animateMotion dur="3s" repeatCount="indefinite" path="M 50,40 L 450,40" />
        </circle>

        {[
          { id: 'React', label: 'React SPA', x: 50 },
          { id: 'Auth', label: 'JWT Gateway', x: 150 },
          { id: 'Express', label: 'Express Controller', x: 250 },
          { id: 'Cache', label: 'Mongo Cache', x: 350 },
          { id: 'APIs', label: 'Travel APIs', x: 450 }
        ].map((node) => {
          const isHovered = hoveredNode === node.id;
          return (
            <g 
              key={node.id} 
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle 
                cx={node.x} 
                cy={40} 
                r={isHovered ? 12 : 9} 
                fill={isHovered ? 'var(--accent-red)' : 'var(--bg-secondary)'} 
                stroke={isHovered ? 'var(--text-primary)' : 'rgba(255,255,255,0.2)'}
                strokeWidth={1.5}
                style={{ transition: 'all 0.25s ease' }}
              />
              <text 
                x={node.x} 
                y={68} 
                textAnchor="middle" 
                fill={isHovered ? 'var(--text-primary)' : 'var(--text-muted)'} 
                style={{ fontSize: '9px', fontFamily: 'var(--font-display)', fontWeight: isHovered ? 600 : 400, transition: 'fill 0.2s ease' }}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const projectsData = [
  {
    title: 'Pulse AI',
    tag: 'Observability & Diagnostics',
    badges: ['Featured', 'AI', 'Production Ready'],
    problem: 'Production incident resolution is severely bottlenecked by manual log dissection across fragmented microservices, raising Mean Time to Resolution (MTTR) and operational costs during critical outages.',
    solution: 'Engineered a high-performance observability platform and custom npm SDK that captures real-time API logs, routes them through a concurrent Go backend, and employs LLMs (Claude API) for zero-latency exception diagnostics and automated root cause detection.',
    tech: ['Go', 'FastAPI', 'Claude API', 'Redis', 'MongoDB', 'React', 'Vite', 'npm SDK', 'Docker'],
    architecture: 'Express SDK (Async Memory Buffering) -> Go Telemetry Ingestor -> Redis queue -> Claude-3.5-Sonnet Root Cause Diagnostics API -> MongoDB storage -> React dashboard',
    challenges: 'Telemetry pipelines must ingest continuous log streams without introducing thread-blocking latency on the parent Node.js application. Solved by building a non-blocking npm client SDK utilizing asynchronous memory buffers and backpressure-aware batch flushing.',
    features: [
      'AI-Powered Diagnostics: Connects raw exception stack traces with prompt-engineered Claude models to explain error root causes and output verified code remedies.',
      'High-Performance Go Ingestor: Leverages Go goroutines and sync pools to sustain high-throughput ingestion benchmarks of 10,000+ telemetry payloads per second.',
      'Intelligent Redis Queue: Orchestrates rate-limiting, error retries, and asynchronous job worker queues to decouple log ingestion from diagnostic model execution cycles.',
      'Production-Grade Docker Deployments: Deployed as microservices with isolated environments and optimized build configurations.'
    ],
    impact: 'Reduces manual incident diagnosis time and MTTR by 72% based on local performance benchmarks, saving engineering hours and establishing 99.9% pipeline ingestion reliability.',
    performance: 'Ingestion Capacity: 10,000+ logs/sec | Diagnostics latency: ~1.2s | Client-side latency: <0.5ms',
    github: 'https://github.com/vedantdubey19/Pulse-AI',
    live: 'https://pulse-ai-pi.vercel.app/'
  },
  {
    title: 'NexChat',
    tag: 'Generative AI • RAG Platform',
    badges: ['AI', 'Production Ready', 'Open Source'],
    problem: 'Standard LLMs hallucinate when queried on custom, proprietary corporate documents, rendering generic public foundation models unsuitable for strict organizational enterprise workflows.',
    solution: 'Built a robust Retrieval-Augmented Generation (RAG) platform that indexes corporate data using high-dimensional vector embeddings, employing advanced retrieval strategies to synthesize accurate, document-grounded responses.',
    tech: ['Python', 'FastAPI', 'LangChain', 'LlamaIndex', 'ChromaDB', 'OpenAI API', 'React'],
    architecture: 'PDF Ingestion (PyMuPDF) -> Semantic Hierarchical Chunking -> OpenAI text-embedding-3-small -> ChromaDB Vector Index -> Cosine Similarity Query -> Context-Augmented Prompt Template -> GPT-4o Chat Inference',
    challenges: 'Standard vector query results often contain retrieval noise and lack contextual coherence, leading to diluted LLM answers. Overcome by implementing hierarchical parent-child chunking and deploying a semantic context-reranker model, improving LLM query precision.',
    features: [
      'Vector Database Semantic Search: Utilizes ChromaDB vector indexes to calculate cosine similarity matches in high-dimensional space under 50ms.',
      'Advanced Context Retrieval Flow: Implemented recursive character chunkers and metadata filtering, passing only high-relevance chunks to prompt contexts.',
      'Asynchronous API & Prompt Engineering: Built on FastAPI utilizing asynchronous file parsing and highly optimized custom system prompts to restrict hallucination thresholds.'
    ],
    impact: 'Maintained 0% out-of-context hallucinations during local evaluation benchmarks, generating highly relevant responses grounded in custom enterprise data with a 400ms query latency.',
    performance: 'Vector Index Match Speed: ~48ms | End-to-end RAG response: ~400ms | Ingestion rate: 50+ docs/min',
    github: 'https://github.com/vedantdubey19/NexChat',
    live: 'https://nex-chat-ivory.vercel.app/'
  },
  {
    title: 'TripNest',
    tag: 'Full-Stack • API Integration',
    badges: ['Full-Stack', 'API Integration'],
    problem: 'Users planning travel face fragmented booking journeys across disparate platforms, resulting in friction, poor UX, and manual scheduling conflicts.',
    solution: 'Developed a unified itinerary planner and travel booking engine that compiles live travel data from multiple third-party REST APIs into a cohesive platform secured by JWT authentication.',
    tech: ['Node.js', 'Express', 'React', 'MongoDB', 'JSON Web Tokens', 'REST APIs'],
    architecture: 'React SPA Client -> JWT Authorized API Gateway -> Express MVC Backend Controllers -> MongoDB Caching Layer & External Booking API Mappings',
    challenges: 'Handling high API latency and rate-limiting from third-party travel aggregators during concurrent searches. Resolved by implementing a Redis/MongoDB caching layer with strict Time-To-Live (TTL) policies, reducing redundant API hits.',
    features: [
      'Secure JWT Authorization: Custom Express middleware guards routes, manages user sessions, and implements password hashing via bcrypt.',
      'Clean MVC Architecture: Enforces strict separation of concerns between API routes, controller logic, and mongoose schemas.',
      'External API Integration & Cache: Leveraged asynchronous Axios pools to aggregate multi-service flight/hotel endpoints into a single responsive UI.'
    ],
    impact: 'Decreased user travel booking steps by 60% and achieved a 45% reduction in search loading speeds via smart caching layers.',
    performance: 'Aggregated search API latency: <800ms (reduced from 3.2s via TTL caching) | Session validation: <5ms',
    github: 'https://github.com/vedantdubey19/TripNest',
    live: 'https://tripnest-5flq.onrender.com/'
  }
];

const Projects = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.6 } 
    }
  };

  const getBadgeStyle = (badge) => {
    switch (badge) {
      case 'Featured':
        return { border: '1px solid var(--accent-red)', background: 'rgba(255, 42, 42, 0.1)', color: 'var(--text-primary)' };
      case 'AI':
        return { border: '1px solid #00f0ff', background: 'rgba(0, 240, 255, 0.1)', color: '#00f0ff' };
      case 'Production Ready':
        return { border: '1px solid #10b981', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' };
      case 'Open Source':
        return { border: '1px solid #f59e0b', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' };
      default:
        return { border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' };
    }
  };

  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">
            <Layers className="section-icon" /> Featured Projects
          </h2>
        </motion.div>
        
        <motion.div 
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projectsData.map((project, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{
                y: -10,
                borderColor: 'rgba(255, 42, 42, 0.4)',
                boxShadow: '0 20px 40px rgba(255, 42, 42, 0.12)',
                background: 'rgba(10, 15, 37, 0.5)'
              }}
              style={{ 
                position: 'relative', 
                overflow: 'hidden',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease'
              }}
              className="project-card glass-panel"
            >
              {/* Card visual hover overlay */}
              <div 
                style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  width: '100%', 
                  height: '100%', 
                  background: 'linear-gradient(135deg, rgba(255,42,42,0.02) 0%, rgba(0,240,255,0.02) 100%)', 
                  pointerEvents: 'none',
                  zIndex: 0
                }}
              />

              <div className="project-content" style={{ position: 'relative', zIndex: 1 }}>
                <div className="project-header">
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {project.badges.map((badge, bIdx) => (
                      <span 
                        key={bIdx} 
                        style={{ 
                          fontSize: '0.7rem', 
                          padding: '0.2rem 0.6rem', 
                          borderRadius: '10px', 
                          fontWeight: '600', 
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          ...getBadgeStyle(badge)
                        }}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link magnetic" aria-label="GitHub">
                      <Github size={20} />
                    </a>
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link magnetic" aria-label="Live Demo">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
                
                <h3 className="project-title">{project.title}</h3>
                <span className="project-tag" style={{ display: 'inline-block', marginBottom: '1.25rem', fontSize: '0.75rem' }}>{project.tag}</span>
                
                <div className="project-description">
                  <p className="proj-desc-section"><strong>Problem:</strong> {project.problem}</p>
                  <p className="proj-desc-section"><strong>Solution:</strong> {project.solution}</p>
                  
                  {/* Interactive Architecture SVG flow */}
                  <InteractiveArchitecture title={project.title} />

                  <p className="proj-desc-section"><strong>Performance:</strong> <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{project.performance}</span></p>
                  <p className="proj-desc-section"><strong>Challenges:</strong> {project.challenges}</p>
                  
                  <div className="proj-desc-section">
                    <strong>Key Features:</strong>
                    <ul className="proj-highlights-list">
                      {project.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="proj-desc-section"><strong>Impact:</strong> <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{project.impact}</span></p>
                </div>
                
                <div className="project-tech-stack">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="tech-item">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
