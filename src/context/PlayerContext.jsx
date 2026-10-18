import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import tracks from '../data/tracks';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const playTrack = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
    setIsPlaying(true);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const trackParam = params.get('track');
    if (trackParam !== null) {
      const index = parseInt(trackParam, 10);
      if (!isNaN(index) && index >= 0 && index < tracks.length) {
        setCurrentTrackIndex(index);
        setIsPlaying(true); // Intenta reproducir automáticamente
        // Desplazar automáticamente hacia el reproductor (sección de música) si se desea
      }
    }
  }, []);

  return (
    <PlayerContext.Provider value={{
      tracks,
      currentTrackIndex,
      setCurrentTrackIndex,
      isPlaying,
      setIsPlaying,
      playTrack,
      togglePlay,
      nextTrack,
      prevTrack,
      isExpanded,
      setIsExpanded
    }}>
      {children}
    </PlayerContext.Provider>
  );
};
