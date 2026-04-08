/**
 * GeneratePage — Core interface for generating UI components.
 * Manages the transition between input, progress, and output states.
 */
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SeoHead from '../components/seo/SeoHead';
import PromptInput from '../components/generator/PromptInput';
import GenerationProgress from '../components/generator/GenerationProgress';
import OutputPreview from '../components/generator/OutputPreview';
import InsightsPanel from '../components/insights/InsightsPanel';
import ComponentTree from '../components/insights/ComponentTree';
import useGeneratorStore from '../store/generatorStore';
import ScrollReveal from '../components/ui/ScrollReveal';
import './GeneratePage.css';

export default function GeneratePage() {
  const { currentOutput, isGenerating, generationPhase, explainMode } = useGeneratorStore();

  return (
    <>
      <SeoHead 
        title="Generate UI" 
        description="Transform your ideas into production-quality UI components with real-time performance analytics."
      />

      <div className="generate-page">
        <div className="generate-page__content">
          <AnimatePresence mode="wait">
            {!currentOutput && !isGenerating && (
              <motion.div
                key="input"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <PromptInput />
              </motion.div>
            )}

            {isGenerating && (
              <motion.div
                key="progress"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <GenerationProgress />
              </motion.div>
            )}

            {currentOutput && !isGenerating && (
              <div className="generate-page__result">
                <ScrollReveal direction="left" delay={0.1} className="generate-page__main">
                  <OutputPreview />
                </ScrollReveal>
                
                <aside className="generate-page__aside">
                  <ScrollReveal direction="right" delay={0.2}>
                    <InsightsPanel />
                  </ScrollReveal>
                  {explainMode && (
                    <ScrollReveal direction="up" delay={0.3} className="generate-page__extra">
                      <ComponentTree />
                    </ScrollReveal>
                  )}
                </aside>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
