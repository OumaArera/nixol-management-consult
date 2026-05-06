import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// ── Colour tokens ─────────────────────────────────────────────────────────────
const gold  = '#C9A84C'
const navy  = '#0d2144'
const navy2 = '#1a3a6b'
const white = '#ffffff'

// on-light text
const t900 = '#0d2144'
const t700 = '#2d4a7a'
const t500 = '#4a6fa5'
const t400 = '#7a9bc4'

// on-dark text
const d300 = '#D4DCE8'
const d400 = '#B0BCCC'
const d500 = '#8B9BB4'

// ── Reveal hook ───────────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.disconnect() }
    }, { threshold })
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

// ── Data ──────────────────────────────────────────────────────────────────────
const STATS = [
  { value: '6+',   label: 'Service Verticals' },
  { value: '7',    label: 'Industries Served' },
  { value: '100%', label: 'Client-Centric Focus' },
  { value: '24h',  label: 'Response Commitment' },
]

const SERVICES_PREVIEW = [
  { icon: '🏛️', title: 'Management & Advisory',        desc: 'Executive decision support, governance, risk & internal controls, strategic planning and transformation.' },
  { icon: '📊', title: 'Financial Management',          desc: 'Budgeting, forecasting, cash flow optimization, financial modeling and performance dashboards.' },
  { icon: '🚀', title: 'Business Strategy & Growth',   desc: 'Strategic planning, market analysis, business model development and investment readiness advisory.' },
  { icon: '📋', title: 'Accounting & Compliance',       desc: 'Bookkeeping, financial statements, audit readiness, ERP optimization and regulatory compliance.' },
  { icon: '⚙️', title: 'Operations Optimization',      desc: 'Workflow redesign, process efficiency, automation advisory and continuous improvement frameworks.' },
  { icon: '🏥', title: 'Healthcare Consulting',         desc: 'Advisory for healthcare facilities on financial management, compliance, operational efficiency, and growth strategy.' },
]

const CLIENTS = [
  { name: 'Edmonds', logo: '/edmonds.png' },
  { name: 'Bothell',  logo: '/bothell.png' },
]

const INDUSTRIES = [
  'Education & Nonprofits', 'Oil and Gas', 'Professional Services',
  'Retail & Distribution', 'Manufacturing & Supply Chain',
  'Healthcare & Medical Facilities', 'Startups & Emerging Enterprises',
]

const VALUES = [
  { label: 'Professional Stewardship', desc: 'We protect client interests with confidentiality, respect, and responsibility.' },
  { label: 'Integrity',                desc: 'We act with honesty, transparency, and ethical discipline in every engagement.' },
  { label: 'Innovation',               desc: 'We apply insight, data, and modern tools to create smarter solutions.' },
  { label: 'Accountability',           desc: 'We take ownership of our work, our decisions, and the outcomes we deliver.' },
]

// ── Service Card (on light bg) ────────────────────────────────────────────────
function ServiceCard({ icon, title, desc }) {
  const ref = useReveal(0.1)
  return (
    <div ref={ref} style={{ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
      <div style={{
        padding: '1.75rem', background: white,
        border: '1px solid rgba(13,33,68,0.1)', borderRadius: '14px',
        height: '100%', transition: 'all 0.3s', cursor: 'default',
        boxShadow: '0 2px 12px rgba(13,33,68,0.06)',
      }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(13,33,68,0.12)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(13,33,68,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(13,33,68,0.06)' }}
      >
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{icon}</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600, color: t900, marginBottom: '0.65rem' }}>{title}</h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: t500, lineHeight: 1.7, margin: 0 }}>{desc}</p>
      </div>
    </div>
  )
}

