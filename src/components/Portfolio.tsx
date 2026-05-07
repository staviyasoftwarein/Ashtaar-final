import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Youtube, BarChart2, Sparkles, ArrowUpRight, Cpu } from 'lucide-react';
import { useSetting } from '../hooks/useSetting';
import { publicUrl } from '../lib/supabase';
import {
  DEFAULT_PORTFOLIO,
  ytThumb,
  type PortfolioConfig,
  type Slide1 as Slide1Data,
  type Slide2 as Slide2Data,
  type Slide3 as Slide3Data,
  type Slide4 as Slide4Data,
} from '../lib/portfolio';

/* ======================================================================
   REUSABLE UI COMPONENTS
   ====================================================================== */

const TextContainerAmbient = ({ watermark, glowColor }: { watermark: string, glowColor: string }) => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
    {/* Soft Technical Architectural Grid */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
    
    {/* Slow moving ambient cinematic orbs */}
    <motion.div 
      animate={{ x: [-20, 20, -20], y: [-20, 20, -20], opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute -left-20 -top-20 w-[60vh] h-[60vh] rounded-full blur-[120px] ${glowColor} mix-blend-screen`}
    />
    <motion.div 
      animate={{ x: [20, -20, 20], y: [20, -20, 20], opacity: [0.1, 0.2, 0.1] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className={`absolute -right-32 bottom-0 w-[50vh] h-[50vh] rounded-full blur-[100px] ${glowColor} mix-blend-screen`}
    />

    {/* Digital Film Grain Noise */}
    <div className="absolute inset-0 opacity-[0.06] mix-blend-difference" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')" }}></div>

    {/* Massive Editorial Watermark */}
    <div className="absolute -left-8 -bottom-16 md:-left-16 md:-bottom-24 text-[12rem] md:text-[22rem] font-black text-white/[0.02] tracking-tighter leading-none pointer-events-none">
      {watermark}
    </div>
  </div>
);

const SectionTitle = ({ num, text }: { num: string, text: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className="mb-4 md:mb-6 shrink-0 flex flex-col"
  >
    <div className="font-serif italic text-2xl md:text-4xl lg:text-5xl text-[#D4AF37] mb-1 md:mb-2 leading-none">{num}</div>
    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight drop-shadow-2xl uppercase">
      {text}
    </h2>
  </motion.div>
);

const SectionSubhead = ({ text }: { text: string }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.5 }}
    className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4 shrink-0"
  >
    <div className="w-6 md:w-10 h-[2px] bg-white/30"></div>
    <h3 className="font-mono text-[10px] md:text-xs lg:text-sm tracking-[0.2em] uppercase text-white/70 font-bold whitespace-pre-line leading-snug">{text}</h3>
  </motion.div>
);

const SectionDesc = ({ children }: { children: React.ReactNode }) => (
  <motion.p 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ delay: 0.2, duration: 0.6 }}
    className="text-white/50 text-xs md:text-base lg:text-lg max-w-md font-light leading-relaxed mb-6 md:mb-10 shrink-0"
  >
    {children}
  </motion.p>
);

/* ======================================================================
   SLIDE 1: DUSSEHRA (FEATURE FILM)
   ====================================================================== */
function Slide1_FeatureFilm({ data }: { data: Slide1Data }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const hasVideo = !!data.youtubeId;

  return (
    <div className="w-screen h-[100dvh] shrink-0 flex flex-col md:flex-row bg-[#080808]">
      {/* Left Intro */}
      <div className="relative w-full md:w-[45%] lg:w-[40%] h-1/2 md:h-full flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5 overflow-hidden shrink-0 bg-[#080808]">
         <TextContainerAmbient watermark={data.num} glowColor="bg-[#b20710]" />

         <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 py-6 md:p-16 lg:p-24 overflow-y-auto custom-scrollbar">
           <SectionTitle num={data.num} text={data.title} />
            <SectionSubhead text={data.subtitle} />
            <SectionDesc>{data.description}</SectionDesc>

            {hasVideo && (
              <motion.div
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                className="shrink-0 flex items-center gap-8"
              >
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-2 uppercase font-mono text-xs tracking-widest font-bold text-white hover:text-[#D4AF37] transition-colors bg-transparent border-none outline-none"
                >
                  <Play className="w-5 h-5 fill-current" />
                  {isPlaying ? "Close Video" : "Watch Video"}
                </button>
              </motion.div>
            )}
         </div>
      </div>

      {/* Right Media */}
      <div className="w-full md:w-[55%] lg:w-[60%] h-1/2 md:h-full relative overflow-hidden bg-[#111] flex items-center justify-center p-4 md:p-12 lg:p-24">
         <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-[#080808]/80 via-transparent to-transparent pointer-events-none" />

         <div className="w-full max-w-4xl aspect-video relative z-10 rounded-xl md:rounded-[1rem] lg:rounded-[2rem] overflow-hidden bg-black shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/10 group/player">
           {hasVideo && isPlaying ? (
              <iframe
                src={`https://www.youtube.com/embed/${data.youtubeId}?autoplay=1&mute=1&controls=1&rel=0`}
                title={data.subtitle || data.title}
                className="w-full h-full border-0 absolute inset-0 text-white"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
           ) : hasVideo ? (
              <>
                 <img
                   src={ytThumb(data.youtubeId, 'max')}
                   alt={data.subtitle || data.title}
                   className="w-full h-full object-cover opacity-80 group-hover/player:scale-105 transition-transform duration-[2s] ease-out"
                 />
                 <div
                   className="absolute inset-0 bg-black/20 group-hover/player:bg-black/10 transition-colors duration-500 flex items-center justify-center cursor-pointer"
                   onClick={() => setIsPlaying(true)}
                 >
                   <div className="w-16 h-16 md:w-24 md:h-24 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center group-hover/player:bg-white group-hover/player:text-black transition-all duration-500 shadow-[0_0_40px_rgba(255,255,255,0.1)] group-hover/player:shadow-[0_0_50px_rgba(255,255,255,0.4)]">
                     <Play className="w-6 h-6 md:w-10 md:h-10 ml-1 text-white group-hover/player:text-[#b20710] fill-current opacity-90 transition-colors" />
                   </div>
                 </div>
              </>
           ) : (
              <div className="w-full h-full flex items-center justify-center text-white/30 font-mono text-xs uppercase tracking-[0.2em]">
                No video set
              </div>
           )}
         </div>
      </div>
    </div>
  );
}

