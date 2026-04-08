import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SeoHead — Universal metadata manager for the platform.
 * Supports dynamic titles, descriptions, and Open Graph tags.
 */
export default function SeoHead({ 
  title, 
  description, 
  keywords, 
  image = '/og-image.png',
  url = 'https://ui-intelligence-engine.vercel.app/'
}) {
  const fullTitle = title 
    ? `${title} | UI Intelligence Engine` 
    : 'UI Intelligence Engine — AI-Powered UI Generation & Analysis';
    
  const fullDescription = description || 'Generate production-quality UI components, analyze performance in real-time, and understand design decisions with our AI-powered design engine.';

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={fullDescription} />
      <meta property="twitter:image" content={image} />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
