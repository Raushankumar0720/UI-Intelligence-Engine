/**
 * ComparePage — Specialized view for comparing two generated UI versions.
 * Integrates the CompareView component.
 */
import React from 'react';
import { Helmet } from 'react-helmet-async';
import CompareView from '../components/compare/CompareView';
import ScrollReveal from '../components/ui/ScrollReveal';
import './ComparePage.css';

export default function ComparePage() {
  return (
    <>
      <Helmet>
        <title>Compare UI Versions — UI Intelligence Engine</title>
      </Helmet>

      <div className="compare-page">
        <ScrollReveal direction="down">
          <h1 className="compare-page__title">Compare Outputs</h1>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.2} className="compare-page__content">
          <CompareView />
        </ScrollReveal>
      </div>
    </>
  );
}
