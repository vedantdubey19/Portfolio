import React from 'react';
import './About.css';
import { User, Cpu, Server, Code, Zap, Globe, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">
            <User className="section-icon" /> About Me
          </h2>
        </motion.div>
        
        <div className="bento-grid">
          
          {/* Main Bio - Spans 2 columns */}
          <motion.div 
            className="bento-card glass-panel col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="card-header">
              <Cpu className="text-red" size={28} />
              <h3 className="bento-title gradient-text">AI Engineer</h3>
            </div>
            <p className="bento-text">
              I engineer and deploy production-ready AI applications, specializing in large language model (LLM) integrations, optimized retrieval-augmented generation (RAG) pipelines, and autonomous AI agents. My core focus lies in backend engineering, constructing high-throughput systems with FastAPI, designing scalable REST APIs, and automating cloud deployment pipelines to ensure high availability and low-latency inference.
            </p>
          </motion.div>

          {/* Education Box */}
          <motion.div 
            className="bento-card glass-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="card-header">
              <Globe className="text-blue" size={28} />
              <h3 className="bento-title">Education</h3>
            </div>
            <div className="edu-info">
              <h4 className="degree">B.Tech in Data Science</h4>
              <p className="university">Lloyd Institute of Engineering and Technology</p>
              <span className="year">2023 - 2027</span>
            </div>
          </motion.div>

          {/* Philosophy/Mission Box */}
          <motion.div 
            className="bento-card glass-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="card-header">
              <Zap className="text-yellow" size={28} />
              <h3 className="bento-title">Mission</h3>
            </div>
            <p className="bento-text italic">
              "My mission is to build intelligent AI systems that solve real-world problems through scalable machine learning, LLMs, agentic AI, and automation while creating products that make technology more accessible and impactful."
            </p>
          </motion.div>

          {/* Stats/Focus Areas - Spans 2 columns */}
          <motion.div 
            className="bento-card glass-panel col-span-2 stats-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ padding: '2rem' }}
          >
            <div className="stats-grid-new">
              <div className="stat-item magnetic hover-target">
                <Server className="stat-icon" size={32} />
                <span className="stat-value">Agentic AI</span>
                <span className="stat-label">Automation</span>
              </div>
              <div className="stat-item magnetic hover-target">
                <Layers className="stat-icon" size={32} />
                <span className="stat-value">LLMs</span>
                <span className="stat-label">Specialty</span>
              </div>
              <div className="stat-item magnetic hover-target">
                <Code className="stat-icon" size={32} />
                <span className="stat-value">Backend</span>
                <span className="stat-label">Architecture</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
