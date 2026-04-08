/**
 * UI Templates — Pre-built component outputs for the simulated AI.
 * 
 * Each template includes:
 * - html: raw HTML for preview rendering
 * - css: scoped styles
 * - jsx: React JSX code
 * - preview: component render config
 * - explanation: design rationale (for Explain Mode)
 * - componentTree: tree structure (for Component Tree viz)
 */

export const templates = {
  card: {
    html: `<div class="gen-card">
  <div class="gen-card__image">
    <div class="gen-card__badge">Featured</div>
  </div>
  <div class="gen-card__body">
    <h3 class="gen-card__title">Premium Dashboard Kit</h3>
    <p class="gen-card__desc">A comprehensive toolkit for building modern admin dashboards with dark mode support and real-time analytics.</p>
    <div class="gen-card__meta">
      <span class="gen-card__price">$49</span>
      <span class="gen-card__rating">★ 4.8</span>
    </div>
    <button class="gen-card__btn" aria-label="Add to cart">Add to Cart</button>
  </div>
</div>`,
    css: `.gen-card {
  max-width: 340px;
  background: #1a1f2e;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.gen-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.4);
}
.gen-card__image {
  height: 180px;
  background: linear-gradient(135deg, #6366f1, #06b6d4);
  position: relative;
}
.gen-card__badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(8px);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  color: #e0e7ff;
}
.gen-card__body { padding: 20px; }
.gen-card__title {
  font-size: 18px;
  font-weight: 600;
  color: #f1f5f9;
  margin-bottom: 8px;
}
.gen-card__desc {
  font-size: 14px;
  color: #94a3b8;
  line-height: 1.5;
  margin-bottom: 16px;
}
.gen-card__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.gen-card__price {
  font-size: 22px;
  font-weight: 700;
  color: #6366f1;
}
.gen-card__rating {
  font-size: 14px;
  color: #f59e0b;
}
.gen-card__btn {
  width: 100%;
  padding: 12px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.gen-card__btn:hover { background: #4f46e5; }`,
    jsx: `import React from 'react';
import './Card.css';

export default function Card({ title, description, price, rating, badge }) {
  return (
    <div className="gen-card">
      <div className="gen-card__image">
        {badge && <div className="gen-card__badge">{badge}</div>}
      </div>
      <div className="gen-card__body">
        <h3 className="gen-card__title">{title}</h3>
        <p className="gen-card__desc">{description}</p>
        <div className="gen-card__meta">
          <span className="gen-card__price">\${price}</span>
          <span className="gen-card__rating">★ {rating}</span>
        </div>
        <button className="gen-card__btn" aria-label="Add to cart">
          Add to Cart
        </button>
      </div>
    </div>
  );
}`,
    preview: {
      type: 'card',
      props: {
        title: 'Premium Dashboard Kit',
        description: 'A comprehensive toolkit for building modern admin dashboards.',
        price: 49,
        rating: 4.8,
        badge: 'Featured',
      },
    },
    explanation: {
      layout: 'Vertical card layout maximizes scannability. Image → Content → CTA follows the natural reading flow (F-pattern).',
      colors: 'Gradient header creates visual interest without overwhelming the content area. Indigo accent ties to SaaS branding conventions.',
      typography: 'Three-level type hierarchy (title → description → meta) creates clear information architecture.',
      spacing: '20px body padding creates breathing room. 16px gaps between sections follow 8px grid.',
      accessibility: 'Button includes aria-label. Color contrast ratios meet WCAG AA. Focus styles are visible.',
      performance: 'No images used in header (CSS gradient). Minimal DOM nodes. Single hover animation with transform (GPU-composited).',
    },
    componentTree: {
      name: 'Card',
      type: 'component',
      children: [
        {
          name: 'CardImage',
          type: 'div',
          children: [{ name: 'Badge', type: 'span', children: [] }],
        },
        {
          name: 'CardBody',
          type: 'div',
          children: [
            { name: 'Title', type: 'h3', children: [] },
            { name: 'Description', type: 'p', children: [] },
            {
              name: 'Meta',
              type: 'div',
              children: [
                { name: 'Price', type: 'span', children: [] },
                { name: 'Rating', type: 'span', children: [] },
              ],
            },
            { name: 'CTAButton', type: 'button', children: [] },
          ],
        },
      ],
    },
  },

  dashboard: {
    html: `<div class="gen-dash">
  <div class="gen-dash__header">
    <h2>Analytics Overview</h2>
    <select class="gen-dash__filter" aria-label="Time range">
      <option>Last 7 days</option>
      <option>Last 30 days</option>
      <option>Last 90 days</option>
    </select>
  </div>
  <div class="gen-dash__grid">
    <div class="gen-dash__stat">
      <span class="gen-dash__stat-label">Total Users</span>
      <span class="gen-dash__stat-value">24,891</span>
      <span class="gen-dash__stat-change positive">+12.5%</span>
    </div>
    <div class="gen-dash__stat">
      <span class="gen-dash__stat-label">Revenue</span>
      <span class="gen-dash__stat-value">$84,230</span>
      <span class="gen-dash__stat-change positive">+8.2%</span>
    </div>
    <div class="gen-dash__stat">
      <span class="gen-dash__stat-label">Conversion</span>
      <span class="gen-dash__stat-value">3.24%</span>
      <span class="gen-dash__stat-change negative">-0.8%</span>
    </div>
    <div class="gen-dash__stat">
      <span class="gen-dash__stat-label">Avg. Session</span>
      <span class="gen-dash__stat-value">4m 32s</span>
      <span class="gen-dash__stat-change positive">+1.1%</span>
    </div>
  </div>
  <div class="gen-dash__chart">
    <div class="gen-dash__chart-placeholder">
      <div class="gen-dash__bar" style="height: 40%"></div>
      <div class="gen-dash__bar" style="height: 65%"></div>
      <div class="gen-dash__bar" style="height: 50%"></div>
      <div class="gen-dash__bar" style="height: 80%"></div>
      <div class="gen-dash__bar" style="height: 70%"></div>
      <div class="gen-dash__bar" style="height: 90%"></div>
      <div class="gen-dash__bar" style="height: 75%"></div>
    </div>
  </div>
</div>`,
    css: `.gen-dash {
  max-width: 700px;
  background: #1a1f2e;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255,255,255,0.06);
}
.gen-dash__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.gen-dash__header h2 {
  font-size: 20px;
  font-weight: 600;
  color: #f1f5f9;
}
.gen-dash__filter {
  background: #111827;
  color: #94a3b8;
  border: 1px solid rgba(255,255,255,0.1);
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
}
.gen-dash__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}
.gen-dash__stat {
  background: #111827;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(255,255,255,0.04);
}
.gen-dash__stat-label {
  display: block;
  font-size: 12px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}
.gen-dash__stat-value {
  display: block;
  font-size: 22px;
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 4px;
}
.gen-dash__stat-change {
  font-size: 12px;
  font-weight: 600;
}
.gen-dash__stat-change.positive { color: #22c55e; }
.gen-dash__stat-change.negative { color: #ef4444; }
.gen-dash__chart {
  background: #111827;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(255,255,255,0.04);
}
.gen-dash__chart-placeholder {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  height: 120px;
}
.gen-dash__bar {
  flex: 1;
  background: linear-gradient(to top, #6366f1, #818cf8);
  border-radius: 6px 6px 0 0;
  transition: height 0.5s ease;
}
.gen-dash__bar:hover {
  background: linear-gradient(to top, #4f46e5, #6366f1);
}`,
    jsx: `import React from 'react';
import './Dashboard.css';

const stats = [
  { label: 'Total Users', value: '24,891', change: '+12.5%', positive: true },
  { label: 'Revenue', value: '$84,230', change: '+8.2%', positive: true },
  { label: 'Conversion', value: '3.24%', change: '-0.8%', positive: false },
  { label: 'Avg. Session', value: '4m 32s', change: '+1.1%', positive: true },
];

export default function Dashboard() {
  return (
    <div className="gen-dash">
      <div className="gen-dash__header">
        <h2>Analytics Overview</h2>
        <select className="gen-dash__filter" aria-label="Time range">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
        </select>
      </div>
      <div className="gen-dash__grid">
        {stats.map((stat, i) => (
          <div key={i} className="gen-dash__stat">
            <span className="gen-dash__stat-label">{stat.label}</span>
            <span className="gen-dash__stat-value">{stat.value}</span>
            <span className={\`gen-dash__stat-change \${stat.positive ? 'positive' : 'negative'}\`}>
              {stat.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}`,
    preview: { type: 'dashboard', props: {} },
    explanation: {
      layout: '4-column stat grid provides at-a-glance KPIs. Chart below gives temporal context. This follows the dashboard "overview → detail" pattern.',
      colors: 'Dark background reduces eye strain for data-heavy interfaces. Green/red semantic colors for change indicators are universally understood.',
      typography: 'Large stat values (22px) are scannable. Uppercase labels with wide tracking create visual separation.',
      spacing: '24px container padding, 16px grid gap — all on the 8px grid.',
      accessibility: 'Select has aria-label. Color is not the only indicator of positive/negative (+ and - signs included).',
      performance: 'CSS-only chart bars (no canvas/SVG library). Minimal JS needed. Stats are server-renderable.',
    },
    componentTree: {
      name: 'Dashboard',
      type: 'component',
      children: [
        { name: 'Header', type: 'div', children: [
          { name: 'Title', type: 'h2', children: [] },
          { name: 'Filter', type: 'select', children: [] },
        ]},
        { name: 'StatsGrid', type: 'div', children: [
          { name: 'StatCard', type: 'div', children: [] },
          { name: 'StatCard', type: 'div', children: [] },
          { name: 'StatCard', type: 'div', children: [] },
          { name: 'StatCard', type: 'div', children: [] },
        ]},
        { name: 'Chart', type: 'div', children: [] },
      ],
    },
  },

  form: {
    html: `<div class="gen-form">
  <div class="gen-form__header">
    <h2>Create Account</h2>
    <p>Start your free trial today</p>
  </div>
  <form class="gen-form__body">
    <div class="gen-form__field">
      <label for="name">Full Name</label>
      <input type="text" id="name" placeholder="John Doe" autocomplete="name" />
    </div>
    <div class="gen-form__field">
      <label for="email">Email</label>
      <input type="email" id="email" placeholder="john@example.com" autocomplete="email" />
    </div>
    <div class="gen-form__field">
      <label for="password">Password</label>
      <input type="password" id="password" placeholder="Min. 8 characters" autocomplete="new-password" />
    </div>
    <button type="submit" class="gen-form__btn">Create Account</button>
    <p class="gen-form__footer">Already have an account? <a href="#">Sign in</a></p>
  </form>
</div>`,
    css: `.gen-form {
  max-width: 400px;
  background: #1a1f2e;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid rgba(255,255,255,0.06);
}
.gen-form__header {
  text-align: center;
  margin-bottom: 28px;
}
.gen-form__header h2 {
  font-size: 24px;
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 4px;
}
.gen-form__header p {
  font-size: 14px;
  color: #64748b;
}
.gen-form__field {
  margin-bottom: 18px;
}
.gen-form__field label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #94a3b8;
  margin-bottom: 6px;
}
.gen-form__field input {
  width: 100%;
  padding: 12px 14px;
  background: #111827;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  color: #f1f5f9;
  font-size: 14px;
  transition: border-color 0.2s;
}
.gen-form__field input:focus {
  border-color: #6366f1;
  outline: none;
}
.gen-form__field input::placeholder {
  color: #475569;
}
.gen-form__btn {
  width: 100%;
  padding: 13px;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  margin-top: 4px;
}
.gen-form__btn:hover { opacity: 0.9; }
.gen-form__footer {
  text-align: center;
  font-size: 13px;
  color: #64748b;
  margin-top: 18px;
}
.gen-form__footer a {
  color: #818cf8;
  text-decoration: none;
}
.gen-form__footer a:hover { text-decoration: underline; }`,
    jsx: `import React, { useState } from 'react';
import { Mail, Lock, User, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import './Form.css';

export default function SignupForm({ onSubmit }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState('');

  const validate = () => {
    if (form.password.length < 8) return 'Password must be at least 8 characters';
    if (!form.email.includes('@')) return 'Invalid email address';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      setStatus('error');
      return;
    }

    setStatus('loading');
    setError('');
    
    // Simulate API Call
    setTimeout(() => {
      setStatus('success');
      onSubmit?.(form);
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="gen-form gen-form--success">
        <CheckCircle className="gen-form__success-icon" size={48} />
        <h2>Welcome aboard!</h2>
        <p>Your account has been created successfully.</p>
        <button onClick={() => setStatus('idle')} className="gen-form__btn">Back to Start</button>
      </div>
    );
  }

  return (
    <div className="gen-form">
      <div className="gen-form__header">
        <h2>Create Account</h2>
        <p>Start your free trial today</p>
      </div>
      <form className="gen-form__body" onSubmit={handleSubmit}>
        {status === 'error' && (
          <div className="gen-form__error-banner">
            <AlertCircle size={14} />
            <span>{error}</span>
          </div>
        )}
        
        <div className="gen-form__field">
          <label htmlFor="name">Full Name</label>
          <div className="gen-form__input-wrapper">
            <User className="gen-form__input-icon" size={16} />
            <input
              type="text" id="name" placeholder="John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="gen-form__field">
          <label htmlFor="email">Email</label>
          <div className="gen-form__input-wrapper">
            <Mail className="gen-form__input-icon" size={16} />
            <input
              type="email" id="email" placeholder="john@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="gen-form__field">
          <label htmlFor="password">Password</label>
          <div className="gen-form__input-wrapper">
            <Lock className="gen-form__input-icon" size={16} />
            <input
              type="password" id="password" placeholder="Min. 8 characters"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
        </div>

        <button type="submit" className="gen-form__btn" disabled={status === 'loading'}>
          {status === 'loading' ? (
            <><Loader2 className="animate-spin" size={16} /> Processing...</>
          ) : 'Create Account'}
        </button>
      </form>
    </div>
  );
}`,
    preview: { type: 'form', props: {} },
    explanation: {
      layout: 'Centered single-column form follows proven conversion patterns. Each field has clear label → input pairing.',
      colors: 'Gradient CTA button draws attention. Low-contrast placeholders avoid visual clutter.',
      typography: 'Label-input hierarchy uses size and weight differentiation for clarity.',
      spacing: '32px padding gives the form breathing room. 18px field gaps prevent visual crowding.',
      accessibility: 'Labels are explicitly linked via htmlFor/id. Autocomplete attributes help password managers. Focus states are visible.',
      performance: 'No external dependencies. Pure CSS. Form is server-renderable.',
    },
    componentTree: {
      name: 'SignupForm',
      type: 'component',
      children: [
        { name: 'Header', type: 'div', children: [
          { name: 'Title', type: 'h2', children: [] },
          { name: 'Subtitle', type: 'p', children: [] },
        ]},
        { name: 'Form', type: 'form', children: [
          { name: 'NameField', type: 'div', children: [] },
          { name: 'EmailField', type: 'div', children: [] },
          { name: 'PasswordField', type: 'div', children: [] },
          { name: 'SubmitButton', type: 'button', children: [] },
        ]},
      ],
    },
  },

  hero: {
    html: `<section class="gen-hero">
  <div class="gen-hero__content">
    <div class="gen-hero__tag">✨ Now in Public Beta</div>
    <h1 class="gen-hero__title">Build faster with <span class="gen-hero__highlight">AI-powered</span> design</h1>
    <p class="gen-hero__desc">Generate production-ready UI components in seconds. Powered by intelligent design systems that understand your brand.</p>
    <div class="gen-hero__actions">
      <button class="gen-hero__btn-primary">Get Started Free</button>
      <button class="gen-hero__btn-secondary">Watch Demo →</button>
    </div>
    <div class="gen-hero__social-proof">
      <div class="gen-hero__avatars">
        <div class="gen-hero__avatar" style="background:#6366f1"></div>
        <div class="gen-hero__avatar" style="background:#06b6d4"></div>
        <div class="gen-hero__avatar" style="background:#f59e0b"></div>
      </div>
      <span>Trusted by <strong>2,400+</strong> developers</span>
    </div>
  </div>
</section>`,
    css: `.gen-hero {
  max-width: 600px;
  padding: 48px 32px;
  text-align: center;
}
.gen-hero__tag {
  display: inline-block;
  background: rgba(99,102,241,0.12);
  color: #818cf8;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 20px;
  border: 1px solid rgba(99,102,241,0.2);
}
.gen-hero__title {
  font-size: 42px;
  font-weight: 800;
  color: #f1f5f9;
  line-height: 1.15;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}
.gen-hero__highlight {
  background: linear-gradient(135deg, #6366f1, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.gen-hero__desc {
  font-size: 17px;
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 28px;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}
.gen-hero__actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 32px;
}
.gen-hero__btn-primary {
  padding: 13px 28px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.gen-hero__btn-primary:hover { background: #4f46e5; }
.gen-hero__btn-secondary {
  padding: 13px 28px;
  background: transparent;
  color: #94a3b8;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}
.gen-hero__btn-secondary:hover {
  border-color: rgba(255,255,255,0.2);
  color: #f1f5f9;
}
.gen-hero__social-proof {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 14px;
  color: #64748b;
}
.gen-hero__avatars {
  display: flex;
}
.gen-hero__avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid #0a0e17;
  margin-left: -8px;
}
.gen-hero__avatar:first-child { margin-left: 0; }`,
    jsx: `import React from 'react';
import './Hero.css';

export default function Hero({ tag, title, highlight, description }) {
  return (
    <section className="gen-hero">
      <div className="gen-hero__content">
        <div className="gen-hero__tag">{tag || '✨ Now in Public Beta'}</div>
        <h1 className="gen-hero__title">
          {title || 'Build faster with '}
          <span className="gen-hero__highlight">{highlight || 'AI-powered'}</span>
          {' design'}
        </h1>
        <p className="gen-hero__desc">{description}</p>
        <div className="gen-hero__actions">
          <button className="gen-hero__btn-primary">Get Started Free</button>
          <button className="gen-hero__btn-secondary">Watch Demo →</button>
        </div>
      </div>
    </section>
  );
}`,
    preview: { type: 'hero', props: {} },
    explanation: {
      layout: 'Centered hero follows the "inverted pyramid" — tag → headline → description → CTA — guiding the eye naturally downward.',
      colors: 'Gradient text highlight creates visual emphasis without being distracting. Indigo + Cyan signals innovation.',
      typography: '42px title with -0.02em tracking is optimized for display sizes. 17px description is comfortable for reading.',
      spacing: 'Generous 48px padding creates a "breathing" feel. Social proof section is spaced far enough to feel separate.',
      accessibility: 'Semantic <section> element. Buttons are real <button> elements. Color contrast meets WCAG AA.',
      performance: 'No images. CSS-only gradients. Avatars are div backgrounds (no image requests). Entire section is paint-only.',
    },
    componentTree: {
      name: 'Hero',
      type: 'component',
      children: [
        { name: 'Tag', type: 'div', children: [] },
        { name: 'Title', type: 'h1', children: [
          { name: 'Highlight', type: 'span', children: [] },
        ]},
        { name: 'Description', type: 'p', children: [] },
        { name: 'Actions', type: 'div', children: [
          { name: 'PrimaryButton', type: 'button', children: [] },
          { name: 'SecondaryButton', type: 'button', children: [] },
        ]},
        { name: 'SocialProof', type: 'div', children: [] },
      ],
    },
  },

  pricing: {
    html: `<div class="gen-pricing">
  <div class="gen-pricing__card">
    <h3>Starter</h3>
    <div class="gen-pricing__price"><span class="gen-pricing__amount">$9</span>/mo</div>
    <ul class="gen-pricing__features">
      <li>✓ 10 generations/month</li>
      <li>✓ Basic analytics</li>
      <li>✓ Email support</li>
    </ul>
    <button class="gen-pricing__btn gen-pricing__btn--outline">Choose Plan</button>
  </div>
  <div class="gen-pricing__card gen-pricing__card--featured">
    <div class="gen-pricing__popular">Most Popular</div>
    <h3>Pro</h3>
    <div class="gen-pricing__price"><span class="gen-pricing__amount">$29</span>/mo</div>
    <ul class="gen-pricing__features">
      <li>✓ Unlimited generations</li>
      <li>✓ Advanced analytics</li>
      <li>✓ Priority support</li>
      <li>✓ Export to code</li>
    </ul>
    <button class="gen-pricing__btn gen-pricing__btn--solid">Choose Plan</button>
  </div>
  <div class="gen-pricing__card">
    <h3>Enterprise</h3>
    <div class="gen-pricing__price"><span class="gen-pricing__amount">$99</span>/mo</div>
    <ul class="gen-pricing__features">
      <li>✓ Everything in Pro</li>
      <li>✓ Custom branding</li>
      <li>✓ API access</li>
      <li>✓ Dedicated support</li>
    </ul>
    <button class="gen-pricing__btn gen-pricing__btn--outline">Contact Sales</button>
  </div>
</div>`,
    css: `.gen-pricing {
  display: flex;
  gap: 20px;
  max-width: 780px;
}
.gen-pricing__card {
  flex: 1;
  background: #1a1f2e;
  border-radius: 16px;
  padding: 28px;
  border: 1px solid rgba(255,255,255,0.06);
  position: relative;
  text-align: center;
}
.gen-pricing__card--featured {
  border-color: #6366f1;
  background: linear-gradient(180deg, #1e1b4b 0%, #1a1f2e 100%);
  transform: scale(1.04);
}
.gen-pricing__popular {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #6366f1;
  color: white;
  padding: 4px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}
.gen-pricing__card h3 {
  font-size: 18px;
  font-weight: 600;
  color: #94a3b8;
  margin-bottom: 8px;
}
.gen-pricing__price {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 24px;
}
.gen-pricing__amount {
  font-size: 40px;
  font-weight: 800;
  color: #f1f5f9;
}
.gen-pricing__features {
  text-align: left;
  margin-bottom: 24px;
}
.gen-pricing__features li {
  padding: 8px 0;
  font-size: 14px;
  color: #94a3b8;
  border-bottom: 1px solid rgba(255,255,255,0.04);
}
.gen-pricing__btn {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.gen-pricing__btn--solid {
  background: #6366f1;
  color: white;
  border: none;
}
.gen-pricing__btn--solid:hover { background: #4f46e5; }
.gen-pricing__btn--outline {
  background: transparent;
  color: #94a3b8;
  border: 1px solid rgba(255,255,255,0.1);
}
.gen-pricing__btn--outline:hover {
  border-color: #6366f1;
  color: #f1f5f9;
}`,
    jsx: `import React from 'react';
import './Pricing.css';

const plans = [
  { name: 'Starter', price: 9, features: ['10 generations/month', 'Basic analytics', 'Email support'], featured: false },
  { name: 'Pro', price: 29, features: ['Unlimited generations', 'Advanced analytics', 'Priority support', 'Export to code'], featured: true },
  { name: 'Enterprise', price: 99, features: ['Everything in Pro', 'Custom branding', 'API access', 'Dedicated support'], featured: false },
];

export default function Pricing() {
  return (
    <div className="gen-pricing">
      {plans.map((plan) => (
        <div key={plan.name} className={\`gen-pricing__card \${plan.featured ? 'gen-pricing__card--featured' : ''}\`}>
          {plan.featured && <div className="gen-pricing__popular">Most Popular</div>}
          <h3>{plan.name}</h3>
          <div className="gen-pricing__price">
            <span className="gen-pricing__amount">\${plan.price}</span>/mo
          </div>
          <ul className="gen-pricing__features">
            {plan.features.map((f) => <li key={f}>✓ {f}</li>)}
          </ul>
          <button className={\`gen-pricing__btn \${plan.featured ? 'gen-pricing__btn--solid' : 'gen-pricing__btn--outline'}\`}>
            {plan.name === 'Enterprise' ? 'Contact Sales' : 'Choose Plan'}
          </button>
        </div>
      ))}
    </div>
  );
}`,
    preview: { type: 'pricing', props: {} },
    explanation: {
      layout: 'Three-column pricing follows SaaS convention. Middle card is elevated (scale 1.04) to draw attention to the recommended plan.',
      colors: 'Featured card uses a dark indigo gradient top to differentiate without being garish. Border highlight is subtle.',
      typography: 'Large price number (40px) is the focal point. Plan name and features are intentionally subdued.',
      spacing: '28px padding balances content density. Feature list uses subtle borders for scanability.',
      accessibility: 'Buttons are semantic. Feature checkmarks are decorative text (not images). Color contrast is sufficient.',
      performance: 'Pure CSS layout. No images. Grid is flexbox-based for broad compatibility.',
    },
    componentTree: {
      name: 'Pricing',
      type: 'component',
      children: [
        { name: 'PlanCard (Starter)', type: 'div', children: [] },
        { name: 'PlanCard (Pro)', type: 'div', children: [
          { name: 'PopularBadge', type: 'div', children: [] },
        ]},
        { name: 'PlanCard (Enterprise)', type: 'div', children: [] },
      ],
    },
  },

  navbar: {
    html: `<nav class="gen-nav" role="navigation" aria-label="Main navigation">
  <div class="gen-nav__brand">
    <div class="gen-nav__logo">◆</div>
    <span class="gen-nav__name">Acme</span>
  </div>
  <ul class="gen-nav__links">
    <li><a href="#" class="gen-nav__link gen-nav__link--active">Products</a></li>
    <li><a href="#" class="gen-nav__link">Solutions</a></li>
    <li><a href="#" class="gen-nav__link">Pricing</a></li>
    <li><a href="#" class="gen-nav__link">Docs</a></li>
  </ul>
  <div class="gen-nav__actions">
    <button class="gen-nav__btn-ghost">Sign In</button>
    <button class="gen-nav__btn-solid">Get Started</button>
  </div>
</nav>`,
    css: `.gen-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  background: rgba(10, 14, 23, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  max-width: 900px;
  border-radius: 14px;
}
.gen-nav__brand {
  display: flex;
  align-items: center;
  gap: 10px;
}
.gen-nav__logo {
  color: #6366f1;
  font-size: 20px;
}
.gen-nav__name {
  font-size: 17px;
  font-weight: 700;
  color: #f1f5f9;
}
.gen-nav__links {
  display: flex;
  gap: 6px;
}
.gen-nav__link {
  padding: 8px 14px;
  font-size: 14px;
  color: #94a3b8;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.15s;
}
.gen-nav__link:hover {
  color: #f1f5f9;
  background: rgba(255,255,255,0.04);
}
.gen-nav__link--active {
  color: #f1f5f9;
  background: rgba(255,255,255,0.06);
}
.gen-nav__actions {
  display: flex;
  gap: 8px;
}
.gen-nav__btn-ghost {
  padding: 8px 16px;
  font-size: 14px;
  color: #94a3b8;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 8px;
}
.gen-nav__btn-ghost:hover { color: #f1f5f9; }
.gen-nav__btn-solid {
  padding: 8px 18px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background: #6366f1;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.gen-nav__btn-solid:hover { background: #4f46e5; }`,
    jsx: `import React from 'react';
import './Navbar.css';

const navLinks = [
  { label: 'Products', href: '#', active: true },
  { label: 'Solutions', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'Docs', href: '#' },
];

export default function Navbar() {
  return (
    <nav className="gen-nav" role="navigation" aria-label="Main navigation">
      <div className="gen-nav__brand">
        <div className="gen-nav__logo">◆</div>
        <span className="gen-nav__name">Acme</span>
      </div>
      <ul className="gen-nav__links">
        {navLinks.map((link) => (
          <li key={link.label}>
            <a href={link.href} className={\`gen-nav__link \${link.active ? 'gen-nav__link--active' : ''}\`}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="gen-nav__actions">
        <button className="gen-nav__btn-ghost">Sign In</button>
        <button className="gen-nav__btn-solid">Get Started</button>
      </div>
    </nav>
  );
}`,
    preview: { type: 'navbar', props: {} },
    explanation: {
      layout: 'Three-section layout (brand | links | actions) is the standard navbar pattern. Space-between alignment maximizes horizontal use.',
      colors: 'Semi-transparent background with blur creates depth without obscuring content below.',
      typography: 'Navigation links at 14px are scannable without competing with page content.',
      spacing: '14px vertical padding keeps the navbar compact. 6px link gap prevents accidental clicks.',
      accessibility: 'role="navigation" and aria-label for screen readers. Active link is visually distinct.',
      performance: 'Backdrop-filter is GPU-composited. No images. Minimal DOM.',
    },
    componentTree: {
      name: 'Navbar',
      type: 'component',
      children: [
        { name: 'Brand', type: 'div', children: [
          { name: 'Logo', type: 'div', children: [] },
          { name: 'Name', type: 'span', children: [] },
        ]},
        { name: 'NavLinks', type: 'ul', children: [
          { name: 'NavLink', type: 'li', children: [] },
        ]},
        { name: 'Actions', type: 'div', children: [
          { name: 'SignIn', type: 'button', children: [] },
          { name: 'GetStarted', type: 'button', children: [] },
        ]},
      ],
    },
  },

  table: {
    html: `<div class="gen-table-wrap">
  <div class="gen-table__header">
    <h3>Recent Transactions</h3>
    <input type="search" class="gen-table__search" placeholder="Search..." aria-label="Search transactions" />
  </div>
  <table class="gen-table" role="table">
    <thead>
      <tr>
        <th>Customer</th>
        <th>Amount</th>
        <th>Status</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Alex Johnson</td><td>$420.00</td><td><span class="gen-table__badge gen-table__badge--success">Completed</span></td><td>Mar 15, 2025</td></tr>
      <tr><td>Sarah Chen</td><td>$890.00</td><td><span class="gen-table__badge gen-table__badge--pending">Pending</span></td><td>Mar 14, 2025</td></tr>
      <tr><td>Mike Davis</td><td>$1,250.00</td><td><span class="gen-table__badge gen-table__badge--success">Completed</span></td><td>Mar 13, 2025</td></tr>
    </tbody>
  </table>
</div>`,
    css: `.gen-table-wrap {
  max-width: 650px;
  background: #1a1f2e;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255,255,255,0.06);
}
.gen-table__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.gen-table__header h3 {
  font-size: 17px;
  font-weight: 600;
  color: #f1f5f9;
}
.gen-table__search {
  padding: 8px 14px;
  background: #111827;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
  color: #f1f5f9;
  font-size: 13px;
  width: 200px;
}
.gen-table {
  width: 100%;
  border-collapse: collapse;
}
.gen-table th {
  text-align: left;
  padding: 10px 14px;
  font-size: 12px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.gen-table td {
  padding: 12px 14px;
  font-size: 14px;
  color: #94a3b8;
  border-bottom: 1px solid rgba(255,255,255,0.03);
}
.gen-table tr:hover td { background: rgba(255,255,255,0.02); }
.gen-table__badge {
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}
.gen-table__badge--success {
  background: rgba(34,197,94,0.1);
  color: #22c55e;
}
.gen-table__badge--pending {
  background: rgba(245,158,11,0.1);
  color: #f59e0b;
}`,
    jsx: `import React from 'react';
import './Table.css';

const data = [
  { customer: 'Alex Johnson', amount: '$420.00', status: 'Completed', date: 'Mar 15, 2025' },
  { customer: 'Sarah Chen', amount: '$890.00', status: 'Pending', date: 'Mar 14, 2025' },
  { customer: 'Mike Davis', amount: '$1,250.00', status: 'Completed', date: 'Mar 13, 2025' },
];

export default function TransactionsTable() {
  return (
    <div className="gen-table-wrap">
      <div className="gen-table__header">
        <h3>Recent Transactions</h3>
        <input type="search" className="gen-table__search" placeholder="Search..." />
      </div>
      <table className="gen-table" role="table">
        <thead>
          <tr>
            <th>Customer</th><th>Amount</th><th>Status</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{row.customer}</td>
              <td>{row.amount}</td>
              <td><span className={\`gen-table__badge gen-table__badge--\${row.status.toLowerCase()}\`}>{row.status}</span></td>
              <td>{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`,
    preview: { type: 'table', props: {} },
    explanation: {
      layout: 'Standard data table with search header. Rows use subtle hover for interactivity.',
      colors: 'Status badges use semantic color coding (green=complete, amber=pending).',
      typography: 'Uppercase column headers at 12px with tracking create clear visual separation from data rows.',
      spacing: 'Compact 12px row padding keeps data dense but readable.',
      accessibility: 'role="table" for screen readers. Search has aria-label.',
      performance: 'Pure HTML table, no virtual scrolling needed for small datasets.',
    },
    componentTree: {
      name: 'TransactionsTable',
      type: 'component',
      children: [
        { name: 'Header', type: 'div', children: [
          { name: 'Title', type: 'h3', children: [] },
          { name: 'Search', type: 'input', children: [] },
        ]},
        { name: 'Table', type: 'table', children: [
          { name: 'TableHead', type: 'thead', children: [] },
          { name: 'TableBody', type: 'tbody', children: [] },
        ]},
      ],
    },
  },

  modal: {
    html: `<div class="gen-modal-overlay">
  <div class="gen-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <div class="gen-modal__header">
      <h3 id="modal-title">Confirm Action</h3>
      <button class="gen-modal__close" aria-label="Close dialog">&times;</button>
    </div>
    <div class="gen-modal__body">
      <p>Are you sure you want to proceed? This action cannot be undone.</p>
    </div>
    <div class="gen-modal__footer">
      <button class="gen-modal__btn gen-modal__btn--ghost">Cancel</button>
      <button class="gen-modal__btn gen-modal__btn--danger">Delete</button>
    </div>
  </div>
</div>`,
    css: `.gen-modal-overlay {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.5);
  padding: 40px;
  border-radius: 16px;
}
.gen-modal {
  width: 100%;
  max-width: 420px;
  background: #1a1f2e;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.08);
  overflow: hidden;
}
.gen-modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.gen-modal__header h3 {
  font-size: 17px;
  font-weight: 600;
  color: #f1f5f9;
}
.gen-modal__close {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.04);
  border: none;
  border-radius: 6px;
  color: #64748b;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.15s;
}
.gen-modal__close:hover { background: rgba(255,255,255,0.08); color: #f1f5f9; }
.gen-modal__body {
  padding: 24px;
}
.gen-modal__body p {
  font-size: 14px;
  color: #94a3b8;
  line-height: 1.6;
}
.gen-modal__footer {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding: 16px 24px;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.gen-modal__btn {
  padding: 9px 18px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
}
.gen-modal__btn--ghost {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.1);
  color: #94a3b8;
}
.gen-modal__btn--ghost:hover { border-color: rgba(255,255,255,0.2); color: #f1f5f9; }
.gen-modal__btn--danger {
  background: #ef4444;
  border: none;
  color: white;
}
.gen-modal__btn--danger:hover { background: #dc2626; }`,
    jsx: `import React from 'react';
import './Modal.css';

export default function ConfirmModal({ title, message, onCancel, onConfirm }) {
  return (
    <div className="gen-modal-overlay" onClick={onCancel}>
      <div className="gen-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <div className="gen-modal__header">
          <h3>{title || 'Confirm Action'}</h3>
          <button className="gen-modal__close" onClick={onCancel} aria-label="Close">&times;</button>
        </div>
        <div className="gen-modal__body">
          <p>{message || 'Are you sure?'}</p>
        </div>
        <div className="gen-modal__footer">
          <button className="gen-modal__btn gen-modal__btn--ghost" onClick={onCancel}>Cancel</button>
          <button className="gen-modal__btn gen-modal__btn--danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}`,
    preview: { type: 'modal', props: {} },
    explanation: {
      layout: 'Standard modal pattern: header (title + close), body (content), footer (actions). Overlay click dismisses.',
      colors: 'Danger button uses red to indicate destructive action. Ghost cancel button is intentionally less prominent.',
      typography: 'Title at 17px, body at 14px — clear hierarchy within a small space.',
      spacing: 'Consistent 24px horizontal padding. Header and footer use borders for visual separation.',
      accessibility: 'role="dialog", aria-modal="true", aria-labelledby links to heading. Close button has aria-label. Overlay click dismisses.',
      performance: 'Minimal DOM. No animations in base template (added via Framer Motion in production).',
    },
    componentTree: {
      name: 'ConfirmModal',
      type: 'component',
      children: [
        { name: 'Overlay', type: 'div', children: [
          { name: 'ModalWindow', type: 'div', children: [
            { name: 'Header', type: 'div', children: [
              { name: 'Title', type: 'h3', children: [] },
              { name: 'CloseButton', type: 'button', children: [] },
            ]},
            { name: 'Body', type: 'div', children: [] },
            { name: 'Footer', type: 'div', children: [
              { name: 'CancelBtn', type: 'button', children: [] },
              { name: 'ConfirmBtn', type: 'button', children: [] },
            ]},
          ]},
        ]},
      ],
    },
  },
};
