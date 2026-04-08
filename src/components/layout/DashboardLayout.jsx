/**
 * DashboardLayout — Main layout wrapper for authenticated pages.
 * Contains Sidebar + content area with dynamic margin.
 */
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import HistoryPanel from '../history/HistoryPanel';
import useGeneratorStore from '../../store/generatorStore';
import './DashboardLayout.css';

export default function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isHistoryOpen, setIsHistoryOpen } = useGeneratorStore();

  return (
    <div className={`dashboard-layout ${sidebarCollapsed ? 'dashboard-layout--collapsed' : ''}`}>
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <main className="dashboard-layout__main glass-overlay">
        <Outlet />
      </main>

      {/* Elite Contextual Drawer (2026 Linear Standard) */}
      <AnimatePresence>
        {isHistoryOpen && (
          <>
            {/* Backdrop for focus */}
            <motion.div 
              className="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHistoryOpen(false)}
            />
            <motion.div 
              className="drawer-panel glass-card"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="drawer-panel__content">
                <HistoryPanel />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <MobileNav />
    </div>
  );
}
