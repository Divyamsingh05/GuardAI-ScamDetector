import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Fingerprint, Globe, Activity, ShieldCheck, Zap, Eye, Lock, Users, BarChart2 } from 'lucide-react';

const FEATURES = [
  {
    icon: <Cpu size={22} />,
    title: 'Neural Pattern Matching',
    desc: 'Our AI engine cross-references inputs against 50M+ known scam templates for pinpoint accuracy.',
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.15)',
    badge: 'Core',
  },
  {
    icon: <Fingerprint size={22} />,
    title: 'Synthetic Content Detection',
    desc: 'Identifies machine-generated text and AI-driven impersonation attempts with 99.4% precision.',
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.15)',
    badge: 'AI',
  },
  {
    icon: <Globe size={22} />,
    title: 'Global Link Audit',
    desc: 'Real-time verification against 200+ global blacklists and malicious domain registries.',
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.15)',
    badge: 'Live',
  },
  {
    icon: <Activity size={22} />,
    title: 'Urgency Heuristics',
    desc: 'Detects psychological pressure tactics, manufactured scarcity and artificial urgency signals.',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.15)',
    badge: 'NLP',
  },
  {
    icon: <ShieldCheck size={22} />,
    title: 'Zero-Knowledge Privacy',
    desc: 'Your scans are processed ephemerally — nothing is stored, logged, or shared with third parties.',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.15)',
    badge: 'Privacy',
  },
  {
    icon: <Zap size={22} />,
    title: 'Sub-Second Analysis',
    desc: 'Enterprise-grade inference infrastructure delivers threat verdicts in under 400 milliseconds.',
    color: '#f97316',
    glow: 'rgba(249,115,22,0.15)',
    badge: 'Fast',
  },
  {
    icon: <BarChart2 size={22} />,
    title: 'Risk Score Reporting',
    desc: 'Granular risk characterization broken into threat vectors with severity ratings and evidence.',
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.15)',
    badge: 'Reports',
  },
  {
    icon: <Users size={22} />,
    title: 'Team API Access',
    desc: 'Integrate GuardAI directly into your product with our high-throughput REST & webhook API.',
    color: '#6366f1',
    glow: 'rgba(99,102,241,0.15)',
    badge: 'API',
  },
];

const STEPS = [
  { num: '01', title: 'Input Payload', desc: 'Paste any suspicious message, URL, or social media post into the encrypted console.' },
  { num: '02', title: 'Neural Analysis', desc: 'Our AI engine cross-references 50M+ threat patterns across multiple detection layers.' },
  { num: '03', title: 'Risk Report', desc: 'Receive a detailed, color-coded risk verdict with specific findings and evidence in seconds.' },
];

const TESTIMONIALS = [
  {
    quote: "GuardAI caught a sophisticated phishing attempt that bypassed our email filters. The accuracy is phenomenal — it's now part of our onboarding flow.",
    name: 'Sarah Chen',
    role: 'Head of Security, Veritas Capital',
    avatar: 'SC',
    color: '#3b82f6',
  },
  {
    quote: "We integrated the API in an afternoon. It's now protecting 200k users from social engineering attacks daily. The threat reports are incredibly actionable.",
    name: 'Marcus Webb',
    role: 'CTO, Nexus Labs',
    avatar: 'MW',
    color: '#8b5cf6',
  },
  {
    quote: "As someone who supports elderly relatives online, GuardAI has become my go-to for verifying suspicious messages. Saved my dad from a bank scam last week.",
    name: 'Priya Sharma',
    role: 'Software Engineer, Google',
    avatar: 'PS',
    color: '#10b981',
  },
];

