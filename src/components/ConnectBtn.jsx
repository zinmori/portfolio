import { motion } from 'framer-motion';

const ConnectBtn = ({ Icon, link }) => {
  return (
    <motion.a
      initial={{ scale: '100%' }}
      whileHover={{ scale: '120%' }}
      href={link}
      target="_blank"
    >
      <Icon />
    </motion.a>
  );
};

export default ConnectBtn;
