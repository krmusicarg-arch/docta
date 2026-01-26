import React, { useEffect } from 'react';
import PromoBanner from './components/PromoBanner';
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
  const showPromo = true; // Set to false to hide the banner

  useEffect(() => {
    if (showPromo) {
      document.body.classList.add('promo-active');
      // Read the computed height from the CSS variable set in PromoBanner.css
      // This is a bit tricky to do directly, so for now, we'll assume the height and
      // let Header.jsx read the variable directly.
      // document.documentElement.style.setProperty('--promo-offset', 'var(--promo-banner-height)');
    } else {
      document.body.classList.remove('promo-active');
      // document.documentElement.style.removeProperty('--promo-offset');
    }
    return () => {
      document.body.classList.remove('promo-active');
      // document.documentElement.style.removeProperty('--promo-offset');
    };
  }, [showPromo]);

  return (
    <PlayerProvider>
      <div className="app">
        {showPromo && <PromoBanner />}
        <MusicPlayer />
        <Header showPromo={showPromo} />
        <Hero />
        <Tour />
        <FeaturedVideos />
        <TrackList />
        <Gallery />
        <Footer />
      </div>
    </PlayerProvider>
  );
}


export default App;
