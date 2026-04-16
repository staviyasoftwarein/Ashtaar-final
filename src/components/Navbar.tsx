import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  const navItems = [
    { name: 'Our Story', id: 'about' },
    { name: 'Behind the Lens', id: 'team' },
    { name: 'Behind the Scenes', id: 'bts' },
    { name: 'Our Portfolio', id: 'portfolio' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'Investment', id: 'investment' },
    { name: 'Careers', id: 'careers' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center mix-blend-difference text-white pointer-events-none"
      >
        <div 
          onClick={() => scrollTo('hero')}
          className="font-display text-xl md:text-2xl tracking-wider hover:text-[#D4AF37] transition-colors cursor-pointer pointer-events-auto"
        >
          ASHTAAR FILMS
        </div>

        <button 
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto flex items-center gap-2 text-xs uppercase tracking-[0.2em] hover:text-[#D4AF37] transition-colors"
        >
          <span className="hidden md:inline">Menu</span>
          <Menu size={20} />
        </button>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] bg-[#0a0a0a] text-white flex flex-col"
          >
            <div className="px-6 py-6 md:px-12 flex justify-between items-center">
              <div className="font-display text-xl md:text-2xl tracking-wider text-[#D4AF37]">
                ASHTAAR FILMS
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] hover:text-[#D4AF37] transition-colors"
              >
                <span className="hidden md:inline">Close</span>
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center gap-6 md:gap-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  onClick={() => scrollTo(item.id)}
                  className="font-serif text-3xl md:text-5xl lg:text-6xl hover:text-[#D4AF37] hover:italic transition-all duration-300"
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
