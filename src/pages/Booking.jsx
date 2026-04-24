import { useState, useEffect } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// SETUP: Replace with your EmailJS credentials
// 1. Sign up free at https://www.emailjs.com
// 2. Create a service (e.g. Gmail) → copy the Service ID
// 3. Create an email template → copy the Template ID
//    Template variables to use: {{from_name}}, {{from_email}}, {{phone}},
//    {{company}}, {{service}}, {{date}}, {{time}}, {{notes}}, {{to_email}}
// 4. Copy your Public Key from Account → API Keys
// 5. Replace the three values below
// ─────────────────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'
const COMPANY_EMAIL       = 'info@nixolmc.com'

const gold  = '#C9A84C'
const navy  = '#0B1D3A'
const s300   = '#D4DCE8'
const s400  = '#B0BCCC'
const s500  = '#8B9BB4'

const SERVICES = [
  'Management & Advisory',
  'Financial Management & Advisory',
  'Business Strategy & Growth Consulting',
  'Accounting & Compliance Services',
  'Operations & Process Optimization',
  'General / Exploratory Consultation',
]

const TIME_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '1:00 PM',  '1:30 PM',
  '2:00 PM',  '2:30 PM',  '3:00 PM',  '3:30 PM',
  '4:00 PM',  '4:30 PM',
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

function isWeekend(year, month, day) {
  const d = new Date(year, month, day).getDay()
  return d === 0 || d === 6
}

