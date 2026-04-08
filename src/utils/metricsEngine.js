/**
 * Metrics Engine — Generates realistic performance and UX scores.
 * 
 * WHY not random: Random metrics feel fake. This engine uses
 * the analysis results (component complexity, features requested)
 * to produce LOGICALLY CONSISTENT scores. A simple card will score
 * higher on performance than a complex dashboard.
 */

const BASE_SCORES = {
  card: { performance: 94, accessibility: 90, seo: 85, bestPractices: 92 },
  dashboard: { performance: 78, accessibility: 82, seo: 65, bestPractices: 85 },
  form: { performance: 92, accessibility: 88, seo: 70, bestPractices: 90 },
  hero: { performance: 88, accessibility: 85, seo: 90, bestPractices: 88 },
  pricing: { performance: 90, accessibility: 86, seo: 88, bestPractices: 91 },
  navbar: { performance: 96, accessibility: 92, seo: 80, bestPractices: 94 },
  table: { performance: 82, accessibility: 84, seo: 60, bestPractices: 86 },
  modal: { performance: 93, accessibility: 78, seo: 50, bestPractices: 89 },
};

const FEATURE_PENALTIES = {
  animated: { performance: -3, accessibility: -2 },
  responsive: { performance: -1, accessibility: +2 },
  'dark-mode': { performance: 0, accessibility: +1 },
  icons: { performance: -2, accessibility: +1 },
  accessible: { performance: 0, accessibility: +5
  },
};

const STYLE_MODIFIERS = {
  minimal: { performance: +3, accessibility: +2 },
  modern: { performance: 0, accessibility: 0 },
  glassmorphism: { performance: -4, accessibility: -3 },
  gradient: { performance: -1, accessibility: 0 },
  dark: { performance: 0, accessibility: -1 },
  corporate: { performance: +1, accessibility: +1 },
};

function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

function jitter(val, range = 2) {
  return val + Math.floor(Math.random() * range * 2) - range;
}

export function generateMetrics(analysis) {
  const base = BASE_SCORES[analysis.componentType] || BASE_SCORES.card;
  const styleMod = STYLE_MODIFIERS[analysis.style] || STYLE_MODIFIERS.modern;

  let perf = base.performance + styleMod.performance;
  let a11y = base.accessibility + (styleMod.accessibility || 0);
  let seo = base.seo;
  let bp = base.bestPractices;

  // Apply feature modifiers
  for (const feature of analysis.features) {
    const penalty = FEATURE_PENALTIES[feature];
    if (penalty) {
      perf += penalty.performance || 0;
      a11y += penalty.accessibility || 0;
    }
  }

  // Add jitter for realism (±2 points)
  perf = clamp(jitter(perf), 50, 100);
  a11y = clamp(jitter(a11y), 50, 100);
  seo = clamp(jitter(seo), 40, 100);
  bp = clamp(jitter(bp), 50, 100);

  // Compute load time estimation (ms) — inversely related to performance
  const loadTime = Math.round((100 - perf) * 15 + Math.random() * 100 + 120);

  // Compute bundle size estimation (KB)
  const bundleSize = {
    card: 12,
    dashboard: 45,
    form: 18,
    hero: 22,
    pricing: 20,
    navbar: 14,
    table: 35,
    modal: 16,
  }[analysis.componentType] || 20;

  // UX Suggestions — context-aware, not random
  const suggestions = generateSuggestions(analysis, { perf, a11y, seo });

  return {
    scores: {
      performance: perf,
      accessibility: a11y,
      seo,
      bestPractices: bp,
    },
    loadTime,
    bundleSize: jitter(bundleSize, 3),
    firstContentfulPaint: Math.round(loadTime * 0.6),
    largestContentfulPaint: Math.round(loadTime * 1.2),
    cumulativeLayoutShift: parseFloat((Math.random() * 0.08).toFixed(3)),
    totalBlockingTime: Math.round(Math.random() * 50 + 10),
    suggestions,
  };
}

function generateSuggestions(analysis, scores) {
  const suggestions = [];

  if (scores.a11y < 85) {
    suggestions.push({
      type: 'accessibility',
      severity: 'warning',
      title: 'Add ARIA labels',
      description: `The ${analysis.componentType} component should include aria-label attributes for interactive elements to improve screen reader support.`,
    });
  }

  if (scores.perf < 85) {
    suggestions.push({
      type: 'performance',
      severity: 'warning',
      title: 'Consider lazy loading',
      description: 'Heavy components should be lazy-loaded to reduce initial bundle size and improve Time to Interactive.',
    });
  }

  if (analysis.features.includes('animated') || analysis.style === 'glassmorphism') {
    suggestions.push({
      type: 'performance',
      severity: 'info',
      title: 'Use will-change for animations',
      description: 'Apply will-change: transform to animated elements to promote them to their own compositor layer.',
    });
  }

  if (!analysis.features.includes('responsive')) {
    suggestions.push({
      type: 'ux',
      severity: 'warning',
      title: 'Add responsive breakpoints',
      description: 'This component may not adapt well to mobile viewports. Consider a mobile-first responsive strategy.',
    });
  }

  if (scores.seo < 70) {
    suggestions.push({
      type: 'seo',
      severity: 'info',
      title: 'Use semantic HTML',
      description: `Replace generic <div> wrappers with semantic tags like <article>, <section>, or <nav> to improve SEO signals.`,
    });
  }

  // Always add at least one positive suggestion
  if (scores.perf >= 90) {
    suggestions.push({
      type: 'performance',
      severity: 'success',
      title: 'Excellent performance',
      description: 'This component is lightweight and will load quickly even on slow connections.',
    });
  }

  if (analysis.features.includes('accessible')) {
    suggestions.push({
      type: 'accessibility',
      severity: 'success',
      title: 'Good accessibility intent',
      description: 'Accessibility features were detected. Ensure color contrast ratios meet WCAG AA standards (4.5:1 for text).',
    });
  }

  return suggestions;
}
