/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Lenis from 'lenis';

import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import AmbientBackground from './components/AmbientBackground';

// Eager load fold components
import Hero from './components/Hero';

// Lazy load components
const Portfolio = lazy(() => import('./components/Portfolio'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Team = lazy(() => import('./components/Team'));
const BehindTheScenes = lazy(() => import('./components/BehindTheScenes'));
const Investment = lazy(() => import('./components/Investment'));
const Careers = lazy(() => import('./components/Careers'));
const Blog = lazy(() => import('./components/Blog'));
const About = lazy(() => import('./components/About'));
const Footer = lazy(() => import('./components/Footer'));

const SEO = () => (
  <Helmet>
    <title>Ashtaar Films | Vision Beyond The Lens</title>
    <meta name="description" content="Official portfolio of Ashtaar Films. We produce high-quality cinematic content, music, and corporate films." />
    <meta name="keywords" content="film production, ashtaar films, cinematography, music videos, production house" />
    <meta property="og:title" content="Ashtaar Films Portfolio" />
    <meta property="og:description" content="Vision Beyond The Lens - Award winning production house." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="robots" content="index, follow" />
    {/* Basic Security Meta Tags */}
    <meta http-equiv="X-Content-Type-Options" content="nosniff" />
  </Helmet>
);

const LoadingFallback = () => (
  <div className="w-full h-screen bg-black flex items-center justify-center">
    <div className="w-12 h-12 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={null}>
        <Portfolio />
        <Testimonials />
        <About />
        <Team />
        <BehindTheScenes />
        <Investment />
        <Careers />
        <Blog />
      </Suspense>
    </>
  );
}

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
    <HelmetProvider>
      <Router>
        <SEO />
        <ScrollToTop />
        <div className="bg-black min-h-screen text-white selection:bg-[#D4AF37] selection:text-black font-sans">
          <AmbientBackground />
          {loading ? (
            <Preloader onComplete={() => setLoading(false)} />
          ) : (
            <>
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/story" element={
                     <Suspense fallback={<LoadingFallback />}>
                       <About />
                     </Suspense>
                  } />
                </Routes>
              </main>
              <Suspense fallback={null}>
                <Footer />
              </Suspense>
            </>
          )}
        </div>
      </Router>
    </HelmetProvider>
  );
}
