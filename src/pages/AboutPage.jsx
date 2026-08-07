import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('revealed'); obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return ref
}

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`reveal-block ${className}`} style={{ '--delay': `${delay}ms` }}>
      {children}
    </div>
  )
}

function useMobile() {
  const [mobile, setMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false)
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return mobile
}

const TEAM = [
  { name: 'Kwaku Duah Junior',      role: 'Chief Executive Officer',   img: '/kwaku.png',    initials: 'KD' },
  { name: 'Elizabeth Henry Awudi',  role: 'Managing Partner',           img: '/elizabeth.png', initials: 'EA', suffix: 'PharmD' },
  { name: 'Dr. Eric Nsiah Gyabaah', role: 'Managing Partner',           img: '/nsiah.png',     initials: 'EN' },
  { name: 'David Obuya',             role: 'Managing Partner',       img: '/DavidOmond.png',    initials: 'OO' },
  { name: 'Gabriel Acquah',         role: 'Director of Operations',     img: '/gabriel.png',  initials: 'GA' },
  { name: 'Owusu Osei',             role: 'Director of Projects',       img: '/owusu.png',    initials: 'OO' },
]


const CEO_MESSAGE = [
  "Welcome to Nixol Management & Consult — and thank you for taking the time to get to know us.",
  "Every organization we meet arrives with a story: a season of growth that outpaced its systems, a set of numbers that no longer tells a clear story, or a bold idea waiting for the right structure to carry it. Our work begins with listening to that story before we ever recommend a solution.",
  "We built Nixol on a simple conviction — that good advice is personal. It comes from people who take the time to understand your business, who speak plainly, and who stay long after the report is delivered. Whether you are a growing enterprise, an established institution, or a healthcare facility navigating change, you will find the same commitment here: clarity, honesty, and a genuine investment in your success.",
  "Our doors are open, and our team is ready. Wherever you are on your journey, we would be glad to walk part of it with you.",
]

