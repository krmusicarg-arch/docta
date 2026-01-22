import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music as MusicIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayer } from '../context/PlayerContext';

const MusicPlayer = () => {
  const { 
    tracks, 
    currentTrackIndex, 
    isPlaying, 
    nextTrack, 
    prevTrack, 
    togglePlay,
    isExpanded,
    setIsExpanded
  } = usePlayer();

  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const audio = audioRef.current;
    
    // Reset handlers
    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    
    const onEnded = () => {
       nextTrack();
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', onEnded);
    
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', onEnded);
      audio.pause();
    };
  }, []); // Run once on mount

  // Handle track changes
  useEffect(() => {
    const track = tracks[currentTrackIndex];
    if (track && track.src !== "#") {
        audioRef.current.src = track.src;
        audioRef.current.volume = volume;
        if (isPlaying) {
            audioRef.current.play().catch(e => console.log("Playback failed", e));
        }
    }
  }, [currentTrackIndex, tracks]); // Depend on track index

  // Handle play/pause toggle
  useEffect(() => {
    if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Playback failed", e));
    } else {
        audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handle volume changes
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);
  
  const handleSeek = (e) => {
    e.stopPropagation();
    const width = e.currentTarget.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const duration = audioRef.current.duration;
    if (duration) {
        audioRef.current.currentTime = (clickX / width) * duration;
    }
  };

  // Visualizer bars simulation
  const bars = Array.from({ length: 20 });
  const currentTrack = tracks[currentTrackIndex];

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            style={{
              position: 'absolute',
              bottom: '70px',
              right: '0',
              width: '320px',
              background: 'rgba(5, 5, 5, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '20px',
              padding: '20px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
              overflow: 'hidden'
            }}
          >
            {/* Visualizer Background */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50%', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', opacity: 0.1, pointerEvents: 'none' }}>
               {bars.map((_, i) => (
                   <motion.div
                     key={i}
                     animate={{ height: isPlaying ? [10, Math.random() * 80 + 20, 10] : 10 }}
                     transition={{ repeat: Infinity, duration: 0.5 + Math.random() * 0.5, ease: "easeInOut" }}
                     style={{ width: '4px', background: 'var(--color-accent)', borderRadius: '2px' }}
                   />
               ))}
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '5px', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {currentTrack.title}
                </h3>
                <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '20px' }}>{currentTrack.artist}</p>

                {/* Progress Bar */}
                <div 
                    onClick={handleSeek}
                    style={{ width: '100%', height: '6px', background: '#333', borderRadius: '3px', cursor: 'pointer', marginBottom: '20px', overflow: 'hidden' }}
                >
                    <motion.div 
                        style={{ width: `${progress}%`, height: '100%', background: 'var(--color-accent)' }}
                    />
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '15px' }}>
                    <button onClick={prevTrack} className="control-btn"><SkipBack size={24} /></button>
                    <button 
                        onClick={togglePlay} 
                        style={{ 
                            width: '50px', height: '50px', borderRadius: '50%', 
                            background: 'var(--color-accent)', border: 'none', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center', 
                            color: 'black', cursor: 'pointer',
                            boxShadow: '0 0 20px rgba(212, 160, 23, 0.4)'
                        }}
                    >
                        {isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" />}
                    </button>
                    <button onClick={nextTrack} className="control-btn"><SkipForward size={24} /></button>
                </div>
                
                {/* Volume */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Volume2 size={16} color="#888" />
                    <input 
                        type="range" 
                        min="0" max="1" step="0.01" 
                        value={volume} 
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        style={{ width: '100%', accentColor: 'var(--color-accent)', height: '4px' }}
                    />
                </div>
            </div>
            
            <style>{`
                .control-btn {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    transition: color 0.3s;
                }
                .control-btn:hover {
                    color: var(--color-accent);
                }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: isExpanded ? 'white' : 'var(--color-accent)',
          border: 'none',
          color: isExpanded ? 'black' : 'black',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: '0 5px 20px rgba(0,0,0,0.5)',
          position: 'relative'
        }}
      >
        {isPlaying ? (
            <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                {[1,2,3].map(i => (
                    <motion.div 
                        key={i}
                        animate={{ height: [10, 25, 10] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.2 }}
                        style={{ width: '4px', background: 'black' }}
                    />
                ))}
            </div>
        ) : (
            <MusicIcon size={28} />
        )}
      </motion.button>
    </div>
  );
};

export default MusicPlayer;
