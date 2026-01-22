import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedVideos from './components/FeaturedVideos';
import TrackList from './components/TrackList';
import Tour from './components/Tour';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import { PlayerProvider } from './context/PlayerContext';

function App() {
  return (
    <PlayerProvider>
      <div className="app">
        <MusicPlayer />
        <Header />
        <Hero />
        <Tour />
        <Gallery />
        <FeaturedVideos />
        <TrackList />
        <Footer />
      </div>
    </PlayerProvider>
  );
}


export default App;
