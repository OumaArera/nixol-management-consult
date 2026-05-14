import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// ── Reveal hook (matches ServicesPage) ───────────────────────────────────────
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

function Reveal({ children, delay = 0 }) {
  const ref = useReveal()
  return (
    <div ref={ref} className="reveal-block" style={{ '--delay': `${delay}ms` }}>
      {children}
    </div>
  )
}

// ── Data ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  'Management & Advisory',
  'Financial Management & Advisory',
  'Business Strategy & Growth Consulting',
  'Accounting & Compliance Services',
  'Operations & Process Optimization',
  'Healthcare Consulting',
  'Other / General Inquiry',
]

const CONTACT_INFO = [
  { icon: '📞', label: 'Phone',   val: '+1 (325) 703-0636' },
  { icon: '📧', label: 'Email',   val: 'info@nixolmc.com' },
  { icon: '🌐', label: 'Website', val: 'www.nixolmc.com' },
  { icon: '🕐', label: 'Hours',   val: 'Mon – Fri: 9AM – 6PM EST' },
  { icon: '🏢', label: 'EIN',     val: '42-1824156' },
]

// ── Component ─────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', service: '', message: '',
  })
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <main className="cp-main">
      <style>{`
        /* ── Tokens (mirrors ServicesPage) ── */
        :root {
          --blue:    #1e40af;
          --blue2:   #1d4ed8;
          --blue3:   #1e3a8a;
          --orange:  #f97316;
          --orange2: #ea6c0a;
          --white:   #ffffff;
          --gray50:  #f9fafb;
          --gray100: #f3f4f6;
          --gray600: #4b5563;
          --gray700: #374151;
        }

        /* ── Base ── */
        .cp-main {
          font-family: 'Segoe UI', system-ui, sans-serif;
          overflow-x: hidden;
          background: #f3f4f6;
        }

        /* ── Reveal (identical to ServicesPage) ── */
        .reveal-block {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.65s ease var(--delay, 0ms), transform 0.65s ease var(--delay, 0ms);
        }
        .reveal-block.revealed { opacity: 1; transform: translateY(0); }

        /* ── Hero ── */
        .cp-hero {
          position: relative;
          padding: 6rem 2rem 4rem;
          background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 60%, #1d4ed8 100%);
          overflow: hidden;
          text-align: center;
        }
        .cp-hero-grid {
          position: absolute; inset: 0; opacity: 0.04;
          background-image:
            repeating-linear-gradient(90deg, #f97316 0, #f97316 1px, transparent 1px, transparent 64px),
            repeating-linear-gradient(0deg,  #f97316 0, #f97316 1px, transparent 1px, transparent 64px);
        }
        .cp-hero-glow {
          position: absolute; top: -10%; right: 10%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%);
          border-radius: 50%;
        }
        .cp-hero-inner { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; }
        .cp-hero-badge {
          display: inline-block; padding: 0.38rem 1.2rem;
          border: 1px solid rgba(249,115,22,0.4); border-radius: 999px;
          font-size: 0.6rem; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase;
          color: #fdba74; background: rgba(249,115,22,0.08); margin-bottom: 1.4rem;
        }
        .cp-hero h1 {
          font-size: clamp(2.4rem, 6vw, 4rem); font-weight: 800; color: #fff;
          line-height: 1.08; margin-bottom: 1.25rem;
        }
        .cp-hero h1 span { color: #fb923c; }
        .cp-hero-sub {
          font-size: 0.98rem; color: #bfdbfe; line-height: 1.8;
          max-width: 520px; margin: 0 auto 2.5rem;
        }
        .cp-hero-stats {
          display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; margin-top: 2rem;
        }
        .cp-hero-stat {
          padding: 0.6rem 1.4rem;
          background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.13);
          border-radius: 10px; text-align: center;
        }
        .cp-hero-stat strong { display: block; font-size: 1.4rem; font-weight: 800; color: #fb923c; }
        .cp-hero-stat span   { font-size: 0.62rem; letter-spacing: 0.18em; text-transform: uppercase; color: #bfdbfe; font-weight: 600; }

        /* ── Layout ── */
        .cp-layout {
          display: grid;
          grid-template-columns: 310px 1fr;
          gap: 2rem;
          max-width: 1280px;
          margin: 2.5rem auto;
          padding: 0 1.5rem 5rem;
          align-items: start;
        }
        @media (max-width: 900px) { .cp-layout { grid-template-columns: 1fr; } }

        /* ── Sidebar ── */
        .cp-sidebar { display: flex; flex-direction: column; gap: 1rem; position: sticky; top: 5rem; }
        @media (max-width: 900px) { .cp-sidebar { position: static; } }

        /* ── Cards (shared) ── */
        .cp-card {
          background: #fff;
          border: 1px solid rgba(30,64,175,0.1);
          border-radius: 16px;
          padding: 1.75rem;
          box-shadow: 0 4px 20px rgba(30,58,138,0.07);
        }
        .cp-card-title {
          font-size: 1.05rem; font-weight: 800; color: #1e3a8a;
          margin-bottom: 1.35rem; padding-bottom: 0.8rem;
          border-bottom: 1px solid rgba(30,64,175,0.08);
        }

        /* ── Contact info rows ── */
        .ci-row { display: flex; gap: 0.9rem; align-items: flex-start; margin-bottom: 1rem; }
        .ci-row:last-child { margin-bottom: 0; }
        .ci-icon {
          width: 38px; height: 38px; border-radius: 8px;
          background: rgba(249,115,22,0.08); border: 1px solid rgba(249,115,22,0.22);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.95rem; flex-shrink: 0;
        }
        .ci-label {
          font-size: 0.55rem; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; color: #f97316; margin-bottom: 0.15rem;
        }
        .ci-val { font-size: 0.83rem; color: #374151; }

        /* ── Partner card ── */
        .cp-partner {
          background: #fff;
          border: 1px solid rgba(249,115,22,0.28);
          border-radius: 12px;
          padding: 1.2rem 1.4rem;
          box-shadow: 0 2px 10px rgba(249,115,22,0.07);
        }
        .cp-partner-badge {
          font-size: 0.55rem; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; color: #f97316; margin-bottom: 0.7rem;
        }
        .cp-partner-row { display: flex; gap: 0.75rem; align-items: center; }
        .cp-partner-name  { font-size: 0.78rem; font-weight: 700; color: #1e3a8a; margin-bottom: 0.1rem; }
        .cp-partner-phone { font-size: 0.82rem; color: #374151; }

        /* ── Tagline card ── */
        .cp-tagline {
          padding: 1.4rem 1.5rem;
          background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
          border-radius: 14px;
        }
        .cp-tagline p    { font-style: italic; font-size: 1rem; color: #fb923c; line-height: 1.55; margin-bottom: 0.55rem; }
        .cp-tagline small { font-size: 0.78rem; color: #93c5fd; line-height: 1.6; }

        /* ── Form panel ── */
        .cp-form-card {
          background: #fff;
          border: 1px solid rgba(30,64,175,0.1);
          border-radius: 20px;
          padding: 2.5rem;
          box-shadow: 0 4px 24px rgba(30,58,138,0.08);
        }
        .cp-form-title {
          font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 800; color: #1e3a8a;
          margin-bottom: 1.75rem;
        }

        /* ── Form fields ── */
        .cp-field-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;
        }
        @media (max-width: 640px) { .cp-field-grid { grid-template-columns: 1fr; } }
        .cp-field { margin-bottom: 1rem; }

        .cp-label {
          display: block; font-size: 0.6rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #4a6fa5; margin-bottom: 0.44rem;
        }
        .cp-input {
          width: 100%; padding: 0.74rem 1rem;
          background: #fff; border: 1.5px solid rgba(30,64,175,0.15);
          border-radius: 8px; color: #1e3a8a;
          font-family: 'Segoe UI', system-ui, sans-serif; font-size: 0.88rem;
          outline: none; box-sizing: border-box; transition: all 0.2s;
        }
        .cp-input:focus { border-color: #f97316; box-shadow: 0 0 0 3px rgba(249,115,22,0.1); }
        .cp-select { appearance: none; cursor: pointer; }
        .cp-textarea { resize: vertical; min-height: 130px; }

        /* ── Submit button ── */
        .cp-submit {
          width: 100%; padding: 0.9rem;
          background: #1e40af; color: #fff;
          font-family: 'Segoe UI', system-ui, sans-serif;
          font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
          border: none; border-radius: 8px; cursor: pointer;
          transition: all 0.25s; margin-top: 0.3rem;
        }
        .cp-submit:hover {
          background: #f97316; transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(249,115,22,0.35);
        }

        /* ── Success state ── */
        .cp-success { text-align: center; padding: 3.5rem 1rem; }
        .cp-success-icon {
          width: 68px; height: 68px; border-radius: 50%;
          background: rgba(249,115,22,0.1); border: 2px solid #f97316;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1.5rem; font-size: 1.6rem;
        }
        .cp-success h3 { font-size: 1.9rem; font-weight: 800; color: #1e3a8a; margin-bottom: 0.75rem; }
        .cp-success p  { font-size: 0.9rem; color: #4b5563; line-height: 1.75; max-width: 360px; margin: 0 auto; }

        /* ── CTA section (mirrors ServicesPage) ── */
        .cp-cta {
          position: relative; padding: 5rem 2rem; text-align: center; overflow: hidden;
          background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
        }
        .cp-cta-glow {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle at 30% 50%, rgba(249,115,22,0.1) 0%, transparent 55%);
        }
        .cp-cta-inner { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; }
        .cp-cta h2 {
          font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 800; color: #fff;
          margin-bottom: 1rem; line-height: 1.2;
        }
        .cp-cta p { font-size: 0.95rem; color: #bfdbfe; line-height: 1.75; margin-bottom: 2.25rem; }
        .cp-cta-btns { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }

        .btn-primary {
          padding: 0.9rem 2.25rem; background: #f97316; color: #fff;
          font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
          text-decoration: none; border-radius: 8px; transition: all 0.25s; display: inline-block;
        }
        .btn-primary:hover { background: #ea6c0a; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(249,115,22,0.35); }
        .btn-outline {
          padding: 0.9rem 2.25rem; border: 1px solid rgba(191,219,254,0.4); color: #bfdbfe;
          font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase;
          text-decoration: none; border-radius: 8px; transition: all 0.25s;
          background: transparent; display: inline-block;
        }
        .btn-outline:hover { border-color: #f97316; color: #fff; }
      `}</style>

      {/* ── HERO ── */}
      <section className="cp-hero">
        <div className="cp-hero-grid" />
        <div className="cp-hero-glow" />
        <Reveal>
          <div className="cp-hero-inner">
            <div className="cp-hero-badge">Get In Touch</div>
            <h1>Let's Start a<br /><span>Conversation</span></h1>
            <p className="cp-hero-sub">
              Whether you have a specific challenge or simply want to explore what's possible, we'd love to hear from you.
            </p>
            <div className="cp-hero-stats">
              {[
                { val: '24h',   lbl: 'Response Time' },
                { val: '100%',  lbl: 'Confidential' },
                { val: '6+',    lbl: 'Services' },
                { val: 'Free',  lbl: 'First Consultation' },
              ].map((s) => (
                <div key={s.lbl} className="cp-hero-stat">
                  <strong>{s.val}</strong>
                  <span>{s.lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── MAIN LAYOUT ── */}
      <div className="cp-layout">

        {/* Sidebar */}
        <aside className="cp-sidebar">

          {/* Contact details */}
          <Reveal delay={0}>
            <div className="cp-card">
              <div className="cp-card-title">Reach Us Directly</div>
              {CONTACT_INFO.map(({ icon, label, val }) => (
                <div key={label} className="ci-row">
                  <div className="ci-icon">{icon}</div>
                  <div>
                    <div className="ci-label">{label}</div>
                    <div className="ci-val">{val}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Healthcare partner */}
          <Reveal delay={80}>
            <div className="cp-partner">
              <div className="cp-partner-badge">🏥 Healthcare Partnership</div>
              <div className="cp-partner-row">
                <div className="ci-icon" style={{ background: 'rgba(30,64,175,0.06)', border: '1px solid rgba(30,64,175,0.15)' }}>📞</div>
                <div>
                  <div className="cp-partner-name">David — Healthcare Consultant</div>
                  <div className="cp-partner-phone">+233 24 909 9740</div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Tagline */}
          <Reveal delay={160}>
            <div className="cp-tagline">
              <p>"Built on Expertise.<br />Driven by Integrity."</p>
              <small>
                We respond to all inquiries within one business day. For urgent matters, please call us directly.
              </small>
            </div>
          </Reveal>

        </aside>

        {/* Form panel */}
        <Reveal delay={100}>
          <div className="cp-form-card">
            {sent ? (
              <div className="cp-success">
                <div className="cp-success-icon">✓</div>
                <h3>Message Received</h3>
                <p>
                  Thank you for reaching out. A member of our team will be in touch within one business day.
                </p>
              </div>
            ) : (
              <>
                <div className="cp-form-title">Send a Message</div>
                <form onSubmit={submit}>

                  <div className="cp-field-grid">
                    <div>
                      <label className="cp-label">Full Name *</label>
                      <input
                        className="cp-input" type="text" placeholder="John Doe"
                        value={form.name} onChange={set('name')} required
                      />
                    </div>
                    <div>
                      <label className="cp-label">Email Address *</label>
                      <input
                        className="cp-input" type="email" placeholder="john@company.com"
                        value={form.email} onChange={set('email')} required
                      />
                    </div>
                  </div>

                  <div className="cp-field-grid">
                    <div>
                      <label className="cp-label">Phone Number</label>
                      <input
                        className="cp-input" type="tel" placeholder="+1 (325) 000-0000"
                        value={form.phone} onChange={set('phone')}
                      />
                    </div>
                    <div>
                      <label className="cp-label">Company / Organisation</label>
                      <input
                        className="cp-input" type="text" placeholder="Your company"
                        value={form.company} onChange={set('company')}
                      />
                    </div>
                  </div>

                  <div className="cp-field">
                    <label className="cp-label">Service of Interest</label>
                    <select
                      className="cp-input cp-select"
                      value={form.service} onChange={set('service')}
                    >
                      <option value="">Select a service…</option>
                      {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div className="cp-field">
                    <label className="cp-label">Your Message *</label>
                    <textarea
                      className="cp-input cp-textarea"
                      placeholder="Briefly describe your challenge or what you're looking to achieve…"
                      value={form.message} onChange={set('message')} required
                    />
                  </div>

                  <button type="submit" className="cp-submit">
                    Send Message →
                  </button>

                </form>
              </>
            )}
          </div>
        </Reveal>

      </div>

      {/* ── CTA ── */}
      <section className="cp-cta">
        <div className="cp-cta-glow" />
        <Reveal>
          <div className="cp-cta-inner">
            <h2>Ready to Operate Smarter and Grow Stronger?</h2>
            <p>
              Don't see exactly what you need? Every engagement can be tailored to your specific situation. Let's start with a conversation.
            </p>
            <div className="cp-cta-btns">
              <Link to="/booking" className="btn-primary">Schedule a Consultation</Link>
              <Link to="/services" className="btn-outline">Explore Our Services</Link>
            </div>
          </div>
        </Reveal>
      </section>

    </main>
  )
}