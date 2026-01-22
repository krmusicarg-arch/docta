import React from 'react';

const FeaturedVideos = () => {
  const videos = [
    { id: 'zzepSG2_9UY', title: 'Docta Boss' },
    { id: 'q_jWZz5RHmg', title: 'Docta Boss - Live' },
    { id: 'AY55XruLwnI', title: 'Docta Boss - Video 3' },
  ];

  return (
    <section id="videos" style={{ padding: '20px 0', backgroundColor: '#0a0a0a' }}>
      <div className="container">
        <h2 style={{ fontSize: '4rem', marginBottom: '30px', textAlign: 'center' }}>Videos</h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '40px',
          marginBottom: '50px'
        }}>
          {videos.map((video, index) => (
            <div key={index} className="video-item">
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', marginBottom: '15px' }}>
                <iframe 
                  src={`https://www.youtube.com/embed/${video.id}`} 
                  title={video.title}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', marginTop: '10px' }}>{video.title}</h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedVideos;
