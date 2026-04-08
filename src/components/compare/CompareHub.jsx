import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftRight, X, ChevronRight } from 'lucide-react';
import useGeneratorStore from '../../store/generatorStore';
import './CompareHub.css';

export default function CompareHub() {
  const { compareItems, removeFromCompare, compareMode, toggleCompareMode, clearCompare } = useGeneratorStore();
  const navigate = useNavigate();
  const location = useLocation();

  if (compareItems.length === 0) return null;
  
  const isComparePage = location.pathname === '/compare';

  const handleLaunch = () => {
    if (!isComparePage) {
      navigate('/compare');
    } else {
      toggleCompareMode();
    }
  };

  return (
    <div className="compare-hub">
      <AnimatePresence>
        {compareItems.length > 0 && (
          <motion.div 
            className="compare-hub__bar glass-card"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
          >
            <div className="compare-hub__info">
              <div className="compare-hub__icon">
                <ArrowLeftRight size={16} />
              </div>
              <div className="compare-hub__text">
                <strong>{compareItems.length}/2</strong> Selected for Compare
              </div>
            </div>

            <div className="compare-hub__items">
              {compareItems.map((item) => (
                <div key={item.id} className="compare-hub__chip">
                  <span>{item.componentType}</span>
                  <button onClick={() => removeFromCompare(item.id)}>
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>

            <div className="compare-hub__actions">
              <button 
                className="compare-hub__btn compare-hub__btn--clear"
                onClick={clearCompare}
              >
                Clear
              </button>
              <button 
                className={`compare-hub__btn compare-hub__btn--launch ${compareItems.length === 2 ? 'ready' : ''}`}
                onClick={handleLaunch}
                disabled={compareItems.length < 2}
              >
                <span>{isComparePage ? 'Finish' : 'Compare Now'}</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
