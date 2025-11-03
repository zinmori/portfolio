'use client';

import { motion } from 'framer-motion';

export default function About() {
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
    <section id="about" className="section-padding  relative overflow-hidden">
      {/* Background decorative elements */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-20 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-60 h-60 bg-secondary-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div> */}
      <div className="section-container grid lg:grid-cols-2 gap-16 items-center">
        {/* Left side - Image */}
        {/* <motion.div variants={itemVariants} className="relative group"> */}
        <motion.div
          className="relative overflow-hidden rounded-2xl"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative frame */}
          {/* <div className="absolute -inset-4 bg-gradient-primary/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div> */}

          {/* Image container */}
          <div className="relative glass-effect rounded-2xl p-2">
            <img
              src={'/images/hero.webp'}
              alt="About Ezechiel"
              className="w-full h-96 object-cover rounded-xl shadow-2xl"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-2 rounded-xl bg-gradient-to-t from-dark-900/50 via-transparent to-transparent"></div>
          </div>
        </motion.div>
        {/* </motion.div> */}

        {/* Right side - Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white">
              About <span className="text-gradient">Me</span>
            </h2>

            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                Hi, I&apos;m{' '}
                <span className="text-primary-400 font-semibold">
                  Ezechiel Kokou AGBAN
                </span>
                , a{' '}
                <span className="text-primary-400 font-semibold">
                  data scientist
                </span>{' '}
                with a strong background in software engineering based in Togo.
                I combine my technical foundation with advanced analytics to
                extract meaningful insights from complex datasets.
              </p>

              <p>
                With my{' '}
                <span className="text-secondary-400 font-semibold">
                  software engineering
                </span>{' '}
                background , I bring a unique perspective to data science,
                building robust and scalable solutions. I specialize in machine
                learning, statistical analysis, and turning data into actionable
                business insights.
              </p>

              <p>
                My goal is to leverage data-driven approaches to solve
                real-world problems while creating intelligent solutions that
                drive innovation and make a meaningful impact across industries.
              </p>
            </div>
          </div>

          {/* Call to action */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href="#projects"
              className="btn-primary inline-flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View My Work</span>
            </motion.a>

            <motion.a
              href="#contact"
              className="btn-secondary inline-flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get In Touch</span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
