'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaGithub,
  FaExternalLinkAlt,
  FaReact,
  FaNodeJs,
  FaPython,
  FaCode,
  FaRocket,
  FaRobot,
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiFlutter,
  SiMongodb,
  SiTailwindcss,
  SiExpress,
  SiDart,
  SiFirebase,
  SiJavascript,
  SiCss3,
  SiHtml5,
  SiSqlite,
  SiPandas,
  SiNumpy,
  SiPlotly,
  SiJupyter,
  SiScikitlearn,
  SiTensorflow,
  SiPytorch,
} from 'react-icons/si';

const projectsData = [
  {
    imgUrl: '/images/snake.png',
    title: 'Snake Game AI Agent',
    description:
      'Reinforcement learning project where an AI agent learns to play the classic Snake game using deep Q-learning algorithms, achieving optimal gameplay through trial and error.',
    projectCodeLink: 'https://github.com/zinmori/snake_ai',
    projectLink: 'https://snakeaiz.streamlit.app/',
    category: 'Data Science',
    technologies: [
      'Python',
      'PyTorch',
      'Reinforcement Learning',
      'Deep Q-Learning',
    ],
    tags: ['All', 'Data'],
    color: '#8B5CF6',
    featured: false,
  },
  {
    imgUrl: '/images/flower.jpeg',
    title: 'Flower Classification',
    description:
      'Image classification project using deep learning to identify different species of flowers with high accuracy.',
    projectCodeLink: 'https://github.com/zinmori/flowers_app',
    projectLink: 'https://flowers-app.streamlit.app/',
    category: 'Data Science',
    technologies: ['Python', 'PyTorch', 'ResNet', 'CNN', 'Computer Vision'],
    tags: ['All', 'Data'],
    color: '#8B5CF6',
    featured: false,
  },
  {
    imgUrl: '/images/gplay.png',
    title: 'Analysis of the Android Market on Play Store',
    description:
      'Comprehensive data analysis of Android apps on Google Play Store, exploring market trends, user ratings, and app categories using Python and data science techniques.',
    projectCodeLink:
      'https://app.datacamp.com/workspace/w/e7057801-47eb-4ca8-b549-916dd6740ae3/edit',
    category: 'Data Science',
    technologies: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
    tags: ['All', 'Data'],
    color: '#FF6B6B',
    featured: false,
  },
  {
    imgUrl: '/images/co2Afr.png',
    title: 'Analysis of the CO2 Emission in Africa',
    description:
      'Environmental data analysis project examining CO2 emission patterns across African countries, identifying trends and providing insights for climate action.',
    projectCodeLink:
      'https://app.datacamp.com/workspace/w/3fa278e9-7c61-4134-a1c9-c3604a9b87f0/edit',
    category: 'Data Science',
    technologies: ['Python', 'NumPy', 'Plotly', 'Jupyter'],
    tags: ['All', 'Data'],
    color: '#4ECDC4',
  },
  {
    imgUrl: '/images/creditCard.webp',
    title: 'Predicting Credit Card Approvals',
    description:
      'Machine learning project for predicting credit card approval decisions using classification algorithms and feature engineering techniques.',
    projectCodeLink:
      'https://app.datacamp.com/workspace/w/d42d9ccb-b97d-4fcb-a802-556f23ab3959/edit',
    category: 'Data Science',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'ML'],
    tags: ['All', 'Data'],
    color: '#45B7D1',
    featured: false,
  },
  {
    imgUrl: '/images/sps.png',
    title: 'Blood Bank Management System',
    description:
      'Full-stack web application for managing blood bank operations, featuring donor registration, inventory tracking, and request management with modern UI/UX.',
    projectLink: 'https://sps-z.vercel.app',
    projectCodeLink: 'https://github.com/zinmori/sps_web',
    category: 'Web Development',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    tags: ['All', 'Web'],
    color: '#96CEB4',
    featured: false,
  },
  {
    imgUrl: '/images/food.png',
    title: 'Food Delivery Platform',
    description:
      'Modern food delivery web application with real-time ordering, payment integration, and restaurant management features built with React and Next.js.',
    projectLink: 'https://zfood-beige.vercel.app/',
    projectCodeLink: 'https://github.com/zinmori/zfood',
    category: 'Web Development',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Firebase'],
    tags: ['All', 'Web'],
    color: '#FFEAA7',
  },
  {
    imgUrl: '/images/term.png',
    title: 'Terminal Portfolio',
    description:
      'Unique terminal-based portfolio website simulating a command-line interface, showcasing projects and skills in an interactive way.',
    projectLink: 'https://bigz.vercel.app',
    projectCodeLink: 'https://github.com/zinmori/terminal-portfolio',
    category: 'Web Development',
    technologies: ['JavaScript', 'CSS', 'HTML', 'Terminal UI'],
    tags: ['All', 'Web'],
    color: '#DDA0DD',
  },
  {
    imgUrl: '/images/Meals.png',
    title: 'Meal Discovery App',
    description:
      'Cross-platform mobile application for discovering and exploring meal recipes with detailed instructions, ingredients, and nutritional information.',
    projectCodeLink: 'https://github.com/zinmori/meals',
    category: 'Mobile Development',
    technologies: ['Flutter', 'Dart', 'API Integration', 'SQLite'],
    tags: ['All', 'Mobile'],
    color: '#FFB74D',
  },
  {
    imgUrl: '/images/spsmob.png',
    title: 'Blood Donation Mobile App',
    description:
      'Mobile companion app for the blood bank system, enabling donors to schedule appointments, track donations, and receive notifications.',
    projectCodeLink: 'https://github.com/zinmori/sps_mobile',
    category: 'Mobile Development',
    technologies: ['Flutter', 'Dart', 'Firebase', 'Push Notifications'],
    tags: ['All', 'Mobile'],
    color: '#F06292',
    featured: false,
  },
  {
    imgUrl: '/images/muzik.png',
    title: 'Music Player App',
    description:
      'Feature-rich music player application with playlist management, audio visualization, and modern UI design built with Flutter.',
    projectCodeLink: 'https://github.com/zinmori/muzic',
    category: 'Mobile Development',
    technologies: ['Flutter', 'Dart', 'Audio APIs', 'State Management'],
    tags: ['All', 'Mobile'],
    color: '#BA68C8',
  },
];

