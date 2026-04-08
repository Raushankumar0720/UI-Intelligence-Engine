import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Zap, Search, Target, Layout } from 'lucide-react';
import './AuditReport.css';

export default function AuditReport({ audit }) {
  if (!audit) return null;

  const categories = [
    { key: 'accessibility', label: 'A11y', icon: Search, color: '#f59e0b' },
    { key: 'performance', label: 'Perf', icon: Zap, color: '#10b981' },
    { key: 'usability', label: 'UX', icon: Layout, color: '#6366f1' },
  ];

  return (
    <div className="audit-report">
      <div className="audit-report__header">
        <div className="audit-report__score-ring">
          <svg viewBox="0 0 36 36" className="circular-chart">
            <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <motion.path
              className="circle"
              strokeDasharray={`${audit.score}, 100`}
              initial={{ strokeDasharray: "0, 100" }}
              animate={{ strokeDasharray: `${audit.score}, 100` }}
              transition={{ duration: 1, ease: "easeOut" }}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" className="percentage">{Math.round(audit.score)}</text>
          </svg>
        </div>
        <div className="audit-report__status">
          <h3 className="audit-report__title">Health Score</h3>
          <p className="audit-report__meta">Audited on {new Date(audit.timestamp).toLocaleTimeString()}</p>
          <div className={`audit-report__badge ${audit.score > 90 ? 'pass' : 'warn'}`}>
            {audit.score > 90 ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
            {audit.score > 90 ? 'Compliant' : 'Issues Found'}
          </div>
        </div>
      </div>

      <div className="audit-report__categories">
        {categories.map((cat) => (
          <div key={cat.key} className="audit-report__cat">
            <div className="cat-icon" style={{ color: cat.color }}>
              <cat.icon size={16} />
            </div>
            <span className="cat-label">{cat.label}</span>
            <span className="cat-val">{Math.round(audit.categories[cat.key])}%</span>
          </div>
        ))}
      </div>

      <div className="audit-report__findings">
        <h4 className="findings-title">Findings ({audit.findings.length})</h4>
        <div className="findings-list">
          {audit.findings.map((f, i) => (
            <motion.div 
              key={i} 
              className={`finding-item severity-${f.severity}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="finding-type">
                <span>{f.rule}</span>
                <span className="finding-code">{f.code}</span>
              </div>
              <p className="finding-msg">{f.message}</p>
            </motion.div>
          ))}
          {audit.findings.length === 0 && (
            <div className="findings-empty">
              <ShieldCheck size={32} />
              <p>No critical violations detected.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
