import React from 'react';
import './Experience.css';
import { Briefcase } from 'lucide-react';

const experienceData = [
  {
    role: "AI/ML Engineering Intern",
    company: "IBM",
    duration: "Sept 2025 - Nov 2025 (3 Months)",
    impact: "Engineered scalable model inference pipelines using Docker and reinforced internal MLOps workflows. Built AI-assisted tooling prototypes to accelerate validation cycles, drastically reducing manual iteration and empowering cross-functional teams with data-driven deployment strategies."
  }
];

const Experience = () => {
  return (
    <section className="experience-section" id="experience">
      <div className="container">
        <h2 className="section-title">
          <Briefcase className="section-icon" /> Experience
        </h2>
        
        <div className="timeline">
          {experienceData.map((item, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content glass-panel magnetic">
                <div className="timeline-header">
                  <h3 className="timeline-role">{item.role}</h3>
                  <span className="timeline-duration"><span className="gradient-text">{item.duration}</span></span>
                </div>
                <h4 className="timeline-company">{item.company}</h4>
                <p className="timeline-impact">{item.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
