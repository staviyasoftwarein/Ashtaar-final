import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useSetting } from '../hooks/useSetting';
import { DEFAULT_CAREERS, resolveCareerImageUrl, type CareersConfig } from '../lib/careers';

export default function Careers() {
  const { value: cfg } = useSetting<CareersConfig>('careers', DEFAULT_CAREERS);
  const rolesData = (cfg.roles ?? DEFAULT_CAREERS.roles).filter((r) => r.active);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showRoles, setShowRoles] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', url: '', letter: '' });
  const [isSubmittng, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
      setSubmitStatus(null);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; }
  }, [selectedIndex]);

  // Warm the browser cache for every active role's hover image so the first
  // hover doesn't have to wait on a network fetch. Re-runs only when the URL
  // list actually changes.
  useEffect(() => {
    const urls = rolesData
      .map((r) => resolveCareerImageUrl(r.imagePath))
      .filter(Boolean);
    const handles = urls.map((u) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = u;
      return img;
    });
    return () => {
      // Drop refs so the GC can release if the user leaves the section quickly.
      handles.forEach((h) => { h.src = ''; });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rolesData.map((r) => r.imagePath).join('|')]);

  const selectedData = selectedIndex !== null ? rolesData[selectedIndex] : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setSubmitStatus('error');
      return;
    }
    // Validate basic email format
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setSubmitStatus('error');
      return;
    }
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', url: '', letter: '' });
    }, 1000);
  };

  return (
    <section id="careers" className="relative w-full bg-transparent selection:bg-white/20 min-h-[100dvh]">
      
      {/* FULL SCREEN BACKGROUND IMAGE FOR CAREERS */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <AnimatePresence initial={false}>
          {hoveredIndex !== null && rolesData[hoveredIndex] ? (
            <motion.img
              key={hoveredIndex}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 0.8, scale: 1.15 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 0.22 }, scale: { duration: 18, ease: 'linear' } }}
              src={resolveCareerImageUrl(rolesData[hoveredIndex].imagePath)}
              loading="eager"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-0 w-full h-full"
            >
               <img
                 src="/bts7.jpg"
                 loading="eager"
                 decoding="async"
                 className="w-full h-full object-cover opacity-20 grayscale blur-[1px]"
               />
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black via-black/70 to-black/30 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.05] mix-blend-screen pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')" }}></div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[100dvh] relative z-10">
        
        {/* Left Side: Sticky Hero */}
        <div className="lg:w-1/2 relative lg:sticky lg:top-0 h-[70vh] lg:h-[100dvh] flex flex-col justify-center p-8 md:p-16 lg:p-24 border-b lg:border-b-0 lg:border-r border-white/5">
          <div className="relative z-10 max-w-xl">
            <motion.div 
               initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
               className="flex items-center gap-3 mb-6 md:mb-8"
            >
               <span className="w-2 h-2 rounded-full bg-[#b20710] animate-pulse shadow-[0_0_10px_#b20710]"></span>
               <h2 className="text-[10px] md:text-xs text-white/50 font-mono tracking-[0.4em] uppercase font-bold drop-shadow-md">{cfg.eyebrow || DEFAULT_CAREERS.eyebrow}</h2>
            </motion.div>

            <motion.h1
               initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
               className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-white uppercase tracking-tighter leading-[0.9] mb-8 drop-shadow-2xl"
            >
              {cfg.titleLine1 || DEFAULT_CAREERS.titleLine1}<br />
              <span className="text-[#D4AF37]">{cfg.titleLine2 || DEFAULT_CAREERS.titleLine2}</span>
            </motion.h1>

            <motion.blockquote
               initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
               className="text-white/40 text-sm md:text-base font-light leading-relaxed max-w-md border-l border-white/10 pl-4 italic whitespace-pre-line"
            >
              "{cfg.description || DEFAULT_CAREERS.description}"
            </motion.blockquote>
          </div>
        </div>

        {/* Right Side: Scrollable List (Native Page Scroll) */}
        <div className="lg:w-1/2 flex flex-col justify-center p-6 md:p-16 py-16 lg:py-32 z-20 bg-black lg:bg-transparent min-h-screen">
          {!showRoles ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center h-full max-w-md mx-auto text-center space-y-8"
            >
              <h3 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
                Are you ready to create the extraordinary?
              </h3>
              <p className="text-white/40 font-light text-sm md:text-base">
                Discover the roles we are currently looking to fill. We only accept those who accept greatness.
              </p>
              <button 
                onClick={() => setShowRoles(true)}
                className="group relative px-8 py-5 bg-[#D4AF37] text-black tracking-widest uppercase font-bold text-xs rounded-full overflow-hidden transition-all hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Yes, I'm Interested
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
              </button>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
              className="flex flex-col w-full max-w-2xl mx-auto space-y-1 relative"
            >
               <div className="mb-8 lg:mb-16 flex justify-between items-center">
                  <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-white/30 uppercase">Open Positions [{rolesData.length}]</span>
                  <button 
                    onClick={() => setShowRoles(false)}
                    className="font-mono text-[10px] tracking-[0.2em] text-white/50 hover:text-[#D4AF37] uppercase transition-colors flex items-center gap-2"
                  >
                    Hide Roles
                  </button>
               </div>

              {rolesData.map((role, i) => (
                <button
                  key={role.id || i}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setSelectedIndex(i)}
                  className="w-full relative group text-left py-6 md:py-8 border-b border-white/5 hover:border-white/20 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4 select-none cursor-pointer overflow-hidden"
                >
                  {/* Hover progress line indicator */}
                  <div className="absolute bottom-[-1px] left-0 h-[1px] bg-[#D4AF37] w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                  
                  <div className="flex flex-col z-10 transition-transform duration-500 group-hover:translate-x-4">
                    <span className="font-mono text-[10px] md:text-xs text-[#D4AF37] tracking-widest uppercase mb-1 md:mb-2 opacity-60 group-hover:opacity-100 transition-opacity">{role.dept}</span>
                    <span className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter uppercase text-white/40 group-hover:text-white transition-colors">{role.title}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-20px] group-hover:translate-x-0 z-10 pr-4">
                    <span className="font-mono text-[10px] tracking-widest uppercase hidden md:block text-white">Apply</span>
                    <ArrowUpRight className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Slide-in Application Modal */}
      <AnimatePresence>
        {selectedData && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 w-full h-[100dvh] bg-black z-[100] flex flex-col overflow-y-auto custom-scrollbar overscroll-contain"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            data-lenis-prevent="true"
          >
            {/* Fixed Return Button */}
            <button 
              onClick={() => setSelectedIndex(null)}
              className="fixed top-6 right-6 md:top-10 md:right-10 text-white/40 hover:text-white transition-colors flex items-center justify-center p-3 md:p-4 rounded-full z-[110] bg-black/50 backdrop-blur-md border border-white/10 hover:border-white/30 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Cinematic Hero */}
            <div className="relative w-full min-h-[50vh] md:min-h-[60vh] flex flex-col justify-end p-6 md:p-12 lg:p-20 overflow-hidden bg-black shrink-0 border-b border-white/10 pointer-events-none mt-16 md:mt-0">
              <motion.img
                initial={{ scale: 1 }}
                animate={{ scale: 1.15 }}
                transition={{ duration: 30, ease: "linear" }}
                src={resolveCareerImageUrl(selectedData.imagePath)}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-[5]"></div>
              
              <div className="relative z-10 max-w-3xl">
                <div className="font-mono text-[10px] md:text-xs text-white/50 tracking-[0.2em] uppercase mb-4 drop-shadow-md">
                  {selectedData.dept} Team
                </div>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-4 md:mb-8 drop-shadow-xl">
                  {selectedData.title}
                </h2>
                <p className="text-white/60 text-sm md:text-lg lg:text-xl font-light italic border-l border-white/20 pl-4 md:pl-6 max-w-2xl drop-shadow-md">
                  "{selectedData.quote}"
                </p>
              </div>
            </div>

            {/* Application Form */}
            <div className="w-full relative z-10 p-6 sm:p-8 md:p-12 lg:p-20 pb-24 flex flex-col flex-1 shrink-0">
                      
              <div className="max-w-3xl w-full mx-auto relative z-10">
                        <h3 className="text-2xl md:text-4xl font-bold mb-2 text-white">Application Request</h3>
                        <p className="text-white/40 text-xs md:text-sm mb-10 md:mb-16 font-light">
                          Submit your details securely to our talent acquisition team. We review portfolios on a rolling basis.
                        </p>
                        
                        <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12">
                          {/* CSRF Token (Mock) */}
                          <input type="hidden" name="csrf_token" value="mock-csrf-token-abc123" />

                          {submitStatus === 'success' && (
                            <div className="bg-green-500/20 border border-green-500/50 text-green-300 px-4 py-3 rounded text-sm mb-6 font-mono">
                              Application successfully encrypted and submitted.
                            </div>
                          )}
                          {submitStatus === 'error' && (
                            <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded text-sm mb-6 font-mono">
                              Please review the fields. Ensure a valid email and required information are provided.
                            </div>
                          )}

                          {/* Inputs */}
                          <div className="relative group">
                            <label className="block text-[10px] uppercase tracking-[0.1em] text-white/40 mb-2 font-mono pb-1">Full Legal Name *</label>
                            <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value.replace(/</g, "")})} className="w-full bg-transparent border-b border-white/20 py-2 md:py-3 text-white text-base md:text-lg focus:outline-none focus:border-white transition-colors" placeholder="Christopher Nolan" />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                            <div className="relative group">
                              <label className="block text-[10px] uppercase tracking-[0.1em] text-white/40 mb-2 font-mono pb-1">Contact Email *</label>
                              <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value.replace(/</g, "")})} className="w-full bg-transparent border-b border-white/20 py-2 md:py-3 text-white text-base md:text-lg focus:outline-none focus:border-white transition-colors" placeholder="director@example.com" />
                            </div>
                            <div className="relative group">
                              <label className="block text-[10px] uppercase tracking-[0.1em] text-white/40 mb-2 font-mono pb-1">Phone Required *</label>
                              <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/</g, "")})} className="w-full bg-transparent border-b border-white/20 py-2 md:py-3 text-white text-base md:text-lg focus:outline-none focus:border-white transition-colors" placeholder="+1 (555) 000-0000" />
                            </div>
                          </div>

                          <div className="relative group">
                            <label className="block text-[10px] uppercase tracking-[0.1em] text-white/40 mb-2 font-mono pb-1">Primary Portfolio / Reel URL</label>
                            <input type="url" value={formData.url} onChange={(e) => setFormData({...formData, url: e.target.value.replace(/</g, "")})} className="w-full bg-transparent border-b border-white/20 py-2 md:py-3 text-white text-base md:text-lg focus:outline-none focus:border-white transition-colors" placeholder="https://vimeo.com/your-reel" />
                          </div>
                          
                          <div className="relative group">
                            <label className="block text-[10px] uppercase tracking-[0.1em] text-white/40 mb-2 font-mono pb-1">Brief Cover Letter / Vibe Check</label>
                            <textarea rows={4} value={formData.letter} onChange={(e) => setFormData({...formData, letter: e.target.value.replace(/</g, "")})} className="w-full bg-transparent border-b border-white/20 py-2 md:py-3 text-white text-base md:text-lg focus:outline-none focus:border-white transition-colors resize-none" placeholder="Tell us why your vision belongs here..."></textarea>
                          </div>
                          
                          <div className="pt-8">
                            <button type="submit" disabled={isSubmittng} className={`w-full bg-white text-black px-6 md:px-8 py-5 md:py-6 uppercase tracking-widest text-[10px] md:text-xs font-bold hover:bg-gray-200 transition-all duration-300 rounded-sm flex items-center justify-center gap-3 group ${isSubmittng ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}>
                              {isSubmittng ? 'Submitting...' : 'Submit Secure Application'}
                              {!isSubmittng && <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                            </button>
                            <p className="text-center text-white/20 text-[10px] mt-6 font-mono tracking-widest">ENCRYPTED & CONFIDENTIAL SUBMISSION</p>
                          </div>
                        </form>
                      </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
