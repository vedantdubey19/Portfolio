import React, { useEffect, useRef } from 'react';
import TagCloud from 'TagCloud';
import './Skills.css';
import { Cpu, CheckCircle } from 'lucide-react';

const Skills = () => {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = '.tagcloud';
    const rawTexts = [
      'MongoDB', 'Express', 'React', 'NodeJS', 
      'Python', 'Java', 'DSA', 'TensorFlow', 'PyTorch', 
      'Docker', 'Git', 'AWS', 'GCP', 
      'FastAPI', 'TypeScript', 'SQL'
    ];

    const iconMap = {
      'MongoDB': 'devicon-mongodb-plain colored',
      'Express': 'devicon-express-original colored',
      'React': 'devicon-react-original colored',
      'NodeJS': 'devicon-nodejs-plain colored',
      'Python': 'devicon-python-plain colored',
      'Java': 'devicon-java-plain colored',
      'DSA': 'devicon-leetcode-plain colored', 
      'TensorFlow': 'devicon-tensorflow-original colored',
      'PyTorch': 'devicon-pytorch-original colored',
      'Docker': 'devicon-docker-plain colored',
      'Git': 'devicon-git-plain colored',
      'AWS': 'devicon-amazonwebservices-plain-wordmark colored',
      'GCP': 'devicon-googlecloud-plain colored',
      'FastAPI': 'devicon-fastapi-plain colored',
      'TypeScript': 'devicon-typescript-plain colored',
      'SQL': 'devicon-sqldeveloper-plain colored'
    };

    // Format texts to include HTML icons
    const texts = rawTexts.map(text => {
      if (iconMap[text]) {
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

    // Prevent re-rendering multiple globes
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    TagCloud(container, texts, options);
    
    // Add red theme hover effects
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

  return (
    <section className="skills-section" id="skills">
      <div className="container">
        <h2 className="section-title">
          <Cpu className="section-icon" /> Technical Arsenal
        </h2>
        
        <div className="skills-container glass-panel">
          <div className="skills-text">
            <h3 className="skills-subtitle gradient-text">MERN, AI/ML & Dev Tools</h3>
            <p className="skills-description">
              My core expertise bridges the gap between scalable full-stack development and robust artificial intelligence. 
              I design systems that leverage the MERN stack for robust web architecture, while powering them with cutting-edge ML and AI models.
            </p>
            <ul className="skills-highlights">
              <li><CheckCircle size={20} className="highlight-icon" /> <strong>Core Concepts:</strong> Data Structures & Algorithms (DSA) in Java</li>
              <li><CheckCircle size={20} className="highlight-icon" /> <strong>Full Stack:</strong> MongoDB, Express, React, Node (MERN)</li>
              <li><CheckCircle size={20} className="highlight-icon" /> <strong>Machine Learning:</strong> PyTorch, TensorFlow, Scikit-learn</li>
              <li><CheckCircle size={20} className="highlight-icon" /> <strong>Generative AI:</strong> LangChain, OpenAI APIs, NLP Pipelines</li>
              <li><CheckCircle size={20} className="highlight-icon" /> <strong>DevOps/Tools:</strong> Docker, Git, AWS, GCP, FastAPI</li>
            </ul>
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
