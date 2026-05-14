import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

function useReveal(threshold = 0.12) {
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

const SERVICES = [
  {
    icon: '🏛️',
    title: 'Management & Advisory',
    tagline: 'Strategic Guidance for Stronger Leadership',
    color: '#1e40af',
    overview: 'Management Advisory at Nixol supports executives, boards, and business leaders with the insights, frameworks, and decision support needed to navigate organizational challenges and drive sustainable performance.',
    items: [
      { sub: 'Executive Decision Support', bullets: ['Scenario planning and strategic options analysis', 'Financial impact assessments for major decisions', 'Board-level reporting and insights', 'Leadership coaching on financial and operational priorities'] },
      { sub: 'Organizational Performance', bullets: ['Performance measurement frameworks (KPIs, scorecards)', 'Departmental performance reviews', 'Resource allocation and prioritization', 'Efficiency and productivity improvement strategies'] },
      { sub: 'Governance, Risk & Controls', bullets: ['Governance structure evaluation', 'Risk assessment and mitigation planning', 'Internal control design and enhancement', 'Policy and procedure development'] },
      { sub: 'Change & Transformation', bullets: ['Organizational restructuring guidance', 'Process transformation and modernization', 'Technology adoption and ERP transition advisory', 'Stakeholder alignment and communication planning'] },
      { sub: 'Strategic Planning', bullets: ['Multi-year strategic plan development', 'Goal setting and performance tracking', 'Market and competitive positioning', 'Growth, expansion, and sustainability strategies'] },
    ],
  },
  {
    icon: '📊',
    title: 'Financial Management',
    tagline: 'Strengthening Financial Performance & Decision-Making',
    color: '#1d4ed8',
    overview: 'Nixol equips organizations with the financial intelligence, systems, and insights needed to operate confidently — blending rigorous analysis with modern financial tools.',
    items: [
      { sub: 'Budgeting & Forecasting', bullets: ['Multi-scenario forecasting for revenue and expenses', 'Driver-based financial models for planning', 'Budget development and variance analysis', 'Long-range financial planning aligned with goals'] },
      { sub: 'Cash Flow Optimization', bullets: ['Cash flow diagnostics and liquidity planning', 'Working capital improvement strategies', 'Cost-reduction and margin-enhancement initiatives', 'Financial risk identification and mitigation'] },
      { sub: 'Reporting & Insights', bullets: ['Monthly, quarterly, and annual reporting packages', 'KPI dashboards and performance scorecards', 'Trend, variance, and profitability analysis', 'Executive-ready board and leadership insights'] },
      { sub: 'Cost & Profitability', bullets: ['Cost structure evaluation and savings opportunities', 'Product or program profitability analysis', 'Break-even and contribution margin modeling', 'Pricing strategy support'] },
      { sub: 'Finance Function Support', bullets: ['Month-end close process improvement', 'ERP and accounting system optimization', 'Internal controls and financial governance', 'Interim or fractional financial leadership'] },
    ],
  },
  {
    icon: '🚀',
    title: 'Business Strategy & Growth',
    tagline: 'Strategic Direction for Scalable, Sustainable Growth',
    color: '#1e3a8a',
    overview: 'Nixol helps organizations define their strategic path, strengthen competitive positioning, and execute growth initiatives with clarity and discipline.',
    items: [
      { sub: 'Strategic Planning', bullets: ['Multi-year strategic plan development', 'Organizational goal setting and prioritization', 'Strategy execution frameworks and tracking', 'Alignment of financial and strategic objectives'] },
      { sub: 'Market & Competitive Analysis', bullets: ['Industry and market landscape assessments', 'Competitor benchmarking and positioning analysis', 'Customer segmentation and value-proposition refinement', 'Opportunity identification and risk evaluation'] },
      { sub: 'Business Model Development', bullets: ['Business model design and validation', 'Revenue model analysis and optimization', 'Cost structure evaluation', 'Scalability and feasibility assessments'] },
      { sub: 'Growth & Expansion', bullets: ['Expansion strategy (geographic, product, service)', 'Investment readiness and financial planning', 'Partnership and stakeholder strategy', 'Change readiness and capability assessment'] },
      { sub: 'Performance Improvement', bullets: ['Operational efficiency assessments', 'Process redesign and transformation roadmaps', 'KPI development and performance dashboards', 'Cross-functional alignment and execution support'] },
    ],
  },
  {
    icon: '📋',
    title: 'Accounting & Compliance',
    tagline: 'Financial Accuracy, Transparency & Regulatory Confidence',
    color: '#1e40af',
    overview: 'Nixol provides organizations with reliable financial reporting, strong internal controls, and governance structures — especially valuable for those needing professional accounting rigor without full in-house overhead.',
    items: [
      { sub: 'Bookkeeping & Financial Statements', bullets: ['Full-cycle bookkeeping', 'Monthly, quarterly, and annual financial statements', 'Bank and account reconciliations', 'Chart of accounts setup and maintenance', 'Donor-restricted and grant accounting'] },
      { sub: 'Internal Controls & Compliance', bullets: ['Internal control design and evaluation', 'Policy and procedure development', 'Segregation of duties and fraud-risk mitigation', 'Compliance with GAAP and regulatory standards'] },
      { sub: 'Audit Readiness', bullets: ['Pre-audit financial review', 'Supporting schedules and documentation', 'Liaison with external auditors', 'Corrective action planning and remediation'] },
      { sub: 'ERP & System Optimization', bullets: ['ERP and accounting software setup or migration', 'Process automation and workflow optimization', 'Data cleanup and system configuration', 'Staff training and ongoing support'] },
      { sub: 'Regulatory Reporting', bullets: ['Tax-exempt and nonprofit reporting support', 'Grant and donor reporting', 'Compliance calendars and filing reminders', 'Board and stakeholder reporting packages'] },
    ],
  },
  {
    icon: '⚙️',
    title: 'Operations Optimization',
    tagline: 'Efficient, Scalable & High-Performing Operations',
    color: '#1d4ed8',
    overview: 'Nixol strengthens the systems, workflows, and structures that drive day-to-day performance — eliminating inefficiencies, improving productivity, and aligning operations with strategic goals.',
    items: [
      { sub: 'Workflow Assessment & Redesign', bullets: ['End-to-end process mapping', 'Identification of bottlenecks and redundancies', 'Redesign for speed, accuracy, and scalability', 'Standard operating procedures (SOPs) development'] },
      { sub: 'Efficiency & Productivity', bullets: ['Time-and-motion analysis', 'Resource utilization and capacity planning', 'Productivity enhancement strategies', 'Cross-departmental alignment improvements'] },
      { sub: 'Policy & Controls', bullets: ['Policy and procedure creation or modernization', 'Internal control design and implementation', 'Compliance alignment with industry standards', 'Documentation frameworks for consistency'] },
      { sub: 'Technology & Automation', bullets: ['ERP and system workflow optimization', 'Automation of repetitive tasks', 'Digital transformation readiness assessments', 'System selection and implementation guidance'] },
      { sub: 'Continuous Improvement', bullets: ['KPI development and operational dashboards', 'Performance tracking and reporting', 'Lean, Kaizen, Six Sigma frameworks', 'Ongoing advisory for operational excellence'] },
    ],
  },
  {
    icon: '🏥',
    title: 'Healthcare Consulting',
    tagline: 'Specialist Advisory for Healthcare & Medical Organizations',
    color: '#1e3a8a',
    isNew: true,
    overview: 'In partnership with healthcare specialist David, Nixol delivers focused consulting services for healthcare facilities — combining financial expertise with deep sector knowledge to improve performance, compliance, and patient-centred operations.',
    items: [
      { sub: 'Healthcare Financial Management', bullets: ['Revenue cycle optimization', 'Healthcare budgeting and forecasting', 'Cost reduction and profitability analysis', 'Grant and funding management'] },
      { sub: 'Regulatory & Compliance', bullets: ['Healthcare regulatory compliance frameworks', 'Policy and procedure development', 'Audit readiness for healthcare organizations', 'Risk management and internal controls'] },
      { sub: 'Operational Efficiency', bullets: ['Clinical workflow assessment and redesign', 'Resource utilization and capacity planning', 'Staff productivity and performance frameworks', 'Supply chain and procurement optimization'] },
      { sub: 'Strategic Growth & Planning', bullets: ['Healthcare facility expansion strategy', 'Partnership and referral network development', 'Market entry and feasibility assessments', 'Investment readiness for healthcare ventures'] },
      { sub: 'Technology & Systems', bullets: ['Health information system (HIS) advisory', 'ERP and billing system optimization', 'Digital health readiness assessment', 'Data analytics for clinical decision-making'] },
    ],
  },
]

function ServiceCard({ service, idx, isActive, onClick }) {
  const ref = useReveal()
  return (
    <div ref={ref} className="reveal-block" style={{ '--delay': `${idx * 60}ms` }}>
      <button
        className={`svc-tab ${isActive ? 'svc-tab-active' : ''}`}
        onClick={onClick}
      >
        <span className="svc-tab-icon">{service.icon}</span>
        <div className="svc-tab-text">
          <span className="svc-tab-num">0{idx + 1}</span>
          <span className="svc-tab-title">{service.title}</span>
          <span className="svc-tab-tagline">{service.tagline}</span>
        </div>
        {service.isNew && <span className="svc-new-badge">New</span>}
        <span className={`svc-tab-arrow ${isActive ? 'svc-tab-arrow-active' : ''}`}>›</span>
      </button>
    </div>
  )
}

function ServiceDetail({ service, visible }) {
  return (
    <div className={`svc-detail ${visible ? 'svc-detail-visible' : ''}`}>
      <div className="svc-detail-header">
        <span className="svc-detail-icon">{service.icon}</span>
        <div>
          {service.isNew && (
            <span className="svc-detail-new">New · In Partnership</span>
          )}
          <h2 className="svc-detail-title">{service.title}</h2>
          <p className="svc-detail-tagline">{service.tagline}</p>
        </div>
      </div>
      <p className="svc-detail-overview">{service.overview}</p>
      <div className="svc-bullets-grid">
        {service.items.map(({ sub, bullets }) => (
          <div key={sub} className="svc-bullet-card">
            <h4 className="svc-bullet-sub">{sub}</h4>
            <ul className="svc-bullet-list">
              {bullets.map(b => (
                <li key={b} className="svc-bullet-item">
                  <span className="svc-bullet-dot" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="svc-detail-cta">
        <Link to="/booking" className="btn-primary-sm">Book a Consultation →</Link>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  const [active, setActive] = useState(0)
  const detailRef = useRef(null)

  const handleSelect = (idx) => {
    setActive(idx)
    if (window.innerWidth < 900 && detailRef.current) {
      setTimeout(() => detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
    }
  }

  return (
    <main className="sp-main">
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
        .sp-main { font-family: 'Segoe UI', system-ui, sans-serif; overflow-x: hidden; background: #f3f4f6; }

        /* ── Reveal ── */
        .reveal-block { opacity: 0; transform: translateY(24px); transition: opacity 0.65s ease var(--delay,0ms), transform 0.65s ease var(--delay,0ms); }
        .reveal-block.revealed { opacity: 1; transform: translateY(0); }

        /* ── Hero ── */
        .sp-hero {
          position: relative;
          padding: 6rem 2rem 4rem;
          background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 60%, #1d4ed8 100%);
          overflow: hidden;
          text-align: center;
        }
        .sp-hero-grid {
          position: absolute; inset: 0; opacity: 0.04;
          background-image:
            repeating-linear-gradient(90deg,#f97316 0,#f97316 1px,transparent 1px,transparent 64px),
            repeating-linear-gradient(0deg,#f97316 0,#f97316 1px,transparent 1px,transparent 64px);
        }
        .sp-hero-glow {
          position: absolute; top: -10%; right: 10%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%);
          border-radius: 50%;
        }
        .sp-hero-inner { position: relative; z-index: 1; max-width: 760px; margin: 0 auto; }
        .sp-hero-badge {
          display: inline-block; padding: 0.38rem 1.2rem;
          border: 1px solid rgba(249,115,22,0.4); border-radius: 999px;
          font-size: 0.6rem; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase;
          color: #fdba74; background: rgba(249,115,22,0.08); margin-bottom: 1.4rem;
        }
        .sp-hero h1 {
          font-size: clamp(2.4rem,6vw,4rem); font-weight: 800; color: #fff;
          line-height: 1.08; margin-bottom: 1.25rem;
        }
        .sp-hero h1 span { color: #fb923c; }
        .sp-hero-sub { font-size: 0.98rem; color: #bfdbfe; line-height: 1.8; max-width: 580px; margin: 0 auto 2.5rem; }
        .sp-hero-stats {
          display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; margin-top: 2.5rem;
        }
        .sp-hero-stat {
          padding: 0.6rem 1.4rem;
          background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.13);
          border-radius: 10px; text-align: center;
        }
        .sp-hero-stat strong { display: block; font-size: 1.4rem; font-weight: 800; color: #fb923c; }
        .sp-hero-stat span { font-size: 0.62rem; letter-spacing: 0.18em; text-transform: uppercase; color: #bfdbfe; font-weight: 600; }

        /* ── Layout shell ── */
        .sp-layout {
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: 0;
          max-width: 1340px;
          margin: 2.5rem auto;
          padding: 0 1.5rem 5rem;
          align-items: start;
        }
        @media (max-width: 900px) {
          .sp-layout { grid-template-columns: 1fr; }
        }

        /* ── Tab sidebar ── */
        .sp-sidebar { position: sticky; top: 5rem; display: flex; flex-direction: column; gap: 0.55rem; }
        .svc-tab {
          width: 100%; display: flex; align-items: center; gap: 1rem;
          padding: 1.1rem 1.25rem; background: #fff;
          border: 1px solid rgba(30,64,175,0.1); border-radius: 14px;
          cursor: pointer; text-align: left; transition: all 0.25s;
          box-shadow: 0 2px 8px rgba(30,58,138,0.05);
          position: relative; overflow: hidden;
        }
        .svc-tab::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
          background: #f97316; transform: scaleY(0); transform-origin: bottom;
          transition: transform 0.3s ease; border-radius: 0 2px 2px 0;
        }
        .svc-tab:hover { border-color: rgba(249,115,22,0.35); transform: translateX(3px); box-shadow: 0 6px 20px rgba(30,58,138,0.1); }
        .svc-tab:hover::before { transform: scaleY(1); }
        .svc-tab-active { border-color: rgba(249,115,22,0.5) !important; background: #fff7f0 !important; transform: translateX(5px) !important; box-shadow: 0 8px 28px rgba(249,115,22,0.15) !important; }
        .svc-tab-active::before { transform: scaleY(1) !important; }
        .svc-tab-icon { font-size: 1.5rem; flex-shrink: 0; }
        .svc-tab-text { flex: 1; min-width: 0; }
        .svc-tab-num { display: block; font-size: 0.55rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #f97316; margin-bottom: 0.15rem; }
        .svc-tab-title { display: block; font-size: 0.92rem; font-weight: 700; color: #1e3a8a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 0.15rem; }
        .svc-tab-tagline { display: block; font-size: 0.72rem; color: #6b7280; line-height: 1.4; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .svc-new-badge {
          padding: 0.18rem 0.55rem; background: rgba(249,115,22,0.1); border: 1px solid rgba(249,115,22,0.3);
          border-radius: 999px; font-size: 0.55rem; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: #f97316; flex-shrink: 0;
        }
        .svc-tab-arrow { font-size: 1.3rem; color: #d1d5db; flex-shrink: 0; transition: all 0.3s; line-height: 1; }
        .svc-tab-arrow-active { color: #f97316; transform: rotate(90deg); }
        .svc-tab:hover .svc-tab-arrow { color: #f97316; }

        /* ── Detail panel ── */
        .sp-detail-wrap { padding-left: 2rem; }
        @media (max-width: 900px) { .sp-detail-wrap { padding-left: 0; margin-top: 1.5rem; } }

        .svc-detail {
          background: #fff; border: 1px solid rgba(30,64,175,0.1);
          border-radius: 20px; padding: 2.5rem;
          box-shadow: 0 4px 24px rgba(30,58,138,0.08);
          opacity: 0; transform: translateY(12px) scale(0.99);
          transition: opacity 0.4s ease, transform 0.4s ease;
          pointer-events: none;
          display: none;
        }
        .svc-detail-visible {
          opacity: 1 !important; transform: translateY(0) scale(1) !important;
          pointer-events: all !important; display: block !important;
        }

        .svc-detail-header {
          display: flex; gap: 1.5rem; align-items: flex-start;
          margin-bottom: 1.5rem; padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(30,64,175,0.08);
        }
        .svc-detail-icon { font-size: 3rem; flex-shrink: 0; line-height: 1; }
        .svc-detail-new {
          display: inline-block; padding: 0.2rem 0.7rem;
          background: rgba(249,115,22,0.08); border: 1px solid rgba(249,115,22,0.3);
          border-radius: 999px; font-size: 0.6rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase; color: #f97316; margin-bottom: 0.6rem;
        }
        .svc-detail-title { font-size: clamp(1.5rem,3vw,2.2rem); font-weight: 800; color: #1e3a8a; margin: 0 0 0.3rem; line-height: 1.15; }
        .svc-detail-tagline { font-size: 0.87rem; color: #6b7280; margin: 0; line-height: 1.5; }
        .svc-detail-overview { font-size: 0.92rem; color: #374151; line-height: 1.85; margin-bottom: 2rem; padding: 1.25rem 1.5rem; background: #f3f4f6; border-left: 3px solid #f97316; border-radius: 0 10px 10px 0; }

        .svc-bullets-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
        .svc-bullet-card {
          padding: 1.2rem 1.35rem; background: #f9fafb;
          border: 1px solid rgba(30,64,175,0.09); border-radius: 12px;
          transition: all 0.25s;
        }
        .svc-bullet-card:hover { border-color: rgba(249,115,22,0.3); background: #fff7f0; transform: translateY(-2px); box-shadow: 0 6px 18px rgba(249,115,22,0.1); }
        .svc-bullet-sub { font-size: 0.87rem; font-weight: 700; color: #1e3a8a; margin: 0 0 0.75rem; }
        .svc-bullet-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.45rem; }
        .svc-bullet-item { display: flex; gap: 0.55rem; align-items: flex-start; font-size: 0.78rem; color: #4b5563; line-height: 1.55; }
        .svc-bullet-dot { width: 5px; height: 5px; background: #f97316; border-radius: 50%; flex-shrink: 0; margin-top: 5px; }

        .svc-detail-cta { display: flex; align-items: center; gap: 1.25rem; padding-top: 1.5rem; border-top: 1px solid rgba(30,64,175,0.08); }
        .btn-primary-sm {
          padding: 0.8rem 2rem; background: #f97316; color: #fff;
          font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
          text-decoration: none; border-radius: 8px; transition: all 0.25s; display: inline-block;
        }
        .btn-primary-sm:hover { background: #ea6c0a; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(249,115,22,0.35); }

        /* ── CTA ── */
        .sp-cta {
          position: relative; padding: 5rem 2rem; text-align: center; overflow: hidden;
          background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
        }
        .sp-cta-glow { position: absolute; inset: 0; background-image: radial-gradient(circle at 30% 50%, rgba(249,115,22,0.1) 0%, transparent 55%); }
        .sp-cta-inner { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; }
        .sp-cta h2 { font-size: clamp(1.8rem,4vw,2.8rem); font-weight: 800; color: #fff; margin-bottom: 1rem; line-height: 1.2; }
        .sp-cta p { font-size: 0.95rem; color: #bfdbfe; line-height: 1.75; margin-bottom: 2.25rem; }
        .sp-cta-btns { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }
        .btn-primary { padding: 0.9rem 2.25rem; background: #f97316; color: #fff; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none; border-radius: 8px; transition: all 0.25s; display: inline-block; }
        .btn-primary:hover { background: #ea6c0a; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(249,115,22,0.35); }
        .btn-outline { padding: 0.9rem 2.25rem; border: 1px solid rgba(191,219,254,0.4); color: #bfdbfe; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none; border-radius: 8px; transition: all 0.25s; background: transparent; display: inline-block; }
        .btn-outline:hover { border-color: #f97316; color: #fff; }

        /* ── Mobile accordion ── */
        @media (max-width: 900px) {
          .sp-sidebar { position: static; }
          .svc-tab-tagline { display: none; }
          .sp-detail-wrap .svc-detail { display: none; }
          .sp-detail-wrap .svc-detail.svc-detail-visible { display: block; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="sp-hero">
        <div className="sp-hero-grid" />
        <div className="sp-hero-glow" />
        <Reveal>
          <div className="sp-hero-inner">
            <div className="sp-hero-badge">Our Expertise — Full Service Scope</div>
            <h1>Services Designed<br />for <span>Impact</span></h1>
            <p className="sp-hero-sub">
              Every engagement is bespoke — shaped by your sector, your ambitions, and the specific challenge on the table. Select a service to explore the full scope.
            </p>
            <div className="sp-hero-stats">
              {[
                { val: '6+', lbl: 'Service Verticals' },
                { val: '7',  lbl: 'Industries Served' },
                { val: '100%', lbl: 'Client-Centric' },
                { val: '24h',  lbl: 'Response Time' },
              ].map(s => (
                <div key={s.lbl} className="sp-hero-stat">
                  <strong>{s.val}</strong>
                  <span>{s.lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── SPLIT LAYOUT ── */}
      <div className="sp-layout">
        {/* Sidebar tabs */}
        <nav className="sp-sidebar">
          {SERVICES.map((s, i) => (
            <ServiceCard
              key={s.title}
              service={s}
              idx={i}
              isActive={active === i}
              onClick={() => handleSelect(i)}
            />
          ))}
        </nav>

        {/* Detail panel */}
        <div className="sp-detail-wrap" ref={detailRef}>
          {SERVICES.map((s, i) => (
            <ServiceDetail key={s.title} service={s} visible={active === i} />
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <section className="sp-cta">
        <div className="sp-cta-glow" />
        <Reveal>
          <div className="sp-cta-inner">
            <h2>Ready to Operate Smarter and Grow Stronger?</h2>
            <p>Don't see exactly what you need? Every engagement can be tailored to your specific situation. Let's start with a conversation.</p>
            <div className="sp-cta-btns">
              <Link to="/booking" className="btn-primary">Schedule a Consultation</Link>
              <Link to="/contact" className="btn-outline">Contact Us</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  )
}