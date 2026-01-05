'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Navbar from './_components/Navbar';
import ParticleBackground from './_components/ParticleBackground';
import Loader from './_components/Loader';
import {
  Home,
  About,
  Projects,
  Contact,
  Skills,
  Education,
  Experience,
  Certifications,
  Interests,
} from './_components/sections';

export default function NormalPage() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const smoothScroll = (e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const targetId = target.getAttribute('href');
      if (targetId) {
        const element = document.querySelector(targetId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    const anchors = document.querySelectorAll('.smooth-scroll');
    anchors.forEach((anchor) => anchor.addEventListener('click', smoothScroll));

    return () => {
      clearTimeout(timer);
      anchors.forEach((anchor) =>
        anchor.removeEventListener('click', smoothScroll),
      );
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Particle background */}
            <ParticleBackground />

            {/* Navigation */}
            <Navbar />

            {/* Main content */}
            <main className="relative z-20">
              <Home />
              <About />
              <Skills />
              <Experience />
              <Certifications />
              <Education />
              <Projects />
              <Interests />
              <Contact />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
