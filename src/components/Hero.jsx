import React from 'react';
import { motion } from 'framer-motion';
import ImageCarousel from './ImageCarousel';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      {/* Background Placeholder - "Video or Image" */}
      <div className="hero-bg-placeholder">
        <div className="hero-bg-overlay"></div>
        {/* Placeholder text for User to know where to put assets */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#333', fontSize: '2rem', textTransform: 'uppercase', textAlign: 'center' }}>
          Background Video/Image Asset
        </div>
      </div>

      <div className="container" style={{ textAlign: 'center', zIndex: 1, maxWidth: '100%', padding: '0' }}>
        
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.5, duration: 0.8 }}
           style={{ width: '100%' }}
        >
          <ImageCarousel />
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.8, duration: 0.8 }}
        >
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
