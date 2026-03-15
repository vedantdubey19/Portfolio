import React from 'react';
import './CollegePics.css';
import { Camera } from 'lucide-react';
import collegePhoto from '../assets/college-photo.jpg';

const CollegePics = () => {
  return (
    <section className="college-pics-section" id="college-pics">
      <div className="container">
        <h2 className="section-title">
          <Camera className="section-icon" /> College Memories
        </h2>
        
        <div className="college-gallery fade-in">
          {/* Main Photo Card */}
          <div className="gallery-card main-photo glass-panel magnetic">
            <div className="photo-wrapper">
              <img 
                src={collegePhoto} 
                alt="College memory" 
                className="college-img"
              />
              <div className="photo-overlay">
                <p className="photo-caption">Computer Lab Sessions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollegePics;
