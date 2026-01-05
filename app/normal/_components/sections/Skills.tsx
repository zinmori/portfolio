'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDatabase,
  FaBootstrap,
  FaHtml5,
  FaJava,
  FaRobot,
  FaGamepad,
  FaServer,
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTailwindcss,
  SiFlutter,
  SiFirebase,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiGit,
  SiPandas,
  SiScikitlearn,
  SiPytorch,
  SiTensorflow,
  SiQgis,
  SiDocker,
  SiPostman,
  SiFigma,
  SiAmazonwebservices,
  SiJupyter,
  SiVercel,
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import { VscVscode } from 'react-icons/vsc';
import { IconType } from 'react-icons';

interface Skill {
  name: string;
  color: string;
  icon: IconType;
}

interface SkillCategory {
  name: string;
  icon: IconType;
  color: string;
  skills: Skill[];
}

const skillsData: SkillCategory[] = [
  {
    name: 'Data Science & AI',
    icon: FaRobot,
    color: '#FF6F00',
    skills: [
      { name: 'Pandas, Numpy', color: '#150458', icon: SiPandas },
      { name: 'Scikit-learn', color: '#F7931E', icon: SiScikitlearn },
      { name: 'Pytorch', color: '#EE4C2C', icon: SiPytorch },
      { name: 'Tensorflow', color: '#FF6F00', icon: SiTensorflow },
      { name: 'AutoGluon', color: '#FF6F00', icon: FaRobot },
      {
        name: 'GIS, Geopandas, QGis, Google Earth Engine',
        color: '#589632',
        icon: SiQgis,
      },
    ],
  },
  {
    name: 'Frontend',
    icon: FaReact,
    color: '#61DAFB',
    skills: [
      { name: 'HTML/CSS/JavaScript', color: '#F7DF1E', icon: FaHtml5 },
      { name: 'React.js', color: '#61DAFB', icon: FaReact },
      { name: 'Next.js', color: '#FFFFFF', icon: SiNextdotjs },
      { name: 'Tailwind CSS', color: '#27E6E2', icon: SiTailwindcss },
      { name: 'Bootstrap', color: '#7952B3', icon: FaBootstrap },
    ],
  },
  {
    name: 'Backend',
    icon: FaServer,
    color: '#68A063',
    skills: [
      { name: 'Node.js/Express', color: '#68A063', icon: FaNodeJs },
      { name: 'Python/Django/FastAPI', color: '#3776AB', icon: FaPython },
      { name: 'Java', color: '#ED8B00', icon: FaJava },
      { name: 'RESTful APIs', color: '#FF6B6B', icon: TbApi },
    ],
  },
  {
    name: 'Database',
    icon: FaDatabase,
    color: '#F29111',
    skills: [
      { name: 'MongoDB', color: '#47A248', icon: SiMongodb },
      { name: 'MySQL', color: '#00758F', icon: SiMysql },
      { name: 'PostgreSQL', color: '#336791', icon: SiPostgresql },
      { name: 'Firebase', color: '#FFCA28', icon: SiFirebase },
    ],
  },
  {
    name: 'Tools & DevOps',
    icon: SiGit,
    color: '#F05032',
    skills: [
      { name: 'Git/GitHub', color: '#F05032', icon: SiGit },
      { name: 'Docker', color: '#2496ED', icon: SiDocker },
      { name: 'AWS', color: '#FF9900', icon: SiAmazonwebservices },
      { name: 'Vercel', color: '#000000', icon: SiVercel },
      { name: 'Postman', color: '#FF6C37', icon: SiPostman },
      { name: 'Figma', color: '#F24E1E', icon: SiFigma },
    ],
  },
  {
    name: 'Others',
    icon: SiFlutter,
    color: '#02569B',
    skills: [
      { name: 'Flutter/Dart', color: '#02569B', icon: SiFlutter },
      { name: 'Pygame', color: '#FFFFFF', icon: FaGamepad },
      { name: 'Jupyter', color: '#FF6F00', icon: SiJupyter },
      { name: 'Visual Studio Code', color: '#007ACC', icon: VscVscode },
    ],
  },
];

export default function Skills() {
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

  const categoryVariants = {
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
    <section id="skills" className="section-padding relative overflow-hidden">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="section-container relative z-10"
      >
        {/* Section header */}
        <motion.div className="text-center mb-16" variants={categoryVariants}>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6"
            variants={categoryVariants}
          >
            Technical <span className="text-gradient">Expertise</span>
          </motion.h2>

          <motion.p
            className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed"
            variants={categoryVariants}
          >
            I love working with cutting-edge technologies and constantly
            expanding my skill set. Here&apos;s what I bring to the table.
          </motion.p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {skillsData.map((category) => (
            <motion.div
              key={category.name}
              variants={categoryVariants}
              className="glass-effect rounded-2xl p-8 border border-white/10 card-hover group"
            >
              {/* Category header */}
              <div className="flex items-center space-x-4 mb-8">
                <motion.div
                  className="p-3 rounded-full"
                  style={{ backgroundColor: `${category.color}20` }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <category.icon
                    className="text-2xl"
                    style={{ color: category.color }}
                  />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-white">
                    {category.name}
                  </h3>
                </div>
              </div>

              {/* Skills list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-white/5"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: `${skill.color}20`,
                      borderColor: `${skill.color}40`,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {skill.icon && (
                      <skill.icon
                        className="text-lg flex-shrink-0"
                        style={{ color: skill.color }}
                      />
                    )}
                    <span className="text-white font-medium text-sm">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
