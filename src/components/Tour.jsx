import React from 'react';

const Tour = () => {
  const dates = [
    { date: 'ENE 30', venue: 'Santa Calma', city: 'Córdoba, AR', link: '' },
    { date: 'ENE 17', venue: 'Lo de Pablo', city: 'Córdoba, AR', link: '' },
    { date: 'ENE 10', venue: 'El barba', city: 'Córdoba, AR', link: '' },
    { date: 'ENE 3', venue: '2da Edicion de la Cerveza', city: 'Bialet Masset Córdoba, AR', link: '' },
  ];

  return (
    <section id="tour" style={{ padding: '20px 0', backgroundColor: '#050505' }}>
      <div className="container">
        <h2 style={{ fontSize: '4rem', marginBottom: '30px', textAlign: 'center' }}>Shows</h2>
        
        <div className="tour-list" style={{ maxWidth: '900px', margin: '0 auto' }}>
          {dates.map((item, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '30px 0', 
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              transition: 'background 0.3s'
             }}
             className="tour-item">
               
              <div style={{ flex: '1 1 100px', marginBottom: '10px' }}>
                <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-accent)' }}>{item.date}</span>
              </div>
              
              <div style={{ flex: '2 1 200px', marginBottom: '10px' }}>
                <span style={{ display: 'block', fontSize: '2rem', fontFamily: 'var(--font-heading)' }}>{item.venue}</span>
                <span style={{ fontSize: '1rem', color: '#888' }}>{item.city}</span>
              </div>

              <div style={{ flex: '0 0 auto' }}>
                {item.link ? (
                  <a href={item.link} className="btn" style={{ fontSize: '0.9rem', padding: '10px 25px' }}>
                    Tickets
                  </a>
                ) : (
                  <span style={{ fontSize: '0.9rem', padding: '10px 25px', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Closed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tour;
