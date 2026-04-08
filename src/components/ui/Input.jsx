/**
 * Input — Reusable text input with validation states.
 */
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Check, Eye, EyeOff, Shield } from 'lucide-react';
import './Input.css';

const Input = React.forwardRef(({
  label,
  type = 'text',
  error,
  success,
  hint,
  icon: Icon,
  fullWidth = true,
  className = '',
  id,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  const strength = useMemo(() => {
    if (!isPassword || !props.value) return null;
    const val = String(props.value);
    let s = 0;
    if (val.length >= 8) s++;
    if (/[A-Z]/.test(val)) s++;
    if (/[0-9]/.test(val)) s++;
    if (/[^A-Za-z0-9]/.test(val)) s++;
    return s;
  }, [props.value, isPassword]);

  const isFilled = props.value && props.value.length > 0;

  return (
    <div className={`input-wrapper ${fullWidth ? 'input-wrapper--full' : ''} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      <div className={`input-container ${error ? 'input-container--error' : ''} ${success ? 'input-container--success' : ''} ${isFilled ? 'input-container--filled' : ''}`}>
        {Icon && <Icon size={16} className="input-icon" />}
        <input
          ref={ref}
          id={inputId}
          type={inputType}
          className="input-field"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />

        {/* Sexy Motion Border */}
        <AnimatePresence>
          {isFocused && (
            <motion.div 
              className="input-focus-border"
              initial={{ opacity: 0, inset: '0px' }}
              animate={{ opacity: 1, inset: '-2px' }}
              exit={{ opacity: 0, inset: '0px' }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
        {isPassword && (
          <button
            type="button"
            className="input-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
        {error && <AlertCircle size={16} className="input-status input-status--error" />}
        {success && !error && <Check size={16} className="input-status input-status--success" />}
      </div>

      {isPassword && strength !== null && (
        <div className="password-strength">
          <div className="password-strength__bars">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className={`password-strength__bar ${i <= strength ? 'active-' + strength : ''}`} 
              />
            ))}
          </div>
          <span className="password-strength__label">
            {strength <= 1 ? 'Weak' : strength === 2 ? 'Fair' : strength === 3 ? 'Good' : 'Secure'}
          </span>
        </div>
      )}
      {error && (
        <p id={`${inputId}-error`} className="input-message input-message--error" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${inputId}-hint`} className="input-message input-message--hint">
          {hint}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
