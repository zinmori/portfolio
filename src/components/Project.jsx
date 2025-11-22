'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCode } from 'react-icons/fa';
import { IoEyeOutline } from 'react-icons/io5';
import Image from 'next/image';

const Project = ({ title, imageUrl, projectLink, projectCodeLink }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="relative rounded-lg bg-transparent m-2 w-full text-white"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-64">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover rounded-t-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
        className="flex flex-row items-center justify-center absolute inset-0 bg-black rounded-lg bg-opacity-60 z-10"
      >
        {projectLink && (
          <a
            href={projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl m-2 hover:text-blue-950"
          >
            <IoEyeOutline />
          </a>
        )}
        {projectCodeLink && (
          <a
            href={projectCodeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl m-2 hover:text-blue-950"
          >
            <FaCode />
          </a>
        )}
      </motion.div>
      <h2 className="px-4 py-2 text-xl font-semibold">{title}</h2>
    </div>
  );
};

export default Project;
