import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Send, Twitter, Linkedin, Facebook, Instagram, Hash, MessageSquare, Plus, Loader2, CheckCircle2, Globe
} from 'lucide-react';

const PLATFORMS = [
  { id: 'twitter', name: 'Twitter (X)', icon: <Twitter size={18} />, color: '#1DA1F2' },
  { id: 'linkedin', name: 'LinkedIn', icon: <Linkedin size={18} />, color: '#0A66C2' },
  { id: 'facebook', name: 'Facebook', icon: <Facebook size={18} />, color: '#1877F2' },
  { id: 'instagram', name: 'Instagram', icon: <Instagram size={18} />, color: '#E4405F' },
  { id: 'threads', name: 'Threads', icon: <Hash size={18} />, color: '#FFFFFF' },
];

const AutoPoster = () => {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['twitter', 'linkedin']);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploySuccess, setDeploySuccess] = useState(false);

  const handleGenerate = () => {
    if (!topic || topic.length < 3) return;
    setIsGenerating(true);
    setDeploySuccess(false);
    
    setTimeout(() => {
      // Mock AI generation
      setGeneratedPost(`Just exploring some fascinating ideas around ${topic}! 🚀 The future is moving faster than we think, and adapting to these changes is crucial for success.\n\nWhat are your thoughts on this? Let's discuss below! 👇\n\n#Innovation #${topic.replace(/\s+/g, '')} #FutureTech`);
      setIsGenerating(false);
    }, 2000);
  };

  const togglePlatform = (id) => {
    setSelectedPlatforms(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleDeploy = () => {
    if (!generatedPost || selectedPlatforms.length === 0) return;
    setIsDeploying(true);
    
    setTimeout(() => {
      setIsDeploying(false);
      setDeploySuccess(true);
    }, 3000);
  };

  return (
    <section id="auto-poster" className="container py-24 scroll-mt-24" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="section-label justify-center mb-3">
            <Sparkles size={13} style={{ color: '#a855f7' }} />
            <span style={{ color: '#c084fc' }}>AI Multi-Platform Publisher</span>
          </div>
          <h2 className="section-title mb-4">Create. Distribute. Automate.</h2>
          <p className="section-desc mx-auto text-center px-4">
            Out of ideas? Let AI generate high-converting social media posts and deploy them to 5 platforms simultaneously with one click.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* LEFT: Generation Panel */}
          <div className="md:col-span-3 glass-card p-6 md:p-8 flex flex-col gap-6" style={{ border: '1px solid rgba(139,92,246,0.2)' }}>
            <div>
               <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                  What do you want to post about?
               </label>
               <div style={{ display: 'flex', gap: '0.5rem' }}>
                 <input 
                   type="text" 
                   placeholder="e.g. Artificial Intelligence in 2026, My new startup journey..."
                   value={topic}
                   onChange={e => setTopic(e.target.value)}
                   style={{
                     flex: 1, padding: '0.875rem 1rem', background: 'rgba(0,0,0,0.5)',
                     border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem',
                     color: 'white', fontSize: '0.9rem', outline: 'none', fontFamily: 'var(--font-inter)'
                   }}
                 />
                 <button 
                   onClick={handleGenerate}
                   disabled={isGenerating || !topic}
                   style={{
                     padding: '0.875rem 1.5rem', background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                     color: 'white', fontWeight: 700, borderRadius: '0.75rem', border: 'none',
                     cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
                     boxShadow: '0 4px 15px rgba(124,58,237,0.3)', transition: 'all 0.2s', opacity: (!topic || isGenerating) ? 0.6 : 1
                   }}
                 >
                   {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                   Generate
                 </button>
               </div>
            </div>

            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
               <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                 <span>Post Content</span>
                 {generatedPost && <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{generatedPost.length} chars</span>}
               </label>
               <textarea 
                  value={generatedPost}
                  onChange={e => setGeneratedPost(e.target.value)}
                  placeholder="Generated AI content will appear here... Feel free to edit it before deploying."
                  style={{
                    width: '100%', flexGrow: 1, minHeight: '180px', padding: '1.25rem',
                    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '0.75rem', color: 'white', fontSize: '0.9rem', lineHeight: 1.6,
                    resize: 'none', outline: 'none', fontFamily: 'var(--font-inter)'
                  }}
               />
            </div>
          </div>

          {/* RIGHT: Deployment Panel */}
          <div className="md:col-span-2 glass-card p-6 md:p-8 flex flex-col gap-6" style={{ background: 'linear-gradient(180deg, rgba(12,20,44,0.5), rgba(0,0,0,0.8))' }}>
             <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                   <Globe size={18} style={{ color: '#a855f7' }} /> Distribution Network
                </h3>
                
                <div className="flex flex-col gap-3">
                  {PLATFORMS.map(p => {
                    const isSelected = selectedPlatforms.includes(p.id);
                    return (
                      <button 
                        key={p.id}
                        onClick={() => togglePlatform(p.id)}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '0.875rem 1.25rem', borderRadius: '0.75rem', border: '1px solid',
                          background: isSelected ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.3)',
                          borderColor: isSelected ? p.color : 'rgba(255,255,255,0.05)',
                          cursor: 'pointer', transition: 'all 0.2s'
                        }}
                      >
                        <div className="flex items-center gap-3">
                           <div style={{ color: isSelected ? p.color : 'var(--text-muted)' }}>{p.icon}</div>
                           <span style={{ fontSize: '0.9rem', fontWeight: 600, color: isSelected ? 'white' : 'var(--text-muted)' }}>{p.name}</span>
                        </div>
                        <div style={{
                          width: '18px', height: '18px', borderRadius: '4px', border: '1px solid',
                          borderColor: isSelected ? p.color : 'rgba(255,255,255,0.2)',
                          background: isSelected ? p.color : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          {isSelected && <CheckCircle2 size={12} color="white" />}
                        </div>
                      </button>
                    )
                  })}
                </div>
             </div>

             <div className="mt-auto">
               {deploySuccess ? (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                   style={{
                     padding: '1rem', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
                     borderRadius: '0.75rem', textAlign: 'center'
                   }}
                 >
                   <CheckCircle2 size={24} style={{ color: '#10b981', margin: '0 auto 0.5rem' }} />
                   <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#34d399' }}>Successfully deployed to {selectedPlatforms.length} networks!</p>
                 </motion.div>
               ) : (
                 <button
                   onClick={handleDeploy}
                   disabled={isDeploying || !generatedPost || selectedPlatforms.length === 0}
                   style={{
                     width: '100%', padding: '1rem', borderRadius: '0.75rem',
                     background: 'linear-gradient(135deg, #10b981, #059669)',
                     color: 'white', fontWeight: 700, border: 'none', cursor: 'pointer',
                     display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                     boxShadow: '0 4px 20px rgba(16,185,129,0.3)', transition: 'all 0.2s',
                     opacity: (!generatedPost || selectedPlatforms.length === 0 || isDeploying) ? 0.5 : 1
                   }}
                 >
                   {isDeploying ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                   {isDeploying ? 'Deploying to networks...' : `Deploy to ${selectedPlatforms.length} Networks`}
                 </button>
               )}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutoPoster;
