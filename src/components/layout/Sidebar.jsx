/**
 * Sidebar — Main navigation sidebar for the dashboard.
 * Collapsible, with active state highlighting.
 */
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Wand2, History, GitCompareArrows, Settings, LogOut, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import useGeneratorStore from '../../store/generatorStore';
import ThemeSwitcher from '../ui/ThemeSwitcher';
import './Sidebar.css';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, type: 'link' },
  { path: '/generate', label: 'Generate', icon: Wand2, type: 'link' },
  { path: 'history', label: 'History', icon: History, type: 'drawer' },
  { path: '/compare', label: 'Compare', icon: GitCompareArrows, type: 'link' },
];

export default function Sidebar({ collapsed, onToggle }) {
  const { user, logout } = useAuthStore();
  const { setIsHistoryOpen } = useGeneratorStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
      <div className="sidebar__header">
        <div className="sidebar__brand">
          <div className="sidebar__logo">
            <Sparkles size={20} />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                className="sidebar__title"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
              >
                UI Engine
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <button
          className="sidebar__toggle"
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="sidebar__nav">
        {navItems.map((item) => {
          if (item.type === 'drawer') {
            return (
              <button
                key={item.label}
                className="sidebar__link"
                onClick={() => setIsHistoryOpen(true)}
                title={collapsed ? item.label : undefined}
              >
                <item.icon size={20} className="sidebar__link-icon" />
                {!collapsed && (
                  <motion.span
                    className="sidebar__link-label"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </button>
            );
          }
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
              }
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={20} className="sidebar__link-icon" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    className="sidebar__link-label"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar__footer">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
          }
          title={collapsed ? 'Settings' : undefined}
        >
          <Settings size={20} className="sidebar__link-icon" />
          {!collapsed && <span className="sidebar__link-label">Settings</span>}
        </NavLink>

        <button
          className="sidebar__link sidebar__link--logout"
          onClick={handleLogout}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut size={20} className="sidebar__link-icon" />
          {!collapsed && <span className="sidebar__link-label">Logout</span>}
        </button>

        {!collapsed && (
          <div className="sidebar__theme-area" style={{ padding: 'var(--space-2) 0' }}>
            <ThemeSwitcher />
          </div>
        )}

        {!collapsed && user && (
          <div className="sidebar__user">
            <div className="sidebar__avatar">
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="sidebar__user-info">
              <span className="sidebar__user-name">{user.name}</span>
              <span className="sidebar__user-email">{user.email}</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
