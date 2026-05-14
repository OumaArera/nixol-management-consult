import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

function useReveal(threshold = 0.1) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('revealed'); obs.disconnect() }
    }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return ref
}

function Reveal({ children, className = '', delay = 0, style = {} }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`reveal-block ${className}`} style={{ '--delay': `${delay}ms`, ...style }}>
      {children}
    </div>
  )
}

const CLIENTS = [
  {
    name: 'Edmonds',
    logo: '/edmonds.png',
    sector: 'Professional Services',
    tagline: 'A trusted partner in financial clarity and strategic performance.',
    description: 'Nixol has been a trusted advisory partner for Edmonds, bringing strategic clarity and financial discipline to their operations. Our team\'s depth of expertise and hands-on approach made an immediate and measurable difference across their financial and operational landscape.',
    services: ['Financial Management & Advisory', 'Strategic Planning', 'Operations Optimization'],
    result: 'Measurable improvements in financial performance and operational efficiency.',
    stat: { val: '↑ 34%', lbl: 'Operational Efficiency' },
  },
  {
    name: 'Bothell',
    logo: '/bothell.png',
    sector: 'Education & Nonprofits',
    tagline: 'Stronger governance, sharper controls, and smarter operations.',
    description: 'Working with Nixol elevated how Bothell approaches governance, risk, and internal controls. Our consultants understood their unique challenges and delivered solutions that were practical, scalable, and results-driven — tailored to the nonprofit sector.',
    services: ['Management & Advisory', 'Accounting & Compliance', 'Business Strategy & Growth'],
    result: 'Strengthened internal controls and governance frameworks across the organisation.',
    stat: { val: '100%', lbl: 'Audit-Ready Status' },
  },
]

const INDUSTRIES = [
  'Education & Nonprofits', 'Oil and Gas', 'Professional Services',
  'Retail & Distribution', 'Manufacturing & Supply Chain',
  'Healthcare & Medical Facilities', 'Startups & Emerging Enterprises',
]

const WHY = [
  { icon: '🎯', label: 'Tailored Engagements',  desc: 'No two clients are the same. Every solution is built around your specific goals, challenges, and sector context.' },
  { icon: '📊', label: 'Data-Driven Insights',   desc: 'We ground every recommendation in rigorous analysis and real financial intelligence — not guesswork.' },
  { icon: '🤝', label: 'Long-Term Partnership',  desc: 'We measure our success by the milestones our clients reach, not by hours billed or reports delivered.' },
  { icon: '⚡', label: 'Measurable Results',      desc: 'Every engagement is designed around clear outcomes — improved efficiency, profitability, and governance.' },
]

