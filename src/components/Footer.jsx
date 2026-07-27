import React from 'react'
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaEnvelope,
} from 'react-icons/fa6'
import '../styles/components.css'

const NAV_LINKS = ['Home', 'About', 'Experience', 'Achievements', 'Skills', 'Projects', 'Services', 'Contact']

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
  {
    icon: <FaEnvelope />,
    label: 'Email',
    href: 'mailto:huzaifamumtaz@example.com',
  },
]
export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '4rem 2rem 3rem',
      background: 'var(--bg-deep)',
      position: 'relative',
    }}>
      {/* Top accent */}
      <div style={{
        position: 'absolute',
        top: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: 48, height: 1,
        background: 'linear-gradient(to right, transparent, rgba(214,199,178,0.35), transparent)',
      }} />

      <div className="container" style={{ textAlign: 'center' }}>
        {/* Logo */}
        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '0.85rem',
          fontWeight: 400,
          marginBottom: '1.8rem',
          letterSpacing: '0.12em',
          opacity: 0.7,
        }}>
          <span style={{ color: 'rgba(214,199,178,0.5)' }}></span>
          <span style={{ color: 'var(--cream)' }}>HUZAIFA </span>
          <span style={{ color: 'var(--cream)' }}>MUMTAZ</span>
          <span style={{ color: 'rgba(214,199,178,0.5)' }}></span>
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.2rem', marginBottom: '2rem' }}>
          {NAV_LINKS.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--text-dim)', fontSize: '0.72rem',
                fontFamily: 'inherit', transition: 'color 0.3s',
                padding: '0.35rem 0.75rem',
                borderRadius: 4,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--text-muted)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-dim)'}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Social icons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.55rem', marginBottom: '2.5rem' }}>
          {SOCIALS.map(s => (
            <a key={s.label} href={s.href} title={s.label} aria-label={s.label} target="_blank" rel="noopener noreferrer" className="social-icon" style={{ width: 36, height: 36, fontSize: 15 }}>
              {s.icon}
            </a>
          ))}
        </div>

        <div style={{ width: '100%', height: 1, background: 'var(--border)', marginBottom: '1.8rem', opacity: 0.5 }} />

        <p style={{ color: 'var(--text-dim)', fontSize: '0.72rem', fontFamily: "'DM Mono', monospace", letterSpacing: '0.08em' }}>
          © {new Date().getFullYear()} Huzaifa Mumtaz &nbsp;·&nbsp; Built with React &nbsp;·&nbsp; All rights reserved
        </p>
      </div>
    </footer>
  )
}
