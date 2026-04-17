import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('revealed'); io.disconnect() }
    }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  { icon: '⚡', title: 'Strategic Consulting', desc: 'Evidence-backed strategy tailored to your industry and growth ambitions.' },
  { icon: '🏛️', title: 'Business Advisory', desc: 'Expert guidance from startup structuring through to enterprise transformation.' },
  { icon: '📊', title: 'Financial Management', desc: 'Optimise cash flow and build financial structures that sustain long-term growth.' },
  { icon: '🎯', title: 'Market Research', desc: 'Actionable intelligence on competitors, trends, and emerging market opportunities.' },
]

const STATS = [
  { value: '12+', label: 'Years of Excellence' },
  { value: '200+', label: 'Clients Served' },
  { value: '95%', label: 'Client Retention' },
  { value: '40+', label: 'Industries Covered' },
]

const VALUES = [
  { title: 'Integrity First', desc: 'Unwavering ethical standards — every recommendation serves your best interest, not ours.' },
  { title: 'Deep Expertise', desc: 'Decades of cross-industry knowledge applied with academic rigour to every engagement.' },
  { title: 'Results Driven', desc: 'We measure success by your outcomes, not hours billed or reports delivered.' },
]

// ─── Styles ───────────────────────────────────────────────────────────────────
const gold = 'var(--color-gold-500)'
const navy900 = 'var(--color-navy-900)'
const navy800 = 'var(--color-navy-800)'
const navy950 = 'var(--color-navy-950)'
const silver400 = 'var(--color-silver-400)'
const silver500 = 'var(--color-silver-500)'
const white = '#ffffff'

// ─── Components ───────────────────────────────────────────────────────────────

function Badge({ children }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '0.35rem 1rem',
      fontSize: '0.68rem',
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: gold,
      border: '1px solid rgba(201,168,76,0.25)',
      borderRadius: '999px',
      marginBottom: '1.25rem',
    }}>{children}</span>
  )
}

