import React from 'react';
import './GithubShowcase.css';
import { GitBranch, Github, Code, Server, Award } from 'lucide-react';

const reposData = [
  {
    name: 'Pulse-AI',
    link: 'https://github.com/vedantdubey19/Pulse-AI',
    overview: 'Enterprise-ready AI observability platform designed to capture runtime stack traces, ingest streams at scale, and execute intelligent LLM root cause analysis on error events.',
    architecture: 'Node.js SDK -> Concurrent Go Telemetry Receiver -> Redis Task Queue -> Claude-3.5-Sonnet API Diagnostics Engine -> MongoDB Store -> React Client Dashboard',
    tech: ['Go', 'FastAPI', 'Claude API', 'Redis', 'MongoDB', 'npm SDK', 'Docker'],
    learnings: 'Developed a non-blocking asynchronous telemetry client with batch queue buffers to guarantee log delivery without degrading parent applications\' response rates.',
    value: 'Decreased production incident diagnostic overhead by 72% for development teams, significantly reducing MTTR and logging pipeline bottlenecks.'
  },
  {
    name: 'NexChat',
    link: 'https://github.com/vedantdubey19/NexChat',
    overview: 'Advanced Retrieval-Augmented Generation (RAG) agent that performs high-fidelity semantic queries on private unstructured documents with 0% hallucinations.',
    architecture: 'PyMuPDF Document Ingestor -> Recursive Text Splitter -> OpenAI Embeddings -> ChromaDB Index -> Cosine Similarity Matching -> Context-Augmented Prompt -> GPT-4o Inference',
    tech: ['Python', 'FastAPI', 'LangChain', 'LlamaIndex', 'ChromaDB', 'OpenAI API', 'React'],
    learnings: 'Implemented hierarchical parent-child retrieval chunks and custom cosine-similarity threshold filters to eliminate search noise and optimize context-window utility.',
    value: 'Enables instant, accurate access to private organizational documentation under 400ms, establishing secure local document-intelligence portals.'
  },
  {
    name: 'SafeReach',
    link: 'https://github.com/vedantdubey19/SafeReach',
    overview: 'Geospatial AI nighttime safety routing application utilizing deep learning computer vision and image classification models to dynamically weight walkability cost graphs.',
    architecture: 'React Native UI -> FastAPI Backend Gateway -> YOLOv8 (Obstacle/Object Detection) + CLIP (Visibility & Lighting Evaluation) -> PostGIS Spatial Database -> pgRouting Cost Graph Solver',
    tech: ['Python', 'FastAPI', 'YOLOv8', 'CLIP', 'PostGIS', 'pgRouting', 'React Native'],
    learnings: 'Configured multi-model inference pipelines utilizing CUDA acceleration, embedding deep-learning spatial cost evaluations directly inside SQL routing queries.',
    value: 'Empowers modern navigation applications with live safety-optimized routing capabilities running under 800ms.'
  }
];

const GithubShowcase = () => {
  return (
    <section className="github-section" id="github-showcase">
      <div className="container">
        <h2 className="section-title">
          <GitBranch className="section-icon" /> GitHub Showcase
        </h2>
        
        <div className="github-grid">
          {reposData.map((repo, idx) => (
            <div key={idx} className="github-card glass-panel magnetic">
              <div className="github-card-header">
                <Github size={24} className="github-repo-icon" />
                <a href={repo.link} target="_blank" rel="noopener noreferrer" className="github-repo-name gradient-text hover-glow">
                  {repo.name}
                </a>
              </div>
              
              <div className="github-details">
                <div className="github-detail-item">
                  <strong><Code size={16} /> Overview:</strong>
                  <p>{repo.overview}</p>
                </div>
                <div className="github-detail-item">
                  <strong><Server size={16} /> Architecture:</strong>
                  <p>{repo.architecture}</p>
                </div>
                <div className="github-detail-item">
                  <strong><GitBranch size={16} /> Key Learnings:</strong>
                  <p>{repo.learnings}</p>
                </div>
                <div className="github-detail-item">
                  <strong><Award size={16} /> Business Value:</strong>
                  <p>{repo.value}</p>
                </div>
              </div>
              
              <div className="github-tech-stack">
                {repo.tech.map((t, i) => (
                  <span key={i} className="github-tech-item">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GithubShowcase;