const FeatureGrid = () => {
  const [activeTestimonial, setActiveTestimonial] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(i => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* ===== FEATURES ===== */}
      <section id="features" className="container py-24 scroll-mt-24" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="text-center mb-16">
          <div className="section-label justify-center mb-3">
            <ShieldCheck size={13} />
            Defense Capabilities
          </div>
          <h2 className="section-title mb-4">Multilayer AI Protection</h2>
          <p className="section-desc mx-auto text-center px-4">
            Eight specialized detection engines working in unison to neutralize modern cyber-fraud before it reaches your users.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="glass-card p-6 group hover-glow flex flex-col gap-4"
              style={{ cursor: 'default', position: 'relative', overflow: 'hidden' }}
            >
              {/* glow blob */}
              <div style={{
                position: 'absolute', top: '-20px', right: '-20px',
                width: '100px', height: '100px',
                background: f.glow,
                borderRadius: '50%',
                filter: 'blur(30px)',
                opacity: 0,
                transition: 'opacity 0.4s',
                pointerEvents: 'none',
              }} className="group-hover:opacity-100" />

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{
                  width: '48px', height: '48px',
                  background: `${f.color}10`,
                  border: `1px solid ${f.color}25`,
                  borderRadius: '0.75rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: f.color,
                  transition: 'all 0.3s',
                }} className="group-hover:scale-110">
                  {f.icon}
                </div>
                <span style={{
                  fontSize: '9px', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.12em',
                  color: f.color,
                  background: `${f.color}12`,
                  border: `1px solid ${f.color}25`,
                  borderRadius: '9999px',
                  padding: '2px 8px',
                }}>
                  {f.badge}
                </span>
              </div>

              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem', lineHeight: 1.3 }}>{f.title}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="container py-24 scroll-mt-24">
        <div className="text-center mb-16">
          <div className="section-label justify-center mb-3">
            <Zap size={13} />
            Process
          </div>
          <h2 className="section-title mb-4">How It Works</h2>
          <p className="section-desc mx-auto text-center px-4">
            Three simple steps from suspicious content to actionable threat intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {STEPS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="flex flex-col items-center text-center gap-5"
            >
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: '64px', height: '64px',
                  background: 'linear-gradient(135deg, rgba(37,99,235,0.2), rgba(139,92,246,0.15))',
                  border: '1px solid rgba(59,130,246,0.25)',
                  borderRadius: '1rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.25rem', fontWeight: 800, color: '#60a5fa',
                  fontFamily: 'Space Grotesk',
                  boxShadow: '0 4px 24px rgba(59,130,246,0.1)',
                }}>
                  {s.num}
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: 'calc(100% + 1rem)',
                    width: 'calc(100% + 2rem)',
                    height: '1px',
                    background: 'linear-gradient(90deg, rgba(59,130,246,0.4), rgba(59,130,246,0.05))',
                    display: 'none', // hidden on mobile
                  }} className="md:block" />
                )}
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>{s.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="container pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-label justify-center mb-3">
              <Users size={13} />
              Testimonials
            </div>
            <h2 className="section-title mb-2" style={{ fontSize: '1.8rem' }}>Trusted by Thousands</h2>
          </div>

          <div style={{ position: 'relative', minHeight: '200px' }}>
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: activeTestimonial === i ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                style={{ position: activeTestimonial === i ? 'relative' : 'absolute', inset: 0 }}
              >
                {activeTestimonial === i && (
                  <div className="glass-card p-8 md:p-10 text-center"
                    style={{ border: `1px solid ${t.color}20` }}>
                    <div style={{ fontSize: '3.5rem', lineHeight: 0.8, color: t.color, opacity: 0.3, marginBottom: '1.5rem', fontFamily: 'serif' }}>"</div>
                    <p style={{ fontSize: '1.05rem', color: 'var(--text-subtle)', lineHeight: 1.75, fontStyle: 'italic', marginBottom: '2rem', maxWidth: '540px', margin: '0 auto 2rem' }}>
                      "{t.quote}"
                    </p>
                    <div className="flex flex-col items-center gap-1">
                      <div style={{
                        width: '44px', height: '44px', borderRadius: '50%',
                        background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.8rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem',
                      }}>
                        {t.avatar}
                      </div>
                      <div style={{ fontWeight: 700, color: 'white', fontSize: '0.9rem' }}>{t.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.role}</div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                style={{
                  width: activeTestimonial === i ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '9999px',
                  background: activeTestimonial === i ? '#3b82f6' : 'rgba(255,255,255,0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureGrid;
