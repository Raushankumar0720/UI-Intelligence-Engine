/**
 * Prompt Analyzer — Extracts intent and component type from user prompts.
 * 
 * Uses keyword matching and heuristics rather than ML.
 * This creates deterministic output that feels intelligent 
 * because it maps user intent to pre-built templates.
 */

const COMPONENT_KEYWORDS = {
  card: ['card', 'profile', 'product', 'item', 'tile', 'widget'],
  dashboard: ['dashboard', 'admin', 'panel', 'analytics', 'metrics', 'stats'],
  form: ['form', 'login', 'signup', 'register', 'contact', 'input', 'subscribe'],
  hero: ['hero', 'landing', 'banner', 'header', 'headline', 'cta', 'call to action'],
  pricing: ['pricing', 'plan', 'subscription', 'tier', 'package', 'billing'],
  navbar: ['navbar', 'navigation', 'menu', 'header', 'topbar', 'nav'],
  table: ['table', 'list', 'data', 'grid', 'rows', 'columns'],
  modal: ['modal', 'dialog', 'popup', 'overlay', 'confirmation'],
};

const STYLE_KEYWORDS = {
  minimal: ['minimal', 'clean', 'simple', 'basic', 'light'],
  modern: ['modern', 'sleek', 'contemporary', 'fresh', 'new'],
  glassmorphism: ['glass', 'frosted', 'blur', 'translucent', 'transparent'],
  gradient: ['gradient', 'colorful', 'vibrant', 'bold', 'dynamic'],
  dark: ['dark', 'night', 'midnight', 'shadow', 'noir'],
  corporate: ['corporate', 'professional', 'business', 'enterprise', 'formal'],
};

export function analyzePrompt(prompt) {
  const lower = prompt.toLowerCase().trim();
  
  // Detect component type
  let componentType = 'card'; // default
  let maxScore = 0;
  
  for (const [type, keywords] of Object.entries(COMPONENT_KEYWORDS)) {
    let score = 0;
    for (const kw of keywords) {
      if (lower.includes(kw)) score += kw.length; // longer matches are more specific
    }
    if (score > maxScore) {
      maxScore = score;
      componentType = type;
    }
  }

  // Detect style
  let style = 'modern'; // default
  let styleMaxScore = 0;
  
  for (const [s, keywords] of Object.entries(STYLE_KEYWORDS)) {
    let score = 0;
    for (const kw of keywords) {
      if (lower.includes(kw)) score += kw.length;
    }
    if (score > styleMaxScore) {
      styleMaxScore = score;
      style = s;
    }
  }

  // Extract implied features
  const features = [];
  if (lower.includes('responsive')) features.push('responsive');
  if (lower.includes('animation') || lower.includes('animated')) features.push('animated');
  if (lower.includes('accessible') || lower.includes('a11y')) features.push('accessible');
  if (lower.includes('dark mode') || lower.includes('dark')) features.push('dark-mode');
  if (lower.includes('icon')) features.push('icons');
  
  // Build template key
  const templateKey = componentType;

  return {
    componentType,
    style,
    features,
    templateKey,
    confidence: maxScore > 0 ? Math.min(0.95, 0.6 + maxScore * 0.05) : 0.5,
    promptLength: prompt.length,
    wordCount: prompt.split(/\s+/).filter(Boolean).length,
  };
}
