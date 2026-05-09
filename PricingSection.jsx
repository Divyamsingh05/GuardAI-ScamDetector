import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Zap, Shield, Building2, Star } from 'lucide-react';

const PLANS = [
  {
    name: 'Free', icon: <Shield size={20} />,
    price: { monthly: 0, annual: 0 },
    desc: 'For individuals exploring threat detection.',
    borderColor: 'rgba(255,255,255,0.1)', textColor: 'var(--text-main)', badge: null,
    features: [
      { text: '50 scans / month', ok: true }, { text: 'Basic threat detection', ok: true },
      { text: 'Risk score & verdict', ok: true }, { text: 'Link blacklist check', ok: true },
      { text: 'Detailed findings breakdown', ok: false }, { text: 'Scan history', ok: false },
      { text: 'API access', ok: false }, { text: 'Priority support', ok: false },
    ],
    cta: 'Get Started Free', ctaStyle: 'ghost',
  },
  {
    name: 'Pro', icon: <Zap size={20} />,
    price: { monthly: 19, annual: 14 },
    desc: 'For power users who need deep threat intelligence.',
    borderColor: 'rgba(59,130,246,0.4)', textColor: '#60a5fa', badge: 'Most Popular',
    features: [
      { text: '5,000 scans / month', ok: true }, { text: 'Advanced neural detection', ok: true },
      { text: 'Risk score & verdict', ok: true }, { text: 'Link blacklist check', ok: true },
      { text: 'Detailed findings breakdown', ok: true }, { text: 'Scan history (90 days)', ok: true },
      { text: 'API access (5k calls/mo)', ok: true }, { text: 'Priority support', ok: false },
    ],
    cta: 'Start Pro Trial', ctaStyle: 'primary',
  },
  {
    name: 'Enterprise', icon: <Building2 size={20} />,
    price: { monthly: null, annual: null },
    desc: 'Custom solutions for teams and organizations.',
    borderColor: 'rgba(139,92,246,0.25)', textColor: '#c084fc', badge: null,
    features: [
      { text: 'Unlimited scans', ok: true }, { text: 'Full neural detection suite', ok: true },
      { text: 'Risk score & verdict', ok: true }, { text: 'Link blacklist check', ok: true },
      { text: 'Detailed findings breakdown', ok: true }, { text: 'Unlimited scan history', ok: true },
      { text: 'Unlimited API access', ok: true }, { text: 'Dedicated support & SLA', ok: true },
    ],
    cta: 'Contact Sales', ctaStyle: 'ghost-purple',
  },
];

const PricingSection = ({ onUpgrade, onContact }) => {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="container py-24 scroll-mt-24" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="text-center mb-14">
        <div className="section-label justify-center mb-3"><Star size={13} />Pricing</div>
        <h2 className="section-title mb-4">Simple, Transparent Pricing</h2>
        <p className="section-desc mx-auto text-center px-4 mb-8">Start free. Scale as you grow. No hidden fees.</p>
        <div className="flex items-center justify-center gap-4">
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: !annual ? 'white' : 'var(--text-muted)', transition: 'color 0.3s' }}>Monthly</span>
          <button onClick={() => setAnnual(!annual)} className={`toggle-track ${annual ? 'active' : ''}`}>
            <div className="toggle-thumb" />
          </button>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: annual ? 'white' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Annual
            <span style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#34d399', fontSize: '10px', fontWeight: 700, padding: '1px 8px', borderRadius: '9999px' }}>Save 25%</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {PLANS.map((plan, i) => (
          <motion.div key={plan.name}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            style={{
              background: plan.badge ? 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(139,92,246,0.1))' : plan.name === 'Enterprise' ? 'rgba(139,92,246,0.06)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${plan.borderColor}`,
              borderRadius: '1.5rem', padding: '2rem',
              display: 'flex', flexDirection: 'column', gap: '1.5rem',
              position: 'relative', overflow: 'hidden',
              boxShadow: plan.badge ? '0 0 40px rgba(59,130,246,0.12), 0 20px 60px rgba(0,0,0,0.4)' : '0 20px 60px rgba(0,0,0,0.3)',
            }}
          >
            {plan.badge && (
              <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'linear-gradient(135deg, #2563eb, #7c3aed)', color: 'white', fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '9999px' }}>
                {plan.badge}
              </div>
            )}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.75rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '0.625rem', background: `${plan.borderColor}22`, border: `1px solid ${plan.borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: plan.textColor }}>{plan.icon}</div>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white' }}>{plan.name}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{plan.desc}</p>
            </div>
            <div>
              {plan.price.monthly !== null ? (
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', fontFamily: 'Outfit', letterSpacing: '-0.03em', lineHeight: 1 }}>${annual ? plan.price.annual : plan.price.monthly}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>/mo</span>
                </div>
              ) : (
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white', fontFamily: 'Outfit' }}>Custom</div>
              )}
              {annual && plan.price.monthly > 0 && (
                <div style={{ fontSize: '11px', color: '#34d399', marginTop: '0.25rem', fontWeight: 600 }}>Save ${(plan.price.monthly - plan.price.annual) * 12}/yr</div>
              )}
            </div>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem', flex: 1 }}>
              {plan.features.map((f, j) => (
                <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.85rem', color: f.ok ? 'var(--text-subtle)' : 'rgba(100,116,139,0.4)' }}>
                  {f.ok ? <Check size={14} style={{ color: '#10b981', flexShrink: 0 }} /> : <X size={14} style={{ color: 'rgba(100,116,139,0.4)', flexShrink: 0 }} />}
                  {f.text}
                </li>
              ))}
            </ul>
            <button style={{
              width: '100%', padding: '0.875rem', borderRadius: '0.75rem', fontWeight: 700,
              fontSize: '0.9rem', fontFamily: 'inherit', cursor: 'pointer', transition: 'all 0.3s',
              ...(plan.ctaStyle === 'primary'
                ? { background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: 'white', border: 'none', boxShadow: '0 4px 20px rgba(37,99,235,0.4)' }
                : plan.ctaStyle === 'ghost-purple'
                ? { background: 'rgba(139,92,246,0.1)', color: '#c084fc', border: '1px solid rgba(139,92,246,0.3)' }
                : { background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }),
            }}
            onClick={plan.name === 'Enterprise' ? onContact : onUpgrade}
            >
              {plan.cta}
            </button>
          </motion.div>
        ))}
      </div>
      <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', marginTop: '2rem' }}>
        14-day free trial included. No credit card required. Cancel anytime.
      </p>
    </section>
  );
};

export default PricingSection;
