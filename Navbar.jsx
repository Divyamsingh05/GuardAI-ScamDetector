import React, { useState, useEffect } from 'react';
import { Shield, Menu, X, ChevronRight, Zap, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Scanner', href: '#scanner' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
];

const Navbar = ({ userPlan }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.replace('#', ''));
    const observers = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass py-3 shadow-2xl border-b border-white/5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 cursor-pointer group" style={{ textDecoration: 'none' }}>
          <div style={{
            padding: '0.5rem',
            background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            borderRadius: '0.625rem',
            boxShadow: '0 4px 16px rgba(37,99,235,0.4)',
            transition: 'all 0.3s',
          }}
            className="group-hover:scale-110"
          >
            <Shield size={20} color="white" />
          </div>
          <div style={{ lineHeight: 1.1 }}>
            <div className="font-mono font-bold text-xl tracking-tighter text-white">
              GuardAI
              {userPlan === 'pro' && (
                <span style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', color: 'white', fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', marginLeft: '8px', verticalAlign: 'middle' }}>PRO</span>
              )}
            </div>
            <div className="text-[9px] uppercase tracking-[0.2em] text-blue-400 font-bold">Threat Labs</div>
          </div>
          {/* Live badge */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full"
            style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <span className="live-dot" />
            <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.15em', color: '#34d399', textTransform: 'uppercase' }}>
              Live
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => {
            const id = href.replace('#', '');
            const isActive = activeSection === id;
            return (
              <a
                key={label}
                href={href}
                style={{ textDecoration: 'none', position: 'relative', paddingBottom: '2px' }}
                className={`text-sm font-medium transition-colors group ${
                  isActive ? 'text-white' : 'text-text-muted hover:text-white'
                }`}
              >
                {label}
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  height: '2px',
                  borderRadius: '9999px',
                  background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                  width: isActive ? '100%' : '0%',
                  transition: 'width 0.3s ease',
                }} className="group-hover:w-full" />
              </a>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button className="btn-ghost text-sm py-2 px-5">
            Log In
          </button>
          <button
            className="btn-primary text-sm py-2.5 px-5 animate-glow-pulse"
            style={{ borderRadius: '0.625rem', fontFamily: 'inherit' }}
          >
            <Zap size={14} />
            Try Free
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-white rounded-lg transition-all hover:bg-white/5"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 glass border-t border-white/5 p-6 flex flex-col gap-5"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={{ textDecoration: 'none' }}
                onClick={() => setMobileMenuOpen(false)}
                className="font-medium text-white hover:text-blue-400 transition-colors"
              >
                {label}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
              {isLoggedIn ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem', color: 'white' }}>
                      {userName?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <span style={{ fontWeight: 600, color: 'white' }}>{userName}</span>
                  </div>
                  <button onClick={() => { onLogout(); setMobileMenuOpen(false); }} className="btn-ghost w-full justify-center py-3"><LogOut size={15} /> Logout</button>
                </>
              ) : (
                <>
                  <button onClick={() => { onNavigate('auth'); setMobileMenuOpen(false); }} className="btn-ghost w-full justify-center py-3">Sign In</button>
                  <button onClick={() => { onNavigate('auth'); setMobileMenuOpen(false); }} className="btn-primary w-full justify-center py-3">
                    <Zap size={15} />
                    Get Started
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
