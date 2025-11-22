'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaBriefcase,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCode,
  FaLaptopCode,
  FaProjectDiagram,
  FaRocket,
} from 'react-icons/fa';

const Experience = () => {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await fetch('/api/experience');
        if (res.ok) {
          const data = await res.json();
          const mappedData = data.map((exp) => ({
            ...exp,
            title: exp.position,
            technologies: exp.skills,
            period: formatPeriod(exp.startDate, exp.endDate, exp.current),
            icon: getIconForExperience(exp.position),
          }));
          setExperience(mappedData);
        }
      } catch (error) {
        console.error('Failed to fetch experience', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  const formatPeriod = (start, end, current) => {
    const startDate = new Date(start).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
    if (current) return `${startDate} - Present`;
    if (!end) return startDate;
    const endDate = new Date(end).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
    return `${startDate} - ${endDate}`;
  };

  const getIconForExperience = (title) => {
    if (title.includes('Data')) return FaProjectDiagram;
    if (title.includes('Full Stack')) return FaCode;
    if (title.includes('Tester')) return FaLaptopCode;
    return FaBriefcase;
  };

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
      id="experience"
      className="section-padding relative overflow-hidden"
    >
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="section-container relative z-10"
      >
        {/* Section header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6"
            variants={itemVariants}
          >
            Professional <span className="text-gradient">Journey</span>
          </motion.h2>

          <motion.p
            className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            From academic projects to real-world applications, here&apos;s how
            I&apos;ve been applying my skills and growing as a developer.
          </motion.p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-secondary-500 to-primary-500 hidden md:block" />

          <div className="space-y-12">
            {experience.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${exp.title}`}
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
                      <div className="flex items-start space-x-4 mb-4">
                        <motion.div
                          className="p-3 rounded-full"
                          style={{ backgroundColor: `${exp.color}20` }}
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <exp.icon
                            className="text-xl"
                            style={{ color: exp.color }}
                          />
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-display font-bold text-white mb-1">
                            {exp.title}
                          </h3>
                          <p className="text-lg text-gray-300 font-medium mb-2">
                            {exp.company}
                          </p>

                          {/* Type badge */}
                          <motion.span
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-3"
                            style={{
                              backgroundColor: `${exp.color}20`,
                              color: exp.color,
                              border: `1px solid ${exp.color}40`,
                            }}
                            whileHover={{ scale: 1.05 }}
                          >
                            {exp.type}
                          </motion.span>
                        </div>
                      </div>

                      {/* Meta information */}
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-gray-400">
                          <FaCalendarAlt className="text-sm" />
                          <span className="text-sm font-medium">
                            {exp.period}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400">
                          <FaMapMarkerAlt className="text-sm" />
                          <span className="text-sm">{exp.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                      <FaRocket className="text-primary-400" />
                      <span>Key Achievements:</span>
                    </h4>
                    <div className="space-y-3">
                      {exp.achievements.map((achievement, achievementIndex) => (
                        <motion.div
                          key={achievement}
                          className="flex items-start space-x-3 p-3 bg-dark-700/30 rounded-lg border border-white/5"
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{
                            delay: 0.5 + index * 0.2 + achievementIndex * 0.1,
                          }}
                          whileHover={{
                            scale: 1.02,
                            backgroundColor: `${exp.color}10`,
                          }}
                        >
                          <motion.div
                            className="w-2 h-2 rounded-full mt-2"
                            style={{ backgroundColor: exp.color }}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: achievementIndex * 0.3,
                            }}
                          />
                          <span className="text-sm text-gray-300 leading-relaxed">
                            {achievement}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                      <FaCode className="text-secondary-400" />
                      <span>Technologies Used:</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-1 bg-dark-700 text-white text-sm rounded-full border border-white/10 font-medium"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{
                            delay: 0.7 + index * 0.2 + techIndex * 0.05,
                          }}
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: exp.color + '20',
                            color: exp.color,
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
