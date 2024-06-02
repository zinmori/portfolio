import Footer from './components/Footer';
import Navbar from './components/Navbar';
import {
  Home,
  About,
  Projects,
  Contact,
  Skills,
  Education,
  Certifications,
} from './pages';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const smoothScroll = (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute('href');
      document.querySelector(targetId).scrollIntoView({
        behavior: 'smooth',
      });
    };

    const anchors = document.querySelectorAll('.smooth-scroll');
    anchors.forEach((anchor) => anchor.addEventListener('click', smoothScroll));

    /* return () => {
      anchors.forEach((anchor) =>
        anchor.removeEventListener('click', smoothScroll),
      );
    }; */
  }, []);

  return (
    <div className="bg-slate-950">
      <Home />
      <Navbar />
      <About />
      <Skills />
      <Certifications />
      <Education />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
