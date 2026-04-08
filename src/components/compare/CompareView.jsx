/**
 * CompareView — Side-by-side comparison of two generated outputs.
 * Shows preview, scores, and differences.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { X, ArrowLeftRight, Shield } from 'lucide-react';
import ScoreGauge from '../ui/ScoreGauge';
import Button from '../ui/Button';
import TiltCard from '../ui/TiltCard';
import useGeneratorStore from '../../store/generatorStore';
import { sanitizeHTML } from '../../utils/security';
import './CompareView.css';

export default function CompareView() {
  const { compareItems, removeFromCompare, clearCompare } = useGeneratorStore();

  if (compareItems.length < 2) {
    return (
      <div className="compare-empty">
        <ArrowLeftRight size={32} className="compare-empty__icon" />
        <h3 className="compare-empty__title">Compare Mode</h3>
        <p className="compare-empty__text">
          Select two generated outputs from your history to compare them side by side.
          {compareItems.length === 1 && ' Select one more to begin comparison.'}
        </p>
        {compareItems.length === 1 && (
          <div className="compare-empty__selected">
            <span>Selected: {compareItems[0].componentType}</span>
            <button className="compare-empty__remove" onClick={() => removeFromCompare(compareItems[0].id)}>
              <X size={14} />
            </button>
          </div>
        )}
      </div>
    );
  }

  const [a, b] = compareItems;

  return (
    <motion.div
      className="compare-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="compare-view__header">
        <h3 className="compare-view__title">
          <ArrowLeftRight size={18} /> Comparing Outputs
        </h3>
        <Button variant="ghost" size="sm" onClick={clearCompare}>
          Clear
        </Button>
      </div>

      <div className="compare-view__grid">
        {[a, b].map((item, idx) => (
          <div key={item.id} className="compare-view__panel glass-card">
            <div className="compare-view__panel-header">
              <div className="compare-view__panel-badge" style={{ borderColor: idx === 0 ? 'var(--color-accent-400)' : '#6366f1' }}>
                {idx === 0 ? 'SOURCE A' : 'VARIANT B'}
              </div>
              <h4 className="compare-view__panel-type">{item.componentType}</h4>
              <button 
                className="compare-view__remove-btn"
                onClick={() => removeFromCompare(item.id)}
              >
                <X size={14} />
              </button>
            </div>

            {/* Preview Stage */}
            <div className="compare-view__preview-stage">
              <style>{item.css}</style>
              <div 
                className="preview-host"
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(item.html) }} 
              />
            </div>

            {/* Metric Row */}
            <div className="compare-view__metrics-row">
              <div className="mini-metric">
                <ScoreGauge score={item.metrics?.scores?.performance || 0} size={48} />
                <span>Perf</span>
              </div>
              <div className="mini-metric">
                <ScoreGauge score={item.metrics?.scores?.accessibility || 0} size={48} />
                <span>A11y</span>
              </div>
              <div className="mini-metric">
                <ScoreGauge score={item.metrics?.scores?.seo || 0} size={48} />
                <span>SEO</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delta Diagnostic HUD */}
      <motion.div 
        className="compare-view__delta glass-card"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="delta-header">
          <Shield size={16} />
          <h4>Diagnostic Delta Report</h4>
        </div>

        <div className="delta-grid">
          {['performance', 'accessibility', 'seo', 'bestPractices'].map((key) => {
            const valA = a.metrics?.scores?.[key] || 0;
            const valB = b.metrics?.scores?.[key] || 0;
            const diff = valB - valA;

            return (
              <div key={key} className="delta-row">
                <div className="delta-row__label">{key.replace(/([A-Z])/g, ' $1')}</div>
                <div className="delta-row__values">
                  <span className="val-a">{valA}</span>
                  <div className={`val-diff ${diff > 0 ? 'positive' : diff < 0 ? 'negative' : ''}`}>
                    {diff > 0 ? `+${diff}` : diff}
                  </div>
                  <span className="val-b">{valB}</span>
                </div>
                <div className="delta-row__progress">
                  <div className="progress-bg">
                    <motion.div 
                      className={`progress-fill ${diff > 0 ? 'positive' : 'negative'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(Math.abs(diff) * 2, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
