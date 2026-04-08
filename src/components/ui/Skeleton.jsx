/**
 * Skeleton — Loading placeholder components.
 * Multiple variants for different content types.
 */
import React from 'react';
import './Skeleton.css';

export function SkeletonLine({ width = '100%', height = 14 }) {
  return <div className="skeleton-line" style={{ width, height }} />;
}

export function SkeletonBlock({ width = '100%', height = 120 }) {
  return <div className="skeleton-block" style={{ width, height }} />;
}

export function SkeletonCircle({ size = 40 }) {
  return <div className="skeleton-circle" style={{ width: size, height: size }} />;
}

export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <SkeletonBlock height={140} />
      <div className="skeleton-card__body">
        <SkeletonLine width="70%" height={18} />
        <SkeletonLine width="100%" />
        <SkeletonLine width="85%" />
        <div className="skeleton-card__footer">
          <SkeletonLine width="60px" height={24} />
          <SkeletonLine width="80px" height={36} />
        </div>
      </div>
    </div>
  );
}

export function SkeletonInsights() {
  return (
    <div className="skeleton-insights">
      <div className="skeleton-insights__gauges">
        <SkeletonCircle size={80} />
        <SkeletonCircle size={80} />
        <SkeletonCircle size={80} />
        <SkeletonCircle size={80} />
      </div>
      <div className="skeleton-insights__list">
        <SkeletonLine width="100%" height={40} />
        <SkeletonLine width="100%" height={40} />
        <SkeletonLine width="100%" height={40} />
      </div>
    </div>
  );
}

export function SkeletonPreview() {
  return (
    <div className="skeleton-preview">
      <SkeletonBlock height={300} />
      <div className="skeleton-preview__meta">
        <SkeletonLine width="40%" height={16} />
        <SkeletonLine width="60%" height={12} />
      </div>
    </div>
  );
}
