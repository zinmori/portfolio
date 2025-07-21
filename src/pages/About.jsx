import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import img from '../assets/images/hero.webp';

export default function About() {
  const [ref, inView] = useInView({
    // threshold: 0.05,
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

  // const skills = [
  //   { name: 'Frontend Development', percentage: 90 },
  //   { name: 'Backend Development', percentage: 85 },
  //   { name: 'Data Science', percentage: 80 },
  //   { name: 'Mobile Development', percentage: 75 },
  // ];

  return (
    <section
      id="about"
      className="section-padding bg-dark-950/60 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="section-container relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Image */}
          <motion.div variants={itemVariants} className="relative group">
            <motion.div
              className="relative overflow-hidden rounded-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6 }}
            >
              {/* Decorative frame */}
              <div className="absolute -inset-4 bg-gradient-primary/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>

              {/* Image container */}
              <div className="relative glass-effect rounded-2xl p-2">
                <img
                  src={img}
                  alt="About Ezechiel"
                  className="w-full h-96 object-cover rounded-xl shadow-2xl"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-2 rounded-xl bg-gradient-to-t from-dark-900/50 via-transparent to-transparent"></div>
              </div>

              {/* Floating stats */}
              {/* <motion.div
                className="absolute -bottom-4 -right-4 glass-effect rounded-xl p-4 border border-white/10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-400">2+</div>
                  <div className="text-xs text-gray-300">Years Experience</div>
                </div>
              </motion.div> */}
            </motion.div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-4">
              {/* <motion.p
                className="text-primary-400 font-mono text-lg tracking-wide"
                variants={itemVariants}
              >
                &lt;about&gt;
              </motion.p> */}

              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white"
                variants={itemVariants}
              >
                About <span className="text-gradient">Me</span>
              </motion.h2>

              <motion.div
                className="space-y-6 text-gray-300 text-lg leading-relaxed"
                variants={itemVariants}
              >
                <p>
                  Hi, I&apos;m{' '}
                  <span className="text-primary-400 font-semibold">
                    Ezechiel Kokou AGBAN
                  </span>
                  , a passionate junior software developer and data science
                  enthusiast based in Togo. I&apos;m committed to continuous
                  learning and exploring the latest technologies to expand my
                  skills.
                </p>

                <p>
                  With experience in{' '}
                  <span className="text-secondary-400 font-semibold">
                    web and mobile development
                  </span>
                  , I&apos;m eager to contribute to innovative projects and grow
                  as a developer. Driven by curiosity and a passion for
                  problem-solving, I&apos;m excited to take on new challenges.
                </p>

                <p>
                  My goal is to make meaningful contributions to the tech
                  industry while
                  <span className="text-primary-400 font-semibold">
                    {' '}
                    creating solutions that make a difference
                  </span>
                  in people&apos;s lives.
                </p>
              </motion.div>

              {/* <motion.p
                className="text-primary-400 font-mono"
                variants={itemVariants}
              >
                &lt;/about&gt;
              </motion.p> */}
            </div>

            {/* Skills overview */}
            {/* <motion.div className="space-y-6" variants={itemVariants}>
              <h3 className="text-xl font-display font-semibold text-white">
                Core Competencies
              </h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-primary-400 font-mono">
                        {skill.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-dark-700 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={
                          inView ? { width: `${skill.percentage}%` } : {}
                        }
                        transition={{
                          duration: 1.5,
                          delay: 0.7 + index * 0.1,
                          ease: 'easeOut',
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div> */}

            {/* Call to action */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <motion.a
                href="#projects"
                className="btn-primary inline-flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View My Work</span>
                {/* <span>🚀</span> */}
              </motion.a>

              <motion.a
                href="#contact"
                className="btn-secondary inline-flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get In Touch</span>
                {/* <span>💬</span> */}
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
