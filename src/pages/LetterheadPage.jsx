import { useState } from 'react'

// ─── Change these credentials before deploying ────────────────────────────────
const AUTH = { username: 'nixol', password: 'NMC@2024!' }

// ─── Shared style tokens ──────────────────────────────────────────────────────
const gold = '#C9A84C'
const navy = '#0B1D3A'

// ─── Login Screen ─────────────────────────────────────────────────────────────

function LoginScreen({ onAuth }) {
  const [vals, setVals] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setBusy(true)
    setErr('')
    setTimeout(() => {
      if (vals.username === AUTH.username && vals.password === AUTH.password) {
        onAuth()
      } else {
        setErr('Invalid credentials.')
        setBusy(false)
      }
    }, 500)
  }

  const iStyle = {
    width: '100%', padding: '0.75rem 1rem',
    background: '#112549', border: '1px solid rgba(26,58,107,0.9)',
    borderRadius: '8px', color: '#fff',
    fontFamily: 'var(--font-body)', fontSize: '0.9rem',
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-navy-950)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: '380px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img src="/logo.png" alt="Nixol" style={{ height: '60px', width: 'auto', marginBottom: '1rem' }} />
        </div>

        <div style={{ background: 'var(--color-navy-900)', border: '1px solid rgba(26,58,107,0.7)', borderRadius: '16px', padding: '2.25rem' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 600, color: '#fff', textAlign: 'center', marginBottom: '0.4rem' }}>Secure Access</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--color-silver-500)', textAlign: 'center', marginBottom: '1.75rem' }}>Authorised personnel only</p>

          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Username */}
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-silver-400)', marginBottom: '0.45rem' }}>
                Username
              </label>
              <input
                type="text"
                value={vals.username}
                onChange={e => setVals(p => ({ ...p, username: e.target.value }))}
                required
                style={iStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(26,58,107,0.9)'}
              />
            </div>

            {/* Password with show/hide toggle */}
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-silver-400)', marginBottom: '0.45rem' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={vals.password}
                  onChange={e => setVals(p => ({ ...p, password: e.target.value }))}
                  required
                  style={{ ...iStyle, paddingRight: '3rem' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(26,58,107,0.9)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  title={showPassword ? 'Hide password' : 'Show password'}
                  style={{
                    position: 'absolute', right: '0.85rem', top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--color-silver-500)', fontSize: '1rem',
                    lineHeight: 1, padding: '0.25rem', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = gold}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--color-silver-500)'}
                >
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            {err && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#f87171', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '6px', padding: '0.6rem 1rem', textAlign: 'center' }}>{err}</p>
            )}

            <button
              type="submit"
              disabled={busy}
              style={{
                padding: '0.85rem', background: gold, color: navy,
                fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                border: 'none', borderRadius: '8px', cursor: busy ? 'not-allowed' : 'pointer',
                opacity: busy ? 0.7 : 1, transition: 'all 0.2s',
                marginTop: '0.25rem',
              }}
              onMouseEnter={e => { if (!busy) e.target.style.background = '#d4b86a' }}
              onMouseLeave={e => { e.target.style.background = gold }}
            >
              {busy ? 'Verifying…' : 'Access Letterhead'}
            </button>
          </form>
        </div>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--color-silver-600)', textAlign: 'center', marginTop: '1.5rem' }}>
          © {new Date().getFullYear()} Nixol Management & Consult
        </p>
      </div>
    </div>
  )
}

// ─── Letterhead Editor ────────────────────────────────────────────────────────

