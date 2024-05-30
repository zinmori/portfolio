import Navbar from './components/Navbar';
import { Home, About, Projects, Contact } from './pages';
import Certifications from './pages/Certifications';
import Education from './pages/Education';
import Skills from './pages/Skills';
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
    <>
      <Home />
      <Navbar />
      <About />
      <Skills />
      <Certifications />
      <Education />
      <Projects />
      <Contact />
    </>
  );
}

export default App;