function ClientCard({ client, delay, flipped }) {
  const ref = useReveal()
  return (
    <div ref={ref} className="reveal-block client-card-wrap" style={{ '--delay': `${delay}ms` }}>
      <div className={`client-card ${flipped ? 'client-card-flipped' : ''}`}>

        {/* ── Visual panel ── */}
        <div className="client-card-visual">
          <div className="client-card-grid" />
          <div className="client-card-glow" />
          <div className="client-card-logo-wrap">
            <img
              src={client.logo}
              alt={client.name}
              className="client-card-logo"
              onError={e => {
                e.target.style.display = 'none'
                const el = document.createElement('span')
                el.className = 'client-card-name-fallback'
                el.textContent = client.name
                e.target.parentElement.appendChild(el)
              }}
            />
          </div>
          <div className="client-card-stat-box">
            <strong>{client.stat.val}</strong>
            <span>{client.stat.lbl}</span>
          </div>
          <span className="client-card-sector">{client.sector}</span>
        </div>

        {/* ── Content panel ── */}
        <div className="client-card-content">
          <p className="client-card-tagline">"{client.tagline}"</p>
          <p className="client-card-desc">{client.description}</p>

          <div className="client-card-result">
            <span className="client-card-result-dot" />
            <p><strong>Result: </strong>{client.result}</p>
          </div>

          <div className="client-card-services">
            <p className="client-card-services-label">Services Engaged</p>
            <div className="client-card-tags">
              {client.services.map(s => (
                <span key={s} className="client-tag">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ClientsPage() {
  return (
    <main className="cp-main">
      <style>{`
        /* ── Tokens ── */
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

        /* ── Base ── */
        .cp-main { font-family: 'Segoe UI', system-ui, sans-serif; overflow-x: hidden; background: #f3f4f6; }

        /* ── Reveal ── */
        .reveal-block { opacity: 0; transform: translateY(24px); transition: opacity 0.65s ease var(--delay,0ms), transform 0.65s ease var(--delay,0ms); }
        .reveal-block.revealed { opacity: 1; transform: translateY(0); }

        /* ── Hero ── */
        .cp-hero {
          position: relative; padding: 6rem 2rem 4.5rem; text-align: center; overflow: hidden;
          background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 60%, #1d4ed8 100%);
        }
        .cp-hero-grid {
          position: absolute; inset: 0; opacity: 0.04;
          background-image:
            repeating-linear-gradient(90deg,#f97316 0,#f97316 1px,transparent 1px,transparent 64px),
            repeating-linear-gradient(0deg,#f97316 0,#f97316 1px,transparent 1px,transparent 64px);
        }
        .cp-hero-glow { position: absolute; bottom: -5%; left: 15%; width: 480px; height: 480px; background: radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 65%); border-radius: 50%; }
        .cp-hero-inner { position: relative; z-index: 1; max-width: 700px; margin: 0 auto; }
        .cp-hero-badge { display: inline-block; padding: 0.38rem 1.2rem; border: 1px solid rgba(249,115,22,0.4); border-radius: 999px; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: #fdba74; background: rgba(249,115,22,0.08); margin-bottom: 1.4rem; }
        .cp-hero h1 { font-size: clamp(2.4rem,6vw,4rem); font-weight: 800; color: #fff; line-height: 1.08; margin-bottom: 1.25rem; }
        .cp-hero h1 span { color: #fb923c; }
        .cp-hero-sub { font-size: 0.97rem; color: #bfdbfe; line-height: 1.8; max-width: 540px; margin: 0 auto; }

        /* ── Logo strip ── */
        .cp-logo-strip { background: #fff; border-bottom: 1px solid rgba(30,64,175,0.1); padding: 2.25rem 2rem; }
        .cp-logo-strip-label { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: #9ca3af; text-align: center; margin-bottom: 1.5rem; }
        .cp-logo-strip-logos { display: flex; flex-wrap: wrap; gap: 1.25rem; justify-content: center; align-items: center; }
        .cp-logo-pill {
          padding: 0.9rem 2rem; background: #f3f4f6; border: 1px solid rgba(30,64,175,0.1);
          border-radius: 12px; display: flex; align-items: center; justify-content: center;
          min-width: 140px; min-height: 64px; transition: all 0.25s;
          box-shadow: 0 2px 8px rgba(30,58,138,0.05);
        }
        .cp-logo-pill:hover { border-color: rgba(249,115,22,0.4); transform: translateY(-3px); box-shadow: 0 8px 20px rgba(30,58,138,0.1); }
        .cp-logo-pill img { max-height: 40px; max-width: 110px; width: auto; object-fit: contain; }

        /* ── Section shell ── */
        .cp-section { padding: 5rem 2rem; max-width: 1200px; margin: 0 auto; }
        .cp-section-head { text-align: center; margin-bottom: 3.5rem; }
        .cp-section-badge { display: inline-block; padding: 0.35rem 1.1rem; border: 1px solid rgba(30,64,175,0.15); border-radius: 999px; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #1d4ed8; background: rgba(30,64,175,0.05); margin-bottom: 1rem; }
        .cp-section-head h2 { font-size: clamp(1.8rem,3.5vw,2.6rem); font-weight: 700; color: #1e3a8a; margin-bottom: 0.75rem; }
        .cp-divider { width: 80px; height: 4px; background: #f97316; border-radius: 2px; margin: 0 auto 1rem; }
        .cp-section-head p { font-size: 0.9rem; color: #4b5563; max-width: 520px; margin: 0 auto; line-height: 1.75; }

        /* ── Client cards (horizontal split) ── */
        .cp-clients-list { display: flex; flex-direction: column; gap: 2.5rem; }

        .client-card-wrap { }
        .client-card {
          display: grid; grid-template-columns: 380px 1fr;
          background: #fff; border: 1px solid rgba(30,64,175,0.1);
          border-radius: 20px; overflow: hidden;
          box-shadow: 0 4px 24px rgba(30,58,138,0.08);
          transition: box-shadow 0.3s, border-color 0.3s;
        }
        .client-card:hover { border-color: rgba(249,115,22,0.35); box-shadow: 0 12px 40px rgba(30,58,138,0.14); }
        .client-card-flipped { direction: rtl; }
        .client-card-flipped > * { direction: ltr; }

        /* Visual panel */
        .client-card-visual {
          position: relative; overflow: hidden;
          background: linear-gradient(145deg, #1e3a8a 0%, #1e40af 60%, #1d4ed8 100%);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 3rem 2rem; gap: 1.5rem; min-height: 320px;
        }
        .client-card-grid { position: absolute; inset: 0; opacity: 0.05; background-image: repeating-linear-gradient(90deg,#f97316 0,#f97316 1px,transparent 1px,transparent 48px),repeating-linear-gradient(0deg,#f97316 0,#f97316 1px,transparent 1px,transparent 48px); }
        .client-card-glow { position: absolute; bottom: -20%; right: -10%; width: 240px; height: 240px; background: radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%); border-radius: 50%; }
        .client-card-logo-wrap { position: relative; z-index: 1; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 1.5rem 2.5rem; min-width: 180px; min-height: 100px; }
        .client-card-logo { max-height: 70px; max-width: 200px; width: auto; object-fit: contain; filter: brightness(1.1); }
        .client-card-name-fallback { font-size: 2rem; font-weight: 800; color: #fff; letter-spacing: 0.06em; }
        .client-card-stat-box { position: relative; z-index: 1; text-align: center; }
        .client-card-stat-box strong { display: block; font-size: 2rem; font-weight: 800; color: #fb923c; line-height: 1; }
        .client-card-stat-box span { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: #bfdbfe; }
        .client-card-sector { position: relative; z-index: 1; padding: 0.3rem 0.85rem; background: rgba(249,115,22,0.12); border: 1px solid rgba(249,115,22,0.3); border-radius: 999px; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #fdba74; }

        /* Content panel */
        .client-card-content { padding: 2.5rem; display: flex; flex-direction: column; gap: 1.25rem; justify-content: center; }
        .client-card-tagline { font-size: 1.15rem; font-style: italic; color: #1e3a8a; line-height: 1.55; margin: 0; font-weight: 500; }
        .client-card-desc { font-size: 0.85rem; color: #4b5563; line-height: 1.8; margin: 0; }
        .client-card-result {
          display: flex; gap: 0.75rem; align-items: flex-start;
          padding: 0.9rem 1.1rem; background: #f3f4f6;
          border-left: 3px solid #f97316; border-radius: 0 10px 10px 0;
        }
        .client-card-result-dot { width: 8px; height: 8px; background: #f97316; border-radius: 50%; flex-shrink: 0; margin-top: 4px; }
        .client-card-result p { font-size: 0.8rem; color: #374151; line-height: 1.6; margin: 0; }
        .client-card-result strong { color: #1e3a8a; }
        .client-card-services-label { font-size: 0.58rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #9ca3af; margin: 0 0 0.6rem; }
        .client-card-tags { display: flex; flex-wrap: wrap; gap: 0.45rem; }
        .client-tag { padding: 0.3rem 0.8rem; background: #f3f4f6; border: 1px solid rgba(30,64,175,0.12); border-radius: 999px; font-size: 0.7rem; color: #1e40af; transition: all 0.2s; }
        .client-tag:hover { background: rgba(249,115,22,0.07); border-color: rgba(249,115,22,0.35); color: #1e3a8a; }

        @media (max-width: 860px) {
          .client-card { grid-template-columns: 1fr; }
          .client-card-flipped { direction: ltr; }
          .client-card-visual { min-height: 220px; padding: 2rem; }
        }

        /* ── Why section (dark) ── */
        .cp-why { background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%); padding: 5rem 2rem; }
        .cp-why-inner { max-width: 1200px; margin: 0 auto; }
        .cp-why-head { text-align: center; margin-bottom: 3rem; }
        .cp-why-badge { display: inline-block; padding: 0.38rem 1.2rem; border: 1px solid rgba(249,115,22,0.35); border-radius: 999px; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: #fdba74; background: rgba(249,115,22,0.08); margin-bottom: 1.25rem; }
        .cp-why-head h2 { font-size: clamp(1.8rem,3.5vw,2.6rem); font-weight: 700; color: #fff; margin-bottom: 0; }
        .cp-why-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; }
        .cp-why-card {
          padding: 1.75rem 1.6rem; background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 16px;
          transition: all 0.3s;
        }
        .cp-why-card:hover { border-color: rgba(249,115,22,0.4); background: rgba(255,255,255,0.1); transform: translateY(-4px); }
        .cp-why-icon { font-size: 1.75rem; margin-bottom: 0.85rem; }
        .cp-why-card h3 { font-size: 1.05rem; font-weight: 700; color: #fff; margin-bottom: 0.55rem; }
        .cp-why-card p { font-size: 0.8rem; color: #93c5fd; line-height: 1.65; margin: 0; }

        /* ── Industries ── */
        .cp-industries { background: #fff; border-top: 1px solid rgba(30,64,175,0.08); padding: 3.5rem 2rem; }
        .cp-industries-inner { max-width: 960px; margin: 0 auto; text-align: center; }
        .cp-industries-label { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: #9ca3af; margin-bottom: 1.5rem; }
        .cp-tags-wrap { display: flex; flex-wrap: wrap; gap: 0.7rem; justify-content: center; }
        .cp-tag { padding: 0.5rem 1.1rem; background: #f3f4f6; border: 1px solid rgba(30,64,175,0.1); border-radius: 999px; font-size: 0.78rem; color: #1e40af; transition: all 0.2s; cursor: default; }
        .cp-tag:hover { border-color: rgba(249,115,22,0.4); color: #1e3a8a; background: rgba(249,115,22,0.06); }

        /* ── CTA ── */
        .cp-cta { position: relative; padding: 5.5rem 2rem; text-align: center; overflow: hidden; background: #1e3a8a; }
        .cp-cta-glow { position: absolute; inset: 0; background-image: radial-gradient(circle at 25% 50%, rgba(249,115,22,0.12) 0%, transparent 55%), radial-gradient(circle at 75% 50%, rgba(30,64,175,0.5) 0%, transparent 55%); }
        .cp-cta-inner { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; }
        .cp-cta h2 { font-size: clamp(1.9rem,4vw,2.9rem); font-weight: 800; color: #fff; margin-bottom: 1rem; line-height: 1.2; }
        .cp-cta p { font-size: 0.95rem; color: #bfdbfe; line-height: 1.75; margin-bottom: 2.25rem; }
        .cp-cta-btns { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }
        .btn-primary { padding: 0.9rem 2.25rem; background: #f97316; color: #fff; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none; border-radius: 8px; transition: all 0.25s; display: inline-block; }
        .btn-primary:hover { background: #ea6c0a; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(249,115,22,0.35); }
        .btn-outline { padding: 0.9rem 2.25rem; border: 1px solid rgba(191,219,254,0.4); color: #bfdbfe; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none; border-radius: 8px; transition: all 0.25s; background: transparent; display: inline-block; }
        .btn-outline:hover { border-color: #f97316; color: #fff; }
      `}</style>

      {/* ── HERO ── */}
      <section className="cp-hero">
        <div className="cp-hero-grid" />
        <div className="cp-hero-glow" />
        <Reveal>
          <div className="cp-hero-inner">
            <div className="cp-hero-badge">Our Clients</div>
            <h1>Organizations That <span>Trust</span> Nixol</h1>
            <p className="cp-hero-sub">
              We are proud to partner with organizations committed to operational excellence, financial clarity, and long-term strategic growth.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── LOGO STRIP ── */}
      <section className="cp-logo-strip">
        <Reveal>
          <p className="cp-logo-strip-label">Trusted Partners</p>
          <div className="cp-logo-strip-logos">
            {CLIENTS.map(({ name, logo }) => (
              <div key={name} className="cp-logo-pill">
                <img src={logo} alt={name}
                  onError={e => {
                    e.target.style.display = 'none'
                    const el = document.createElement('span')
                    el.style.cssText = 'font-size:1rem;font-weight:800;color:#1e3a8a;letter-spacing:0.05em'
                    el.textContent = name
                    e.target.parentElement.appendChild(el)
                  }} />
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── CLIENT CARDS ── */}
      <section className="cp-section">
        <Reveal>
          <div className="cp-section-head">
            <div className="cp-section-badge">Client Stories</div>
            <h2>The Work We Do Together</h2>
            <div className="cp-divider" />
            <p>Every engagement is built around your unique goals. Here's a look at two of the organizations we proudly serve.</p>
          </div>
        </Reveal>
        <div className="cp-clients-list">
          {CLIENTS.map((client, i) => (
            <ClientCard key={client.name} client={client} delay={i * 100} flipped={i % 2 === 1} />
          ))}
        </div>
      </section>

      {/* ── WHY NIXOL (dark) ── */}
      <section className="cp-why">
        <div className="cp-why-inner">
          <Reveal>
            <div className="cp-why-head">
              <div className="cp-why-badge">Why They Choose Us</div>
              <h2>What Sets Nixol Apart</h2>
            </div>
          </Reveal>
          <div className="cp-why-grid">
            {WHY.map(({ icon, label, desc }, i) => (
              <Reveal key={label} delay={i * 80}>
                <div className="cp-why-card">
                  <div className="cp-why-icon">{icon}</div>
                  <h3>{label}</h3>
                  <p>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="cp-industries">
        <Reveal>
          <div className="cp-industries-inner">
            <p className="cp-industries-label">Industries We Serve</p>
            <div className="cp-tags-wrap">
              {INDUSTRIES.map(ind => <span key={ind} className="cp-tag">{ind}</span>)}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── CTA ── */}
      <section className="cp-cta">
        <div className="cp-cta-glow" />
        <Reveal>
          <div className="cp-cta-inner">
            <h2>Ready to Join Our Client Family?</h2>
            <p>Let's explore how Nixol can help your organization operate smarter, grow stronger, and achieve its strategic goals.</p>
            <div className="cp-cta-btns">
              <Link to="/booking" className="btn-primary">Book a Consultation</Link>
              <Link to="/contact" className="btn-outline">Get In Touch</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  )
}