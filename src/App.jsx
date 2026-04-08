/**
 * App.jsx — The main application entry point.
 * Defines all routes and high-level routing logic.
 * Task 2: Full User Flow & Interaction Loops.
 */
import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import useAuthStore from './store/authStore';
import useGeneratorStore from './store/generatorStore';
import DashboardLayout from './components/layout/DashboardLayout';
import PageTransition from './components/layout/PageTransition';
import CompareHub from './components/compare/CompareHub';
import './styles/global.css';

// Lazy load pages for performance (Task 9)
const LandingPage = lazy(() => import('./pages/LandingPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const GeneratePage = lazy(() => import('./pages/GeneratePage'));
const HistoryPage = lazy(() => import('./pages/HistoryPage'));
const ComparePage = lazy(() => import('./pages/ComparePage'));
const PublicPreviewPage = lazy(() => import('./pages/PublicPreviewPage'));

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/auth" replace />;
};

// Loading Screen
const PageLoader = () => (
  <div className="page-loader">
    <div className="page-loader__spinner" />
  </div>
);

export default function App() {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();
  const { fetchHistory, theme } = useGeneratorStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchHistory();
    }
  }, [isAuthenticated, fetchHistory]);

  // Elite: Global Mouse Tracking for Cursor Glow (Task: Feedback Soul)
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className={`app-root theme-${theme}`}>
      <motion.div 
        className="scroll-progress-bar" 
        style={{ scaleX }} 
      />
      
      <div className="mesh-background" />

      <Toaster position="top-right" toastOptions={{
        style: {
          background: 'var(--color-bg-secondary)',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-border-default)',
          backdropFilter: 'blur(10px)'
        }
      }} />

      <CompareHub />
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={
            <Suspense fallback={<PageLoader />}>
              <PageTransition>
                <LandingPage />
              </PageTransition>
            </Suspense>
          } />
          
          <Route path="/auth" element={
            <Suspense fallback={<PageLoader />}>
              <PageTransition>
                <AuthPage />
              </PageTransition>
            </Suspense>
          } />
          
          <Route path="/preview/:id" element={
            <Suspense fallback={<PageLoader />}>
              <PageTransition>
                <PublicPreviewPage />
              </PageTransition>
            </Suspense>
          } />
          
          {/* Protected Dashboard Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={
              <Suspense fallback={<PageLoader />}>
                <PageTransition>
                  <DashboardPage />
                </PageTransition>
              </Suspense>
            } />
            <Route path="generate" element={
              <Suspense fallback={<PageLoader />}>
                <PageTransition>
                  <GeneratePage />
                </PageTransition>
              </Suspense>
            } />
            <Route path="history" element={
              <Suspense fallback={<PageLoader />}>
                <PageTransition>
                  <HistoryPage />
                </PageTransition>
              </Suspense>
            } />
            <Route path="compare" element={
              <Suspense fallback={<PageLoader />}>
                <PageTransition>
                  <ComparePage />
                </PageTransition>
              </Suspense>
            } />
            
            {/* Catch-all for protected routes */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>

          {/* Root catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
