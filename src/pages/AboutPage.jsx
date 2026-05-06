import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const gold  = '#C9A84C'
const navy  = '#0d2144'
const navy2 = '#1a3a6b'
const white = '#ffffff'
const t700  = '#2d4a7a'
const t500  = '#4a6fa5'
const t400  = '#7a9bc4'

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

// ── Team — includes David as Healthcare Partner ────────────────────────────────
const TEAM = [
  { name: 'Kwaku Duah Junior',      role: 'Chief Executive Officer',   img: '/kwaku.png',    initials: 'KD' },
  { name: 'Elizabeth Henry Awudi',  role: 'Managing Partner',           img: '/elizabeth.png', initials: 'EA', suffix: 'PharmD' },
  { name: 'Dr. Eric Nsiah Gyabaah', role: 'Managing Partner',           img: '/eric.png',     initials: 'EN' },
  { name: 'Gabriel Acquah',         role: 'Director of Operations',     img: '/gabriel.png',  initials: 'GA' },
  { name: 'Owusu Osei',             role: 'Director of Projects',       img: '/owusu.png',    initials: 'OO' },
]

const HEALTHCARE_PARTNER = {
  name: 'David Boamah-Oduro',
  role: 'Healthcare Consulting Partner',
  img: '/david.jpeg',
  initials: 'DV',
  phone: '+233 24 909 9740',
  note: 'Credentials & full profile coming soon.',
}

const PILLARS = [
  { icon: '🤝', label: 'Professional Stewardship', desc: 'We protect client interests with confidentiality, respect, and responsibility.' },
  { icon: '⚖️', label: 'Integrity',                desc: 'We act with honesty, transparency, and ethical discipline in every engagement.' },
  { icon: '💡', label: 'Innovation',               desc: 'We apply insight, data, and modern tools to create smarter solutions.' },
  { icon: '🎯', label: 'Accountability',           desc: 'We take ownership of our work, decisions, and the outcomes we deliver.' },
  { icon: '🌐', label: 'Client Partnership',       desc: "We collaborate closely and tailor our support to each client's unique needs." },
]

const APPROACH = [
  { label: 'Data-driven insights',      desc: 'that guide smarter decisions' },
  { label: 'Transparent communication', desc: 'that builds lasting trust' },
  { label: 'Tailored solutions',        desc: "that fit each organization's unique needs" },
  { label: 'Measurable outcomes',       desc: 'that strengthen financial and operational performance' },
]

const WHY = [
  'Strong financial and analytical expertise',
  'Proven ability to improve efficiency and profitability',
  'Cross-functional experience in finance, audit, and operations',
  'Modern tools and methodologies that enhance decision-making',
  'Specialist healthcare consulting in partnership with David',
  'A commitment to integrity, excellence, and long-term partnership',
]

const Badge = ({ text, dark = false }) => (
  <span style={{
    display: 'inline-block', padding: '0.35rem 1.1rem',
    border: `1px solid ${dark ? 'rgba(201,168,76,0.3)' : 'rgba(13,33,68,0.15)'}`,
    borderRadius: '999px', fontFamily: 'var(--font-body)', fontSize: '0.62rem',
    fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase',
    color: dark ? gold : t700, marginBottom: '1.25rem',
    background: dark ? 'rgba(201,168,76,0.06)' : 'rgba(13,33,68,0.04)',
  }}>
    {text}
  </span>
)

