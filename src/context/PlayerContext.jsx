import React, { createContext, useState, useContext, useRef, useEffect } from 'react';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Public tracks data
  const tracks = [
    {
      title: "Who'll Stop The Rain",
      artist: "Docta Boss",
      src: "/music/WHOLL STOP THE RAIN ALABAMA.wav",
      duration: "2:30"
    },
    {
      title: "Further On (Up the Road)",
      artist: "Docta Boss",
      src: "/music/FURTHER ON ALABAMA.wav",
      duration: "3:45"
    },
    {
      title: "Have You Ever Seen The Rain",
      artist: "Docta Boss",
      src: "/music/HAVE YOU EVER SEEN THE RAIN ALABAMA.wav",
      duration: "2:40"
    },
    {
      title: "Hey Tonight",
      artist: "Docta Boss",
      src: "/music/HEY TONIGHT ALABAMA.wav",
      duration: "2:43"
    },
    {
      title: "Pensar En Nada",
      artist: "Docta Boss",
      src: "/music/PENSAR EN NADAALABAMA.wav",
      duration: "4:50"
    },
    {
      title: "Ramble Tamble",
      artist: "Docta Boss",
      src: "/music/RAMBLE TAMBLE ALABAMA.wav",
      duration: "7:10"
    }
  ];

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
