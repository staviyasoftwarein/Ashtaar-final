/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Team from './components/Team';
import BehindTheScenes from './components/BehindTheScenes';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Investment from './components/Investment';
import Careers from './components/Careers';
import Footer from './components/Footer';
import AmbientBackground from './components/AmbientBackground';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-black min-h-screen text-white selection:bg-[#D4AF37] selection:text-black font-sans">
      <AmbientBackground />
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Team />
            <BehindTheScenes />
            <Portfolio />
            <Testimonials />
            <Investment />
            <Careers />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