function LetterheadEditor() {
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  const [fields, setFields] = useState({
    date: today,
    recipientName: '',
    recipientTitle: '',
    recipientCompany: '',
    recipientAddress: '',
    reference: '',
    salutation: 'Dear Sir / Madam,',
    body: '',
    closing: 'Yours faithfully,',
    senderName: '',
    senderTitle: '',
  })

  const set = (k) => (e) => setFields(p => ({ ...p, [k]: e.target.value }))

  const download = () => window.print()

  const lInput = (extra = {}) => ({
    display: 'block',
    width: '100%',
    border: 'none',
    borderBottom: '1px dashed #d1d5db',
    outline: 'none',
    background: 'transparent',
    fontFamily: 'Georgia, serif',
    color: '#111827',
    lineHeight: 1.8,
    fontSize: '12pt',
    padding: '1px 0',
    ...extra,
  })

  return (
    <>
      {/* ── Toolbar (hidden on print) ── */}
      <div className="no-print" style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(11,29,58,0.96)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(201,168,76,0.18)', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src="/logo.png" alt="Nixol" style={{ height: '32px', width: 'auto' }} />
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 600, color: '#fff', margin: 0 }}>Letterhead Editor</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--color-silver-500)', margin: 0 }}>Fill in the fields · click Download to save as PDF</p>
          </div>
        </div>
        <button
          onClick={download}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.6rem 1.4rem', background: gold, color: navy,
            fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            border: 'none', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#d4b86a'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.background = gold; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          ⬇ Download PDF
        </button>
      </div>

      {/* ── Page canvas ── */}
      <div style={{ background: '#e5e7eb', minHeight: '100vh', padding: '2.5rem 1rem', display: 'flex', justifyContent: 'center' }}>
        {/* A4 sheet */}
        <div
          id="letterhead"
          style={{
            width: '210mm',
            minHeight: '297mm',
            background: '#ffffff',
            boxShadow: '0 4px 32px rgba(0,0,0,0.18)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* ── Header band ── */}
          <div style={{ background: `linear-gradient(135deg, ${navy} 0%, #1a3a6b 60%, ${navy} 100%)`, padding: '1.75rem 2.5rem 1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <img src="/logo.png" alt="Nixol Management & Consult" style={{ height: '56px', width: 'auto' }} />
              <p style={{ fontFamily: 'Georgia, serif', fontSize: '9pt', color: '#E8D5A3', letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>
                Built on Expertise. Driven by Integrity.
              </p>
            </div>
            <div style={{ height: '1.5px', background: `linear-gradient(to right, transparent, ${gold}, transparent)`, marginTop: '1rem' }} />
          </div>

          {/* Contact strip */}
          <div style={{ background: '#091629', padding: '0.5rem 2.5rem', display: 'flex', justifyContent: 'flex-end', gap: '2rem', borderBottom: `2px solid ${gold}` }}>
            {['📍 Nairobi, Kenya', '📧 info@nixolmc.com', '📞 +254 700 000 000'].map(t => (
              <span key={t} style={{ fontFamily: 'Georgia, serif', fontSize: '7.5pt', color: '#8B9BB4', letterSpacing: '0.05em' }}>{t}</span>
            ))}
          </div>

          {/* ── Letter body ── */}
          <div style={{ padding: '2rem 2.75rem', flex: 1 }}>
            {/* Date — right aligned */}
            <div style={{ textAlign: 'right', marginBottom: '1.75rem' }}>
              <input value={fields.date} onChange={set('date')} style={{ ...lInput({ width: '220px', textAlign: 'right', borderBottom: `1px dashed ${gold}` }) }} />
            </div>

            {/* Recipient block */}
            <div style={{ marginBottom: '1.5rem' }}>
              <input value={fields.recipientName} onChange={set('recipientName')} placeholder="Recipient Full Name" style={lInput({ fontWeight: 'bold' })} />
              <input value={fields.recipientTitle} onChange={set('recipientTitle')} placeholder="Title / Position" style={lInput()} />
              <input value={fields.recipientCompany} onChange={set('recipientCompany')} placeholder="Company / Organisation" style={lInput()} />
              <input value={fields.recipientAddress} onChange={set('recipientAddress')} placeholder="City, Country" style={lInput()} />
            </div>

            {/* Reference */}
            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '1.25rem' }}>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: '12pt', fontWeight: 'bold', color: '#374151', flexShrink: 0 }}>RE:</span>
              <input value={fields.reference} onChange={set('reference')} placeholder="Letter subject / reference" style={{ ...lInput({ borderBottom: `1px dashed ${gold}`, fontWeight: 'bold', textTransform: 'uppercase', fontSize: '11pt' }), flex: 1 }} />
            </div>

            {/* Thin gold rule */}
            <div style={{ height: '1px', background: gold, opacity: 0.25, marginBottom: '1.25rem' }} />

            {/* Salutation */}
            <input value={fields.salutation} onChange={set('salutation')} style={{ ...lInput({ width: '280px', marginBottom: '0.75rem' }) }} />

            {/* Body */}
            <textarea
              value={fields.body}
              onChange={set('body')}
              placeholder="Type the body of your letter here…"
              rows={13}
              style={{
                display: 'block', width: '100%',
                border: '1px dashed #d1d5db', borderRadius: '4px',
                outline: 'none', background: '#fafafa',
                fontFamily: 'Georgia, serif', fontSize: '12pt',
                color: '#1f2937', lineHeight: 1.9,
                padding: '0.75rem', resize: 'vertical',
                boxSizing: 'border-box', marginBottom: '1.5rem',
              }}
            />

            {/* Closing */}
            <input value={fields.closing} onChange={set('closing')} style={{ ...lInput({ width: '220px', marginBottom: '2.5rem' }) }} />

            {/* Signature block */}
            <div style={{ borderBottom: '1px solid #9ca3af', width: '220px', marginBottom: '0.4rem' }} />
            <input value={fields.senderName} onChange={set('senderName')} placeholder="Authorised Signatory" style={{ ...lInput({ fontWeight: 'bold', width: '280px' }) }} />
            <input value={fields.senderTitle} onChange={set('senderTitle')} placeholder="Title / Designation" style={{ ...lInput({ fontSize: '11pt', color: '#6b7280', width: '280px' }) }} />
            <p style={{ fontFamily: 'Georgia, serif', fontSize: '10pt', color: '#6b7280', marginTop: '0.3rem' }}>For and on behalf of Nixol Management & Consult</p>
          </div>

          {/* ── Footer band ── */}
          <div>
            <div style={{ height: '1.5px', background: `linear-gradient(to right, transparent, ${gold}, transparent)` }} />
            <div style={{ background: navy, padding: '0.6rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: '7.5pt', color: '#8B9BB4', letterSpacing: '0.1em' }}>NIXOL MANAGEMENT & CONSULT</span>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: '7.5pt', color: gold, letterSpacing: '0.08em' }}>Built on Expertise. Driven by Integrity.</span>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: '7.5pt', color: '#8B9BB4' }}>www.nixolmc.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Print stylesheet */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; margin: 0 !important; padding: 0 !important; }
          #letterhead {
            width: 210mm !important;
            min-height: 297mm !important;
            box-shadow: none !important;
            margin: 0 !important;
          }
          input, textarea { border: none !important; background: transparent !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>
    </>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LetterheadPage() {
  const [authed, setAuthed] = useState(false)
  return authed ? <LetterheadEditor /> : <LoginScreen onAuth={() => setAuthed(true)} />
}