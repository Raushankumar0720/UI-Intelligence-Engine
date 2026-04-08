/**
 * DashboardPage — Overview page showing recent activity in a Bento Grid layout.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SeoHead from '../components/seo/SeoHead';
import {
  Wand2, History, GitCompareArrows, TrendingUp,
  Zap, Clock
} from 'lucide-react';
import Button from '../components/ui/Button';
import ScrollReveal from '../components/ui/ScrollReveal';
import useGeneratorStore from '../store/generatorStore';
import useAuthStore from '../store/authStore';
import './DashboardPage.css';

export default function DashboardPage() {
  const { history } = useGeneratorStore();
  const { user } = useAuthStore();
  
  const totalGenerations = history.length;
  const avgPerformance = totalGenerations > 0
    ? Math.round(history.reduce((sum, h) => sum + (h.metrics?.scores?.performance || 0), 0) / totalGenerations)
    : 0;

  return (
    <>
      <SeoHead 
        title="Dashboard" 
        description="Monitor your UI intelligence metrics and recent activity in the Design OS."
      />
      
      <div className="dashboard-page">
        <div className="bento-grid">
          {/* Tile 1: Welcome & Call to Action (Large) */}
          <ScrollReveal direction="up" className="bento-tile bento-tile--welcome glass-card">
            <div className="bento-tile__content">
              <h1 className="bento-tile__greeting">
                Building the Future{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
              </h1>
              <p className="bento-tile__subtitle">
                Your AI-Design Intelligence dashboard is ready.
              </p>
              <div className="bento-tile__actions">
                <Link to="/generate">
                  <Button variant="primary" icon={Wand2} size="lg">
                    Generate New UI
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Tile 2: Stats Summary (Compact Vertical) */}
          <ScrollReveal direction="up" delay={0.1} className="bento-tile bento-tile--stats-list">
            <div className="stats-mini-grid">
              <div className="stat-pill glass-card">
                <span className="stat-pill__label">Efficiency</span>
                <span className="stat-pill__value">{avgPerformance || '—'}%</span>
              </div>
              <div className="stat-pill glass-card">
                <span className="stat-pill__label">Total Gen</span>
                <span className="stat-pill__value">{totalGenerations}</span>
              </div>
              <div className="stat-pill glass-card">
                <span className="stat-pill__label">Variants</span>
                <span className="stat-pill__value">{new Set(history.map(h => h.componentType)).size || '—'}</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Tile 3: Recent Activity (Wide) */}
          <ScrollReveal direction="up" delay={0.2} className="bento-tile bento-tile--recent glass-card">
            <div className="bento-tile__header">
              <h3 className="bento-tile__title"><Clock size={16} /> Recent Activity</h3>
              <Link to="/history" className="bento-tile__link">View All</Link>
            </div>
            <div className="bento-tile__list">
              {history.slice(0, 3).map((item) => (
                <div key={item.id} className="bento-list-item">
                  <div className="bento-list-item__icon"><Zap size={14} /></div>
                  <div className="bento-list-item__info">
                    <span className="bento-list-item__name">{item.componentType}</span>
                    <span className="bento-list-item__meta">{new Date(item.timestamp).toLocaleDateString()}</span>
                  </div>
                  <div className="bento-list-item__score">{item.metrics?.scores?.performance || '—'}</div>
                </div>
              ))}
              {history.length === 0 && <p className="text-muted text-xs p-4">No recent activity</p>}
            </div>
          </ScrollReveal>

          {/* Tile 4: Metrics Visualization (Square) */}
          <ScrollReveal direction="right" delay={0.3} className="bento-tile bento-tile--metrics glass-card">
             <div className="bento-tile__header">
                <h3 className="bento-tile__title"><TrendingUp size={16} /> Insight</h3>
             </div>
             <div className="bento-tile__viz">
                <div className="viz-circle">
                   <span className="viz-circle__value">{avgPerformance || 0}</span>
                   <span className="viz-circle__label">Avg. Score</span>
                </div>
             </div>
          </ScrollReveal>

          {/* Tile 5: Quick Shortcuts (Small Icons) */}
          <ScrollReveal direction="up" delay={0.4} className="bento-tile bento-tile--shortcuts">
             <div className="shortcut-grid">
                <Link to="/generate" className="shortcut-btn glass-card" title="Generate">
                   <Wand2 size={20} />
                </Link>
                <Link to="/compare" className="shortcut-btn glass-card" title="Compare">
                   <GitCompareArrows size={20} />
                </Link>
                <Link to="/history" className="shortcut-btn glass-card" title="History">
                   <History size={20} />
                </Link>
             </div>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}
