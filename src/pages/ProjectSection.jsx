import { useState, useEffect, useRef } from 'react';
import { gold, navy, navy2, white, t900, t700, t500, t400, d400 } from '../utils/token';
import { Reveal, Badge, useMobile } from '../components/Shared';

// Replace with your actual project data import
// import { projects } from '../../data/projects'
const projects = [
  { name: 'Sample Client 1', location: 'Accra, Ghana', type: 'consultation', image: ['/project1.jpg'], sector: 'Business Consultancy', tagline: 'Driving strategic growth through expert advisory.', highlight: 'Improved operational efficiency by 40%.' },
  { name: 'Sample Client 2', location: 'Kumasi, Ghana', type: 'event', image: ['/project2.jpg'], sector: 'Event Planning', tagline: 'An unforgettable corporate summit executed flawlessly.', highlight: '500+ attendees, zero logistical issues.' },
  { name: 'Sample Client 3', location: 'Accra, Ghana', type: 'accounting', image: ['/project3.jpg'], sector: 'Accounting & Audit', tagline: 'Full compliance achieved ahead of regulatory deadline.', highlight: 'Clean audit report delivered on time.' },
  { name: 'Sample Client 4', location: 'Tamale, Ghana', type: 'architecture', image: ['/project4.jpg'], sector: 'Architectural Design', tagline: 'A modern commercial complex brought to life.', highlight: 'Award-winning design recognised regionally.' },
  { name: 'Sample Client 5', location: 'Accra, Ghana', type: 'logo', image: ['/project5.jpg'], sector: 'Brand & Logo Design', tagline: 'A brand identity that resonates and endures.', highlight: 'Brand recognition increased significantly post-launch.' },
  { name: 'Sample Client 6', location: 'Accra, Ghana', type: 'construction', image: ['/project6.jpg'], sector: 'Building Construction', tagline: 'Quality construction delivered on time and on budget.', highlight: 'Project completed 2 weeks ahead of schedule.' },
]

const filterOptions = [
  { value: 'all',          label: 'All Clients' },
  { value: 'event',        label: 'Event Planning' },
  { value: 'consultation', label: 'Business Consultancy' },
  { value: 'logo',         label: 'Logo Design' },
  { value: 'architecture', label: 'Architectural Design' },
  { value: 'construction', label: 'Construction' },
  { value: 'accounting',   label: 'Accounting & Audit' },
]

const INDUSTRIES = [
  'Education & NGOs',
  'Oil & Gas',
  'Professional Services',
  'Retail & Distribution',
  'Healthcare & Medical',
  'Real Estate & Construction',
  'Startups & SMEs',
]

