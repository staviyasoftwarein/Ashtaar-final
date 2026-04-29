import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Clock, MessageSquare, ChevronRight } from 'lucide-react';

const posts = [
  {
    title: "The Art of Cinematic Lighting in Modern Independent Film",
    category: "Masterclass",
    date: "May 12, 2026",
    comments: 12,
    img: "https://images.unsplash.com/photo-1492691523567-6170c81efc30?auto=format&fit=crop&w=1920&q=80",
    excerpt: "Exploring the nuances of light and shadow to create mood without compromising on clarity..."
  },
  {
    title: "Why Storyboarding remains the Backbone of Production",
    category: "Insights",
    date: "April 28, 2026",
    comments: 8,
    img: "https://images.unsplash.com/photo-1542204172-3c13955bca3e?auto=format&fit=crop&w=1920&q=80",
    excerpt: "Visualizing the rhythm of a scene before a single frame is shot in the studio..."
  },
  {
    title: "Behind the Lens: Capturing Emotion in Distant Landscapes",
    category: "Exploration",
    date: "April 15, 2026",
    comments: 24,
    img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1920&q=80",
    excerpt: "The technical and emotional challenges of high-altitude cinematic production..."
  }
];

export default function Blog() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="blog" ref={containerRef} className="min-h-screen bg-[#fafaf9] text-gray-900 py-32 px-6 md:px-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#D4AF37]/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <h3 className="text-[#D4AF37] uppercase tracking-[0.3em] text-xs font-sans font-bold mb-6">Journal</h3>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl flex flex-col leading-tight">
              <span>CINEMATIC</span>
              <span className="italic flex items-center gap-4">
                INSIGHTS
                <div className="h-[2px] w-24 md:w-48 bg-black/10"></div>
              </span>
            </h2>
          </div>
          <button className="group flex items-center gap-4 py-4 px-8 border border-black/10 rounded-full hover:bg-black hover:text-white transition-all duration-500 font-sans tracking-widest text-xs uppercase font-bold cursor-pointer transition-colors">
            Explore All stories
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/5] overflow-hidden mb-8 relative rounded-sm shadow-xl shadow-black/5">
                <img 
                  src={post.img} 
                  alt={post.title} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700" 
                />
                <div className="absolute top-6 left-6 flex items-center gap-2">
                  <span className="bg-white/80 backdrop-blur-md text-black text-[10px] uppercase tracking-widest px-3 py-1 font-sans font-bold border border-black/5">{post.category}</span>
                </div>
                {/* Hover Reveal Overlays */}
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <p className="text-white text-sm font-sans line-clamp-2">{post.excerpt}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-6 text-[10px] text-gray-500 uppercase tracking-[0.2em] font-mono">
                  <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> {post.date}</span>
                  <span className="flex items-center gap-2"><MessageSquare className="w-3 h-3" /> {post.comments}</span>
                </div>
                <h4 className="font-serif text-2xl lg:text-3xl leading-snug group-hover:text-[#D4AF37] transition-colors duration-300">
                  {post.title}
                </h4>
                <div className="pt-4 flex items-center gap-2 text-[#D4AF37] opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                  <span className="text-[10px] uppercase font-bold tracking-widest">Read Article</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
