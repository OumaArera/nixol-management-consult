import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.classList.add('revealed')
        obs.disconnect()
      }
    }, { threshold })
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

const STATS = [
  { value: '6+',   label: 'Service Verticals' },
  { value: '7',    label: 'Industries Served' },
  { value: '100%', label: 'Client-Centric Focus' },
  { value: '24h',  label: 'Response Commitment' },
]

const SERVICES_PREVIEW = [
  { icon: '🏛️', title: 'Management & Advisory',      desc: 'Executive decision support, governance, risk & internal controls, strategic planning and transformation.' },
  { icon: '📊', title: 'Financial Management',         desc: 'Budgeting, forecasting, cash flow optimization, financial modeling and performance dashboards.' },
  { icon: '🚀', title: 'Business Strategy & Growth',  desc: 'Strategic planning, market analysis, business model development and investment readiness advisory.' },
  { icon: '📋', title: 'Accounting & Compliance',      desc: 'Bookkeeping, financial statements, audit readiness, ERP optimization and regulatory compliance.' },
  { icon: '⚙️', title: 'Operations Optimization',     desc: 'Workflow redesign, process efficiency, automation advisory and continuous improvement frameworks.' },
  { icon: '🏥', title: 'Healthcare Consulting',        desc: 'Advisory for healthcare facilities on financial management, compliance, operational efficiency, and growth strategy.' },
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
  { icon: '🤝', label: 'Professional Stewardship', desc: 'We protect client interests with confidentiality, respect, and responsibility.' },
  { icon: '⚖️', label: 'Integrity',                desc: 'We act with honesty, transparency, and ethical discipline in every engagement.' },
  { icon: '💡', label: 'Innovation',               desc: 'We apply insight, data, and modern tools to create smarter solutions.' },
  { icon: '🎯', label: 'Accountability',            desc: 'We take ownership of our work, decisions, and the outcomes we deliver.' },
]

