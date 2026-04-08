import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wand2, History, GitCompareArrows, LayoutDashboard } from 'lucide-react';
import './MobileNav.css';

export default function MobileNav() {
  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Home' },
    { to: '/generate', icon: Wand2, label: 'Generate' },
    { to: '/compare', icon: GitCompareArrows, label: 'Compare' },
    { to: '/history', icon: History, label: 'History' },
  ];

  return (
    <motion.nav 
      className="mobile-nav"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      <div className="mobile-nav__container">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => 
              `mobile-nav__link ${isActive ? 'mobile-nav__link--active' : ''}`
            }
          >
            <item.icon size={20} />
            <span className="mobile-nav__label">{item.label}</span>
            <div className="mobile-nav__indicator" />
          </NavLink>
        ))}
      </div>
    </motion.nav>
  );
}
