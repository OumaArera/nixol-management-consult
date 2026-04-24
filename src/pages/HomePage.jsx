import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const gold   = '#C9A84C'
const navy   = '#0B1D3A'
const navy800 = '#112549'
const navy900 = '#0B1D3A'
const s300   = '#D4DCE8'
const s400   = '#B0BCCC'
const s500   = '#8B9BB4'
const s600 = '#6B7D98'

// ─── Reveal hook ─────────────────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
        obs.disconnect()
      }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function Reveal({ children, style = {}, delay = 0 }) {
  const ref = useReveal()
  return (
    <div ref={ref} style={{ opacity: 0, transform: 'translateY(28px)', transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`, ...style }}>
      {children}
    </div>
  )
}

// ─── Data ────────────────────────────────────────────────────────────────────

const STATS = [
  { value: '5+',   label: 'Service Verticals' },
  { value: '6',    label: 'Industries Served' },
  { value: '100%', label: 'Client-Centric Focus' },
  { value: '24h',  label: 'Response Commitment' },
]

const SERVICES_PREVIEW = [
  { icon: '🏛️', title: 'Management & Advisory',         desc: 'Executive decision support, governance, risk & internal controls, strategic planning and transformation.' },
  { icon: '📊', title: 'Financial Management',           desc: 'Budgeting, forecasting, cash flow optimization, financial modeling and performance dashboards.' },
  { icon: '🚀', title: 'Business Strategy & Growth',    desc: 'Strategic planning, market analysis, business model development and investment readiness advisory.' },
  { icon: '📋', title: 'Accounting & Compliance',        desc: 'Bookkeeping, financial statements, audit readiness, ERP optimization and regulatory compliance.' },
  { icon: '⚙️', title: 'Operations Optimization',       desc: 'Workflow redesign, process efficiency, automation advisory and continuous improvement frameworks.' },
]

const CLIENTS = [
  { name: 'Edmonds', logo: '/edmonds.png' },
  { name: 'Bothell',  logo: '/bothell.png' },
]

const INDUSTRIES = [
  'Education & Nonprofits', 'Oil and Gas', 'Professional Services',
  'Retail & Distribution', 'Manufacturing & Supply Chain', 'Startups & Emerging Enterprises',
]

const VALUES = [
  { label: 'Professional Stewardship', desc: 'We protect client interests with confidentiality, respect, and responsibility.' },
  { label: 'Integrity',                desc: 'We act with honesty, transparency, and ethical discipline in every engagement.' },
  { label: 'Innovation',               desc: 'We apply insight, data, and modern tools to create smarter solutions.' },
  { label: 'Accountability',           desc: 'We take ownership of our work, our decisions, and the outcomes we deliver.' },
]

// ─── Card Components ──────────────────────────────────────────────────────────

function ServiceCard({ icon, title, desc }) {
  const ref = useReveal(0.1)
  return (
    <div ref={ref} style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
      <div
        style={{ padding: '2rem', background: '#0B1D3A', border: '1px solid rgba(26,58,107,0.8)', borderRadius: '14px', height: '100%', transition: 'all 0.3s', cursor: 'default' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.4)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,58,107,0.8)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
      >
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{icon}</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: '#fff', marginBottom: '0.75rem' }}>{title}</h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: s500, lineHeight: 1.7 }}>{desc}</p>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main style={{ overflowX: 'hidden' }}>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8rem 1.75rem 5rem' }}>
        {/* Background */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #04101F 0%, #0B1D3A 50%, #112549 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(90deg,#C9A84C 0,#C9A84C 1px,transparent 1px,transparent 72px),repeating-linear-gradient(0deg,#C9A84C 0,#C9A84C 1px,transparent 1px,transparent 72px)' }} />
        <div style={{ position: 'absolute', top: '15%', left: '20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '15%', right: '15%', width: '320px', height: '320px', background: 'radial-gradient(circle, rgba(26,58,107,0.3) 0%, transparent 70%)', borderRadius: '50%' }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          {/* Logo */}
          <div style={{ animation: 'var(--animate-fade-up)', marginBottom: '2rem' }}>
            <img src="/logo.png" alt="Nixol Management & Consult" style={{ height: '140px', width: 'auto', margin: '0 auto', filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.5))' }} />
          </div>

          {/* Badge */}
          <div style={{ animation: 'var(--animate-fade-up)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }} className="delay-100">
            <span style={{ padding: '0.4rem 1.25rem', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '999px', fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: gold }}>
              Strategic Advisory · Financial Management · Business Growth
            </span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 700, color: '#fff', lineHeight: 1.05, marginBottom: '1.5rem', animation: 'var(--animate-fade-up)' }} className="delay-200">
            Built on{' '}
            <span style={{ background: 'linear-gradient(135deg, #D4B86A, #C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Expertise.
            </span>
            <br />
            Driven by{' '}
            <span style={{ background: 'linear-gradient(135deg, #D4DCE8, #ffffff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Integrity.
            </span>
          </h1>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: s400, lineHeight: 1.75, maxWidth: '640px', margin: '0 auto 2.5rem', animation: 'var(--animate-fade-up)' }} className="delay-300">
            Nixol empowers organizations with strategic financial intelligence, operational excellence, and tailored advisory solutions — delivering long-term value across industries.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', animation: 'var(--animate-fade-up)' }} className="delay-400">
            <Link to="/services" style={{ padding: '0.9rem 2.25rem', background: gold, color: navy, fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '7px', transition: 'all 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#d4b86a'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(201,168,76,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.background = gold; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
              Explore Our Services
            </Link>
            <Link to="/booking" style={{ padding: '0.9rem 2.25rem', border: '1px solid rgba(212,188,106,0.35)', color: s300, fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '7px', transition: 'all 0.25s', background: 'transparent' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(212,188,106,0.35)'; e.currentTarget.style.color = s300; e.currentTarget.style.transform = 'none' }}>
              Book a Consultation
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', opacity: 0.4, animation: 'bounce 2s infinite' }}>
          <div style={{ width: '18px', height: '30px', border: '1px solid rgba(201,168,76,0.4)', borderRadius: '9px', display: 'flex', justifyContent: 'center', paddingTop: '5px' }}>
            <div style={{ width: '3px', height: '6px', background: gold, borderRadius: '2px', animation: 'bounce 2s infinite' }} />
          </div>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────────────────────── */}
      <section style={{ background: '#112549', borderTop: '1px solid rgba(201,168,76,0.1)', borderBottom: '1px solid rgba(201,168,76,0.1)', padding: '3rem 1.75rem' }}>
        <Reveal>
          <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', textAlign: 'center' }}>
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: gold, margin: '0 0 0.25rem' }}>{value}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: s500, margin: 0 }}>{label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Welcome note ────────────────────────────────────────────────── */}
      <section style={{ padding: '6rem 1.75rem', background: 'var(--color-navy-950)' }}>
        <Reveal style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ display: 'inline-block', padding: '0.35rem 1.1rem', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '999px', fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: gold, marginBottom: '1.5rem' }}>
            Welcome to Nixol
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 600, color: '#fff', lineHeight: 1.2, marginBottom: '1.5rem' }}>
            Your Strategic Partner for Clarity, Efficiency, and Growth
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: s400, lineHeight: 1.8, marginBottom: '1.25rem' }}>
            Welcome to Nixol Management & Consult — a firm built on the conviction that every organization, regardless of size or sector, deserves access to world-class advisory and financial expertise.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: s500, lineHeight: 1.8, marginBottom: '2rem' }}>
            We work alongside executives, boards, and leadership teams to bring financial clarity, operational discipline, and strategic direction to the decisions that matter most. Whether you are navigating growth, managing complexity, or preparing for your next milestone — we are here as a trusted partner, not just a consultant.
          </p>
          <blockquote style={{ margin: '0', padding: '1.5rem 2rem', background: 'rgba(201,168,76,0.05)', borderLeft: `3px solid ${gold}`, borderRadius: '0 10px 10px 0', textAlign: 'left' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontStyle: 'italic', color: gold, margin: '0 0 0.5rem', lineHeight: 1.4 }}>
              "To empower organizations with strategic financial intelligence, operational excellence, and tailored advisory solutions that drive long-term value creation."
            </p>
            <cite style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: s500, fontStyle: 'normal', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              — Our Mission
            </cite>
          </blockquote>
        </Reveal>
      </section>

      {/* ── Services ────────────────────────────────────────────────────── */}
      <section style={{ padding: '5rem 1.75rem', background: '#04101F' }}>
        <Reveal style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ display: 'inline-block', padding: '0.35rem 1.1rem', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '999px', fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: gold, marginBottom: '1rem' }}>
              What We Do
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 600, color: '#fff', marginBottom: '0.75rem' }}>Core Services</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: s500, maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
              Comprehensive solutions designed to improve financial clarity, streamline operations, and accelerate growth.
            </p>
          </div>
        </Reveal>

        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {SERVICES_PREVIEW.map((s, i) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>

        <Reveal style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link to="/services" style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: gold, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'gap 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.gap = '0.85rem'}
            onMouseLeave={e => e.currentTarget.style.gap = '0.5rem'}>
            View All Services →
          </Link>
        </Reveal>
      </section>

      {/* ── Values ──────────────────────────────────────────────────────── */}
      <section style={{ padding: '5rem 1.75rem', background: '#0B1D3A' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <Reveal>
            <span style={{ display: 'inline-block', padding: '0.35rem 1.1rem', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '999px', fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: gold, marginBottom: '1.25rem' }}>
              Our Values
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: 600, color: '#fff', lineHeight: 1.2, marginBottom: '1.25rem' }}>
              Principles That Guide Every Engagement
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: s400, lineHeight: 1.8, marginBottom: '2rem' }}>
              Our values are not statements on a wall — they are the operating system behind every recommendation, report, and relationship we build.
            </p>
            <Link to="/about" style={{ padding: '0.75rem 1.75rem', border: `1px solid rgba(201,168,76,0.4)`, color: gold, fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '6px', transition: 'all 0.25s', display: 'inline-block' }}
              onMouseEnter={e => { e.currentTarget.style.background = gold; e.currentTarget.style.color = navy }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = gold }}>
              Our Story
            </Link>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {VALUES.map((v, i) => (
              <Reveal key={v.label} delay={i * 80}>
                <div style={{ display: 'flex', gap: '1.25rem', padding: '1.25rem 1.5rem', background: '#04101F', border: '1px solid rgba(26,58,107,0.7)', borderRadius: '12px', transition: 'border-color 0.3s, transform 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)'; e.currentTarget.style.transform = 'translateX(4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,58,107,0.7)'; e.currentTarget.style.transform = 'none' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: gold, flexShrink: 0, marginTop: '5px' }} />
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 600, color: '#fff', marginBottom: '0.3rem' }}>{v.label}</h4>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: s500, lineHeight: 1.6, margin: 0 }}>{v.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ───────────────────────────────────────────────────── */}
      <section style={{ padding: '4rem 1.75rem', background: 'var(--color-navy-950)', borderTop: '1px solid rgba(26,58,107,0.5)' }}>
        <Reveal style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: s500, marginBottom: '1.75rem' }}>
            Industries We Serve
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            {INDUSTRIES.map(ind => (
              <span key={ind} style={{ padding: '0.5rem 1.1rem', background: '#112549', border: '1px solid rgba(26,58,107,0.8)', borderRadius: '999px', fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: s400, transition: 'all 0.2s', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'; e.currentTarget.style.color = gold }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,58,107,0.8)'; e.currentTarget.style.color = s400 }}>
                {ind}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Clients ─────────────────────────────────────────────────────── */}
      <section style={{ padding: '5rem 1.75rem', background: '#0B1D3A' }}>
        <Reveal style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ display: 'inline-block', padding: '0.35rem 1.1rem', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '999px', fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: gold, marginBottom: '1rem' }}>
            Trusted By
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 600, color: '#fff', marginBottom: '0.75rem' }}>
            Organizations That Trust Nixol
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: s500, maxWidth: '500px', margin: '0 auto 3rem', lineHeight: 1.7 }}>
            We are proud to work alongside organizations committed to operational excellence and long-term growth.
          </p>

          {/* Client logos */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', alignItems: 'center', marginBottom: '3rem' }}>
            {CLIENTS.map(({ name, logo }) => (
              <div key={name} style={{ padding: '1.5rem 2.5rem', background: '#04101F', border: '1px solid rgba(26,58,107,0.7)', borderRadius: '14px', transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '180px', minHeight: '100px' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.35)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,58,107,0.7)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
                <img src={logo} alt={name} style={{ maxHeight: '60px', maxWidth: '140px', width: 'auto', objectFit: 'contain', filter: 'brightness(0.9) grayscale(0.2)' }}
                  onError={e => {
                    e.target.style.display = 'none'
                    e.target.parentElement.innerHTML = `<span style="font-family:var(--font-display);font-size:1.4rem;font-weight:600;color:#D4DCE8;letter-spacing:0.05em">${name}</span>`
                  }} />
              </div>
            ))}
          </div>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: s600, fontStyle: 'italic' }}>
            Join the growing list of organizations partnering with Nixol for strategic clarity and measurable results.
          </p>
        </Reveal>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', padding: '6rem 1.75rem', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0B1D3A, #112549, #0B1D3A)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(201,168,76,0.08) 0%, transparent 55%), radial-gradient(circle at 75% 50%, rgba(26,58,107,0.3) 0%, transparent 55%)' }} />
        <Reveal style={{ position: 'relative', zIndex: 10, maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 600, color: '#fff', marginBottom: '1rem', lineHeight: 1.2 }}>
            Ready to Operate Smarter and Grow Stronger?
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: s400, lineHeight: 1.75, marginBottom: '2.5rem' }}>
            Every engagement starts with a conversation. Let's discuss where you are, where you want to be, and how Nixol can help you get there.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/booking" style={{ padding: '1rem 2.5rem', background: gold, color: navy, fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '7px', transition: 'all 0.25s', display: 'inline-block' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#d4b86a'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(201,168,76,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.background = gold; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
              Schedule a Consultation
            </Link>
            <Link to="/contact" style={{ padding: '1rem 2.5rem', border: '1px solid rgba(201,168,76,0.3)', color: s300, fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '7px', transition: 'all 0.25s', background: 'transparent', display: 'inline-block' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'; e.currentTarget.style.color = s300 }}>
              Contact Us
            </Link>
          </div>
        </Reveal>
      </section>

      <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }`}</style>
    </main>
  )
}