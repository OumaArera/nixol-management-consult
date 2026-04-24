import { useState, useEffect } from 'react'

const gold  = '#C9A84C'
const navy  = '#0B1D3A'
const s400  = '#B0BCCC'
const s500  = '#8B9BB4'

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
  'Other / General Inquiry',
]

export default function ContactPage() {
  const mobile = useMobile()
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service: '', message: '' })
  const [sent, setSent] = useState(false)

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))
  const submit = e => { e.preventDefault(); setSent(true) }

  const iStyle = {
    width: '100%', padding: '0.75rem 1rem',
    background: '#04101F', border: '1px solid rgba(26,58,107,0.8)',
    borderRadius: '8px', color: '#fff',
    fontFamily: 'var(--font-body)', fontSize: '0.88rem',
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
  }

  const CONTACT_INFO = [
    { icon: '📞', label: 'Phone',   val: '+1 (325) 703-0636' },
    { icon: '📧', label: 'Email',   val: 'info@nixolmc.com' },
    { icon: '🌐', label: 'Website', val: 'www.nixolmc.com' },
    { icon: '🕐', label: 'Hours',   val: 'Mon – Fri: 9AM – 6PM EST' },
    { icon: '🏢', label: 'EIN',     val: '42-1824156' },
  ]

  return (
    <main style={{ paddingTop: '6rem', minHeight: '100vh', background: '#04101F' }}>

      {/* ── Header ── */}
      <section style={{ position: 'relative', padding: mobile ? '3rem 1.25rem 2rem' : '4rem 1.75rem 3rem', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #0B1D3A, #04101F)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '580px', margin: '0 auto' }}>
          <span style={{ display: 'inline-block', padding: '0.35rem 1.1rem', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '999px', fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: gold, marginBottom: '1.25rem' }}>
            Contact Us
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 700, color: '#fff', marginBottom: '1rem', lineHeight: 1.1 }}>
            Let's Start a Conversation
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: s400, lineHeight: 1.75 }}>
            Whether you have a specific challenge or simply want to explore what's possible, we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section style={{ padding: mobile ? '1.5rem 1.25rem 4rem' : '2rem 1.75rem 6rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '2fr 3fr', gap: mobile ? '1.5rem' : '3rem', alignItems: 'start' }}>

          {/* Info panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ padding: mobile ? '1.5rem' : '2rem', background: '#0B1D3A', border: '1px solid rgba(26,58,107,0.7)', borderRadius: '16px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 600, color: '#fff', marginBottom: '1.5rem' }}>Reach Us Directly</h2>
              {CONTACT_INFO.map(({ icon, label, val }) => (
                <div key={label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem', flexShrink: 0 }}>
                    {icon}
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: gold, margin: '0 0 0.2rem' }}>{label}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: s400, margin: 0 }}>{val}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(201,168,76,0.06), rgba(201,168,76,0.02))', border: '1px solid rgba(201,168,76,0.15)', borderRadius: '16px' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontStyle: 'italic', color: gold, lineHeight: 1.5, margin: '0 0 0.65rem' }}>
                "Built on Expertise. Driven by Integrity."
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: s500, margin: 0, lineHeight: 1.6 }}>
                We respond to all inquiries within one business day. For urgent matters, please call us directly.
              </p>
            </div>
          </div>

          {/* Form */}
          <div style={{ padding: mobile ? '1.5rem' : '2.5rem', background: '#0B1D3A', border: '1px solid rgba(26,58,107,0.7)', borderRadius: '16px' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '1.4rem' }}>✓</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#fff', marginBottom: '0.75rem' }}>Message Received</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: s400, lineHeight: 1.7 }}>
                  Thank you for reaching out. A member of our team will be in touch within one business day.
                </p>
              </div>
            ) : (
              <>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 600, color: '#fff', marginBottom: '1.75rem' }}>Send a Message</h2>
                <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

                  {/* Name + Email — stack on mobile */}
                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: '1rem' }}>
                    {[
                      { key: 'name',  label: 'Full Name *',      type: 'text',  ph: 'John Doe',         req: true },
                      { key: 'email', label: 'Email Address *',   type: 'email', ph: 'john@company.com', req: true },
                    ].map(({ key, label, type, ph, req }) => (
                      <div key={key}>
                        <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: s500, marginBottom: '0.45rem' }}>{label}</label>
                        <input type={type} value={form[key]} onChange={set(key)} placeholder={ph} required={req} style={iStyle}
                          onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.45)'}
                          onBlur={e => e.target.style.borderColor = 'rgba(26,58,107,0.8)'} />
                      </div>
                    ))}
                  </div>

                  {/* Phone + Company — stack on mobile */}
                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: '1rem' }}>
                    {[
                      { key: 'phone',   label: 'Phone Number',          type: 'tel',  ph: '+1 (325) 000-0000' },
                      { key: 'company', label: 'Company / Organisation', type: 'text', ph: 'Your company' },
                    ].map(({ key, label, type, ph }) => (
                      <div key={key}>
                        <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: s500, marginBottom: '0.45rem' }}>{label}</label>
                        <input type={type} value={form[key]} onChange={set(key)} placeholder={ph} style={iStyle}
                          onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.45)'}
                          onBlur={e => e.target.style.borderColor = 'rgba(26,58,107,0.8)'} />
                      </div>
                    ))}
                  </div>

                  {/* Service */}
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: s500, marginBottom: '0.45rem' }}>Service of Interest</label>
                    <select value={form.service} onChange={set('service')} style={{ ...iStyle, appearance: 'none' }}
                      onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.45)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(26,58,107,0.8)'}>
                      <option value="">Select a service…</option>
                      {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: s500, marginBottom: '0.45rem' }}>Your Message *</label>
                    <textarea value={form.message} onChange={set('message')} rows={mobile ? 4 : 5} required
                      placeholder="Briefly describe your challenge or what you're looking to achieve…"
                      style={{ ...iStyle, resize: 'vertical' }}
                      onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.45)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(26,58,107,0.8)'} />
                  </div>

                  <button type="submit"
                    style={{ padding: '0.9rem', background: gold, color: navy, fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.25s', marginTop: '0.25rem' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#d4b86a'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = gold; e.currentTarget.style.transform = 'none' }}>
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