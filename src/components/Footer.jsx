import { Link } from 'react-router-dom'

const SERVICES = ['Strategic Consulting', 'Business Advisory', 'Financial Management', 'Organisational Development', 'Risk Management', 'Market Research']
const LINKS = [{ label: 'Home', to: '/' }, { label: 'Services', to: '/services' }, { label: 'About', to: '/about' }, { label: 'Contact', to: '/contact' }]

const s = {
  footer: { background: 'var(--color-navy-950)', borderTop: '1px solid rgba(201,168,76,0.12)' },
  inner: { maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem' },
  colHead: { fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-gold-500)', marginBottom: '1.2rem', letterSpacing: '0.03em' },
  tagline: { fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-silver-600)', lineHeight: 1.6, marginTop: '0.75rem' },
  listItem: { listStyle: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' },
  dot: { width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(201,168,76,0.4)', flexShrink: 0 },
  link: { fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-silver-500)', textDecoration: 'none', transition: 'color 0.2s' },
  contactItem: { display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.9rem' },
  contactText: { fontFamily: 'var(--font-body)', fontSize: '0.83rem', color: 'var(--color-silver-500)', lineHeight: 1.5 },
  bottom: { borderTop: '1px solid rgba(26,58,107,0.6)', padding: '1.25rem 1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', maxWidth: '1200px', margin: '0 auto' },
  copy: { fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-silver-600)' },
}

export default function Footer() {
  return (
    <footer style={s.footer}>
      <div style={s.inner}>
        {/* Brand */}
        <div>
          <img src="/logo.png" alt="Nixol" style={{ height: '44px', width: 'auto' }} />
          <p style={s.tagline}>Built on Expertise.<br />Driven by Integrity.</p>
          <p style={{ ...s.tagline, marginTop: '0.75rem', color: 'var(--color-silver-600)' }}>
            Empowering businesses with strategic insight across Africa and beyond.
          </p>
        </div>

        {/* Services */}
        <div>
          <p style={s.colHead}>Services</p>
          <ul style={{ margin: 0, padding: 0 }}>
            {SERVICES.map(sv => (
              <li key={sv} style={s.listItem}>
                <span style={s.dot} />
                <Link to="/services" style={s.link}
                  onMouseEnter={e => e.target.style.color = 'var(--color-gold-400)'}
                  onMouseLeave={e => e.target.style.color = 'var(--color-silver-500)'}
                >{sv}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <p style={s.colHead}>Navigation</p>
          <ul style={{ margin: 0, padding: 0 }}>
            {LINKS.map(({ label, to }) => (
              <li key={to} style={s.listItem}>
                <span style={s.dot} />
                <Link to={to} style={s.link}
                  onMouseEnter={e => e.target.style.color = 'var(--color-gold-400)'}
                  onMouseLeave={e => e.target.style.color = 'var(--color-silver-500)'}
                >{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p style={s.colHead}>Contact</p>
          {[['📍', 'Nairobi, Kenya'], ['📧', 'info@nixolmc.com'], ['📞', '+254 700 000 000'], ['🕐', 'Mon – Fri · 8AM – 6PM EAT']].map(([icon, text]) => (
            <div key={text} style={s.contactItem}>
              <span style={{ fontSize: '1rem', lineHeight: 1.5 }}>{icon}</span>
              <span style={s.contactText}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={s.bottom}>
        <p style={s.copy}>© {new Date().getFullYear()} Nixol Management & Consult. All rights reserved.</p>
        <p style={{ ...s.copy, color: 'var(--color-silver-600)' }}>Built on Expertise. Driven by Integrity.</p>
      </div>
    </footer>
  )
}