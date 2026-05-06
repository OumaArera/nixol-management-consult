import { useState, useEffect } from 'react'

// ── EmailJS setup ─────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'
const COMPANY_EMAIL       = 'info@nixolmc.com'

// ── Colour tokens ─────────────────────────────────────────────────────────────
const gold  = '#C9A84C'
const navy  = '#0d2144'
const navy2 = '#1a3a6b'
const white = '#ffffff'
const t900  = '#0d2144'
const t700  = '#2d4a7a'
const t500  = '#4a6fa5'
const t400  = '#7a9bc4'
const d300  = '#D4DCE8'
const d400  = '#B0BCCC'
const d500  = '#8B9BB4'

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
  'General / Exploratory Consultation',
]

const TIME_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '1:00 PM',  '1:30 PM',
  '2:00 PM',  '2:30 PM',  '3:00 PM',  '3:30 PM',
  '4:00 PM',  '4:30 PM',
]

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

function getDaysInMonth(year, month) { return new Date(year, month + 1, 0).getDate() }
function getFirstDayOfMonth(year, month) { return new Date(year, month, 1).getDay() }
function isWeekend(year, month, day) { const d = new Date(year, month, day).getDay(); return d === 0 || d === 6 }
function isPast(year, month, day) {
  const today = new Date(); today.setHours(0, 0, 0, 0)
  return new Date(year, month, day) < today
}

