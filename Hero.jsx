import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Zap, ShieldCheck, Activity } from 'lucide-react';

const TYPED_PHRASES = [
  'Social Media Threats',
  'Phishing Attacks',
  'Scam Messages',
  'Malicious Links',
  'Fake Profiles',
];

const STATS = [
  { label: 'Active Scans', val: 1200000, suffix: '+', format: (n) => n >= 1e6 ? (n/1e6).toFixed(1)+'M' : n.toLocaleString() },
  { label: 'Detection Rate', val: 99.8, suffix: '%', format: (n) => n.toFixed(1) },
  { label: 'Uptime SLA', val: 99.99, suffix: '%', format: (n) => n.toFixed(2) },
  { label: 'Threats Banned', val: 450000, suffix: '+', format: (n) => n >= 1e3 ? (n/1e3).toFixed(0)+'k' : n },
];

function useCountUp(target, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(target * ease);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

const StatItem = ({ stat, started }) => {
  const raw = useCountUp(stat.val, 1800, started);
  return (
    <div className="text-center flex flex-col gap-1.5">
      <div className="text-2xl font-bold text-white font-os" style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}>
        {stat.format(raw)}{stat.suffix}
      </div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-bold">{stat.label}</div>
    </div>
  );
};

const Hero = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef(null);

  // Typed effect
  useEffect(() => {
    const phrase = TYPED_PHRASES[phraseIndex];
    let timeout;
    if (!isDeleting) {
      if (displayed.length < phrase.length) {
        timeout = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 65);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % TYPED_PHRASES.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, phraseIndex]);

  // IntersectionObserver for stat counters
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStatsStarted(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="relative overflow-hidden" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
      {/* Background orbs */}
      <div className="absolute pointer-events-none" style={{ inset: 0, zIndex: 0 }}>
        <div className="absolute animate-orb" style={{
          top: '-80px', left: '50%', transform: 'translateX(-50%)',
          width: '900px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(37,99,235,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        <div className="absolute animate-orb-delay" style={{
          top: '200px', left: '15%',
          width: '350px', height: '350px',
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        <div className="absolute animate-orb" style={{
          top: '100px', right: '10%',
          width: '280px', height: '280px',
          background: 'radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
      </div>

      <div className="container relative" style={{ zIndex: 1 }}>
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="badge badge-blue" style={{ gap: '0.5rem', padding: '0.375rem 1rem' }}>
              <span className="live-dot-blue" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3b82f6', display: 'inline-block', animation: 'livePulseBlue 2s infinite' }} />
              Next-Generation AI Threat Detection
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-extrabold text-white mb-6"
            style={{
              fontSize: 'clamp(2.6rem, 7vw, 5rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            AI-Powered Shield Against
            <br />
            <span className="gradient-text" style={{ minHeight: '1.2em', display: 'inline-block' }}>
              {displayed}
              <span className="animate-blink" style={{ marginLeft: '2px', color: '#3b82f6' }}>|</span>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg text-text-subtle max-w-2xl mx-auto mb-10 leading-relaxed px-4"
            style={{ fontWeight: 450 }}
          >
            Enterprise-grade fraud intelligence for everyone. Scan messages, verify links, 
            and audit suspicious content instantly with our neural threat engine — 
            100% private, no data stored.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 mb-16"
          >
            <a
              href="#scanner"
              className="btn-primary animate-glow-pulse"
              style={{ padding: '0.95rem 2.25rem', borderRadius: '0.75rem', fontSize: '1rem', textDecoration: 'none', width: '100%', maxWidth: '280px', justifyContent: 'center' }}
            >
              <Zap size={18} />
              Run Free Scan
              <ArrowRight size={16} />
            </a>
            <a
              href="#how-it-works"
              className="btn-ghost"
              style={{ padding: '0.95rem 2.25rem', borderRadius: '0.75rem', fontSize: '1rem', textDecoration: 'none', width: '100%', maxWidth: '280px', justifyContent: 'center' }}
            >
              <Play size={14} style={{ fill: 'white' }} />
              How It Works
            </a>
          </motion.div>

          {/* Trust signals row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 mb-20"
          >
            {[
              { icon: <ShieldCheck size={13} />, text: 'No data stored' },
              { icon: <Activity size={13} />, text: '99.8% accuracy' },
              { icon: <Zap size={13} />, text: 'Instant results' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 500 }}>
                <span style={{ color: '#34d399' }}>{icon}</span>
                {text}
              </div>
            ))}
          </motion.div>

          {/* Stats bar */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="pt-10 border-t border-white/5"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((stat) => (
                <StatItem key={stat.label} stat={stat} started={statsStarted} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
