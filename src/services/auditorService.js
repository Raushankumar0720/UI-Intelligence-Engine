/**
 * Auditor Service — The "Verifier" layer of the UI Intelligence Engine.
 * 
 * Performs post-generation analysis to detect design violations
 * and calculate a "Health Score" for every component.
 */

export const auditorService = {
  /**
   * Audits a component based on its generated output.
   */
  audit: async (output) => {
    const findings = [];
    let score = 100;

    // 1. Accessibility Scan (WCAG 2.1)
    const a11y = auditA11y(output);
    findings.push(...a11y.findings);
    score -= a11y.penalty;

    // 2. Performance Scan
    const perf = auditPerf(output);
    findings.push(...perf.findings);
    score -= perf.penalty;

    // 3. Design Consistency Scan
    const design = auditDesign(output);
    findings.push(...design.findings);
    score -= design.penalty;

    return {
      score: Math.max(0, score),
      timestamp: new Date().toISOString(),
      findings: findings.sort((a, b) => b.severity - a.severity),
      categories: {
        accessibility: a11y.score,
        performance: perf.score,
        usability: design.score
      }
    };
  }
};

/** === INTERNAL RULES === **/

function auditA11y(output) {
  const findings = [];
  let penalty = 0;
  let score = 100;

  // Rule: Check for aria-labels on buttons
  if (output.html.includes('<button') && !output.html.includes('aria-label') && !output.html.includes('title')) {
    findings.push({
      category: 'accessibility',
      severity: 3, // 1-5
      message: 'Button missing descriptive label for screen readers.',
      rule: 'ARIA-Label',
      code: 'WCAG 4.1.2'
    });
    penalty += 15;
  }

  // Rule: Low Contrast Detection (Simulated)
  if (output.style === 'glass' || output.style === 'minimal') {
    findings.push({
      category: 'accessibility',
      severity: 2,
      message: 'Potential low contrast in glass text layers.',
      rule: 'Contrast Ratio',
      code: 'WCAG 1.4.3'
    });
    penalty += 10;
  }

  return { findings, penalty, score: 100 - penalty };
}

function auditPerf(output) {
  const findings = [];
  let penalty = 0;
  
  // Rule: DOM Depth
  const nodeCount = (output.html.match(/</g) || []).length;
  if (nodeCount > 50) {
    findings.push({
      category: 'performance',
      severity: 1,
      message: 'High DOM node count may impact mobile rendering.',
      rule: 'DOM Size'
    });
    penalty += 5;
  }

  return { findings, penalty, score: 100 - penalty };
}

function auditDesign(output) {
  const findings = [];
  let penalty = 0;

  // Rule: Touch Target Size
  if (output.css.includes('padding: 4px') || output.css.includes('padding: 2px')) {
    findings.push({
      category: 'usability',
      severity: 2,
      message: 'Clickable targets are below recommended 44px size.',
      rule: 'Touch Targets'
    });
    penalty += 10;
  }

  return { findings, penalty, score: 100 - penalty };
}
