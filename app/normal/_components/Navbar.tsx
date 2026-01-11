'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  FaHome,
  FaUser,
  FaCode,
  FaBriefcase,
  FaCertificate,
  FaGraduationCap,
  FaProjectDiagram,
  FaEnvelope,
  FaBlog,
} from 'react-icons/fa';

interface NavItem {
  href: string;
  label: string;
  isPage?: boolean;
  icon: React.ReactNode;
}

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const pathname = usePathname();
  const isHomePage = pathname === '/normal';

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleResize();
    handleScroll();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Observer pour détecter la section active
  useEffect(() => {
    if (!isHomePage) return;

    const sectionIds = [
      'about',
      'skills',
      'experience',
      'certifications',
      'education',
      'projects',
      'contact',
    ];

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [isHomePage]);

  // Fermer le menu quand on scroll
  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showMenu]);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const navItems: NavItem[] = [
    { href: '#about', label: 'About', icon: <FaUser /> },
    { href: '#skills', label: 'Skills', icon: <FaCode /> },
    { href: '#experience', label: 'Experience', icon: <FaBriefcase /> },
    {
      href: '#certifications',
      label: 'Certifications',
      icon: <FaCertificate />,
    },
    { href: '#education', label: 'Education', icon: <FaGraduationCap /> },
    { href: '#projects', label: 'Projects', icon: <FaProjectDiagram /> },
    { href: '#contact', label: 'Contact', icon: <FaEnvelope /> },
    { href: '/normal/blog', label: 'Blog', isPage: true, icon: <FaBlog /> },
  ];

  const getHref = (item: NavItem) => {
    if (item.isPage) return item.href;
    return isHomePage ? item.href : `/normal${item.href}`;
  };

  const DesktopNavLinks = () => (
    <>
      {navItems.map((item) => {
        const isActive =
          item.href === activeSection ||
          (item.isPage && pathname === item.href);
        return (
          <Link
            key={item.href}
            href={getHref(item)}
            className={`relative group transition-colors duration-300 ${
              !item.isPage ? 'smooth-scroll' : ''
            } font-medium cursor-pointer block ${
              isActive
                ? 'text-primary-400'
                : 'text-white hover:text-primary-400'
            }`}
          >
            <motion.span className="block" whileHover={{ y: -2 }}>
              {item.label}
              <motion.div
                className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-primary transition-all duration-300 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
                layoutId={`desktop-underline-${item.href}`}
              />
            </motion.span>
          </Link>
        );
      })}
    </>
  );

  // Variants pour les animations du menu mobile
  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const itemVariants = {
    closed: { x: 50, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    }),
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-2 navbar-glass shadow-lg' : 'py-4 bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/normal"
            className="flex items-center space-x-2 group cursor-pointer"
          >
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-primary-500 font-bold text-xl font-display">
                  Z
                </span>
              </motion.div>
              <motion.span
                className="hidden sm:block text-xl font-display font-bold text-white group-hover:text-primary-400 transition-colors"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Ezechiel
              </motion.span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <motion.nav
              className="flex items-center space-x-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <DesktopNavLinks />
            </motion.nav>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <motion.button
              className="relative z-[60] w-10 h-10 flex flex-col justify-center items-center rounded-lg bg-white/10 backdrop-blur-sm"
              onClick={handleToggleMenu}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <motion.span
                className="absolute w-5 h-0.5 bg-white rounded-full"
                animate={{
                  rotate: showMenu ? 45 : 0,
                  y: showMenu ? 0 : -6,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute w-5 h-0.5 bg-white rounded-full"
                animate={{
                  opacity: showMenu ? 0 : 1,
                  scaleX: showMenu ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute w-5 h-0.5 bg-white rounded-full"
                animate={{
                  rotate: showMenu ? -45 : 0,
                  y: showMenu ? 0 : 6,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          )}
        </div>
      </motion.header>

      {/* Mobile Navigation - Full Screen Overlay */}
      <AnimatePresence>
        {isMobile && showMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />

            {/* Menu Panel */}
            <motion.nav
              className="fixed top-0 right-0 z-[56] h-full w-[80%] max-w-sm bg-black shadow-2xl border-l border-white/10"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* Header du menu */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <span className="text-xl font-display font-bold text-white">
                  Menu
                </span>
                <motion.button
                  onClick={closeMenu}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col p-6 space-y-2 overflow-y-auto h-[calc(100%-180px)]">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    custom={index}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                  >
                    <Link
                      href={getHref(item)}
                      onClick={closeMenu}
                      className="flex items-center space-x-4 p-4 rounded-xl text-white hover:bg-white/10 transition-all duration-300 group"
                    >
                      <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500/20 to-primary-600/20 text-primary-400 group-hover:from-primary-500 group-hover:to-primary-600 group-hover:text-white transition-all duration-300">
                        {item.icon}
                      </span>
                      <span className="text-lg font-medium group-hover:text-primary-400 transition-colors">
                        {item.label}
                      </span>
                      <motion.span className="ml-auto text-gray-500 group-hover:text-primary-400 group-hover:translate-x-1 transition-all">
                        →
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Footer du menu avec CTA */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
                <Link
                  href={isHomePage ? '#contact' : '/normal#contact'}
                  onClick={closeMenu}
                  className="block"
                >
                  <motion.div
                    className="w-full py-4 px-6 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full text-white text-center font-semibold shadow-lg shadow-primary-500/25"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get In Touch
                  </motion.div>
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
