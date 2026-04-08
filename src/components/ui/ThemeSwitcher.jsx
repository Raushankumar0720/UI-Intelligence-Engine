import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Zap, Check } from 'lucide-react';
import useGeneratorStore from '../../store/generatorStore';
import './ThemeSwitcher.css';

const themes = [
  { id: 'obsidian', icon: Moon, label: 'Obsidian', color: '#8b5cf6' },
  { id: 'light', icon: Sun, label: 'Paper', color: '#4f46e5' },
  { id: 'cyber', icon: Zap, label: 'Cyber HC', color: '#00ff00' },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useGeneratorStore();
  const [isOpen, setIsOpen] = React.useState(false);

  const currentTheme = themes.find(t => t.id === theme) || themes[0];

  return (
    <div className="theme-switcher">
      <motion.button
        className="theme-switcher__toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <currentTheme.icon size={18} style={{ color: currentTheme.color }} />
        <span className="theme-switcher__label">{currentTheme.label}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              className="theme-switcher__backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              className="theme-switcher__menu glass-card"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
            >
              <div className="theme-switcher__header">Design Personality</div>
              <div className="theme-switcher__options">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    className={`theme-switcher__option ${theme === t.id ? 'active' : ''}`}
                    onClick={() => {
                      setTheme(t.id);
                      setIsOpen(false);
                    }}
                  >
                    <div className="option-icon" style={{ backgroundColor: `${t.color}20`, color: t.color }}>
                      <t.icon size={16} />
                    </div>
                    <span className="option-label">{t.label}</span>
                    {theme === t.id && <Check size={14} className="option-check" />}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
