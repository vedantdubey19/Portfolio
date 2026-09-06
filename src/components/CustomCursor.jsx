import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

/**
 * Custom magnetic cursor.
 *
 * Pointer position is held in motion values rather than React state so that
 * moving the mouse (which fires at 60-120Hz) animates the DOM directly without
 * re-rendering this component or its children on every event.
 */
const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [ripples, setRipples] = useState([]);
  // Rendered only when a real pointer exists; a stylus/touch device gets nothing.
  const [enabled, setEnabled] = useState(false);

  // Raw pointer position, and the magnet-adjusted position for the core dot/ring.
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const magnetX = useMotionValue(-100);
  const magnetY = useMotionValue(-100);

  // Springs give the trailing-dot effect without any React state.
  const coreX = useSpring(magnetX, { stiffness: 1000, damping: 30, mass: 0.1 });
  const coreY = useSpring(magnetY, { stiffness: 1000, damping: 30, mass: 0.1 });
  const ringX = useSpring(magnetX, { stiffness: 350, damping: 20, mass: 0.2 });
  const ringY = useSpring(magnetY, { stiffness: 350, damping: 20, mass: 0.2 });
  const trail1X = useSpring(rawX, { stiffness: 300, damping: 25, mass: 0.4 });
  const trail1Y = useSpring(rawY, { stiffness: 300, damping: 25, mass: 0.4 });
  const trail2X = useSpring(rawX, { stiffness: 240, damping: 22, mass: 0.4 });
  const trail2Y = useSpring(rawY, { stiffness: 240, damping: 22, mass: 0.4 });
  const trail3X = useSpring(rawX, { stiffness: 180, damping: 19, mass: 0.4 });
  const trail3Y = useSpring(rawY, { stiffness: 180, damping: 19, mass: 0.4 });

  useEffect(() => {
    // Only take over the cursor for real pointers, and never for users who
    // asked for reduced motion — they keep the native cursor (see index.css).
    const hasPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!hasPointer || reduceMotion) return;

    setEnabled(true);
    document.documentElement.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      rawX.set(x);
      rawY.set(y);

      const target = e.target;
      const magnetic = target.closest?.('.magnetic');

      if (magnetic) {
        // Snap 35% of the way toward the centre of the magnetic element
        const rect = magnetic.getBoundingClientRect();
        const pull = 0.35;
        magnetX.set(x + (rect.left + rect.width / 2 - x) * pull);
        magnetY.set(y + (rect.top + rect.height / 2 - y) * pull);
        setIsHovering(true);
        return;
      }

      magnetX.set(x);
      magnetY.set(y);
      setIsHovering(
        Boolean(target.closest?.('a, button, [role="button"], .hover-target'))
      );
    };

    const handleClick = (e) => {
      const id = Date.now() + Math.random();
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [rawX, rawY, magnetX, magnetY]);

  if (!enabled) return null;

  const trails = [
    { x: trail1X, y: trail1Y, opacity: 0.3, scale: 0.8 },
    { x: trail2X, y: trail2Y, opacity: 0.2, scale: 0.6 },
    { x: trail3X, y: trail3Y, opacity: 0.1, scale: 0.4 },
  ];

  return (
    <div aria-hidden="true">
      {/* Click Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="cursor-ripple"
            style={{ top: ripple.y - 20, left: ripple.x - 20 }}
            initial={{ opacity: 1, scale: 0.1 }}
            animate={{ scale: 2.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>

      {/* Trailing particles */}
      {trails.map((trail, idx) => (
        <motion.div
          key={idx}
          className="cursor-dot"
          style={{
            x: trail.x,
            y: trail.y,
            translateX: -4,
            translateY: -4,
            background: 'var(--accent-red)',
            mixBlendMode: 'difference',
            zIndex: 9999 - idx - 1,
          }}
          animate={{
            scale: trail.scale,
            opacity: isHovering ? 0 : trail.opacity,
          }}
          transition={{ duration: 0.2 }}
        />
      ))}

      {/* Core cursor dot */}
      <motion.div
        className="cursor-dot"
        style={{ x: coreX, y: coreY, translateX: -4, translateY: -4, zIndex: 10000 }}
        animate={{
          background: isHovering ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 0, 0, 1)',
          scale: isHovering ? 1.4 : 1,
        }}
        transition={{ duration: 0.18 }}
      />

      {/* Outer ring */}
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY, translateX: -20, translateY: -20 }}
        animate={{
          scale: isHovering ? 1.6 : 1,
          borderColor: isHovering ? 'rgba(255, 42, 42, 0.8)' : 'rgba(255, 0, 0, 0.35)',
          background: isHovering ? 'rgba(255, 0, 0, 0.05)' : 'rgba(255, 0, 0, 0)',
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
};

export default CustomCursor;
