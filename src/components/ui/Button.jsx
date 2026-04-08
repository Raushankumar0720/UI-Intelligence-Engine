/**
 * Button — Universal button component with variants.
 * Handles loading states, disabled states, and icon support.
 */
import React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import './Button.css';

const Button = React.forwardRef(({
  children,
  variant = 'primary', // primary | secondary | ghost | danger | outline
  size = 'md', // sm | md | lg
  isLoading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  type = 'button',
  onClick,
  className = '',
  ...props
}, ref) => {
  const isDisabled = disabled || isLoading;
  
  // Elite: Magnetic Effect Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    if (isDisabled) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Magnetic pull (max 15% distance)
    x.set((clientX - centerX) * 0.15);
    y.set((clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      className={`btn btn--${variant} btn--${size} ${fullWidth ? 'btn--full' : ''} ${className}`}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
      }}
      whileHover={!isDisabled ? { 
        scale: 1.05,
        boxShadow: '0 12px 24px -10px rgba(0, 0, 0, 0.4), 0 0 20px rgba(139, 92, 246, 0.3)'
      } : undefined}
      whileTap={!isDisabled ? { scale: 0.95 } : undefined}
      transition={{ 
        type: 'spring', 
        stiffness: 400, 
        damping: 15,
        mass: 1
      }}
      {...props}
    >
      {/* Premium Shimmer Overlay */}
      {!isDisabled && <motion.div 
        className="btn__shimmer"
        initial={{ x: '-150%', skewX: -20 }}
        whileHover={{ x: '150%' }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />}

      {isLoading && <Loader2 className="btn__spinner" size={16} />}
      {!isLoading && Icon && iconPosition === 'left' && <Icon size={16} className="btn__icon" />}
      {children && <span className="btn__label">{children}</span>}
      {!isLoading && Icon && iconPosition === 'right' && <Icon size={16} className="btn__icon" />}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
