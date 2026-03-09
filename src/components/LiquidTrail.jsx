import React, { useEffect, useRef } from 'react';
import './LiquidTrail.css';

const LiquidTrail = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const points = [];
    let mouse = { x: 0, y: 0 };
    let hue = 0;

    const maxPoints = 40; // Trail length

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      hue = (hue + 1.5) % 360; // Slower hue change for smooth liquid look

      points.push({ x: mouse.x, y: mouse.y, h: hue });
      if (points.length > maxPoints) {
        points.shift();
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      if (points.length > 2) {
        // Draw the continuous liquid trail
        ctx.beginPath();
        // Start from the oldest point
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; i++) {
          // Connect points smoothly with quadratic curves
          const xc = (points[i].x + points[i-1].x) / 2;
          const yc = (points[i].y + points[i-1].y) / 2;
          ctx.quadraticCurveTo(points[i-1].x, points[i-1].y, xc, yc);
        }

        // Connect to the latest point
        ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);

        // Styling the liquid stroke
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        
        // Gradient along the stroke based on the latest hue for a gooey glow
        const currentHue = points[points.length - 1].h;
        ctx.shadowBlur = 15;
        ctx.shadowColor = `hsl(${currentHue}, 100%, 50%)`;
        ctx.strokeStyle = `hsl(${currentHue}, 100%, 60%)`;
        ctx.lineWidth = 12; // Thick liquid base
        
        ctx.stroke();
      }

      // Constantly decay the trail length so it shrinks away smoothly when stopped
      if (points.length > 0) {
        points.shift();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="liquid-trail-canvas" />;
};

export default LiquidTrail;
