import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const team = [
  { name: "Viraj Dave", role: "Producer", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2000&auto=format&fit=crop" },
  { name: "Chinmay Naik", role: "Director", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2000&auto=format&fit=crop" },
  { name: "Gargey Trivedi", role: "DOP", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2000&auto=format&fit=crop" },
];

export default function Team() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [12, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);

  return (
    <div id="team" ref={containerRef} className="min-h-screen py-32 px-6 md:px-12 flex flex-col justify-center relative z-20 overflow-hidden" style={{ backgroundColor: '#1a0a0a' }}>
      {/* Soft radial gradients in muted rose/coral tones */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at 20% 30%, rgba(200, 80, 80, 0.15), transparent 40%), radial-gradient(circle at 80% 70%, rgba(220, 100, 100, 0.1), transparent 50%)'
      }}></div>

      <div className="max-w-7xl mx-auto w-full perspective-[1200px]">
        <motion.div 
          style={{
            rotateX,
            scale,
            y,
            opacity,
            transformStyle: "preserve-3d"
          }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-16 shadow-2xl"
        >
          <div className="text-center mb-16">
            <h3 className="text-[#ffb3b3] uppercase tracking-[0.3em] text-sm mb-6 font-sans">The Visionaries</h3>
            <h2 className="font-serif text-5xl md:text-7xl text-[#fff2f2]">Face Behind The Lens</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {team.map((member, i) => (
              <div
                key={i}
                className="group relative cursor-pointer bg-[#f8f8f8] p-4 pb-8 shadow-2xl transform transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                style={{
                  // Slight random rotation for polaroid feel
                  transform: `rotate(${i === 1 ? 2 : -2}deg)`
                }}
              >
                <div className="aspect-[3/4] overflow-hidden bg-gray-200 mb-6 relative">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
                  {/* Subtle inner shadow for depth */}
                  <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] pointer-events-none"></div>
                </div>
                <div className="text-center">
                  <h4 className="font-serif text-2xl md:text-3xl mb-2 text-black">{member.name}</h4>
                  <p className="text-gray-500 tracking-widest uppercase text-xs font-bold font-sans">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
