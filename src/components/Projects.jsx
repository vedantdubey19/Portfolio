import React from 'react';
import './Projects.css';
import { Layers, Github, ExternalLink } from 'lucide-react';

const projectsData = [
  {
    title: 'HireSense AI',
    tag: 'AI SaaS • NLP',
    description: 'An AI-powered recruitment engine designed to intelligently automate resume screening. Engineered a semantic job-matching pipeline using advanced embeddings to process 5,000+ candidate profiles, slashing manual shortlisting time by ~70% through automated candidate ranking.',
    tech: ['MERN', 'NLP', 'Embeddings', 'Docker', 'MongoDB'],
    github: '#',
    live: '#'
  },
  {
    title: 'AutoDev AI',
    tag: 'ML • DevTools',
    description: 'A cutting-edge developer productivity SaaS integrating seamlessly with GitHub. Analyzed 1,000+ pull requests to deliver AI-generated code reviews, accelerating turnaround by ~45%. Further trained an ML risk-prediction model on historical commit metadata, achieving 78% precision in identifying bug-prone code.',
    tech: ['MERN', 'Machine Learning', 'GitHub API', 'CI/CD', 'Docker'],
    github: '#',
    live: '#'
  }
];

const Projects = () => {
  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <h2 className="section-title">
          <Layers className="section-icon" /> Featured Projects
        </h2>
        
        <div className="projects-grid">
          {projectsData.map((project, idx) => (
            <div key={idx} className="project-card glass-panel magnetic">
              <div className="project-content">
                <div className="project-header">
                  <span className="project-tag">{project.tag}</span>
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
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech-stack">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="tech-item">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