// Download icon SVG component — keeps JSX clean
function DownloadIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8 1v9M4.5 6.5 8 10l3.5-3.5M2 13h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function HomePage() {
  return (
    <main className="nx-main">
      <style>{`
        /* ── Reset & tokens ── */
        .nx-main { overflow-x: hidden; font-family: 'Segoe UI', system-ui, sans-serif; }
        :root {
          --blue:   #1e40af;
          --blue2:  #1d4ed8;
          --blue3:  #1e3a8a;
          --orange: #f97316;
          --orange2:#ea6c0a;
          --white:  #ffffff;
          --gray50: #f9fafb;
          --gray100:#f3f4f6;
          --gray600:#4b5563;
          --gray700:#374151;
        }

        /* ── Reveal animation ── */
        .reveal-block { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease var(--delay, 0ms), transform 0.7s ease var(--delay, 0ms); }
        .reveal-block.revealed { opacity: 1; transform: translateY(0); }

        /* ── Hero ── */
        .nx-hero { position: relative; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 8rem 1.75rem 5rem; background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 60%, #1d4ed8 100%); overflow: hidden; }
        .nx-hero-grid { position: absolute; inset: 0; opacity: 0.04; background-image: repeating-linear-gradient(90deg,#f97316 0,#f97316 1px,transparent 1px,transparent 72px), repeating-linear-gradient(0deg,#f97316 0,#f97316 1px,transparent 1px,transparent 72px); }
        .nx-hero-glow { position: absolute; top: 15%; left: 20%; width: 500px; height: 500px; background: radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%); border-radius: 50%; }
        .nx-hero-inner { position: relative; z-index: 10; max-width: 900px; margin: 0 auto; text-align: center; }
        .nx-hero-badge { display: inline-block; padding: 0.4rem 1.25rem; border: 1px solid rgba(249,115,22,0.45); border-radius: 999px; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: #fdba74; background: rgba(249,115,22,0.08); margin-bottom: 1.5rem; }
        .nx-hero h1 { font-size: clamp(2.8rem,7vw,5.2rem); font-weight: 800; color: #fff; line-height: 1.05; margin-bottom: 1.5rem; }
        .nx-hero h1 span.accent { color: #fb923c; }
        .nx-hero h1 span.light  { color: #bfdbfe; }
        .nx-hero-sub { font-size: 1.05rem; color: #bfdbfe; line-height: 1.8; max-width: 640px; margin: 0 auto 2.5rem; }
        .nx-hero-btns { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }
        .btn-primary  { padding: 0.9rem 2.25rem; background: #f97316; color: #fff; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none; border-radius: 8px; transition: all 0.25s; display: inline-block; }
        .btn-primary:hover  { background: #ea6c0a; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(249,115,22,0.35); }
        .btn-outline  { padding: 0.9rem 2.25rem; border: 1px solid rgba(191,219,254,0.4); color: #bfdbfe; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none; border-radius: 8px; transition: all 0.25s; background: transparent; display: inline-block; }
        .btn-outline:hover  { border-color: #f97316; color: #fff; }
        .nx-scroll-cue { position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%); opacity: 0.4; }
        .nx-scroll-dot { width: 18px; height: 30px; border: 1px solid rgba(249,115,22,0.5); border-radius: 9px; display: flex; justify-content: center; padding-top: 5px; }
        .nx-scroll-pip { width: 3px; height: 6px; background: #f97316; border-radius: 2px; animation: nx-bounce 2s infinite; }
        @keyframes nx-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

        /* ── Section shell ── */
        .nx-section      { padding: 5rem 1.75rem; }
        .nx-section-sm   { padding: 3rem 1.75rem; }
        .nx-container    { max-width: 1280px; margin: 0 auto; }
        .nx-container-md { max-width: 1100px; margin: 0 auto; }
        .nx-container-sm { max-width: 800px; margin: 0 auto; }

        /* ── Section header ── */
        .nx-section-head { text-align: center; margin-bottom: 3rem; }
        .nx-section-head h2 { font-size: clamp(1.8rem,3.5vw,2.6rem); font-weight: 700; color: #1e3a8a; margin-bottom: 0; }
        .nx-divider { width: 96px; height: 4px; background: #f97316; border-radius: 2px; margin: 1rem auto; }
        .nx-section-head p { font-size: 0.95rem; color: #4b5563; line-height: 1.75; max-width: 560px; margin: 0 auto; }

        /* ── Stats strip ── */
        .nx-stats { background: #fff; border-bottom: 1px solid rgba(30,64,175,0.1); }
        .nx-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; text-align: center; max-width: 900px; margin: 0 auto; }
        .nx-stat-val { font-size: clamp(2rem,4vw,3rem); font-weight: 800; color: #1e3a8a; margin: 0 0 0.25rem; }
        .nx-stat-lbl { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #1d4ed8; margin: 0; }

        /* ── Welcome ── */
        .nx-welcome { background: #f3f4f6; }
        .nx-blockquote { padding: 1.5rem 2rem; background: #fff; border-left: 4px solid #f97316; border-radius: 0 12px 12px 0; text-align: left; box-shadow: 0 2px 16px rgba(30,58,138,0.06); margin-top: 2rem; }
        .nx-blockquote p { font-size: 1.15rem; font-style: italic; color: #1e3a8a; margin: 0 0 0.5rem; line-height: 1.6; }
        .nx-blockquote cite { font-size: 0.7rem; color: #6b7280; font-style: normal; letter-spacing: 0.1em; text-transform: uppercase; }

        /* ── Resource Download strip ── */
        .nx-download-strip { background: #fff; padding: 2rem 1.75rem; border-top: 1px solid rgba(30,64,175,0.08); border-bottom: 1px solid rgba(30,64,175,0.08); }
        .nx-download-inner { display: flex; align-items: center; gap: 2rem; max-width: 900px; margin: 0 auto; background: linear-gradient(135deg, #eff6ff 0%, #fff7ed 100%); border: 1px solid rgba(249,115,22,0.2); border-radius: 16px; padding: 1.75rem 2rem; box-shadow: 0 2px 16px rgba(30,58,138,0.06); }
        .nx-download-file-icon { font-size: 2.4rem; flex-shrink: 0; }
        .nx-download-text { flex: 1; }
        .nx-download-eyebrow { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: #f97316; margin: 0 0 0.3rem; }
        .nx-download-text h3 { font-size: 1rem; font-weight: 700; color: #1e3a8a; margin: 0 0 0.3rem; }
        .nx-download-text p  { font-size: 0.78rem; color: #4b5563; line-height: 1.6; margin: 0; }
        .btn-download { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; background: #1e3a8a; color: #fff; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; text-decoration: none; border-radius: 8px; white-space: nowrap; transition: all 0.25s; flex-shrink: 0; }
        .btn-download:hover { background: #f97316; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(249,115,22,0.3); }
        .btn-download svg { width: 14px; height: 14px; flex-shrink: 0; }

        /* ── Service cards ── */
        .nx-services { background: #fff; }
        .nx-services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 1.5rem; }
        .nx-svc-card { background: #fff; border: 1px solid rgba(30,64,175,0.1); border-radius: 16px; padding: 1.75rem; transition: all 0.3s; box-shadow: 0 2px 12px rgba(30,58,138,0.06); cursor: default; height: 100%; }
        .nx-svc-card:hover { border-color: rgba(249,115,22,0.5); transform: translateY(-4px); box-shadow: 0 12px 32px rgba(30,58,138,0.12); }
        .nx-svc-icon { font-size: 2rem; margin-bottom: 1rem; }
        .nx-svc-card h3 { font-size: 1.15rem; font-weight: 700; color: #1e3a8a; margin-bottom: 0.65rem; }
        .nx-svc-card p  { font-size: 0.82rem; color: #4b5563; line-height: 1.75; margin: 0; }
        .nx-link-text { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #1e3a8a; text-decoration: none; border-bottom: 2px solid #f97316; padding-bottom: 2px; transition: color 0.2s; }
        .nx-link-text:hover { color: #f97316; }

        /* ── Values (dark) ── */
        .nx-values { background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%); }
        .nx-values-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; max-width: 1280px; margin: 0 auto; }
        .nx-values h2 { font-size: clamp(1.8rem,3.5vw,2.6rem); font-weight: 800; color: #fff; line-height: 1.2; margin-bottom: 1.25rem; }
        .nx-values p.sub { font-size: 0.88rem; color: #bfdbfe; line-height: 1.8; margin-bottom: 2rem; }
        .nx-val-card { display: flex; gap: 1.25rem; padding: 1.25rem 1.5rem; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; transition: all 0.3s; }
        .nx-val-card:hover { border-color: rgba(249,115,22,0.4); transform: translateX(4px); background: rgba(255,255,255,0.1); }
        .nx-val-icon { font-size: 1.5rem; flex-shrink: 0; margin-top: 2px; }
        .nx-val-card h4 { font-size: 1.05rem; font-weight: 700; color: #fff; margin-bottom: 0.3rem; }
        .nx-val-card p  { font-size: 0.8rem; color: #93c5fd; line-height: 1.6; margin: 0; }
        .nx-vals-list { display: flex; flex-direction: column; gap: 1rem; }
        .btn-outline-light { padding: 0.75rem 1.75rem; border: 1px solid rgba(249,115,22,0.5); color: #fb923c; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none; border-radius: 8px; transition: all 0.25s; background: transparent; display: inline-block; }
        .btn-outline-light:hover { background: #f97316; color: #fff; border-color: #f97316; }

        /* ── Industries ── */
        .nx-industries { background: #f3f4f6; border-bottom: 1px solid rgba(30,64,175,0.08); }
        .nx-industries-label { font-size: 0.62rem; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: #1d4ed8; text-align: center; margin-bottom: 1.75rem; }
        .nx-tags-wrap { display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; }
        .nx-tag { padding: 0.5rem 1.1rem; background: #fff; border: 1px solid rgba(30,64,175,0.12); border-radius: 999px; font-size: 0.78rem; color: #1e40af; transition: all 0.2s; cursor: default; box-shadow: 0 1px 4px rgba(30,58,138,0.05); }
        .nx-tag:hover { border-color: #f97316; color: #1e3a8a; background: rgba(249,115,22,0.06); }

        /* ── Clients ── */
        .nx-clients { background: #fff; }
        .nx-clients-logos { display: flex; flex-wrap: wrap; gap: 2rem; justify-content: center; align-items: center; margin-bottom: 2rem; }
        .nx-logo-card { padding: 1.5rem 2.5rem; background: #f9fafb; border: 1px solid rgba(30,64,175,0.1); border-radius: 16px; transition: all 0.3s; display: flex; align-items: center; justify-content: center; min-width: 180px; min-height: 100px; box-shadow: 0 2px 10px rgba(30,58,138,0.06); }
        .nx-logo-card:hover { border-color: #f97316; transform: translateY(-4px); box-shadow: 0 12px 28px rgba(30,58,138,0.1); }
        .nx-logo-card img { max-height: 60px; max-width: 140px; width: auto; object-fit: contain; }

        /* ── CTA dark ── */
        .nx-cta { position: relative; padding: 6rem 1.75rem; overflow: hidden; background: #1e3a8a; }
        .nx-cta-glow { position: absolute; inset: 0; background-image: radial-gradient(circle at 25% 50%, rgba(249,115,22,0.12) 0%, transparent 55%), radial-gradient(circle at 75% 50%, rgba(30,64,175,0.5) 0%, transparent 55%); }
        .nx-cta-inner { position: relative; z-index: 10; max-width: 700px; margin: 0 auto; text-align: center; }
        .nx-cta h2 { font-size: clamp(2rem,4vw,3rem); font-weight: 800; color: #fff; margin-bottom: 1rem; line-height: 1.2; }
        .nx-cta p  { font-size: 0.95rem; color: #bfdbfe; line-height: 1.75; margin-bottom: 2.5rem; }
        .nx-cta-btns { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }

        @media (max-width: 768px) {
          .nx-stats-grid   { grid-template-columns: repeat(2,1fr); }
          .nx-values-grid2 { grid-template-columns: 1fr; gap: 2rem; }
          .nx-download-inner { flex-direction: column; text-align: center; }
          .btn-download { width: 100%; justify-content: center; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="nx-hero">
        <div className="nx-hero-grid" />
        <div className="nx-hero-glow" />
        <div className="nx-hero-inner">
          <div className="nx-hero-badge">Strategic Advisory · Financial Management · Business Growth</div>
          <h1>
            Built on <span className="accent">Expertise.</span><br />
            Driven by <span className="light">Integrity.</span>
          </h1>
          <p className="nx-hero-sub">
            Nixol empowers organizations with strategic financial intelligence, operational excellence, and tailored advisory solutions — delivering long-term value across industries.
          </p>
          <div className="nx-hero-btns">
            <Link to="/services" className="btn-primary">Explore Our Services</Link>
            <Link to="/booking"  className="btn-outline">Book a Consultation</Link>
          </div>
        </div>
        <div className="nx-scroll-cue">
          <div className="nx-scroll-dot"><div className="nx-scroll-pip" /></div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="nx-stats nx-section-sm">
        <Reveal>
          <div className="nx-stats-grid">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="nx-stat-val">{value}</p>
                <p className="nx-stat-lbl">{label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── WELCOME ── */}
      <section className="nx-section nx-welcome">
        <Reveal>
          <div className="nx-container-sm" style={{ textAlign: 'center' }}>
            <div className="nx-section-head">
              <h2>Your Strategic Partner for Clarity, Efficiency & Growth</h2>
              <div className="nx-divider" />
            </div>
            <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              Welcome to Nixol Management & Consult — a firm built on the conviction that every organization, regardless of size or sector, deserves access to world-class advisory and financial expertise.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.8 }}>
              We work alongside executives, boards, and leadership teams to bring financial clarity, operational discipline, and strategic direction to the decisions that matter most. Whether you are navigating growth, managing complexity, or preparing for your next milestone — we are here as a trusted partner, not just a consultant.
            </p>
            <div className="nx-blockquote">
              <p>"To empower organizations with strategic financial intelligence, operational excellence, and tailored advisory solutions that drive long-term value creation."</p>
              <cite>— Our Mission</cite>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── RESOURCE DOWNLOAD ── */}
      <section className="nx-download-strip">
        <Reveal>
          <div className="nx-download-inner">
            <div className="nx-download-file-icon" aria-hidden="true">📄</div>
            <div className="nx-download-text">
              <p className="nx-download-eyebrow">Free Resource</p>
              <h3>Adult Family Home Services Proposal</h3>
              <p>A comprehensive overview of Nixol's advisory and financial management services tailored for adult family home providers — covering compliance, operations, and growth strategy.</p>
            </div>
            <a
              href="/Adult Family Home ServicesProposal.pdf"
              download="Adult Family Home Services Proposal - Nixol.pdf"
              className="btn-download"
              aria-label="Download Adult Family Home Services Proposal PDF"
            >
              <DownloadIcon />
              Download PDF
            </a>
          </div>
        </Reveal>
      </section>

      {/* ── SERVICES ── */}
      <section className="nx-section nx-services">
        <div className="nx-container">
          <Reveal>
            <div className="nx-section-head">
              <h2>Core Services</h2>
              <div className="nx-divider" />
              <p>Comprehensive solutions designed to improve financial clarity, streamline operations, and accelerate growth.</p>
            </div>
          </Reveal>
          <div className="nx-services-grid">
            {SERVICES_PREVIEW.map((s, i) => (
              <Reveal key={s.title} delay={i * 70}>
                <div className="nx-svc-card">
                  <div className="nx-svc-icon">{s.icon}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link to="/services" className="nx-link-text">View All Services →</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── VALUES (dark) ── */}
      <section className="nx-section nx-values">
        <div className="nx-values-grid2">
          <Reveal>
            <div>
              <div style={{ display: 'inline-block', padding: '0.35rem 1.1rem', border: '1px solid rgba(249,115,22,0.4)', borderRadius: '999px', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#fdba74', marginBottom: '1.25rem', background: 'rgba(249,115,22,0.08)' }}>Our Values</div>
              <h2>Principles That Guide Every Engagement</h2>
              <p className="sub">Our values are not statements on a wall — they are the operating system behind every recommendation, report, and relationship we build.</p>
              <Link to="/about" className="btn-outline-light">Our Story</Link>
            </div>
          </Reveal>
          <div className="nx-vals-list">
            {VALUES.map((v, i) => (
              <Reveal key={v.label} delay={i * 80}>
                <div className="nx-val-card">
                  <div className="nx-val-icon">{v.icon}</div>
                  <div>
                    <h4>{v.label}</h4>
                    <p>{v.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="nx-section-sm nx-industries">
        <Reveal>
          <div className="nx-container-md" style={{ textAlign: 'center' }}>
            <p className="nx-industries-label">Industries We Serve</p>
            <div className="nx-tags-wrap">
              {INDUSTRIES.map(ind => <span key={ind} className="nx-tag">{ind}</span>)}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── CLIENTS ── */}
      <section className="nx-section nx-clients">
        <Reveal>
          <div className="nx-container" style={{ textAlign: 'center' }}>
            <div className="nx-section-head">
              <h2>Organizations That Trust Nixol</h2>
              <div className="nx-divider" />
              <p>We are proud to work alongside organizations committed to operational excellence and long-term growth.</p>
            </div>
            <div className="nx-clients-logos">
              {CLIENTS.map(({ name, logo }) => (
                <div key={name} className="nx-logo-card">
                  <img src={logo} alt={name}
                    onError={e => {
                      e.target.style.display = 'none'
                      e.target.parentElement.innerHTML = `<span style="font-size:1.4rem;font-weight:800;color:#1e3a8a">${name}</span>`
                    }} />
                </div>
              ))}
            </div>
            <Link to="/clients" className="nx-link-text">View All Clients →</Link>
          </div>
        </Reveal>
      </section>

      {/* ── CTA ── */}
      <section className="nx-cta">
        <div className="nx-cta-glow" />
        <Reveal>
          <div className="nx-cta-inner">
            <h2>Ready to Operate Smarter and Grow Stronger?</h2>
            <p>Every engagement starts with a conversation. Let's discuss where you are, where you want to be, and how Nixol can help you get there.</p>
            <div className="nx-cta-btns">
              <Link to="/booking" className="btn-primary">Schedule a Consultation</Link>
              <Link to="/contact" className="btn-outline">Contact Us</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  )
}