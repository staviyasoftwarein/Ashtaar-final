import { motion } from 'motion/react';
import { Instagram, Twitter, Linkedin, Youtube, ArrowRight } from 'lucide-react';

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-32 pb-12 px-6 md:px-12 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32">
          <div>
            <h2 className="font-serif text-5xl md:text-7xl mb-8 leading-[1.1] text-[#fff2f2] group cursor-default">
              Let's create<br/>something<br/><span className="italic text-[#D4AF37] group-hover:text-white transition-colors duration-500">timeless.</span>
            </h2>
            <a href="mailto:contact@ashtaarfilms.com" className="group inline-flex items-center gap-4 text-xl md:text-2xl font-sans tracking-wide text-white hover:text-[#D4AF37] transition-all duration-300">
              <span className="border-b border-transparent group-hover:border-[#D4AF37] pb-1 transition-all duration-300">contact@ashtaarfilms.com</span>
              <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300 transform group-hover:translate-x-2">
                <ArrowRight className="w-5 h-5" />
              </span>
            </a>
          </div>

          <div className="flex flex-col justify-end">
            <div className="grid grid-cols-2 gap-8 md:gap-12">
              <div>
                <h4 className="text-gray-500 uppercase tracking-[0.2em] text-xs font-bold mb-6 font-sans">Socials</h4>
                <ul className="space-y-4">
                  {socialLinks.map(social => {
                    const Icon = social.icon;
                    return (
                      <li key={social.name}>
                        <a href={social.href} className="group flex items-center gap-4 font-serif text-xl md:text-2xl text-gray-300 hover:text-[#D4AF37] hover:italic transition-all duration-300 w-fit">
                          <Icon className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-[#D4AF37] group-hover:scale-110 transition-all duration-300" strokeWidth={1.5} />
                          <span className="relative overflow-hidden h-[1.2em] inline-block leading-tight">
                            <span className="block transition-transform duration-300 group-hover:-translate-y-[110%]">{social.name}</span>
                            <span className="absolute top-0 left-0 block translate-y-[110%] transition-transform duration-300 group-hover:translate-y-0 italic">{social.name}</span>
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <h4 className="text-gray-500 uppercase tracking-[0.2em] text-xs font-bold mb-6 font-sans">Location</h4>
                <address className="group not-italic font-serif text-xl md:text-2xl text-gray-300 space-y-2 cursor-default">
                  <p className="hover:text-white hover:translate-x-2 transition-transform duration-300">Surat,</p>
                  <p className="hover:text-white hover:translate-x-2 transition-transform duration-300 delay-75">Gujarat,</p>
                  <p className="hover:text-white hover:translate-x-2 transition-transform duration-300 delay-150">India</p>
                </address>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500 uppercase tracking-[0.2em] font-sans">
          <p className="hover:text-white transition-colors cursor-default">© {new Date().getFullYear()} Ashtaar Films</p>
          <p className="text-center hover:text-white transition-colors cursor-default">The Genesis of Great Cinema</p>
          <p className="hover:text-white transition-colors cursor-default">Designed for Excellence</p>
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
