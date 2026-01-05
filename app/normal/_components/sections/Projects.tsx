'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
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
import { IconType } from 'react-icons';

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  demoUrl?: string;
  repoUrl?: string;
  tags?: string[];
}

interface MappedProject extends Project {
  imgUrl?: string;
  projectLink?: string;
  projectCodeLink?: string;
}

const filterOptions = [
  { label: 'All Projects', value: 'All', icon: FaCode },
  { label: 'Data Science & AI', value: 'Data', icon: FaPython },
  { label: 'Web Development', value: 'Web', icon: FaReact },
  { label: 'Mobile Apps', value: 'Mobile', icon: SiFlutter },
];

export default function Projects() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [projects, setProjects] = useState<MappedProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<MappedProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data: Project[] = await res.json();
          const mappedData: MappedProject[] = data.map((p) => ({
            ...p,
            imgUrl: p.image,
            projectLink: p.demoUrl,
            projectCodeLink: p.repoUrl,
          }));
          setProjects(mappedData);
          setFilteredProjects(mappedData);
        }
      } catch (error) {
        console.error('Failed to fetch projects', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const [ref, inView] = useInView({
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

  const filterProjects = (filter: string) => {
    setSelectedFilter(filter);
    if (filter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.tags?.includes(filter)),
      );
    }
  };

  const getTechIcon = (tech: string): React.ReactNode => {
    const techMap: Record<string, React.ReactNode> = {
      react: <FaReact className="text-blue-400" />,
      'next.js': <SiNextdotjs className="text-white" />,
      'node.js': <FaNodeJs className="text-green-500" />,
      python: <FaPython className="text-yellow-400" />,
      flutter: <SiFlutter className="text-blue-500" />,
      mongodb: <SiMongodb className="text-green-600" />,
      'tailwind css': <SiTailwindcss className="text-green-400" />,
      express: <SiExpress className="text-gray-400" />,
      dart: <SiDart className="text-blue-400" />,
      firebase: <SiFirebase className="text-yellow-400" />,
      javascript: <SiJavascript className="text-yellow-400" />,
      css: <SiCss3 className="text-blue-400" />,
      html: <SiHtml5 className="text-orange-400" />,
      sqlite: <SiSqlite className="text-gray-400" />,
      pandas: <SiPandas className="text-blue-400" />,
      numpy: <SiNumpy className="text-blue-400" />,
      plotly: <SiPlotly className="text-blue-400" />,
      ml: <FaRobot className="text-blue-400" />,
      jupyter: <SiJupyter className="text-blue-400" />,
      'push notifications': <FaRocket className="text-orange-400" />,
      'scikit-learn': <SiScikitlearn className="text-blue-400" />,
      matplotlib: <SiPlotly className="text-blue-400" />,
      seaborn: <SiPlotly className="text-blue-400" />,
      tensorflow: <SiTensorflow className="text-orange-400" />,
      pytorch: <SiPytorch className="text-red-600" />,
      'reinforcement learning': <FaRobot className="text-blue-400" />,
    };
    return techMap[tech.toLowerCase()] || <FaCode className="text-gray-400" />;
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
            {filteredProjects.map((project) => (
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
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    {project.imgUrl && (
                      <Image
                        src={project.imgUrl}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    )}
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/50 to-transparent" /> */}

                    {/* Action buttons overlay */}
                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.projectCodeLink && (
                        <motion.a
                          href={project.projectCodeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-dark-800/80 rounded-full text-white hover:bg-primary-500 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaGithub />
                        </motion.a>
                      )}
                      {project.projectLink && (
                        <motion.a
                          href={project.projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-dark-800/80 rounded-full text-white hover:bg-primary-500 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaExternalLinkAlt />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-display font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.slice(0, 4).map((tech) => (
                        <div
                          key={tech}
                          className="flex items-center space-x-1 px-2 py-1 bg-dark-700/50 rounded-full text-xs"
                        >
                          {getTechIcon(tech)}
                          <span className="text-gray-300">{tech}</span>
                        </div>
                      ))}
                      {project.technologies &&
                        project.technologies.length > 4 && (
                          <span className="px-2 py-1 bg-dark-700/50 rounded-full text-xs text-gray-400">
                            +{project.technologies.length - 4}
                          </span>
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
