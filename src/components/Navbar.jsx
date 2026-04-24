import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home',     to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About',    to: '/about' },
  { label: 'Contact',  to: '/contact' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  const isHome = location.pathname === '/'

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      transition: 'all 0.4s ease',
      background: scrolled ? 'rgba(11,29,58,0.97)' : isHome ? 'transparent' : 'rgba(11,29,58,0.97)',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(201,168,76,0.18)' : '1px solid transparent',
      boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.3)' : 'none',
      padding: scrolled ? '0.5rem 0' : '0.75rem 0',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo — bigger */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img
            src="/logo.png"
            alt="Nixol Management & Consult"
            style={{
              height: scrolled ? '52px' : '64px',
              width: 'auto',
              transition: 'height 0.4s ease',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))',
            }}
          />
        </Link>

        {/* Desktop links */}
        <ul style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
          {NAV_LINKS.map(({ label, to }) => {
            const active = location.pathname === to
            return (
              <li key={to} style={{ display: 'none', ['@media (min-width: 768px)']: { display: 'block' } }}
                className="desktop-link">
                <Link to={to} style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600,
                  letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none',
                  color: active ? '#C9A84C' : '#D4DCE8',
                  position: 'relative', paddingBottom: '4px',
                  transition: 'color 0.2s',
                }}>
                  {label}
                </Link>
              </li>
            )
          })}

          {/* Book button */}
          <li className="desktop-link">
            <Link to="/booking" style={{
              fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700,
              letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none',
              padding: '0.55rem 1.4rem',
              background: '#C9A84C', color: '#0B1D3A',
              borderRadius: '6px', transition: 'all 0.2s',
              display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#d4b86a'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Book Consultation
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="mobile-menu-btn"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', display: 'none' }}
          aria-label="Menu"
        >
          <div style={{ width: '22px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <span style={{ height: '1.5px', background: '#D4DCE8', display: 'block', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ height: '1.5px', background: '#D4DCE8', display: 'block', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1, width: menuOpen ? 0 : '70%' }} />
            <span style={{ height: '1.5px', background: '#D4DCE8', display: 'block', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </div>
        </button>
      </div>

      {/* Mobile drawer */}
      <div style={{
        maxHeight: menuOpen ? '400px' : '0', overflow: 'hidden',
        transition: 'max-height 0.4s ease',
        background: 'rgba(11,29,58,0.98)', borderTop: menuOpen ? '1px solid rgba(201,168,76,0.1)' : 'none',
      }}>
        <ul style={{ listStyle: 'none', margin: 0, padding: '1rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {NAV_LINKS.map(({ label, to }) => (
            <li key={to}>
              <Link to={to} style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', color: '#D4DCE8', display: 'block', padding: '0.4rem 0' }}>
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/booking" style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', padding: '0.65rem 1.4rem', background: '#C9A84C', color: '#0B1D3A', borderRadius: '6px', display: 'inline-block', marginTop: '0.5rem' }}>
              Book Consultation
            </Link>
          </li>
        </ul>
      </div>

      <style>{`
        @media (min-width: 768px) { .desktop-link { display: list-item !important; } .mobile-menu-btn { display: none !important; } }
        @media (max-width: 767px) { .desktop-link { display: none !important; } .mobile-menu-btn { display: block !important; } }
      `}</style>
    </nav>
  )
}