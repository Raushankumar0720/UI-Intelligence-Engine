/**
 * ScoreGauge — Circular performance score indicator.
 * Used in the Insights panel to display Lighthouse-style scores.
 */
import React from 'react';
import './ScoreGauge.css';

export default function ScoreGauge({ score, label, size = 80 }) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - score) / 100) * circumference;
  
  const getColor = (s) => {
    if (s >= 90) return 'var(--color-success)';
    if (s >= 50) return 'var(--color-warning)';
    return 'var(--color-error)';
  };
  
  const color = getColor(score);

  return (
    <div className="score-gauge" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="score-gauge__svg">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="score-gauge__bg"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="score-gauge__fill"
          style={{
            stroke: color,
            strokeDasharray: circumference,
            strokeDashoffset: progress,
          }}
        />
      </svg>
      <div className="score-gauge__text">
        <span className="score-gauge__value" style={{ color }}>{score}</span>
      </div>
      {label && <span className="score-gauge__label">{label}</span>}
    </div>
  );
}
