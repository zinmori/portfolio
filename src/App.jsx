import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { motion, AnimatePresence } from 'framer-motion';

// import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import Loader from './components/Loader';
import {
  Home,
  About,
  Projects,
  Contact,
  Skills,
  Education,
  Experience,
  Certifications,
} from './pages';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const smoothScroll = (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
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
    <div className="relative min-h-screen bg-gradient-dark overflow-x-hidden">
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
              <Contact />
            </main>

            {/* Footer */}
            {/* <Footer /> */}

            {/* Analytics */}
            <Analytics />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
