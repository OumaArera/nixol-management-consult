import { useState, useRef, useEffect } from 'react'
import { X } from 'lucide-react'
import { gold, navy, navy2, white, t900, t700, t500, t400, d300, d400 } from '../utils/token'
import { Reveal, Badge, useMobile } from '../components/Shared'

// Replace with your actual data imports
// import { teamMembers } from '../../data/team'
// import { boardOfDirectors } from '../../data/boardMembers'
const boardOfDirectors = [
  { name: 'Board Member One', role: 'Chairman', experience: 'Over 20 years of experience in strategic business leadership and governance across West Africa.' },
  { name: 'Board Member Two', role: 'Non-Executive Director', experience: 'Extensive background in finance, risk management, and corporate strategy.' },
]

const teamMembers = [
  { name: 'Kwaku Duah Junior', role: 'Chief Executive Officer', image: '/ceo.png', initials: 'KD', bio: 'Visionary leader with a passion for business transformation and client excellence. Founded the firm in 2015 with a commitment to delivering measurable impact.' },
  { name: 'Managing Partner One', role: 'Managing Partner – Strategy', image: '/partner1.png', initials: 'MP', bio: 'Strategic advisor with deep expertise in business planning and market development.' },
  { name: 'Managing Partner Two', role: 'Managing Partner – Operations', image: '/partner2.png', initials: 'MP', bio: 'Operations specialist focused on efficiency, process design, and delivery excellence.' },
  { name: 'Managing Partner Three', role: 'Managing Partner – Finance', image: '/partner3.png', initials: 'MP', bio: 'Financial expert with extensive experience in accounting, audit, and advisory services.' },
  { name: 'Department Manager A', role: 'Manager – Events', image: '/manager1.png', initials: 'DA', bio: 'Creative event professional with a track record of delivering world-class corporate and social events.' },
  { name: 'Department Manager B', role: 'Manager – Design & Architecture', image: '/manager2.png', initials: 'DB', bio: 'Talented designer and architect bringing bold visions to life with precision and creativity.' },
]

