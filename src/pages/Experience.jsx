import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  //   FaBriefcase,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCode,
  FaLaptopCode,
  //   FaUsers,
  FaProjectDiagram,
  FaRocket,
} from 'react-icons/fa';

const experienceData = [
  {
    title: 'Data Analyst/Scientist',
    company: 'Togo Data Lab - Ministry of Digital Economy and Transformation',
    type: 'Full-time',
    period: 'December 2024 - Present',
    location: 'Lomé, Togo',
    description:
      'Led a team project analyzing climate data for West Africa, applying machine learning techniques to predict weather patterns.',
    achievements: [
      'Collected and cleaned datasets from multiple weather stations',
      'Applied machine learning algorithms for pattern recognition',
      'Created data visualizations using Python and matplotlib',
      'Presented findings to university faculty and peers',
      'Published research findings in university journal',
    ],
    technologies: [
      'Python',
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'Matplotlib',
      'Jupyter',
    ],
    color: '#f093fb',
    icon: FaProjectDiagram,
  },
  {
    title: 'Course material Tester',
    company: 'Deeplearning.AI',
    type: 'Volunteer',
    period: 'April 2024 - Present',
    location: 'Remote',
    description:
      'Testing and providing feedback on course materials for the Deep Learning Specialization, ensuring high-quality educational content.',
    achievements: [
      'Reviewed and tested course materials for accuracy and clarity',
      'Provided constructive feedback to improve course content',
      'Collaborated with course developers to enhance learning experience',
    ],
    technologies: ['Python', 'Jupyter Notebooks', 'GitHub', 'Markdown'],
    color: '#f472b6',
    icon: FaLaptopCode,
  },

  {
    title: 'Full Stack Developer Intern',
    company: 'Mitsio Motu',
    type: 'Internship',
    period: 'July 2024 - December 2024',
    location: 'Lomé, Togo',
    description:
      'Contributed to the development of an e-commerce platform, gaining hands-on experience in agile development and team collaboration.',
    achievements: [
      'Developed frontend components using React.js and Tailwind CSS',
      'Implemented user authentication and authorization features',
      'Optimized application performance, reducing load time by 30%',
      'Participated in code reviews and agile development processes',
      'Created technical documentation for new features',
    ],
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Git', 'REST APIs'],
    color: '#0891b2',
    icon: FaCode,
  },
  {
    title: 'Full Stack Developer',
    company: 'Freelance',
    type: 'Remote',
    period: 'January 2023 - Present',
    location: 'Remote',
    description:
      'Developing custom web and mobile applications for various clients, focusing on modern technologies and user-centered design.',
    achievements: [
      'Built 10+ responsive web applications using React.js and Next.js',
      'Developed 3 mobile applications using Flutter/Dart',
      'Implemented RESTful APIs with Node.js and Express',
      'Integrated various databases including MongoDB and PostgreSQL',
      'Collaborated with international clients across different time zones',
    ],
    technologies: [
      'React',
      'Next.js',
      'Node.js',
      'Flutter',
      'MongoDB',
      'PostgreSQL',
      'Firebase',
    ],
    color: '#06b6d4',
    icon: FaLaptopCode,
  },
];

const Experience = () => {
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
      className="section-padding bg-dark-950/40 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 -left-32 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
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
            scale: [1.4, 1, 1.4],
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
            &lt;experience&gt;
          </motion.p> */}

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

          {/* <motion.p
            className="text-primary-400 font-mono mt-4"
            variants={itemVariants}
          >
            &lt;/experience&gt;
          </motion.p> */}
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-secondary-500 to-primary-500 hidden md:block" />

          <div className="space-y-12">
            {experienceData.map((exp, index) => (
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

        {/* Bottom stats */}
        {/* <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6"
          variants={itemVariants}
        >
          <motion.div
            className="text-center glass-effect rounded-xl p-6 border border-white/10"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-3xl font-bold text-gradient mb-2">2+</div>
            <p className="text-gray-300 font-medium">Years Experience</p>
          </motion.div>

          <motion.div
            className="text-center glass-effect rounded-xl p-6 border border-white/10"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-3xl font-bold text-gradient mb-2">15+</div>
            <p className="text-gray-300 font-medium">Projects Completed</p>
          </motion.div>

          <motion.div
            className="text-center glass-effect rounded-xl p-6 border border-white/10"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-3xl font-bold text-gradient mb-2">5+</div>
            <p className="text-gray-300 font-medium">Technologies Mastered</p>
          </motion.div>

          <motion.div
            className="text-center glass-effect rounded-xl p-6 border border-white/10"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-3xl font-bold text-gradient mb-2">100%</div>
            <p className="text-gray-300 font-medium">Client Satisfaction</p>
          </motion.div>
        </motion.div> */}

        {/* Call to action */}
        {/* <motion.div className="text-center mt-16" variants={itemVariants}>
          <motion.p
            className="text-gray-300 text-lg mb-8"
            variants={itemVariants}
          >
            Ready to add your project to my experience? Let&apos;s work
            together!
          </motion.p>

          <motion.a
            href="#contact"
            className="btn-primary inline-flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Start a Project</span>
            <span>🚀</span>
          </motion.a>
        </motion.div> */}
      </motion.div>
    </section>
  );
};

export default Experience;
