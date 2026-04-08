/**
 * InsightsPanel — Performance scores, metrics, and UX suggestions.
 * Reads from the generated output's metrics data.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, Accessibility, Search, Shield, Clock, 
  Package, AlertTriangle, CheckCircle, Info, TrendingUp
} from 'lucide-react';
import ScoreGauge from '../ui/ScoreGauge';
import AuditReport from './AuditReport';
import useGeneratorStore from '../../store/generatorStore';
import './InsightsPanel.css';

const SEVERITY_CONFIG = {
  warning: { icon: AlertTriangle, color: 'var(--color-warning)', bg: 'var(--color-warning-bg)' },
  success: { icon: CheckCircle, color: 'var(--color-success)', bg: 'var(--color-success-bg)' },
  info: { icon: Info, color: 'var(--color-info)', bg: 'var(--color-info-bg)' },
};

const fadeInUp = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
};

export default function InsightsPanel() {
  const { currentOutput, currentAudit } = useGeneratorStore();
  const [activeTab, setActiveTab] = React.useState('perf'); // perf | health

  if (!currentOutput?.metrics) return null;
  const { metrics } = currentOutput;

  return (
    <motion.div
      className="insights-panel glass-card"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <h3 className="insights-panel__title">
        <TrendingUp size={18} /> Component Intelligence
      </h3>

      <div className="insights-panel__tabs">
        <button 
          className={`insights-panel__tab ${activeTab === 'perf' ? 'active' : ''}`}
          onClick={() => setActiveTab('perf')}
        >
          Performance
        </button>
        <button 
          className={`insights-panel__tab ${activeTab === 'health' ? 'active' : ''}`}
          onClick={() => setActiveTab('health')}
        >
          Health Audit
        </button>
      </div>

      {activeTab === 'perf' ? (
        <>
          {/* Score Gauges */}
      <div className="insights-panel__scores">
        <ScoreGauge score={metrics.scores.performance} label="Perf" size={72} />
        <ScoreGauge score={metrics.scores.accessibility} label="A11y" size={72} />
        <ScoreGauge score={metrics.scores.seo} label="SEO" size={72} />
        <ScoreGauge score={metrics.scores.bestPractices} label="BP" size={72} />
      </div>

      {/* Vital Metrics */}
      <div className="insights-panel__vitals">
        <motion.div className="insights-panel__vital" {...fadeInUp} transition={{ delay: 0.3 }}>
          <Clock size={14} />
          <div>
            <span className="insights-panel__vital-label">Load Time</span>
            <span className="insights-panel__vital-value">{metrics.loadTime}ms</span>
          </div>
        </motion.div>
        <motion.div className="insights-panel__vital" {...fadeInUp} transition={{ delay: 0.35 }}>
          <Package size={14} />
          <div>
            <span className="insights-panel__vital-label">Bundle Size</span>
            <span className="insights-panel__vital-value">{metrics.bundleSize}KB</span>
          </div>
        </motion.div>
        <motion.div className="insights-panel__vital" {...fadeInUp} transition={{ delay: 0.4 }}>
          <Zap size={14} />
          <div>
            <span className="insights-panel__vital-label">FCP</span>
            <span className="insights-panel__vital-value">{metrics.firstContentfulPaint}ms</span>
          </div>
        </motion.div>
        <motion.div className="insights-panel__vital" {...fadeInUp} transition={{ delay: 0.45 }}>
          <Zap size={14} />
          <div>
            <span className="insights-panel__vital-label">LCP</span>
            <span className="insights-panel__vital-value">{metrics.largestContentfulPaint}ms</span>
          </div>
        </motion.div>
      </div>

      {/* Suggestions */}
      {metrics.suggestions?.length > 0 && (
        <div className="insights-panel__suggestions">
          <h4 className="insights-panel__section-title">Recommendations</h4>
          {metrics.suggestions.map((sug, i) => {
            const config = SEVERITY_CONFIG[sug.severity] || SEVERITY_CONFIG.info;
            const SevIcon = config.icon;
            
            return (
              <motion.div
                key={i}
                className="insights-panel__suggestion"
                style={{ borderLeftColor: config.color }}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
              >
                <div className="insights-panel__suggestion-header">
                  <SevIcon size={14} style={{ color: config.color }} />
                  <span className="insights-panel__suggestion-title">{sug.title}</span>
                </div>
                <p className="insights-panel__suggestion-text">{sug.description}</p>
              </motion.div>
            );
          })}
        </div>
      )}
        </>
      ) : (
        <AuditReport audit={currentAudit} />
      )}
    </motion.div>
  );
}
