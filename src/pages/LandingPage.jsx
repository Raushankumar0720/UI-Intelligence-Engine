/**
 * Landing Page — Public-facing page for the UI Intelligence Engine.
 * SEO-optimized with structured data and meta tags.
 */
import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SeoHead from '../components/seo/SeoHead';
import {
  Sparkles, Wand2, BarChart3, GitCompareArrows,
  Lightbulb, Code, ArrowRight, ChevronRight,
  Zap, Shield, Layers
} from 'lucide-react';
import Button from '../components/ui/Button';
import TiltCard from '../components/ui/TiltCard';
import ScrollReveal from '../components/ui/ScrollReveal';
import './LandingPage.css';

const features = [
  {
    icon: Wand2,
    title: 'AI-Powered Generation',
    desc: 'Describe what you need and instantly generate production-quality UI components with intelligent defaults.',
  },
  {
    icon: BarChart3,
    title: 'Performance Analysis',
    desc: 'Get real-time Lighthouse-style scores for performance, accessibility, SEO, and best practices.',
  },
  {
    icon: Lightbulb,
    title: 'Design Rationale',
    desc: 'Understand the "why" behind every design decision with our Explain Mode feature.',
  },
  {
    icon: GitCompareArrows,
    title: 'Compare & Refine',
    desc: 'Compare different iterations side-by-side. See exactly what changed and why it matters.',
  },
];

const stats = [
  { value: '8+', label: 'Component Types' },
  { value: '6', label: 'Style Variants' },
  { value: '90+', label: 'Lighthouse Target' },
  { value: '<3s', label: 'Generation Time' },
];

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function LandingPage() {
  return (
    <>
      <SeoHead 
        title="Generate, Analyze, and Understand"
        description="The UI Intelligence Engine combines AI generation with deep performance analysis and design rationale. Build smarter interfaces, faster."
        keywords="AI, UI Generation, Design Intelligence, Engineering, Performance Audit"
      />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "UI Intelligence Engine",
          "applicationCategory": "DesignApplication",
          "description": "AI-powered UI generation and performance analysis tool",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        })}
      </script>

      <div className="landing">
        {/* Nav */}
        <nav className="landing__nav" role="navigation" aria-label="Main navigation">
          <div className="landing__nav-brand">
            <Sparkles size={20} />
            <span>UI Intelligence Engine</span>
          </div>
          <div className="landing__nav-links">
            <a href="#features" className="landing__nav-link">Features</a>
            <a href="#how-it-works" className="landing__nav-link">How It Works</a>
            <Link to="/auth" className="landing__nav-link">Sign In</Link>
            <Link to="/auth">
              <Button variant="primary" size="sm">Get Started</Button>
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <section className="landing__hero">
          <motion.div
            className="landing__hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ScrollReveal direction="up" delay={0.1}>
              <div className="landing__hero-badge">
                <Zap size={14} /> Design Intelligence Platform
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2}>
              <h1 className="landing__hero-title">
                Generate, Analyze,<br />
                <span>and Understand UI</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.3}>
              <p className="landing__hero-desc">
                The UI Intelligence Engine combines simulated AI generation with
                deep performance analysis and design rationale. Build smarter interfaces,
                faster.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.4}>
              <div className="landing__hero-actions">
                <Link to="/auth">
                  <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                    Start Building Free
                  </Button>
                </Link>
                <a href="#features">
                  <Button variant="secondary" size="lg">
                    Explore Features
                  </Button>
                </a>
              </div>
            </ScrollReveal>
          </motion.div>

          {/* Decorative element */}
          <ScrollReveal direction="left" delay={0.3} className="landing__hero-visual">
            <TiltCard className="landing__hero-mockup glass-card">
              <div className="landing__mockup-header">
                <div className="landing__mockup-dots">
                  <span /><span /><span />
                </div>
                <span className="landing__mockup-title">UI Preview</span>
              </div>
              <div className="landing__mockup-body">
                <div className="landing__mockup-card">
                  <div className="landing__mockup-gradient" />
                  <div className="landing__mockup-lines">
                    <div className="landing__mockup-line" style={{ width: '70%' }} />
                    <div className="landing__mockup-line" style={{ width: '90%' }} />
                    <div className="landing__mockup-line" style={{ width: '50%' }} />
                  </div>
                  <div className="landing__mockup-btn" />
                </div>
                <div className="landing__mockup-scores">
                  <div className="landing__mockup-score" style={{ '--score-color': '#22c55e' }}>94</div>
                  <div className="landing__mockup-score" style={{ '--score-color': '#22c55e' }}>91</div>
                  <div className="landing__mockup-score" style={{ '--score-color': '#f59e0b' }}>87</div>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        </section>

        {/* Stats */}
        <section className="landing__stats">
          {stats.map((stat, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.1}>
              <div className="landing__stat">
                <span className="landing__stat-value">{stat.value}</span>
                <span className="landing__stat-label">{stat.label}</span>
              </div>
            </ScrollReveal>
          ))}
        </section>

        {/* Features */}
        <section className="landing__features" id="features">
          <ScrollReveal direction="down" className="landing__section-header">
            <h2 className="landing__section-title">
              Everything you need to build <span className="text-gradient">intelligent UI</span>
            </h2>
            <p className="landing__section-desc">
              From generation to analysis to comparison — a complete design intelligence workflow.
            </p>
          </ScrollReveal>
          <div className="landing__features-grid">
            {features.map((f, i) => (
              <ScrollReveal 
                key={i} 
                direction={i % 2 === 0 ? 'left' : 'right'} 
                delay={i * 0.1}
              >
                <TiltCard className="landing__feature-card glass-card">
                  <div className="landing__feature-icon">
                    <f.icon size={20} />
                  </div>
                  <h3 className="landing__feature-title">{f.title}</h3>
                  <p className="landing__feature-desc">{f.desc}</p>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="landing__how" id="how-it-works">
          <motion.div
            className="landing__section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="landing__section-title">How It Works</h2>
            <p className="landing__section-desc">Three steps from idea to analyzed UI component.</p>
          </motion.div>
          <div className="landing__steps">
            {[
              { step: '01', title: 'Describe', desc: 'Enter a natural language prompt describing the UI component you need.', icon: Code, dir: 'left' },
              { step: '02', title: 'Generate', desc: 'Our engine analyzes your prompt and generates a matching component with styles.', icon: Wand2, dir: 'up' },
              { step: '03', title: 'Analyze', desc: 'Get instant performance scores, accessibility insights, and design rationale.', icon: BarChart3, dir: 'right' },
            ].map((s, i) => (
              <ScrollReveal 
                key={i} 
                direction={s.dir} 
                delay={i * 0.1}
              >
                <TiltCard className="landing__step glass-card">
                  <div className="landing__step-number">{s.step}</div>
                  <s.icon size={24} className="landing__step-icon" />
                  <h3 className="landing__step-title">{s.title}</h3>
                  <p className="landing__step-desc">{s.desc}</p>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="landing__cta">
          <motion.div
            className="landing__cta-content"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="landing__cta-title">Ready to build smarter?</h2>
            <p className="landing__cta-desc">
              Start generating and analyzing UI components today. No credit card required.
            </p>
            <Link to="/auth">
              <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                Get Started Free
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="landing__footer">
          <div className="landing__footer-brand">
            <Sparkles size={16} />
            <span>UI Intelligence Engine</span>
          </div>
          <p className="landing__footer-copy">
            © {new Date().getFullYear()} UI Intelligence Engine. Built as a SaaS product demo.
          </p>
        </footer>
      </div>
    </>
  );
}
