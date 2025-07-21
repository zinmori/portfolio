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
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import { VscVscode } from 'react-icons/vsc';

const skillsData = [
  {
    name: 'Frontend',
    icon: FaReact,
    color: '#61DAFB',
    skills: [
      {
        name: 'HTML/CSS/JavaScript',
        level: 90,
        color: '#F7DF1E',
        icon: FaHtml5,
      },
      { name: 'React.js', level: 85, color: '#61DAFB', icon: FaReact },
      { name: 'Next.js', level: 80, color: '#FFFFFF', icon: SiNextdotjs },
      {
        name: 'Tailwind CSS',
        level: 90,
        color: '#06B6D4',
        icon: SiTailwindcss,
      },
      { name: 'Bootstrap', level: 85, color: '#7952B3', icon: FaBootstrap },
    ],
  },
  {
    name: 'Backend',
    icon: FaNodeJs,
    color: '#68A063',
    skills: [
      { name: 'Node.js/Express', level: 75, color: '#68A063', icon: FaNodeJs },
      {
        name: 'Python/Django/FastAPI',
        level: 85,
        color: '#3776AB',
        icon: FaPython,
      },
      { name: 'Java', level: 70, color: '#ED8B00', icon: FaJava },
      { name: 'RESTful APIs', level: 80, color: '#FF6B6B', icon: TbApi },
    ],
  },
  {
    name: 'Database',
    icon: FaDatabase,
    color: '#F29111',
    skills: [
      { name: 'MongoDB', level: 80, color: '#47A248', icon: SiMongodb },
      { name: 'MySQL', level: 80, color: '#00758F', icon: SiMysql },
      { name: 'PostgreSQL', level: 75, color: '#336791', icon: SiPostgresql },
      { name: 'Firebase', level: 85, color: '#FFCA28', icon: SiFirebase },
    ],
  },
  {
    name: 'Mobile & Tools',
    icon: SiFlutter,
    color: '#02569B',
    skills: [
      { name: 'Flutter/Dart', level: 80, color: '#02569B', icon: SiFlutter },
      { name: 'Git/GitHub', level: 85, color: '#F05032', icon: SiGit },
      {
        name: 'Visual Studio Code',
        level: 85,
        color: '#007ACC',
        icon: VscVscode,
      },
    ],
  },
  {
    name: 'Data Science & AI',
    icon: FaRobot,
    color: '#FF6F00',
    skills: [
      { name: 'Pandas, Numpy', level: 85, color: '#150458', icon: SiPandas },
      {
        name: 'Scikit-learn',
        level: 80,
        color: '#F7931E',
        icon: SiScikitlearn,
      },
      { name: 'Pytorch', level: 70, color: '#EE4C2C', icon: SiPytorch },
      { name: 'Tensorflow', level: 65, color: '#FF6F00', icon: SiTensorflow },
      {
        name: 'GIS, Geopandas, QGis, Google Earth Engine',
        level: 65,
        color: '#589632',
        icon: SiQgis,
      },
    ],
  },
];

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const categoryVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="skills"
      className="section-padding bg-dark-950 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-40 bg-secondary-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.5, 1, 1.5],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
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
        <motion.div className="text-center mb-16" variants={categoryVariants}>
          {/* <motion.p
            className="text-primary-400 font-mono text-lg tracking-wide mb-4"
            variants={categoryVariants}
          >
            &lt;skills&gt;
          </motion.p> */}

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

          {/* <motion.p
            className="text-primary-400 font-mono mt-4"
            variants={categoryVariants}
          >
            &lt;/skills&gt;
          </motion.p> */}
        </motion.div>

        {/* Skills grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {skillsData.map((category, categoryIndex) => (
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
                  <p className="text-gray-400 font-mono text-sm">Development</p>
                </div>
              </div>

              {/* Skills list */}
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="space-y-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      delay: 0.5 + categoryIndex * 0.2 + skillIndex * 0.1,
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">
                        {skill.icon && (
                          <skill.icon className="inline-block mr-2" />
                        )}
                        {skill.name}
                      </span>
                      <span
                        className="font-mono text-sm font-bold"
                        style={{ color: skill.color }}
                      >
                        {skill.level}%
                      </span>
                    </div>

                    <div className="relative">
                      <div className="w-full bg-dark-700 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full relative overflow-hidden"
                          style={{ backgroundColor: skill.color }}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : {}}
                          transition={{
                            duration: 1.5,
                            delay: 0.7 + categoryIndex * 0.2 + skillIndex * 0.1,
                            ease: 'easeOut',
                          }}
                        >
                          {/* Shimmer effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'linear',
                              delay:
                                1.2 + categoryIndex * 0.2 + skillIndex * 0.1,
                            }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        {/* <motion.div className="text-center mt-16" variants={categoryVariants}>
          <motion.p
            className="text-gray-300 text-lg mb-8"
            variants={categoryVariants}
          >
            Interested in working together? Let&apos;s build something amazing!
          </motion.p>

          <motion.a
            href="#contact"
            className="btn-primary inline-flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Start a Project</span>
            <span>✨</span>
          </motion.a>
        </motion.div> */}
      </motion.div>
    </section>
  );
};

export default Skills;
