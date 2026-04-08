/**
 * AuthPage — Combined Login/Register page.
 * Toggles between modes with animated transitions.
 */
import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import AuthShowcase from '../components/auth/AuthShowcase';
import useAuthStore from '../store/authStore';
import { isValidEmail, validatePassword } from '../utils/security';
import ScrollReveal from '../components/ui/ScrollReveal';
import './AuthPage.css';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const { login, register, isLoading, error, clearError, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  const validate = useCallback(() => {
    const errs = {};
    if (mode === 'register' && !form.name.trim()) {
      errs.name = 'Name is required.';
    }
    if (!form.email.trim()) {
      errs.email = 'Email is required.';
    } else if (!isValidEmail(form.email)) {
      errs.email = 'Please enter a valid email.';
    }
    if (!form.password) {
      errs.password = 'Password is required.';
    } else if (mode === 'register') {
      const pw = validatePassword(form.password);
      if (!pw.valid) errs.password = pw.message;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [form, mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    if (!validate()) return;

    if (mode === 'login') {
      const result = await login(form.email, form.password);
      if (result.success) navigate('/dashboard');
    } else {
      const result = await register(form.name, form.email, form.password);
      if (result.success) navigate('/dashboard');
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setErrors({});
    clearError();
  };

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  return (
    <div className="auth-page">
      <div className="auth-page__container">
        {/* Left Side: Showcase */}
        <section className="auth-page__left">
          <AuthShowcase />
        </section>

        {/* Right Side: Form */}
        <section className="auth-page__right">
          <div className="auth-page__form-container">
            <ScrollReveal direction="up" duration={0.8}>
              <div className="auth-card">
                <div className="auth-card__header">
                  <div className="auth-card__status">
                    <ShieldCheck size={14} />
                    <span>SECURE GATEWAY</span>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={mode}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="auth-card__title">
                        {mode === 'login' ? 'Authentication' : 'Registration'}
                      </h2>
                      <p className="auth-card__subtitle">
                        {mode === 'login'
                          ? 'Enter your credentials to access the engine.'
                          : 'Join the next generation of UI engineering.'}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <form className="auth-card__form" onSubmit={handleSubmit} noValidate>
                  <AnimatePresence mode="wait">
                    {mode === 'register' && (
                      <motion.div
                        key="name-field"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Input
                          label="Full Name"
                          type="text"
                          placeholder="Your identity"
                          icon={User}
                          value={form.name}
                          onChange={handleChange('name')}
                          error={errors.name}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Input
                    label="Email Platform"
                    type="email"
                    placeholder="name@matrix.ai"
                    icon={Mail}
                    value={form.email}
                    onChange={handleChange('email')}
                    error={errors.email}
                  />

                  <Input
                    label="Access Key"
                    type="password"
                    placeholder="••••••••"
                    icon={Lock}
                    value={form.password}
                    onChange={handleChange('password')}
                    error={errors.password}
                  />

                  {error && (
                    <motion.div
                      className="auth-card__error"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {error}
                    </motion.div>
                  )}

                  <div className="auth-card__actions">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      isLoading={isLoading}
                      icon={ArrowRight}
                    >
                      {mode === 'login' ? 'Initialize Engine' : 'Begin Deployment'}
                    </Button>
                  </div>
                </form>

                <div className="auth-card__footer">
                   <button className="auth-card__switch" onClick={switchMode} type="button">
                    {mode === 'login' 
                      ? "Don't have access? Create Account" 
                      : "Already authorized? Sign In"}
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </div>
  );
}
