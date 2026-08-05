import React from 'react'
import useInView from '../hooks/useInView'
import SectionTitle from './SectionTitle'
import '../styles/components.css'

const STATS = [
  { val: '10+', label: 'Projects Done' },
  { val: '10+', label: 'GitHub Repos' },
]

const CARDS = [
  { icon: '🎓', title: 'BSc Computer Science', sub: 'COMSATS University Islamabad · 2022–2026' },
  { icon: '📜', title: 'Full Stack Certification', sub: 'Meta Professional Certificate · 2022' },
  { icon: '💼', title: 'Freelance Developer', sub: 'Self-employed · 2021–Present' },
  { icon: '🌐', title: 'Open Source Contributor', sub: 'React & Node.js ecosystem · 2022–Present' },
]

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section id="about" ref={ref} style={{
      padding: '7rem 2rem',
      background: 'transparent',
      position: 'relative',
      zIndex: 2,
    }}>
      {/* Subtle side accent */}
      <div style={{
        position: 'absolute',
        left: 0, top: '10%', bottom: '10%',
        width: 1,
        background: 'linear-gradient(to bottom, transparent, rgba(214,199,178,0.2), transparent)',
        borderRadius: 1,
        opacity: 0.5,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <SectionTitle title="About Me" sub="Who I am & what I do" />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'start',
        }}>
          {/* ── Left ── */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateX(-36px)',
            transition: 'all 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
          }}>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.65rem',
              fontWeight: 700,
              color: 'var(--cream)',
              marginBottom: '1.2rem',
              lineHeight: 1.25,
              letterSpacing: '-0.025em',
            }}>
              Passionate{' '}
              <span style={{ background: 'var(--gradient-warm)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Developer
              </span>{' '}
              & Problem Solver
            </h3>

            <p style={{ color: 'var(--text-muted)', lineHeight: 1.95, marginBottom: '1rem', fontSize: '0.92rem', fontWeight: 300 }}>
              I’m a Full-Stack Developer and AI Automation Enthusiast dedicated to transforming complex ideas into scalable, real-world digital solutions. As a Computer Science graduate from COMSATS University Islamabad, I specialize in building modern web applications, intelligent automation systems, and high-performance software solutions that deliver seamless user experiences.

              My expertise spans frontend and backend development using HTML, CSS, Bootstrap, JavaScript, React, Next.js, PostgreSQL, MySQL, and REST APIs, along with AI-powered automation workflows using n8n and modern web technologies. I enjoy creating responsive interfaces, automation systems, chatbot solutions, and scalable applications with clean architecture, optimized performance, and user-focused design.

              I’m passionate about continuous learning, solving real-world challenges, and leveraging emerging technologies to build innovative software that delivers measurable impact. I thrive in collaborative environments and am eager to contribute to teams developing cutting-edge web, automation, AI-driven, and cloud-based solutions.
            </p>

            {/* <p style={{ color: 'var(--text-muted)', lineHeight: 1.95, marginBottom: '2.5rem', fontSize: '0.92rem', fontWeight: 300 }}>
              My expertise spans frontend and backend development using HTML, CSS, Bootstrap, JavaScript, React, PHP, and Laravel, along with AI-powered automation workflows using n8n and advanced web technologies. I enjoy creating responsive interfaces, automation systems, chatbot solutions, and scalable applications with clean architecture, optimized performance, and user-focused design.
            </p> */}

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7rem' }}>
              {STATS.map(s => (
                <div key={s.label} style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                  padding: '1.1rem 1.2rem',
                  textAlign: 'center',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                  className="hover-lift"
                >
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    background: 'var(--gradient-warm)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    {s.val}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: 4, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'DM Mono', monospace" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Cards ── */}
          {/* ── Right: Code Editor ── */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateX(36px)',
            transition: 'all 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}>
            {/* Editor Window */}
            <div className="code-editor-card">
              {/* Title Bar */}
              <div className="code-title-bar">
                {/* Traffic lights */}
                <div style={{ display: 'flex', gap: 6 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57' }} />
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E' }} />
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C840' }} />
                </div>
                <span className="code-title-text">profile.json</span>
              </div>

              {/* Code Body */}
              <div style={{ padding: '28px 32px', fontSize: '0.88rem', lineHeight: 2 }}>
                <span className="code-punct">{'{'}</span><br />

                <span style={{ paddingLeft: 28 }}>
                  <span className="code-key">"name"</span>
                  <span className="code-punct">: </span>
                  <span className="code-val-str">"Muhammad Huzaifa Mumtaz"</span>
                  <span className="code-punct">,</span>
                </span><br />

                <span style={{ paddingLeft: 28 }}>
                  <span className="code-key">"role"</span>
                  <span className="code-punct">: </span>
                  <span className="code-val-str">"CS Graduate"</span>
                  <span className="code-punct">,</span>
                </span><br />

                <span style={{ paddingLeft: 28 }}>
                  <span className="code-key">"university"</span>
                  <span className="code-punct">: </span>
                  <span className="code-val-str">"COMSATS University Islamabad"</span>
                  <span className="code-punct">,</span>
                </span><br />

                <span style={{ paddingLeft: 28 }}>
                  <span className="code-key">"location"</span>
                  <span className="code-punct">: </span>
                  <span className="code-val-str">"Islamabad, PK"</span>
                  <span className="code-punct">,</span>
                </span><br />

                <span style={{ paddingLeft: 28 }}>
                  <span className="code-key">"focus"</span>
                  <span className="code-punct">: [</span>
                </span><br />

                {['AI Automation', 'Full Stack Dev', 'DevOps'].map((item, i, arr) => (
                  <span key={item} style={{ paddingLeft: 52, display: 'block' }}>
                    <span className="code-val-str">"{item}"</span>
                    <span className="code-punct">{i < arr.length - 1 ? ',' : ''}</span>
                  </span>
                ))}

                <span style={{ paddingLeft: 28, display: 'block' }}>
                  <span className="code-punct">],</span>
                </span><br />

                <span style={{ paddingLeft: 28 }}>
                  <span className="code-key">"status"</span>
                  <span className="code-punct">: </span>
                  <span className="code-val-str">"Open to Work ✓"</span>
                </span><br />

                <span className="code-punct">{'}'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
