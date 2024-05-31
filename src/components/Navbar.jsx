import { useEffect, useState } from 'react';

const LINKS = (
  <>
    <a href="#about" className="text-white smooth-scroll">
      About
    </a>
    <a href="#skills" className="text-white smooth-scroll">
      Skills
    </a>
    <a href="#certifications" className="text-white smooth-scroll">
      Certifications
    </a>
    <a href="#education" className="text-white smooth-scroll">
      Education
    </a>
    <a href="#projects" className="text-white smooth-scroll">
      Projects
    </a>
    <a href="#contact" className="text-white smooth-scroll">
      Contact
    </a>
  </>
);

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="flex justify-between items-center sm:px-16 px-8 py-4 w-full mx-auto fixed top-0 z-10 right-0 left-0 bg-slate-950">
      <a
        href="#home"
        className="w-24 h-14 flex justify-center items-center bg-white font-bold rounded-full"
      >
        <p className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-blue-700 text-2xl">
          BigZ
        </p>
      </a>
      {isMobile ? (
        <button className="text-white lg:hidden" onClick={handleToggleMenu}>
          {showMenu ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      ) : (
        <nav className="text-base font-medium gap-7 flex">{LINKS}</nav>
      )}
      {isMobile && showMenu && (
        <nav className="text-base font-medium gap-7 flex flex-col absolute top-16 right-0 bg-slate-950 py-2 px-4 w-[80%] h-screen">
          {LINKS}
        </nav>
      )}
    </header>
  );
}
