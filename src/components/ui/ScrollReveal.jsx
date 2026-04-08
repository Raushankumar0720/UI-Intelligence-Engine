import React from 'react';
import { motion } from 'framer-motion';

const directionVariants = {
  up: { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 } },
  down: { initial: { opacity: 0, y: -40 }, animate: { opacity: 1, y: 0 } },
  left: { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 } },
  scale: { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 } },
  fade: { initial: { opacity: 0 }, animate: { opacity: 1 } },
};

/**
 * ScrollReveal — A wrapper component that animates children when they enter the viewport.
 * Effectively creates a "lazy reveal" effect throughout the page.
 */
export default function ScrollReveal({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.6,
  className = '',
  once = false,
  threshold = 0.1
}) {
  const variant = directionVariants[direction] || directionVariants.up;

  return (
    <motion.div
      className={className}
      initial={variant.initial}
      whileInView={variant.animate}
      viewport={{ once, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98] // Premium ease-out
      }}
    >
      {children}
    </motion.div>
  );
}