// ── Badge helper ──────────────────────────────────────────────────────────────
const Badge = ({ text, dark = false }) => (
  <span style={{
    display: 'inline-block', padding: '0.35rem 1.1rem',
    border: `1px solid ${dark ? 'rgba(201,168,76,0.3)' : 'rgba(13,33,68,0.15)'}`,
    borderRadius: '999px',
    fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 600,
    letterSpacing: '0.25em', textTransform: 'uppercase',
    color: dark ? gold : t700,
    marginBottom: '1.25rem',
    background: dark ? 'rgba(201,168,76,0.08)' : 'rgba(13,33,68,0.04)',
  }}>
    {text}
  </span>
)

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main style={{ overflowX: 'hidden' }} className='top-0'>

      {/* ── HERO (dark — keeps drama) ────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8rem 1.75rem 5rem' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0a1628 0%, #0d2144 55%, #1a3a6b 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(90deg,#C9A84C 0,#C9A84C 1px,transparent 1px,transparent 72px),repeating-linear-gradient(0deg,#C9A84C 0,#C9A84C 1px,transparent 1px,transparent 72px)' }} />
        <div style={{ position: 'absolute', top: '15%', left: '20%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(26,58,107,0.5) 0%, transparent 70%)', borderRadius: '50%' }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ animation: 'var(--animate-fade-up)', marginBottom: '2rem' }}>
            <img src="/logo.png" alt="Nixol Management & Consult" style={{ height: '140px', width: 'auto', margin: '0 auto', filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.5))' }} />
          </div>
          <div style={{ animation: 'var(--animate-fade-up)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }} className="delay-100">
            <span style={{ padding: '0.4rem 1.25rem', border: '1px solid rgba(201,168,76,0.35)', borderRadius: '999px', fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: gold, background: 'rgba(201,168,76,0.06)' }}>
              Strategic Advisory · Financial Management · Business Growth
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem,7vw,5.5rem)', fontWeight: 700, color: '#fff', lineHeight: 1.05, marginBottom: '1.5rem', animation: 'var(--animate-fade-up)' }} className="delay-200">
            Built on{' '}
            <span style={{ background: 'linear-gradient(135deg,#D4B86A,#C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Expertise.</span>
            <br />
            Driven by{' '}
            <span style={{ background: 'linear-gradient(135deg,#D4DCE8,#ffffff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Integrity.</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: d400, lineHeight: 1.75, maxWidth: '640px', margin: '0 auto 2.5rem', animation: 'var(--animate-fade-up)' }} className="delay-300">
            Nixol empowers organizations with strategic financial intelligence, operational excellence, and tailored advisory solutions — delivering long-term value across industries.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', animation: 'var(--animate-fade-up)' }} className="delay-400">
            <Link to="/services" style={{ padding: '0.9rem 2.25rem', background: gold, color: navy, fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '7px', transition: 'all 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#d4b86a'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(201,168,76,0.35)' }}
              onMouseLeave={e => { e.currentTarget.style.background = gold; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
              Explore Our Services
            </Link>
            <Link to="/booking" style={{ padding: '0.9rem 2.25rem', border: '1px solid rgba(212,188,106,0.4)', color: d300, fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '7px', transition: 'all 0.25s', background: 'transparent' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(212,188,106,0.4)'; e.currentTarget.style.color = d300 }}>
              Book a Consultation
            </Link>
          </div>
        </div>
        {/* Scroll cue */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', opacity: 0.4 }}>
          <div style={{ width: '18px', height: '30px', border: '1px solid rgba(201,168,76,0.5)', borderRadius: '9px', display: 'flex', justifyContent: 'center', paddingTop: '5px' }}>
            <div style={{ width: '3px', height: '6px', background: gold, borderRadius: '2px', animation: 'bounce 2s infinite' }} />
          </div>
        </div>
      </section>

      {/* ── STATS (light) ──────────────────────────────────────────────── */}
      <section style={{ background: white, borderBottom: '1px solid rgba(13,33,68,0.08)', padding: '3rem 1.75rem' }}>
        <Reveal>
          <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', textAlign: 'center' }}>
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: navy, margin: '0 0 0.25rem' }}>{value}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: t500, margin: 0 }}>{label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── WELCOME (light) ────────────────────────────────────────────── */}
      <section style={{ padding: '6rem 1.75rem', background: '#f0f5ff' }}>
        <Reveal style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <Badge text="Welcome to Nixol" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 600, color: t900, lineHeight: 1.2, marginBottom: '1.5rem' }}>
            Your Strategic Partner for Clarity, Efficiency, and Growth
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: t700, lineHeight: 1.8, marginBottom: '1.25rem' }}>
            Welcome to Nixol Management & Consult — a firm built on the conviction that every organization, regardless of size or sector, deserves access to world-class advisory and financial expertise.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: t500, lineHeight: 1.8, marginBottom: '2rem' }}>
            We work alongside executives, boards, and leadership teams to bring financial clarity, operational discipline, and strategic direction to the decisions that matter most. Whether you are navigating growth, managing complexity, or preparing for your next milestone — we are here as a trusted partner, not just a consultant.
          </p>
          <blockquote style={{ margin: '0', padding: '1.5rem 2rem', background: white, borderLeft: `3px solid ${gold}`, borderRadius: '0 10px 10px 0', textAlign: 'left', boxShadow: '0 2px 16px rgba(13,33,68,0.06)' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontStyle: 'italic', color: navy2, margin: '0 0 0.5rem', lineHeight: 1.5 }}>
              "To empower organizations with strategic financial intelligence, operational excellence, and tailored advisory solutions that drive long-term value creation."
            </p>
            <cite style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: t500, fontStyle: 'normal', letterSpacing: '0.1em', textTransform: 'uppercase' }}>— Our Mission</cite>
          </blockquote>
        </Reveal>
      </section>

      {/* ── SERVICES (white) ───────────────────────────────────────────── */}
      <section style={{ padding: '5rem 1.75rem', background: white }}>
        <Reveal style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Badge text="What We Do" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 600, color: t900, marginBottom: '0.75rem' }}>Core Services</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: t500, maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
              Comprehensive solutions designed to improve financial clarity, streamline operations, and accelerate growth.
            </p>
          </div>
        </Reveal>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.25rem' }}>
          {SERVICES_PREVIEW.map(s => <ServiceCard key={s.title} {...s} />)}
        </div>
        <Reveal style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link to="/services" style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: navy, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'gap 0.2s, color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.gap = '0.85rem'; e.currentTarget.style.color = gold }}
            onMouseLeave={e => { e.currentTarget.style.gap = '0.5rem'; e.currentTarget.style.color = navy }}>
            View All Services →
          </Link>
        </Reveal>
      </section>

      {/* ── VALUES (dark navy) ──────────────────────────────────────────── */}
      <section style={{ padding: '5rem 1.75rem', background: navy }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <Reveal>
            <Badge text="Our Values" dark />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: 600, color: white, lineHeight: 1.2, marginBottom: '1.25rem' }}>
              Principles That Guide Every Engagement
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: d400, lineHeight: 1.8, marginBottom: '2rem' }}>
              Our values are not statements on a wall — they are the operating system behind every recommendation, report, and relationship we build.
            </p>
            <Link to="/about" style={{ padding: '0.75rem 1.75rem', border: `1px solid rgba(201,168,76,0.45)`, color: gold, fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '6px', transition: 'all 0.25s', display: 'inline-block', background: 'transparent' }}
              onMouseEnter={e => { e.currentTarget.style.background = gold; e.currentTarget.style.color = navy }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = gold }}>
              Our Story
            </Link>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {VALUES.map((v, i) => (
              <Reveal key={v.label} delay={i * 80}>
                <div style={{ display: 'flex', gap: '1.25rem', padding: '1.25rem 1.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'; e.currentTarget.style.transform = 'translateX(4px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: gold, flexShrink: 0, marginTop: '5px' }} />
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 600, color: white, marginBottom: '0.3rem' }}>{v.label}</h4>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: d500, lineHeight: 1.6, margin: 0 }}>{v.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES (light) ──────────────────────────────────────────── */}
      <section style={{ padding: '4rem 1.75rem', background: '#f0f5ff', borderBottom: '1px solid rgba(13,33,68,0.08)' }}>
        <Reveal style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: t500, marginBottom: '1.75rem' }}>
            Industries We Serve
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            {INDUSTRIES.map(ind => (
              <span key={ind} style={{ padding: '0.5rem 1.1rem', background: white, border: '1px solid rgba(13,33,68,0.12)', borderRadius: '999px', fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: t700, transition: 'all 0.2s', cursor: 'default', boxShadow: '0 1px 4px rgba(13,33,68,0.05)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.color = navy; e.currentTarget.style.background = 'rgba(201,168,76,0.06)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(13,33,68,0.12)'; e.currentTarget.style.color = t700; e.currentTarget.style.background = white }}>
                {ind}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── CLIENTS (white) ─────────────────────────────────────────────── */}
      <section style={{ padding: '5rem 1.75rem', background: white }}>
        <Reveal style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <Badge text="Trusted By" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 600, color: t900, marginBottom: '0.75rem' }}>
            Organizations That Trust Nixol
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: t500, maxWidth: '500px', margin: '0 auto 3rem', lineHeight: 1.7 }}>
            We are proud to work alongside organizations committed to operational excellence and long-term growth.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem' }}>
            {CLIENTS.map(({ name, logo }) => (
              <div key={name} style={{ padding: '1.5rem 2.5rem', background: '#f8faff', border: '1px solid rgba(13,33,68,0.1)', borderRadius: '14px', transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '180px', minHeight: '100px', boxShadow: '0 2px 10px rgba(13,33,68,0.06)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(13,33,68,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(13,33,68,0.1)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(13,33,68,0.06)' }}>
                <img src={logo} alt={name} style={{ maxHeight: '60px', maxWidth: '140px', width: 'auto', objectFit: 'contain' }}
                  onError={e => {
                    e.target.style.display = 'none'
                    e.target.parentElement.innerHTML = `<span style="font-family:Georgia,serif;font-size:1.4rem;font-weight:700;color:#0d2144;letter-spacing:0.05em">${name}</span>`
                  }} />
              </div>
            ))}
          </div>
          <Link to="/clients" style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: navy, textDecoration: 'none', borderBottom: `1px solid ${gold}`, paddingBottom: '2px', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = gold}
            onMouseLeave={e => e.currentTarget.style.color = navy}>
            View All Clients →
          </Link>
        </Reveal>
      </section>

      {/* ── CTA (dark navy) ─────────────────────────────────────────────── */}
      <section style={{ position: 'relative', padding: '6rem 1.75rem', overflow: 'hidden', background: navy }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(201,168,76,0.1) 0%, transparent 55%), radial-gradient(circle at 75% 50%, rgba(26,58,107,0.5) 0%, transparent 55%)' }} />
        <Reveal style={{ position: 'relative', zIndex: 10, maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 600, color: white, marginBottom: '1rem', lineHeight: 1.2 }}>
            Ready to Operate Smarter and Grow Stronger?
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: d400, lineHeight: 1.75, marginBottom: '2.5rem' }}>
            Every engagement starts with a conversation. Let's discuss where you are, where you want to be, and how Nixol can help you get there.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/booking" style={{ padding: '1rem 2.5rem', background: gold, color: navy, fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '7px', transition: 'all 0.25s', display: 'inline-block' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#d4b86a'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(201,168,76,0.35)' }}
              onMouseLeave={e => { e.currentTarget.style.background = gold; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
              Schedule a Consultation
            </Link>
            <Link to="/contact" style={{ padding: '1rem 2.5rem', border: '1px solid rgba(201,168,76,0.35)', color: d300, fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '7px', transition: 'all 0.25s', background: 'transparent', display: 'inline-block' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.color = white }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)'; e.currentTarget.style.color = d300 }}>
              Contact Us
            </Link>
          </div>
        </Reveal>
      </section>

      <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }`}</style>
    </main>
  )
}