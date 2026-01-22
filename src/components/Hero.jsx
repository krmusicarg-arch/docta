import React from 'react';
import { motion } from 'framer-motion';
import ImageCarousel from './ImageCarousel';

const Hero = () => {
  return (
    <section id="home" style={{ height: '100vh', width: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingTop: '150px' }}>
      {/* Background Placeholder - "Video or Image" */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#1a1a1a', zIndex: -1 }}>
        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #000 0%, #222 100%)', opacity: 0.5 }}></div>
        {/* Placeholder text for User to know where to put assets */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#333', fontSize: '2rem', textTransform: 'uppercase', textAlign: 'center' }}>
          Background Video/Image Asset
        </div>
      </div>

      <div className="container" style={{ textAlign: 'center', zIndex: 1 }}>
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ fontSize: 'clamp(2rem, 7.5vw, 6rem)', lineHeight: 0.8, marginBottom: '20px' }}>
          Docta Boss
        </motion.h1>
        
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.5, duration: 0.8 }}
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
