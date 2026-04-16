import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

export default function Portfolio() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const springX = useSpring(x, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="portfolio" ref={targetRef} className="relative h-[400vh] bg-[#050505] z-20">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Global Progress Bar */}
        <div className="absolute bottom-12 left-6 md:left-12 right-6 md:right-12 h-[1px] bg-white/10 z-50">
          <motion.div style={{ width: progressWidth }} className="h-full bg-[#D4AF37]" />
        </div>

        <motion.div style={{ x: springX }} className="flex w-[400vw] h-full">
          
          {/* Slide 1: Feature Film */}
          <div className="w-screen h-full flex items-center justify-center relative px-6 md:px-12">
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <motion.img 
                style={{ scale: useTransform(scrollYProgress, [0, 0.25], [1, 1.1]) }}
                src="https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop" 
                className="w-full h-full object-cover opacity-20 grayscale" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]"></div>
            </div>
            
            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <h3 className="text-[#D4AF37] uppercase tracking-[0.4em] text-xs font-bold mb-6">01 // Feature Film</h3>
                <h2 className="font-serif text-6xl md:text-8xl lg:text-[9rem] leading-[0.85] text-white mb-8 mix-blend-difference">
                  DUSSHERA
                </h2>
                <p className="text-gray-400 text-lg max-w-md font-light mb-8">
                  A cinematic masterpiece redefining storytelling. Experience the thrill, drama, and unparalleled visual spectacle.
                </p>
                <a href="https://www.imdb.com/title/tt38554716/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-4 text-white hover:text-[#D4AF37] transition-colors group">
                  <span className="uppercase tracking-widest text-xs font-bold">View on IMDb</span>
                  <span className="w-8 h-[1px] bg-white group-hover:bg-[#D4AF37] transition-colors"></span>
                </a>
              </div>
              <div className="flex-1 w-full aspect-[4/5] md:aspect-[3/4] relative overflow-hidden rounded-lg shadow-2xl">
                <img src="https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* Slide 2: Recognition */}
          <div className="w-screen h-full flex items-center justify-center relative px-6 md:px-12 bg-[#0a0a0a]">
            <div className="relative z-10 w-full max-w-7xl mx-auto">
              <h3 className="text-[#D4AF37] uppercase tracking-[0.4em] text-xs font-bold mb-6">02 // Recognition</h3>
              <h2 className="font-serif text-5xl md:text-8xl text-white mb-16">Awards & Accolades</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { title: "Best Cinematography", fest: "Global Film Fest", year: "2025" },
                  { title: "Best Director", fest: "Indie Shorts", year: "2024" },
                  { title: "Audience Choice", fest: "Cannes Showcase", year: "2024" },
                  { title: "Best Sound Design", fest: "Audio Visual Arts", year: "2023" }
                ].map((award, i) => (
                  <div key={i} className="group relative p-8 border border-white/10 hover:border-[#D4AF37]/50 transition-colors bg-black/20 backdrop-blur-sm overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 text-5xl font-serif text-white/5 group-hover:text-[#D4AF37]/10 transition-colors">{award.year}</div>
                    <h4 className="font-serif text-2xl text-white mb-4 relative z-10">{award.title}</h4>
                    <p className="text-xs text-gray-500 uppercase tracking-widest relative z-10">{award.fest}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Slide 3: Short Form */}
          <div className="w-screen h-full flex items-center justify-center relative px-6 md:px-12">
            <div className="relative z-10 w-full max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                <div>
                  <h3 className="text-[#D4AF37] uppercase tracking-[0.4em] text-xs font-bold mb-6">03 // Short Form</h3>
                  <h2 className="font-serif text-5xl md:text-8xl text-white">Music Videos</h2>
                </div>
                <a href="https://www.youtube.com/@AshtaarFilms/videos" target="_blank" rel="noreferrer" className="inline-flex items-center gap-4 text-white hover:text-[#D4AF37] transition-colors group mb-4">
                  <span className="uppercase tracking-widest text-xs font-bold">View Channel</span>
                  <span className="w-8 h-[1px] bg-white group-hover:bg-[#D4AF37] transition-colors"></span>
                </a>
              </div>
              
              <div className="flex gap-8 overflow-visible">
                {[
                  { img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop", title: "Echoes" },
                  { img: "https://images.unsplash.com/photo-1493225457124-a1a2a5956093?q=80&w=1000&auto=format&fit=crop", title: "Neon Nights" },
                  { img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop", title: "Rhythm" }
                ].map((item, i) => (
                  <div key={i} className="relative w-[280px] md:w-[400px] aspect-[3/4] group overflow-hidden flex-shrink-0 rounded-lg">
                    <img src={item.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500"></div>
                    <div className="absolute bottom-8 left-8">
                      <h4 className="font-serif text-3xl text-white mb-2">{item.title}</h4>
                      <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-500">Watch Now</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Slide 4: AI Animation */}
          <div className="w-screen h-full flex items-center justify-center relative px-6 md:px-12 bg-[#050505]">
            <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
              <h3 className="text-[#D4AF37] uppercase tracking-[0.4em] text-xs font-bold mb-8">04 // The Future</h3>
              <h2 className="font-serif text-6xl md:text-[8rem] leading-none text-white mb-12">AI Animation</h2>
              <div className="inline-flex items-center gap-4 border border-white/20 rounded-full px-8 py-4">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
                <span className="text-xs uppercase tracking-widest text-gray-300">In Development</span>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
