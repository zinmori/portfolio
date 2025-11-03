'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaGraduationCap,
  FaCalendarAlt,
  FaMapMarkerAlt,
  // FaAward,
  FaBook,
} from 'react-icons/fa';

const educationData = [
  {
    degree: 'Bachelor in Software Engineering',
    institution: 'Ecole Polytechnique de Lomé - Universite de Lomé',
    period: '2021 - 2024',
    location: 'Lomé, Togo',
    description:
      'Comprehensive program covering software development, algorithms, data structures, database management, and software engineering principles.',
    highlights: [
      'Software Development Methodologies',
      'Database Design & Management',
      'Object-Oriented Programming',
      'Data Structures & Algorithms',
      'Web Development',
      'Calculus and Linear Algebra',
    ],
    color: '#22c55e',
  },
  // {
  //   degree: 'High School Diploma',
  //   institution: 'Lycée Scientifique de Lomé',
  //   period: '2018 - 2021',
  //   location: 'Lomé, Togo',
  //   description:
  //     'Scientific track with specialization in Mathematics and Physics, providing a strong foundation in analytical thinking and problem-solving.',
  //   highlights: [
  //     'Advanced Mathematics',
  //     'Physics & Chemistry',
  //     'Computer Science Fundamentals',
  //     'English & French Proficiency',
  //     'Scientific Research Methods',
  //   ],
  //   specialty: 'Mathematics and Physics',
  //   color: '#0891b2',
  // },
];

const Education = () => {
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
      id="education"
      className="section-padding relative overflow-hidden"
    >
      {/* Background decorative elements */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-32 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-80 h-80 bg-secondary-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
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
        className="section-container relative z-10"
      >
        {/* Section header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          {/* <motion.p
            className="text-primary-400 font-mono text-lg tracking-wide mb-4"
            variants={itemVariants}
          >
            &lt;education&gt;
          </motion.p> */}

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6"
            variants={itemVariants}
          >
            Academic <span className="text-gradient">Journey</span>
          </motion.h2>

          <motion.p
            className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            My educational foundation has shaped my analytical thinking and
            provided the technical knowledge that drives my passion for
            innovation.
          </motion.p>

          {/* <motion.p
            className="text-primary-400 font-mono mt-4"
            variants={itemVariants}
          >
            &lt;/education&gt;
          </motion.p> */}
        </motion.div>

        {/* Education Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-secondary-500 to-primary-500 hidden md:block" />

          <div className="space-y-12">
            {educationData.map((edu, index) => (
              <motion.div
                key={edu.degree}
                variants={itemVariants}
                className="relative"
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-6 w-5 h-5 bg-gradient-primary rounded-full border-4 border-dark-900 hidden md:block"
                  style={{ top: '2rem' }}
                  animate={{
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(6, 182, 212, 0.7)',
                      '0 0 0 10px rgba(6, 182, 212, 0)',
                      '0 0 0 0 rgba(6, 182, 212, 0)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                />

                <motion.div
                  className="md:ml-16 glass-effect rounded-2xl p-8 border border-white/10 card-hover"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-start space-x-3 mb-4">
                        <motion.div
                          className="p-3 rounded-full"
                          style={{ backgroundColor: `${edu.color}20` }}
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FaGraduationCap
                            className="text-xl"
                            style={{ color: edu.color }}
                          />
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-display font-bold text-white mb-2">
                            {edu.degree}
                          </h3>
                          <p className="text-lg text-gray-300 font-medium mb-2">
                            {edu.institution}
                          </p>
                        </div>
                      </div>

                      {/* Meta information */}
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-gray-400">
                          <FaCalendarAlt className="text-sm" />
                          <span className="text-sm font-medium">
                            {edu.period}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400">
                          <FaMapMarkerAlt className="text-sm" />
                          <span className="text-sm">{edu.location}</span>
                        </div>
                        {edu.specialty && (
                          <div className="flex items-center space-x-2 text-gray-400">
                            <FaBook className="text-sm" />
                            <span className="text-sm">
                              Specialty: {edu.specialty}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {edu.description}
                  </p>

                  {/* Highlights */}
                  <div>
                    <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                      <span>Key Learning Areas:</span>
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {edu.highlights.map((highlight, highlightIndex) => (
                        <motion.div
                          key={highlight}
                          className="flex items-center space-x-3 p-3 bg-dark-700/50 rounded-lg border border-white/10"
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{
                            delay: 0.5 + index * 0.2 + highlightIndex * 0.1,
                          }}
                          whileHover={{
                            scale: 1.02,
                            backgroundColor: `${edu.color}10`,
                          }}
                        >
                          <motion.div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: edu.color }}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: highlightIndex * 0.3,
                            }}
                          />
                          <span className="text-sm text-gray-300 font-medium">
                            {highlight}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        {/* <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={itemVariants}
        >
          <motion.div
            className="text-center glass-effect rounded-xl p-6 border border-white/10"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-3xl font-bold text-gradient mb-2">3+</div>
            <p className="text-gray-300 font-medium">Years of Studies</p>
          </motion.div>

          <motion.div
            className="text-center glass-effect rounded-xl p-6 border border-white/10"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-3xl font-bold text-gradient mb-2">15.5/20</div>
            <p className="text-gray-300 font-medium">Bachelor GPA</p>
          </motion.div>

          <motion.div
            className="text-center glass-effect rounded-xl p-6 border border-white/10"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-3xl font-bold text-gradient mb-2">2024</div>
            <p className="text-gray-300 font-medium">Graduation Year</p>
          </motion.div>
        </motion.div> */}

        {/* Call to action */}
        {/* <motion.div className="text-center mt-16" variants={itemVariants}>
          <motion.p
            className="text-gray-300 text-lg mb-8"
            variants={itemVariants}
          >
            Want to see how I apply my education in real projects?
          </motion.p>

          <motion.a
            href="#experience"
            className="btn-primary inline-flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View My Experience</span>
            <span>💼</span>
          </motion.a>
        </motion.div> */}
      </motion.div>
    </section>
  );
};

export default Education;

