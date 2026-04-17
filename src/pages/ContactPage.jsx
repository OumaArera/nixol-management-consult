import { useState } from 'react'

const SERVICES_OPTIONS = ['Strategic Consulting', 'Business Advisory', 'Financial Management', 'Organisational Development', 'Risk Management', 'Market Research', 'Other']

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  background: 'var(--color-navy-800)',
  border: '1px solid rgba(26,58,107,0.8)',
  borderRadius: '8px',
  color: '#fff',
  fontFamily: 'var(--font-body)',
  fontSize: '0.88rem',
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
}

function Field({ label, children }) {
  return (
    <div>
      <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-silver-400)', marginBottom: '0.5rem' }}>
        {label}
      </label>
      {children}
    </div>
  )
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handle = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

  const focusIn = e => e.target.style.borderColor = 'rgba(201,168,76,0.5)'
  const focusOut = e => e.target.style.borderColor = 'rgba(26,58,107,0.8)'

  return (
    <main style={{ minHeight: '100vh', background: 'var(--color-navy-950)', paddingTop: '5rem' }}>
      {/* Header */}
      <section style={{ padding: '5rem 1.5rem 4rem', background: 'linear-gradient(180deg, var(--color-navy-900) 0%, var(--color-navy-950) 100%)', textAlign: 'center' }}>
        <span style={{ display: 'inline-block', padding: '0.35rem 1rem', fontSize: '0.68rem', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-gold-500)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: '999px', marginBottom: '1.25rem' }}>Contact Us</span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 3.75rem)', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>
          Let's Start a Conversation
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-silver-400)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.75 }}>
          Whether you have a specific challenge or simply want to explore possibilities, we'd love to hear from you.
        </p>
      </section>

      {/* Body */}
      <section style={{ padding: '3rem 1.5rem 5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'start' }}>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ padding: '2rem', background: 'var(--color-navy-900)', border: '1px solid rgba(26,58,107,0.6)', borderRadius: '14px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: '#fff', marginBottom: '1.5rem' }}>Get in Touch</h2>
              {[['📍', 'Location', 'Nairobi, Kenya'], ['📧', 'Email', 'info@nixolmc.com'], ['📞', 'Phone', '+254 700 000 000'], ['🕐', 'Hours', 'Mon – Fri · 8AM – 6PM EAT']].map(([icon, label, value]) => (
                <div key={label} style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1rem' }}>{icon}</div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-gold-500)', marginBottom: '0.2rem' }}>{label}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-silver-300)' }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: '2rem', background: 'linear-gradient(135deg, var(--color-navy-800), var(--color-navy-900))', border: '1px solid rgba(201,168,76,0.15)', borderRadius: '14px' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--color-gold-400)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                "Built on Expertise. Driven by Integrity."
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--color-silver-500)' }}>We respond to all inquiries within one business day.</p>
            </div>
          </div>

          {/* Form */}
          <div style={{ padding: '2.25rem', background: 'var(--color-navy-900)', border: '1px solid rgba(26,58,107,0.6)', borderRadius: '14px' }}>
            {submitted ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 1rem', textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.5rem' }}>✓</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#fff', marginBottom: '0.75rem' }}>Message Received</h3>
                <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-silver-400)', lineHeight: 1.7, maxWidth: '320px' }}>
                  Thank you for reaching out. A member of our team will be in touch within one business day.
                </p>
              </div>
            ) : (
              <>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 600, color: '#fff', marginBottom: '1.75rem' }}>Send Us a Message</h2>
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <Field label="Full Name">
                      <input type="text" value={form.name} onChange={handle('name')} placeholder="John Doe" required style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                    </Field>
                    <Field label="Email">
                      <input type="email" value={form.email} onChange={handle('email')} placeholder="john@company.com" required style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                    </Field>
                    <Field label="Phone">
                      <input type="tel" value={form.phone} onChange={handle('phone')} placeholder="+254 700 000 000" style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                    </Field>
                    <Field label="Company">
                      <input type="text" value={form.company} onChange={handle('company')} placeholder="Your organisation" style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                    </Field>
                  </div>
                  <Field label="Service of Interest">
                    <select value={form.service} onChange={handle('service')} style={{ ...inputStyle, appearance: 'none' }} onFocus={focusIn} onBlur={focusOut}>
                      <option value="">Select a service…</option>
                      {SERVICES_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </Field>
                  <Field label="Message">
                    <textarea value={form.message} onChange={handle('message')} required rows={5} placeholder="Describe your challenge or what you're looking to achieve…" style={{ ...inputStyle, resize: 'vertical' }} onFocus={focusIn} onBlur={focusOut} />
                  </Field>
                  <button type="submit" style={{
                    width: '100%', padding: '0.9rem',
                    background: 'var(--color-gold-500)', color: 'var(--color-navy-900)',
                    fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 700,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.25s',
                  }}
                    onMouseEnter={e => { e.target.style.background = 'var(--color-gold-400)'; e.target.style.transform = 'translateY(-1px)' }}
                    onMouseLeave={e => { e.target.style.background = 'var(--color-gold-500)'; e.target.style.transform = 'translateY(0)' }}
                  >
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