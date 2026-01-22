import React from 'react';

const Music = () => {
  return (
    <section id="music" style={{ padding: '100px 0', backgroundColor: '#0a0a0a' }}>
      <div className="container">
        <h2 style={{ fontSize: '4rem', marginBottom: '60px', textAlign: 'right' }}>Latest Releases</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {[1, 2, 3].map((item) => (
             <div key={item} style={{ position: 'relative', aspectRatio: '1/1', backgroundColor: '#222', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', color: '#555' }}>
                   <p style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>Album Artwork</p>
                   <p>600x600 px</p>
                </div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '20px', background: 'linear-gradient(to top, black, transparent)' }}>
                    <h3 style={{ fontSize: '2rem' }}>Album Title {item}</h3>
                    <p>2023</p>
                </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Music;
