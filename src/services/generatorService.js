/**
 * Generator Service — Simulated AI UI Generation.
 * 
 * WHY simulation: This is a front-end-driven SaaS product demo.
 * The "AI" is simulated with realistic delays, randomized quality
 * metrics, and template-based output to demonstrate the full UX
 * without requiring a real ML backend.
 * 
 * The simulation produces DETERMINISTIC-FEELING output based on 
 * prompt analysis (keyword matching) rather than truly random values.
 */

import { templates } from '../data/templates';
import { analyzePrompt } from '../utils/promptAnalyzer';
import { generateMetrics } from '../utils/metricsEngine';
import { sanitizeInput } from '../utils/security';
import useDesignStore from '../store/designStore';
import useGeneratorStore from '../store/generatorStore';

const PHASE_DELAYS = {
  analyzing: { min: 800, max: 1500 },
  generating: { min: 1500, max: 3000 },
  scoring: { min: 600, max: 1200 },
};

function delay(phase) {
  const { min, max } = PHASE_DELAYS[phase];
  const ms = Math.floor(Math.random() * (max - min) + min);
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class GeneratorService {
  /**
   * Main generation pipeline.
   * @param {string} rawPrompt - User's natural-language prompt
   * @param {Function} onPhase - Callback for phase transitions
   * @param {Object} parentContext - (Optional) Context from a parent generation for refinement
   * @returns {Object} Generated UI output with code, preview data, and metrics
   */
  async generate(rawPrompt, onPhase, parentContext = null) {
    const prompt = sanitizeInput(rawPrompt);
    
    // Phase 1 — Analyze prompt
    const contextMsg = parentContext ? 'Analyzing refinement request...' : 'Understanding design requirements...';
    onPhase('analyzing', contextMsg);
    await delay('analyzing');
    
    let analysis = analyzePrompt(prompt);
    
    // If refining, inherit the parent's component type but adapt the style
    if (parentContext) {
      analysis = {
        ...analysis,
        componentType: parentContext.componentType, // Lock the type
        templateKey: parentContext.analysis?.templateKey || parentContext.componentType,
      };
      onPhase('analyzing', `Detected: Updating your ${analysis.componentType} to ${analysis.style} style`);
    } else {
      onPhase('analyzing', `Detected: ${analysis.componentType} component with ${analysis.style} style`);
    }

    // Phase 2 — Generate UI
    await delay('analyzing');
    const structureMsg = parentContext ? 'Refining component structure...' : 'Building component structure...';
    onPhase('generating', structureMsg);
    await delay('generating');
    onPhase('generating', 'Applying design tokens and styles...');
    await delay('generating');

    // Simulate a small chance of failure for realism (5%)
    if (Math.random() < 0.05) {
      throw new Error('Generation timed out. The model could not produce a valid output for this prompt.');
    }

    const template = templates[analysis.templateKey] || templates.card;
    const { dna } = useDesignStore.getState();
    
    // Matrix + DNA Tokenization: Enforce Brand Consistency
    const tokenizedCss = `
:host, .component-root {
  --m-blur: ${dna.glassIntensity}px;
  --m-saturate: 220%;
  --m-padding: 2rem;
  --m-gap: 1.5rem;
  --m-accent: ${dna.primaryColor};
  --m-radius: ${dna.borderRadius};
  font-family: ${dna.fontFamily};
}
${template.css.replace(/padding:\s*[^;]+;/g, 'padding: var(--m-padding);')
           .replace(/border-radius:\s*[^;]+;/g, 'border-radius: var(--m-radius);')
           .replace(/gap:\s*[^;]+;/g, 'gap: var(--m-gap);')
           .replace(/backdrop-filter:\s*blur\([^)]+\)/g, 'backdrop-filter: blur(var(--m-blur))')
}
    `;

    onPhase('generating', 'Optimizing accessibility attributes...');
    await delay('scoring');

    // Phase 3 — Score
    onPhase('scoring', 'Running performance analysis...');
    await delay('scoring');
    const metrics = generateMetrics(analysis);
    onPhase('scoring', 'Computing UX heuristics...');
    await delay('scoring');
    
    const isFlowMode = useGeneratorStore.getState().isFlowMode;

    // Flow Mode: Generate a sequence of related architectural screens
    if (isFlowMode) {
      onPhase('scoring', 'Sequencing architectural flow...');
      const screens = ['login', 'dashboard', 'settings']; 
      const flowResults = screens.map((type, idx) => ({
         id: `${Date.now()}-${idx}`,
         componentType: type,
         style: analysis.style,
         html: templates[type]?.html || template.html,
         css: tokenizedCss,
         jsx: templates[type]?.jsx || template.jsx,
         preview: templates[type]?.preview || template.preview,
         metrics: generateMetrics(),
         explanation: templates[type]?.explanation || template.explanation,
         timestamp: new Date().toISOString(),
      }));
      return { isFlow: true, screens: flowResults };
    }

    onPhase('complete', 'Generation complete!');
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      componentType: analysis.componentType,
      style: analysis.style,
      html: template.html,
      css: tokenizedCss,
      jsx: template.jsx,
      preview: template.preview,
      metrics,
      analysis,
      explanation: template.explanation,
      componentTree: template.componentTree,
      reasoningChain: [
        `Analyzing architectural constraints for ${analysis.componentType}...`,
        `Synthesizing ${analysis.style} design tokens...`,
        "Optimizing Flexbox hierarchy for mobile responsiveness...",
        "Applying Obsidian/Prism high-contrast light-leaks...",
        "Generating accessible ARIA labeling for component tree...",
        "Finalizing the design rationale..."
      ]
    };
  }

  async generateVariants(prompt, onPhase) {
    const main = await this.generate(prompt, onPhase);
    const styles = ['modern', 'glass', 'minimal'];
    const variants = styles.map(style => ({
       ...main,
       id: Math.random().toString(36).substr(2, 9),
       style,
       // In a real app, we would pick a different template here
    }));
    return variants;
  }
}

export const generatorService = new GeneratorService();
