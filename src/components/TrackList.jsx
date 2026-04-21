import React from 'react';
import { Play, Pause, Share2 } from 'lucide-react';
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

                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ color: '#666', fontSize: '0.9rem' }}>
                      {track.duration}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const shareUrl = `${window.location.origin}${window.location.pathname}?track=${index}`;
                        if (navigator.share) {
                          navigator.share({
                            title: `Escucha ${track.title} de Docta Boss`,
                            text: `Te invito a escuchar ${track.title} por Docta Boss.`,
                            url: shareUrl
                          }).catch((err) => console.log('Error compartiendo:', err));
                        } else {
                          navigator.clipboard.writeText(shareUrl).then(() => {
                            alert('¡Link copiado al portapapeles!');
                          });
                        }
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-accent)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '5px'
                      }}
                      title="Compartir tema"
                    >
                      <Share2 size={20} />
                    </button>
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
