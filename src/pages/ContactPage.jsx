import { useState, useEffect } from 'react'

// ── Colour tokens ─────────────────────────────────────────────────────────────
const gold  = '#C9A84C'
const navy  = '#0d2144'
const white = '#ffffff'
const t900  = '#0d2144'
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

export default function ContactPage() {
  const mobile = useMobile()
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service: '', message: '' })
  const [sent, setSent] = useState(false)

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))
  const submit = e => { e.preventDefault(); setSent(true) }

  const iStyle = {
    width: '100%', padding: '0.75rem 1rem',
    background: white, border: '1px solid rgba(13,33,68,0.15)',
    borderRadius: '8px', color: t900,
    fontFamily: 'var(--font-body)', fontSize: '0.88rem',
    outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s',
  }

  const onFocus = e => { e.target.style.borderColor = gold; e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.1)' }
  const onBlur  = e => { e.target.style.borderColor = 'rgba(13,33,68,0.15)'; e.target.style.boxShadow = 'none' }

  return (
    <main style={{ minHeight: '100vh', background: '#f8faff' }}>

      {/* ── Header (dark) ── */}
      <section style={{ position: 'relative', padding: mobile ? '5rem 1.25rem 3rem' : '6rem 1.75rem 3.5rem', textAlign: 'center', overflow: 'hidden', background: navy }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 50% 80%, rgba(201,168,76,0.08) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'repeating-linear-gradient(90deg,#C9A84C 0,#C9A84C 1px,transparent 1px,transparent 72px),repeating-linear-gradient(0deg,#C9A84C 0,#C9A84C 1px,transparent 1px,transparent 72px)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '580px', margin: '0 auto' }}>
          <span style={{ display: 'inline-block', padding: '0.35rem 1.1rem', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '999px', fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: gold, marginBottom: '1.25rem', background: 'rgba(201,168,76,0.06)' }}>
            Contact Us
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 700, color: white, marginBottom: '1rem', lineHeight: 1.1 }}>
            Let's Start a Conversation
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: '#B0BCCC', lineHeight: 1.75 }}>
            Whether you have a specific challenge or simply want to explore what's possible, we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* ── Content (light) ── */}
      <section style={{ padding: mobile ? '2rem 1.25rem 4rem' : '3rem 1.75rem 6rem', background: '#f0f5ff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: mobile ? '1fr' : '2fr 3fr', gap: mobile ? '1.5rem' : '2.5rem', alignItems: 'start' }}>

          {/* ── Info panel ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Contact details card */}
            <div style={{ padding: mobile ? '1.5rem' : '2rem', background: white, border: '1px solid rgba(13,33,68,0.1)', borderRadius: '16px', boxShadow: '0 4px 20px rgba(13,33,68,0.07)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: t900, marginBottom: '1.5rem' }}>Reach Us Directly</h2>
              {CONTACT_INFO.map(({ icon, label, val }) => (
                <div key={label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.1rem' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem', flexShrink: 0 }}>
                    {icon}
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: gold, margin: '0 0 0.2rem' }}>{label}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: t700, margin: 0 }}>{val}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Healthcare partner contact */}
            <div style={{ padding: '1.25rem 1.5rem', background: white, border: '1px solid rgba(201,168,76,0.25)', borderRadius: '12px', boxShadow: '0 2px 10px rgba(201,168,76,0.06)' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: gold, margin: '0 0 0.75rem' }}>🏥 Healthcare Partnership</p>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem' }}>📞</span>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, color: t900, margin: '0 0 0.1rem' }}>David — Healthcare Consultant</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: t700, margin: 0 }}>+233 24 909 9740</p>
                </div>
              </div>
            </div>

            {/* Tagline card */}
            <div style={{ padding: '1.5rem', background: navy, borderRadius: '14px' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontStyle: 'italic', color: gold, lineHeight: 1.5, margin: '0 0 0.65rem' }}>
                "Built on Expertise. Driven by Integrity."
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#8B9BB4', margin: 0, lineHeight: 1.6 }}>
                We respond to all inquiries within one business day. For urgent matters, please call us directly.
              </p>
            </div>
          </div>

          {/* ── Form ── */}
          <div style={{ padding: mobile ? '1.5rem' : '2.5rem', background: white, border: '1px solid rgba(13,33,68,0.1)', borderRadius: '16px', boxShadow: '0 4px 20px rgba(13,33,68,0.07)' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(201,168,76,0.1)', border: `2px solid ${gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '1.5rem' }}>✓</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: navy, marginBottom: '0.75rem' }}>Message Received</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: t500, lineHeight: 1.7 }}>
                  Thank you for reaching out. A member of our team will be in touch within one business day.
                </p>
              </div>
            ) : (
              <>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 600, color: t900, marginBottom: '1.75rem' }}>Send a Message</h2>
                <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: '1rem' }}>
                    {[
                      { key: 'name',  label: 'Full Name *',      type: 'text',  ph: 'John Doe',         req: true },
                      { key: 'email', label: 'Email Address *',   type: 'email', ph: 'john@company.com', req: true },
                    ].map(({ key, label, type, ph, req }) => (
                      <div key={key}>
                        <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: t500, marginBottom: '0.45rem' }}>{label}</label>
                        <input type={type} value={form[key]} onChange={set(key)} placeholder={ph} required={req} style={iStyle} onFocus={onFocus} onBlur={onBlur} />
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: '1rem' }}>
                    {[
                      { key: 'phone',   label: 'Phone Number',          type: 'tel',  ph: '+1 (325) 000-0000' },
                      { key: 'company', label: 'Company / Organisation', type: 'text', ph: 'Your company' },
                    ].map(({ key, label, type, ph }) => (
                      <div key={key}>
                        <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: t500, marginBottom: '0.45rem' }}>{label}</label>
                        <input type={type} value={form[key]} onChange={set(key)} placeholder={ph} style={iStyle} onFocus={onFocus} onBlur={onBlur} />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: t500, marginBottom: '0.45rem' }}>Service of Interest</label>
                    <select value={form.service} onChange={set('service')} style={{ ...iStyle, appearance: 'none', cursor: 'pointer' }} onFocus={onFocus} onBlur={onBlur}>
                      <option value="">Select a service…</option>
                      {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: t500, marginBottom: '0.45rem' }}>Your Message *</label>
                    <textarea value={form.message} onChange={set('message')} rows={mobile ? 4 : 5} required
                      placeholder="Briefly describe your challenge or what you're looking to achieve…"
                      style={{ ...iStyle, resize: 'vertical' }} onFocus={onFocus} onBlur={onBlur} />
                  </div>

                  <button type="submit" style={{ padding: '0.9rem', background: navy, color: white, fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.25s', marginTop: '0.25rem' }}
                    onMouseEnter={e => { e.currentTarget.style.background = gold; e.currentTarget.style.color = navy; e.currentTarget.style.transform = 'translateY(-1px)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = navy; e.currentTarget.style.color = white; e.currentTarget.style.transform = 'none' }}>
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}