function ServiceCard({ icon, title, desc }) {
  return (
    <div
      style={{
        padding: '2rem',
        background: navy900,
        border: '1px solid rgba(26,58,107,0.6)',
        borderRadius: '14px',
        transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)'
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.4)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(26,58,107,0.6)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={{ fontSize: '2rem', marginBottom: '1.25rem' }}>{icon}</div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 600, color: white, marginBottom: '0.6rem' }}>{title}</h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: silver500, lineHeight: 1.7 }}>{desc}</p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const statsRef = useReveal()
  const servicesRef = useReveal()
  const aboutRef = useReveal()
  const ctaRef = useReveal()

  return (
    <main style={{ overflow: 'hidden' }}>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '7rem 1.5rem 4rem',
        background: `linear-gradient(135deg, var(--color-navy-950) 0%, var(--color-navy-900) 50%, #0d2346 100%)`,
      }}>
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.035,
          backgroundImage: `repeating-linear-gradient(90deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 72px),
                            repeating-linear-gradient(180deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 72px)`,
        }} />
        {/* Glow blobs */}
        <div style={{ position: 'absolute', top: '15%', left: '20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '15%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(35,79,141,0.25) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '860px', margin: '0 auto' }}>
          {/* Logo */}
          <div className="anim-fade-up" style={{ marginBottom: '2.5rem' }}>
            <img src="/logo.png" alt="Nixol Management & Consult" style={{ height: '130px', width: 'auto', margin: '0 auto', filter: 'drop-shadow(0 8px 40px rgba(0,0,0,0.6))' }} />
          </div>

          <div className="anim-fade-up anim-delay-1" style={{ marginBottom: '1.5rem' }}>
            <Badge>Management & Consulting</Badge>
          </div>

          <h1 className="anim-fade-up anim-delay-2" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 8vw, 5.5rem)',
            fontWeight: 700,
            color: white,
            lineHeight: 1.05,
            marginBottom: '1.5rem',
          }}>
            Built on{' '}
            <span style={{ background: 'linear-gradient(135deg, var(--color-gold-400), var(--color-gold-600))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Expertise.
            </span>
            <br />
            Driven by{' '}
            <span style={{ color: 'var(--color-silver-300)' }}>
              Integrity.
            </span>
          </h1>

          <p className="anim-fade-up anim-delay-3" style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.1rem',
            color: silver400,
            lineHeight: 1.75,
            maxWidth: '560px',
            margin: '0 auto 2.5rem',
          }}>
            Nixol delivers strategic clarity and operational excellence to businesses across Africa and beyond — transforming challenges into competitive advantage.
          </p>

          <div className="anim-fade-up anim-delay-4" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/services" style={{
              padding: '0.9rem 2.2rem',
              background: gold,
              color: navy900,
              fontFamily: 'var(--font-body)',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              borderRadius: '7px',
              textDecoration: 'none',
              transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { e.target.style.background = 'var(--color-gold-400)'; e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 12px 32px rgba(201,168,76,0.3)' }}
              onMouseLeave={e => { e.target.style.background = gold; e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none' }}
            >
              Explore Services
            </Link>
            <Link to="/contact" style={{
              padding: '0.9rem 2.2rem',
              background: 'transparent',
              color: 'var(--color-silver-300)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              borderRadius: '7px',
              border: '1px solid rgba(139,155,180,0.35)',
              textDecoration: 'none',
              transition: 'border-color 0.2s, color 0.2s, transform 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'; e.currentTarget.style.color = white; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(139,155,180,0.35)'; e.currentTarget.style.color = 'var(--color-silver-300)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Book a Consultation
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', opacity: 0.4, animation: 'fadeUp 1s ease 1.5s forwards', opacity: 0 }}>
          <div style={{ width: '20px', height: '32px', border: '1.5px solid rgba(139,155,180,0.5)', borderRadius: '10px', display: 'flex', justifyContent: 'center', paddingTop: '6px' }}>
            <div style={{ width: '3px', height: '7px', background: gold, borderRadius: '2px', animation: 'fadeUp 1.5s ease infinite alternate' }} />
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────── */}
      <section style={{ background: navy800, borderTop: '1px solid rgba(201,168,76,0.08)', borderBottom: '1px solid rgba(201,168,76,0.08)', padding: '3rem 1.5rem' }}>
        <div ref={statsRef} className="reveal" style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 700, color: gold, lineHeight: 1, marginBottom: '0.4rem' }}>{value}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: silver500 }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────────── */}
      <section style={{ padding: '6rem 1.5rem', background: navy950 }}>
        <div ref={servicesRef} className="reveal" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <Badge>What We Do</Badge>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: white, marginBottom: '0.75rem' }}>Core Services</h2>
            <p style={{ fontFamily: 'var(--font-body)', color: silver500, maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
              Comprehensive consulting solutions engineered around your business reality.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {SERVICES.map(s => <ServiceCard key={s.title} {...s} />)}
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link to="/services" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: gold, textDecoration: 'none', transition: 'gap 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.gap = '0.75rem'}
              onMouseLeave={e => e.currentTarget.style.gap = '0.5rem'}
            >
              View All Services <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT STRIP ───────────────────────────────────────────────────── */}
      <section style={{ padding: '6rem 1.5rem', background: navy900 }}>
        <div ref={aboutRef} className="reveal" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          {/* Text */}
          <div>
            <Badge>Who We Are</Badge>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 700, color: white, lineHeight: 1.15, marginBottom: '1.25rem' }}>
              A Partner Built for <em style={{ color: gold, fontStyle: 'italic' }}>Your</em> Growth
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', color: silver400, lineHeight: 1.8, marginBottom: '1rem', fontSize: '0.95rem' }}>
              Nixol was founded on a singular belief: businesses deserve advisors as invested in their success as they are. We combine deep sector expertise with a hands-on, integrity-first approach.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', color: silver500, lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.9rem' }}>
              From early-stage structuring to enterprise transformation, our consultants become extensions of your leadership team.
            </p>
            <Link to="/about" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.8rem 1.8rem',
              border: '1px solid rgba(201,168,76,0.45)',
              color: gold,
              fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              borderRadius: '6px', textDecoration: 'none', transition: 'all 0.25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = gold; e.currentTarget.style.color = navy900; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = gold; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Our Story →
            </Link>
          </div>

          {/* Values */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {VALUES.map(({ title, desc }) => (
              <div key={title} style={{
                display: 'flex', gap: '1.25rem', padding: '1.5rem 1.75rem',
                background: navy800, border: '1px solid rgba(26,58,107,0.7)',
                borderRadius: '12px', transition: 'border-color 0.3s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(26,58,107,0.7)'}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: gold, marginTop: '6px', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: white, marginBottom: '0.3rem' }}>{title}</h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: silver500, lineHeight: 1.65 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: '6rem 1.5rem', position: 'relative', overflow: 'hidden', background: navy950 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.07) 0%, transparent 55%), radial-gradient(ellipse at 70% 50%, rgba(35,79,141,0.2) 0%, transparent 55%)' }} />
        <div ref={ctaRef} className="reveal" style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: white, marginBottom: '1rem' }}>
            Ready to Transform Your Business?
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', color: silver400, fontSize: '1rem', lineHeight: 1.75, marginBottom: '2.5rem' }}>
            Let's talk about where you are, where you want to be, and how we get you there.
          </p>
          <Link to="/contact" style={{
            display: 'inline-block',
            padding: '1rem 2.8rem',
            background: gold,
            color: navy900,
            fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            borderRadius: '7px', textDecoration: 'none', transition: 'all 0.25s',
          }}
            onMouseEnter={e => { e.target.style.background = 'var(--color-gold-400)'; e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 16px 40px rgba(201,168,76,0.28)' }}
            onMouseLeave={e => { e.target.style.background = gold; e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none' }}
          >
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </main>
  )
}