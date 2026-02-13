import { motion } from 'framer-motion';

const TopHeader = () => {
  const promoText = "WINTER SALE - UP TO 50% OFF SELECTED STYLES";
  
  return (
    <div className="top-header">
      <div className="promo-bar">
        <motion.div 
          className="promo-text-wrapper"
          initial={{ x: '100%' }}
          animate={{ x: '-100%' }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <span className="promo-text">{promoText}</span>
          <span className="promo-text">{promoText}</span>
          <span className="promo-text">{promoText}</span>
        </motion.div>
      </div>
    </div>
  );
};

export default TopHeader;