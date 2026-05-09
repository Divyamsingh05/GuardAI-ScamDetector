import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, ShieldCheck, Mail, Loader2, CheckCircle2 } from 'lucide-react';

const Modal = ({ isOpen, onClose, type, infoTitle, infoContent, onUpgrade }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onUpgrade();
        onClose();
        setIsSuccess(false);
      }, 1500);
    }, 2000);
  };

  const preventClick = (e) => e.stopPropagation();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={preventClick}
          className="glass-card flex flex-col overflow-hidden"
          style={{ width: '100%', maxWidth: type === 'info' ? '600px' : '480px', maxHeight: '90vh', border: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}
        >
          <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1.25rem', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'var(--text-muted)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}>
            <X size={16} />
          </button>

          {type === 'checkout' && (
            <div style={{ padding: '2.5rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', boxShadow: '0 0 20px rgba(124,58,237,0.4)' }}>
                  <ShieldCheck size={24} color="white" />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem', fontFamily: 'Outfit' }}>Upgrade to PRO</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-subtle)' }}>Unlock unlimited neural scans and API access.</p>
              </div>

              {isSuccess ? (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <CheckCircle2 size={48} style={{ color: '#10b981', margin: '0 auto 1rem' }} />
                  <h4 style={{ color: '#34d399', fontSize: '1.2rem', fontWeight: 700 }}>Payment Successful!</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Your account is now PRO.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleCheckout} className="flex flex-col gap-4">
                  <div style={{ background: 'rgba(0,0,0,0.5)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Pro Subscription</span>
                    <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white' }}>$19.00<span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>/mo</span></span>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-subtle)', marginBottom: '0.5rem' }}>Email Address</label>
                    <input required type="email" placeholder="you@company.com" style={{ width: '100%', padding: '0.875rem 1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'white', fontSize: '0.9rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-subtle)', marginBottom: '0.5rem' }}>Card Information</label>
                    <div style={{ position: 'relative' }}>
                      <CreditCard size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input required type="text" placeholder="0000 0000 0000 0000" style={{ width: '100%', padding: '0.875rem 1rem 0.875rem 2.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'white', fontSize: '0.9rem' }} />
                    </div>
                  </div>
                  <button type="submit" disabled={isProcessing} style={{ width: '100%', padding: '1rem', marginTop: '1rem', background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 15px rgba(124,58,237,0.3)', transition: 'all 0.2s', opacity: isProcessing ? 0.7 : 1 }}>
                    {isProcessing ? <><Loader2 size={18} className="animate-spin" /> Processing...</> : 'Send Payment & Upgrade'}
                  </button>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.5rem' }}>Secure mock 256-bit AES encryption.</p>
                </form>
              )}
            </div>
          )}

          {type === 'contact' && (
            <div style={{ padding: '2.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem', fontFamily: 'Outfit' }}>Contact Enterprise Sales</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-subtle)', marginBottom: '2rem' }}>Our team will reach out to schedule a custom deployment consultation.</p>
              
              {isSuccess ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <CheckCircle2 size={48} style={{ color: '#10b981', margin: '0 auto 1rem' }} />
                  <h4 style={{ color: 'white', fontSize: '1.2rem', fontWeight: 700 }}>Request Sent!</h4>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setIsProcessing(true); setTimeout(() => { setIsProcessing(false); setIsSuccess(true); setTimeout(()=>onClose(), 2000) }, 1500) }} className="flex flex-col gap-4">
                  <input required type="text" placeholder="Full Name" style={{ width: '100%', padding: '0.875rem 1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'white' }} />
                  <input required type="email" placeholder="Work Email" style={{ width: '100%', padding: '0.875rem 1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'white' }} />
                  <button type="submit" disabled={isProcessing} style={{ width: '100%', padding: '1rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {isProcessing ? <Loader2 size={18} className="animate-spin" /> : 'Request Demo'}
                  </button>
                </form>
              )}
            </div>
          )}

          {type === 'info' && (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', maxHeight: '80vh' }}>
              <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
                 <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', fontFamily: 'Outfit' }}>{infoTitle}</h3>
              </div>
              <div style={{ padding: '2rem', overflowY: 'auto', color: 'var(--text-main)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                 {infoContent}
              </div>
            </div>
          )}

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
