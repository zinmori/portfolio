import Skill from '../components/Skill';
import { motion } from 'framer-motion';

const skillsData = [
  { skill: 'HTML/CSS/JavaScript', percentage: 90 },
  { skill: 'React.js/Next.js', percentage: 85 },
  { skill: 'Bootstrap/Tailwind', percentage: 90 },
  { skill: 'Flutter/Dart', percentage: 80 },
  { skill: 'Firebase/Mongo DB', percentage: 80 },
  { skill: 'MySQL/PostgreSQL', percentage: 80 },
  { skill: 'Git/Github', percentage: 70 },
  { skill: 'Node.Js/Express', percentage: 70 },
  { skill: 'Python', percentage: 85 },
  { skill: 'Java', percentage: 75 },
];

const Skills = () => {
  return (
    <div
      id="skills"
      className="flex flex-col bg-slate-950 text-white items-center justify-center pt-10"
    >
      <h1 className="text-2xl font font-extrabold py-4">My Skills</h1>
      <motion.div
        initial={{
          opacity: 0,
          y: 100,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 1,
          },
        }}
        viewport={{ once: false }}
        className="bg-slate-900 rounded-lg w-[90%] p-4 flex flex-wrap"
      >
        {skillsData.map((skill) => (
          <Skill
            key={skill.skill}
            skill={skill.skill}
            percentage={skill.percentage}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Skills;
