/**
 * HistoryPage — Dedicated view for managing the generation history.
 * Uses the HistoryPanel component but adds page-level layouts and SEO.
 */
import React from 'react';
import { Helmet } from 'react-helmet-async';
import HistoryPanel from '../components/history/HistoryPanel';
import ScrollReveal from '../components/ui/ScrollReveal';
import './HistoryPage.css';

export default function HistoryPage() {
  return (
    <>
      <Helmet>
        <title>History — UI Intelligence Engine</title>
      </Helmet>

      <div className="history-page">
        <ScrollReveal direction="down">
          <h1 className="history-page__title">My Generations</h1>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.2} className="history-page__content">
          <HistoryPanel />
        </ScrollReveal>
      </div>
    </>
  );
}
