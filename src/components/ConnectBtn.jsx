import { motion } from 'framer-motion';
import { useState } from 'react';

const ConnectBtn = ({ Icon, link }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group p-3 rounded-full glass-effect border border-white/10 text-white hover:text-primary-400 transition-all duration-300"
      whileHover={{
        scale: 1.1,
        rotateY: 15,
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-primary"
        layoutId="glow"
        animate={{ opacity: isHover ? 0.2 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Icon */}
      <motion.div
        className="relative z-10 text-xl"
        whileHover={{ rotate: [0, -10, 10, -5, 0] }}
        transition={{ duration: 0.5 }}
      >
        <Icon />
      </motion.div>

      {/* Pulse effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary-400"
        animate={{
          opacity: isHover ? 1 : 0,
          scale: isHover ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background:
            'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
        }}
      />
    </motion.a>
  );
};

export default ConnectBtn;
