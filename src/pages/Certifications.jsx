import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaExternalLinkAlt,
  FaAward,
  FaCalendarAlt,
  FaGraduationCap,
} from 'react-icons/fa';

import dataImg from '../assets/images/data.png';
import flutterImg from '../assets/images/fluttercertificate.jpg';
import reactImg from '../assets/images/react.png';
import nodeImg from '../assets/images/node.png';
import mlImg from '../assets/images/mlspe.png';
import iaImg from '../assets/images/ia.png';

const certificatesData = [
  {
    image: iaImg,
    title: 'AI Programming with Python',
    institution: 'Udacity',
    date: 'September 2024',
    link: 'https://www.udacity.com/certificate/e/9d70472c-2dce-11ef-aa1f-d3a47e90255f',
    category: 'Artificial Intelligence',
    skills: ['Python', 'NumPy', 'Pandas', 'PyTorch'],
    color: '#FF6B6B',
  },
  {
    image: dataImg,
    title: 'Associate Data Scientist',
    institution: 'DataCamp',
    date: 'September 2023',
    link: 'https://www.datacamp.com/certificate/DSA0019605927685',
    category: 'Data Science',
    skills: ['Python', 'SQL', 'Statistics', 'Machine Learning'],
    color: '#4ECDC4',
  },
  {
    image: mlImg,
    title: 'Machine Learning Specialization',
    institution: 'Coursera',
    date: 'April 2024',
    link: 'https://coursera.org/verify/specialization/2RUCU48RMPBY',
    category: 'Machine Learning',
    skills: ['TensorFlow', 'Scikit-learn', 'Deep Learning', 'Neural Networks'],
    color: '#45B7D1',
  },
  {
    image: flutterImg,
    title: 'Flutter & Dart',
    institution: 'Udemy',
    date: 'October 2023',
    link: 'https://www.udemy.com/certificate/UC-18077573-e617-42d6-8b7a-8f2d8d70a0cf/',
    category: 'Mobile Development',
    skills: ['Flutter', 'Dart', 'Mobile UI', 'State Management'],
    color: '#96CEB4',
  },
  {
    image: reactImg,
    title: 'React JS',
    institution: 'OpenClassrooms',
    date: 'September 2023',
    link: 'https://openclassrooms.com/fr/course-certificates/8609343030',
    category: 'Frontend Development',
    skills: ['React', 'JSX', 'Hooks', 'Component Architecture'],
    color: '#FFEAA7',
  },
  {
    image: nodeImg,
    title: 'Node JS/Express',
    institution: 'OpenClassrooms',
    date: 'October 2023',
    link: 'https://openclassrooms.com/fr/course-certificates/4249712619',
    category: 'Backend Development',
    skills: ['Node.js', 'Express', 'RESTful APIs', 'Database Integration'],
    color: '#DDA0DD',
  },
];

const Certifications = () => {
  const [ref, inView] = useInView({
    // threshold: 0.1,
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
      className="section-padding bg-dark-950/60 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 -left-32 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl"
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
      </div>

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
            &lt;certifications&gt;
          </motion.p> */}

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

          {/* <motion.p
            className="text-primary-400 font-mono mt-4"
            variants={itemVariants}
          >
            &lt;/certifications&gt;
          </motion.p> */}
        </motion.div>

        {/* Certifications grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {certificatesData.map((certificate, index) => (
            <motion.div
              key={certificate.title}
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
                    <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-white/20">
                      <img
                        src={certificate.image}
                        alt={certificate.title}
                        className="w-full h-full object-cover"
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
                      <span className="text-sm">{certificate.date}</span>
                    </div>
                  </div>
                </div>

                {/* Category badge */}
                <motion.div
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4"
                  style={{
                    backgroundColor: `${certificate.color}20`,
                    color: certificate.color,
                    border: `1px solid ${certificate.color}40`,
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {certificate.category}
                </motion.div>

                {/* Skills tags */}
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
                          backgroundColor: certificate.color + '20',
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Action button */}
                <motion.a
                  href={certificate.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 font-medium group/link transition-colors"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>View Certificate</span>
                  <motion.div
                    className="group-hover/link:translate-x-1 transition-transform"
                    whileHover={{ rotate: 45 }}
                  >
                    <FaExternalLinkAlt className="text-sm" />
                  </motion.div>
                </motion.a>

                {/* Decorative corner */}
                <motion.div
                  className="absolute top-4 right-4 w-12 h-12 opacity-10"
                  style={{ color: certificate.color }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <FaAward className="w-full h-full" />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
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
            <motion.div
              className="text-3xl font-bold text-gradient mb-2"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              6+
            </motion.div>
            <p className="text-gray-300 font-medium">Certifications Earned</p>
          </motion.div>

          <motion.div
            className="text-center glass-effect rounded-xl p-6 border border-white/10"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-3xl font-bold text-gradient mb-2">4</div>
            <p className="text-gray-300 font-medium">Technology Areas</p>
          </motion.div>

          <motion.div
            className="text-center glass-effect rounded-xl p-6 border border-white/10"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-3xl font-bold text-gradient mb-2">2024</div>
            <p className="text-gray-300 font-medium">Latest Achievement</p>
          </motion.div>
        </motion.div> */}

        {/* Call to action */}
        {/* <motion.div className="text-center mt-16" variants={itemVariants}>
          <motion.p
            className="text-gray-300 text-lg mb-8"
            variants={itemVariants}
          >
            Want to see my practical applications of these skills?
          </motion.p>

          <motion.a
            href="#projects"
            className="btn-primary inline-flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View My Projects</span>
            <span>🚀</span>
          </motion.a>
        </motion.div> */}
      </motion.div>
    </section>
  );
};

export default Certifications;
