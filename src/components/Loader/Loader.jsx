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
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* TRIVE Logo SVG - Based on uploaded image */}
          <svg width="140" height="140" viewBox="0 0 200 200" fill="none">
            {/* T */}
            <motion.path
              d="M30 40 L80 40 M55 40 L55 130"
              stroke="#a0a0a0"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
            />
            
            {/* R */}
            <motion.path
              d="M90 40 L90 130 M90 40 L120 40 Q135 40 135 55 Q135 70 120 70 L90 70 M120 70 L135 130"
              stroke="#a0a0a0"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
            />
            
            {/* V */}
            <motion.path
              d="M145 40 L165 130 L185 40"
              stroke="#a0a0a0"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>

        {/* text trive version 1*/}
        
        {/* <motion.h1 
          className="loader-brand"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          
        </motion.h1> */}
        
        <motion.div 
          className="loader-bar"
          initial={{ width: 0 }}
          animate={{ width: '160px' }}
          transition={{ duration: 1.5, delay: 1.4 }}
        >
          <motion.div 
            className="loader-progress"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ 
              duration: 1.2, 
              repeat: Infinity, 
              ease: "linear",
              delay: 1.6 
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Loader;