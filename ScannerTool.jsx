import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, RefreshCcw, ShieldAlert, ShieldCheck, AlertTriangle, Info,
  Terminal, Activity, Cpu, Lock, Eye, Radar, Loader2, Clipboard,
  FileText, Share2, ChevronDown, ChevronUp, Zap, Clock, Image as ImageIcon, UploadCloud, X
} from 'lucide-react';
import { analyzeContent, verifyImageMock } from '../utils/detector';

const SAMPLE_THREATS = [
  { label: 'Phishing', icon: '📧', text: `URGENT: Your account suspended. Login to verify: http://secure-verify.tk` },
  { label: 'Crypto Scam', icon: '💰', text: `You're a winner! Claim $50,000 by investing just $500 in 10x profit scheme. http://cryptowin.xyz` },
  { label: 'Hinglish Scam', icon: '📞', text: `Bhai urgent problem mein hu, please 5000 paise bhej de. Mera UPI block ho gaya hai.` },
];

function ScoreRing({ score }) {
  const radius = 54;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (score / 100) * circ;
  const color = score > 60 ? '#ef4444' : score > 20 ? '#f59e0b' : '#10b981';
  return (
    <div style={{ position: 'relative', width: 130, height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="130" height="130" style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
        <circle cx="65" cy="65" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <motion.circle
          cx="65" cy="65" r={radius}
          fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }} animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          style={{ filter: `drop-shadow(0 0 8px ${color}88)` }}
        />
      </svg>
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: '1.75rem', fontWeight: 800, color, fontFamily: 'Space Grotesk', lineHeight: 1 }}>{score}%</div>
        <div style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', marginTop: '2px' }}>
          Risk Score
        </div>
      </div>
    </div>
  );
}

