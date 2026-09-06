import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Sparkles, Terminal } from 'lucide-react';
import './Preloader.css';

const icons = [Code, Sparkles, Terminal];

const Preloader = ({ onComplete }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Reduced-motion users skip the intro entirely; everyone else gets a short
    // one they can dismiss early by clicking or pressing a key.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const delay = reduceMotion ? 0 : 1800;

    const finish = () => {
      if (onComplete) onComplete();
    };

    const timer = setTimeout(finish, delay);
    window.addEventListener('keydown', finish);

    return () => {
      document.body.style.overflow = 'auto';
      clearTimeout(timer);
      window.removeEventListener('keydown', finish);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
      }}
      className="prince-preloader-backdrop"
      onClick={() => onComplete && onComplete()}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      {/* Soft Ambient Blur Glows */}
      <div className="prince-ambient-blur top-blur"></div>
      <div className="prince-ambient-blur bottom-blur"></div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="prince-preloader-card"
      >
        {/* Top 3 Round Icon Badges */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } }
          }}
          className="prince-icon-row"
        >
          {icons.map((IconComp, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, scale: 0.3, rotate: -140, y: 60 },
                visible: { opacity: 1, scale: 1, rotate: 0, y: 0 }
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.1 }}
              className="prince-icon-badge"
            >
              <IconComp size={20} color="white" />
            </motion.div>
          ))}
        </motion.div>

        {/* Text Sequence */}
        <div className="prince-text-wrapper">
          <div className="prince-welcome-row">
            <motion.span
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="prince-text-large"
            >
              Welcome
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.40, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="prince-text-large"
            >
              to my
            </motion.span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="prince-text-headline"
          >
            Portfolio Website
          </motion.h1>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.80, duration: 0.45 }}
          className="prince-subtext"
        >
          Creating Web & AI Systems That Feel Alive.
        </motion.p>

        {/* Typewriter Domain Pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95, duration: 0.35 }}
          className="prince-domain-pill"
        >
          <motion.span
            initial={{ width: "0ch" }}
            animate={{ width: "21ch" }}
            transition={{ delay: 1.05, duration: 0.6, ease: "easeInOut" }}
            className="prince-typewriter-text"
          >
            vedantdubey.portfolio
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="prince-cursor"
          >
            |
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Preloader;