function ClientCard({ project, delay }) {
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
    <div ref={ref} style={{ opacity: 0, transform: 'translateY(24px)', transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`, height: '100%' }}>
      <div
        style={{
          background: white,
          border: '1px solid rgba(13,33,68,0.1)',
          borderRadius: '16px',
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 4px 20px rgba(13,33,68,0.07)',
          transition: 'all 0.35s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.45)'; e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(13,33,68,0.13)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(13,33,68,0.1)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(13,33,68,0.07)' }}
      >
        {/* Image / Logo area */}
        <div
          style={{
            height: '180px',
            background: 'linear-gradient(135deg, #0d2144 0%, #1a3a6b 100%)',
            borderBottom: `3px solid ${gold}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(90deg,#C9A84C 0,#C9A84C 1px,transparent 1px,transparent 48px),repeating-linear-gradient(0deg,#C9A84C 0,#C9A84C 1px,transparent 1px,transparent 48px)' }} />
          <img
            src={project.image[0]}
            alt={project.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 1 }}
            onError={e => {
              e.target.style.display = 'none'
              const fb = e.target.parentElement.querySelector('.img-fallback')
              if (fb) fb.style.display = 'block'
            }}
          />
          <div
            className="img-fallback"
            style={{
              display: 'none',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '2.2rem',
              fontWeight: 700,
              color: white,
              letterSpacing: '0.05em',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {project.name.charAt(0)}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {/* Sector badge */}
          <span
            style={{
              alignSelf: 'flex-start',
              padding: '0.25rem 0.75rem',
              background: 'rgba(201,168,76,0.08)',
              border: '1px solid rgba(201,168,76,0.25)',
              borderRadius: '999px',
              fontFamily: "'Lato', sans-serif",
              fontSize: '0.58rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: gold,
            }}
          >
            {project.sector || project.type}
          </span>

          {/* Name & location */}
          <div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.3rem', fontWeight: 600, color: navy, marginBottom: '0.2rem' }}>{project.name}</h3>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.75rem', color: t500, margin: 0 }}>📍 {project.location}</p>
          </div>

          {/* Tagline */}
          {project.tagline && (
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '0.98rem', fontStyle: 'italic', color: t700, lineHeight: 1.5, margin: 0 }}>
              "{project.tagline}"
            </p>
          )}

          {/* Highlight */}
          {project.highlight && (
            <div
              style={{
                padding: '0.75rem 1rem',
                background: '#f0f5ff',
                border: '1px solid rgba(13,33,68,0.08)',
                borderLeft: `3px solid ${gold}`,
                borderRadius: '0 8px 8px 0',
                marginTop: 'auto',
              }}
            >
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.75rem', color: t700, margin: 0, lineHeight: 1.55 }}>
                <strong style={{ color: navy, fontWeight: 600 }}>Result: </strong>{project.highlight}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  const mobile = useMobile()
  const [activeFilter, setActiveFilter] = useState('all')
  const [filtered, setFiltered] = useState(projects)

  useEffect(() => {
    setFiltered(activeFilter === 'all' ? projects : projects.filter(p => p.type === activeFilter))
  }, [activeFilter])

  return (
    <section id="clients" style={{ background: '#f8faff' }}>
      {/* Header */}
      <div
        style={{
          position: 'relative',
          padding: mobile ? '3rem 1.25rem 2.5rem' : '4.5rem 1.75rem 3rem',
          textAlign: 'center',
          background: navy,
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 50% 70%, rgba(201,168,76,0.07) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'repeating-linear-gradient(90deg,#C9A84C 0,#C9A84C 1px,transparent 1px,transparent 72px),repeating-linear-gradient(0deg,#C9A84C 0,#C9A84C 1px,transparent 1px,transparent 72px)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto' }}>
          <Badge text="Our Clients" dark />
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 700,
              color: white,
              marginBottom: '1rem',
              lineHeight: 1.1,
            }}
          >
            Organizations That Trust Us
          </h2>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.93rem', color: d400, lineHeight: 1.75 }}>
            Our clients are at the heart of everything we do. We serve a wide range of industries with unwavering commitment and expertise.
          </p>
        </div>
      </div>

      {/* Filter pills */}
      <div style={{ background: white, borderBottom: '1px solid rgba(13,33,68,0.08)', padding: '1.5rem 1.75rem' }}>
        <Reveal>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
            {filterOptions.map(({ value, label }) => {
              const active = activeFilter === value
              return (
                <button
                  key={value}
                  onClick={() => setActiveFilter(value)}
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: '999px',
                    fontFamily: "'Lato', sans-serif",
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    border: `1px solid ${active ? gold : 'rgba(13,33,68,0.15)'}`,
                    background: active ? navy : '#f8faff',
                    color: active ? gold : t700,
                    boxShadow: active ? '0 2px 8px rgba(13,33,68,0.15)' : 'none',
                  }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = gold; e.currentTarget.style.color = navy } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = 'rgba(13,33,68,0.15)'; e.currentTarget.style.color = t700 } }}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </Reveal>
      </div>

      {/* Client cards grid */}
      <div style={{ padding: mobile ? '2rem 1.25rem 4rem' : '3.5rem 1.75rem 5rem', maxWidth: '1100px', margin: '0 auto' }}>
        {filtered.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: mobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
              alignItems: 'start',
            }}
          >
            {filtered.map((project, i) => (
              <ClientCard key={project.name + i} project={project} delay={i * 80} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.9rem', color: t500 }}>No clients found for this filter.</p>
          </div>
        )}
      </div>

      {/* Industries strip */}
      <div style={{ padding: mobile ? '2.5rem 1.25rem' : '3.5rem 1.75rem', background: '#f0f5ff', borderTop: '1px solid rgba(13,33,68,0.07)' }}>
        <Reveal style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: t400, marginBottom: '1.5rem' }}>
            Industries We Serve
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            {INDUSTRIES.map(ind => (
              <span
                key={ind}
                style={{
                  padding: '0.5rem 1.1rem',
                  background: white,
                  border: '1px solid rgba(13,33,68,0.12)',
                  borderRadius: '999px',
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '0.78rem',
                  color: t700,
                  cursor: 'default',
                  transition: 'all 0.2s',
                  boxShadow: '0 1px 4px rgba(13,33,68,0.04)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.color = navy; e.currentTarget.style.background = 'rgba(201,168,76,0.06)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(13,33,68,0.12)'; e.currentTarget.style.color = t700; e.currentTarget.style.background = white }}
              >
                {ind}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}