import React, { useEffect, useRef } from 'react';
import './Background.css';

const Background = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Respect users who ask for reduced motion: paint one static frame, never animate.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // 1. Twinkling Stars class
    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.2 + 0.4;
        this.twinkleSpeed = Math.random() * 0.015 + 0.005;
        this.alpha = Math.random();
        this.color = Math.random() > 0.8 
          ? '180, 200, 255' // Soft blue tint
          : (Math.random() > 0.8 ? '220, 230, 255' : '255, 255, 255');
      }

      update() {
        this.alpha += this.twinkleSpeed;
        if (this.alpha > 0.95 || this.alpha < 0.15) {
          this.twinkleSpeed = -this.twinkleSpeed;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${Math.max(0.1, this.alpha * 0.6)})`;
        ctx.fill();
      }
    }

    // 2. Shooting Star / Meteor class
    class ShootingStar {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width * 0.7;
        this.y = Math.random() * canvas.height * 0.3;
        this.length = Math.random() * 60 + 30;
        this.speed = Math.random() * 5 + 3;
        this.vx = this.speed;
        this.vy = this.speed * 0.45; // Diagonal movement
        this.active = false;
        this.timer = Math.random() * 500 + 150; // Delay before streak
      }

      update() {
        if (!this.active) {
          this.timer--;
          if (this.timer <= 0) {
            this.active = true;
          }
        } else {
          this.x += this.vx;
          this.y += this.vy;
          if (this.x > canvas.width || this.y > canvas.height) {
            this.reset();
          }
        }
      }

      draw() {
        if (!this.active) return;
        ctx.beginPath();
        const grad = ctx.createLinearGradient(this.x, this.y, this.x - this.length, this.y - this.length * 0.45);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
        grad.addColorStop(1, 'rgba(180, 200, 255, 0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.25;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.length, this.y - this.length * 0.45);
        ctx.stroke();
      }
    }

    // 3. Planet/Celestial body class
    class Planet {
      constructor(xRatio, yRatio, radius, colorStart, colorEnd, hasRing = false) {
        this.xRatio = xRatio;
        this.yRatio = yRatio;
        this.radius = radius;
        this.colorStart = colorStart;
        this.colorEnd = colorEnd;
        this.hasRing = hasRing;
        this.angle = Math.random() * Math.PI * 2;
      }

      update() {
        this.angle += 0.00015; // Slow orbital drift
      }

      draw() {
        const x = canvas.width * this.xRatio + Math.cos(this.angle) * 12;
        const y = canvas.height * this.yRatio + Math.sin(this.angle) * 12;

        ctx.save();

        // 3D Spherical Radial Gradient
        const grad = ctx.createRadialGradient(
          x - this.radius * 0.35,
          y - this.radius * 0.35,
          this.radius * 0.05,
          x,
          y,
          this.radius
        );
        grad.addColorStop(0, this.colorStart);
        grad.addColorStop(0.7, this.colorEnd);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0.95)');

        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Draw delicate ring system
        if (this.hasRing) {
          ctx.beginPath();
          ctx.ellipse(x, y, this.radius * 1.7, this.radius * 0.3, -Math.PI / 8, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
          ctx.lineWidth = 4;
          ctx.stroke();

          ctx.beginPath();
          ctx.ellipse(x, y, this.radius * 1.65, this.radius * 0.28, -Math.PI / 8, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(180, 200, 255, 0.03)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.restore();
      }
    }

    // 4. Constellation Nodes (Existing Neural Connection Net)
    class ConstellationNode {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.5 + 0.75;
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
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fill();
      }
    }

    // Initialize elements
    const LINK_DIST = 140;
    const LINK_DIST_SQ = LINK_DIST * LINK_DIST;
    const stars = Array.from({ length: 110 }, () => new Star());
    const shootingStars = Array.from({ length: 2 }, () => new ShootingStar());
    const constellationNodes = Array.from(
      { length: window.innerWidth > 768 ? 32 : 16 },
      () => new ConstellationNode()
    );

    const planets = [
      new Planet(
        0.82, 0.25, 65, 
        'rgba(20, 25, 40, 0.22)', // Deep space blue/gray
        'rgba(5, 5, 10, 0.85)', 
        true // Has Rings
      ),
      new Planet(
        0.15, 0.78, 45, 
        'rgba(40, 45, 60, 0.18)', // Dim blue-gray ice giant
        'rgba(5, 5, 8, 0.85)', 
        false
      )
    ];

    const animate = () => {
      drawFrame();

      frameId = requestAnimationFrame(animate);
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw static/twinkling stars
      stars.forEach(star => {
        star.update();
        star.draw();
      });

      // Draw drifting planets
      planets.forEach(planet => {
        planet.update();
        planet.draw();
      });

      // Draw shooting star streaks
      shootingStars.forEach(sStar => {
        sStar.update();
        sStar.draw();
      });

      // Draw moving constellation nodes
      constellationNodes.forEach((node, idx) => {
        node.update();
        node.draw();

        // Trace connections (constellations)
        for (let j = idx + 1; j < constellationNodes.length; j++) {
          const dx = constellationNodes[j].x - node.x;
          const dy = constellationNodes[j].y - node.y;
          const distSq = dx * dx + dy * dy;

          // Compare squared distances so we only pay for sqrt on actual neighbours
          if (distSq < LINK_DIST_SQ) {
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(constellationNodes[j].x, constellationNodes[j].y);
            const opacity = (1 - (dist / LINK_DIST)) * 0.055; // Subtle constellation lines
            ctx.strokeStyle = `rgba(180, 200, 255, ${opacity})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      });
    };

    if (reduceMotion) {
      // Static starfield: paint one frame and repaint on resize instead of looping.
      drawFrame();
      window.addEventListener('resize', drawFrame);
    } else {
      animate();
    }

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('resize', drawFrame);
    };
  }, []);

  return (
    <div className="bg-container">
      <div className="bg-grid"></div>
      <div className="bg-gradient-overlay"></div>
      <div className="bg-noise"></div>
      <canvas ref={canvasRef} className="neural-bg" />
    </div>
  );
};

export default Background;
