import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { quote: "A website that finally matched the level of our business", text: "Bogdan was exceptional from start to finish! He didn't just design and build our website, he helped us figure out what we really wanted to say and how to bring it to life. The process was clear and collaborative, and the final site feels like us: professional, confident, and true to what we do.", author: "Khris", role: "Founder, Marketing Agency" },
  { quote: "From generic to premium", text: "Bogdan completely transformed our old, generic website into something that finally represents who we are. The difference was clear right away. The new site feels premium, focused, and much more aligned with the level we operate at.", author: "Clara", role: "Founder, Consulting Firm" },
  { quote: "A premium presence, without trying too hard", text: "Bogdan helped us move from a generic Squarespace website to something much more refined and confident. The new design feels premium without trying too hard, and it perfectly captures the balance we were aiming for.", author: "Ariel", role: "Director, Interior Design Studio" },
  { quote: "A website that feels intentional", text: "Everything about the final result feels thoughtful and deliberate. Bogdan brought real structure and clarity to our website, helping us express what we do and why it matters in a simple, confident way.", author: "Mattias", role: "Principal, Architecture Firm" },
];

const rotations = [-4, 2, -1, 3];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current;
      
      // Set initial states
      gsap.set(cards, {
        y: () => window.innerHeight,
        rotation: 0,
        opacity: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${window.innerHeight * 3}`,
          pin: true,
          scrub: 1,
        }
      });

      cards.forEach((card, i) => {
        tl.to(card, {
          y: 0,
          opacity: 1,
          rotation: rotations[i],
          duration: 1,
          ease: "power2.out",
        }, i * 0.5); // Staggered entrance
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="testimonials" ref={containerRef} className="h-screen bg-[#f5f0eb] relative overflow-hidden z-20 flex flex-col items-center justify-center">
      {/* Background Texture */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#f5f0eb]"></div>
        <div className="absolute inset-0 opacity-[0.04] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,_rgba(212,175,55,0.1),_transparent_70%)]"></div>
      </div>

      <div className="absolute top-24 left-0 w-full text-center z-10 px-4">
        <h2 className="font-serif text-4xl md:text-7xl text-black">They said <span className="text-[#D4AF37] italic">"yes!"</span></h2>
      </div>
      
      <div className="relative w-full max-w-2xl h-[500px] flex items-center justify-center mt-20 px-4">
        {testimonials.map((t, i) => (
          <div 
            key={i}
            ref={el => cardsRef.current[i] = el}
            className="absolute w-[90%] md:w-full max-w-xl bg-white border border-gray-200 p-6 md:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
            style={{ zIndex: i }}
          >
            <div className="absolute -top-6 -left-4 text-8xl text-[#f5f0eb] font-serif opacity-50">"</div>
            <h3 className="font-serif text-2xl md:text-3xl mb-6 uppercase tracking-wide text-black relative z-10 leading-snug">"{t.quote}"</h3>
            <p className="text-gray-600 text-base leading-relaxed mb-10 font-sans relative z-10 font-light">{t.text}</p>
            <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
              <div className="w-12 h-12 bg-[#f5f0eb] flex items-center justify-center font-serif text-xl text-black border border-gray-200">
                {t.author[0]}
              </div>
              <div>
                <div className="font-bold tracking-wider text-sm text-black font-sans">{t.author}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-sans">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
