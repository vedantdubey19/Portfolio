import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Cursor.css';

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleMouseOver = (e) => {
      // Check if hovering over clickable elements
      if (
        e.target.tagName.toLowerCase() === 'a' || 
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.classList.contains('hover-target') ||
        e.target.classList.contains('magnetic') ||
        ['INPUT', 'TEXTAREA'].includes(e.target.tagName)
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      background: 'rgba(0, 240, 255, 1)' // accent-teal
    },
    hover: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      background: 'rgba(112, 0, 255, 1)' // accent-violet
    }
  };

  const ringVariants = {
    default: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1,
      borderColor: 'rgba(0, 240, 255, 0.5)'
    },
    hover: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1.5,
      borderColor: 'rgba(112, 0, 255, 0.5)'
    }
  };

  // Handle touch devices - hide custom cursor
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      <motion.div
        className="cursor-dot"
        variants={variants}
        animate={isHovering ? "hover" : "default"}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
      <motion.div
        className="cursor-ring"
        variants={ringVariants}
        animate={isHovering ? "hover" : "default"}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
      />
    </>
  );
};

export default Cursor;
