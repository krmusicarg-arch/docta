import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
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
    { name: 'Home', href: '#home' },
    { name: 'Tour', href: '#tour' },
    { name: 'Musica', href: '#music' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-sm py-2' : 'bg-transparent py-6'}`} style={{ width: '100%', position: 'fixed', top: 0, zIndex: 1000, background: scrolled ? 'rgba(5,5,5,0.95)' : 'transparent', padding: scrolled ? '15px 0' : '30px 0', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#" className="logo">
          {/* Logo height adjusted for elegance */}
          <img src="/logo-docta.png" alt="Docta Logo" style={{ height: '120px', objectFit: 'contain' }} />
        </a>

        {/* Desktop Menu */}
        <div className="desktop-menu" style={{ display: 'none', gap: '40px' }}>
          {/* Inline styles for media query imitation - simplified for React component w/o external CSS modules for now, will rely on index.css mostly but ensuring structure */}
          <style>{`
            @media(min-width: 768px) {
              .desktop-menu { display: flex !important; }
              .mobile-toggle { display: none !important; }
            }
          `}</style>
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', textTransform: 'uppercase' }}>
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div style={{ position: 'fixed', top: '70px', left: 0, width: '100%', height: 'calc(100vh - 70px)', background: '#050505', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '30px', zIndex: 999 }}>
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', textTransform: 'uppercase' }}>
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
