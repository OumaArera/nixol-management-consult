import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home',     to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Clients',  to: '/clients' },
  { label: 'About',    to: '/about' },
  { label: 'Contact',  to: '/contact' },
]

const ORANGE = '#f97316'
const NAVY   = '#1e3a8a'
const NAVY2  = '#1e40af'

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const location                   = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  const isHome   = location.pathname === '/'
  const solidNav = scrolled || !isHome

  return (
    <>
      <style>{`
        .nx-nav-link {
          font-family: var(--font-body, sans-serif);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-decoration: none;
          padding-bottom: 4px;
          border-bottom: 2px solid transparent;
          transition: color 0.2s, border-color 0.2s;
          position: relative;
        }
        .nx-nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0; right: 0;
          height: 2px;
          border-radius: 1px;
          background: ${ORANGE};
          transform: scaleX(0);
          transition: transform 0.25s ease;
          transform-origin: center;
        }
        .nx-nav-link:hover::after,
        .nx-nav-link.active::after { transform: scaleX(1); }
        .nx-nav-link:hover { color: #fff !important; }
        .nx-nav-link.active { color: ${ORANGE} !important; }

        .nx-cta-btn {
          font-family: var(--font-body, sans-serif);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0.55rem 1.4rem;
          background: ${ORANGE};
          color: #fff;
          border-radius: 7px;
          transition: all 0.2s;
          display: inline-block;
          box-shadow: 0 3px 12px rgba(249,115,22,0.35);
        }
        .nx-cta-btn:hover {
          background: #ea6a02;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(249,115,22,0.5);
        }

        .nx-hamburger { background: none; border: none; cursor: pointer; padding: 0.5rem; display: none; }
        .nx-hamburger span { height: 1.5px; background: #bfdbfe; display: block; transition: all 0.3s; width: 22px; }
        .nx-hamburger span + span { margin-top: 5px; }

        @media (min-width: 768px)  { .nx-desktop-list { display: flex !important; } .nx-hamburger { display: none !important; } .nx-mobile-drawer { display: none !important; } }
        @media (max-width: 767px)  { .nx-desktop-list { display: none !important; } .nx-hamburger { display: block !important; } }
      `}</style>

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 0.4s ease',
        background: solidNav
          ? 'rgba(15,30,75,0.96)'
          : 'transparent',
        backdropFilter: solidNav ? 'blur(16px)' : 'none',
        borderBottom: solidNav
          ? '1px solid rgba(249,115,22,0.18)'
          : '1px solid transparent',
        boxShadow: solidNav
          ? '0 2px 24px rgba(0,0,0,0.25)'
          : 'none',
      }}>
        {/* Orange top accent line */}
        <div style={{
          height: '2px',
          background: `linear-gradient(90deg, ${NAVY2}, ${ORANGE} 50%, ${NAVY2})`,
          opacity: solidNav ? 1 : 0,
          transition: 'opacity 0.4s',
        }} />

        <div style={{
          maxWidth: '1280px', margin: '0 auto',
          padding: scrolled ? '0.45rem 1.75rem' : '0.75rem 1.75rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'padding 0.4s',
        }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img
              src="/logo.png"
              alt="Nixol Management & Consult"
              style={{
                height: scrolled ? '44px' : '58px',
                width: 'auto',
                transition: 'height 0.4s ease',
                filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.4))',
              }}
            />
          </Link>

          {/* Desktop nav */}
          <ul className="nx-desktop-list" style={{
            alignItems: 'center', gap: '2.25rem',
            listStyle: 'none', margin: 0, padding: 0,
          }}>
            {NAV_LINKS.map(({ label, to }) => {
              const active = location.pathname === to
              return (
                <li key={to}>
                  <Link
                    to={to}
                    className={`nx-nav-link${active ? ' active' : ''}`}
                    style={{ color: active ? ORANGE : '#bfdbfe' }}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
            <li>
              <Link to="/booking" className="nx-cta-btn">Book Consultation</Link>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            className="nx-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span style={{ transform: menuOpen ? 'rotate(45deg) translate(4px,5px)' : 'none' }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(4px,-5px)' : 'none' }} />
          </button>
        </div>

        {/* Mobile drawer */}
        <div className="nx-mobile-drawer" style={{
          maxHeight: menuOpen ? '480px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.4s ease',
          background: 'rgba(15,30,75,0.98)',
          borderTop: menuOpen ? `1px solid rgba(249,115,22,0.15)` : 'none',
        }}>
          <ul style={{
            listStyle: 'none', margin: 0,
            padding: '1.25rem 1.75rem 1.5rem',
            display: 'flex', flexDirection: 'column', gap: '0.75rem',
          }}>
            {NAV_LINKS.map(({ label, to }) => (
              <li key={to}>
                <Link to={to} style={{
                  fontFamily: 'var(--font-body, sans-serif)',
                  fontSize: '0.72rem', fontWeight: 700,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: location.pathname === to ? ORANGE : '#bfdbfe',
                  display: 'block', padding: '0.4rem 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}>
                  {label}
                </Link>
              </li>
            ))}
            <li style={{ paddingTop: '0.5rem' }}>
              <Link to="/booking" className="nx-cta-btn">Book Consultation</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}