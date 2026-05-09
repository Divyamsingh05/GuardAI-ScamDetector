import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Mail, Lock, User, ArrowRight, Github, Chrome, Loader2, CheckCircle2 } from 'lucide-react';

const AuthPage = ({ mode = 'login', onLogin, onNavigate }) => {
  const [isLogin, setIsLogin] = useState(mode === 'login');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        onLogin();
      }, 1500);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ background: 'var(--bg-main)', position: 'relative', overflow: 'hidden' }}>
      {/* Background Elements */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between" style={{ zIndex: 10, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <button onClick={() => onNavigate('home')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <div style={{ width: 40, height: 40, borderRadius: '12px', background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(59,130,246,0.2)' }}>
            <Shield size={20} color="#60a5fa" />
          </div>
          <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
            <div style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '1.2rem', color: 'white' }}>GuardAI</div>
            <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#60a5fa', fontWeight: 700 }}>Threat Labs</div>
          </div>
        </button>
        <button onClick={() => onNavigate('home')} style={{ fontSize: '0.85rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer' }}>
          Back to Home
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6" style={{ zIndex: 10 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? 'login' : 'signup'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="glass-card"
            style={{ width: '100%', maxWidth: '440px', padding: '2.5rem', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
          >
            {success ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle2 size={64} style={{ color: '#10b981', marginBottom: '1.5rem' }} />
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem', fontFamily: 'Outfit' }}>
                  {isLogin ? 'Welcome Back!' : 'Account Created!'}
                </h2>
                <p style={{ color: 'var(--text-muted)' }}>Redirecting to dashboard...</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem', fontFamily: 'Outfit' }}>
                    {isLogin ? 'Sign In to GuardAI' : 'Create an Account'}
                  </h1>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {isLogin ? 'Access your intelligence dashboard.' : 'Start scanning and neutralizing threats today.'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {!isLogin && (
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-subtle)', marginBottom: '0.5rem' }}>Full Name</label>
                      <div style={{ position: 'relative' }}>
                        <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input required type="text" placeholder="John Doe" style={{ width: '100%', padding: '0.875rem 1rem 0.875rem 2.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'white', fontSize: '0.9rem' }} />
                      </div>
                    </div>
                  )}

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-subtle)', marginBottom: '0.5rem' }}>Email Address</label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input required type="email" placeholder="you@company.com" style={{ width: '100%', padding: '0.875rem 1rem 0.875rem 2.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'white', fontSize: '0.9rem' }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-subtle)', marginBottom: '0.5rem' }}>Password</label>
                    <div style={{ position: 'relative' }}>
                      <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input required type="password" placeholder="••••••••" style={{ width: '100%', padding: '0.875rem 1rem 0.875rem 2.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'white', fontSize: '0.9rem' }} />
                    </div>
                  </div>

                  {isLogin && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <a href="#" style={{ fontSize: '0.8rem', color: '#60a5fa', textDecoration: 'none' }}>Forgot password?</a>
                    </div>
                  )}

                  <button type="submit" disabled={isProcessing} className="btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '0.5rem', borderRadius: '0.5rem', justifyContent: 'center', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', border: 'none', color: 'white', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
                    {isProcessing ? <><Loader2 size={18} className="animate-spin" /> Authenticating...</> : <>{isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={18} /></>}
                  </button>
                </form>

                <div style={{ display: 'flex', alignItems: 'center', margin: '2rem 0' }}>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                  <div style={{ padding: '0 1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>OR CONTINUE WITH</div>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                </div>

                <div className="flex gap-4">
                  <button style={{ flex: 1, padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>
                    <Chrome size={18} /> Google
                  </button>
                  <button style={{ flex: 1, padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>
                    <Github size={18} /> GitHub
                  </button>
                </div>

                <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: '#60a5fa', fontWeight: 700, cursor: 'pointer', padding: 0 }}>
                    {isLogin ? 'Sign up' : 'Log in'}
                  </button>
                </p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AuthPage;
