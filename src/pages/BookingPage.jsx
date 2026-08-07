import { useState, useEffect, useRef } from 'react'

// ── Reveal hook (matches ContactPage) ────────────────────────────────────────
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

// ── EmailJS setup ─────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_3repmab'
const EMAILJS_TEMPLATE_ID = 'template_96roprd'
const EMAILJS_PUBLIC_KEY  = 'pFfoPa4-58w4qUOSY'
const COMPANY_EMAIL       = 'kwaku.duah@nixolmc.com'

// ── Calendar helpers ──────────────────────────────────────────────────────────
function getDaysInMonth(year, month) { return new Date(year, month + 1, 0).getDate() }
function getFirstDayOfMonth(year, month) { return new Date(year, month, 1).getDay() }
function isDisabled(year, month, day) {
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const dt = new Date(year, month, day)
  return dt < today || dt.getDay() === 0 || dt.getDay() === 6
}

// ── Calendar Component ────────────────────────────────────────────────────────
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

  const blanks = Array(getFirstDayOfMonth(view.year, view.month)).fill(null)
  const cells  = [...blanks, ...Array.from({ length: getDaysInMonth(view.year, view.month) }, (_, i) => i + 1)]
  const selKey = selected ? `${selected.year}-${selected.month}-${selected.day}` : null

  return (
    <div className="bk-cal">
      {/* Month nav */}
      <div className="bk-cal-nav">
        <button className="bk-cal-btn" onClick={prev}>‹</button>
        <span className="bk-cal-month">{MONTHS[view.month]} {view.year}</span>
        <button className="bk-cal-btn" onClick={next}>›</button>
      </div>
      {/* Day headers */}
      <div className="bk-cal-hdr">
        {DAYS.map(d => <div key={d} className="bk-cal-daylbl">{d}</div>)}
      </div>
      {/* Day cells */}
      <div className="bk-cal-grid">
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />
          const dis = isDisabled(view.year, view.month, day)
          const key = `${view.year}-${view.month}-${day}`
          const isSel = selKey === key
          return (
            <button
              key={key}
              disabled={dis}
              onClick={() => onSelect({ year: view.year, month: view.month, day })}
              className={`bk-cal-day${isSel ? ' selected' : ''}`}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Step Bar ─────────────────────────────────────────────────────────────────
function StepBar({ step }) {
  const steps = [['1', 'Date & Time'], ['2', 'Your Details'], ['3', 'Confirm']]
  return (
    <div className="bk-stepbar">
      {steps.map(([num, label], i) => {
        const state = step > i + 1 ? 'done' : step === i + 1 ? 'active' : 'idle'
        return (
          <div key={num} className="bk-step-item">
            <div className={`bk-step-dot ${state}`}>
              {step > i + 1 ? '✓' : num}
            </div>
            <span className={`bk-step-label${step === i + 1 ? ' active' : ''}`}>{label}</span>
            {i < 2 && <div className={`bk-step-line${step > i + 1 ? ' done' : ''}`} />}
          </div>
        )
      })}
    </div>
  )
}

// ── Field helpers ─────────────────────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div className="bk-field">
      <label className="bk-label">{label}</label>
      {children}
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function BookingPage() {
  const [step,    setStep]    = useState(1)
  const [selDate, setSelDate] = useState(null)
  const [selTime, setSelTime] = useState('')
  const [form,    setForm]    = useState({ name: '', email: '', phone: '', company: '', service: '', notes: '' })
  const [done,    setDone]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

  const dateLabel = selDate
    ? `${MONTHS[selDate.month]} ${selDate.day}, ${selDate.year}`
    : ''

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
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: form.name, from_email: form.email, phone: form.phone,
        company: form.company, service: form.service,
        date: dateLabel, time: selTime, notes: form.notes,
        to_email: COMPANY_EMAIL,
      })
      setDone(true)
    } catch {
      if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') { setDone(true) }
      else { setError('Could not send booking. Please call us at +1 (325) 703-0636.') }
    } finally { setLoading(false) }
  }

  // ── Success ──────────────────────────────────────────────────────────────
  if (done) return (
    <main className="bk-main">
      <style>{styles}</style>
      <div className="bk-success-page">
        <div className="bk-success-icon">✓</div>
        <h2>Consultation Booked!</h2>
        <p>Our team will send a confirmation to <strong>{form.email}</strong> within one business day.</p>
        <div className="bk-confirm-card" style={{ maxWidth: 420, margin: '1.75rem auto' }}>
          {[['Date & Time', `${dateLabel} at ${selTime} EST`], ['Name', form.name], ['Service', form.service]].map(([l, v]) => v && (
            <div key={l} className="bk-confirm-row">
              <span className="bk-confirm-lbl">{l}</span>
              <span className="bk-confirm-val">{v}</span>
            </div>
          ))}
        </div>
        <a href="/" className="bk-btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>
          Return Home
        </a>
      </div>
    </main>
  )

  return (
    <main className="bk-main">
      <style>{styles}</style>

      {/* ── HERO ── */}
      <section className="bk-hero">
        <div className="bk-hero-grid" />
        <div className="bk-hero-glow" />
        <Reveal>
          <div className="bk-hero-inner">
            <div className="bk-hero-badge">Book a Consultation</div>
            <h1>Schedule Time With<br /><span>Our Team</span></h1>
            <p className="bk-hero-sub">
              Pick a date and time that works for you. All consultations are free and held via phone or video call.
            </p>
            <div className="bk-hero-stats">
              {[
                { val: 'Free',    lbl: 'First Call'     },
                { val: '24h',     lbl: 'Confirmation'   },
                { val: 'Mon–Fri', lbl: 'Availability'   },
                { val: 'EST',     lbl: 'Timezone'       },
              ].map(s => (
                <div key={s.lbl} className="bk-hero-stat">
                  <strong>{s.val}</strong>
                  <span>{s.lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── BODY ── */}
      <div className="bk-body">
        <StepBar step={step} />

        {/* ── STEP 1: Date & Time ── */}
        {step === 1 && (
          <Reveal>
            <div className="bk-card">
              <div className="bk-step-grid">

                {/* Calendar */}
                <div>
                  <p className="bk-section-label">Select a Date</p>
                  <Calendar
                    selected={selDate}
                    onSelect={(d) => { setSelDate(d); setSelTime('') }}
                  />
                  <p className="bk-hint">Weekdays only (Mon – Fri) · All times in EST</p>
                </div>

                {/* Time slots */}
                <div>
                  <p className="bk-section-label" style={{ color: selDate ? undefined : '#93a3c4' }}>
                    {selDate ? `Times — ${dateLabel}` : 'Select a date to see times'}
                  </p>

                  {selDate ? (
                    <div className="bk-time-grid">
                      {TIME_SLOTS.map(t => (
                        <button
                          key={t}
                          onClick={() => setSelTime(t)}
                          className={`bk-time-btn${selTime === t ? ' selected' : ''}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="bk-time-empty">
                      <p>← Choose a date first</p>
                    </div>
                  )}

                  {selDate && selTime && (
                    <div style={{ marginTop: '1.25rem' }}>
                      <div className="bk-slot-preview" style={{ marginBottom: '1rem' }}>
                        <div className="bk-slot-lbl">Selected Slot</div>
                        <div className="bk-slot-val">{dateLabel} at {selTime} EST</div>
                      </div>
                      <button className="bk-btn-primary" onClick={() => setStep(2)}>
                        Continue → Enter Details
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </Reveal>
        )}

        {/* ── STEP 2: Details ── */}
        {step === 2 && (
          <Reveal>
            <div className="bk-card" style={{ maxWidth: 680, margin: '0 auto' }}>
              <div className="bk-slot-preview" style={{ marginBottom: '1.75rem' }}>
                <div className="bk-slot-lbl">Your Selected Slot</div>
                <div className="bk-slot-val">{dateLabel} at {selTime} EST</div>
              </div>

              <div className="bk-field-grid">
                <Field label="Full Name *">
                  <input className="bk-input" type="text" placeholder="John Doe" value={form.name} onChange={set('name')} required />
                </Field>
                <Field label="Email Address *">
                  <input className="bk-input" type="email" placeholder="john@company.com" value={form.email} onChange={set('email')} required />
                </Field>
                <Field label="Phone Number">
                  <input className="bk-input" type="tel" placeholder="+1 (325) 000-0000" value={form.phone} onChange={set('phone')} />
                </Field>
                <Field label="Company / Organisation">
                  <input className="bk-input" type="text" placeholder="Your company" value={form.company} onChange={set('company')} />
                </Field>
              </div>

              <Field label="Service of Interest *">
                <select className="bk-input bk-select" value={form.service} onChange={set('service')} required>
                  <option value="">Select a service…</option>
                  {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>

              <Field label="Additional Notes">
                <textarea
                  className="bk-input bk-textarea"
                  placeholder="Briefly describe what you'd like to discuss…"
                  value={form.notes}
                  onChange={set('notes')}
                />
              </Field>

              <div className="bk-btn-row">
                <button className="bk-btn-secondary" onClick={() => setStep(1)}>← Back</button>
                <button
                  className="bk-btn-primary"
                  style={{ flex: 2 }}
                  onClick={() => {
                    if (!form.name || !form.email || !form.service) return
                    setStep(3)
                  }}
                >
                  Review Booking →
                </button>
              </div>
            </div>
          </Reveal>
        )}

        {/* ── STEP 3: Confirm ── */}
        {step === 3 && (
          <Reveal>
            <div className="bk-card" style={{ maxWidth: 580, margin: '0 auto' }}>
              <div className="bk-card-title">Confirm Your Booking</div>
              <div className="bk-confirm-card">
                {[
                  ['Date & Time', `${dateLabel} at ${selTime} EST`],
                  ['Name',        form.name],
                  ['Email',       form.email],
                  ['Phone',       form.phone || '—'],
                  ['Company',     form.company || '—'],
                  ['Service',     form.service],
                  ['Notes',       form.notes || '—'],
                ].map(([l, v]) => (
                  <div key={l} className="bk-confirm-row">
                    <span className="bk-confirm-lbl">{l}</span>
                    <span className="bk-confirm-val">{v}</span>
                  </div>
                ))}
              </div>

              {error && <div className="bk-error">{error}</div>}

              <div className="bk-btn-row">
                <button className="bk-btn-secondary" onClick={() => setStep(2)}>← Edit</button>
                <button
                  className="bk-btn-primary"
                  style={{ flex: 2 }}
                  onClick={sendEmail}
                  disabled={loading}
                >
                  {loading ? 'Sending…' : 'Confirm Booking ✓'}
                </button>
              </div>
              <p className="bk-confirm-note">
                A confirmation will be sent to <strong>{form.email}</strong>. We'll follow up to confirm and share a meeting link.
              </p>
            </div>
          </Reveal>
        )}
      </div>

    </main>
  )
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = `
  /* ── Tokens ── */
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
  .bk-main {
    font-family: 'Segoe UI', system-ui, sans-serif;
    overflow-x: hidden;
    background: #f3f4f6;
    min-height: 100vh;
  }

  /* ── Reveal (matches ContactPage) ── */
  .reveal-block {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.65s ease var(--delay, 0ms), transform 0.65s ease var(--delay, 0ms);
  }
  .reveal-block.revealed { opacity: 1; transform: translateY(0); }

  /* ── Hero ── */
  .bk-hero {
    position: relative;
    padding: 6rem 2rem 4rem;
    background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 60%, #1d4ed8 100%);
    overflow: hidden;
    text-align: center;
  }
  .bk-hero-grid {
    position: absolute; inset: 0; opacity: 0.04;
    background-image:
      repeating-linear-gradient(90deg, #f97316 0, #f97316 1px, transparent 1px, transparent 64px),
      repeating-linear-gradient(0deg,  #f97316 0, #f97316 1px, transparent 1px, transparent 64px);
  }
  .bk-hero-glow {
    position: absolute; top: -10%; right: 10%;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%);
    border-radius: 50%;
  }
  .bk-hero-inner { position: relative; z-index: 1; max-width: 600px; margin: 0 auto; }
  .bk-hero-badge {
    display: inline-block; padding: 0.38rem 1.2rem;
    border: 1px solid rgba(249,115,22,0.4); border-radius: 999px;
    font-size: 0.6rem; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase;
    color: #fdba74; background: rgba(249,115,22,0.08); margin-bottom: 1.4rem;
  }
  .bk-hero h1 {
    font-size: clamp(2.4rem, 6vw, 4rem); font-weight: 800; color: #fff;
    line-height: 1.08; margin-bottom: 1.25rem;
  }
  .bk-hero h1 span { color: #fb923c; }
  .bk-hero-sub {
    font-size: 0.98rem; color: #bfdbfe; line-height: 1.8;
    max-width: 480px; margin: 0 auto 1.5rem;
  }
  .bk-hero-stats {
    display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; margin-top: 2rem;
  }
  .bk-hero-stat {
    padding: 0.6rem 1.4rem;
    background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.13);
    border-radius: 10px; text-align: center;
  }
  .bk-hero-stat strong { display: block; font-size: 1.4rem; font-weight: 800; color: #fb923c; }
  .bk-hero-stat span   { font-size: 0.62rem; letter-spacing: 0.18em; text-transform: uppercase; color: #bfdbfe; font-weight: 600; }

  /* ── Body ── */
  .bk-body {
    max-width: 1100px;
    margin: 2.5rem auto;
    padding: 0 1.5rem 5rem;
  }

  /* ── Step Bar ── */
  .bk-stepbar {
    display: flex; justify-content: center; align-items: center;
    gap: 0.5rem; padding: 0 1rem 2.25rem; flex-wrap: wrap;
  }
  .bk-step-item { display: flex; align-items: center; gap: 0.5rem; }
  .bk-step-dot {
    width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.72rem; font-weight: 700; transition: all 0.3s;
  }
  .bk-step-dot.done   { background: #f97316; border: 2px solid #f97316; color: #fff; }
  .bk-step-dot.active { background: #1e3a8a; border: 2px solid #f97316; color: #fff; }
  .bk-step-dot.idle   { background: #fff; border: 2px solid rgba(30,64,175,0.2); color: #93a3c4; }
  .bk-step-label {
    font-size: 0.72rem; color: #4b5563; white-space: nowrap; transition: all 0.3s;
  }
  .bk-step-label.active { color: #1e3a8a; font-weight: 700; }
  .bk-step-line {
    width: 2.5rem; height: 2px; border-radius: 1px;
    background: rgba(30,64,175,0.12); transition: background 0.3s;
  }
  .bk-step-line.done { background: #f97316; }

  /* ── Card ── */
  .bk-card {
    background: #fff;
    border: 1px solid rgba(30,64,175,0.1);
    border-radius: 20px;
    padding: 2.25rem;
    box-shadow: 0 4px 24px rgba(30,58,138,0.08);
  }
  .bk-card-title {
    font-size: clamp(1.4rem, 3vw, 1.9rem); font-weight: 800; color: #1e3a8a;
    margin-bottom: 1.5rem;
  }

  /* ── Step grid ── */
  .bk-step-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: start;
  }
  @media (max-width: 820px) { .bk-step-grid { grid-template-columns: 1fr; } }

  /* ── Section label ── */
  .bk-section-label {
    font-size: 0.6rem; font-weight: 700; letter-spacing: 0.2em;
    text-transform: uppercase; color: #374151; margin-bottom: 0.7rem;
  }
  .bk-hint { font-size: 0.73rem; color: #93a3c4; margin-top: 0.65rem; }

  /* ── Calendar ── */
  .bk-cal {
    background: #1e3a8a;
    border: 1px solid rgba(249,115,22,0.2);
    border-radius: 14px; overflow: hidden;
    box-shadow: 0 4px 20px rgba(30,58,138,0.15);
  }
  .bk-cal-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0.9rem 1.1rem; border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .bk-cal-btn {
    background: none; border: 1px solid rgba(255,255,255,0.15);
    border-radius: 6px; color: #93c5fd; cursor: pointer;
    padding: 0.28rem 0.65rem; font-size: 1rem; transition: all 0.2s;
  }
  .bk-cal-btn:hover { border-color: #f97316; color: #f97316; }
  .bk-cal-month { font-size: 1rem; font-weight: 700; color: #fff; }
  .bk-cal-hdr {
    display: grid; grid-template-columns: repeat(7, 1fr);
    padding: 0.6rem 0.75rem 0.25rem;
  }
  .bk-cal-daylbl {
    text-align: center; font-size: 0.55rem; font-weight: 700;
    letter-spacing: 0.1em; color: rgba(147,197,253,0.6);
  }
  .bk-cal-grid {
    display: grid; grid-template-columns: repeat(7, 1fr);
    padding: 0 0.75rem 0.75rem; gap: 3px;
  }
  .bk-cal-day {
    padding: 0.48rem; border-radius: 7px; border: none;
    background: rgba(255,255,255,0.06); color: #bfdbfe;
    font-family: 'Segoe UI', system-ui, sans-serif;
    font-size: 0.8rem; cursor: pointer; transition: all 0.15s; text-align: center;
  }
  .bk-cal-day:hover:not(:disabled) { background: rgba(249,115,22,0.22); color: #fb923c; }
  .bk-cal-day.selected { background: #f97316 !important; color: #fff !important; font-weight: 700; }
  .bk-cal-day:disabled { background: transparent; color: rgba(255,255,255,0.15); cursor: not-allowed; }

  /* ── Time grid ── */
  .bk-time-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.55rem; }
  .bk-time-btn {
    padding: 0.6rem; border-radius: 8px; cursor: pointer; transition: all 0.2s;
    border: 1.5px solid rgba(30,64,175,0.15);
    background: #fff; color: #374151;
    font-family: 'Segoe UI', system-ui, sans-serif;
    font-size: 0.82rem;
    box-shadow: 0 1px 4px rgba(30,58,138,0.06);
  }
  .bk-time-btn:hover { border-color: #f97316; color: #1e3a8a; background: rgba(249,115,22,0.05); }
  .bk-time-btn.selected { background: #1e3a8a !important; color: #fff !important; border-color: #f97316 !important; font-weight: 700; }
  .bk-time-empty {
    height: 200px; background: #f9fafb;
    border: 1.5px dashed rgba(30,64,175,0.15);
    border-radius: 14px; display: flex; align-items: center; justify-content: center;
  }
  .bk-time-empty p { font-size: 0.85rem; color: #93a3c4; }

  /* ── Slot preview banner ── */
  .bk-slot-preview {
    padding: 0.9rem 1.25rem;
    background: #1e3a8a; border: 1px solid #f97316;
    border-radius: 10px;
  }
  .bk-slot-lbl {
    font-size: 0.62rem; font-weight: 700; letter-spacing: 0.15em;
    text-transform: uppercase; color: #fb923c; margin-bottom: 0.2rem;
  }
  .bk-slot-val { font-size: 1rem; font-weight: 700; color: #fff; }

  /* ── Form fields ── */
  .bk-field-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 0;
  }
  @media (max-width: 600px) { .bk-field-grid { grid-template-columns: 1fr; } }
  .bk-field { margin-bottom: 1rem; }
  .bk-label {
    display: block; font-size: 0.58rem; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: #4a6fa5; margin-bottom: 0.42rem;
  }
  .bk-input {
    width: 100%; padding: 0.74rem 1rem;
    background: #fff; border: 1.5px solid rgba(30,64,175,0.15);
    border-radius: 8px; color: #1e3a8a;
    font-family: 'Segoe UI', system-ui, sans-serif; font-size: 0.88rem;
    outline: none; box-sizing: border-box; transition: all 0.2s;
  }
  .bk-input:focus { border-color: #f97316; box-shadow: 0 0 0 3px rgba(249,115,22,0.1); }
  .bk-select { appearance: none; cursor: pointer; }
  .bk-textarea { resize: vertical; min-height: 120px; }

  /* ── Buttons ── */
  .bk-btn-primary {
    width: 100%; padding: 0.9rem;
    background: #1e40af; color: #fff;
    font-family: 'Segoe UI', system-ui, sans-serif;
    font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
    border: none; border-radius: 8px; cursor: pointer;
    transition: all 0.25s;
  }
  .bk-btn-primary:hover:not(:disabled) {
    background: #f97316; transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(249,115,22,0.35);
  }
  .bk-btn-primary:disabled { opacity: 0.55; cursor: not-allowed; }
  .bk-btn-secondary {
    flex: 1; padding: 0.9rem;
    border: 1.5px solid rgba(30,64,175,0.18); background: #f3f4f6; color: #374151;
    font-family: 'Segoe UI', system-ui, sans-serif;
    font-size: 0.75rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
    border-radius: 8px; cursor: pointer; transition: all 0.2s;
  }
  .bk-btn-secondary:hover { border-color: #f97316; color: #1e3a8a; background: #fff; }
  .bk-btn-row { display: flex; gap: 1rem; margin-top: 1.5rem; }

  /* ── Confirm panel ── */
  .bk-confirm-card {
    background: #f9fafb; border: 1px solid rgba(30,64,175,0.08);
    border-radius: 12px; padding: 0.25rem 1.25rem; margin-bottom: 0.5rem;
  }
  .bk-confirm-row {
    display: flex; justify-content: space-between; align-items: flex-start;
    gap: 1rem; padding: 0.65rem 0;
    border-bottom: 1px solid rgba(30,64,175,0.07);
  }
  .bk-confirm-row:last-child { border-bottom: none; }
  .bk-confirm-lbl {
    font-size: 0.62rem; font-weight: 700; letter-spacing: 0.15em;
    text-transform: uppercase; color: #93a3c4; flex-shrink: 0;
  }
  .bk-confirm-val { font-size: 0.85rem; color: #1e3a8a; text-align: right; }
  .bk-confirm-note {
    font-size: 0.72rem; color: #93a3c4; text-align: center;
    margin-top: 1rem; line-height: 1.6;
  }

  /* ── Error ── */
  .bk-error {
    padding: 0.8rem 1.1rem;
    background: rgba(220,38,38,0.05); border: 1px solid rgba(220,38,38,0.2);
    border-radius: 8px; margin-top: 1rem;
    font-size: 0.82rem; color: #dc2626;
  }

  /* ── Success page ── */
  .bk-success-page {
    max-width: 520px; margin: 0 auto;
    padding: 8rem 1.75rem 4rem; text-align: center;
  }
  .bk-success-icon {
    width: 72px; height: 72px; border-radius: 50%;
    background: rgba(249,115,22,0.1); border: 2px solid #f97316;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1.5rem; font-size: 1.75rem; color: #f97316;
  }
  .bk-success-page h2 { font-size: 2.2rem; font-weight: 800; color: #1e3a8a; margin-bottom: 0.75rem; }
  .bk-success-page p  { font-size: 0.9rem; color: #4b5563; line-height: 1.75; }
`