/* ======================================================================
   SLIDE 2: VFX & ANIME
   ====================================================================== */
function Slide2_VFXAnime({ data }: { data: Slide2Data }) {
  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const tabs = data.tabs ?? [];
  const current = tabs[active] ?? tabs[0];

  return (
    <div className="w-screen h-[100dvh] shrink-0 flex flex-col md:flex-row bg-[#080808]">
      {/* Left Intro */}
      <div className="relative w-full md:w-[45%] lg:w-[40%] h-1/2 md:h-full flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5 overflow-hidden shrink-0 bg-[#080808]">
         <TextContainerAmbient watermark={data.num} glowColor="bg-white" />

         <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 py-4 md:p-16 lg:p-24 overflow-y-auto custom-scrollbar">
          <SectionTitle num={data.num} text={data.title} />

          <motion.div
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-10 shrink-0"
          >
            {tabs.map((d, i) => (
              <button
                key={d.id || i} onClick={() => { setActive(i); setIsPlaying(false); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] md:text-xs tracking-[0.2em] font-mono uppercase transition-all duration-300 border ${active === i ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)]' : 'bg-[#D4AF37]/5 text-[#D4AF37]/70 border-[#D4AF37]/20 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] hover:text-[#D4AF37]'}`}
              >
                {active === i && <Sparkles className="w-3 h-3" />}
                {d.tag}
              </button>
            ))}
          </motion.div>

          <div className="min-h-[140px] md:min-h-[220px] shrink-0 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.3 }}
                className="flex flex-col"
              >
                <SectionSubhead text={current?.subtitle ?? ''} />
                <p className="text-white/50 text-xs md:text-base lg:text-lg max-w-md font-light leading-relaxed mb-6 md:mb-8">
                  {current?.description}
                </p>

                {current?.youtubeId ? (
                  <div className="shrink-0 flex flex-wrap items-center gap-8">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="flex items-center gap-2 uppercase font-mono text-xs tracking-widest font-bold text-white hover:text-[#D4AF37] transition-colors bg-transparent border-none outline-none"
                    >
                      <Play className="w-5 h-5 fill-current" />
                      {isPlaying ? "Close Video" : "Watch Video"}
                    </button>
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>
         </div>
      </div>

      {/* Right Media */}
      <div className="w-full md:w-[55%] lg:w-[60%] h-1/2 md:h-full relative overflow-hidden bg-[#111] flex items-center justify-center p-4 md:p-12 lg:p-24">
         <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-[#080808]/80 via-transparent to-transparent pointer-events-none" />

         <AnimatePresence mode="wait">
           <motion.div
             key={active}
             initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.6 }}
             className="w-full max-w-4xl aspect-video relative z-10 rounded-xl md:rounded-[1rem] lg:rounded-[2rem] overflow-hidden bg-black shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/10 group/player"
           >
             {current?.youtubeId ? (
               isPlaying ? (
                 <iframe
                   src={`https://www.youtube.com/embed/${current.youtubeId}?autoplay=1&mute=1&controls=1&rel=0`}
                   className="w-full h-full border-0 absolute inset-0 text-white"
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                   allowFullScreen
                 />
               ) : (
                 <>
                   <img
                     src={ytThumb(current.youtubeId, 'max')}
                     alt={current.subtitle}
                     className="w-full h-full object-cover opacity-80 group-hover/player:scale-105 transition-transform duration-[2s] ease-out"
                   />
                   <div
                     className="absolute inset-0 bg-black/20 group-hover/player:bg-black/10 transition-colors duration-500 flex items-center justify-center cursor-pointer"
                     onClick={() => setIsPlaying(true)}
                   >
                     <div className="w-16 h-16 md:w-24 md:h-24 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center group-hover/player:bg-white group-hover/player:text-[#b20710] transition-all duration-500 shadow-[0_0_40px_rgba(255,255,255,0.1)] group-hover/player:shadow-[0_0_50px_rgba(255,255,255,0.4)]">
                       <Play className="w-6 h-6 md:w-10 md:h-10 ml-1 text-white group-hover/player:text-[#b20710] fill-current opacity-90 transition-colors" />
                     </div>
                   </div>
                 </>
               )
             ) : current?.imagePath ? (
               <img
                 src={publicUrl('media', current.imagePath)}
                 alt={current.subtitle}
                 className="w-full h-full object-cover opacity-90 group-hover/player:scale-105 transition-transform duration-[2s] ease-out"
               />
             ) : (
               <div className="w-full h-full flex items-center justify-center text-white/30 font-mono text-xs uppercase tracking-[0.2em] bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]">
                 {current?.tag ? `${current.tag} — preview coming soon` : 'No video set'}
               </div>
             )}
           </motion.div>
         </AnimatePresence>
      </div>
    </div>
  );
}

/* ======================================================================
   SLIDE 3: YT MUSIC
   ====================================================================== */
const Equalizer = () => (
  <div className="flex items-end gap-[2px] h-3">
    <motion.div animate={{ height: ["20%", "100%", "40%"] }} transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse" }} className="w-0.5 md:w-1 bg-[#FF0000] rounded-sm" />
    <motion.div animate={{ height: ["60%", "30%", "100%"] }} transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }} className="w-0.5 md:w-1 bg-[#FF0000] rounded-sm" />
    <motion.div animate={{ height: ["100%", "50%", "80%"] }} transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse" }} className="w-0.5 md:w-1 bg-[#FF0000] rounded-sm" />
  </div>
);

function Slide3_Music({ data }: { data: Slide3Data }) {
  const tracks = data.tracks ?? [];
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [player, setPlayer] = useState<any>(null);
  const track = tracks[Math.min(activeIdx, Math.max(0, tracks.length - 1))] ?? { youtubeId: '', title: '', artist: '', time: '' };
  const thumb = track.youtubeId ? ytThumb(track.youtubeId, 'max') : '';

  // Initialize YouTube API
  useEffect(() => {
    if (!tracks[0]?.youtubeId) return;
    if (!window.hasOwnProperty('YT')) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    }

    (window as any).onYouTubeIframeAPIReady = () => {
      createPlayer(tracks[0].youtubeId);
    };

    if ((window as any).YT && (window as any).YT.Player) {
      createPlayer(tracks[0].youtubeId);
    }

    return () => {
      if (player) player.destroy();
    };
  }, []);

  const createPlayer = (videoId: string) => {
    if ((window as any).YT && (window as any).YT.Player) {
      const newPlayer = new (window as any).YT.Player('yt-player-instance', {
        height: '0',
        width: '0',
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          modestbranding: 1
        },
        events: {
          onReady: (event: any) => {
            setPlayer(event.target);
            event.target.setVolume(volume);
            if (isMuted) event.target.mute();
            else event.target.unMute();
          },
          onStateChange: (event: any) => {
            // Re-sync state if user interacts with youtube directly (unlikely here but good for consistency)
            if (event.data === (window as any).YT.PlayerState.PLAYING) setIsPlaying(true);
            if (event.data === (window as any).YT.PlayerState.PAUSED) setIsPlaying(false);
          }
        }
      });
      setPlayer(newPlayer);
    }
  };

  // Sync Video ID
  useEffect(() => {
    if (player && player.loadVideoById && track.youtubeId) {
      player.loadVideoById(track.youtubeId);
      if (isPlaying) player.playVideo();
      else player.pauseVideo();
    }
  }, [track.youtubeId]);

  // Sync Playback state
  useEffect(() => {
    if (player) {
      if (isPlaying) player.playVideo();
      else player.pauseVideo();
    }
  }, [isPlaying]);

  // Sync Mute state
  useEffect(() => {
    if (player) {
      if (isMuted) player.mute();
      else player.unMute();
    }
  }, [isMuted]);

  // Sync Volume
  useEffect(() => {
    if (player && player.setVolume) {
      player.setVolume(volume);
    }
  }, [volume]);

  return (
    <div className="w-screen h-[100dvh] shrink-0 flex flex-col md:flex-row bg-[#080808]">
      {/* Hidden YouTube Player div */}
      <div id="yt-player-instance" className="hidden"></div>

      {/* Left Intro */}
      <div className="relative w-full md:w-[45%] lg:w-[40%] h-1/2 md:h-full flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5 shrink-0 overflow-hidden bg-[#0a0a0a]">
         <TextContainerAmbient watermark={data.num} glowColor="bg-[#FF0000]/20" />

         <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 py-6 md:p-16 lg:p-24 overflow-y-auto custom-scrollbar">
           <SectionTitle num={data.num} text={data.title} />
           <SectionSubhead text={data.subtitle} />
           
           <div className="flex flex-col items-start gap-4 md:gap-6 mb-6 mt-4 shrink-0 w-full max-w-sm md:max-w-md">
              <motion.div 
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-64 md:h-64 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-[4px] md:border-[6px] border-[#050505] overflow-hidden shrink-0 relative"
                animate={{ rotate: isPlaying ? 360 : 0 }} 
                transition={{ duration: 15, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
              >
                 <img src={thumb} className="w-full h-full object-cover scale-125" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-[#080808] rounded-full border border-white/20 z-10 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-black rounded-full"></div>
                 </div>
              </motion.div>
              <div className="min-w-0 text-left w-full">
                <h4 className="text-white font-bold text-xl md:text-2xl mb-1 truncate">{track.title}</h4>
                <p className="text-[#FF0000] font-mono text-[10px] md:text-xs uppercase tracking-widest truncate">{track.artist}</p>
              </div>
           </div>

           <div className="flex flex-col gap-4 shrink-0 items-start w-full max-w-sm">
              <div className="flex items-center justify-start gap-3 w-full">
                <motion.a
                  whileTap={{ scale: 0.95 }}
                  href={data.playlistUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => { if (!data.playlistUrl) e.preventDefault(); }}
                  aria-disabled={!data.playlistUrl}
                  className={`flex items-center justify-center gap-2 bg-[#FF0000] text-white py-3 px-6 md:py-4 md:px-8 rounded-full transition-all font-bold text-xs md:text-sm tracking-wide shadow-xl group border-none outline-none cursor-pointer ${!data.playlistUrl ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                >
                  <Play className="w-4 h-4 fill-current" />
                  Play Full Playlist
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                </motion.a>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors bg-transparent cursor-pointer shrink-0"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-5 h-5 text-white/60" /> : <Volume2 className="w-5 h-5 text-[#FF0000]" />}
                </button>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-3 w-full px-2">
                <VolumeX className="w-4 h-4 text-white/20" />
                <input 
                  type="range" min="0" max="100" value={volume} 
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                  className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#FF0000]"
                />
                <Volume2 className="w-4 h-4 text-white/20" />
              </div>
              
              <div className="flex items-center gap-4 text-[9px] md:text-[10px] font-mono text-white/30 tracking-widest uppercase mt-2">
                <div className="flex items-center gap-1.5"><div className={`w-1.5 h-1.5 rounded-full bg-[#FF0000] ${isPlaying ? 'animate-pulse' : ''}`}></div> {isPlaying ? 'Streaming' : 'Ready'}</div>
                <div className="w-[1px] h-3 bg-white/10"></div>
                <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer" onClick={() => track.youtubeId && window.open(`https://youtu.be/${track.youtubeId}`, '_blank')}>
                   <Youtube className="w-3.5 h-3.5" /> YouTube
                </div>
              </div>
           </div>
         </div>
      </div>

      {/* Right Media (Playlist) */}
      <div className="w-full md:w-[55%] lg:w-[60%] h-1/2 md:h-full flex flex-col p-6 md:p-12 lg:p-24 z-10 bg-[#000000]/60 backdrop-blur-md overflow-hidden">
         <motion.div 
           initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
           className="flex justify-between items-center mb-3 md:mb-10 shrink-0"
         >
           <div className="flex items-center gap-3">
             <div className="w-1 h-4 md:h-6 bg-[#FF0000]"></div>
             <div className="text-white/40 text-[9px] md:text-xs font-bold tracking-[0.2em] uppercase">Queue • {tracks.length} Tracks</div>
           </div>
           <BarChart2 className="w-5 h-5 md:w-8 md:h-8 text-white/20" />
         </motion.div>


          <motion.div 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="flex-1 flex flex-col gap-1 md:gap-2 overflow-y-auto custom-scrollbar pr-1 md:pr-4 min-h-[0px]"
          >
            {tracks.map((t, i) => (
              <div
                key={t.youtubeId || i}
                onClick={() => {
                  if (i === activeIdx) {
                    setIsPlaying((p) => !p);
                  } else {
                    setActiveIdx(i);
                    setIsPlaying(true);
                  }
                }}
                className={`flex items-center gap-3 md:gap-5 p-2 md:p-4 rounded-xl cursor-pointer transition-all duration-300 group hover:bg-white/5 ${activeIdx === i ? 'bg-white/5 shadow-lg' : ''}`}
              >
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl overflow-hidden relative shrink-0 bg-black">
                   {t.youtubeId && <img src={ytThumb(t.youtubeId, 'hq')} className="w-full h-full object-cover opacity-80" />}
                   <div className="absolute inset-0 bg-black/50 group-hover:bg-black/65 transition-colors flex items-center justify-center">
                      {activeIdx === i ? (
                        isPlaying ? (
                          <>
                            <span className="opacity-100 group-hover:opacity-0 transition-opacity"><Equalizer /></span>
                            <Pause className="w-4 h-4 md:w-6 md:h-6 text-white fill-current absolute opacity-0 group-hover:opacity-100 transition-opacity" />
                          </>
                        ) : (
                          <Play className="w-4 h-4 md:w-6 md:h-6 text-white fill-current" />
                        )
                      ) : (
                        <Play className="w-4 h-4 md:w-6 md:h-6 text-white opacity-60 group-hover:opacity-100 transition-opacity fill-current" />
                      )}
                   </div>
                </div>
                <div className="flex-1 min-w-0">
                   <h4 className={`text-xs md:text-lg font-bold truncate ${activeIdx === i ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>{t.title}</h4>
                   <p className="text-[10px] md:text-sm text-white/40 truncate">{t.artist}</p>
                </div>
                <div className="text-white/30 text-[10px] md:text-xs font-mono mr-2 hidden md:block">
                   {t.time}
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors hidden md:block" />
             </div>
           ))}
         </motion.div>
      </div>
    </div>
  );
}

/* ======================================================================
   SLIDE 4: AI ANIMATION
   ====================================================================== */
function Slide4_AI({ data }: { data: Slide4Data }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const hasVideo = !!data.youtubeId;

  return (
    <div className="w-screen h-[100dvh] shrink-0 flex flex-col md:flex-row bg-[#080808]">
      {/* Left Intro */}
      <div className="relative w-full md:w-[45%] lg:w-[40%] h-1/2 md:h-full flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5 overflow-hidden shrink-0 bg-[#0a0a0a]">
         <TextContainerAmbient watermark={data.num} glowColor="bg-white" />

         <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 py-6 md:p-16 lg:p-24 overflow-y-auto custom-scrollbar">
           <SectionTitle num={data.num} text={data.title} />
           <SectionSubhead text={data.subtitle} />
           <SectionDesc>{data.description}</SectionDesc>

           {hasVideo && (
             <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="shrink-0 flex flex-wrap items-center gap-8">
               <button
                 onClick={() => setIsPlaying(!isPlaying)}
                 className="flex items-center gap-2 uppercase font-mono text-xs tracking-widest font-bold text-white hover:text-[#D4AF37] transition-colors bg-transparent border-none outline-none"
               >
                 <Play className="w-5 h-5 fill-current" />
                 {isPlaying ? "Close Video" : "Watch Video"}
               </button>
             </motion.div>
           )}
         </div>
      </div>

      {/* Right Media */}
      <div className="w-full md:w-[55%] lg:w-[60%] h-1/2 md:h-full relative overflow-hidden bg-[#000] flex items-center justify-center p-4 md:p-12">
         {hasVideo && (
           <img
             src={ytThumb(data.youtubeId, 'max')}
             className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm scale-110"
           />
         )}
         <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-[#030303] via-transparent to-[#030303]/80" />

         <motion.div
           initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
           className="relative w-full z-10 aspect-video md:aspect-auto md:h-[70%] max-w-4xl bg-black rounded-lg md:rounded-[2rem] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden group/player"
         >
            {hasVideo && isPlaying ? (
              <iframe
                src={`https://www.youtube.com/embed/${data.youtubeId}?autoplay=1&mute=1&controls=1&rel=0&showinfo=0`}
                className="absolute inset-0 w-full h-full text-white"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : hasVideo ? (
              <>
                <img src={ytThumb(data.youtubeId, 'max')} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover/player:scale-105 transition-transform duration-[3s] ease-out" />
                <div onClick={() => setIsPlaying(true)} className="absolute inset-0 bg-black/40 group-hover/player:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                   <div className="w-12 h-12 md:w-24 md:h-24 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center group-hover/player:bg-white group-hover/player:text-[#b20710] transition-all duration-500 cursor-pointer shadow-[0_0_40px_rgba(255,255,255,0.1)] group-hover/player:shadow-[0_0_50px_rgba(255,255,255,0.4)]">
                      <Play className="w-5 h-5 md:w-10 md:h-10 ml-1 text-white group-hover/player:text-[#b20710] fill-current transition-colors" />
                   </div>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/30 font-mono text-xs uppercase tracking-[0.2em]">
                No video set
              </div>
            )}
         </motion.div>
      </div>
    </div>
  );
}

/* ======================================================================
   MAIN PORTFOLIO EXPORT
   ====================================================================== */
export default function Portfolio() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { value: cfg } = useSetting<PortfolioConfig>('portfolio', DEFAULT_PORTFOLIO);

  // Slide across 4 sections vertically
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const springX = useSpring(x, { stiffness: 45, damping: 15, restDelta: 0.001 });

  return (
    <section id="portfolio" ref={targetRef} className="relative h-[400vh] bg-black font-sans selection:bg-[#D4AF37]/30">
      <div className="sticky top-0 h-[100dvh] flex items-center overflow-hidden bg-black text-white">

        {/* Global Horizontal Scroller */}
        <motion.div style={{ x: springX }} className="flex w-[400vw] h-[100dvh] relative z-10">
            <Slide1_FeatureFilm data={cfg.slide1} />
            <Slide2_VFXAnime data={cfg.slide2} />
            <Slide3_Music data={cfg.slide3} />
            <Slide4_AI data={cfg.slide4} />
        </motion.div>

        {/* Minimal Scroll Progress Bottom Bar */}
        <div className="absolute bottom-0 left-0 w-full h-[4px] bg-white/5 z-50">
          <motion.div
            className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FF0000]"
            style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
          />
        </div>

      </div>
    </section>
  );
}
