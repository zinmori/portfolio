'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#education', label: 'Education' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
    { href: '/normal/blog', label: 'Blog', isPage: true },
  ];

  const getHref = (item) => {
    if (item.isPage) return item.href;
    return isHomePage ? item.href : `/normal${item.href}`;
  };

  const NavLinks = ({ mobile = false }) => (
    <>
      {navItems.map((item, index) => (
        <Link
          key={item.href}
          href={getHref(item)}
          onClick={mobile ? handleToggleMenu : undefined}
          className={`relative group text-white hover:text-primary-400 transition-colors duration-300 ${
            !item.isPage ? 'smooth-scroll' : ''
          } font-medium cursor-pointer block`}
        >
          <motion.span
            className="block"
            initial={mobile ? { opacity: 0, x: -20 } : {}}
            animate={mobile ? { opacity: 1, x: 0 } : {}}
            transition={mobile ? { delay: index * 0.1 } : {}}
            whileHover={{ y: -2 }}
          >
            {item.label}
            <motion.div
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"
              layoutId={
                mobile
                  ? `mobile-underline-${item.href}`
                  : `desktop-underline-${item.href}`
              }
            />
          </motion.span>
        </Link>
      ))}
    </>
  );

  return (
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
            <NavLinks />
          </motion.nav>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <motion.button
            className="relative w-8 h-8 flex flex-col justify-center items-center group"
            onClick={handleToggleMenu}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                showMenu ? 'rotate-45 translate-y-1.5' : ''
              }`}
            />
            <motion.span
              className={`w-6 h-0.5 bg-white transition-all duration-300 mt-1 ${
                showMenu ? 'opacity-0' : ''
              }`}
            />
            <motion.span
              className={`w-6 h-0.5 bg-white transition-all duration-300 mt-1 ${
                showMenu ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            />
          </motion.button>
        )}

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobile && showMenu && (
            <motion.div
              className="fixed inset-0 top-16 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleToggleMenu}
              />

              {/* Menu Content */}
              <motion.nav
                className="relative glass-effect p-8 m-4 rounded-2xl"
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col space-y-6">
                  <NavLinks mobile />

                  {/* Mobile CTA */}
                  <motion.div
                    className="pt-6 border-t border-white/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Link
                      href={isHomePage ? '#contact' : '/normal#contact'}
                      className="btn-primary w-full text-center block"
                      onClick={handleToggleMenu}
                    >
                      <motion.span
                        className="block w-full h-full"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Get In Touch
                      </motion.span>
                    </Link>
                  </motion.div>
                </div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
