import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ChevronDown } from 'lucide-react';

const rolesData = [
  { title: "Director", quote: "Vision is the art of seeing what is invisible to others.", img: "https://images.unsplash.com/photo-1585951237318-9ea5e175b891?q=80&w=2070&auto=format&fit=crop" },
  { title: "Producer", quote: "Making the impossible happen, on schedule and under budget.", img: "https://images.unsplash.com/photo-1518134346374-184f9d21cea2?q=80&w=2036&auto=format&fit=crop" },
  { title: "Cinematographer", quote: "Painting with light and shadow.", img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop" },
  { title: "Script Writer", quote: "The blank page is the ultimate canvas.", img: "https://images.unsplash.com/photo-1455390582262-044cdead27d8?q=80&w=2073&auto=format&fit=crop" },
  { title: "Video Editor", quote: "Sculpting time and emotion in the cutting room.", img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop" },
  { title: "Sound Designer", quote: "Hearing is feeling. We design the heartbeat.", img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop" },
  { title: "VFX Artist", quote: "Where imagination meets reality.", img: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop" },
  { title: "Art Director", quote: "Building worlds from the ground up.", img: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=2071&auto=format&fit=crop" },
  { title: "Colorist", quote: "Setting the mood, one pixel at a time.", img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop" },
  { title: "Production Designer", quote: "Crafting the physical reality of the story.", img: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=2071&auto=format&fit=crop" },
  { title: "Costume Designer", quote: "Telling stories through fabric and thread.", img: "https://images.unsplash.com/photo-1585951237318-9ea5e175b891?q=80&w=2070&auto=format&fit=crop" },
  { title: "Makeup Artist", quote: "Transforming faces, creating characters.", img: "https://images.unsplash.com/photo-1518134346374-184f9d21cea2?q=80&w=2036&auto=format&fit=crop" },
  { title: "Gaffer", quote: "Mastering the light to shape the scene.", img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop" },
  { title: "Foley Artist", quote: "Bringing the world to life through sound.", img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop" },
  { title: "Location Scout", quote: "Finding the perfect backdrop for the narrative.", img: "https://images.unsplash.com/photo-1455390582262-044cdead27d8?q=80&w=2073&auto=format&fit=crop" },
  { title: "Casting Director", quote: "Discovering the faces that will define the film.", img: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop" }
];

export default function Careers() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedData = selectedIndex !== null ? rolesData[selectedIndex] : null;

  return (
    <section id="careers" className="relative bg-black min-h-screen z-20 overflow-hidden flex">
      {/* Main View */}
      <motion.div 
        animate={{ x: selectedIndex !== null ? '-100%' : '0%' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="w-full flex-shrink-0 min-h-screen py-32 relative flex flex-col items-center justify-center px-6"
      >
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
           <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop" className="w-full h-full object-cover grayscale" />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black"></div>
        </div>

        <div className="relative z-10 max-w-4xl text-center">
          <h3 className="text-[#D4AF37] uppercase tracking-[0.4em] text-xs mb-8 font-sans font-bold">Join The Crew</h3>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-12 leading-tight">
            "We don't just hire talent. <br/> We invite <span className="italic text-[#D4AF37]">visionaries</span> to shape the future of cinema."
          </h2>
          
          <div className="relative inline-block w-full max-w-md text-left">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-white/5 border border-white/20 text-white px-6 py-4 rounded-full flex justify-between items-center hover:bg-white/10 transition-colors backdrop-blur-md"
            >
              <span className="font-sans tracking-widest uppercase text-sm">Explore Open Roles</span>
              <ChevronDown className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 w-full mt-4 bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50 max-h-[400px] overflow-y-auto custom-scrollbar"
                >
                  {rolesData.map((role, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedIndex(i);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-6 py-4 border-b border-white/5 text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-serif text-xl flex justify-between items-center group"
                    >
                      {role.title}
                      <span className="text-[10px] uppercase tracking-widest font-sans text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity">Apply</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Slide-in Form View */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: selectedIndex !== null ? '0%' : '100%' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 w-full min-h-screen bg-black z-50 flex"
      >
        {selectedData && (
          <>
            {/* Left side: Image and Quote */}
            <div className="hidden md:flex w-1/2 relative flex-col justify-end p-16">
              <img src={selectedData.img} className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              <div className="relative z-10">
                <h2 className="font-serif text-6xl text-white mb-6">{selectedData.title}</h2>
                {/* Changed font for quote to a more elegant serif or display font */}
                <p className="text-[#D4AF37] font-serif italic text-3xl leading-relaxed" style={{ fontFamily: "'Cinzel', serif" }}>"{selectedData.quote}"</p>
              </div>
            </div>

            {/* Right side: Form */}
            <div className="w-full md:w-1/2 bg-[#0a0a0a] p-8 md:p-20 overflow-y-auto flex flex-col justify-center relative">
              <button 
                onClick={() => setSelectedIndex(null)}
                className="absolute top-8 left-8 md:top-12 md:left-12 text-gray-500 hover:text-[#D4AF37] transition-colors flex items-center gap-2 font-sans text-xs uppercase tracking-widest"
              >
                <ArrowLeft className="w-4 h-4" /> Back to roles
              </button>
              
              <div className="md:hidden mb-12 mt-12">
                <h2 className="font-serif text-4xl text-white mb-4">{selectedData.title}</h2>
                <p className="text-[#D4AF37] font-serif italic text-xl leading-relaxed" style={{ fontFamily: "'Cinzel', serif" }}>"{selectedData.quote}"</p>
              </div>

              <h3 className="font-serif text-3xl md:text-4xl mb-12 text-white">Submit Application</h3>
              
              <form className="space-y-8">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3 font-sans">Full Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/20 py-3 text-white font-sans text-lg focus:outline-none focus:border-[#D4AF37] transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3 font-sans">Portfolio Link</label>
                  <input type="url" className="w-full bg-transparent border-b border-white/20 py-3 text-white font-sans text-lg focus:outline-none focus:border-[#D4AF37] transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3 font-sans">Why you?</label>
                  <textarea rows={4} className="w-full bg-transparent border-b border-white/20 py-3 text-white font-sans text-lg focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"></textarea>
                </div>
                <button className="w-full bg-[#D4AF37] text-black px-8 py-5 uppercase tracking-widest text-xs font-bold hover:bg-white transition-colors mt-8 rounded-lg">
                  Submit Application
                </button>
              </form>
            </div>
          </>
        )}
      </motion.div>
    </section>
  );
}
