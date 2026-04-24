import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Browsers often block autoplay if not muted, but here it is muted.
      // We wrap it in a promise check to avoid "interrupted by pause" errors.
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          if (e.name !== 'AbortError') {
            console.log("Autoplay prevented:", e);
          }
        });
      }
    }
    
    const ctx = gsap.context(() => {
      // Use fromTo to strictly enforce the scale values and prevent state corruption
      gsap.fromTo(textRef.current, 
        { scale: 1 },
        {
          scale: 300,
          force3D: false, // CRITICAL: Prevents the browser from crashing due to massive GPU texture limits
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            scrub: 1,
            pin: true,
            start: "top top",
            end: "+=1500" // Slightly longer scroll for smoother zoom
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // Moved overflow-hidden to the parent container to prevent page stretch
    <div id="hero" ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
      <video 
        ref={videoRef}
        autoPlay 
        loop 
        muted 
        playsInline
        // Changed to absolute so it stays inside the Hero section and doesn't break other sections
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/preloader.mp4" type="video/mp4" />
      </video>
      
      {/* Removed overflow-hidden from here to fix the Safari/WebKit clipping bug */}
      <div className="absolute inset-0 w-full h-full bg-white flex flex-col justify-center items-center mix-blend-screen">
        <h2 
          ref={textRef}
          className="text-[18vw] sm:text-[80px] md:text-[120px] font-hero text-black m-0 p-0 origin-center whitespace-nowrap"
        >
          ASHTAAR
        </h2>
        <div className="absolute bottom-12 flex flex-col items-center gap-2 opacity-60">
          <span className="text-black text-xs tracking-[0.3em] uppercase font-sans">Scroll to explore</span>
          <div className="w-[1px] h-12 bg-black animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