const PILLARS = [
  { icon: '🤝', label: 'Professional Stewardship', desc: 'We protect client interests with confidentiality, respect, and responsibility.' },
  { icon: '⚖️', label: 'Integrity',                desc: 'We act with honesty, transparency, and ethical discipline in every engagement.' },
  { icon: '💡', label: 'Innovation',               desc: 'We apply insight, data, and modern tools to create smarter solutions.' },
  { icon: '🎯', label: 'Accountability',            desc: 'We take ownership of our work, decisions, and the outcomes we deliver.' },
  { icon: '🌐', label: 'Client Partnership',        desc: "We collaborate closely and tailor our support to each client's unique needs." },
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

function TeamCard({ name, role, img, initials, suffix, phone, note, delay, highlight }) {
  const ref = useReveal()
  return (
    <div ref={ref} className="reveal-block" style={{ '--delay': `${delay}ms` }}>
      <div className={`nx-team-card ${highlight ? 'nx-team-card--highlight' : ''}`}>
        <div className="nx-team-img-wrap">
          {highlight && <span className="nx-partner-badge">Partner</span>}
          <img src={img} alt={name}
            onError={e => {
              e.target.style.display = 'none'
              const fb = document.createElement('div')
              fb.className = 'nx-team-initials'
              fb.textContent = initials
              e.target.parentElement.appendChild(fb)
            }} />
        </div>
        <div className="nx-team-body">
          <h3 className="nx-team-name">{name}{suffix ? `, ${suffix}` : ''}</h3>
          <p className="nx-team-role">{role}</p>
          {phone && <p className="nx-team-phone">📞 {phone}</p>}
          {note  && <p className="nx-team-note">{note}</p>}
        </div>
      </div>
    </div>
  )
}

export default function AboutPage() {
  const mobile = useMobile()

  return (
    <main style={{ paddingTop: '4rem', minHeight: '100vh', background: '#f9fafb' }}>
      <style>{`
        .reveal-block { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease var(--delay,0ms), transform 0.7s ease var(--delay,0ms); }
        .reveal-block.revealed { opacity: 1; transform: translateY(0); }

        /* hero */
        .nx-about-hero { position: relative; padding: ${mobile ? '3rem 1.25rem 2rem' : '4rem 1.75rem 3rem'}; text-align: center; overflow: hidden; background: linear-gradient(135deg,#1e3a8a 0%,#1e40af 100%); }
        .nx-about-hero-glow { position: absolute; inset: 0; background-image: radial-gradient(circle at 50% 70%, rgba(249,115,22,0.08) 0%, transparent 65%); }
        .nx-about-hero-inner { position: relative; z-index: 1; max-width: 680px; margin: 0 auto; }
        .nx-badge { display: inline-block; padding: 0.35rem 1.1rem; border: 1px solid rgba(249,115,22,0.4); border-radius: 999px; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: #fdba74; margin-bottom: 1.25rem; background: rgba(249,115,22,0.08); }
        .nx-badge--light { border-color: rgba(30,64,175,0.2); color: #1e40af; background: rgba(30,64,175,0.06); }
        .nx-about-hero h1 { font-size: clamp(2rem,5vw,3.6rem); font-weight: 800; color: #fff; margin-bottom: 1rem; line-height: 1.1; }
        .nx-about-hero p  { font-size: 0.92rem; color: #bfdbfe; line-height: 1.75; }

        /* who we are */
        .nx-who { padding: ${mobile ? '2.5rem 1.25rem' : '4.5rem 1.75rem'}; background: #fff; }
        .nx-who-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: ${mobile ? '1fr' : '1fr 1fr'}; gap: ${mobile ? '2rem' : '4rem'}; align-items: center; }
        .nx-who h2 { font-size: clamp(1.7rem,3vw,2.4rem); font-weight: 800; color: #1e3a8a; line-height: 1.2; margin-bottom: 1.25rem; }
        .nx-who p  { font-size: 0.88rem; color: #374151; line-height: 1.8; margin-bottom: 1rem; }
        .nx-mv-card { padding: 1.5rem; background: #f3f4f6; border-left: 4px solid #f97316; border-radius: 0 12px 12px 0; margin-bottom: 1.25rem; }
        .nx-mv-label { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #f97316; margin-bottom: 0.6rem; }
        .nx-mv-text  { font-size: 1rem; font-style: italic; color: #1e3a8a; line-height: 1.6; margin: 0; }

        /* ceo message */
        .nx-ceo { position: relative; padding: ${mobile ? '2.75rem 1.25rem' : '5rem 1.75rem'}; background: linear-gradient(135deg,#fffbf5 0%,#fff7ed 55%,#eff6ff 100%); overflow: hidden; }
        .nx-ceo::before { content: ''; position: absolute; top: -120px; right: -120px; width: 340px; height: 340px; border-radius: 50%; background: radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%); }
        .nx-ceo-inner { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: ${mobile ? '1fr' : '320px 1fr'}; gap: ${mobile ? '2rem' : '3.5rem'}; align-items: ${mobile ? 'stretch' : 'start'}; }

        .nx-ceo-portrait { background: #fff; border: 1px solid rgba(30,64,175,0.1); border-radius: 20px; overflow: hidden; box-shadow: 0 12px 36px rgba(30,58,138,0.1); ${mobile ? 'max-width: 300px; margin: 0 auto;' : 'position: sticky; top: 6rem;'} }
        .nx-ceo-photo { position: relative; height: ${mobile ? '260px' : '320px'}; background: linear-gradient(135deg,#eff6ff,#dbeafe); display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .nx-ceo-photo img { width: 100%; height: 100%; object-fit: cover; object-position: top center; }
        .nx-ceo-photo-badge { position: absolute; bottom: 0; left: 0; right: 0; padding: 1.75rem 1.25rem 0.9rem; background: linear-gradient(to top, rgba(30,58,138,0.85), transparent); }
        .nx-ceo-photo-badge span { font-size: 0.55rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #fdba74; }
        .nx-ceo-portrait-body { padding: 1.25rem 1.5rem 1.5rem; text-align: center; }
        .nx-ceo-portrait-body h3 { font-size: 1.15rem; font-weight: 700; color: #1e3a8a; margin-bottom: 0.25rem; }
        .nx-ceo-portrait-body p { font-size: 0.63rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #f97316; margin: 0; }

        .nx-ceo-letter { position: relative; }
        .nx-ceo-quote { position: absolute; top: ${mobile ? '-1rem' : '-2.25rem'}; right: 0; font-size: ${mobile ? '6rem' : '9rem'}; line-height: 1; font-weight: 800; color: rgba(249,115,22,0.13); pointer-events: none; user-select: none; }
        .nx-ceo-letter-inner { position: relative; z-index: 1; }
        .nx-ceo-letter h2 { font-size: clamp(1.7rem,3vw,2.4rem); font-weight: 800; color: #1e3a8a; line-height: 1.2; margin-bottom: 1.5rem; }
        .nx-ceo-greeting { font-size: ${mobile ? '1.05rem' : '1.25rem'}; font-weight: 700; color: #1e40af; margin-bottom: 1rem; }
        .nx-ceo-letter p.body { font-size: 0.9rem; color: #374151; line-height: 1.9; margin-bottom: 1.1rem; }
        .nx-ceo-letter p.body:first-of-type { font-size: 1rem; color: #1f2937; }
        .nx-ceo-sign { margin-top: 1.75rem; padding-top: 1.5rem; border-top: 1px solid rgba(30,64,175,0.12); }
        .nx-ceo-sign-mark { font-family: 'Dancing Script','Segoe Script','Brush Script MT',cursive; font-weight: 700; font-size: ${mobile ? '2.4rem' : '3rem'}; color: #1e3a8a; line-height: 1.1; margin-bottom: 0.35rem; }
        .nx-ceo-sign-name { font-size: 0.95rem; font-weight: 700; color: #1e3a8a; margin: 0; }
        .nx-ceo-sign-role { font-size: 0.63rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #f97316; margin: 0.2rem 0 0; }
        .nx-ceo-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.75rem; }
        .btn-orange { display: inline-block; padding: 0.85rem 1.9rem; background: #f97316; color: #fff; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none; border-radius: 8px; transition: all 0.25s; }
        .btn-orange:hover { background: #1e3a8a; transform: translateY(-2px); box-shadow: 0 10px 24px rgba(30,58,138,0.2); }
        .btn-ghost { display: inline-block; padding: 0.85rem 1.9rem; background: transparent; color: #1e3a8a; border: 1px solid rgba(30,64,175,0.25); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none; border-radius: 8px; transition: all 0.25s; }
        .btn-ghost:hover { border-color: #f97316; color: #f97316; transform: translateY(-2px); }

        /* values */
        .nx-corevals { padding: ${mobile ? '2.5rem 1.25rem' : '5rem 1.75rem'}; background: #f3f4f6; }
        .nx-corevals-inner { max-width: 1280px; margin: 0 auto; }
        .nx-section-head { text-align: center; margin-bottom: 2.5rem; }
        .nx-section-head h2 { font-size: clamp(1.7rem,3.5vw,2.4rem); font-weight: 800; color: #1e3a8a; }
        .nx-divider { width: 96px; height: 4px; background: #f97316; border-radius: 2px; margin: 1rem auto; }
        .nx-pillars-grid { display: grid; grid-template-columns: ${mobile ? '1fr 1fr' : 'repeat(5,1fr)'}; gap: 1rem; }
        .nx-pillar-card { padding: 1.5rem 1.25rem; background: #fff; border: 1px solid rgba(30,64,175,0.1); border-radius: 16px; text-align: center; transition: all 0.3s; box-shadow: 0 2px 8px rgba(30,58,138,0.05); }
        .nx-pillar-card:hover { border-color: rgba(249,115,22,0.45); transform: translateY(-4px); box-shadow: 0 8px 24px rgba(30,58,138,0.1); }
        .nx-pillar-icon { font-size: 1.75rem; margin-bottom: 0.85rem; }
        .nx-pillar-card h3 { font-size: 1rem; font-weight: 700; color: #1e3a8a; margin-bottom: 0.5rem; }
        .nx-pillar-card p  { font-size: 0.75rem; color: #4b5563; line-height: 1.6; margin: 0; }

        /* team */
        .nx-leadership { padding: ${mobile ? '2.5rem 1.25rem' : '5rem 1.75rem'}; background: #fff; }
        .nx-leadership-inner { max-width: 1280px; margin: 0 auto; }
        .nx-team-grid { display: grid; grid-template-columns: ${mobile ? '1fr 1fr' : 'repeat(5,1fr)'}; gap: ${mobile ? '1rem' : '1.5rem'}; }
        .nx-team-card { background: #fff; border: 1px solid rgba(30,64,175,0.1); border-radius: 16px; overflow: hidden; transition: all 0.3s; box-shadow: 0 2px 10px rgba(30,58,138,0.06); }
        .nx-team-card:hover { border-color: rgba(249,115,22,0.45); transform: translateY(-4px); box-shadow: 0 12px 32px rgba(30,58,138,0.12); }
        .nx-team-card--highlight { border-color: rgba(249,115,22,0.35); box-shadow: 0 4px 20px rgba(249,115,22,0.1); }
        .nx-team-img-wrap { height: 190px; background: linear-gradient(135deg,#eff6ff,#dbeafe); display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; }
        .nx-team-img-wrap img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
        .nx-partner-badge { position: absolute; top: 0.75rem; right: 0.75rem; padding: 0.2rem 0.65rem; background: #f97316; color: #fff; border-radius: 999px; font-size: 0.55rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
        .nx-team-initials { width: 80px; height: 80px; border-radius: 50%; background: rgba(30,64,175,0.08); border: 2px solid #f97316; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 700; color: #1e40af; }
        .nx-team-body { padding: 1.25rem 1.5rem; }
        .nx-team-name { font-size: 1.05rem; font-weight: 700; color: #1e3a8a; margin-bottom: 0.2rem; line-height: 1.3; }
        .nx-team-role { font-size: 0.63rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #f97316; margin: 0; }
        .nx-team-phone { font-size: 0.75rem; color: #4b5563; margin: 0.5rem 0 0; }
        .nx-team-note  { font-size: 0.7rem; color: #6b7280; margin: 0.4rem 0 0; font-style: italic; }

        /* healthcare */
        .nx-health { padding: ${mobile ? '2.5rem 1.25rem' : '4rem 1.75rem'}; background: linear-gradient(135deg,#eff6ff,#dbeafe); }
        .nx-health-inner { max-width: 900px; margin: 0 auto; }
        .nx-health-head { text-align: center; margin-bottom: 2.5rem; }
        .nx-health-head h2 { font-size: clamp(1.7rem,3.5vw,2.4rem); font-weight: 800; color: #1e3a8a; margin-bottom: 0.75rem; }
        .nx-health-head p  { font-size: 0.88rem; color: #374151; max-width: 600px; margin: 0 auto; line-height: 1.75; }
        .nx-health-link { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #1e3a8a; text-decoration: none; border-bottom: 2px solid #f97316; padding-bottom: 2px; transition: color 0.2s; }
        .nx-health-link:hover { color: #f97316; }

        /* approach */
        .nx-approach { padding: ${mobile ? '2.5rem 1.25rem' : '5rem 1.75rem'}; background: #1e3a8a; }
        .nx-approach-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: ${mobile ? '1fr' : '1fr 1fr'}; gap: ${mobile ? '2rem' : '4rem'}; align-items: start; }
        .nx-approach h2   { font-size: clamp(1.7rem,3vw,2.4rem); font-weight: 800; color: #fff; line-height: 1.2; margin-bottom: 1rem; }
        .nx-approach p.sub { font-size: 0.88rem; color: #bfdbfe; line-height: 1.8; margin-bottom: 1.5rem; }
        .nx-approach-item { display: flex; gap: 0.85rem; align-items: flex-start; margin-bottom: 0.85rem; }
        .nx-approach-dot  { width: 6px; height: 6px; border-radius: 50%; background: #f97316; flex-shrink: 0; margin-top: 7px; }
        .nx-approach-item p { font-size: 0.85rem; color: #bfdbfe; margin: 0; line-height: 1.6; }
        .nx-approach-item strong { color: #fff; font-weight: 700; }
        .nx-why-box { padding: ${mobile ? '1.75rem' : '2.5rem'}; background: rgba(255,255,255,0.06); border: 1px solid rgba(249,115,22,0.2); border-radius: 20px; }
        .nx-why-box h3 { font-size: 1.4rem; font-weight: 700; color: #fff; margin-bottom: 1.25rem; }
        .nx-why-item { display: flex; gap: 0.85rem; align-items: flex-start; margin-bottom: 0.85rem; }
        .nx-why-check { color: #f97316; font-size: 0.85rem; flex-shrink: 0; margin-top: 2px; font-weight: 700; }
        .nx-why-item p { font-size: 0.82rem; color: #bfdbfe; margin: 0; line-height: 1.6; }
        .nx-ein-block { margin-top: 1.75rem; padding-top: 1.25rem; border-top: 1px solid rgba(249,115,22,0.2); }
        .nx-ein-label { font-size: 0.65rem; color: #93c5fd; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 0.3rem; }
        .nx-ein-val   { font-size: 1.2rem; color: #fb923c; font-weight: 700; letter-spacing: 0.05em; }

        /* cta */
        .nx-cta-light { padding: ${mobile ? '3rem 1.25rem' : '4rem 1.75rem'}; text-align: center; background: #f3f4f6; border-top: 1px solid rgba(30,64,175,0.08); }
        .nx-cta-light h2 { font-size: clamp(1.5rem,3vw,2.4rem); font-weight: 800; color: #1e3a8a; margin-bottom: 0.85rem; }
        .nx-cta-light p  { font-size: 0.88rem; color: #4b5563; margin-bottom: 2rem; line-height: 1.7; max-width: 480px; margin-left: auto; margin-right: auto; }
        .btn-blue { display: inline-block; padding: 0.9rem 2.25rem; background: #1e3a8a; color: #fff; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none; border-radius: 8px; transition: all 0.25s; }
        .btn-blue:hover { background: #f97316; color: #fff; transform: translateY(-2px); }
      `}</style>

      {/* Hero */}
      <section className="nx-about-hero">
        <div className="nx-about-hero-glow" />
        <div className="nx-about-hero-inner">
          <span className="nx-badge">Our Story</span>
          <h1>About Nixol</h1>
          <p>A strategic advisory and financial management firm helping organizations strengthen performance, improve operational efficiency, and make smarter business decisions.</p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="nx-who">
        <div className="nx-who-grid">
          <Reveal>
            <div>
              <span className="nx-badge nx-badge--light">Who We Are</span>
              <h2>Expertise. Integrity. Results.</h2>
              <p>Nixol Management & Consult is a strategic advisory and financial management firm helping organizations strengthen performance, improve operational efficiency, and make smarter business decisions.</p>
              <p style={{ color: '#6b7280' }}>The firm blends deep financial and managerial expertise with practical business insight to deliver solutions that create measurable, long-term value — including specialist healthcare consulting through our partnership with David.</p>
            </div>
          </Reveal>
          <div>
            {[
              { label: 'Our Mission', text: 'To empower organizations with strategic financial intelligence, operational excellence, and tailored advisory solutions that drive long-term value creation.' },
              { label: 'Our Vision',  text: 'To become a trusted partner for businesses seeking clarity, efficiency, and strategic direction in an increasingly complex operating environment.' },
            ].map(({ label, text }, i) => (
              <Reveal key={label} delay={i * 120}>
                <div className="nx-mv-card">
                  <p className="nx-mv-label">{label}</p>
                  <p className="nx-mv-text">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CEO's Message */}
      <section className="nx-ceo">
        <div className="nx-ceo-inner">
          <Reveal>
            <div className="nx-ceo-portrait">
              <div className="nx-ceo-photo">
                <img src="/kwaku.png" alt="Kwaku Duah Junior, Chief Executive Officer"
                  onError={e => {
                    e.target.style.display = 'none'
                    const fb = document.createElement('div')
                    fb.className = 'nx-team-initials'
                    fb.textContent = 'KD'
                    e.target.parentElement.appendChild(fb)
                  }} />
                <div className="nx-ceo-photo-badge"><span>Chief Executive Officer</span></div>
              </div>
              <div className="nx-ceo-portrait-body">
                <h3>Kwaku Duah Junior</h3>
                <p>Founder &amp; CEO</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="nx-ceo-letter">
              <div className="nx-ceo-quote" aria-hidden="true">“</div>
              <div className="nx-ceo-letter-inner">
                <span className="nx-badge nx-badge--light">A Message From Our CEO</span>
                <h2>You’re Welcome Here</h2>
                <p className="nx-ceo-greeting">Dear Friend of Nixol,</p>
                {CEO_MESSAGE.map(para => (
                  <p key={para.slice(0, 32)} className="body">{para}</p>
                ))}
                <div className="nx-ceo-sign">
                  <div className="nx-ceo-sign-mark">Kwaku Duah Jr.</div>
                  <p className="nx-ceo-sign-name">Kwaku Duah Junior</p>
                  <p className="nx-ceo-sign-role">Chief Executive Officer, Nixol Management &amp; Consult</p>
                </div>
                <div className="nx-ceo-actions">
                  <Link to="/booking" className="btn-orange">Let’s Talk</Link>
                  <Link to="/contact" className="btn-ghost">Contact the Team</Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core Values */}
      <section className="nx-corevals">
        <div className="nx-corevals-inner">
          <Reveal>
            <div className="nx-section-head">
              <h2>What Drives Us</h2>
              <div className="nx-divider" />
            </div>
          </Reveal>
          <div className="nx-pillars-grid">
            {PILLARS.map((p, i) => (
              <Reveal key={p.label} delay={i * 70}>
                <div className="nx-pillar-card">
                  <div className="nx-pillar-icon">{p.icon}</div>
                  <h3>{p.label}</h3>
                  <p>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="nx-leadership">
        <div className="nx-leadership-inner">
          <Reveal>
            <div className="nx-section-head">
              <h2>The Nixol Team</h2>
              <div className="nx-divider" />
              <p style={{ fontSize: '0.88rem', color: '#4b5563', maxWidth: '550px', margin: '0 auto', lineHeight: 1.7 }}>
                Experienced finance and business advisory professionals with a track record of delivering strategic insights across diverse industries.
              </p>
            </div>
          </Reveal>
          <div className="nx-team-grid">
            {TEAM.map((member, i) => (
              <TeamCard key={member.name} {...member} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* Healthcare Partner */}
      <section className="nx-health">
        <div className="nx-health-inner">
          <Reveal>
            <div className="nx-health-head">
              <span className="nx-badge">🏥 Healthcare Partnership</span>
              <h2>Expanding Into Healthcare Consulting</h2>
              <p>Nixol has partnered with David — a specialist in healthcare facility consulting — to bring focused advisory services to clinics, hospitals, and medical organizations. Together, we combine financial management expertise with deep sector knowledge to improve performance and patient-centred operations.</p>
            </div>
          </Reveal>
          
          <Reveal>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link to="/services#healthcare" className="nx-health-link">View Healthcare Services →</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Our Approach */}
      <section className="nx-approach">
        <div className="nx-approach-grid">
          <Reveal>
            <div>
              <span className="nx-badge">Our Approach</span>
              <h2>A Partnership Mindset, Not a Vendor Relationship</h2>
              <p className="sub">Nixol operates with a partnership mindset — working closely with clients to understand their goals, challenges, and opportunities. Every engagement is grounded in:</p>
              {APPROACH.map(({ label, desc }) => (
                <div key={label} className="nx-approach-item">
                  <div className="nx-approach-dot" />
                  <p><strong>{label}</strong> {desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="nx-why-box">
              <h3>Why Organizations Choose Nixol</h3>
              {WHY.map(w => (
                <div key={w} className="nx-why-item">
                  <span className="nx-why-check">✓</span>
                  <p>{w}</p>
                </div>
              ))}
              <div className="nx-ein-block">
                <p className="nx-ein-label">Registered EIN</p>
                <p className="nx-ein-val">42-1824156</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="nx-cta-light">
        <Reveal>
          <h2>Ready to Work With Us?</h2>
          <p>Nixol is committed to helping organizations operate smarter, grow stronger, and achieve their strategic goals.</p>
          <Link to="/booking" className="btn-blue">Book a Consultation</Link>
        </Reveal>
      </section>
    </main>
  )
}