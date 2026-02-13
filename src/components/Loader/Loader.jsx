import { motion } from 'framer-motion';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <motion.div 
        className="loader-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="loader-logo"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <motion.path
              d="M20 40 L60 100 L60 40 L100 100"
              stroke="#010101"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
        
        <motion.h1 
          className="loader-brand"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          TRIVÉ
        </motion.h1>
        
        <motion.div 
          className="loader-bar"
          initial={{ width: 0 }}
          animate={{ width: '200px' }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          <motion.div 
            className="loader-progress"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ 
              duration: 1.2, 
              repeat: Infinity, 
              ease: "linear",
              delay: 1.2 
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Loader;