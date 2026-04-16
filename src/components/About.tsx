import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const text = "the story of ASHTAAR begins with vision. we believe creators who've proven their artistry deserve better: better production, better storytelling, better cinema. this is the status quo we're building. make it to the screen, and experience the ascension yourself.";
  const words = text.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wordsElements = textRef.current?.querySelectorAll('.word');
      
      if (wordsElements) {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=250%", // Increased pin duration so it stays longer
            pin: true,
            scrub: 1, // Smooth scrubbing
          }
        });

        tl.fromTo(
          wordsElements,
          { opacity: 0.05, filter: 'blur(8px)', scale: 0.95 },
          {
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            stagger: 0.05,
            ease: "power2.out"
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="about" ref={containerRef} className="h-screen bg-black text-white flex items-center justify-center px-6 md:px-24 relative z-20 overflow-hidden">
      
      {/* Cinematic Spotlight / Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[#D4AF37]/[0.07] rounded-full blur-[100px] md:blur-[120px] animate-pulse"></div>
      </div>
      
      {/* Film Grain Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-screen" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      ></div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <h3 className="text-[#D4AF37] uppercase tracking-[0.2em] text-xs md:text-sm mb-8 md:mb-12 font-sans font-bold flex items-center gap-4">
          <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
          THE GENESIS OF GREAT CINEMA.
        </h3>
        <p ref={textRef} className="font-serif text-3xl md:text-5xl lg:text-[3.5rem] leading-[1.1] tracking-tight">
          {words.map((word, wordIndex) => (
            <span key={wordIndex} className="word inline-block mr-[0.25em] opacity-5 blur-[8px] scale-95">
              {word}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
