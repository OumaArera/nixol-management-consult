import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

const gold = '#C9A84C'
const s400  = '#B0BCCC'
const s500  = '#8B9BB4'

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

const SERVICES = [
  {
    icon: '🏛️',
    title: 'Management & Advisory',
    tagline: 'Strategic Guidance for Stronger Leadership and Organizational Performance',
    overview: 'Management Advisory at Nixol supports executives, boards, and business leaders with the insights, frameworks, and decision support needed to navigate organizational challenges and drive sustainable performance.',
    items: [
      { sub: 'Executive Decision Support', bullets: ['Scenario planning and strategic options analysis', 'Financial impact assessments for major decisions', 'Board-level reporting and insights', 'Leadership coaching on financial and operational priorities'] },
      { sub: 'Organizational Performance Advisory', bullets: ['Performance measurement frameworks (KPIs, scorecards, dashboards)', 'Departmental performance reviews', 'Resource allocation and prioritization', 'Efficiency and productivity improvement strategies'] },
      { sub: 'Governance, Risk & Internal Controls', bullets: ['Governance structure evaluation', 'Risk assessment and mitigation planning', 'Internal control design and enhancement', 'Policy and procedure development'] },
      { sub: 'Change Management & Transformation', bullets: ['Organizational restructuring guidance', 'Process transformation and modernization', 'Technology adoption and ERP transition advisory', 'Stakeholder alignment and communication planning'] },
      { sub: 'Strategic Planning & Execution', bullets: ['Multi-year strategic plan development', 'Goal setting and performance tracking', 'Market and competitive positioning', 'Growth, expansion, and sustainability strategies'] },
    ],
  },
  {
    icon: '📊',
    title: 'Financial Management & Advisory',
    tagline: 'Strengthening Financial Performance and Strategic Decision-Making',
    overview: 'Nixol equips organizations with the financial intelligence, systems, and insights needed to operate confidently and make informed decisions — blending rigorous analysis with modern financial tools.',
    items: [
      { sub: 'Budgeting, Forecasting & Financial Modeling', bullets: ['Multi-scenario forecasting for revenue, expenses, and cash flow', 'Driver-based financial models for planning and decision-making', 'Budget development and variance analysis', 'Long-range financial planning aligned with organizational goals'] },
      { sub: 'Cash Flow & Working Capital Optimization', bullets: ['Cash flow diagnostics and liquidity planning', 'Working capital improvement strategies', 'Cost-reduction and margin-enhancement initiatives', 'Financial risk identification and mitigation'] },
      { sub: 'Financial Reporting & Performance Insights', bullets: ['Monthly, quarterly, and annual reporting packages', 'KPI dashboards and performance scorecards', 'Trend, variance, and profitability analysis', 'Executive-ready insights for board and leadership teams'] },
      { sub: 'Cost Analysis & Profitability Improvement', bullets: ['Cost structure evaluation and cost-saving opportunities', 'Product, service, or program profitability analysis', 'Break-even and contribution margin modeling', 'Pricing strategy support'] },
      { sub: 'Finance Function Support & Optimization', bullets: ['Month-end close process improvement', 'ERP and accounting system optimization', 'Internal controls and financial governance', 'Interim or fractional financial leadership support'] },
    ],
  },
  {
    icon: '🚀',
    title: 'Business Strategy & Growth Consulting',
    tagline: 'Strategic Direction for Sustainable, Scalable Growth',
    overview: 'Nixol helps organizations define their strategic path, strengthen competitive positioning, and execute growth initiatives with clarity and discipline — blending market analysis, financial insight, and operational expertise.',
    items: [
      { sub: 'Strategic Planning & Execution', bullets: ['Multi-year strategic plan development', 'Organizational goal setting and prioritization', 'Strategy execution frameworks and performance tracking', 'Alignment of financial, operational, and strategic objectives'] },
      { sub: 'Market & Competitive Analysis', bullets: ['Industry and market landscape assessments', 'Competitor benchmarking and positioning analysis', 'Customer segmentation and value-proposition refinement', 'Opportunity identification and risk evaluation'] },
      { sub: 'Business Model Development & Optimization', bullets: ['Business model design and validation', 'Revenue model analysis and optimization', 'Cost structure evaluation', 'Scalability and operational feasibility assessments'] },
      { sub: 'Growth & Expansion Advisory', bullets: ['Expansion strategy (geographic, product, or service)', 'Investment readiness and financial planning', 'Partnership and stakeholder strategy', 'Change readiness and organizational capability assessment'] },
      { sub: 'Performance Improvement & Transformation', bullets: ['Operational efficiency assessments', 'Process redesign and transformation roadmaps', 'KPI development and performance dashboards', 'Cross-functional alignment and execution support'] },
    ],
  },
  {
    icon: '📋',
    title: 'Accounting & Compliance Services',
    tagline: 'Strengthening Financial Accuracy, Transparency, and Regulatory Confidence',
    overview: 'Nixol provides organizations with reliable financial reporting, strong internal controls, and governance structures needed to operate with confidence — especially valuable for organizations that need professional accounting rigor without the cost of a full in-house team.',
    items: [
      { sub: 'Bookkeeping & Financial Statement Preparation', bullets: ['Full-cycle bookkeeping', 'Monthly, quarterly, and annual financial statements', 'Bank and account reconciliations', 'Chart of accounts setup and maintenance', 'Donor-restricted and grant accounting (for nonprofits)'] },
      { sub: 'Internal Controls & Compliance', bullets: ['Internal control design and evaluation', 'Policy and procedure development', 'Segregation of duties and fraud-risk mitigation', 'Compliance with GAAP and regulatory standards', 'Documentation and workflow standardization'] },
      { sub: 'Audit Readiness & Support', bullets: ['Pre-audit financial review', 'Supporting schedules and documentation', 'Liaison with external auditors', 'Corrective action planning and remediation'] },
      { sub: 'Accounting System & ERP Optimization', bullets: ['ERP and accounting software setup or migration', 'Process automation and workflow optimization', 'Data cleanup and system configuration', 'Staff training and ongoing support'] },
      { sub: 'Regulatory & Reporting Compliance', bullets: ['Tax-exempt and nonprofit reporting support', 'Grant and donor reporting', 'Compliance calendars and filing reminders', 'Board and stakeholder reporting packages'] },
    ],
  },
  {
    icon: '⚙️',
    title: 'Operations & Process Optimization',
    tagline: 'Building Efficient, Scalable, and High-Performing Operations',
    overview: 'Nixol strengthens the systems, workflows, and structures that drive day-to-day performance — eliminating inefficiencies, improving productivity, and aligning operations with strategic goals.',
    items: [
      { sub: 'Workflow Assessment & Redesign', bullets: ['End-to-end process mapping', 'Identification of bottlenecks, redundancies, and inefficiencies', 'Redesign of workflows for speed, accuracy, and scalability', 'Standard operating procedures (SOPs) development'] },
      { sub: 'Operational Efficiency & Productivity', bullets: ['Time-and-motion analysis', 'Resource utilization and capacity planning', 'Productivity enhancement strategies', 'Cross-departmental alignment and communication improvements'] },
      { sub: 'Policy, Procedure & Controls Development', bullets: ['Policy and procedure creation or modernization', 'Internal control design and implementation', 'Compliance alignment with industry standards', 'Documentation frameworks for operational consistency'] },
      { sub: 'Technology Integration & Automation', bullets: ['ERP and system workflow optimization', 'Automation of repetitive tasks', 'Digital transformation readiness assessments', 'System selection support and implementation guidance'] },
      { sub: 'Performance Measurement & Continuous Improvement', bullets: ['KPI development and operational dashboards', 'Performance tracking and reporting', 'Continuous improvement frameworks (Lean, Kaizen, Six Sigma)', 'Ongoing advisory for operational excellence'] },
    ],
  },
]

