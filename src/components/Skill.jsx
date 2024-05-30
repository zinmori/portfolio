/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const Skill = ({ skill, percentage }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false });

  useEffect(() => {
    if (inView) {
      controls.start({ width: `${percentage}%` });
    } else {
      controls.start({ width: 0 });
    }
  }, [controls, inView, percentage]);

  return (
    <div ref={ref} className="mb-4 w-full md:w-1/2 p-4">
      <span className="block mb-2">{skill}</span>
      <div className="relative">
        <div className="h-2 rounded bg-blue-100">
          <motion.div
            className="h-2 rounded bg-blue-900"
            initial={{ width: 0 }}
            animate={controls}
            transition={{ duration: 2 }}
          ></motion.div>
        </div>
        <span className="absolute bottom-2 right-0 text-sm">{percentage}%</span>
      </div>
    </div>
  );
};

export default Skill;
