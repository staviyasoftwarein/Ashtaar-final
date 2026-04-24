import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VolumeX, Volume2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pressItems = [
  { img: "/Testimonial1.jpeg" },
  { img: "/Testimonial2.jpeg" },
  { img: "/Testimonial3.jpeg" },
  { img: "/Testimonial4.jpeg" },
];

const videoItems = [
  { video: "/TestiVideo1.mp4", quote: "They brought our cinematic vision to life with zero compromise." },
  { video: "/TestiVideo2.mp4", quote: "A seamless, breathtaking production process from day one." },
  { video: "/TestiVideo3.mp4", quote: "The final cut was an absolute masterpiece." },
  { video: "/TestiVideo4.mp4", quote: "The most brilliant set crew we've ever worked with." },
];

const pressRotations = [-4, 2, -1, 3];
const videoRotations = [3, -2, 4, -1];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pressCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const videoCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>(Array(4).fill(null));
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [userUnmuted, setUserUnmuted] = useState<boolean[]>(Array(4).fill(false));
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setSectionVisible(entry.isIntersecting);
    }, { threshold: 0.1 });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (!video) return;
      if (sectionVisible) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(e => {
            if (e.name !== 'AbortError') {
              console.log("Testimonial video play prevented:", e);
            }
          });
        }
      } else {
        video.pause();
      }
    });
  }, [sectionVisible]);

  const toggleMute = (index: number) => {
    setUserUnmuted(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  useEffect(() => {
    let latestActive = 0;
    const ctx = gsap.context(() => {
      const pCards = pressCardsRef.current;
      const vCards = videoCardsRef.current;
      
      // Set initial states
      gsap.set(pCards, {
        y: () => window.innerHeight,
        rotation: 0,
        opacity: 0,
      });
      gsap.set(vCards, {
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
          onUpdate: (self) => {
            const time = self.progress * 2.5;
            let active = 0;
            if (time >= 0.8 && time < 1.3) active = 1;
            else if (time >= 1.3 && time < 1.8) active = 2;
            else if (time >= 1.8) active = 3;
            
            if (active !== latestActive) {
              latestActive = active;
              setActiveIndex(active);
            }
          }
        }
      });

      pCards.forEach((card, i) => {
        tl.to(card, {
          y: 0,
          opacity: 1,
          rotation: pressRotations[i],
          duration: 1,
          ease: "power2.out",
        }, i * 0.5); // Staggered entrance
      });

      vCards.forEach((card, i) => {
        tl.to(card, {
          y: 0,
          opacity: 1,
          rotation: videoRotations[i],
          duration: 1,
          ease: "power2.out",
        }, i * 0.5); // Sync with press cards
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="testimonials" ref={containerRef} className="min-h-screen bg-[#f5f0eb] relative overflow-hidden z-20 flex flex-col items-center justify-start pt-12 md:pt-24 lg:pt-32">
      {/* Background Texture */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#f5f0eb]"></div>
        <div className="absolute inset-0 opacity-[0.04] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,_rgba(212,175,55,0.1),_transparent_70%)]"></div>
      </div>

      <div className="relative w-full text-center z-10 px-4 mb-4 md:mb-16 shrink-0">
        <h2 className="font-serif text-3xl md:text-5xl lg:text-7xl text-black">They said <span className="text-[#D4AF37] italic">"yes!"</span></h2>
      </div>
      
      <div className="relative w-full max-w-7xl h-[650px] md:h-[500px] flex flex-col md:flex-row items-center justify-center px-4 shrink-0 gap-8 md:gap-8 overflow-hidden md:overflow-visible">
        
        {/* Left: Press Images */}
        <div className="w-full md:w-1/2 relative h-[280px] md:h-full flex items-center justify-center">
          <h3 className="absolute top-0 md:-top-10 font-sans text-[10px] md:text-xs tracking-[0.2em] text-black/40 uppercase z-0">The Press</h3>
          {pressItems.map((item, i) => (
            <div 
              key={`press-${i}`}
              ref={el => { pressCardsRef.current[i] = el; }}
              className="absolute w-[85%] md:w-[90%] max-w-md bg-white shadow-[0_20px_40px_rgba(0,0,0,0.15)] overflow-hidden rounded-xl border border-gray-100 flex items-center justify-center p-2 h-[220px] md:h-[450px]"
              style={{ zIndex: i }}
            >
              <img src={item.img} alt={`Press Publication ${i + 1}`} className="w-full h-full object-contain block" />
            </div>
          ))}
        </div>

        {/* Right: Video Testimonials */}
        <div className="w-full md:w-1/2 relative h-[280px] md:h-full flex items-center justify-center mt-4 md:mt-0">
          <h3 className="absolute -top-4 md:-top-10 font-sans text-[10px] md:text-xs tracking-[0.2em] text-black/40 uppercase z-0">The Voices</h3>
          {videoItems.map((item, i) => {
            const isTopmost = activeIndex === i;
            const isMuted = !isTopmost || !userUnmuted[i];

            return (
              <div 
                key={`video-${i}`}
                ref={el => { videoCardsRef.current[i] = el; }}
                className="absolute w-[85%] md:w-[90%] max-w-md bg-black shadow-[0_20px_40px_rgba(0,0,0,0.2)] overflow-hidden rounded-xl border border-white/10 flex items-center justify-center h-[240px] md:h-[450px]"
                style={{ zIndex: i }}
              >
                <div className="absolute inset-0 w-full h-full opacity-50 grayscale mix-blend-luminosity pointer-events-none overflow-hidden origin-center flex items-center justify-center">
                  <video 
                    ref={el => { videoRefs.current[i] = el; }}
                    src={item.video}
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30 pointer-events-none"></div>
                <div className="relative z-10 p-4 md:p-10 text-center w-full mt-auto flex flex-col items-center">
                  <button 
                    onClick={() => toggleMute(i)}
                    className={`mb-2 md:mb-4 p-2 md:p-3 rounded-full backdrop-blur-md transition-all ${userUnmuted[i] ? 'bg-white/30 text-[#D4AF37]' : 'bg-white/10 text-white hover:bg-white/20'}`}
                  >
                    {userUnmuted[i] ? <Volume2 className="w-4 h-4 md:w-5 md:h-5" /> : <VolumeX className="w-4 h-4 md:w-5 md:h-5" />}
                  </button>
                  <p className="text-white font-serif text-sm md:text-2xl italic leading-snug drop-shadow-lg line-clamp-3 md:line-clamp-none">"{item.quote}"</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
