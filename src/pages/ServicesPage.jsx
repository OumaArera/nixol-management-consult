import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const SERVICES = [
  {
    icon: '⚡',
    title: 'Strategic Consulting',
    desc: 'We work with your leadership team to define a compelling vision and build the roadmap to reach it.',
    bullets: ['Competitive analysis', 'Market positioning', 'Growth roadmaps', 'KPI design'],
  },
  {
    icon: '🏛️',
    title: 'Business Advisory',
    desc: 'From incorporation to scale — practical, experience-backed guidance for high-stakes decisions.',
    bullets: ['Business structuring', 'Board advisory', 'Governance design', 'Investor readiness'],
  },
  {
    icon: '📊',
    title: 'Financial Management',
    desc: 'Robust financial architecture that gives visibility, control, and agility when opportunities arise.',
    bullets: ['Financial modelling', 'Cash-flow optimisation', 'Cost reduction', 'Budgeting systems'],
  },
  {
    icon: '🏗️',
    title: 'Organisational Development',
    desc: 'Build high-performing cultures, streamline structures, and develop talent pipelines for growth.',
    bullets: ['Culture design', 'Talent strategy', 'Leadership coaching', 'Change management'],
  },
  {
    icon: '🛡️',
    title: 'Risk Management',
    desc: 'Identify vulnerabilities and design frameworks that protect what you have built.',
    bullets: ['Risk assessment', 'Compliance advisory', 'Crisis planning', 'Business continuity'],
  },
  {
    icon: '🎯',
    title: 'Market Research',
    desc: 'Deep market intelligence — from consumer insight to sector analysis — that sharpens decisions.',
    bullets: ['Consumer research', 'Sector analysis', 'Entry strategies', 'Trend forecasting'],
  },
]

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('revealed'); io.disconnect() }
    }, { threshold: 0.08 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

function ServiceCard({ icon, title, desc, bullets }) {
  const ref = useReveal()
  return (
    <div
      ref={ref}
      className="reveal"
      style={{
        padding: '2.25rem',
        background: 'var(--color-navy-900)',
        border: '1px solid rgba(26,58,107,0.6)',
        borderRadius: '14px',
        transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'; e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 24px 60px rgba(0,0,0,0.45)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,58,107,0.6)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
    >
      <div style={{ fontSize: '2.25rem', marginBottom: '1.25rem' }}>{icon}</div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 600, color: '#fff', marginBottom: '0.75rem' }}>{title}</h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.87rem', color: 'var(--color-silver-500)', lineHeight: 1.75, marginBottom: '1.5rem' }}>{desc}</p>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {bullets.map(b => (
          <li key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--color-silver-400)' }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--color-gold-500)', flexShrink: 0 }} />
            {b}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--color-navy-950)', paddingTop: '5rem' }}>
      {/* Header */}
      <section style={{
        position: 'relative', padding: '5rem 1.5rem 4rem', overflow: 'hidden',
        background: 'linear-gradient(180deg, var(--color-navy-900) 0%, var(--color-navy-950) 100%)',
      }}>
        <div style={{ position: 'absolute', top: 0, right: '20%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ display: 'inline-block', padding: '0.35rem 1rem', fontSize: '0.68rem', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-gold-500)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: '999px', marginBottom: '1.25rem' }}>Our Expertise</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 3.75rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '1.1rem' }}>
            Services Designed for Impact
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-silver-400)', fontSize: '1rem', lineHeight: 1.75 }}>
            Every engagement is bespoke — shaped by your sector, your ambitions, and the specific challenge at hand.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: '4rem 1.5rem 5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {SERVICES.map(s => <ServiceCard key={s.title} {...s} />)}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '3rem 1.5rem 5rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-silver-400)', marginBottom: '1.5rem', fontSize: '1rem' }}>
          Don't see exactly what you need? We tailor every engagement.
        </p>
        <Link to="/contact" style={{
          display: 'inline-block', padding: '0.9rem 2.4rem',
          background: 'var(--color-gold-500)', color: 'var(--color-navy-900)',
          fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 700,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          borderRadius: '7px', textDecoration: 'none', transition: 'all 0.25s',
        }}
          onMouseEnter={e => { e.target.style.background = 'var(--color-gold-400)'; e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 12px 32px rgba(201,168,76,0.28)' }}
          onMouseLeave={e => { e.target.style.background = 'var(--color-gold-500)'; e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none' }}
        >
          Talk to Our Team →
        </Link>
      </section>
    </main>
  )
}