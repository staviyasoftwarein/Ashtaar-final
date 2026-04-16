import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

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
    <div id="bts" ref={containerRef} className="h-screen bg-[#1c1c1c] relative overflow-hidden z-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center w-full pointer-events-none">
        <h3 className="text-[#D4AF37] uppercase tracking-[0.3em] text-sm mb-4 font-sans">Behind The Scenes</h3>
        <p className="font-serif text-white text-3xl md:text-5xl lg:text-6xl leading-tight opacity-80">
          Every moment holds a universe <br /> waiting to be discovered
        </p>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full" style={{ transformStyle: 'preserve-3d', perspective: '2000px' }}>
        {images.map((src, i) => (
          <div
            key={i}
            ref={el => imagesRef.current[i] = el}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] md:w-[500px] md:h-[350px] ${i === images.length - 1 ? 'after:content-[""] after:absolute after:inset-0 after:bg-black/40' : ''}`}
          >
            <img 
              src={src} 
              alt="BTS" 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