const ScannerTool = ({ userPlan, onUpgradeRequired }) => {
  const [activeTab, setActiveTab] = useState('text'); // 'text' | 'image'
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState(null);
  const [expandedFindings, setExpandedFindings] = useState({});
  const [history, setHistory] = useState([]);
  const [scanCount, setScanCount] = useState(0);

  const handleScanText = () => {
    if (userPlan === 'free' && scanCount >= 3) {
      if (onUpgradeRequired) onUpgradeRequired();
      return;
    }
    if (!inputText || inputText.length < 5) {
       setResults(null);
       setIsScanning(false);
       return;
    }
    setResults(null); setIsScanning(true); setExpandedFindings({});
    setTimeout(() => {
      const analysis = analyzeContent(inputText);
      setResults(analysis);
      setIsScanning(false);
      setScanCount(c => c + 1);
      setHistory(h => [{ type: 'text', text: inputText.slice(0, 50) + '…', score: analysis.score, level: analysis.level, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }, ...h].slice(0, 3));
    }, 1500); // slightly faster auto-scan
  };

  useEffect(() => {
    if (activeTab === 'text' && inputText.length >= 5) {
       const timer = setTimeout(() => {
          handleScanText();
       }, 500); // 500ms debounce
       return () => clearTimeout(timer);
    } else if (activeTab === 'text' && inputText.length < 5) {
       setResults(null);
    }
  }, [inputText, activeTab]);

  const handleScanImage = async (imageFile) => {
    if (userPlan === 'free' && scanCount >= 3) {
      if (onUpgradeRequired) onUpgradeRequired();
      return;
    }
    const fileToScan = imageFile || selectedImage;
    if (!fileToScan) return;
    setResults(null); setIsScanning(true); setExpandedFindings({});
    const analysis = await verifyImageMock(fileToScan);
    setResults(analysis);
    setIsScanning(false);
    setScanCount(c => c + 1);
    setHistory(h => [{ type: 'image', text: fileToScan.name, score: analysis.score, level: analysis.level, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }, ...h].slice(0, 3));
  };

  const handleReset = () => {
    setInputText(''); setSelectedImage(null); setSelectedImagePreview(null);
    setResults(null); setIsScanning(false); setExpandedFindings({});
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setSelectedImagePreview(URL.createObjectURL(file));
      setResults(null);
      // Auto trigger the verification
      handleScanImage(file);
    }
  };

  const charCount = inputText.length;
  const levelColor = results ? (results.score > 60 ? 'var(--danger)' : results.score > 20 ? 'var(--caution)' : 'var(--safe)') : 'var(--text-muted)';

  return (
    <section id="scanner" className="container py-24 scroll-mt-24">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="section-label justify-center mb-3"><Radar size={13} />Neural Diagnosis Engine</div>
          <h2 className="section-title mb-4">Scan & Neutralize Threats</h2>
          <p className="section-desc mx-auto text-center px-4">
            Paste any suspicious text, URL, or upload a payment screenshot to verify authenticity.
          </p>
        </div>

        {/* Component Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Input Panel */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* TABS */}
            <div className="flex gap-2">
              <button onClick={() => { setActiveTab('text'); handleReset(); }}
                style={{ flex: 1, padding: '0.75rem', borderRadius: '0.75rem', background: activeTab === 'text' ? '#2563eb' : 'rgba(255,255,255,0.05)', color: activeTab === 'text' ? 'white' : 'var(--text-muted)', fontWeight: 700, border: '1px solid transparent', borderColor: activeTab === 'text' ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.1)', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <FileText size={16} /> Text Payload
              </button>
              <button onClick={() => { setActiveTab('image'); handleReset(); }}
                style={{ flex: 1, padding: '0.75rem', borderRadius: '0.75rem', background: activeTab === 'image' ? '#8b5cf6' : 'rgba(255,255,255,0.05)', color: activeTab === 'image' ? 'white' : 'var(--text-muted)', fontWeight: 700, border: '1px solid transparent', borderColor: activeTab === 'image' ? 'rgba(139,92,246,0.5)' : 'rgba(255,255,255,0.1)', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <ImageIcon size={16} /> Screenshot Verification
              </button>
            </div>

            <div className="glass-card flex flex-col overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              {/* Terminal Frame header */}
              <div className="flex flex-wrap justify-between items-center px-5 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                <div className="flex items-center gap-2">
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ef4444', opacity: 0.7 }} />
                    <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#f59e0b', opacity: 0.7 }} />
                    <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#10b981', opacity: 0.7 }} />
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginLeft: '6px' }}>
                    <Terminal size={11} style={{ display: 'inline', marginRight: 4, color: activeTab === 'text' ? '#60a5fa' : '#c084fc' }} />
                    {activeTab === 'text' ? 'Encrypted Text Console' : 'Optical Analysis Engine'}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col gap-5" style={{ flexGrow: 1 }}>
                
                {/* TEXT MODE */}
                {activeTab === 'text' && (
                  <>
                    <div className="flex flex-wrap gap-2 mb-1">
                      {SAMPLE_THREATS.map((s) => (
                        <button key={s.label} onClick={() => setInputText(s.text)} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.3rem 0.75rem', background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '9999px', color: '#93c5fd', fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer' }}>
                          <span>{s.icon}</span> {s.label}
                        </button>
                      ))}
                    </div>
                    <div className="scanner-area" style={{ flexGrow: 1 }}>
                      <textarea className="scanner-input" style={{ minHeight: '180px' }} placeholder="[Awaiting input…] Paste suspicious Hindi/English text or link…" value={inputText} onChange={(e) => setInputText(e.target.value)} disabled={isScanning} />
                      {isScanning && <div className="scanner-laser" />}
                    </div>
                  </>
                )}

                {/* IMAGE MODE */}
                {activeTab === 'image' && (
                  <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    {!selectedImagePreview ? (
                      <label style={{ flexGrow: 1, border: '2px dashed rgba(139,92,246,0.3)', borderRadius: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(139,92,246,0.03)', cursor: 'pointer', padding: '3rem', transition: 'all 0.3s' }} className="hover:bg-purple-600/10 hover:border-purple-500/40">
                        <UploadCloud size={48} style={{ color: '#a855f7', marginBottom: '1rem' }} />
                        <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem', textAlign: 'center' }}>Upload Receipt or Chat Screenshot</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Drag and drop or click to browse (JPG, PNG)</span>
                        <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                      </label>
                    ) : (
                      <div style={{ flexGrow: 1, position: 'relative', borderRadius: '1rem', overflow: 'hidden', padding: '0.5rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <img src={selectedImagePreview} alt="Preview" style={{ width: '100%', height: '240px', objectFit: 'contain' }} />
                        {isScanning && <div className="scanner-laser scanner-laser-purple" />}
                        <button onClick={handleReset} disabled={isScanning} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.5rem', borderRadius: '0.5rem', cursor: 'pointer' }}>
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <button onClick={handleReset} className="btn-ghost flex items-center justify-center gap-2 py-3 px-4 text-sm" style={{ borderRadius: '0.625rem' }} disabled={isScanning}>
                    <RefreshCcw size={15} /> Reset
                  </button>
                  <button
                    onClick={activeTab === 'text' ? handleScanText : handleScanImage}
                    disabled={isScanning || (activeTab === 'text' ? charCount < 5 : !selectedImage)}
                    className="btn-primary animate-glow-pulse"
                    style={{ flex: 1, borderRadius: '0.625rem', padding: '0.75rem 1.5rem', fontSize: '0.9rem', justifyContent: 'center', background: activeTab === 'image' ? 'linear-gradient(135deg, #7c3aed, #6d28d9)' : 'linear-gradient(135deg, #2563eb, #1d4ed8)', boxShadow: activeTab === 'image' ? '0 4px 20px rgba(124,58,237,0.4)' : undefined }}
                  >
                    {isScanning ? <><Loader2 size={16} className="animate-spin" /> {activeTab === 'text' ? 'Analyzing…' : 'Extracting Metadata…'}</> : <><Radar size={16} /> {activeTab === 'image' ? 'Verify Screenshot' : 'Scan Payload'}</>}
                  </button>
                </div>
              </div>
            </div>

            {/* History Mini-Log */}
            {history.length > 0 && (
              <div className="glass-card p-4" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={11} style={{ color: '#60a5fa' }} /> Recent Scans
                </div>
                <div className="flex flex-col gap-2">
                  {history.map((h, i) => (
                    <div key={i} className="flex items-center justify-between gap-4 px-3 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div className="flex items-center gap-2" style={{ flex: 1, overflow: 'hidden' }}>
                        {h.type === 'image' ? <ImageIcon size={12} style={{ color: '#a855f7', flexShrink: 0 }} /> : <FileText size={12} style={{ color: '#60a5fa', flexShrink: 0 }} />}
                        <span style={{ fontSize: '11px', color: 'var(--text-subtle)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{h.text}</span>
                      </div>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: h.score > 60 ? 'var(--danger)' : h.score > 20 ? 'var(--caution)' : 'var(--safe)', flexShrink: 0 }}>{h.score}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results Sidebar */}
          <div className="flex flex-col gap-5">
            <AnimatePresence mode="wait">
              {isScanning ? (
                <motion.div key="scanning" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="glass-card p-10 flex flex-col items-center justify-center text-center gap-5" style={{ flex: 1, border: activeTab === 'image' ? '1px solid rgba(139,92,246,0.2)' : '1px solid rgba(59,130,246,0.2)' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', border: activeTab === 'image' ? '2px solid rgba(139,92,246,0.2)' : '2px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Radar size={28} style={{ color: activeTab === 'image' ? '#a855f7' : '#3b82f6' }} className="animate-pulse" />
                    </div>
                    <div style={{ position: 'absolute', inset: -10, borderRadius: '50%', border: activeTab === 'image' ? '2px solid rgba(139,92,246,0.08)' : '2px solid rgba(59,130,246,0.08)', animation: 'spin 3s linear infinite' }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Space Grotesk', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: activeTab === 'image' ? '#c084fc' : '#60a5fa', marginBottom: '0.5rem' }}>{activeTab === 'image' ? 'Image Analysis Active' : 'Neural Analysis Active'}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{activeTab === 'image' ? 'Running OCR & pixel forensics…' : 'Cross-referencing threat templates…'}</p>
                  </div>
                </motion.div>
              ) : results ? (
                <motion.div key={`result-${results.score}`} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} className="flex flex-col gap-4">
                  <div className="glass-card p-6 flex flex-col items-center text-center gap-4" style={{ border: `1px solid ${levelColor}33` }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)' }}>
                      {activeTab === 'image' ? 'Authenticity Verdict' : 'Risk Characterization'}
                    </div>
                    <ScoreRing score={results.score} />
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: levelColor, fontFamily: 'Space Grotesk' }}>{results.level}</div>
                    <div className="progress-track w-full flex-shrink-0">
                      <motion.div className="progress-fill" style={{ background: levelColor, boxShadow: `0 0 10px ${levelColor}66` }} initial={{ width: 0 }} animate={{ width: `${results.score}%` }} transition={{ duration: 1.5, ease: 'easeOut' }} />
                    </div>
                    {/* Summary box */}
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '0.625rem', padding: '0.75rem', fontSize: '11px', color: 'var(--text-subtle)', lineHeight: 1.6, textAlign: 'left', width: '100%' }}>
                      {activeTab === 'image' ? (
                        <>
                           <span style={{ fontWeight: 700, color: '#c084fc' }}>Forensic Match: </span>
                           {results.score > 60 ? 'Strong evidence of fraud or manipulation found. The system detected inconsistent metadata or malicious extracted text (OCR) associated with known scam patterns.' : 'No manipulation vectors or known malicious signatures detected. EXIF metadata and text appear consistent.'}
                        </>
                      ) : (
                        <>
                           <span style={{ fontWeight: 700, color: '#60a5fa' }}>AI Summary: </span>
                           {results.score > 60 ? 'Multiple high-severity threat vectors detected. This content exhibits strong indicators of a coordinated fraud attempt.' : results.score > 20 ? 'Moderate risk signals identified. Content shows some suspicious patterns that warrant verification.' : 'No significant threat indicators found. Content appears safe.'}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="glass-card p-5" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                    <h3 style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <ShieldAlert size={13} style={{ color: activeTab === 'image' ? '#c084fc' : '#60a5fa' }} /> {activeTab === 'image' ? 'Visual Threat Findings' : 'Neural Findings'} ({results.findings.length})
                    </h3>
                    <div className="flex flex-col gap-3">
                      {results.findings.length > 0 ? results.findings.map((f, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${f.severity === 'high' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.15)'}`, borderRadius: '0.625rem', overflow: 'hidden' }}>
                          <button onClick={() => setExpandedFindings(prev => ({ ...prev, [i]: !prev[i] }))} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', padding: '0.625rem 0.75rem', background: 'none', border: 'none', cursor: 'pointer', color: 'white', fontFamily: 'inherit' }}>
                            <div className="flex items-center gap-2 text-left">
                              {f.severity === 'high' ? <AlertTriangle size={12} style={{ color: 'var(--danger)', flexShrink: 0 }} /> : <Info size={12} style={{ color: 'var(--caution)', flexShrink: 0 }} />}
                              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.2 }}>{f.category}</span>
                            </div>
                            {expandedFindings[i] ? <ChevronUp size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} /> : <ChevronDown size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />}
                          </button>
                          {expandedFindings[i] && (
                            <div style={{ padding: '0 0.75rem 0.625rem', fontSize: '10px', color: activeTab === 'image' ? '#d8b4fe' : '#93c5fd', fontFamily: 'Space Grotesk', lineHeight: 1.6, background: 'rgba(0,0,0,0.15)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                              MATCH: "{f.matches.join('", "')}"
                            </div>
                          )}
                        </div>
                      )) : (
                        <div className="text-center py-6 flex flex-col items-center gap-3">
                          <ShieldCheck size={36} style={{ color: 'var(--safe)' }} />
                          <div>
                            <p style={{ fontFamily: 'Space Grotesk', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--safe)' }}>Clean Signature</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="glass-card p-10 flex flex-col items-center justify-center text-center gap-5" style={{ flex: 1, border: '1px dashed rgba(255,255,255,0.08)', opacity: 0.5 }}>
                  <Radar size={40} style={{ color: activeTab === 'image' ? '#a855f7' : '#3b82f6' }} />
                  <div>
                    <p style={{ fontFamily: 'Space Grotesk', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'white', marginBottom: '0.5rem' }}>Standby</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Input payload required to begin scanning sequence.</p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .scanner-laser {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, transparent, #3b82f6, #8b5cf6, transparent);
          animation: scanLaserAnim 2s ease-in-out infinite; z-index: 10;
        }
        .scanner-laser-purple {
          background: linear-gradient(90deg, transparent, #a855f7, #ec4899, transparent);
        }
        @keyframes scanLaserAnim {
          0% { transform: translateY(0); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateY(220px); opacity: 0; }
        }
      `}} />
    </section>
  );
};

export default ScannerTool;
