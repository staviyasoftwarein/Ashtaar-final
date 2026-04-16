import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-32 pb-12 px-6 md:px-12 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32">
          <div>
            <h2 className="font-serif text-5xl md:text-7xl mb-8 leading-[1.1] text-[#fff2f2]">
              Let's create<br/>something<br/><span className="italic text-[#D4AF37]">timeless.</span>
            </h2>
            <a href="mailto:contact@ashtaarfilms.com" className="inline-block border-b border-[#D4AF37] pb-2 text-xl md:text-2xl font-sans tracking-wide hover:text-[#D4AF37] transition-colors duration-300">
              contact@ashtaarfilms.com
            </a>
          </div>

          <div className="flex flex-col justify-end">
            <div className="grid grid-cols-2 gap-12">
              <div>
                <h4 className="text-gray-500 uppercase tracking-[0.2em] text-xs font-bold mb-6 font-sans">Socials</h4>
                <ul className="space-y-4">
                  {['Instagram', 'Twitter', 'LinkedIn', 'YouTube'].map(social => (
                    <li key={social}>
                      <a href="#" className="font-serif text-xl md:text-2xl hover:text-[#D4AF37] hover:italic transition-all duration-300 block">
                        {social}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-gray-500 uppercase tracking-[0.2em] text-xs font-bold mb-6 font-sans">Location</h4>
                <address className="not-italic font-serif text-xl md:text-2xl text-gray-300 space-y-2">
                  <p>Mumbai,</p>
                  <p>Maharashtra,</p>
                  <p>India</p>
                </address>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500 uppercase tracking-[0.2em] font-sans">
          <p>© {new Date().getFullYear()} Ashtaar Films</p>
          <p className="text-center">The Genesis of Great Cinema</p>
          <p>Designed for Excellence</p>
        </div>

      </div>

      {/* Massive Awwwards-style typography reveal */}
      <div className="absolute bottom-0 left-0 w-full flex justify-center overflow-hidden pointer-events-none select-none opacity-5">
        <h1 className="text-[25vw] font-serif leading-[0.75] text-white whitespace-nowrap">
          ASHTAAR
        </h1>
      </div>
    </footer>
  );
}
