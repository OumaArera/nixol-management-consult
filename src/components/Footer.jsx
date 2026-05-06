import { Link } from 'react-router-dom'

const gold   = '#C9A84C'
const navy   = '#0d2144'
const navy2  = '#1a3a6b'
const s300   = '#b0c4de'
const s400   = '#7a9bc4'

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

export default function Footer() {
  return (
    <footer style={{ background: '#0d2144', borderTop: '3px solid #C9A84C' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.75rem 2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem' }}>

        {/* Brand */}
        <div>
          <img src="/logo.png" alt="Nixol Management & Consult" style={{ height: '58px', width: 'auto', marginBottom: '1rem' }} />
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontStyle: 'italic', color: gold, marginBottom: '0.75rem', lineHeight: 1.4 }}>
            "Built on Expertise. Driven by Integrity."
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: s300, lineHeight: 1.7, marginBottom: '0.75rem' }}>
            Strategic advisory and financial management firm helping organizations strengthen performance and make smarter decisions.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: s400, letterSpacing: '0.06em' }}>EIN: 42-1824156</p>
        </div>

        {/* Services */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: gold, marginBottom: '1.25rem' }}>Services</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {SERVICES.map(s => (
              <li key={s}>
                <Link to="/services" style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: s300, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = gold}
                  onMouseLeave={e => e.currentTarget.style.color = s300}>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: gold, flexShrink: 0, opacity: 0.7 }} />
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: gold, marginBottom: '1.25rem' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {LINKS.map(({ label, to }) => (
              <li key={to}>
                <Link to={to} style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: s300, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = gold}
                  onMouseLeave={e => e.currentTarget.style.color = s300}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: gold, marginBottom: '1.25rem' }}>Get In Touch</h4>

          {/* Nixol main */}
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: gold, marginBottom: '0.65rem' }}>Nixol Office</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '1.5rem' }}>
            {[
              { icon: '📞', text: '+1 (325) 703-0636' },
              { icon: '📧', text: 'info@nixolmc.com' },
              { icon: '🌐', text: 'www.nixolmc.com' },
              { icon: '🕐', text: 'Mon – Fri: 9AM – 6PM EST' },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '0.82rem', marginTop: '1px', flexShrink: 0 }}>{icon}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: s300, lineHeight: 1.4 }}>{text}</span>
              </div>
            ))}
          </div>

          {/* David – Healthcare Partner */}
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: gold, marginBottom: '0.65rem' }}>
            Healthcare Partnership — David
          </p>
          <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.82rem', marginTop: '1px', flexShrink: 0 }}>📞</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: s300 }}>+233 24 909 9740</span>
          </div>

          <Link to="/booking" style={{
            display: 'inline-block', padding: '0.6rem 1.25rem',
            background: gold, color: navy,
            fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700,
            letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none',
            borderRadius: '5px', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#d4b86a'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = gold; e.currentTarget.style.transform = 'translateY(0)' }}>
            Book a Consultation
          </Link>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '1.25rem 1.75rem', maxWidth: '1280px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '0.75rem' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: s400, margin: 0 }}>
          © {new Date().getFullYear()} Nixol Management & Consult. All rights reserved.
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: s400, margin: 0 }}>EIN: 42-1824156</p>
      </div>
    </footer>
  )
}