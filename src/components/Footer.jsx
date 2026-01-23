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

        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '40px' }}>
          {['Instagram', 'YouTube', 'Spotify'].map((social) => {
            const links = {
              'Instagram': 'https://www.instagram.com/doctabossok/',
              'YouTube': 'https://www.youtube.com/@doctaboss',
              'Spotify': '#'
            };
            return (
              <a key={social} href={links[social]} style={{ fontSize: '1.2rem', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>{social}</a>
            );
          })}
        </div>

        <p style={{ color: '#555', fontSize: '0.9rem' }}>&copy; 2026 DOCTA. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
