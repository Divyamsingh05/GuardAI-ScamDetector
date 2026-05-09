import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Globe, Zap, Award, Eye, Server, Cpu } from 'lucide-react';

const BADGES = [
  { icon: <ShieldCheck size={14} />, text: 'SOC2 Compliant' },
  { icon: <Lock size={14} />, text: 'AES-256 Encryption' },
  { icon: <Globe size={14} />, text: 'Global Threat Intel' },
  { icon: <Zap size={14} />, text: 'ISO 27001 Verified' },
  { icon: <Award size={14} />, text: 'GDPR Compliant' },
  { icon: <Eye size={14} />, text: 'Zero-Knowledge Policy' },
  { icon: <Server size={14} />, text: 'Distributed Infra' },
  { icon: <Cpu size={14} />, text: 'Neural AI Engine' },
];

const BadgeItem = ({ icon, text }) => (
  <div className="flex items-center gap-2 whitespace-nowrap"
    style={{ padding: '0 2.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
    <span style={{ color: '#60a5fa' }}>{icon}</span>
    <span>{text}</span>
  </div>
);

const TrustBar = () => {
  const [threatCount, setThreatCount] = useState(458312);

  useEffect(() => {
    const interval = setInterval(() => {
      setThreatCount(c => c + Math.floor(Math.random() * 3) + 1);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const doubled = [...BADGES, ...BADGES];

  return (
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)', paddingTop: '1rem', paddingBottom: '1rem' }}>
      {/* Marquee */}
      <div className="marquee-wrapper" style={{ paddingTop: '0.5rem', paddingBottom: '0.75rem' }}>
        <div className="marquee-track">
          {doubled.map((b, i) => (
            <BadgeItem key={i} icon={b.icon} text={b.text} />
          ))}
        </div>
      </div>

      {/* Live counter */}
      <div className="flex justify-center" style={{ paddingBottom: '0.5rem' }}>
        <div className="flex items-center gap-2" style={{
          background: 'rgba(16,185,129,0.06)',
          border: '1px solid rgba(16,185,129,0.15)',
          borderRadius: '9999px',
          padding: '0.3rem 1rem',
        }}>
          <span className="live-dot" />
          <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Threats Blocked Today:&nbsp;
          </span>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#34d399', fontFamily: 'Space Grotesk, monospace', letterSpacing: '-0.02em' }}>
            {threatCount.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
