import React from 'react';
import { Play, Pause } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

const TrackList = () => {
  const { tracks, currentTrackIndex, isPlaying, playTrack, togglePlay } = usePlayer();

  return (
    <section id="music" style={{ padding: '20px 0', backgroundColor: '#050505' }}>
      <div className="container">
        <h2 style={{ fontSize: '4rem', marginBottom: '30px', textAlign: 'center' }}>Nuestra música</h2>
        
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {tracks.map((track, index) => {
             const isCurrent = currentTrackIndex === index;
             const isTrackPlaying = isCurrent && isPlaying;

             return (
              <div 
                key={index}
                onClick={() => {
                  if (isCurrent) {
                    togglePlay();
                  } else {
                    playTrack(index);
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '20px',
                  backgroundColor: isCurrent ? 'rgba(212, 160, 23, 0.1)' : 'transparent',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = isCurrent ? 'rgba(212, 160, 23, 0.15)' : 'rgba(255,255,255,0.05)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = isCurrent ? 'rgba(212, 160, 23, 0.1)' : 'transparent'}
              >
                  <div style={{ marginRight: '20px', color: 'var(--color-accent)' }}>
                    {isTrackPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: isCurrent ? 'var(--color-accent)' : 'white' }}>
                      {track.title}
                    </h3>
                    <p style={{ color: '#888', fontSize: '0.9rem' }}>{track.artist}</p>
                  </div>

                  <div style={{ color: '#666', fontSize: '0.9rem' }}>
                    {track.duration}
                  </div>
              </div>
             );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrackList;
