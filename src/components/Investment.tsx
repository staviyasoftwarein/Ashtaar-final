import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

const tiers = [
  { 
    num: "01",
    title: "ASSOCIATE PRODUCER", 
    price: "₹10 Lakh+", 
    subtitle: "Your first step into cinema ownership.",
    benefits: [
      "Screen credit as Associate Producer", 
      "Net profit revenue share", 
      "Ashtaar Films investor community access",
      "Production updates and previews"
    ],
    btnText: "ENQUIRE NOW",
    isDark: false
  },
  { 
    num: "02",
    title: "CO-PRODUCER", 
    price: "₹50 Lakh+", 
    subtitle: "The filmmaker's chair. Your name. Your legacy.",
    benefits: [
      "Screen credit as Co-Producer", 
      "Multi-window revenue share (theatrical + OTT + satellite)", 
      "On-set access during principal photography", 
      "Brand integration opportunities",
      "Priority access on future projects"
    ],
    btnText: "BEGIN CONVERSATION",
    isDark: true,
    badge: "MOST POPULAR"
  },
  { 
    num: "03",
    title: "EXECUTIVE PRODUCER", 
    price: "₹1.5 Crore+", 
    subtitle: "Own the story. Define the future.",
    benefits: [
      "Screen credit as Executive Producer", 
      "Primary revenue share across all windows", 
      "IP co-ownership rights", 
      "First right of refusal on sequels", 
      "Dedicated relationship manager",
      "On-set access + brand integration",
      "Exclusive premiere invitations"
    ],
    btnText: "REQUEST BRIEFING",
    isDark: false
  },
];