const filterOptions = [
  { label: 'All Projects', value: 'All', icon: FaCode },
  { label: 'Data Science & AI', value: 'Data', icon: FaPython },
  { label: 'Web Development', value: 'Web', icon: FaReact },
  { label: 'Mobile Apps', value: 'Mobile', icon: SiFlutter },
];

export default function Projects() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);

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

  const filterProjects = (filter) => {
    setSelectedFilter(filter);
    if (filter === 'All') {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(
        projectsData.filter((project) => project.tags.includes(filter)),
      );
    }
  };

  const getTechIcon = (tech) => {
    switch (tech.toLowerCase()) {
      case 'react':
        return <FaReact className="text-blue-400" />;
      case 'next.js':
        return <SiNextdotjs className="text-white" />;
      case 'node.js':
        return <FaNodeJs className="text-green-500" />;
      case 'python':
        return <FaPython className="text-yellow-400" />;
      case 'flutter':
        return <SiFlutter className="text-blue-500" />;
      case 'mongodb':
        return <SiMongodb className="text-green-600" />;
      case 'tailwind css':
        return <SiTailwindcss className="text-green-400" />;
      case 'express':
        return <SiExpress className="text-gray-400" />;
      case 'dart':
        return <SiDart className="text-blue-400" />;
      case 'firebase':
        return <SiFirebase className="text-yellow-400" />;
      case 'javascript':
        return <SiJavascript className="text-yellow-400" />;
      case 'css':
        return <SiCss3 className="text-blue-400" />;
      case 'html':
        return <SiHtml5 className="text-orange-400" />;
      case 'sqlite':
        return <SiSqlite className="text-gray-400" />;
      case 'pandas':
        return <SiPandas className="text-blue-400" />;
      case 'numpy':
        return <SiNumpy className="text-blue-400" />;
      case 'plotly':
        return <SiPlotly className="text-blue-400" />;
      case 'ml':
        return <FaRobot className="text-blue-400" />;
      case 'jupyter':
        return <SiJupyter className="text-blue-400" />;
      case 'push notifications':
        return <FaRocket className="text-orange-400" />;
      case 'scikit-learn':
        return <SiScikitlearn className="text-blue-400" />;
      case 'matplotlib':
        return <SiPlotly className="text-blue-400" />;
      case 'seaborn':
        return <SiPlotly className="text-blue-400" />;
      case 'tensorflow':
        return <SiTensorflow className="text-orange-400" />;
      case 'pytorch':
        return <SiPytorch className="text-red-600" />;
      case 'reinforcement learning':
        return <FaRobot className="text-blue-400" />;
      default:
        return <FaCode className="text-gray-400" />;
    }
  };

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
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
            Featured <span className="text-gradient">Projects</span>
          </motion.h2>

          <motion.p
            className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            A showcase of my technical skills and creative problem-solving
            abilities across web development, mobile apps, and data science
            projects.
          </motion.p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          variants={itemVariants}
        >
          {filterOptions.map((option) => (
            <motion.button
              key={option.value}
              onClick={() => filterProjects(option.value)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedFilter === option.value
                  ? 'bg-gradient-primary text-white shadow-lg'
                  : 'glass-effect text-gray-300 hover:text-white border border-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <option.icon className="text-sm" />
              <span>{option.label}</span>
              {selectedFilter === option.value && (
                <motion.div
                  className="w-2 h-2 bg-white rounded-full"
                  layoutId="activeFilter"
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFilter}
            className="grid lg:grid-cols-3 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                className="group relative"
                layout
              >
                <motion.div
                  className="glass-effect rounded-2xl overflow-hidden border border-white/10 card-hover h-full"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Project image */}
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={project.imgUrl}
                      alt={project.title}
                      className="w-full h-64 object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />

                    {/* Featured badge */}
                    {project.featured && (
                      <motion.div
                        className="absolute top-4 left-4 bg-gradient-primary px-3 py-1 rounded-full text-white text-xs font-medium flex items-center space-x-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <FaRocket className="text-xs" />
                        <span>Featured</span>
                      </motion.div>
                    )}

                    {/* Overlay on hover */}
                    <motion.div className="absolute inset-0 bg-black/60 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.projectLink && (
                        <motion.a
                          href={project.projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white/20 rounded-full text-white hover:bg-primary-500 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaExternalLinkAlt />
                        </motion.a>
                      )}
                      {project.projectCodeLink && (
                        <motion.a
                          href={project.projectCodeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white/20 rounded-full text-white hover:bg-primary-500 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaGithub />
                        </motion.a>
                      )}
                    </motion.div>
                  </div>

                  {/* Project content */}
                  <div className="p-6">
                    <h3 className="text-xl font-display font-bold text-white mb-3 line-clamp-2">
                      {project.title}
                    </h3>

                    <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <motion.div
                          key={tech}
                          className="flex items-center space-x-1 px-2 py-1 bg-dark-700/50 rounded-full text-xs font-medium text-gray-300 border border-white/10"
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: project.color + '20',
                          }}
                        >
                          {getTechIcon(tech)}
                          <span>{tech}</span>
                        </motion.div>
                      ))}
                      {project.technologies.length > 4 && (
                        <div className="px-2 py-1 bg-dark-700/50 rounded-full text-xs text-gray-400 border border-white/10">
                          +{project.technologies.length - 4} more
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
