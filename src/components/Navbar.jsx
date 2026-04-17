import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    transition: 'all 0.4s ease',
    padding: scrolled ? '0.75rem 0' : '1.25rem 0',
    background: scrolled
      ? 'rgba(11,29,58,0.92)'
      : 'transparent',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : '1px solid transparent',
  }

  return (
    <nav style={navStyle}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo.png" alt="Nixol Management & Consult" style={{ height: '38px', width: 'auto' }} />
        </Link>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', margin: 0, padding: 0 }} className="hidden-mobile">
          {NAV_LINKS.map(({ label, to }) => {
            const active = pathname === to
            return (
              <li key={to}>
                <Link
                  to={to}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    color: active ? 'var(--color-gold-500)' : 'var(--color-silver-300)',
                    transition: 'color 0.2s',
                    paddingBottom: '4px',
                    borderBottom: active ? '1px solid var(--color-gold-500)' : '1px solid transparent',
                  }}
                  onMouseEnter={e => { if (!active) e.target.style.color = 'white' }}
                  onMouseLeave={e => { if (!active) e.target.style.color = 'var(--color-silver-300)' }}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* CTA */}
        <Link
          to="/contact"
          className="hidden-mobile"
          style={{
            padding: '0.6rem 1.4rem',
            background: 'var(--color-gold-500)',
            color: 'var(--color-navy-900)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            borderRadius: '5px',
            textDecoration: 'none',
            transition: 'background 0.2s, transform 0.2s',
          }}
          onMouseEnter={e => { e.target.style.background = 'var(--color-gold-400)'; e.target.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.target.style.background = 'var(--color-gold-500)'; e.target.style.transform = 'translateY(0)' }}
        >
          Get Started
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="show-mobile"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex', flexDirection: 'column', gap: '5px' }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: i === 1 ? '18px' : '24px', height: '2px',
              background: 'var(--color-silver-300)', borderRadius: '2px', transition: 'all 0.3s',
            }} />
          ))}
        </button>
      </div>

      {/* Mobile drawer */}
      <div style={{
        overflow: 'hidden',
        maxHeight: open ? '320px' : '0',
        transition: 'max-height 0.4s ease',
        background: 'rgba(11,29,58,0.98)',
        backdropFilter: 'blur(12px)',
        borderTop: open ? '1px solid rgba(201,168,76,0.1)' : 'none',
      }}>
        <ul style={{ listStyle: 'none', margin: 0, padding: '1rem 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {NAV_LINKS.map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--color-silver-300)',
                  textDecoration: 'none',
                }}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/contact" style={{
              display: 'inline-block', padding: '0.6rem 1.4rem',
              background: 'var(--color-gold-500)', color: 'var(--color-navy-900)',
              fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: '5px', textDecoration: 'none',
            }}>
              Get Started
            </Link>
          </li>
        </ul>
      </div>

      <style>{`
        @media (min-width: 768px) { .show-mobile { display: none !important; } }
        @media (max-width: 767px) { .hidden-mobile { display: none !important; } }
      `}</style>
    </nav>
  )
}
