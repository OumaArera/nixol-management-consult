import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// ── Colour tokens (matches new bright palette) ────────────────────────────────
const gold  = '#C9A84C'
const navy  = '#0d2144'
const navy2 = '#1a3a6b'
const white = '#ffffff'
const t900  = '#0d2144'
const t700  = '#2d4a7a'
const t500  = '#4a6fa5'
const t400  = '#7a9bc4'

// ── Helpers ───────────────────────────────────────────────────────────────────
function useMobile() {
  const [mobile, setMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return mobile
}

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return ref
}

function Reveal({ children, style = {}, delay = 0 }) {
  const ref = useReveal()
  return (
    <div ref={ref} style={{ opacity: 0, transform: 'translateY(24px)', transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`, ...style }}>
      {children}
    </div>
  )
}

const Badge = ({ text, dark = false }) => (
  <span style={{
    display: 'inline-block', padding: '0.35rem 1.1rem',
    border: `1px solid ${dark ? 'rgba(201,168,76,0.35)' : 'rgba(13,33,68,0.15)'}`,
    borderRadius: '999px', fontFamily: 'var(--font-body)', fontSize: '0.62rem',
    fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase',
    color: dark ? gold : t700, marginBottom: '1.25rem',
    background: dark ? 'rgba(201,168,76,0.06)' : 'rgba(13,33,68,0.04)',
  }}>
    {text}
  </span>
)

// ── Data ──────────────────────────────────────────────────────────────────────
const CLIENTS = [
  {
    name: 'Edmonds',
    logo: '/edmonds.png',
    sector: 'Professional Services',
    tagline: 'A trusted partner in financial clarity and strategic performance.',
    description: 'Nixol has been a trusted advisory partner for Edmonds, bringing strategic clarity and financial discipline to their operations. Our team\'s depth of expertise and hands-on approach made an immediate and measurable difference across their financial and operational landscape.',
    services: ['Financial Management & Advisory', 'Strategic Planning', 'Operations Optimization'],
    highlight: 'Measurable improvements in financial performance and operational efficiency.',
  },
  {
    name: 'Bothell',
    logo: '/bothell.png',
    sector: 'Education & Nonprofits',
    tagline: 'Stronger governance, sharper controls, and smarter operations.',
    description: 'Working with Nixol elevated how Bothell approaches governance, risk, and internal controls. Our consultants understood their unique challenges and delivered solutions that were practical, scalable, and results-driven — tailored to the nonprofit sector.',
    services: ['Management & Advisory', 'Accounting & Compliance', 'Business Strategy & Growth'],
    highlight: 'Strengthened internal controls and governance frameworks across the organisation.',
  },
]

const INDUSTRIES = [
  'Education & Nonprofits',
  'Oil and Gas',
  'Professional Services',
  'Retail & Distribution',
  'Manufacturing & Supply Chain',
  'Healthcare & Medical Facilities',
  'Startups & Emerging Enterprises',
]

const WHY = [
  { icon: '🎯', label: 'Tailored Engagements',   desc: 'No two clients are the same. Every solution is built around your specific goals, challenges, and sector context.' },
  { icon: '📊', label: 'Data-Driven Insights',    desc: 'We ground every recommendation in rigorous analysis and real financial intelligence — not guesswork.' },
  { icon: '🤝', label: 'Long-Term Partnership',   desc: 'We measure our success by the milestones our clients reach, not by hours billed or reports delivered.' },
  { icon: '⚡', label: 'Measurable Results',       desc: 'Every engagement is designed around clear outcomes — improved efficiency, profitability, and governance.' },
]

// ── Client Card ───────────────────────────────────────────────────────────────
function ClientCard({ client, delay }) {
  const ref = useReveal()

  return (
    <div ref={ref} style={{ opacity: 0, transform: 'translateY(24px)', transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`, height: '100%' }}>
      <div style={{
        background: white, border: '1px solid rgba(13,33,68,0.1)',
        borderRadius: '20px', overflow: 'hidden', height: '100%',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 4px 20px rgba(13,33,68,0.07)',
        transition: 'all 0.35s',
      }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.45)'; e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(13,33,68,0.13)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(13,33,68,0.1)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(13,33,68,0.07)' }}
      >
        {/* Logo area */}
        <div style={{
          height: '200px',
          background: 'linear-gradient(135deg, #0d2144 0%, #1a3a6b 100%)',
          borderBottom: `3px solid ${gold}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '2rem', position: 'relative',
        }}>
          {/* Subtle grid pattern */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(90deg,#C9A84C 0,#C9A84C 1px,transparent 1px,transparent 48px),repeating-linear-gradient(0deg,#C9A84C 0,#C9A84C 1px,transparent 1px,transparent 48px)' }} />
          <img
            src={client.logo}
            alt={client.name}
            style={{ maxHeight: '110px', maxWidth: '250px', width: 'auto', objectFit: 'contain', position: 'relative', zIndex: 1, filter: 'brightness(1.05)' }}
            onError={e => {
              e.target.style.display = 'none'
              const el = document.createElement('div')
              el.style.cssText = `font-family:Georgia,serif;font-size:2.8rem;font-weight:700;color:#ffffff;letter-spacing:0.08em;position:relative;z-index:1;`
              el.textContent = client.name
              e.target.parentElement.appendChild(el)
            }}
          />
        </div>

        {/* Body */}
        <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Sector badge */}
          <span style={{
            alignSelf: 'flex-start', padding: '0.3rem 0.85rem',
            background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.25)',
            borderRadius: '999px', fontFamily: 'var(--font-body)', fontSize: '0.6rem',
            fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: gold,
          }}>
            {client.sector}
          </span>

          {/* Tagline */}
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontStyle: 'italic', color: t700, lineHeight: 1.5, margin: 0 }}>
            "{client.tagline}"
          </p>

          {/* Description */}
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.84rem', color: t500, lineHeight: 1.75, margin: 0 }}>
            {client.description}
          </p>

          {/* Highlight */}
          <div style={{ padding: '0.85rem 1.1rem', background: '#f0f5ff', border: '1px solid rgba(13,33,68,0.08)', borderLeft: `3px solid ${gold}`, borderRadius: '0 8px 8px 0' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: t700, margin: 0, lineHeight: 1.55 }}>
              <strong style={{ color: navy, fontWeight: 600 }}>Result: </strong>{client.highlight}
            </p>
          </div>

          {/* Services tags */}
          <div style={{ marginTop: 'auto' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: t400, marginBottom: '0.6rem' }}>
              Services Engaged
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {client.services.map(s => (
                <span key={s} style={{
                  padding: '0.3rem 0.75rem', background: '#f8faff',
                  border: '1px solid rgba(13,33,68,0.1)', borderRadius: '999px',
                  fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: t700,
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ClientsPage() {
  const mobile = useMobile()

  return (
    <main style={{ paddingTop: '4rem', minHeight: '100vh', background: '#f8faff' }}>

      {/* ── Header (dark) ── */}
      <section style={{ position: 'relative', padding: mobile ? '3rem 1.25rem 2.5rem' : '4rem 1.75rem 3rem', textAlign: 'center', overflow: 'hidden', background: navy }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 50% 70%, rgba(201,168,76,0.08) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'repeating-linear-gradient(90deg,#C9A84C 0,#C9A84C 1px,transparent 1px,transparent 72px),repeating-linear-gradient(0deg,#C9A84C 0,#C9A84C 1px,transparent 1px,transparent 72px)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto' }}>
          <Badge text="Our Clients" dark />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: 700, color: white, marginBottom: '1rem', lineHeight: 1.1 }}>
            Organizations That Trust Nixol
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: '#B0BCCC', lineHeight: 1.75 }}>
            We are proud to partner with organizations committed to operational excellence, financial clarity, and long-term strategic growth.
          </p>
        </div>
      </section>

      {/* ── Logo Strip (white) ── */}
      <section style={{ background: white, borderBottom: '1px solid rgba(13,33,68,0.08)', padding: '2.5rem 1.75rem' }}>
        <Reveal>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: t400, textAlign: 'center', marginBottom: '1.75rem' }}>
            Trusted Partners
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', alignItems: 'center' }}>
            {CLIENTS.map(({ name, logo }) => (
              <div key={name} style={{
                padding: '1.1rem 2rem', background: '#f0f5ff',
                border: '1px solid rgba(13,33,68,0.1)', borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                minWidth: '150px', minHeight: '70px',
                transition: 'all 0.3s', boxShadow: '0 2px 8px rgba(13,33,68,0.05)',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(13,33,68,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(13,33,68,0.1)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(13,33,68,0.05)' }}
              >
                <img src={logo} alt={name}
                  style={{ maxHeight: '44px', maxWidth: '120px', width: 'auto', objectFit: 'contain' }}
                  onError={e => {
                    e.target.style.display = 'none'
                    const el = document.createElement('span')
                    el.style.cssText = `font-family:Georgia,serif;font-size:1.1rem;font-weight:700;color:${navy};letter-spacing:0.06em`
                    el.textContent = name
                    e.target.parentElement.appendChild(el)
                  }} />
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Client Cards (light) ── */}
      <section style={{ padding: mobile ? '3rem 1.25rem' : '5rem 1.75rem', maxWidth: '1100px', margin: '0 auto' }}>
        <Reveal style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Badge text="Client Stories" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 600, color: t900, marginBottom: '0.75rem' }}>
            The Work We Do Together
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: t500, maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Every engagement is built around your unique goals. Here's a look at two of the organizations we proudly serve.
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(2, 1fr)', gap: '2rem', alignItems: 'start' }}>
          {CLIENTS.map((client, i) => (
            <ClientCard key={client.name} client={client} delay={i * 120} />
          ))}
        </div>
      </section>

      {/* ── Why Clients Choose Nixol (blue-tinted light) ── */}
      <section style={{ padding: mobile ? '3rem 1.25rem' : '5rem 1.75rem', background: '#f0f5ff' }}>
        <Reveal style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Badge text="Why They Choose Us" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 600, color: t900 }}>
              What Sets Nixol Apart
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '1.25rem' }}>
            {WHY.map(({ icon, label, desc }, i) => (
              <Reveal key={label} delay={i * 80}>
                <div style={{
                  padding: '1.75rem 1.5rem', background: white,
                  border: '1px solid rgba(13,33,68,0.08)', borderRadius: '14px',
                  transition: 'all 0.3s', height: '100%',
                  boxShadow: '0 2px 10px rgba(13,33,68,0.05)',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(13,33,68,0.1)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(13,33,68,0.08)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(13,33,68,0.05)' }}>
                  <div style={{ fontSize: '1.75rem', marginBottom: '0.85rem' }}>{icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: t900, marginBottom: '0.6rem' }}>{label}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: t500, lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Industries (white) ── */}
      <section style={{ padding: mobile ? '3rem 1.25rem' : '4rem 1.75rem', background: white, borderTop: '1px solid rgba(13,33,68,0.07)' }}>
        <Reveal style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: t400, marginBottom: '1.5rem' }}>
            Industries We Serve
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            {INDUSTRIES.map(ind => (
              <span key={ind} style={{
                padding: '0.5rem 1.1rem', background: '#f8faff',
                border: '1px solid rgba(13,33,68,0.1)', borderRadius: '999px',
                fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: t700,
                transition: 'all 0.2s', cursor: 'default',
                boxShadow: '0 1px 4px rgba(13,33,68,0.04)',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.color = navy; e.currentTarget.style.background = 'rgba(201,168,76,0.06)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(13,33,68,0.1)'; e.currentTarget.style.color = t700; e.currentTarget.style.background = '#f8faff' }}>
                {ind}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── CTA (dark navy) ── */}
      <section style={{ padding: mobile ? '3.5rem 1.25rem' : '5rem 1.75rem', background: navy, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(201,168,76,0.1) 0%, transparent 55%), radial-gradient(circle at 75% 50%, rgba(26,58,107,0.4) 0%, transparent 55%)' }} />
        <Reveal style={{ position: 'relative', zIndex: 10, maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 600, color: white, marginBottom: '1rem', lineHeight: 1.2 }}>
            Ready to Join Our Client Family?
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#B0BCCC', lineHeight: 1.75, marginBottom: '2.25rem' }}>
            Let's explore how Nixol can help your organization operate smarter, grow stronger, and achieve its strategic goals.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/booking" style={{
              padding: '0.9rem 2.25rem', background: gold, color: navy,
              fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none',
              borderRadius: '7px', transition: 'all 0.25s', display: 'inline-block',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#d4b86a'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(201,168,76,0.35)' }}
              onMouseLeave={e => { e.currentTarget.style.background = gold; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
              Book a Consultation
            </Link>
            <Link to="/contact" style={{
              padding: '0.9rem 2.25rem', border: '1px solid rgba(201,168,76,0.35)',
              color: '#D4DCE8', fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600,
              letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none',
              borderRadius: '7px', transition: 'all 0.25s', background: 'transparent', display: 'inline-block',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.color = white }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)'; e.currentTarget.style.color = '#D4DCE8' }}>
              Get In Touch
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  )
}