import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import ScannerTool from './components/ScannerTool';
import FeatureGrid from './components/FeatureGrid';
import Modal from './components/Modal';
import {
  Shield, ExternalLink, ChevronRight, Globe, Github, Twitter, Linkedin,
  ArrowUp, Mail, Zap, ShieldCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FooterCol = ({ title, links }) => (
  <div>
    <h4 style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>{title}</h4>
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
      {links.map(l => (
        <li key={l.label}>
          <button onClick={l.onClick} style={{ textDecoration: 'none', fontSize: '0.875rem', color: 'var(--text-muted)', transition: 'color 0.2s', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}
            onMouseEnter={e => e.target.style.color = 'white'}
            onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
          >{l.label}</button>
        </li>
      ))}
    </ul>
  </div>
);

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [userPlan, setUserPlan] = useState('free');
  const [modalState, setModalState] = useState({ isOpen: false, type: '', infoTitle: '', infoContent: null });

  const openModal = (type, infoTitle = '', infoContent = null) => {
    setModalState({ isOpen: true, type, infoTitle, infoContent });
  };

  useEffect(() => {
    const h = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.includes('@')) { setSubscribed(true); setEmail(''); }
  };

  return (
    <div className="app">
      <Navbar userPlan={userPlan} />

      <main>
        <Hero />
        <TrustBar />
        <ScannerTool userPlan={userPlan} onUpgradeRequired={() => openModal('checkout')} />
        <FeatureGrid />

        {/* CTA Section */}
        <section className="container py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              position: 'relative', borderRadius: '2rem', overflow: 'hidden', padding: '4rem 2rem', textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(139,92,246,0.1) 50%, rgba(6,182,212,0.07) 100%)',
              border: '1px solid rgba(59,130,246,0.2)',
              boxShadow: '0 0 80px rgba(37,99,235,0.1), 0 20px 60px rgba(0,0,0,0.4)',
            }}
          >
            {/* BG blobs */}
            <div style={{ position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '200px', background: 'radial-gradient(ellipse, rgba(59,130,246,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '560px', margin: '0 auto' }}>
              <div className="section-label justify-center mb-4"><Zap size={13} />Get Started Today</div>
              <h2 style={{ fontFamily: 'Outfit', fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontWeight: 800, color: 'white', marginBottom: '1rem', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
                Protect Yourself From<br />
                <span className="gradient-text">Every Digital Threat</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.7, fontSize: '1rem' }}>
                Join 50,000+ users who trust GuardAI to keep them safe online. Start your free scan now — no account required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#scanner" className="btn-primary animate-glow-pulse"
                  style={{ padding: '1rem 2rem', borderRadius: '0.75rem', textDecoration: 'none', fontSize: '0.95rem' }}>
                  <ShieldCheck size={17} /> Run Free Scan <ChevronRight size={15} />
                </a>
                <button onClick={() => openModal('checkout')} className="btn-ghost" style={{ padding: '1rem 2rem', borderRadius: '0.75rem', fontSize: '0.95rem' }}>
                  <ExternalLink size={15} /> Upgrade to PRO
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ paddingTop: '5rem', paddingBottom: '3rem', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(3,5,8,0.95)' }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ padding: '0.45rem', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', borderRadius: '0.5rem', boxShadow: '0 4px 12px rgba(37,99,235,0.4)' }}>
                  <Shield size={18} color="white" />
                </div>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'Space Grotesk', letterSpacing: '-0.02em' }}>GuardAI</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '220px', marginBottom: '1.5rem' }}>
                The world's most advanced AI-driven scanner for detecting fraud and malicious content. Protecting the digital frontier.
              </p>
              {/* Newsletter */}
              {subscribed ? (
                <div className="flex items-center gap-2" style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 600 }}>
                  <ShieldCheck size={14} /> You're subscribed!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="email" placeholder="Your email"
                    value={email} onChange={e => setEmail(e.target.value)}
                    style={{
                      flex: 1, padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem',
                      color: 'white', fontSize: '0.8rem', fontFamily: 'inherit', outline: 'none',
                    }}
                  />
                  <button type="submit" style={{ padding: '0.5rem 0.875rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700, fontFamily: 'inherit' }}>
                    <Mail size={14} />
                  </button>
                </form>
              )}
            </div>

            <FooterCol title="Legal & Info" links={[
              { label: 'About Us', onClick: () => openModal('info', 'About GuardAI', <div><p style={{ marginBottom: '1rem' }}>GuardAI Threat Labs was founded in 2024 to combat the ever-growing rise of digital phishing and impersonation fraud.</p><p>Using advanced neural networks and pixel forensics, we secure thousands of individual users and enterprise operations worldwide against modern manipulation vectors.</p></div>) },
              { label: 'Contact Support', onClick: () => openModal('contact') },
              { label: 'Privacy Policy', onClick: () => openModal('info', 'Privacy Policy', <div><p style={{ marginBottom: '1rem' }}>We take your privacy seriously. Scanned data is end-to-end encrypted and deleted immediately from our servers after analysis, unless you explicitly save it in your local history.</p><p>We will never sell or share your telemetry with third parties without your explicit legal consent.</p></div>) },
              {
                label: 'API Documentation', onClick: () => openModal('info', 'API Documentation', <div><p style={{ marginBottom: '1rem' }}>Integration is seamless. Make a POST request to <code>https://api.guardai.io/v1/scan</code>.</p><pre style={{ background: '#0a0a0a', padding: '1rem', borderRadius: '0.5rem', color: '#34d399', fontSize: '13px' }}><code>{`curl -X POST \\
  -H "Authorization: Bearer YOUR_KEY" \\
  -d '{"payload": "Suspicious text"}' \\
  https://api.guardai.io/v1/scan`}</code></pre></div>)
              }
            ]} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}
            className="md:flex-row md:items-center md:justify-between">
            <p style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(100,116,139,0.6)' }}>
              © 2026 Guard AI Threat Labs. All rights reserved. <span style={{ color: '#60a5fa', marginLeft: '0.5rem' }}>Developed by Divyam Singh</span>
            </p>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              {[<Github size={16} />, <Twitter size={16} />, <Linkedin size={16} />, <Globe size={16} />].map((icon, i) => (
                <a key={i} href="#"
                  style={{ color: 'rgba(100,116,139,0.6)', transition: 'color 0.2s', display: 'flex' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'white'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(100,116,139,0.6)'}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="scroll-top-btn"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      <Modal
        isOpen={modalState.isOpen}
        onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
        type={modalState.type}
        infoTitle={modalState.infoTitle}
        infoContent={modalState.infoContent}
        onUpgrade={() => setUserPlan('pro')}
      />
    </div>
  );
}

export default App;
