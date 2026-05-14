import { useRef, useEffect, useState } from 'react'
import { gold, navy, t700, t500, t400, d300, d400, white } from '../utils/token';

// ── Hooks ─────────────────────────────────────────────────────────────────────
export function useMobile() {
  const [mobile, setMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return mobile
}

export function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
        obs.disconnect()
      }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

// ── Components ────────────────────────────────────────────────────────────────
export function Reveal({ children, style = {}, delay = 0 }) {
  const ref = useReveal()
  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: 'translateY(24px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export const Badge = ({ text, dark = false }) => (
  <span
    style={{
      display: 'inline-block',
      padding: '0.35rem 1.1rem',
      border: `1px solid ${dark ? 'rgba(201,168,76,0.35)' : 'rgba(13,33,68,0.15)'}`,
      borderRadius: '999px',
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: '0.62rem',
      fontWeight: 600,
      letterSpacing: '0.25em',
      textTransform: 'uppercase',
      color: dark ? gold : t700,
      marginBottom: '1.25rem',
      background: dark ? 'rgba(201,168,76,0.06)' : 'rgba(13,33,68,0.04)',
    }}
  >
    {text}
  </span>
)

// ── Dark hero section header ──────────────────────────────────────────────────
export function PageHero({ badge, title, subtitle, dark = true }) {
  const mobile = useMobile()
  return (
    <section
      style={{
        position: 'relative',
        padding: mobile ? '5.5rem 1.25rem 3rem' : '6.5rem 1.75rem 4rem',
        textAlign: 'center',
        overflow: 'hidden',
        background: navy,
      }}
    >
      {/* Radial glow */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 50% 80%, rgba(201,168,76,0.08) 0%, transparent 65%)' }} />
      {/* Grid pattern */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'repeating-linear-gradient(90deg,#C9A84C 0,#C9A84C 1px,transparent 1px,transparent 72px),repeating-linear-gradient(0deg,#C9A84C 0,#C9A84C 1px,transparent 1px,transparent 72px)' }} />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto' }}>
        <Badge text={badge} dark />
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            fontWeight: 700,
            color: white,
            marginBottom: '1rem',
            lineHeight: 1.1,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.95rem', color: d400, lineHeight: 1.75 }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}

// ── Section CTA strip ─────────────────────────────────────────────────────────
export function CTAStrip({ heading, sub, primaryLabel, primaryTo, secondaryLabel, secondaryTo, dark = true }) {
  const mobile = useMobile()
  return (
    <section
      style={{
        position: 'relative',
        padding: mobile ? '3.5rem 1.25rem' : '5rem 1.75rem',
        background: dark ? navy : '#f0f5ff',
        overflow: 'hidden',
        textAlign: 'center',
        borderTop: dark ? 'none' : '1px solid rgba(13,33,68,0.08)',
      }}
    >
      {dark && (
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(201,168,76,0.09) 0%, transparent 55%), radial-gradient(circle at 75% 50%, rgba(26,58,107,0.4) 0%, transparent 55%)' }} />
      )}
      <Reveal style={{ position: 'relative', zIndex: 1, maxWidth: '620px', margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 600,
            color: dark ? white : navy,
            marginBottom: '1rem',
            lineHeight: 1.2,
          }}
        >
          {heading}
        </h2>
        {sub && (
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.9rem', color: dark ? d400 : t500, lineHeight: 1.75, marginBottom: '2.25rem' }}>
            {sub}
          </p>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          <a
            href={primaryTo}
            style={{
              padding: '0.9rem 2.25rem',
              background: gold,
              color: navy,
              fontFamily: "'Lato', sans-serif",
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '7px',
              transition: 'all 0.25s',
              display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#d4b86a'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(201,168,76,0.35)' }}
            onMouseLeave={e => { e.currentTarget.style.background = gold; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
          >
            {primaryLabel}
          </a>
          {secondaryLabel && (
            <a
              href={secondaryTo}
              style={{
                padding: '0.9rem 2.25rem',
                border: `1px solid ${dark ? 'rgba(201,168,76,0.35)' : 'rgba(13,33,68,0.2)'}`,
                color: dark ? d300 : t700,
                fontFamily: "'Lato', sans-serif",
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '7px',
                transition: 'all 0.25s',
                background: 'transparent',
                display: 'inline-block',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.color = dark ? white : navy }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = dark ? 'rgba(201,168,76,0.35)' : 'rgba(13,33,68,0.2)'; e.currentTarget.style.color = dark ? d300 : t700 }}
            >
              {secondaryLabel}
            </a>
          )}
        </div>
      </Reveal>
    </section>
  )
}