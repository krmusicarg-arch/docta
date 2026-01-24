import React from 'react';

// Footer component
const Footer = () => {
  return (
    <footer id="contact" style={{ padding: '20px 0', borderTop: '1px solid #222', textAlign: 'center' }}>
      <div className="container">
        <h2 style={{ fontSize: '3rem', marginBottom: '20px' }}>Contactame</h2>

        <div style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          <a href="mailto:doctabosscba@gmail.com" style={{ fontSize: '1.5rem', color: 'var(--color-text)', textDecoration: 'none', fontFamily: 'var(--font-heading)', letterSpacing: '1px', borderBottom: '2px solid var(--color-accent)' }}>
            ✉️ doctabosscba@gmail.com
          </a>
                      <a href="https://wa.me/5493515435018" target="_blank" style={{ fontSize: '1.5rem', color: 'var(--color-text)', textDecoration: 'none', fontFamily: 'var(--font-heading)', letterSpacing: '1px', borderBottom: '2px solid var(--color-accent)' }}>
                      📞 +54 9 351 543-5018
                    </a>        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '40px' }}>
          {['Instagram'].map((social) => {
            const links = {
              'Instagram': 'https://www.instagram.com/doctabossok/'
            };
            return (
              <a key={social} href={links[social]} style={{ fontSize: '1.2rem', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
                {social === 'Instagram' ? '📸 ' : ''}{social}
              </a>
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

        <p style={{ color: '#555', fontSize: '0.9rem' }}>&copy; 2026 DOCTA BOSS. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
