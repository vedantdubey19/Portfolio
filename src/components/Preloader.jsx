import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const words = ["Hello", "Bonjour", "नमस्ते"];

  useEffect(() => {
    // Wait for the entrance animation (approx 1s) and let it stay for a moment 
    // before triggering the complete state to slide the whole screen away.
    const timer = setTimeout(() => {
      onComplete();
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="preloader-container"
        initial={{ y: 0 }}
        exit={{ y: "-100vh", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }, opacity: 0 }}
      >
        <div className="preloader-text-wrapper">
          {words.map((word, index) => (
            <div key={index} className="word-container">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.33, 1, 0.68, 1], 
                  delay: index * 0.15 
                }}
                className="preloader-word gradient-text"
              >
                {word}
                {index !== words.length - 1 && <span className="word-separator">•</span>}
              </motion.span>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;
