import { Link } from 'react-router-dom'

const gold  = '#C9A84C'
const navy  = '#0B1D3A'
const s500  = '#8B9BB4'
const s600  = '#6B7D98'

const SERVICES = [
  'Management & Advisory',
  'Financial Management & Advisory',
  'Business Strategy & Growth',
  'Accounting & Compliance',
  'Operations & Process Optimization',
]

const LINKS = [
  { label: 'Home',              to: '/' },
  { label: 'Services',          to: '/services' },
  { label: 'About',             to: '/about' },
  { label: 'Contact',           to: '/contact' },
  { label: 'Book Consultation', to: '/booking' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#04101F', borderTop: '1px solid rgba(201,168,76,0.12)' }}>
      {/* Main grid */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.75rem 2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem' }}>

        {/* Brand */}
        <div style={{ gridColumn: 'span 1' }}>
          <img src="/logo.png" alt="Nixol Management & Consult" style={{ height: '56px', width: 'auto', marginBottom: '1rem' }} />
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontStyle: 'italic', color: gold, marginBottom: '0.75rem', lineHeight: 1.4 }}>
            "Built on Expertise. Driven by Integrity."
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: s500, lineHeight: 1.7, marginBottom: '1rem' }}>
            Strategic advisory and financial management firm helping organizations strengthen performance and make smarter decisions.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: s600, letterSpacing: '0.05em' }}>
            EIN: 42-1824156
          </p>
        </div>

        {/* Services */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: gold, marginBottom: '1.25rem' }}>Services</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {SERVICES.map(s => (
              <li key={s}>
                <Link to="/services" style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: s500, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = gold}
                  onMouseLeave={e => e.currentTarget.style.color = s500}>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: gold, flexShrink: 0, opacity: 0.6 }} />
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: gold, marginBottom: '1.25rem' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {LINKS.map(({ label, to }) => (
              <li key={to}>
                <Link to={to} style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: s500, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = gold}
                  onMouseLeave={e => e.currentTarget.style.color = s500}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: gold, marginBottom: '1.25rem' }}>Get In Touch</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {[
              { icon: '📞', text: '+1 (325) 703-0636' },
              { icon: '📧', text: 'info@nixolmc.com' },
              { icon: '🌐', text: 'www.nixolmc.com' },
              { icon: '🕐', text: 'Mon – Fri: 9AM – 6PM EST' },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '0.85rem', marginTop: '1px' }}>{icon}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: s500, lineHeight: 1.5 }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Book CTA */}
          <Link to="/booking" style={{
            display: 'inline-block', marginTop: '1.5rem',
            padding: '0.6rem 1.25rem', background: gold, color: navy,
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

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(26,58,107,0.4)', padding: '1.25rem 1.75rem', maxWidth: '1280px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '0.75rem' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: s600, margin: 0 }}>
          © {new Date().getFullYear()} Nixol Management & Consult. All rights reserved.
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: s600, margin: 0 }}>
          EIN: 42-1824156
        </p>
      </div>
    </footer>
  )
}