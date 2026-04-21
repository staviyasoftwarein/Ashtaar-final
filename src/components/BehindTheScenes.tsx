import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const images = [
  'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518134346374-184f9d21cea2?q=80&w=2036&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1493225457124-a1a2a5956093?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518134346374-184f9d21cea2?q=80&w=2036&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop',
];

const positions = [
  { x: -0.8, y: -0.6},
  { x: 0.7, y: 0.4 },
  { x: -0.5, y: 0.7 },
  { x: 0.6, y: -0.5 },
  { x: -0.8, y: 0.2 },
  { x: 0.8, y: -0.3 },
  { x: -0.6, y: -0.8 },
  { x: 0.4, y: 0.6 },
  { x: -0.7, y: 0.5 },
  { x: 0.5, y: -0.7 },
  { x: -0.4, y: -0.4 },
  { x: 0.3, y: 0.8 },
  { x: -0.8, y: 0.3 },
  { x: 0.6, y: 0.2 },
  { x: -0.2, y: -0.7 },
  { x: 0.7, y: -0.6 },
  { x: -0.5, y: 0.4 },
  { x: 0.4, y: -0.4 },
  { x: -0.6, y: 0.6 },
  { x: 0.8, y: 0.5 },
  { x: -0.3, y: -0.5 },
  { x: 0.5, y: 0.3 },
  { x: -0.7, y: -0.2 },
  { x: 0.2, y: 0.7 },
  { x: -0.4, y: 0.8 },
  { x: 0.6, y: -0.8 },
  { x: -0.8, y: 0.1 },
  { x: 0, y: 0 }
];

export default function BehindTheScenes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const galleryScrollRef = useRef<HTMLDivElement>(null);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedGalleryIndex !== null && galleryScrollRef.current) {
      document.body.style.overflow = 'hidden';
      // Automatically scroll to the selected image when gallery opens
      const child = galleryScrollRef.current.children[selectedGalleryIndex] as HTMLElement;
      if (child) {
        galleryScrollRef.current.scrollTo({ left: child.offsetLeft, behavior: 'instant' });
      }
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedGalleryIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const flow = containerRef.current;
      const imgs = imagesRef.current.filter(Boolean);

      const screenHeight = window.innerHeight;
      const screenWidth = window.innerWidth;
      const isMobile = screenWidth < 800;
      const spread = isMobile ? 1.5 : 0.7;

      const initPos = imgs.map(() => ({
        x: 0,
        y: 0,
        z: -1000,
        scale: 0
      }));

      const finalPos = imgs.map((_, index) => {
        const pos = positions[index % positions.length];
        return {
          x: pos.x * screenWidth * spread,
          y: pos.y * screenHeight * spread,
          z: 2000,
          scale: 1
        };
      });

      imgs.forEach((img, index) => {
        gsap.set(img, initPos[index]);
      });

      ScrollTrigger.create({
        trigger: flow,
        start: "top top",
        end: `+=${screenHeight * 5}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          imgs.forEach((img, index) => {
            const imgDelay = index * 0.03;
            const imgProgress = Math.max(0, (progress - imgDelay) * 4);

            const start = initPos[index];
            const end = finalPos[index];

            let x = gsap.utils.interpolate(start.x, end.x, imgProgress);
            let y = gsap.utils.interpolate(start.y, end.y, imgProgress);
            let z = gsap.utils.interpolate(start.z, end.z, imgProgress);
            let scale = gsap.utils.interpolate(start.scale, end.scale, imgProgress);
            
            if(index === imgs.length - 1){
                x = 0;
                y = 0;
                z = z * 0.4;
            }
            
            gsap.set(img, { x, y, z, scale });
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="bts" ref={containerRef} className="h-screen bg-black relative overflow-hidden z-20">
      {/* Immersive Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-screen grayscale"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_#000_100%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.4),rgba(0,0,0,0.9))]"></div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center w-full pointer-events-none">
        <h3 className="text-[#D4AF37] uppercase tracking-[0.3em] text-sm mb-4 font-sans drop-shadow-md">Behind The Scenes</h3>
        <p className="font-serif text-white text-4xl md:text-6xl lg:text-7xl leading-tight opacity-90 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
          Vision beyond the lens.
        </p>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full" style={{ transformStyle: 'preserve-3d', perspective: '2000px' }}>
        {images.map((src, i) => (
          <div
            key={i}
            ref={el => imagesRef.current[i] = el}
            onClick={() => setSelectedGalleryIndex(i)}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] md:w-[500px] md:h-[350px] cursor-pointer pointer-events-auto group ${i === images.length - 1 ? 'after:content-[""] after:absolute after:inset-0 after:bg-black/40' : ''}`}
          >
            <img 
              src={src} 
              alt="BTS" 
              className="w-full h-full object-cover shadow-[0_0_50px_rgba(0,0,0,0.8)] group-hover:brightness-125 transition-[filter] duration-300"
            />
          </div>
        ))}
      </div>

      {/* Fullscreen Horizontal Lightbox Gallery */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedGalleryIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center overscroll-none"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              data-lenis-prevent="true"
            >
              <button 
                onClick={() => setSelectedGalleryIndex(null)}
                className="absolute top-6 right-6 md:top-10 md:right-10 text-white hover:text-[#D4AF37] transition-colors p-4 rounded-full z-[110] bg-white/5 hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest uppercase font-mono z-[110]">
                Scroll to explore
              </div>

              <div 
                ref={galleryScrollRef}
                className="w-full h-full flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar overscroll-x-contain"
                data-lenis-prevent="true"
              >
                {images.map((src, i) => (
                  <div 
                    key={`gallery-${i}`} 
                    className="min-w-full h-full snap-center flex items-center justify-center py-28 px-4 md:p-12 lg:p-24 shrink-0"
                  >
                    <motion.img
                      initial={{ scale: 0.95, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      src={src} 
                      className="max-w-[90vw] max-h-[75vh] md:max-w-full md:max-h-full object-contain pointer-events-none drop-shadow-2xl"
                    />
                  </div>
                ))}
              </div>
              
              <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                  display: none;
                }
                .hide-scrollbar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `}</style>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