function isPast(year, month, day) {
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const target = new Date(year, month, day)
  return target < today
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

// ─── Calendar ────────────────────────────────────────────────────────────────

function Calendar({ selected, onSelect }) {
  const today = new Date()
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() })

  const prev = () => setView(v => {
    const d = new Date(v.year, v.month - 1, 1)
    return { year: d.getFullYear(), month: d.getMonth() }
  })
  const next = () => setView(v => {
    const d = new Date(v.year, v.month + 1, 1)
    return { year: d.getFullYear(), month: d.getMonth() }
  })

  const daysInMonth = getDaysInMonth(view.year, view.month)
  const firstDay    = getFirstDayOfMonth(view.year, view.month)
  const cells = Array(firstDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1))

  const selKey = selected ? `${selected.year}-${selected.month}-${selected.day}` : null

  return (
    <div style={{ background: '#04101F', border: '1px solid rgba(26,58,107,0.7)', borderRadius: '14px', overflow: 'hidden' }}>
      {/* Month nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.1rem 1.25rem', borderBottom: '1px solid rgba(26,58,107,0.5)' }}>
        <button onClick={prev} style={{ background: 'none', border: '1px solid rgba(26,58,107,0.6)', borderRadius: '6px', color: s400, cursor: 'pointer', padding: '0.3rem 0.65rem', fontSize: '0.85rem', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.color = gold }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,58,107,0.6)'; e.currentTarget.style.color = s400 }}>
          ‹
        </button>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: '#fff' }}>
          {MONTHS[view.month]} {view.year}
        </span>
        <button onClick={next} style={{ background: 'none', border: '1px solid rgba(26,58,107,0.6)', borderRadius: '6px', color: s400, cursor: 'pointer', padding: '0.3rem 0.65rem', fontSize: '0.85rem', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.color = gold }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,58,107,0.6)'; e.currentTarget.style.color = s400 }}>
          ›
        </button>
      </div>

      {/* Day labels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '0.75rem 0.75rem 0' }}>
        {DAYS.map(d => (
          <div key={d} style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em', color: s500, paddingBottom: '0.5rem' }}>{d}</div>
        ))}
      </div>

      {/* Cells */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '0 0.75rem 0.75rem', gap: '3px' }}>
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />
          const past    = isPast(view.year, view.month, day)
          const weekend = isWeekend(view.year, view.month, day)
          const disabled = past || weekend
          const key = `${view.year}-${view.month}-${day}`
          const isSel = selKey === key

          return (
            <button
              key={key}
              disabled={disabled}
              onClick={() => onSelect({ year: view.year, month: view.month, day })}
              style={{
                padding: '0.5rem 0', borderRadius: '7px', border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
                background: isSel ? gold : disabled ? 'transparent' : '#112549',
                color: isSel ? navy : disabled ? 'rgba(139,155,180,0.3)' : s300,
                fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: isSel ? 700 : 400,
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { if (!disabled && !isSel) { e.currentTarget.style.background = 'rgba(201,168,76,0.15)'; e.currentTarget.style.color = gold } }}
              onMouseLeave={e => { if (!disabled && !isSel) { e.currentTarget.style.background = '#112549'; e.currentTarget.style.color = s300 } }}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function BookingPage() {
  const [date,     setDate]     = useState(null)
  const [time,     setTime]     = useState('')
  const [form,     setForm]     = useState({ name: '', email: '', phone: '', company: '', service: '', notes: '' })
  const [step,     setStep]     = useState(1)   // 1 = pick date/time, 2 = details, 3 = confirm
  const [loading,  setLoading]  = useState(false)
  const [done,     setDone]     = useState(false)
  const [error,    setError]    = useState('')

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  const dateLabel = date
    ? `${MONTHS[date.month]} ${date.day}, ${date.year}`
    : ''

  const sendEmail = async () => {
    setLoading(true)
    setError('')
    try {
      // Load EmailJS on demand
      if (!window.emailjs) {
        await new Promise((res, rej) => {
          const s = document.createElement('script')
          s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js'
          s.onload = res; s.onerror = rej
          document.head.appendChild(s)
        })
        window.emailjs.init(EMAILJS_PUBLIC_KEY)
      }

      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: form.name,
        from_email: form.email,
        phone:   form.phone,
        company: form.company,
        service: form.service,
        date:    dateLabel,
        time,
        notes:   form.notes,
        to_email: COMPANY_EMAIL,
      })

      setDone(true)
    } catch (err) {
      // If EmailJS isn't configured yet, still show success for demo
      if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') {
        setDone(true)
      } else {
        setError('Could not send booking. Please call us directly at +1 (325) 703-0636.')
      }
    } finally {
      setLoading(false)
    }
  }

  const iStyle = {
    width: '100%', padding: '0.75rem 1rem',
    background: '#04101F', border: '1px solid rgba(26,58,107,0.8)',
    borderRadius: '8px', color: '#fff',
    fontFamily: 'var(--font-body)', fontSize: '0.88rem',
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
  }

  if (done) return (
    <main style={{ paddingTop: '6rem', minHeight: '100vh', background: '#04101F', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8rem 1.75rem' }}>
      <div style={{ maxWidth: '520px', width: '100%', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(201,168,76,0.1)', border: `1px solid rgba(201,168,76,0.3)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', fontSize: '2rem' }}>✓</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 600, color: '#fff', marginBottom: '1rem' }}>Consultation Booked!</h1>
        <div style={{ padding: '1.5rem', background: '#0B1D3A', border: '1px solid rgba(201,168,76,0.15)', borderRadius: '14px', marginBottom: '1.5rem', textAlign: 'left' }}>
          {[
            ['Name',    form.name],
            ['Email',   form.email],
            ['Date',    dateLabel],
            ['Time',    time],
            ['Service', form.service],
          ].map(([label, val]) => val && (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(26,58,107,0.4)' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: s500, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#fff' }}>{val}</span>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: s400, lineHeight: 1.7, marginBottom: '2rem' }}>
          Our team will send a confirmation and meeting link to <strong style={{ color: '#fff' }}>{form.email}</strong> within one business day.
        </p>
        <a href="/" style={{ display: 'inline-block', padding: '0.85rem 2rem', background: gold, color: navy, fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '7px' }}>
          Return Home
        </a>
      </div>
    </main>
  )

  return (
    <main style={{ paddingTop: '6rem', minHeight: '100vh', background: '#04101F' }}>
      {/* Header */}
      <section style={{ position: 'relative', padding: '3.5rem 1.75rem 2.5rem', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #0B1D3A, #04101F)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '580px', margin: '0 auto' }}>
          <span style={{ display: 'inline-block', padding: '0.35rem 1.1rem', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '999px', fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: gold, marginBottom: '1.25rem' }}>
            Book a Consultation
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 700, color: '#fff', marginBottom: '0.75rem', lineHeight: 1.1 }}>
            Schedule Time With Our Team
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: s400, lineHeight: 1.7 }}>
            Pick a date and time that works for you. All consultations are held via phone or video call.
          </p>
        </div>
      </section>

      {/* Step indicator */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', padding: '0 1.75rem 2rem' }}>
        {[['1', 'Date & Time'], ['2', 'Your Details'], ['3', 'Confirm']].map(([num, label], i) => (
          <div key={num} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: step > i + 1 ? gold : step === i + 1 ? gold : '#112549', border: `1px solid ${step >= i + 1 ? gold : 'rgba(26,58,107,0.6)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700, color: step >= i + 1 ? navy : s500, flexShrink: 0, transition: 'all 0.3s' }}>
              {step > i + 1 ? '✓' : num}
            </div>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: step === i + 1 ? gold : s500, fontWeight: step === i + 1 ? 600 : 400, whiteSpace: 'nowrap' }}>{label}</span>
            {i < 2 && <div style={{ width: '2rem', height: '1px', background: step > i + 1 ? gold : 'rgba(26,58,107,0.5)', transition: 'background 0.3s' }} />}
          </div>
        ))}
      </div>

      {/* Steps */}
      <section style={{ padding: '0 1.75rem 5rem', maxWidth: '960px', margin: '0 auto' }}>

        {/* Step 1: Calendar + Time */}
        {step === 1 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: gold, marginBottom: '0.75rem' }}>Select a Date</p>
              <Calendar selected={date} onSelect={d => { setDate(d); setTime('') }} />
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: s500, marginTop: '0.75rem' }}>
                * Weekdays only (Mon – Fri). All times in EST.
              </p>
            </div>

            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: date ? gold : s500, marginBottom: '0.75rem' }}>
                {date ? `Available Times — ${dateLabel}` : 'Select a date to see times'}
              </p>
              {date ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem' }}>
                  {TIME_SLOTS.map(slot => (
                    <button key={slot} onClick={() => setTime(slot)}
                      style={{ padding: '0.65rem', borderRadius: '8px', border: `1px solid ${time === slot ? gold : 'rgba(26,58,107,0.7)'}`, background: time === slot ? gold : '#0B1D3A', color: time === slot ? navy : s300, fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: time === slot ? 700 : 400, cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseEnter={e => { if (time !== slot) { e.currentTarget.style.borderColor = gold; e.currentTarget.style.color = gold } }}
                      onMouseLeave={e => { if (time !== slot) { e.currentTarget.style.borderColor = 'rgba(26,58,107,0.7)'; e.currentTarget.style.color = s300 } }}>
                      {slot}
                    </button>
                  ))}
                </div>
              ) : (
                <div style={{ height: '200px', background: '#0B1D3A', border: '1px solid rgba(26,58,107,0.5)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(139,155,180,0.4)', textAlign: 'center' }}>← Pick a date first</p>
                </div>
              )}

              {date && time && (
                <div style={{ marginTop: '1.5rem' }}>
                  <div style={{ padding: '1rem 1.25rem', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '10px', marginBottom: '1rem' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: gold, fontWeight: 600, margin: '0 0 0.25rem' }}>Selected Slot</p>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: '#fff', margin: 0 }}>{dateLabel} at {time} EST</p>
                  </div>
                  <button onClick={() => setStep(2)}
                    style={{ width: '100%', padding: '0.9rem', background: gold, color: navy, fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.25s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#d4b86a' }}
                    onMouseLeave={e => { e.currentTarget.style.background = gold }}>
                    Continue → Enter Details
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Details form */}
        {step === 2 && (
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <div style={{ padding: '1rem 1.25rem', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '10px', marginBottom: '2rem' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: gold, fontWeight: 600, margin: '0 0 0.2rem' }}>Your Selected Slot</p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: '#fff', margin: 0 }}>{dateLabel} at {time} EST</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { key: 'name', label: 'Full Name *', type: 'text', ph: 'John Doe', req: true },
                  { key: 'email', label: 'Email Address *', type: 'email', ph: 'john@company.com', req: true },
                  { key: 'phone', label: 'Phone Number', type: 'tel', ph: '+1 (325) 000-0000', req: false },
                  { key: 'company', label: 'Company / Organisation', type: 'text', ph: 'Your company', req: false },
                ].map(({ key, label, type, ph, req }) => (
                  <div key={key}>
                    <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: s500, marginBottom: '0.5rem' }}>{label}</label>
                    <input type={type} value={form[key]} onChange={set(key)} placeholder={ph} required={req} style={iStyle}
                      onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.45)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(26,58,107,0.8)'} />
                  </div>
                ))}
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: s500, marginBottom: '0.5rem' }}>Service of Interest *</label>
                <select value={form.service} onChange={set('service')} required style={{ ...iStyle, appearance: 'none' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.45)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(26,58,107,0.8)'}>
                  <option value="">Select a service…</option>
                  {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: s500, marginBottom: '0.5rem' }}>Additional Notes</label>
                <textarea value={form.notes} onChange={set('notes')} rows={4} placeholder="Briefly describe what you'd like to discuss or any specific challenges you're facing…"
                  style={{ ...iStyle, resize: 'vertical' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.45)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(26,58,107,0.8)'} />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button onClick={() => setStep(1)} style={{ flex: 1, padding: '0.9rem', border: '1px solid rgba(26,58,107,0.6)', background: 'transparent', color: s400, fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.color = gold }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,58,107,0.6)'; e.currentTarget.style.color = s400 }}>
                  ← Back
                </button>
                <button
                  onClick={() => { if (!form.name || !form.email || !form.service) return; setStep(3) }}
                  style={{ flex: 2, padding: '0.9rem', background: gold, color: navy, fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#d4b86a' }}
                  onMouseLeave={e => { e.currentTarget.style.background = gold }}>
                  Review Booking →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && (
          <div style={{ maxWidth: '560px', margin: '0 auto' }}>
            <div style={{ padding: '2rem', background: '#0B1D3A', border: '1px solid rgba(26,58,107,0.7)', borderRadius: '16px', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: '#fff', marginBottom: '1.5rem' }}>Confirm Your Booking</h2>
              {[
                ['Date & Time', `${dateLabel} at ${time} EST`],
                ['Name',        form.name],
                ['Email',       form.email],
                ['Phone',       form.phone || '—'],
                ['Company',     form.company || '—'],
                ['Service',     form.service],
                ['Notes',       form.notes || '—'],
              ].map(([label, val]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', padding: '0.75rem 0', borderBottom: '1px solid rgba(26,58,107,0.4)' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: s500, flexShrink: 0 }}>{label}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#fff', textAlign: 'right' }}>{val}</span>
                </div>
              ))}
            </div>

            {error && (
              <div style={{ padding: '0.85rem 1.25rem', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '8px', marginBottom: '1rem' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#f87171', margin: 0 }}>{error}</p>
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setStep(2)} style={{ flex: 1, padding: '0.9rem', border: '1px solid rgba(26,58,107,0.6)', background: 'transparent', color: s400, fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}>
                ← Edit
              </button>
              <button onClick={sendEmail} disabled={loading}
                style={{ flex: 2, padding: '0.9rem', background: loading ? 'rgba(201,168,76,0.5)' : gold, color: navy, fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}>
                {loading ? 'Sending…' : 'Confirm Booking ✓'}
              </button>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: s500, textAlign: 'center', marginTop: '1rem', lineHeight: 1.6 }}>
              A confirmation will be sent to {form.email}. Our team will contact you to confirm and share a meeting link.
            </p>
          </div>
        )}
      </section>
    </main>
  )
}