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
      title: "Who'll Stop The Rain (LIVE)",
      artist: "Docta Boss",
      src: "/music/WHOLL STOP THE RAIN ALABAMA.wav",
      duration: "2:30"
    },
    {
      title: "Further On Up the Road (LIVE)",
      artist: "Docta Boss",
      src: "/music/FURTHER ON ALABAMA.wav",
      duration: "3:45"
    },
    {
      title: "Have You Ever Seen The Rain (LIVE)",
      artist: "Docta Boss",
      src: "/music/HAVE YOU EVER SEEN THE RAIN ALABAMA.wav",
      duration: "2:40"
    },
    {
      title: "Hey Tonight (LIVE)",
      artist: "Docta Boss",
      src: "/music/HEY TONIGHT ALABAMA.wav",
      duration: "2:43"
    },
    {
      title: "Pensar En Nada (LIVE)",
      artist: "Docta Boss",
      src: "/music/PENSAR EN NADAALABAMA.wav",
      duration: "4:50"
    },
    {
      title: "Ramble Tamble (LIVE)",
      artist: "Docta Boss",
      src: "/music/RAMBLE TAMBLE ALABAMA.wav",
      duration: "7:10"
    },
   {
      title: "COTTON FIELD TEATRO (LIVE)",
      artist: "Docta Boss",
      src: "/music/COTTON FIELD TEATRO.wav",
      duration: "7:28"
    },
    {
      title: "GREEN RIVER (LIVE)",
      artist: "Docta Boss",
      src: "/music/GREEN RIVER.wav",
      duration: "2:43"
    },
  {
      title: "OOBY DOOBY (LIVE)",
      artist: "Docta Boss",
      src: "/music/OOBY DOOBY.wav",
      duration: "2:17"
    },
  {
      title: "COMMOTION TEATRO (LIVE)",
      artist: "Docta Boss",
      src: "/music/COMMOTION TEATRO.wav",
      duration: "5:24"
    },
  {
      title: "BOOTLEG TEATRO (LIVE)",
      artist: "Docta Boss",
      src: "/music/BOOTLEG TEATRO.wav",
      duration: "3:10"
    },
    {
      title: "PAGAN BABY TEATRO (LIVE)",
      artist: "Docta Boss",
      src: "/music/PAGAN BABY TEATRO.wav", 
      duration: "4:53"
    },
      {
      title: "BAD MOON RISING TEATRO (LIVE)",
      artist: "Docta Boss",
      src: "/music/BAD MOON RISING TEATRO.wav",
      duration: "2:25"
    },
    {
      title: "DOWN OF THE CORNER TEATRO (LIVE)",
      artist: "Docta Boss",
      src: "/music/DOWN TEATRO.wav",
      duration: "5:43"
    },
    {
      title: "FORTUNATE SON TEATRO (LIVE)",
      artist: "Docta Boss",
      src: "/music/FORTUNATE.wav",
      duration: "4:11"
    },
    {
      title: "PROUD MARY TEATRO (LIVE)",
      artist: "Docta Boss",
      src: "/music/PROUD MARY.wav",
      duration: "3:17"
    },
    {
      title: "UP AROUND THE BEND TEATRO (LIVE)",
      artist: "Docta Boss",
      src: "/music/UP AROUND THE BEND.wav",
      duration: "2:38"
    },
    {
      title: "ALABAMA (LIVE)",
      artist: "Docta Boss",
      src: "/music/ALABAMA.wav",
      duration: "5:00"
    },
    {
      title: "IT CAME OUT OF THE SKY TEATRO(LIVE)",
      artist: "Docta Boss",
      src: "/music/IT CAME.wav",
      duration: "2:42"
    },
    {
      title: "EVERY BREATH YOU TAKE (LIVE)",
      artist: "Docta Boss",
      src: "/music/EVERY BREATH YOU TAKE.wav",
      duration: "4:46"
    },
    {
      title: "JOHNNY BE GOODE (LIVE)",
      artist: "Docta Boss",
      src: "/music/JBG.wav",
      duration: "4:46"
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const trackParam = params.get('track');
    if (trackParam !== null) {
      const index = parseInt(trackParam, 10);
      if (!isNaN(index) && index >= 0 && index < tracks.length) {
        setCurrentTrackIndex(index);
        setIsPlaying(true); // Intenta reproducir automáticamente
        // Desplazar automáticamente hacia el reproductor (sección de música) si se desea
        setTimeout(() => {
          const section = document.getElementById('music');
          if (section) section.scrollIntoView({ behavior: 'smooth' });
        }, 500);
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