export default function Investment() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const selectedData = selectedTier ? tiers.find(t => t.title === selectedTier) : null;

  return (
    <section id="investment" className="relative bg-[#fcfbf9] min-h-screen z-20 overflow-hidden flex">
      {/* Premium Texture & Lighting */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#fcfbf9]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-multiply"></div>
        <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-[#D4AF37]/5 blur-[120px] rounded-full"></div>
      </div>

      {/* Main List View */}
      <motion.div 
        animate={{ x: selectedTier ? '-100%' : '0%' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="w-full flex-shrink-0 min-h-screen py-32 px-6 md:px-12 flex flex-col items-center"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-20 flex flex-col md:flex-row justify-between items-end border-b border-black/10 pb-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="w-8 h-[1px] bg-black"></span>
                <h3 className="text-black uppercase tracking-[0.2em] text-xs font-sans">Menu</h3>
              </div>
              <h2 className="font-sans text-6xl md:text-8xl font-medium tracking-tight text-black uppercase">OWN A LEGACY.</h2>
            </div>
            <p className="text-gray-500 text-xl font-sans font-light mt-6 md:mt-0">Three investment tiers. One shared vision.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {tiers.map((tier, i) => (
              <div 
                key={i} 
                className={`rounded-2xl p-8 md:p-10 flex flex-col relative overflow-hidden shadow-xl transition-transform duration-500 hover:-translate-y-2 ${tier.isDark ? 'bg-[#0a0a0a] text-white scale-105 z-10' : 'bg-white text-black border border-black/5'}`}
              >
                {tier.badge && (
                  <div className="absolute top-0 right-8 bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-b-lg">
                    {tier.badge}
                  </div>
                )}
                
                <div className={`text-xs font-sans mb-4 ${tier.isDark ? 'text-gray-500' : 'text-gray-400'}`}>{tier.num}</div>
                <h4 className="font-sans text-sm tracking-[0.2em] uppercase font-bold mb-6">{tier.title}</h4>
                <div className="font-serif text-5xl md:text-6xl mb-4">{tier.price}</div>
                <p className={`font-sans italic font-light text-sm mb-10 ${tier.isDark ? 'text-gray-400' : 'text-gray-500'}`}>{tier.subtitle}</p>
                
                <div className={`w-full h-px mb-8 ${tier.isDark ? 'bg-white/10' : 'bg-black/10'}`}></div>
                
                <ul className="space-y-4 mb-12 flex-grow">
                  {tier.benefits.map((b, j) => (
                    <li key={j} className={`text-sm flex items-start gap-3 font-sans ${tier.isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span className="text-[#D4AF37] mt-0.5 text-xs">✓</span> {b}
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => setSelectedTier(tier.title)}
                  className={`w-full py-4 rounded-lg uppercase tracking-widest text-xs font-bold transition-all duration-300 ${tier.isDark ? 'bg-[#D4AF37] text-black hover:bg-white' : 'bg-transparent border border-black/20 text-black hover:bg-black hover:text-white'}`}
                >
                  {tier.btnText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Slide-in Form View */}
      <AnimatePresence>
        {selectedData && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 w-full h-full bg-[#fcfbf9] z-[100] flex"
          >
            {/* Left side: Retaining Investment Details */}
            <div className="hidden md:flex w-1/2 relative flex-col justify-center p-16 bg-[#fcfbf9]">
              <div className="max-w-md mx-auto w-full">
                <div className="text-gray-400 text-sm font-sans mb-4">{selectedData.num}</div>
                <h4 className="font-sans text-sm tracking-[0.2em] uppercase font-bold mb-6 text-black">{selectedData.title}</h4>
                <div className="font-serif text-6xl mb-4 text-black">{selectedData.price}</div>
                <p className="font-sans italic font-light text-lg mb-10 text-gray-600">{selectedData.subtitle}</p>
                
                <div className="w-full h-px mb-8 bg-black/10"></div>
                
                <ul className="space-y-4">
                  {selectedData.benefits.map((b, j) => (
                    <li key={j} className="text-base flex items-start gap-3 font-sans text-gray-700">
                      <span className="text-[#D4AF37] mt-1 text-sm">✓</span> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right side: Form */}
            <div className="w-full md:w-1/2 bg-[#1a0a0a] p-8 md:p-20 overflow-y-auto flex flex-col justify-center relative shadow-2xl h-full">
              <button 
                onClick={() => setSelectedTier(null)}
                className="absolute top-8 left-8 md:top-12 md:left-12 text-[#fff2f2]/50 hover:text-[#D4AF37] transition-colors flex items-center gap-2 font-sans text-xs uppercase tracking-widest"
              >
                <ArrowLeft className="w-4 h-4" /> Back to tiers
              </button>
              
              <div className="md:hidden mt-16 mb-8 pt-8">
                <h2 className="font-serif text-3xl md:text-4xl text-[#fff2f2] mb-2">{selectedData.title}</h2>
                <p className="text-[#D4AF37] font-serif text-xl italic">{selectedData.price}</p>
              </div>

              <h3 className="font-serif text-3xl md:text-4xl mb-12 text-[#fff2f2]">Investment Application</h3>
              
              <form className="space-y-8">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#fff2f2]/50 mb-3 font-sans">Full Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-[#fff2f2]/20 py-3 text-[#fff2f2] font-sans text-lg focus:outline-none focus:border-[#D4AF37] transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#fff2f2]/50 mb-3 font-sans">Email Address</label>
                  <input type="email" className="w-full bg-transparent border-b border-[#fff2f2]/20 py-3 text-[#fff2f2] font-sans text-lg focus:outline-none focus:border-[#D4AF37] transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#fff2f2]/50 mb-3 font-sans">Message / Inquiry</label>
                  <textarea rows={4} className="w-full bg-transparent border-b border-[#fff2f2]/20 py-3 text-[#fff2f2] font-sans text-lg focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"></textarea>
                </div>
                <button type="button" className="w-full bg-[#D4AF37] text-black px-8 py-5 uppercase tracking-widest text-xs font-bold hover:bg-[#fff2f2] transition-colors mt-8 rounded-lg">
                  Submit Enquiry
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
