import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

const rolesData = [
  { title: "Director", dept: "Direction", quote: "Vision is the art of seeing what is invisible to others.", img: "https://images.unsplash.com/photo-1585951237318-9ea5e175b891?q=80&w=2070" },
  { title: "Assistant Director", dept: "Direction", quote: "Chaos management disguised as scheduling.", img: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070" },
  { title: "Producer", dept: "Production", quote: "Making the impossible happen, on schedule and under budget.", img: "https://images.unsplash.com/photo-1518134346374-184f9d21cea2?q=80&w=2036" },
  { title: "Cinematographer (DOP)", dept: "Camera", quote: "Painting with light and shadow.", img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059" },
  { title: "Script Writer", dept: "Story", quote: "The blank page is the ultimate canvas.", img: "https://images.unsplash.com/photo-1455390582262-044cdead27d8?q=80&w=2073" },
  { title: "Video Editor", dept: "Post-Production", quote: "Sculpting time and emotion in the cutting room.", img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070" },
  { title: "Sound Designer", dept: "Audio", quote: "Hearing is feeling. We design the heartbeat.", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000" },
  { title: "Production Manager", dept: "Production", quote: "The architectural backbone of every rolling camera.", img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2000" },
  { title: "Casting Director", dept: "Talent", quote: "Discovering the faces that will define the film.", img: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=2071" },
  { title: "VFX Artist", dept: "Post-Production", quote: "Where imagination dictates physical reality.", img: "https://images.unsplash.com/photo-1618365908648-e71bd5716cba?q=80&w=2000" },
  { title: "Motion Graphics Designer", dept: "Design", quote: "Breathing kinetic energy into static pixels.", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000" },
  { title: "Production Assistant", dept: "Production", quote: "The glue handling a thousand invisible miracles.", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000" },
  { title: "Art Director", dept: "Creative", quote: "Building worlds from the ground up.", img: "https://images.unsplash.com/photo-1461344577544-4e5dc9487184?q=80&w=2000" },
  { title: "Costume Designer", dept: "Art Dept", quote: "Telling stories through fabric and thread.", img: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=2000" },
  { title: "Social Media Manager", dept: "Marketing", quote: "Translating cinematic epics into digital pulses.", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000" },
  { title: "Marketing Executive", dept: "Marketing", quote: "Engineering the global anticipation of modern myth.", img: "https://images.unsplash.com/photo-1533750516457-a7eb6e06dd87?q=80&w=2000" }
];

export default function Careers() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; }
  }, [selectedIndex]);

  const selectedData = selectedIndex !== null ? rolesData[selectedIndex] : null;

  return (
    <section id="careers" className="relative w-full bg-transparent selection:bg-white/20">
      
      <div className="flex flex-col lg:flex-row min-h-[100dvh]">
        
        {/* Left Side: Sticky Hero & Dynamic Image */}
        <div className="lg:w-1/2 relative lg:sticky lg:top-0 h-[70vh] lg:h-[100dvh] overflow-hidden flex flex-col justify-center p-8 md:p-16 lg:p-24 z-10 border-b lg:border-b-0 lg:border-r border-white/10">
          
          {/* Background Images Crossfade depending on hovered role */}
          <AnimatePresence mode="popLayout">
            {hoveredIndex !== null ? (
              <motion.img 
                key={hoveredIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 0.3, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                src={rolesData[hoveredIndex].img}
                className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-luminosity"
              />
            ) : (
              <motion.div 
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 w-full h-full"
              >
                 {/* Dark, gritty base image if no hover */}
                 <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2600" className="w-full h-full object-cover opacity-[0.15] grayscale blur-[2px]" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Gradients to keep text incredibly legible */}
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none" />
           {/* Noise overlay */}
          <div className="absolute inset-0 opacity-[0.05] mix-blend-screen pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')" }}></div>


          <div className="relative z-10 max-w-xl">
            <motion.div 
               initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
               className="flex items-center gap-3 mb-6 md:mb-8"
            >
               <span className="w-2 h-2 rounded-full bg-[#b20710] animate-pulse shadow-[0_0_10px_#b20710]"></span>
               <h2 className="text-[10px] md:text-xs text-white/50 font-mono tracking-[0.4em] uppercase font-bold drop-shadow-md">Join The Cult</h2>
            </motion.div>
            
            <motion.h1 
               initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
               className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-white uppercase tracking-tighter leading-[0.9] mb-8 drop-shadow-2xl"
            >
              We don't hire<br />employees.<br />
              <span className="text-[#D4AF37]">We recruit<br />fanatics.</span>
            </motion.h1>

            <motion.blockquote 
               initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
               className="text-white/40 text-sm md:text-base font-light leading-relaxed max-w-md border-l border-white/10 pl-4 italic"
            >
              "If you're looking for a comfortable 9-to-5, close this tab. We are looking for the obsessed, the detail-oriented, and the relentlessly creative. Leave your ego at the door. Let your work speak. This is not a workplace. It is a forge."
            </motion.blockquote>
          </div>
        </div>

        {/* Right Side: Scrollable List (Native Page Scroll) */}
        <div className="lg:w-1/2 flex flex-col justify-center p-6 md:p-16 py-16 lg:py-32 z-20 bg-black lg:bg-transparent min-h-screen">
          <div className="flex flex-col w-full max-w-2xl mx-auto space-y-1 relative">
             <div className="mb-8 lg:mb-16">
                <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-white/30 uppercase">Open Positions [{rolesData.length}]</span>
             </div>

            {rolesData.map((role, i) => (
              <button
                key={i}
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
          </div>
        </div>
      </div>

      {/* Slide-in Application Modal (Kept the exact same beautiful modal layout from previous iteration) */}
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

            {/* Left side: Cinematic Hero */}
            <div className="relative w-full min-h-[50vh] md:min-h-[60vh] flex flex-col justify-end p-6 md:p-12 lg:p-20 overflow-hidden bg-black shrink-0 border-b border-white/10 pointer-events-none">
              <img 
                src={selectedData.img} 
                className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale blur-[1px]" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              
              <div className="relative z-10 max-w-3xl">
                <div className="font-mono text-[10px] md:text-xs text-white/50 tracking-[0.2em] uppercase mb-4">
                  {selectedData.dept} Team
                </div>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-4 md:mb-8">
                  {selectedData.title}
                </h2>
                <p className="text-white/60 text-sm md:text-lg lg:text-xl font-light italic border-l border-white/20 pl-4 md:pl-6 max-w-2xl">
                  "{selectedData.quote}"
                </p>
              </div>
            </div>

            {/* Right side: Application Form */}
            <div className="w-full bg-black p-6 sm:p-8 md:p-12 lg:p-20 pb-24 relative flex flex-col flex-1 shrink-0">
              
              <div className="max-w-3xl w-full mx-auto relative z-10">
                <h3 className="text-2xl md:text-4xl font-bold mb-2 text-white">Application Request</h3>
                <p className="text-white/40 text-xs md:text-sm mb-10 md:mb-16 font-light">
                  Submit your details securely to our talent acquisition team. We review portfolios on a rolling basis.
                </p>
                
                <form className="space-y-8 md:space-y-12">
                  {/* Inputs */}
                  <div className="relative group">
                    <label className="block text-[10px] uppercase tracking-[0.1em] text-white/40 mb-2 font-mono pb-1">Full Legal Name</label>
                    <input type="text" className="w-full bg-transparent border-b border-white/20 py-2 md:py-3 text-white text-base md:text-lg focus:outline-none focus:border-white transition-colors" placeholder="Christopher Nolan" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <div className="relative group">
                      <label className="block text-[10px] uppercase tracking-[0.1em] text-white/40 mb-2 font-mono pb-1">Contact Email</label>
                      <input type="email" className="w-full bg-transparent border-b border-white/20 py-2 md:py-3 text-white text-base md:text-lg focus:outline-none focus:border-white transition-colors" placeholder="director@example.com" />
                    </div>
                    <div className="relative group">
                      <label className="block text-[10px] uppercase tracking-[0.1em] text-white/40 mb-2 font-mono pb-1">Phone Required</label>
                      <input type="tel" className="w-full bg-transparent border-b border-white/20 py-2 md:py-3 text-white text-base md:text-lg focus:outline-none focus:border-white transition-colors" placeholder="+1 (555) 000-0000" />
                    </div>
                  </div>

                  <div className="relative group">
                    <label className="block text-[10px] uppercase tracking-[0.1em] text-white/40 mb-2 font-mono pb-1">Primary Portfolio / Reel URL</label>
                    <input type="url" className="w-full bg-transparent border-b border-white/20 py-2 md:py-3 text-white text-base md:text-lg focus:outline-none focus:border-white transition-colors" placeholder="https://vimeo.com/your-reel" />
                  </div>
                  
                  <div className="relative group">
                    <label className="block text-[10px] uppercase tracking-[0.1em] text-white/40 mb-2 font-mono pb-1">Brief Cover Letter / Vibe Check</label>
                    <textarea rows={4} className="w-full bg-transparent border-b border-white/20 py-2 md:py-3 text-white text-base md:text-lg focus:outline-none focus:border-white transition-colors resize-none" placeholder="Tell us why your vision belongs here..."></textarea>
                  </div>
                  
                  <div className="pt-8">
                    <button type="button" className="w-full bg-white text-black px-6 md:px-8 py-5 md:py-6 uppercase tracking-widest text-[10px] md:text-xs font-bold hover:bg-gray-200 transition-all duration-300 rounded-sm flex items-center justify-center gap-3 group cursor-pointer">
                      Submit Secure Application
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
