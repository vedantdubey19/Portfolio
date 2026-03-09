import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
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
      background: 'rgba(255, 0, 0, 1)' // accent-red
    },
    hover: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      background: 'rgba(255, 255, 255, 1)', // White background creates inversion with mix-blend-mode difference
      scale: 1.5
    }
  };

  const ringVariants = {
    default: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1,
      borderColor: 'rgba(255, 0, 0, 0.5)'
    },
    hover: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1.5,
      borderColor: 'rgba(139, 0, 0, 0.5)'
    }
  };

  return (
    <>
      <motion.div
        className="cursor-dot"
        variants={variants}
        animate={isHovering ? "hover" : "default"}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="cursor-ring"
        variants={ringVariants}
        animate={isHovering ? "hover" : "default"}
        transition={{ type: "spring", stiffness: 100, damping: 25, mass: 0.5 }}
      />
    </>
  );
};

export default CustomCursor;