function ServicePanel({ service, idx }) {
  const [open, setOpen] = useState(false)
  const ref = useReveal()
  return (
    <div ref={ref} style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
      <div style={{ background: '#0B1D3A', border: `1px solid ${open ? 'rgba(201,168,76,0.35)' : 'rgba(26,58,107,0.7)'}`, borderRadius: '14px', overflow: 'hidden', transition: 'border-color 0.3s' }}>
        {/* Header */}
        <button
          onClick={() => setOpen(o => !o)}
          style={{ width: '100%', padding: '1.75rem 2rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
        >
          <span style={{ fontSize: '2rem', flexShrink: 0, marginTop: '2px' }}>{service.icon}</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: gold, margin: '0 0 0.3rem' }}>
              Service {String(idx + 1).padStart(2, '0')}
            </p>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: '#fff', margin: '0 0 0.4rem' }}>{service.title}</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: s500, margin: 0, lineHeight: 1.5 }}>{service.tagline}</p>
          </div>
          <span style={{ color: gold, fontSize: '1.1rem', flexShrink: 0, marginTop: '4px', transition: 'transform 0.3s', transform: open ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
        </button>

        {/* Expandable body */}
        <div style={{ maxHeight: open ? '1200px' : '0', overflow: 'hidden', transition: 'max-height 0.5s ease' }}>
          <div style={{ padding: '0 2rem 2rem', borderTop: '1px solid rgba(26,58,107,0.5)' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.87rem', color: s400, lineHeight: 1.8, margin: '1.5rem 0 1.75rem' }}>
              {service.overview}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              {service.items.map(({ sub, bullets }) => (
                <div key={sub} style={{ padding: '1.25rem', background: '#04101F', border: '1px solid rgba(26,58,107,0.5)', borderRadius: '10px' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: '0.75rem' }}>{sub}</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                    {bullets.map(b => (
                      <li key={b} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: s500, lineHeight: 1.5 }}>
                        <span style={{ color: gold, flexShrink: 0, marginTop: '2px' }}>›</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <main style={{ paddingTop: '6rem', minHeight: '100vh', background: '#04101F' }}>
      {/* Header */}
      <section style={{ position: 'relative', padding: '4rem 1.75rem 3rem', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #0B1D3A, #04101F)' }} />
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '500px', height: '300px', background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto' }}>
          <span style={{ display: 'inline-block', padding: '0.35rem 1.1rem', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '999px', fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: gold, marginBottom: '1.25rem' }}>
            Our Expertise
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: 700, color: '#fff', marginBottom: '1rem', lineHeight: 1.1 }}>
            Services Designed for Impact
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: s400, lineHeight: 1.75 }}>
            Every engagement is bespoke — shaped by your sector, your ambitions, and the specific challenge on the table. Click any service to explore the full scope.
          </p>
        </div>
      </section>

      {/* Accordion */}
      <section style={{ padding: '2rem 1.75rem 5rem', maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {SERVICES.map((s, i) => <ServicePanel key={s.title} service={s} idx={i} />)}
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 1.75rem', textAlign: 'center', borderTop: '1px solid rgba(26,58,107,0.5)' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: s400, marginBottom: '1.5rem', lineHeight: 1.7 }}>
          Don't see exactly what you need? Every engagement can be tailored to your specific situation.
        </p>
        <Link to="/booking" style={{ display: 'inline-block', padding: '0.9rem 2.25rem', background: gold, color: '#0B1D3A', fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '7px', transition: 'all 0.25s' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#d4b86a'; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.background = gold; e.currentTarget.style.transform = 'none' }}>
          Schedule a Consultation
        </Link>
      </section>
    </main>
  )
}