function TeamCard({ name, role, img, initials, suffix, phone, note, delay, highlight }) {
  const ref = useReveal()
  return (
    <div ref={ref} style={{ opacity: 0, transform: 'translateY(24px)', transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      <div style={{
        background: white,
        border: `1px solid ${highlight ? 'rgba(201,168,76,0.4)' : 'rgba(13,33,68,0.1)'}`,
        borderRadius: '16px', overflow: 'hidden', transition: 'all 0.3s',
        boxShadow: highlight ? '0 4px 20px rgba(201,168,76,0.1)' : '0 2px 10px rgba(13,33,68,0.06)',
      }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(13,33,68,0.12)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = highlight ? 'rgba(201,168,76,0.4)' : 'rgba(13,33,68,0.1)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = highlight ? '0 4px 20px rgba(201,168,76,0.1)' : '0 2px 10px rgba(13,33,68,0.06)' }}
      >
        <div style={{ height: '190px', background: 'linear-gradient(135deg, #eef2fb, #dde6f5)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
          {highlight && (
            <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', padding: '0.2rem 0.65rem', background: gold, color: navy, borderRadius: '999px', fontFamily: 'var(--font-body)', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Partner
            </div>
          )}
          <img src={img} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
            onError={e => {
              e.target.style.display = 'none'
              const fb = document.createElement('div')
              fb.style.cssText = `width:80px;height:80px;border-radius:50%;background:rgba(13,33,68,0.08);border:2px solid ${gold};display:flex;align-items:center;justify-content:center;font-family:Georgia,serif;font-size:1.5rem;font-weight:600;color:${gold};`
              fb.textContent = initials
              e.target.parentElement.appendChild(fb)
            }} />
        </div>
        <div style={{ padding: '1.25rem 1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 600, color: navy, marginBottom: '0.2rem', lineHeight: 1.3 }}>
            {name}{suffix ? `, ${suffix}` : ''}
          </h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.63rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: gold, margin: 0 }}>
            {role}
          </p>
          {phone && (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: t500, margin: '0.5rem 0 0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>📞</span> {phone}
            </p>
          )}
          {note && (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: t400, margin: '0.4rem 0 0', fontStyle: 'italic' }}>{note}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AboutPage() {
  const mobile = useMobile()

  return (
    <main style={{ paddingTop: '4rem', minHeight: '100vh', background: '#f8faff' }}>

      {/* ── Header (dark) ── */}
      <section style={{ position: 'relative', padding: mobile ? '3rem 1.25rem 2rem' : '4rem 1.75rem 3rem', textAlign: 'center', overflow: 'hidden', background: '#0d2144' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 50% 70%, rgba(201,168,76,0.07) 0%, transparent 65%)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto' }}>
          <Badge text="Our Story" dark />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,5vw,3.8rem)', fontWeight: 700, color: '#fff', marginBottom: '1rem', lineHeight: 1.1 }}>
            About Nixol
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: '#B0BCCC', lineHeight: 1.75 }}>
            A strategic advisory and financial management firm helping organizations strengthen performance, improve operational efficiency, and make smarter business decisions.
          </p>
        </div>
      </section>

      {/* ── Who We Are (light) ── */}
      <section style={{ padding: mobile ? '2.5rem 1.25rem' : '4.5rem 1.75rem', background: white }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: mobile ? '2rem' : '4rem', alignItems: 'center' }}>
          <Reveal>
            <Badge text="Who We Are" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.7rem,3vw,2.6rem)', fontWeight: 600, color: navy, lineHeight: 1.2, marginBottom: '1.25rem' }}>
              Expertise. Integrity. Results.
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: t700, lineHeight: 1.8, marginBottom: '1rem' }}>
              Nixol Management & Consult is a strategic advisory and financial management firm helping organizations strengthen performance, improve operational efficiency, and make smarter business decisions.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: t500, lineHeight: 1.8 }}>
              The firm blends deep financial and managerial expertise with practical business insight to deliver solutions that create measurable, long-term value — including specialist healthcare consulting through our partnership with David.
            </p>
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              { label: 'Our Mission', text: 'To empower organizations with strategic financial intelligence, operational excellence, and tailored advisory solutions that drive long-term value creation.' },
              { label: 'Our Vision',  text: 'To become a trusted partner for businesses seeking clarity, efficiency, and strategic direction in an increasingly complex operating environment.' },
            ].map(({ label, text }, i) => (
              <Reveal key={label} delay={i * 120}>
                <div style={{ padding: '1.5rem', background: '#f0f5ff', border: '1px solid rgba(13,33,68,0.08)', borderLeft: `3px solid ${gold}`, borderRadius: '0 12px 12px 0' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: gold, marginBottom: '0.6rem' }}>{label}</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontStyle: 'italic', color: navy, lineHeight: 1.6, margin: 0 }}>{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Values (light bg) ── */}
      <section style={{ padding: mobile ? '2.5rem 1.25rem' : '5rem 1.75rem', background: '#f0f5ff' }}>
        <Reveal style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <Badge text="Core Values" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.7rem,3.5vw,2.6rem)', fontWeight: 600, color: navy }}>What Drives Us</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(5, 1fr)', gap: '1rem' }}>
            {PILLARS.map(({ icon, label, desc }, i) => (
              <Reveal key={label} delay={i * 70}>
                <div style={{ padding: '1.5rem 1.25rem', background: white, border: '1px solid rgba(13,33,68,0.08)', borderRadius: '14px', textAlign: 'center', transition: 'all 0.3s', height: '100%', boxShadow: '0 2px 8px rgba(13,33,68,0.05)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(13,33,68,0.1)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(13,33,68,0.08)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(13,33,68,0.05)' }}>
                  <div style={{ fontSize: '1.75rem', marginBottom: '0.85rem' }}>{icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, color: navy, marginBottom: '0.5rem' }}>{label}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: t500, lineHeight: 1.6, margin: 0 }}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Nixol Leadership (white) ── */}
      <section style={{ padding: mobile ? '2.5rem 1.25rem' : '5rem 1.75rem', background: white }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <Badge text="Leadership" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.7rem,3.5vw,2.6rem)', fontWeight: 600, color: navy, marginBottom: '0.75rem' }}>
              The Nixol Team
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: t500, maxWidth: '550px', margin: '0 auto', lineHeight: 1.7 }}>
              Experienced finance and business advisory professionals with a track record of delivering strategic insights across diverse industries.
            </p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(5, 1fr)', gap: mobile ? '1rem' : '1.5rem' }}>
            {TEAM.map((member, i) => (
              <TeamCard key={member.name} {...member} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Healthcare Partner (gold accent section) ── */}
      <section style={{ padding: mobile ? '2.5rem 1.25rem' : '4rem 1.75rem', background: 'linear-gradient(135deg, #f0f5ff, #e8f0fa)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ display: 'inline-block', padding: '0.35rem 1.1rem', border: '1px solid rgba(201,168,76,0.4)', borderRadius: '999px', fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: gold, marginBottom: '1rem', background: 'rgba(201,168,76,0.06)' }}>
              🏥 Healthcare Partnership
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.7rem,3.5vw,2.4rem)', fontWeight: 600, color: navy, marginBottom: '0.75rem' }}>
              Expanding Into Healthcare Consulting
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: t700, maxWidth: '600px', margin: '0 auto', lineHeight: 1.75 }}>
              Nixol has partnered with David — a specialist in healthcare facility consulting — to bring focused advisory services to clinics, hospitals, and medical organizations. Together, we combine financial management expertise with deep sector knowledge to improve performance and patient-centred operations.
            </p>
          </Reveal>

          <div style={{ maxWidth: '340px', margin: '0 auto' }}>
            <TeamCard
              name={HEALTHCARE_PARTNER.name}
              role={HEALTHCARE_PARTNER.role}
              img={HEALTHCARE_PARTNER.img}
              initials={HEALTHCARE_PARTNER.initials}
              phone={HEALTHCARE_PARTNER.phone}
              note={HEALTHCARE_PARTNER.note}
              delay={0}
              highlight={true}
            />
          </div>

          <Reveal style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/services#healthcare" style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: navy, textDecoration: 'none', borderBottom: `1px solid ${gold}`, paddingBottom: '2px', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = gold}
              onMouseLeave={e => e.currentTarget.style.color = navy}>
              View Healthcare Services →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Our Approach (dark) ── */}
      <section style={{ padding: mobile ? '2.5rem 1.25rem' : '5rem 1.75rem', background: navy }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: mobile ? '2rem' : '4rem', alignItems: 'start' }}>
          <Reveal>
            <Badge text="Our Approach" dark />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.7rem,3vw,2.4rem)', fontWeight: 600, color: white, lineHeight: 1.2, marginBottom: '1rem' }}>
              A Partnership Mindset, Not a Vendor Relationship
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: '#B0BCCC', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Nixol operates with a partnership mindset — working closely with clients to understand their goals, challenges, and opportunities. Every engagement is grounded in:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {APPROACH.map(({ label, desc }) => (
                <div key={label} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: gold, flexShrink: 0, marginTop: '7px' }} />
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#B0BCCC', margin: 0, lineHeight: 1.6 }}>
                    <strong style={{ color: white, fontWeight: 600 }}>{label}</strong>{' '}{desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={mobile ? 0 : 150}>
            <div style={{ padding: mobile ? '1.75rem' : '2.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: '20px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 600, color: white, marginBottom: '1.25rem' }}>
                Why Organizations Choose Nixol
              </h3>
              {WHY.map(w => (
                <div key={w} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
                  <span style={{ color: gold, fontSize: '0.85rem', flexShrink: 0, marginTop: '2px' }}>✓</span>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#B0BCCC', margin: 0, lineHeight: 1.6 }}>{w}</p>
                </div>
              ))}
              <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(201,168,76,0.15)' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: '#8B9BB4', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Registered EIN</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: gold, margin: 0, letterSpacing: '0.05em' }}>42-1824156</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA (light) ── */}
      <section style={{ padding: mobile ? '3rem 1.25rem' : '4rem 1.75rem', textAlign: 'center', background: '#f0f5ff', borderTop: '1px solid rgba(13,33,68,0.08)' }}>
        <Reveal>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,3vw,2.4rem)', fontWeight: 600, color: navy, marginBottom: '0.85rem' }}>
            Ready to Work With Us?
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: t500, marginBottom: '2rem', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto 2rem' }}>
            Nixol is committed to helping organizations operate smarter, grow stronger, and achieve their strategic goals.
          </p>
          <Link to="/booking"
            style={{ display: 'inline-block', padding: '0.9rem 2.25rem', background: navy, color: white, fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '7px', transition: 'all 0.25s' }}
            onMouseEnter={e => { e.currentTarget.style.background = gold; e.currentTarget.style.color = navy; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = navy; e.currentTarget.style.color = white; e.currentTarget.style.transform = 'none' }}>
            Book a Consultation
          </Link>
        </Reveal>
      </section>
    </main>
  )
}