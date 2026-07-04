import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rawMouse, setRawMouse] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      setRawMouse({ x, y });

      // Magnetic hover calculations
      const hoveredElement = e.target.closest('.magnetic');
      if (hoveredElement) {
        const rect = hoveredElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const pull = 0.35; // 35% magnetic snap
        setMousePosition({
          x: x + (centerX - x) * pull,
          y: y + (centerY - y) * pull
        });
        setIsHovering(true);
      } else {
        setMousePosition({ x, y });
        
        // Standard interactive checks
        if (
          e.target.tagName?.toLowerCase() === 'a' || 
          e.target.tagName?.toLowerCase() === 'button' ||
          e.target.closest('a') ||
          e.target.closest('button') ||
          e.target.classList.contains('hover-target')
        ) {
          setIsHovering(true);
        } else {
          setIsHovering(false);
        }
      }
    };

    const handleClick = (e) => {
      const newRipple = {
        id: Math.random(),
        x: e.clientX,
        y: e.clientY
      };
      setRipples(prev => [...prev, newRipple]);
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 600);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  // Hide custom cursor on mobile touch screens
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Click Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ 
              position: 'fixed',
              top: ripple.y - 20,
              left: ripple.x - 20,
              width: 40,
              height: 40,
              border: '2px solid var(--accent-red)',
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 99999,
              opacity: 1,
              scale: 0.1
            }}
            animate={{ 
              scale: 2.2, 
              opacity: 0,
              borderColor: 'rgba(255, 42, 42, 0)'
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Trailing Particles (Snake trail) */}
      {[0.6, 0.4, 0.2].map((opacity, idx) => (
        <motion.div
          key={idx}
          className="cursor-dot"
          animate={{
            x: rawMouse.x - 4,
            y: rawMouse.y - 4,
            scale: 0.8 - idx * 0.2,
            opacity: isHovering ? 0 : opacity * 0.5
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300 - idx * 60, 
            damping: 25 - idx * 3, 
            mass: 0.4 
          }}
          style={{
            background: 'var(--accent-red)',
            mixBlendMode: 'difference',
            zIndex: 9999 - idx
          }}
        />
      ))}

      {/* Core Cursor Dot */}
      <motion.div
        className="cursor-dot"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          background: isHovering ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 0, 0, 1)',
          scale: isHovering ? 1.4 : 1
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 30, mass: 0.1 }}
      />

      {/* Outer Cursor Ring with Backdrop blur */}
      <motion.div
        className="cursor-ring"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.6 : 1,
          borderColor: isHovering ? 'rgba(255, 42, 42, 0.8)' : 'rgba(255, 0, 0, 0.35)',
          backdropFilter: isHovering ? 'blur(3px)' : 'blur(0px)',
          WebkitBackdropFilter: isHovering ? 'blur(3px)' : 'blur(0px)',
          background: isHovering ? 'rgba(255, 0, 0, 0.05)' : 'rgba(255, 0, 0, 0)'
        }}
        transition={{ type: "spring", stiffness: 350, damping: 20, mass: 0.2 }}
      />
    </>
  );
};

export default CustomCursor;
