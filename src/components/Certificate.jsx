/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';

const Certificate = ({ image, title, institution, date, link }) => {
  return (
    <motion.div
      className="shadow-md rounded-lg p-4 m-2 w-full flex flex-col items-center  md:flex-row gap-8"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.img
        src={image}
        alt={title}
        className="w-96 md:w-1/2 rounded-lg"
        initial={{
          opacity: 0,
          x: -50,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.5,
          },
        }}
      />
      <motion.div
        className="flex flex-col"
        initial={{
          opacity: 0,
          x: 50,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.5,
          },
        }}
      >
        <h2 className="text-2xl font-light mb-2">{title}</h2>
        <p className="text-gray-700 mb-2">{institution}</p>
        <p className="text-gray-500 mb-4">{date}</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          View Certificate
        </a>
      </motion.div>
    </motion.div>
  );
};

export default Certificate;
