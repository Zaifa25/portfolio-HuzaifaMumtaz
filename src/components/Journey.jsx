import React from 'react'
import useInView from '../hooks/useInView'
import SectionTitle from './SectionTitle'
import TIMELINE from '../data/timeline'

export default function Journey() {
  const [ref, inView] = useInView()

  return (
    <section id="journey" style={{
      padding: '7rem 2rem',
      background: 'var(--bg)',
      position: 'relative',
    }} ref={ref}>

      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <SectionTitle title="My Journey" sub="The road that led here" />

        <div style={{ position: 'relative' }}>
          {/* Center line */}
          <div style={{
            position: 'absolute',
            left: '50%', top: 0, bottom: 0,
            width: 1,
            background: 'linear-gradient(to bottom, rgba(214,199,178,0.25), rgba(214,199,178,0.08), transparent)',
            transform: 'translateX(-50%)',
          }} />

          {TIMELINE.map((item, i) => (
            <div
              key={item.year}
              style={{
                display: 'flex',
                justifyContent: item.side === 'left' ? 'flex-start' : 'flex-end',
                marginBottom: '2.5rem',
                position: 'relative',
                opacity: inView ? 1 : 0,
                transform: inView
                  ? 'translateX(0)'
                  : `translateX(${item.side === 'left' ? -32 : 32}px)`,
                transition: `opacity 0.65s ease ${i * 0.15}s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`,
              }}
            >
              {/* Card */}
              <div style={{
                width: '44%',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 6,
                padding: '1.4rem 1.6rem',
                [item.side === 'left' ? 'marginRight' : 'marginLeft']: '6%',
                backdropFilter: 'blur(8px)',
                transition: 'border-color 0.3s ease',
              }}
                className="hover-lift"
              >
                {/* Year badge */}
                <div style={{
                  display: 'inline-block',
                  background: 'transparent',
                  border: '1px solid rgba(214,199,178,0.2)',
                  color: 'var(--accent)',
                  fontSize: '0.68rem',
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 400,
                  padding: '3px 10px',
                  borderRadius: 2,
                  marginBottom: '0.7rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  {item.year}
                </div>
                <h4 style={{
                  color: 'var(--cream)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  marginBottom: '0.45rem',
                  letterSpacing: '-0.01em',
                }}>
                  {item.title}
                </h4>
                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.82rem',
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}>
                  {item.desc}
                </p>
              </div>

              {/* Center dot */}
              <div style={{
                position: 'absolute',
                left: '50%', top: '1.3rem',
                width: 9, height: 9,
                borderRadius: '50%',
                background: 'var(--accent)',
                transform: 'translateX(-50%)',
                boxShadow: '0 0 16px rgba(214, 199, 178, 0.4)',
                zIndex: 2,
                border: '2px solid var(--bg)',
                opacity: 0.8,
              }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