function BoardCard({ name, role, experience, delay }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ opacity: 0, transform: 'translateY(24px)', transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      <div
        style={{
          padding: '2rem',
          background: white,
          border: '1px solid rgba(13,33,68,0.1)',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(13,33,68,0.07)',
          transition: 'all 0.3s',
          display: 'flex',
          gap: '1.25rem',
          alignItems: 'flex-start',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.45)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(13,33,68,0.12)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(13,33,68,0.1)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(13,33,68,0.07)' }}
      >
        {/* Initial avatar */}
        <div
          style={{
            width: '52px', height: '52px',
            borderRadius: '50%',
            background: 'rgba(201,168,76,0.1)',
            border: `2px solid ${gold}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '1.2rem',
            fontWeight: 700,
            color: gold,
            flexShrink: 0,
          }}
        >
          {name.charAt(0)}
        </div>
        <div>
          <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.2rem', fontWeight: 600, color: navy, marginBottom: '0.2rem' }}>{name}</h3>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: gold, marginBottom: '0.65rem' }}>{role}</p>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.8rem', color: t500, lineHeight: 1.65, margin: 0 }}>{experience}</p>
        </div>
      </div>
    </div>
  )
}

function TeamCard({ member, onClick, delay }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ opacity: 0, transform: 'translateY(24px)', transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      <div
        onClick={() => onClick(member)}
        style={{
          background: white,
          border: '1px solid rgba(13,33,68,0.1)',
          borderRadius: '16px',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'all 0.3s',
          boxShadow: '0 2px 10px rgba(13,33,68,0.06)',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(13,33,68,0.12)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(13,33,68,0.1)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(13,33,68,0.06)' }}
      >
        {/* Photo */}
        <div style={{ height: '190px', background: 'linear-gradient(135deg, #eef2fb, #dde6f5)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={member.image}
            alt={member.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
            onError={e => {
              e.target.style.display = 'none'
              const fb = document.createElement('div')
              fb.style.cssText = `width:72px;height:72px;border-radius:50%;background:rgba(13,33,68,0.08);border:2px solid ${gold};display:flex;align-items:center;justify-content:center;font-family:Georgia,serif;font-size:1.5rem;font-weight:700;color:${gold};`
              fb.textContent = member.initials || member.name.charAt(0)
              e.target.parentElement.appendChild(fb)
            }}
          />
        </div>
        <div style={{ padding: '1.25rem 1.5rem' }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.1rem', fontWeight: 600, color: navy, marginBottom: '0.2rem', lineHeight: 1.3 }}>{member.name}</h3>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: gold, margin: 0 }}>{member.role}</p>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.72rem', color: t500, margin: '0.5rem 0 0', opacity: 0.7 }}>Click to view profile →</p>
        </div>
      </div>
    </div>
  )
}

function TeamOverlay({ member, onClose }) {
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  if (!member) return null

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(13,33,68,0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        style={{
          background: white,
          borderRadius: '20px',
          maxWidth: '520px',
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
          position: 'relative',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '1rem', right: '1rem',
            background: 'rgba(13,33,68,0.08)', border: 'none',
            borderRadius: '50%', width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.2s', zIndex: 10,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = gold }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(13,33,68,0.08)' }}
        >
          <X size={16} color={navy} />
        </button>

        {/* Photo */}
        <div style={{ height: '220px', background: 'linear-gradient(135deg, #0d2144 0%, #1a3a6b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <img
            src={member.image}
            alt={member.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
            onError={e => {
              e.target.style.display = 'none'
              const fb = document.createElement('div')
              fb.style.cssText = `width:90px;height:90px;border-radius:50%;background:rgba(201,168,76,0.1);border:2px solid ${gold};display:flex;align-items:center;justify-content:center;font-family:Georgia,serif;font-size:2rem;font-weight:700;color:${gold};`
              fb.textContent = member.initials || member.name.charAt(0)
              e.target.parentElement.appendChild(fb)
            }}
          />
        </div>

        {/* Content */}
        <div style={{ padding: '2rem' }}>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: gold, marginBottom: '0.35rem' }}>{member.role}</p>
          <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.75rem', fontWeight: 700, color: navy, marginBottom: '1rem' }}>{member.name}</h3>
          <div style={{ width: '40px', height: '3px', background: gold, borderRadius: '2px', marginBottom: '1.25rem' }} />
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.86rem', color: t700, lineHeight: 1.75, margin: 0 }}>
            {member.bio || 'A dedicated professional committed to delivering exceptional results for our clients.'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function TeamSection() {
  const mobile = useMobile()
  const [selected, setSelected] = useState(null)

  const CEO = teamMembers.find(m => m.role === 'Chief Executive Officer')
  const partners = teamMembers.filter(m => m.role.includes('Managing Partner'))
  const others = teamMembers.filter(m => !m.role.includes('Managing Partner') && m.role !== 'Chief Executive Officer')

  return (
    <section id="team" style={{ background: '#f8faff' }}>
      {/* Header */}
      <div
        style={{
          padding: mobile ? '3rem 1.25rem 2.5rem' : '4.5rem 1.75rem 3rem',
          textAlign: 'center',
          background: '#f0f5ff',
          borderBottom: '1px solid rgba(13,33,68,0.08)',
        }}
      >
        <Reveal style={{ maxWidth: '640px', margin: '0 auto' }}>
          <Badge text="Our Team" />
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 700,
              color: navy,
              marginBottom: '1rem',
              lineHeight: 1.1,
            }}
          >
            The People Behind Our Work
          </h2>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.93rem', color: t500, lineHeight: 1.75 }}>
            Meet our dedicated professionals committed to your business success.
          </p>
        </Reveal>
      </div>

      {/* Board of Directors */}
      <section style={{ padding: mobile ? '3rem 1.25rem' : '5rem 1.75rem', background: white }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <Badge text="Governance" />
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 600, color: navy, marginBottom: '0.65rem' }}>Board of Directors</h3>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.86rem', color: t500, maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              Our Board provides strategic guidance ensuring we maintain our commitment to excellence and innovation.
            </p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: '1.25rem', maxWidth: '960px', margin: '0 auto' }}>
            {boardOfDirectors.map((d, i) => (
              <BoardCard key={d.name} {...d} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* Management Team */}
      <section style={{ padding: mobile ? '3rem 1.25rem' : '5rem 1.75rem', background: '#f0f5ff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <Badge text="Leadership" />
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 600, color: navy, marginBottom: '0.65rem' }}>Management Team</h3>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.86rem', color: t500, maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              Our dedicated management team drives our company forward with vision and expertise. Click any card to learn more.
            </p>
          </Reveal>

          {/* CEO */}
          {CEO && (
            <div style={{ marginBottom: '2.5rem' }}>
              <Reveal style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: t400 }}>Executive Leadership</p>
              </Reveal>
              <div style={{ maxWidth: '300px', margin: '0 auto' }}>
                <TeamCard member={CEO} onClick={setSelected} delay={0} />
              </div>
            </div>
          )}

          {/* Managing Partners */}
          {partners.length > 0 && (
            <div style={{ marginBottom: '2.5rem' }}>
              <Reveal style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: t400 }}>Managing Partners</p>
              </Reveal>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)', gap: '1.25rem' }}>
                {partners.map((m, i) => <TeamCard key={m.name} member={m} onClick={setSelected} delay={i * 80} />)}
              </div>
            </div>
          )}

          {/* Other */}
          {others.length > 0 && (
            <div>
              <Reveal style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: t400 }}>Department Managers</p>
              </Reveal>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: '1.25rem' }}>
                {others.map((m, i) => <TeamCard key={m.name} member={m} onClick={setSelected} delay={i * 80} />)}
              </div>
            </div>
          )}
        </div>
      </section>

      <TeamOverlay member={selected} onClose={() => setSelected(null)} />
    </section>
  )
}