import React, { useState } from 'react'
import useInView from '../hooks/useInView'
import SectionTitle from './SectionTitle'

const EXPERIENCES = [
  {
    role: 'Full Stack Web Developer Intern',
    company: 'REDFORT TECHNOLOGIES',
    type: 'Internship',
    duration: '2026 — Present',
    status: 'current',
    location: 'On-site',
    stack: ['React', 'Next.js', 'PostgreSQL', 'Node.js', 'REST APIs', 'Git'],
    description:
      'Working as a Full Stack Web Developer Intern at REDFORT TECHNOLOGIES, contributing to the design and development of modern, scalable web applications. Collaborating with a cross-functional team to build responsive frontends with React and Next.js, and designing robust backend systems backed by PostgreSQL databases.',
    highlights: [
      'Building production-ready UIs with React & Next.js App Router',
      'Designing and optimising PostgreSQL schemas and queries',
      'Developing and consuming RESTful APIs for client–server communication',
      'Participating in code reviews and following industry-standard workflows',
    ],
  },
  {
    role: 'Full Stack Developer & App Dev Team Lead',
    company: 'ANCHORLOGICS.NET',
    type: 'Internship',
    duration: '2026 — Present',
    status: 'current',
    location: 'Remote',
    stack: ['React', 'Next.js', 'PostgreSQL', 'Flutter', 'Dart', 'Node.js', 'REST APIs', 'Git'],
    description:
      'Working remotely at AnchorLogics.net as a Full Stack Developer covering both Web and App development. Leading the App Development team while contributing to frontend and backend web projects — building responsive web apps with React & Next.js, scalable backends with PostgreSQL, and cross-platform mobile apps with Flutter.',
    highlights: [
      'Leading the App Development team — planning, assigning tasks & reviewing code',
      'Building cross-platform mobile applications using Flutter & Dart',
      'Developing full-stack web apps with React, Next.js & PostgreSQL',
      'Designing and consuming RESTful APIs across web and mobile platforms',
      'Collaborating asynchronously in a remote-first, cross-functional team',
    ],
  },
]


export default function Experience() {
  const [ref, inView] = useInView()
  const [expanded, setExpanded] = useState(null)

  return (
    <section
      id="experience"
      ref={ref}
      style={{
        padding: '7rem 2rem',
        background: 'var(--bg)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '-10%',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(214,199,178,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative' }}>
        <SectionTitle title="My Experience" sub="Where I've Worked" />

        {/* Timeline wrapper */}
        <div style={{ position: 'relative' }}>

          {/* Vertical line */}
          <div
            style={{
              position: 'absolute',
              left: 22,
              top: 8,
              bottom: 8,
              width: 1,
              background: 'linear-gradient(to bottom, rgba(214,199,178,0.35), rgba(214,199,178,0.08), transparent)',
            }}
          />

          {EXPERIENCES.map((exp, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '2rem',
                marginBottom: '2rem',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateX(0)' : 'translateX(-28px)',
                transition: `opacity 0.7s ease ${i * 0.15}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
              }}
            >
              {/* Timeline dot column */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flexShrink: 0,
                  paddingTop: '1.6rem',
                }}
              >
                {/* Dot */}
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: exp.status === 'current'
                      ? 'linear-gradient(135deg, rgba(214,199,178,0.18), rgba(214,199,178,0.06))'
                      : 'var(--bg-card)',
                    border: exp.status === 'current'
                      ? '1.5px solid rgba(214,199,178,0.45)'
                      : '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                    boxShadow: exp.status === 'current'
                      ? '0 0 20px rgba(214,199,178,0.15)'
                      : 'none',
                    zIndex: 2,
                    position: 'relative',
                  }}
                >
                  💼
                </div>
              </div>

              {/* Card */}
              <div
                className="hover-lift"
                style={{
                  flex: 1,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  padding: '1.8rem 2rem',
                  backdropFilter: 'blur(12px)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s ease',
                  cursor: 'default',
                }}
              >
                {/* Top accent bar for current role */}
                {exp.status === 'current' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background:
                        'linear-gradient(90deg, transparent, rgba(214,199,178,0.6), rgba(214,199,178,0.6), transparent)',
                    }}
                  />
                )}

                {/* Header row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    marginBottom: '0.9rem',
                  }}
                >
                  <div>
                    {/* Role */}
                    <h3
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: 'var(--cream)',
                        fontFamily: "'Playfair Display', serif",
                        marginBottom: '0.2rem',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {exp.role}
                    </h3>

                    {/* Company */}
                    <p
                      style={{
                        color: 'var(--accent)',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        fontFamily: "'DM Mono', monospace",
                      }}
                    >
                      {exp.company}
                    </p>
                  </div>

                  {/* Badges */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
                    {/* Duration */}
                    <span
                      style={{
                        background: 'transparent',
                        border: '1px solid rgba(214,199,178,0.2)',
                        color: 'var(--text-muted)',
                        fontSize: '0.7rem',
                        fontFamily: "'DM Mono', monospace",
                        padding: '3px 10px',
                        borderRadius: 3,
                        letterSpacing: '0.08em',
                      }}
                    >
                      {exp.duration}
                    </span>

                    {/* Current badge */}
                    {exp.status === 'current' && (
                      <span
                        style={{
                          background: 'rgba(74,222,128,0.08)',
                          border: '1px solid rgba(74,222,128,0.3)',
                          color: '#4ade80',
                          fontSize: '0.65rem',
                          fontFamily: "'DM Mono', monospace",
                          padding: '3px 10px',
                          borderRadius: 3,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 5,
                        }}
                      >
                        <span
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: '50%',
                            background: '#4ade80',
                            display: 'inline-block',
                            animation: 'pulse 2s ease-in-out infinite',
                          }}
                        />
                        Active
                      </span>
                    )}
                  </div>
                </div>

                {/* Meta row */}
                <div
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '1.1rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <span
                    style={{
                      color: 'var(--text-dim)',
                      fontSize: '0.75rem',
                      fontFamily: "'DM Mono', monospace",
                      letterSpacing: '0.05em',
                    }}
                  >
                    📍 {exp.location}
                  </span>
                  <span
                    style={{
                      color: 'var(--text-dim)',
                      fontSize: '0.75rem',
                      fontFamily: "'DM Mono', monospace",
                      letterSpacing: '0.05em',
                    }}
                  >
                    🎓 {exp.type}
                  </span>
                </div>

                {/* Divider */}
                <div
                  style={{
                    height: 1,
                    background: 'var(--border)',
                    marginBottom: '1.1rem',
                  }}
                />

                {/* Description */}
                <p
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.86rem',
                    lineHeight: 1.9,
                    fontWeight: 300,
                    marginBottom: '1.2rem',
                  }}
                >
                  {exp.description}
                </p>

                {/* Highlights */}
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 1.4rem 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  {exp.highlights.map((h, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.65rem',
                        color: 'var(--text-muted)',
                        fontSize: '0.83rem',
                        lineHeight: 1.65,
                        fontWeight: 300,
                      }}
                    >
                      <span
                        style={{
                          color: 'var(--accent)',
                          fontSize: '0.65rem',
                          marginTop: '0.35rem',
                          flexShrink: 0,
                        }}
                      >
                        ▹
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Stack tags */}
                <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                  {exp.stack.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        background: 'transparent',
                        border: '1px solid rgba(214,199,178,0.18)',
                        color: 'var(--text-muted)',
                        fontSize: '0.7rem',
                        fontFamily: "'DM Mono', monospace",
                        padding: '3px 10px',
                        borderRadius: 3,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
