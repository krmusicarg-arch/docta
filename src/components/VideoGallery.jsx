import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const videos = [
  { src: '/videos/midnite1.mp4', title: 'Midnite Special', subtitle: 'En vivo — Festival Bandas Tributo' },
  { src: '/videos/midnite2.mp4', title: 'Midnite Special', subtitle: 'En vivo' },
  { src: '/videos/midnite3.mp4', title: 'Midnite Special', subtitle: 'En vivo' },
  { src: '/videos/midnite4.mp4', title: 'Midnite Special', subtitle: 'En vivo' },
  { src: '/videos/midnite5.mp4', title: 'Midnite Special', subtitle: 'En vivo' },
  { src: '/videos/midnite6.mp4', title: 'Midnite Special', subtitle: 'En vivo' },
  { src: '/videos/midnite7.mp4', title: 'Midnite Special', subtitle: 'En vivo' },
];

/* ─── Card individual ─── */
const VideoCard = ({ video, index, onOpen }) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isHovered) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpen(index)}
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: '177.78%', /* 16:9 invertido = 9:16 */
        borderRadius: '4px',
        overflow: 'hidden',
        cursor: 'pointer',
        background: '#111',
        border: `1px solid ${isHovered ? 'rgba(212,160,23,0.5)' : 'rgba(255,255,255,0.07)'}`,
        transition: 'border-color 0.3s',
      }}
    >
      {/* Inner wrapper absoluto para llenar el espacio del padding-bottom */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <video
          ref={videoRef}
          src={video.src}
          muted
          playsInline
          preload="metadata"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.4s ease',
            transform: isHovered ? 'scale(1.04)' : 'scale(1)',
          }}
        />

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: isHovered
            ? 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%)'
            : 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 100%)',
          transition: 'background 0.3s',
        }} />

        {/* Play button */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.15 : 1})`,
          transition: 'transform 0.3s, opacity 0.3s',
          opacity: isHovered ? 1 : 0.75,
          width: '52px', height: '52px',
          borderRadius: '50%',
          background: 'rgba(212,160,23,0.9)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#000" style={{ marginLeft: '3px' }}>
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>

        {/* Title at bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '16px 14px 14px',
        }}>
          <p style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.05rem',
            color: '#fff',
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: '1px',
            textShadow: '0 1px 4px rgba(0,0,0,0.9)',
          }}>
            {video.title}
          </p>
          <p style={{
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.55)',
            margin: '4px 0 0',
            textShadow: '0 1px 3px rgba(0,0,0,0.9)',
          }}>
            {video.subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Lightbox ─── */
const Lightbox = ({ index, onClose, onPrev, onNext }) => {
  const video = videos[index];

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  const btnBase = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    color: '#fff',
    fontSize: '2.5rem',
    width: '52px', height: '52px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.93)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: 'min(88vw, 420px)',
          borderRadius: '6px',
          overflow: 'hidden',
          background: '#000',
          boxShadow: '0 20px 60px rgba(0,0,0,0.9)',
        }}
      >
        <video
          key={video.src}
          src={video.src}
          controls
          autoPlay
          playsInline
          style={{ width: '100%', display: 'block', maxHeight: '80vh' }}
        />
        <div style={{ padding: '10px 14px 12px', background: '#0d0d0d' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', margin: 0, color: '#fff' }}>
            {video.title}
          </p>
          <p style={{ fontSize: '0.72rem', color: '#666', margin: '3px 0 0' }}>{video.subtitle}</p>
        </div>
      </motion.div>

      {/* Prev */}
      {index > 0 && (
        <button onClick={(e) => { e.stopPropagation(); onPrev(); }} style={{ ...btnBase, left: '16px' }}>‹</button>
      )}
      {/* Next */}
      {index < videos.length - 1 && (
        <button onClick={(e) => { e.stopPropagation(); onNext(); }} style={{ ...btnBase, right: '16px' }}>›</button>
      )}

      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: '16px', right: '16px',
          background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff',
          width: '38px', height: '38px', borderRadius: '50%',
          fontSize: '1.3rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >×</button>

      {/* Counter */}
      <div style={{
        position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)',
        color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem',
        fontFamily: 'var(--font-heading)', letterSpacing: '2px',
      }}>
        {index + 1} / {videos.length}
      </div>
    </motion.div>
  );
};

/* ─── Componente principal ─── */
const VideoGallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (i) => {
    setLightboxIndex(i);
    document.body.style.overflow = 'hidden';
  };
  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  };
  const goNext = () => setLightboxIndex((i) => Math.min(i + 1, videos.length - 1));
  const goPrev = () => setLightboxIndex((i) => Math.max(i - 1, 0));

  return (
    <section id="video-gallery" style={{ padding: '80px 0 100px', backgroundColor: '#050505' }}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '50px' }}
        >
          <p style={{
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-accent)',
            fontSize: '0.85rem',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}>
            En Vivo
          </p>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.1, marginBottom: '16px' }}>
            Galería de Videos
          </h2>
          <p style={{ color: '#666', maxWidth: '500px', margin: '0 auto', fontSize: '1rem' }}>
            Hacé clic en cualquier video para verlo completo
          </p>
        </motion.div>

        {/* Grid — 4 columnas en desktop, 2 en tablet, 1 en mobile */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '14px',
        }}>
          {videos.map((video, i) => (
            <VideoCard key={video.src} video={video} index={i} onOpen={openLightbox} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            index={lightboxIndex}
            onClose={closeLightbox}
            onNext={goNext}
            onPrev={goPrev}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoGallery;
