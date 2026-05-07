import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VolumeX, Volume2, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSetting } from '../hooks/useSetting';
import { DEFAULT_TESTIMONIALS, resolveTestimonialMediaUrl, type TestimonialsConfig } from '../lib/testimonials';

export default function Testimonials() {
  const { value: cfg } = useSetting<TestimonialsConfig>('testimonials', DEFAULT_TESTIMONIALS);
  const testimonials = cfg.items.length > 0 ? cfg.items : DEFAULT_TESTIMONIALS.items;

  const [index, setIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [direction, setDirection] = useState(0);
  const [mediaReady, setMediaReady] = useState(false);

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Keep the active index in range when the items list shrinks via the admin.
  useEffect(() => {
    if (index >= testimonials.length) setIndex(0);
  }, [testimonials.length, index]);

  useEffect(() => {
    setMediaReady(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [index]);

  // Warm the browser cache for adjacent testimonials so navigating ahead/back is instant.
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const neighborIdxs = [
      (index + 1) % testimonials.length,
      (index - 1 + testimonials.length) % testimonials.length,
    ];
    const cleanups: Array<() => void> = [];
    for (const i of neighborIdxs) {
      const item = testimonials[i];
      if (!item) continue;
      const url = resolveTestimonialMediaUrl(item.mediaPath);
      if (!url) continue;
      if (item.mediaKind === 'video') {
        // A hidden <video preload="auto"> primes the HTTP cache without rendering.
        const v = document.createElement('video');
        v.src = url;
        v.preload = 'auto';
        v.muted = true;
        v.style.cssText = 'position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;';
        document.body.appendChild(v);
        cleanups.push(() => v.remove());
      } else {
        const img = new Image();
        img.src = url;
        cleanups.push(() => { img.src = ''; });
      }
    }
    return () => cleanups.forEach((c) => c());
  }, [index, testimonials]);

  const current = testimonials[index] ?? testimonials[0];
  const mediaUrl = resolveTestimonialMediaUrl(current?.mediaPath ?? '');
  const avatarUrl = resolveTestimonialMediaUrl(current?.avatarPath ?? '');

  return (
    <section id="testimonials" className="min-h-screen bg-[#fafaf9] text-gray-900 py-24 md:py-32 relative overflow-hidden flex flex-col justify-center">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_#D4AF3710_0%,_transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-multiply"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-6xl text-gray-900 tracking-tight"
          >
            Your Vision, <span className="italic text-[#D4AF37]">Our</span> Integrity
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-[1px] w-24 bg-[#D4AF37] mx-auto mt-6"
          ></motion.div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          
          {/* Left: Media Side */}
          <div className="w-full md:w-1/2 aspect-[4/5] md:aspect-square relative group">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction * 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -direction * 50, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-black/10 border border-black/5 relative bg-[#0f0f10]"
              >
                {/* Cinematic placeholder — visible until media is ready */}
                <div
                  aria-hidden
                  className={`absolute inset-0 z-10 transition-opacity duration-500 pointer-events-none ${mediaReady ? 'opacity-0' : 'opacity-100'}`}
                  style={{
                    background:
                      'radial-gradient(ellipse at center, rgba(212,175,55,0.08), transparent 60%), linear-gradient(135deg, #141414 0%, #0a0a0a 100%)',
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37]/30 border-t-[#D4AF37] animate-spin" />
                  </div>
                </div>

                {current?.mediaKind === 'video' && mediaUrl ? (
                  <>
                    <video
                      key={mediaUrl}
                      ref={videoRef}
                      src={mediaUrl}
                      autoPlay
                      muted={isMuted}
                      loop
                      playsInline
                      preload="auto"
                      onLoadedData={() => setMediaReady(true)}
                      onCanPlay={() => setMediaReady(true)}
                      className={`w-full h-full object-cover transition-opacity duration-500 ${mediaReady ? 'opacity-100' : 'opacity-0'}`}
                    />
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                      className="absolute bottom-6 right-6 p-4 rounded-full bg-white/40 backdrop-blur-md border border-black/10 hover:bg-white/60 transition-all z-20 text-black"
                    >
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-[#D4AF37]" />}
                    </button>
                  </>
                ) : mediaUrl ? (
                  <img
                    src={mediaUrl}
                    alt={current?.author ?? ''}
                    onLoad={() => setMediaReady(true)}
                    onError={() => setMediaReady(true)}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${mediaReady ? 'opacity-100' : 'opacity-0'}`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 font-mono text-xs uppercase tracking-[0.2em] bg-gray-100">
                    No media uploaded
                  </div>
                )}
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30">
              <button 
                onClick={prev}
                className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#D4AF37] transition-all shadow-xl cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-black/5 text-[10px] font-mono tracking-widest text-[#D4AF37] shadow-sm">
                {String(index + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
              </div>
              <button 
                onClick={next}
                className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#D4AF37] transition-all shadow-xl cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Right: Content Side */}
          <div className="w-full md:w-1/2 space-y-8 md:space-y-12">
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="flex items-center gap-4 text-[#D4AF37] mb-6"
              >
                <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
                <span className="uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold font-sans">Voices of the Industry</span>
              </motion.div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Quote className="w-12 h-12 md:w-16 md:h-16 text-[#D4AF37]/10 mb-6" />
                  <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-tight italic text-gray-800">
                    "{current?.quote}"
                  </p>

                  <div className="mt-10 md:mt-12 flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#D4AF37]/20 p-1 bg-gray-100">
                      {avatarUrl && (
                        <img src={avatarUrl} alt={current?.author ?? ''} className="w-full h-full object-cover rounded-full" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold font-serif text-gray-900">{current?.author}</h4>
                      <p className="text-[#D4AF37] text-xs md:text-sm uppercase tracking-widest font-sans mt-1">{current?.role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                    i === index ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Decorative Text */}
      <motion.div 
        animate={{ x: [-100, 100] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-0 text-[15vw] font-serif opacity-[0.02] select-none pointer-events-none italic whitespace-nowrap text-black"
      >
        client testimonials • cinema legends • global impact
      </motion.div>
    </section>
  );
}

