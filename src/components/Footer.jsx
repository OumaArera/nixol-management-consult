import { Link } from 'react-router-dom'

const ORANGE = '#f97316'
const NAVY   = '#0f1e4b'      // deeper base for footer
const NAVY2  = '#1e3a8a'      // About's primary navy
const SLATE  = '#bfdbfe'      // light text
const MUTED  = '#93c5fd'      // muted text

const SERVICES = [
  'Management & Advisory',
  'Financial Management & Advisory',
  'Business Strategy & Growth',
  'Accounting & Compliance',
  'Operations Optimization',
  'Healthcare Consulting',
]

const LINKS = [
  { label: 'Home',              to: '/' },
  { label: 'Services',          to: '/services' },
  { label: 'Clients',           to: '/clients' },
  { label: 'About',             to: '/about' },
  { label: 'Contact',           to: '/contact' },
  { label: 'Book Consultation', to: '/booking' },
]

const CONTACT = [
  { icon: '📞', text: '+1 (325) 703-0636' },
  { icon: '📧', text: 'info@nixolmc.com' },
  { icon: '🌐', text: 'www.nixolmc.com' },
  { icon: '🕐', text: 'Mon – Fri: 9AM – 6PM EST' },
]

function FooterHeading({ children }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h4 style={{
        fontFamily: 'var(--font-body, sans-serif)',
        fontSize: '0.6rem',
        fontWeight: 700,
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: ORANGE,
        margin: 0,
      }}>
        {children}
      </h4>
      <div style={{
        marginTop: '0.5rem',
        width: '28px',
        height: '2px',
        borderRadius: '1px',
        background: `linear-gradient(90deg, ${ORANGE}, transparent)`,
      }} />
    </div>
  )
}

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      style={{
        fontFamily: 'var(--font-body, sans-serif)',
        fontSize: '0.78rem',
        color: SLATE,
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        lineHeight: 1.5,
        transition: 'color 0.2s, gap 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = ORANGE
        e.currentTarget.style.gap   = '0.85rem'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = SLATE
        e.currentTarget.style.gap   = '0.6rem'
      }}
    >
      <span style={{
        width: '4px', height: '4px', borderRadius: '50%',
        background: ORANGE, flexShrink: 0, opacity: 0.6,
      }} />
      {children}
    </Link>
  )
}

export default function Footer() {
  return (
    <footer style={{
      background: `linear-gradient(170deg, ${NAVY} 0%, #0a1835 100%)`,
      borderTop: `3px solid ${ORANGE}`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle background glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse at 20% 0%, rgba(249,115,22,0.06) 0%, transparent 55%),
                     radial-gradient(ellipse at 80% 100%, rgba(30,64,175,0.12) 0%, transparent 55%)`,
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Main grid */}
        <div style={{
          maxWidth: '1280px', margin: '0 auto',
          padding: '4rem 1.75rem 2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
        }}>

          {/* Brand column */}
          <div>
            <img
              src="/logo.png"
              alt="Nixol Management & Consult"
              style={{ height: '56px', width: 'auto', marginBottom: '1.25rem' }}
            />
            <p style={{
              fontFamily: 'var(--font-display, serif)',
              fontSize: '0.95rem',
              fontStyle: 'italic',
              color: ORANGE,
              lineHeight: 1.5,
              marginBottom: '0.85rem',
            }}>
              "Built on Expertise. Driven by Integrity."
            </p>
            <p style={{
              fontFamily: 'var(--font-body, sans-serif)',
              fontSize: '0.78rem',
              color: SLATE,
              lineHeight: 1.75,
              marginBottom: '1.25rem',
            }}>
              Strategic advisory and financial management firm helping organizations strengthen performance and make smarter decisions.
            </p>

            {/* EIN badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.4rem 0.85rem',
              background: 'rgba(249,115,22,0.08)',
              border: '1px solid rgba(249,115,22,0.22)',
              borderRadius: '6px',
            }}>
              <span style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: MUTED }}>EIN</span>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: ORANGE, letterSpacing: '0.06em' }}>42-1824156</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <FooterHeading>Services</FooterHeading>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {SERVICES.map(s => (
                <li key={s}>
                  <FooterLink to="/services">{s}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <FooterHeading>Quick Links</FooterHeading>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {LINKS.map(({ label, to }) => (
                <li key={to}>
                  <FooterLink to={to}>{label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <FooterHeading>Get In Touch</FooterHeading>

            <p style={{
              fontFamily: 'var(--font-body, sans-serif)',
              fontSize: '0.58rem', fontWeight: 700,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: ORANGE, marginBottom: '0.75rem',
            }}>
              Nixol Office
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
              {CONTACT.map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.82rem', flexShrink: 0, marginTop: '1px' }}>{icon}</span>
                  <span style={{ fontFamily: 'var(--font-body, sans-serif)', fontSize: '0.78rem', color: SLATE, lineHeight: 1.5 }}>{text}</span>
                </div>
              ))}
            </div>

            <p style={{
              fontFamily: 'var(--font-body, sans-serif)',
              fontSize: '0.58rem', fontWeight: 700,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: ORANGE, marginBottom: '0.65rem',
            }}>
              Healthcare Partnership — David
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '1.75rem' }}>
              <span style={{ fontSize: '0.82rem', flexShrink: 0, marginTop: '1px' }}>📞</span>
              <span style={{ fontFamily: 'var(--font-body, sans-serif)', fontSize: '0.78rem', color: SLATE }}>+233 24 909 9740</span>
            </div>

            <Link
              to="/booking"
              style={{
                display: 'inline-block',
                padding: '0.65rem 1.35rem',
                background: ORANGE,
                color: '#fff',
                fontFamily: 'var(--font-body, sans-serif)',
                fontSize: '0.68rem', fontWeight: 700,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '7px',
                boxShadow: '0 3px 14px rgba(249,115,22,0.35)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background  = '#ea6a02'
                e.currentTarget.style.transform   = 'translateY(-2px)'
                e.currentTarget.style.boxShadow   = '0 6px 20px rgba(249,115,22,0.5)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background  = ORANGE
                e.currentTarget.style.transform   = 'translateY(0)'
                e.currentTarget.style.boxShadow   = '0 3px 14px rgba(249,115,22,0.35)'
              }}
            >
              Book a Consultation
            </Link>
          </div>
        </div>

        {/* Divider + bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          maxWidth: '1280px', margin: '0 auto',
          padding: '1.25rem 1.75rem',
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', alignItems: 'center',
          gap: '0.75rem',
        }}>
          <p style={{ fontFamily: 'var(--font-body, sans-serif)', fontSize: '0.72rem', color: MUTED, margin: 0 }}>
            © {new Date().getFullYear()} Nixol Management & Consult. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: ORANGE, opacity: 0.6 }} />
            <p style={{ fontFamily: 'var(--font-body, sans-serif)', fontSize: '0.72rem', color: MUTED, margin: 0 }}>
              EIN: 42-1824156
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}