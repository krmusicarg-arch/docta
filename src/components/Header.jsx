import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Escucha a docta', href: '#music' },
    { name: 'Videos', href: '#videos' },
    { name: 'Proximos shows', href: '#tour' },
    { name: 'Galería', href: '#gallery' },
    { name: 'Contactanos', href: '#contact' },
  ];

  const socialLinks = [
    { 
      name: 'Instagram', 
      href: 'https://www.instagram.com/doctabossok/', 
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
    },
    { 
      name: 'Spotify', 
      href: '#', 
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14.5c2.5 1.5 5.5 1.5 8 0"/><path d="M7 11.5c3 1.8 7 1.8 10 0"/><path d="M6.5 8.5c3.5 1.9 8.5 1.9 12 0"/></svg>
    },
    { 
      name: 'YouTube', 
      href: 'https://www.youtube.com/@doctaboss', 
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
    }
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300`} 
      style={{ 
        width: '100%', 
        position: 'fixed', 
        top: 0, 
        zIndex: 1000, 
        background: scrolled ? 'rgba(5,5,5,0.95)' : 'transparent', 
        padding: scrolled ? '10px 0' : '20px 0', 
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
        backdropFilter: scrolled ? 'blur(10px)' : 'none'
      }}>
      
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Logo */}
        <a href="#" className="logo" style={{ zIndex: 1001 }}>
          <img src="/logo-docta.png" alt="Docta Logo" style={{ height: scrolled ? '60px' : '120px', objectFit: 'contain', transition: 'height 0.3s ease' }} />
        </a>

        {/* Desktop Navigation */}
        <div className="desktop-menu" style={{ display: 'none', gap: '30px', alignItems: 'center' }}>
          <style>{`
            @media(min-width: 992px) {
              .desktop-menu { display: flex !important; }
              .mobile-toggle { display: none !important; }
            }
          `}</style>
          
          <nav style={{ display: 'flex', gap: '25px' }}>
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="nav-link" style={{ fontSize: '1rem', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {link.name}
              </a>
            ))}
          </nav>

          <div className="social-icons" style={{ display: 'flex', gap: '15px', marginLeft: '20px', borderLeft: '1px solid #333', paddingLeft: '20px' }}>
            {socialLinks.map((social) => (
              <a key={social.name} href={social.href} aria-label={social.name} style={{ color: 'var(--color-text)', transition: 'color 0.3s' }} className="social-link">
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', zIndex: 1001 }}>
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

        {/* Mobile Menu Overlay */}
        <div style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100vh', 
            background: '#050505', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '30px', 
            zIndex: 999,
            transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
            transition: 'transform 0.4s ease-in-out',
            opacity: isOpen ? 1 : 0
          }}>
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', textTransform: 'uppercase' }}>
                {link.name}
              </a>
            ))}
            
            <div style={{ display: 'flex', gap: '30px', marginTop: '30px' }}>
              {socialLinks.map((social) => (
                <a key={social.name} href={social.href} aria-label={social.name} style={{ transform: 'scale(1.2)' }}>
                  {social.icon}
                </a>
              ))}
            </div>
        </div>
      </div>
      
      {/* Hover effects for CSS */}
      <style>{`
        .nav-link:hover, .social-link:hover {
          color: var(--color-accent) !important;
        }
      `}</style>
    </header>
  );
};

export default Header;
