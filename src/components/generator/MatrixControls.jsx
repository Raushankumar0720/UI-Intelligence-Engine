import React from 'react';
import { motion } from 'framer-motion';
import { Sliders, Sun, Move, Droplets, Maximize, X } from 'lucide-react';
import './MatrixControls.css';

export default function MatrixControls({ values, onChange, onClose }) {
  const controls = [
    { key: 'blur', label: 'Luminance (Blur)', icon: Droplets, min: 0, max: 80, unit: 'px' },
    { key: 'saturate', label: 'Energy (Saturate)', icon: Sun, min: 50, max: 400, unit: '%' },
    { key: 'padding', label: 'Gravity (Padding)', icon: Move, min: 0, max: 5, unit: 'rem' },
    { key: 'gap', label: 'Density (Gap)', icon: Maximize, min: 0, max: 4, unit: 'rem' },
  ];

  return (
    <motion.div 
      className="matrix-hud glass-card"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <div className="matrix-hud__header">
        <Sliders size={14} />
        <span>MATRIX CONTROL</span>
        {onClose && (
          <button className="matrix-hud__close" onClick={onClose} title="Close Matrix">
            <X size={14} />
          </button>
        )}
      </div>
      
      <div className="matrix-hud__list">
        {controls.map((ctrl) => (
          <div key={ctrl.key} className="matrix-hud__item">
            <div className="matrix-hud__label">
              <ctrl.icon size={12} />
              <span>{ctrl.label}</span>
              <span className="matrix-hud__value">{values[ctrl.key]}{ctrl.unit}</span>
            </div>
            <input 
              type="range"
              min={ctrl.min}
              max={ctrl.max}
              step={ctrl.key === 'padding' || ctrl.key === 'gap' ? 0.1 : 1}
              value={values[ctrl.key]}
              onChange={(e) => onChange(ctrl.key, e.target.value)}
              className="matrix-hud__slider"
            />
          </div>
        ))}
      </div>
      
      <div className="matrix-hud__footer">
        Real-time Token Overwrites Active
      </div>
    </motion.div>
  );
}