// ── Calendar (keeps dark theme — works great as a widget on light bg) ─────────
function Calendar({ selected, onSelect }) {
  const today = new Date()
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() })

  const prev = () => setView(v => { const d = new Date(v.year, v.month - 1, 1); return { year: d.getFullYear(), month: d.getMonth() } })
  const next = () => setView(v => { const d = new Date(v.year, v.month + 1, 1); return { year: d.getFullYear(), month: d.getMonth() } })

  const cells = Array(getFirstDayOfMonth(view.year, view.month)).fill(null)
    .concat(Array.from({ length: getDaysInMonth(view.year, view.month) }, (_, i) => i + 1))

  const selKey = selected ? `${selected.year}-${selected.month}-${selected.day}` : null

  return (
    <div style={{ background: navy, border: '1px solid rgba(201,168,76,0.2)', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(13,33,68,0.15)' }}>
      {/* Month nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <button onClick={prev} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', color: d400, cursor: 'pointer', padding: '0.3rem 0.65rem', fontSize: '0.85rem', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.color = gold }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = d400 }}>‹</button>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: white }}>
          {MONTHS[view.month]} {view.year}
        </span>
        <button onClick={next} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', color: d400, cursor: 'pointer', padding: '0.3rem 0.65rem', fontSize: '0.85rem', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.color = gold }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = d400 }}>›</button>
      </div>

      {/* Day labels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '0.75rem 0.75rem 0' }}>
        {DAYS.map(d => (
          <div key={d} style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.1em', color: d500, paddingBottom: '0.5rem' }}>{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '0 0.75rem 0.75rem', gap: '3px' }}>
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />
          const disabled = isPast(view.year, view.month, day) || isWeekend(view.year, view.month, day)
          const key = `${view.year}-${view.month}-${day}`
          const isSel = selKey === key
          return (
            <button key={key} disabled={disabled} onClick={() => onSelect({ year: view.year, month: view.month, day })}
              style={{ padding: '0.5rem 0', borderRadius: '7px', border: 'none', cursor: disabled ? 'not-allowed' : 'pointer', background: isSel ? gold : disabled ? 'transparent' : 'rgba(255,255,255,0.06)', color: isSel ? navy : disabled ? 'rgba(255,255,255,0.15)' : d300, fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: isSel ? 700 : 400, transition: 'all 0.15s' }}
              onMouseEnter={e => { if (!disabled && !isSel) { e.currentTarget.style.background = 'rgba(201,168,76,0.2)'; e.currentTarget.style.color = gold } }}
              onMouseLeave={e => { if (!disabled && !isSel) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = d300 } }}>
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Input style (light) ───────────────────────────────────────────────────────
const iStyle = {
  width: '100%', padding: '0.75rem 1rem',
  background: white, border: '1px solid rgba(13,33,68,0.15)',
  borderRadius: '8px', color: t900,
  fontFamily: 'var(--font-body)', fontSize: '0.88rem',
  outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
}

// ── Step indicator ────────────────────────────────────────────────────────────
function StepBar({ step }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '0 1.75rem 2.5rem' }}>
      {[['1', 'Date & Time'], ['2', 'Your Details'], ['3', 'Confirm']].map(([num, label], i) => (
        <div key={num} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0,
            background: step > i + 1 ? gold : step === i + 1 ? navy : '#f0f5ff',
            border: `2px solid ${step >= i + 1 ? gold : 'rgba(13,33,68,0.15)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700,
            color: step >= i + 1 ? (step > i + 1 ? navy : white) : t400,
            transition: 'all 0.3s',
          }}>
            {step > i + 1 ? '✓' : num}
          </div>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: step === i + 1 ? navy : t400, fontWeight: step === i + 1 ? 700 : 400, whiteSpace: 'nowrap' }}>{label}</span>
          {i < 2 && <div style={{ width: '2.5rem', height: '2px', background: step > i + 1 ? gold : 'rgba(13,33,68,0.1)', borderRadius: '1px', transition: 'background 0.3s' }} />}
        </div>
      ))}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function BookingPage() {
  const mobile = useMobile()
  const [date,    setDate]    = useState(null)
  const [time,    setTime]    = useState('')
  const [form,    setForm]    = useState({ name: '', email: '', phone: '', company: '', service: '', notes: '' })
  const [step,    setStep]    = useState(1)
  const [loading, setLoading] = useState(false)
  const [done,    setDone]    = useState(false)
  const [error,   setError]   = useState('')

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))
  const dateLabel = date ? `${MONTHS[date.month]} ${date.day}, ${date.year}` : ''

  const sendEmail = async () => {
    setLoading(true); setError('')
    try {
      if (!window.emailjs) {
        await new Promise((res, rej) => {
          const s = document.createElement('script')
          s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js'
          s.onload = res; s.onerror = rej
          document.head.appendChild(s)
        })
        window.emailjs.init(EMAILJS_PUBLIC_KEY)
      }
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { from_name: form.name, from_email: form.email, phone: form.phone, company: form.company, service: form.service, date: dateLabel, time, notes: form.notes, to_email: COMPANY_EMAIL })
      setDone(true)
    } catch {
      if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') { setDone(true) }
      else { setError('Could not send booking. Please call us directly at +1 (325) 703-0636.') }
    } finally { setLoading(false) }
  }

  // ── Success screen ──────────────────────────────────────────────────────────
  if (done) return (
    <main style={{ minHeight: '100vh', background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8rem 1.75rem 4rem' }}>
      <div style={{ maxWidth: '520px', width: '100%', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(201,168,76,0.12)', border: `2px solid ${gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', fontSize: '2rem' }}>✓</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 600, color: navy, marginBottom: '0.75rem' }}>Consultation Booked!</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: t500, marginBottom: '2rem', lineHeight: 1.7 }}>
          Our team will send a confirmation to <strong style={{ color: navy }}>{form.email}</strong> within one business day.
        </p>
        <div style={{ padding: '1.5rem', background: white, border: '1px solid rgba(13,33,68,0.1)', borderRadius: '14px', marginBottom: '2rem', textAlign: 'left', boxShadow: '0 2px 12px rgba(13,33,68,0.07)' }}>
          {[['Date & Time', `${dateLabel} at ${time} EST`], ['Name', form.name], ['Email', form.email], ['Service', form.service]].map(([label, val]) => val && (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', padding: '0.6rem 0', borderBottom: '1px solid rgba(13,33,68,0.07)' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: t400 }}>{label}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: t900, textAlign: 'right' }}>{val}</span>
            </div>
          ))}
        </div>
        <a href="/" style={{ display: 'inline-block', padding: '0.9rem 2rem', background: navy, color: white, fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '7px' }}>
          Return Home
        </a>
      </div>
    </main>
  )

  return (
    <main style={{ minHeight: '100vh', background: '#f8faff' }}>

      {/* ── Header (dark) ── */}
      <section style={{ position: 'relative', padding: mobile ? '5rem 1.25rem 3rem' : '6rem 1.75rem 3.5rem', textAlign: 'center', overflow: 'hidden', background: navy }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 50% 80%, rgba(201,168,76,0.08) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'repeating-linear-gradient(90deg,#C9A84C 0,#C9A84C 1px,transparent 1px,transparent 72px),repeating-linear-gradient(0deg,#C9A84C 0,#C9A84C 1px,transparent 1px,transparent 72px)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '580px', margin: '0 auto' }}>
          <span style={{ display: 'inline-block', padding: '0.35rem 1.1rem', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '999px', fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: gold, marginBottom: '1.25rem', background: 'rgba(201,168,76,0.06)' }}>
            Book a Consultation
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 700, color: white, marginBottom: '0.75rem', lineHeight: 1.1 }}>
            Schedule Time With Our Team
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: d400, lineHeight: 1.7 }}>
            Pick a date and time that works for you. All consultations are held via phone or video call.
          </p>
        </div>
      </section>

      {/* ── Steps content (light) ── */}
      <section style={{ background: '#f0f5ff', padding: mobile ? '2.5rem 1.25rem 4rem' : '3rem 1.75rem 5rem' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <StepBar step={step} />

          {/* ── Step 1: Calendar + Time ── */}
          {step === 1 && (
            <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: t700, marginBottom: '0.75rem' }}>Select a Date</p>
                <Calendar selected={date} onSelect={d => { setDate(d); setTime('') }} />
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: t400, marginTop: '0.75rem' }}>
                  Weekdays only (Mon – Fri) · All times in EST
                </p>
              </div>

              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: date ? t700 : t400, marginBottom: '0.75rem' }}>
                  {date ? `Available Times — ${dateLabel}` : 'Select a date to see times'}
                </p>

                {date ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem' }}>
                    {TIME_SLOTS.map(slot => {
                      const sel = time === slot
                      return (
                        <button key={slot} onClick={() => setTime(slot)} style={{
                          padding: '0.65rem', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s',
                          border: `1px solid ${sel ? gold : 'rgba(13,33,68,0.15)'}`,
                          background: sel ? navy : white,
                          color: sel ? white : t700,
                          fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: sel ? 700 : 400,
                          boxShadow: sel ? `0 4px 12px rgba(13,33,68,0.2)` : '0 1px 4px rgba(13,33,68,0.06)',
                        }}
                          onMouseEnter={e => { if (!sel) { e.currentTarget.style.borderColor = gold; e.currentTarget.style.color = navy; e.currentTarget.style.background = 'rgba(201,168,76,0.06)' } }}
                          onMouseLeave={e => { if (!sel) { e.currentTarget.style.borderColor = 'rgba(13,33,68,0.15)'; e.currentTarget.style.color = t700; e.currentTarget.style.background = white } }}>
                          {slot}
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <div style={{ height: '200px', background: white, border: '1px solid rgba(13,33,68,0.1)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(13,33,68,0.05)' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: t400, textAlign: 'center' }}>← Pick a date first</p>
                  </div>
                )}

                {date && time && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <div style={{ padding: '1rem 1.25rem', background: navy, border: `1px solid ${gold}`, borderRadius: '10px', marginBottom: '1rem' }}>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: gold, fontWeight: 600, margin: '0 0 0.2rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Selected Slot</p>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: white, margin: 0 }}>{dateLabel} at {time} EST</p>
                    </div>
                    <button onClick={() => setStep(2)} style={{ width: '100%', padding: '0.9rem', background: gold, color: navy, fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.25s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#d4b86a'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = gold; e.currentTarget.style.transform = 'none' }}>
                      Continue → Enter Details
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Step 2: Details ── */}
          {step === 2 && (
            <div style={{ maxWidth: '640px', margin: '0 auto' }}>
              <div style={{ padding: '1rem 1.25rem', background: navy, border: `1px solid ${gold}`, borderRadius: '10px', marginBottom: '2rem' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: gold, fontWeight: 600, margin: '0 0 0.2rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Your Selected Slot</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: white, margin: 0 }}>{dateLabel} at {time} EST</p>
              </div>

              <div style={{ background: white, border: '1px solid rgba(13,33,68,0.1)', borderRadius: '16px', padding: mobile ? '1.5rem' : '2rem', boxShadow: '0 4px 20px rgba(13,33,68,0.07)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: '1rem' }}>
                  {[
                    { key: 'name',    label: 'Full Name *',           type: 'text',  ph: 'John Doe',         req: true },
                    { key: 'email',   label: 'Email Address *',        type: 'email', ph: 'john@company.com', req: true },
                    { key: 'phone',   label: 'Phone Number',           type: 'tel',   ph: '+1 (325) 000-0000' },
                    { key: 'company', label: 'Company / Organisation',  type: 'text',  ph: 'Your company' },
                  ].map(({ key, label, type, ph, req }) => (
                    <div key={key}>
                      <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: t500, marginBottom: '0.45rem' }}>{label}</label>
                      <input type={type} value={form[key]} onChange={set(key)} placeholder={ph} required={req || false} style={iStyle}
                        onFocus={e => { e.target.style.borderColor = gold; e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.1)' }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(13,33,68,0.15)'; e.target.style.boxShadow = 'none' }} />
                    </div>
                  ))}
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: t500, marginBottom: '0.45rem' }}>Service of Interest *</label>
                  <select value={form.service} onChange={set('service')} required style={{ ...iStyle, appearance: 'none', cursor: 'pointer' }}
                    onFocus={e => { e.target.style.borderColor = gold; e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.1)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(13,33,68,0.15)'; e.target.style.boxShadow = 'none' }}>
                    <option value="">Select a service…</option>
                    {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: t500, marginBottom: '0.45rem' }}>Additional Notes</label>
                  <textarea value={form.notes} onChange={set('notes')} rows={4} placeholder="Briefly describe what you'd like to discuss…"
                    style={{ ...iStyle, resize: 'vertical' }}
                    onFocus={e => { e.target.style.borderColor = gold; e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.1)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(13,33,68,0.15)'; e.target.style.boxShadow = 'none' }} />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button onClick={() => setStep(1)} style={{ flex: 1, padding: '0.9rem', border: '1px solid rgba(13,33,68,0.15)', background: '#f0f5ff', color: t700, fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.color = navy }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(13,33,68,0.15)'; e.currentTarget.style.color = t700 }}>
                    ← Back
                  </button>
                  <button onClick={() => { if (!form.name || !form.email || !form.service) return; setStep(3) }}
                    style={{ flex: 2, padding: '0.9rem', background: navy, color: white, fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.25s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = gold; e.currentTarget.style.color = navy }}
                    onMouseLeave={e => { e.currentTarget.style.background = navy; e.currentTarget.style.color = white }}>
                    Review Booking →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── Step 3: Confirm ── */}
          {step === 3 && (
            <div style={{ maxWidth: '560px', margin: '0 auto' }}>
              <div style={{ background: white, border: '1px solid rgba(13,33,68,0.1)', borderRadius: '16px', padding: mobile ? '1.5rem' : '2rem', boxShadow: '0 4px 20px rgba(13,33,68,0.07)', marginBottom: '1.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 600, color: navy, marginBottom: '1.5rem' }}>Confirm Your Booking</h2>
                {[
                  ['Date & Time', `${dateLabel} at ${time} EST`],
                  ['Name',        form.name],
                  ['Email',       form.email],
                  ['Phone',       form.phone || '—'],
                  ['Company',     form.company || '—'],
                  ['Service',     form.service],
                  ['Notes',       form.notes || '—'],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', padding: '0.7rem 0', borderBottom: '1px solid rgba(13,33,68,0.07)' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: t400, flexShrink: 0 }}>{label}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: t900, textAlign: 'right' }}>{val}</span>
                  </div>
                ))}
              </div>

              {error && (
                <div style={{ padding: '0.85rem 1.25rem', background: 'rgba(220,38,38,0.05)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: '8px', marginBottom: '1rem' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#dc2626', margin: 0 }}>{error}</p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => setStep(2)} style={{ flex: 1, padding: '0.9rem', border: '1px solid rgba(13,33,68,0.15)', background: '#f0f5ff', color: t700, fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}>
                  ← Edit
                </button>
                <button onClick={sendEmail} disabled={loading} style={{ flex: 2, padding: '0.9rem', background: loading ? 'rgba(13,33,68,0.4)' : gold, color: loading ? '#fff' : navy, fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}>
                  {loading ? 'Sending…' : 'Confirm Booking ✓'}
                </button>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: t400, textAlign: 'center', marginTop: '1rem', lineHeight: 1.6 }}>
                A confirmation will be sent to <strong style={{ color: t700 }}>{form.email}</strong>. We'll follow up to confirm and share a meeting link.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}