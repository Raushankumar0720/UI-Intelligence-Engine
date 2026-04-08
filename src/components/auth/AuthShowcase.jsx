import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Activity, ShieldCheck, Box, Network } from 'lucide-react';
import './AuthShowcase.css';

export default function AuthShowcase() {
  const features = [
    { 
      id: 'dna', 
      title: 'Design DNA', 
      desc: 'Token-based brand persistence.', 
      icon: Box, 
      color: 'var(--color-accent-500)' 
    },
    { 
      id: 'flow', 
      title: 'Architectural Flows', 
      desc: 'Multi-screen sequencing engine.', 
      icon: Network, 
      color: '#6366f1' 
    },
    { 
      id: 'audit', 
      title: 'AI Design Auditor', 
      desc: 'Automated WCAG & UX compliance.', 
      icon: ShieldCheck, 
      color: '#10b981' 
    },
    { 
      id: 'logic', 
      title: 'Functional Logic', 
      desc: 'State-aware React generations.', 
      icon: Activity, 
      color: '#f59e0b' 
    },
  ];

  return (
    <div className="auth-showcase">
      {/* Dynamic Animated Background */}
      <div className="auth-showcase__bg">
        <div className="showcase-cloud c1" />
        <div className="showcase-cloud c2" />
        <svg className="showcase-grid" width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="auth-showcase__content">
        <motion.div 
          className="auth-showcase__header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="auth-showcase__tag">
            <Sparkles size={12} />
            <span>GEN IV INTELLIGENCE</span>
          </div>
          <h1 className="auth-showcase__title">
            The OS for <br /> 
            <span className="accent-text">Intelligent UI.</span>
          </h1>
          <p className="auth-showcase__subtitle">
            Move beyond static templates. Build production-grade, state-aware, and accessible architectural flows in seconds.
          </p>
        </motion.div>

        <div className="auth-showcase__features">
          {features.map((f, i) => (
            <motion.div 
              key={f.id}
              className="showcase-card glass-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
              whileHover={{ y: -5, borderColor: f.color }}
            >
              <div className="showcase-card__icon" style={{ backgroundColor: `${f.color}20`, color: f.color }}>
                <f.icon size={18} />
              </div>
              <div className="showcase-card__body">
                <h3 className="showcase-card__title">{f.title}</h3>
                <p className="showcase-card__desc">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="auth-showcase__visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          {/* Mock visual of the engine pulse */}
          <div className="engine-core">
            <div className="core-ring r1" />
            <div className="core-ring r2" />
            <div className="core-ring r3" />
            <div className="core-pulse" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
