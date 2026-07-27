import React, { useState } from 'react'
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaEnvelope,
} from 'react-icons/fa6'
import useInView from '../hooks/useInView'
import SectionTitle from './SectionTitle'
import '../styles/components.css'

const CONTACT_INFO = [
  { icon: '✉️', label: 'Email', value: 'huzaifamumtaz.work@gmail.com' },
  { icon: '📞', label: 'Phone', value: '+92 3265415612' },
  { icon: '📍', label: 'Location', value: 'Islamabad, Pakistan' },
]

const SOCIALS = [
  {
    icon: <FaGithub />,
    label: 'GitHub',
    href: 'https://github.com/Zaifa25',
  },
  {
    icon: <FaLinkedin />,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/huzaifa-mumtaz-99b985343',
  },
  {
    icon: <FaXTwitter />,
    label: 'Twitter',
    href: 'https://twitter.com/huzaifamumtaz',
  },

]
const inputStyle = {
  width: '100%',
  background: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: 4,
  padding: '12px 16px',
  color: 'var(--cream)',
  fontSize: '0.9rem',
  outline: 'none',
  fontFamily: "'DM Sans', inherit",
  boxSizing: 'border-box',
  transition: 'border-color 0.3s ease, background 0.3s ease',
}

export default function Contact() {
  const [ref, inView] = useInView()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
  e.preventDefault()
  if (!form.name || !form.email || !form.message) {
    setError('Please fill in all fields.')
    return
  }
  setError('')
  setLoading(true)   // ← ADD THIS

  try {
    const res = await fetch('https://formspree.io/f/xgoqvggg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setSent(true)
    } else {
      setError('Something went wrong. Please try again.')
    }
  } catch {
    setError('Network error. Please try again.')
  }

  setLoading(false)  // ← ADD THIS
}

  return (
    <section id="contact" style={{ padding: '7rem 2rem', position: 'relative', background: 'var(--bg-surface)' }} ref={ref}>
      <div style={{
        position: 'absolute',
        bottom: '20%', right: 0,
        width: 300, height: 300,
        background: 'radial-gradient(circle, rgba(214,199,178,0.04), transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <SectionTitle title="Get In Touch" sub="Let's build something great" />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4.5rem',
        }}>
          {/* ── Left: Info ── */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateX(-36px)',
            transition: 'all 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
          }}>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.55rem',
              fontWeight: 700,
              color: 'var(--cream)',
              marginBottom: '1rem',
              lineHeight: 1.25,
              letterSpacing: '-0.025em',
            }}>
              Ready to start your{' '}
              <span style={{ background: 'var(--gradient-warm)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                next project?
              </span>
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: '2.2rem', fontSize: '0.9rem', fontWeight: 300 }}>
              I'm available for freelance projects and full-time positions.
              Let's discuss how I can add value to your team or project.
            </p>

            {CONTACT_INFO.map(c => (
              <div key={c.label} style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.2rem' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 6, flexShrink: 0,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, opacity: 0.8,
                }}>
                  {c.icon}
                </div>
                <div>
                  <div style={{ color: 'var(--text-dim)', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: "'DM Mono', monospace" }}>{c.label}</div>
                  <div style={{ color: 'var(--cream)', fontWeight: 400, fontSize: '0.9rem', marginTop: 3 }}>{c.value}</div>
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', gap: '0.55rem', marginTop: '1.8rem' }}>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} title={s.label} aria-label={s.label} target="_blank" rel="noopener noreferrer" className="social-icon">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateX(36px)',
            transition: 'all 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}>
            {sent ? (
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 8, padding: '3.5rem', textAlign: 'center',
              }}>
                <div style={{ fontSize: 48, marginBottom: '1rem', opacity: 0.8 }}>✅</div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  color: 'var(--cream)', fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.5rem'
                }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-muted)', fontWeight: 300, fontSize: '0.9rem' }}>I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 8, padding: '2.2rem',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {[
                  { name: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
                  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
                ].map(f => (
                  <div key={f.name} style={{ marginBottom: '1.3rem' }}>
                    <label style={{ display: 'block', color: 'var(--text-dim)', fontSize: '0.7rem', marginBottom: 8, fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: "'DM Mono', monospace" }}>
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      name={f.name}
                      placeholder={f.placeholder}
                      value={form[f.name]}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={e => {
                        e.target.style.borderColor = 'rgba(214, 199, 178, 0.25)'
                        e.target.style.background = 'rgba(255,255,255,0.05)'
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                        e.target.style.background = 'rgba(255, 255, 255, 0.03)'
                      }}
                    />
                  </div>
                ))}

                <div style={{ marginBottom: '1.6rem' }}>
                  <label style={{ display: 'block', color: 'var(--text-dim)', fontSize: '0.7rem', marginBottom: 8, fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: "'DM Mono', monospace" }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={handleChange}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={e => {
                      e.target.style.borderColor = 'rgba(214, 199, 178, 0.25)'
                      e.target.style.background = 'rgba(255,255,255,0.05)'
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                      e.target.style.background = 'rgba(255, 255, 255, 0.03)'
                    }}
                  />
                </div>

                {error && (
                  <p style={{ color: 'var(--accent)', fontSize: '0.82rem', marginBottom: '1rem', opacity: 0.8 }}>{error}</p>
                )}

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
