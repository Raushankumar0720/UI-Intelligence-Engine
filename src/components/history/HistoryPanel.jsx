/**
 * HistoryPanel — Displays generation history with search and management.
 */
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History, Search, Trash2, ExternalLink, GitCompareArrows,
  Clock, Wand2, AlertCircle, RefreshCw
} from 'lucide-react';
import Button from '../ui/Button';
import useGeneratorStore from '../../store/generatorStore';
import './HistoryPanel.css';

export default function HistoryPanel() {
  const history = useGeneratorStore(s => s.history);
  const selectFromHistory = useGeneratorStore(s => s.selectFromHistory);
  const deleteFromHistory = useGeneratorStore(s => s.deleteFromHistory);
  const clearHistory = useGeneratorStore(s => s.clearHistory);
  const addToCompare = useGeneratorStore(s => s.addToCompare);
  const compareMode = useGeneratorStore(s => s.compareMode);
  const toggleCompareMode = useGeneratorStore(s => s.toggleCompareMode);
  const setRefineMode = useGeneratorStore(s => s.setRefineMode);
  
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // all | components | pages
  const [confirmClear, setConfirmClear] = useState(false);

  const filtered = useMemo(() => {
    let list = history;
    
    // 1. Tab Filtering
    if (activeTab === 'components') {
      list = list.filter(h => h.isFlowMode === false || !h.isFlowMode);
    } else if (activeTab === 'pages') {
      list = list.filter(h => h.isFlowMode === true);
    }

    // 2. Search Filtering
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (h) => h.prompt.toLowerCase().includes(q) || h.componentType?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [history, search, activeTab]);

  // Chronological Grouping (CHRONOS Engine)
  const grouped = useMemo(() => {
    const groups = {
      Today: [],
      Yesterday: [],
      Earlier: []
    };

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    filtered.forEach(item => {
      const itemDate = new Date(item.timestamp);
      if (itemDate >= today) groups.Today.push(item);
      else if (itemDate >= yesterday) groups.Yesterday.push(item);
      else groups.Earlier.push(item);
    });

    return Object.entries(groups).filter(([_, items]) => items.length > 0);
  }, [filtered]);

  const formatTime = (ts) => {
    const date = new Date(ts);
    const now = new Date();
    const diff = now - date;
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  // Empty state
  if (history.length === 0) {
    return (
      <div className="history-empty">
        <History size={32} className="history-empty__icon" />
        <h3 className="history-empty__title">No History Yet</h3>
        <p className="history-empty__text">
          Your generated UI components will appear here. Go to Generate to create your first component.
        </p>
      </div>
    );
  }

  return (
    <div className="history-panel">
      <div className="history-panel__header">
        <h2 className="history-panel__title">
          <History size={20} /> Generation History
        </h2>
        <div className="history-panel__actions">
          <Button
            variant={compareMode ? 'primary' : 'ghost'}
            size="sm"
            icon={GitCompareArrows}
            onClick={toggleCompareMode}
          >
            {compareMode ? 'Exit Compare' : 'Compare'}
          </Button>
          {!confirmClear ? (
            <Button variant="ghost" size="sm" icon={Trash2} onClick={() => setConfirmClear(true)}>
              Clear
            </Button>
          ) : (
            <div className="history-panel__confirm">
              <span>Delete all?</span>
              <Button variant="danger" size="sm" onClick={() => { clearHistory(); setConfirmClear(false); }}>
                Yes
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setConfirmClear(false)}>
                No
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="history-panel__search">
        <Search size={14} />
        <input
          type="search"
          placeholder="Search history..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search history"
        />
      </div>

      {/* Tabs */}
      <div className="history-panel__tabs">
        {['all', 'components', 'pages'].map(t => (
          <button
            key={t}
            className={`history-tab ${activeTab === t ? 'active' : ''}`}
            onClick={() => setActiveTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="history-panel__list">
        {grouped.map(([groupTitle, items]) => (
          <div key={groupTitle} className="history-group">
            <h3 className="history-group__title">{groupTitle}</h3>
            <div className="history-group__items">
              <AnimatePresence>
                {items.map((item, i) => (
                  <HistoryItem 
                    key={item.id} 
                    item={item} 
                    index={i}
                    compareMode={compareMode}
                    onSelect={selectFromHistory}
                    onDelete={deleteFromHistory}
                    onCompare={addToCompare}
                    onRefine={setRefineMode}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Sub-component for individual history items to keep parent clean
 */
function HistoryItem({ 
  item, index, compareMode, 
  onSelect, onDelete, onCompare, onRefine 
}) {
  const getAuditStatus = () => {
    if (!item.metrics) return 'none';
    const score = item.metrics.scores.performance;
    if (score >= 90) return 'success';
    if (score >= 70) return 'warning';
    return 'error';
  };

  const status = getAuditStatus();

  return (
    <motion.div
      className={`history-item glass-card status-${status}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ delay: index * 0.03 }}
      layout
    >
      <div className="history-item__content" onClick={() => onSelect(item.id)}>
        <div className="history-item__header-row">
          <div className="history-item__type-badge">{item.componentType || (item.isFlowMode ? 'Page' : 'Component')}</div>
          {status !== 'none' && (
            <div className={`history-item__status-dot status-${status}`} />
          )}
        </div>
        <p className="history-item__prompt">{item.prompt}</p>
        <div className="history-item__meta">
          <span className="history-item__time">
            <Clock size={10} /> {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {item.metrics && (
            <span className="history-item__score">
              {item.metrics.scores.performance}% Quality
            </span>
          )}
        </div>
      </div>
      <div className="history-item__actions">
        {compareMode && (
          <button
            className="history-item__action"
            onClick={(e) => { e.stopPropagation(); onCompare(item); }}
            title="Add to side-by-side compare"
          >
            <GitCompareArrows size={14} />
          </button>
        )}
        <button
          className="history-item__action"
          onClick={(e) => { e.stopPropagation(); onRefine(item.id); }}
          title="Create variation"
        >
          <RefreshCw size={14} />
        </button>
        <button
          className="history-item__action history-item__action--delete"
          onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
          title="Purge record"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </motion.div>
  );
}
