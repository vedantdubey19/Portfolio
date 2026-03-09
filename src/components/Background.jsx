import React, { useEffect, useRef } from 'react';
import './Background.css';

const Background = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1.5; /* Faster drift for more animation */
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = Math.random() * 2 + 0.5;
        this.baseColor = Math.random() > 0.5 ? '255, 0, 0' : '139, 0, 0'; /* Bright Red and Dark Red */
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.baseColor}, 0.8)`;
        ctx.fill();
        
        // Add subtle glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgba(${this.baseColor}, 1)`;
      }
    }

    const particles = [];
    const numParticles = window.innerWidth > 768 ? 120 : 60; // Slightly more particles
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        ctx.shadowBlur = 0; // Reset shadow for lines
        
        // Draw connections
        for (let j = index + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const opacity = 1 - (dist / 150);
            ctx.strokeStyle = `rgba(255, 42, 42, ${opacity * 0.4})`; /* Red lines */
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="bg-container">
      <div className="bg-gradient-overlay"></div>
      <canvas ref={canvasRef} className="neural-bg" />
    </div>
  );
};

export default Background;
