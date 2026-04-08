/**
 * GenerationProgress — Shows the progressive loading state during generation.
 * Displays phase-by-phase messages with stagger animation.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, Brain, Code, BarChart3, Check } from 'lucide-react';
import useGeneratorStore from '../../store/generatorStore';
import './GenerationProgress.css';

const PHASE_ICONS = {
  analyzing: Brain,
  generating: Code,
  scoring: BarChart3,
  complete: Check,
};

const PHASE_LABELS = {
  analyzing: 'Designing Component',
  generating: 'Architecting UI',
  scoring: 'Analyzing Metrics',
  complete: 'UI Finalized',
};

export default function GenerationProgress() {
  const { generationPhase, progressMessages, currentOutput } = useGeneratorStore();
  const PhaseIcon = PHASE_ICONS[generationPhase] || Loader2;
  const isComplete = generationPhase === 'complete';

  return (
    <motion.div
      className="gen-progress"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <div className="gen-progress__header">
        <div className={`gen-progress__indicator ${isComplete ? 'gen-progress__indicator--complete' : ''}`}>
          <PhaseIcon
            size={24}
            className={!isComplete ? 'gen-progress__spinner' : ''}
          />
        </div>
        <div>
          <h3 className="gen-progress__phase">
            {PHASE_LABELS[generationPhase] || 'Processing'}
          </h3>
          <p className="gen-progress__status">
            {isComplete ? 'Your UI is ready!' : 'Please wait...'}
          </p>
        </div>
      </div>

      <div className="gen-progress__steps">
        {/* Phase dots */}
        <div className="gen-progress__dots">
          {['analyzing', 'generating', 'scoring', 'complete'].map((phase, i) => {
            const phases = ['analyzing', 'generating', 'scoring', 'complete'];
            const currentIdx = phases.indexOf(generationPhase);
            const isDone = i <= currentIdx;
            const isCurrent = i === currentIdx;

            return (
              <React.Fragment key={phase}>
                <div className={`gen-progress__dot ${isDone ? 'gen-progress__dot--done' : ''} ${isCurrent ? 'gen-progress__dot--current' : ''}`}>
                  {isDone && i < currentIdx ? (
                    <Check size={10} />
                  ) : (
                    <span className="gen-progress__dot-inner" />
                  )}
                </div>
                {i < 3 && (
                  <div className={`gen-progress__line ${isDone && i < currentIdx ? 'gen-progress__line--done' : ''}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="gen-progress__messages">
        {progressMessages.map((msg, i) => (
          <motion.div
            key={i}
            className="gen-progress__message"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.2 }}
          >
            {msg}
          </motion.div>
        ))}
      </div>

      {/* Futuristic Reasoning Log */}
      {generationPhase !== 'complete' && currentOutput?.reasoningChain && (
        <div className="gen-progress__reasoning">
          <div className="gen-progress__reasoning-header">
            <div className="gen-progress__reasoning-pulse" />
            AGENTIC REASONING LOG
          </div>
          <div className="gen-progress__reasoning-list">
            {currentOutput.reasoningChain.slice(0, progressMessages.length).map((reason, i) => (
              <motion.div
                key={i}
                className="gen-progress__reasoning-item"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {reason}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
