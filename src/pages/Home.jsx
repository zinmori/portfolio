import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import profilImg from '../assets/images/profil.jpg';
import ConnectBtn from '../components/ConnectBtn';
import { FaGithub, FaLinkedin, FaWhatsapp, FaArrowDown } from 'react-icons/fa';
import cvPdf from '../assets/docs/simplecv.pdf';

export default function Home() {
  const [ref, inView] = useInView({
    // threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900/90 via-cyan-900/10 to-teal-900/10"></div>

      {/* Floating geometric shapes */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 border-2 border-primary-500/30 rounded-full"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/3 right-20 w-16 h-16 bg-gradient-primary/20 rounded-lg"
          animate={{
            y: [0, 30, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-12 h-12 border-2 border-secondary-500/40 rounded-lg rotate-45"
          animate={{
            y: [0, -25, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div> */}

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <motion.div className="space-y-4" variants={itemVariants}>
              {/* <motion.p
                className="text-primary-400 font-mono text-lg tracking-wide"
                variants={itemVariants}
              >
                &lt;hello_world&gt;
              </motion.p> */}

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight">
                <span className="text-white">I&apos;m </span>
                <span className="text-gradient block">
                  <TypeAnimation
                    sequence={[
                      'Ezechiel',
                      2000,
                      'Developer',
                      2000,
                      'Creator',
                      2000,
                      'Innovator',
                      2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                  />
                </span>
              </h1>

              <motion.p
                className="text-gray-300 text-xl md:text-2xl font-light leading-relaxed max-w-2xl"
                variants={itemVariants}
              >
                A passionate{' '}
                <span className="text-primary-400 font-medium">
                  Full-Stack Developer
                </span>{' '}
                and{' '}
                <span className="text-secondary-400 font-medium">
                  Data Scientist
                </span>{' '}
                crafting digital experiences that make a difference.
              </motion.p>

              {/* <motion.p
                className="text-primary-400 font-mono"
                variants={itemVariants}
              >
                &lt;/hello_world&gt;
              </motion.p> */}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6"
              variants={itemVariants}
            >
              <motion.a
                href="#contact"
                className="btn-primary group inline-flex items-center justify-center space-x-2 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Let&apos;s Work Together</span>
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </motion.a>

              <motion.a
                href={cvPdf}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="btn-secondary inline-flex items-center justify-center space-x-2 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Download CV</span>
                <span className="text-sm">📄</span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex items-center space-x-6"
              variants={itemVariants}
            >
              <span className="text-gray-400 font-mono text-sm">
                Connect with me:
              </span>
              <div className="flex space-x-4">
                <ConnectBtn
                  Icon={FaGithub}
                  link={'https://github.com/zinmori'}
                />
                <ConnectBtn
                  Icon={FaLinkedin}
                  link={'https://www.linkedin.com/in/kokou-ezechiel-agban/'}
                />
                <ConnectBtn
                  Icon={FaWhatsapp}
                  link={'https://wa.me/22899070557'}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Profile image */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative ring */}
              <motion.div
                className="absolute -inset-4 rounded-full border-2 border-primary-500/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />

              {/* Second decorative ring */}
              <motion.div
                className="absolute -inset-8 rounded-full border border-secondary-500/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />

              {/* Glow effect */}
              <div className="absolute -inset-6 bg-gradient-primary/20 rounded-full blur-2xl"></div>

              {/* Profile image */}
              <motion.img
                src={profilImg}
                alt="Ezechiel Kokou AGBAN"
                className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full object-cover border-4 border-white/10 shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />

              {/* Status indicator */}
              {/* <motion.div
                className="absolute bottom-8 right-8 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              /> */}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        {/* <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          variants={itemVariants}
        >
          <motion.div
            className="flex flex-col items-center space-y-2 text-gray-400"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm font-mono">Scroll to explore</span>
            <FaArrowDown className="text-primary-400" />
          </motion.div>
        </motion.div> */}
      </motion.div>
    </section>
  );
}
