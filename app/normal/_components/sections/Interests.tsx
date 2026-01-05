'use client';

import { motion } from 'framer-motion';
import {
  GiPuzzle,
  GiChessKnight,
  GiBookCover,
  GiPencilBrush,
  GiSpellBook,
  GiNightSleep,
} from 'react-icons/gi';
import { IconType } from 'react-icons';

interface Interest {
  name: string;
  icon: IconType;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  hoverBorder: string;
}

const interests: Interest[] = [
  {
    name: "Rubik's Cube",
    icon: GiPuzzle,
    description: 'Solving puzzles & speedcubing',
    color: 'from-red-500 to-orange-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
    hoverBorder: 'hover:border-red-500/40',
  },
  {
    name: 'Chess',
    icon: GiChessKnight,
    description: 'Strategic thinking & tactics',
    color: 'from-slate-400 to-slate-600',
    bgColor: 'bg-slate-500/10',
    borderColor: 'border-slate-500/20',
    hoverBorder: 'hover:border-slate-400/40',
  },
  {
    name: 'Reading',
    icon: GiBookCover,
    description: 'Books, articles & learning',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    hoverBorder: 'hover:border-blue-500/40',
  },
  {
    name: 'Drawing',
    icon: GiPencilBrush,
    description: 'Sketching & digital art',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    hoverBorder: 'hover:border-purple-500/40',
  },
  {
    name: 'Manga',
    icon: GiSpellBook,
    description: 'Japanese comics & anime',
    color: 'from-amber-500 to-yellow-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    hoverBorder: 'hover:border-amber-500/40',
  },
  {
    name: 'Sleeping',
    icon: GiNightSleep,
    description: 'Rest & recharge',
    color: 'from-indigo-500 to-violet-500',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20',
    hoverBorder: 'hover:border-indigo-500/40',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Interests() {
  return (
    <section
      id="interests"
      className="section-padding relative overflow-hidden"
    >
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Beyond <span className="text-gradient">Code</span>
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            When I&apos;m not coding, you&apos;ll find me exploring these
            interests
          </motion.p>
        </div>

        {/* Interests Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {interests.map((interest) => {
            const Icon = interest.icon;
            return (
              <motion.div
                key={interest.name}
                variants={itemVariants}
                className={`
                  group relative p-5 md:p-6 rounded-2xl 
                  ${interest.bgColor} ${interest.borderColor} ${interest.hoverBorder}
                  border backdrop-blur-sm
                  transition-all duration-300 
                  hover:scale-[1.02] hover:shadow-lg
                `}
                whileHover={{ y: -5 }}
              >
                {/* Icon */}
                <div
                  className={`
                  w-12 h-12 md:w-14 md:h-14 rounded-xl mb-4
                  flex items-center justify-center
                  bg-gradient-to-br ${interest.color}
                  shadow-lg
                `}
                >
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                  {interest.name}
                </h3>
                <p className="text-sm text-gray-400">{interest.description}</p>

                {/* Subtle glow on hover */}
                <div
                  className={`
                  absolute inset-0 rounded-2xl opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300
                  bg-gradient-to-br ${interest.color} blur-xl -z-10
                `}
                  style={{ opacity: 0.05 }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
