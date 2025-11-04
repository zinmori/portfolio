'use client';

import { motion } from 'framer-motion';
import {
  FaHeart,
  FaCode,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaArrowUp,
} from 'react-icons/fa';
import ConnectBtn from './ConnectBtn';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-dark-950 border-t border-white/10 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 left-1/4 w-40 h-40 bg-primary-500/5 rounded-full blur-3xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-20 right-1/4 w-60 h-60 bg-secondary-500/5 rounded-full blur-3xl"
          animate={{
            y: [0, 20, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10 section-container py-12">
        <div className="grid lg:grid-cols-3 gap-12 mb-12">
          {/* Brand section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-white font-bold text-xl font-display">
                  E
                </span>
              </motion.div>
              <div>
                <h3 className="text-xl font-display font-bold text-white">
                  Ezechiel
                </h3>
                <p className="text-gray-400 text-sm">Full Stack Developer</p>
              </div>
            </motion.div>

            <p className="text-gray-300 leading-relaxed">
              Passionate about creating digital experiences that make a
              difference. Always learning, always growing, always coding.
            </p>

            <div className="flex items-center space-x-2 text-gray-400">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <FaHeart className="text-red-500" />
              </motion.div>
              <span>and</span>
              <FaCode className="text-primary-400" />
              <span>in Togo</span>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-display font-bold text-white mb-4">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'About', href: '#about' },
                { name: 'Skills', href: '#skills' },
                { name: 'Experience', href: '#experience' },
                { name: 'Projects', href: '#projects' },
                { name: 'Certifications', href: '#certifications' },
                { name: 'Education', href: '#education' },
                { name: 'Contact', href: '#contact' },
              ].map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-sm"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-display font-bold text-white mb-4">
              Let&apos;s Connect
            </h3>

            <div className="space-y-3 text-sm">
              <p className="text-gray-400">ezechielagban1@gmail.com</p>
              <p className="text-gray-400">+228 91 35 59 86</p>
              <p className="text-gray-400">Lomé, Togo</p>
            </div>

            <div className="flex space-x-4">
              <ConnectBtn Icon={FaGithub} link={'https://github.com/zinmori'} />
              <ConnectBtn
                Icon={FaLinkedin}
                link={'https://www.linkedin.com/in/kokou-ezechiel-agban/'}
              />
              <ConnectBtn
                Icon={FaWhatsapp}
                link={'https://wa.me/22891355986'}
              />
            </div>

            <motion.p
              className="text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Available for freelance work and full-time opportunities
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <span>
              © {currentYear} Ezechiel Kokou AGBAN. All rights reserved.
            </span>
          </div>

          <motion.button
            onClick={scrollToTop}
            className="group p-3 bg-gradient-primary rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaArrowUp className="text-white text-sm" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
