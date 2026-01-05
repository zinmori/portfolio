'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import {
  FaExternalLinkAlt,
  FaAward,
  FaCalendarAlt,
  FaGraduationCap,
} from 'react-icons/fa';

interface Certificate {
  _id: string;
  title: string;
  institution: string;
  date: string;
  link?: string;
  image: string;
  color?: string;
  category?: string;
  skills?: string[];
}

export default function Certifications() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await fetch('/api/certificates');
        if (res.ok) {
          const data = await res.json();
          setCertificates(data);
        }
      } catch (error) {
        console.error('Failed to fetch certificates', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="certifications"
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
            My <span className="text-gradient">Achievements</span>
          </motion.h2>

          <motion.p
            className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Continuous learning is at the heart of my journey. Here are the
            certifications that have shaped my expertise and fueled my passion
            for technology.
          </motion.p>
        </motion.div>

        {/* Certifications grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {certificates.map((certificate, index) => (
            <motion.div
              key={certificate._id || certificate.title}
              variants={itemVariants}
              className="group relative"
            >
              <motion.div
                className="glass-effect rounded-2xl p-6 border border-white/10 card-hover h-full"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header with image and basic info */}
                <div className="flex items-start space-x-4 mb-6">
                  <motion.div
                    className="relative flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-white/20">
                      <Image
                        src={certificate.image}
                        alt={certificate.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <FaAward className="text-white text-xs" />
                    </motion.div>
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-display font-bold text-white mb-2 line-clamp-2">
                      {certificate.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-gray-400 mb-2">
                      <FaGraduationCap className="text-sm" />
                      <span className="text-sm font-medium">
                        {certificate.institution}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <FaCalendarAlt className="text-sm" />
                      <span className="text-sm">
                        {formatDate(certificate.date)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Category badge */}
                {certificate.category && (
                  <motion.div
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4"
                    style={{
                      backgroundColor: `${certificate.color || '#22c55e'}20`,
                      color: certificate.color || '#22c55e',
                      border: `1px solid ${certificate.color || '#22c55e'}40`,
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {certificate.category}
                  </motion.div>
                )}

                {/* Skills tags */}
                {certificate.skills && certificate.skills.length > 0 && (
                  <div className="mb-6">
                    <p className="text-gray-400 text-sm mb-3 font-medium">
                      Skills acquired:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {certificate.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          className="px-3 py-1 bg-dark-700 text-white text-xs rounded-full border border-white/10"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{
                            delay: 0.5 + index * 0.1 + skillIndex * 0.05,
                          }}
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: `${
                              certificate.color || '#22c55e'
                            }20`,
                          }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}

                {/* View Certificate Link */}
                {certificate.link && (
                  <motion.a
                    href={certificate.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-sm font-medium">
                      View Certificate
                    </span>
                    <FaExternalLinkAlt className="text-xs" />
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
