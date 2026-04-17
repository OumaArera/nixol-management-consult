import { Link } from 'react-router-dom'

const PILLARS = [
  { label: 'Excellence', desc: 'We maintain the highest professional standards in every deliverable.' },
  { label: 'Integrity', desc: 'Our counsel is always independent, honest, and in the client\'s best interest.' },
  { label: 'Partnership', desc: 'We build lasting relationships, not transactional engagements.' },
  { label: 'Innovation', desc: 'Fresh thinking applied to persistent challenges — experience meets creativity.' },
]

const TEAM = [
  { initials: 'EN', name: 'Dr. E. Nixol', role: 'Managing Director', bio: 'A seasoned management consultant with 15+ years across East Africa. Holds an MBA and DBA in Strategic Management.' },
  { initials: 'JO', name: 'James Ochieng', role: 'Head of Financial Advisory', bio: 'CFA-certified with a decade in corporate finance, investment structuring, and financial risk management.' },
  { initials: 'PS', name: 'Priya Sharma', role: 'Director of Strategy', bio: 'Former McKinsey analyst specialising in market entry and growth acceleration across emerging markets.' },
]

const g = 'var(--color-gold-500)'
const n900 = 'var(--color-navy-900)'
const n800 = 'var(--color-navy-800)'
const s400 = 'var(--color-silver-400)'
const s500 = 'var(--color-silver-500)'

export default function AboutPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--color-navy-950)', paddingTop: '5rem' }}>

      {/* Header */}
      <section style={{ padding: '5rem 1.5rem 4rem', background: `linear-gradient(180deg, ${n900} 0%, var(--color-navy-950) 100%)`, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: '30%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ maxWidth: '640px', margin: '0 auto', position: 'relative' }}>
          <span style={{ display: 'inline-block', padding: '0.35rem 1rem', fontSize: '0.68rem', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: g, border: '1px solid rgba(201,168,76,0.25)', borderRadius: '999px', marginBottom: '1.25rem' }}>Our Story</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 3.75rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '1.1rem' }}>Who Is Nixol?</h1>
          <p style={{ fontFamily: 'var(--font-body)', color: s400, fontSize: '1rem', lineHeight: 1.75 }}>
            A management and consulting firm built on principled advice and deep expertise that changes the trajectory of any business.
          </p>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: '4rem 1.5rem', maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {[
          {
            title: 'Our Origin',
            text: [
              'Nixol Management & Consult was established to fill a gap in the African consulting landscape: firms that combine world-class methodology with genuine on-the-ground contextual understanding.',
              'Our founders drew on decades of combined experience across finance, strategy, operations, and public policy — building a firm that speaks both languages: global best practice and local market nuance.',
            ],
          },
        ].map(({ title, text }) => (
          <div key={title} style={{ padding: '2.5rem 2.75rem', background: n900, border: '1px solid rgba(26,58,107,0.6)', borderRadius: '16px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 600, color: '#fff', marginBottom: '1rem' }}>{title}</h2>
            {text.map((t, i) => <p key={i} style={{ fontFamily: 'var(--font-body)', color: i === 0 ? s400 : s500, lineHeight: 1.8, fontSize: '0.93rem', marginBottom: i < text.length - 1 ? '0.9rem' : 0 }}>{t}</p>)}
          </div>
        ))}

        {/* Mission quote */}
        <div style={{ padding: '2.5rem 2.75rem', background: n900, border: '1px solid rgba(201,168,76,0.15)', borderRadius: '16px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 600, color: '#fff', marginBottom: '1.25rem' }}>Our Mission</h2>
          <blockquote style={{ borderLeft: `3px solid ${g}`, paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontStyle: 'italic', color: 'var(--color-gold-400)', lineHeight: 1.5 }}>
              "To empower businesses with strategic clarity, operational rigour, and the confidence to grow — Built on Expertise. Driven by Integrity."
            </p>
          </blockquote>
          <p style={{ fontFamily: 'var(--font-body)', color: s500, lineHeight: 1.8, fontSize: '0.9rem' }}>
            Every engagement is guided by these words. We measure success by the milestones our clients reach.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section style={{ padding: '4rem 1.5rem', background: n900 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>Our Core Pillars</h2>
            <p style={{ fontFamily: 'var(--font-body)', color: s500 }}>The principles that govern every interaction and result.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.25rem' }}>
            {PILLARS.map(({ label, desc }) => (
              <div key={label} style={{
                padding: '1.75rem', background: n800, border: '1px solid rgba(26,58,107,0.7)', borderRadius: '12px',
                transition: 'border-color 0.3s, transform 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,58,107,0.7)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: g }} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600, color: '#fff', marginBottom: '0.4rem' }}>{label}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.83rem', color: s500, lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ display: 'inline-block', padding: '0.35rem 1rem', fontSize: '0.68rem', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: g, border: '1px solid rgba(201,168,76,0.25)', borderRadius: '999px', marginBottom: '1rem' }}>Leadership</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 700, color: '#fff' }}>The Minds Behind Nixol</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {TEAM.map(({ initials, name, role, bio }) => (
              <div key={name} style={{ padding: '2rem', background: n900, border: '1px solid rgba(26,58,107,0.6)', borderRadius: '14px', transition: 'border-color 0.3s, transform 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,58,107,0.6)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-navy-700), rgba(201,168,76,0.3))', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-gold-400)' }}>
                  {initials}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600, color: '#fff', marginBottom: '0.2rem' }}>{name}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: g, marginBottom: '0.9rem' }}>{role}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: s500, lineHeight: 1.65 }}>{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 1.5rem 5rem', textAlign: 'center', borderTop: '1px solid rgba(26,58,107,0.5)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>Ready to work with us?</h2>
        <Link to="/contact" style={{ display: 'inline-block', padding: '0.9rem 2.4rem', background: g, color: 'var(--color-navy-900)', fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', borderRadius: '7px', textDecoration: 'none', transition: 'all 0.25s' }}
          onMouseEnter={e => { e.target.style.background = 'var(--color-gold-400)'; e.target.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.target.style.background = g; e.target.style.transform = 'translateY(0)' }}
        >
          Get in Touch →
        </Link>
      </section>
    </main>
  )
}