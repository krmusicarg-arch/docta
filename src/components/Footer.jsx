import React from 'react';

const Footer = () => {
  return (
    <footer id="contact" style={{ padding: '20px 0', borderTop: '1px solid #222', textAlign: 'center' }}>
      <div className="container">
        <h2 style={{ fontSize: '3rem', marginBottom: '20px' }}>Sumate a la lista de correo</h2>
        <form style={{ maxWidth: '500px', margin: '0 auto 30px', display: 'flex', gap: '10px' }}>
          <input 
            type="email" 
            placeholder="YOUR EMAIL ADDRESS" 
            style={{ 
              flex: 1, 
              background: 'transparent', 
              border: '1px solid #444', 
              padding: '15px', 
              color: 'white',
              fontFamily: 'var(--font-body)'
            }} 
          />
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>

        <div style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          <a href="mailto:doctabosscba@gmail.com" style={{ fontSize: '1.5rem', color: 'var(--color-text)', textDecoration: 'none', fontFamily: 'var(--font-heading)', letterSpacing: '1px', borderBottom: '2px solid var(--color-accent)' }}>
            doctabosscba@gmail.com
          </a>
          <a href="https://wa.me/5493515435018" target="_blank" style={{ fontSize: '1.5rem', color: 'var(--color-text)', textDecoration: 'none', fontFamily: 'var(--font-heading)', letterSpacing: '1px', borderBottom: '2px solid var(--color-accent)' }}>
            +54 9 351 543-5018
          </a>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '40px' }}>
          {['Instagram', 'YouTube', 'Spotify'].map((social) => {
            const links = {
              'Instagram': 'https://www.instagram.com/doctabossok/',
              'YouTube': 'https://www.youtube.com/@doctaboss',
              'Spotify': 'https://open.spotify.com/intl-es/artist/6kyIboXMcLC2dRga4HJ7Kc?si=sjMIz3sUSeazuxFq5j-Dag'
            };
            return (
              <a key={social} href={links[social]} style={{ fontSize: '1.2rem', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>{social}</a>
            );
          })}
        </div>
        
        <p style={{ 
          fontFamily: 'var(--font-heading)', 
          fontSize: '1.2rem', 
          color: 'var(--color-accent)', 
          marginBottom: '20px', 
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}>
          Primer Banda de Córdoba Tributo Creedence Clearwater Revival
        </p>

        <p style={{ color: '#555', fontSize: '0.9rem' }}>&copy; 2026 DOCTA. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
