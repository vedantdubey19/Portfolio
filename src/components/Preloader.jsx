import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const steps = [
    "Initializing AI Portfolio...",
    "Loading Projects...",
    "Loading Experience...",
    "Loading Models...",
    "Welcome Vedant Dubey"
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < steps.length - 1) {
      const interval = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 350); // Sequential steps
      return () => clearTimeout(interval);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 600); // Wait on welcome step
      return () => clearTimeout(timer);
    }
  }, [currentStep, onComplete, steps.length]);

  return (
    <AnimatePresence>
      <motion.div
        className="preloader-container"
        initial={{ y: 0 }}
        exit={{ y: "-100vh", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }, opacity: 0 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '4rem',
          boxSizing: 'border-box',
          backgroundColor: '#000000',
          fontFamily: 'var(--font-sans)'
        }}
      >
        <div style={{ maxWidth: '600px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {steps.slice(0, currentStep + 1).map((step, idx) => {
            const isLast = idx === currentStep;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  fontSize: idx === steps.length - 1 ? '1.5rem' : '1.05rem',
                  fontWeight: idx === steps.length - 1 ? '700' : '400',
                  color: idx === steps.length - 1 ? 'var(--text-primary)' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontFamily: 'var(--font-sans)',
                  lineHeight: '1.4'
                }}
              >
                <span style={{ color: idx === steps.length - 1 ? 'var(--accent-red)' : 'rgba(255,255,255,0.2)', marginRight: '0.5rem' }}>
                  {idx === steps.length - 1 ? '❯' : '$'}
                </span>
                {step}
                {isLast && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, ease: "steps(2)" }}
                    style={{
                      display: 'inline-block',
                      width: '8px',
                      height: idx === steps.length - 1 ? '1.5rem' : '1.05rem',
                      background: idx === steps.length - 1 ? 'var(--accent-red)' : 'var(--text-secondary)',
                      marginLeft: '4px'
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;
