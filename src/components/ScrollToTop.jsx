import React, { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      style={{
        position: 'fixed',
        bottom: 90,
        right: 30,
        zIndex: 999,
        width: 42,
        height: 42,
        borderRadius: '6px',
        background: 'rgba(10, 10, 10, 0.92)',
        border: '1px solid rgba(255,255,255,0.12)',
        cursor: 'pointer',
        fontSize: 14,
        color: 'var(--text-muted)',
        backdropFilter: 'blur(16px)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, color 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.borderColor = 'rgba(214,199,178,0.25)'
        e.currentTarget.style.color = 'var(--cream)'
        e.currentTarget.style.boxShadow = '0 12px 36px rgba(0,0,0,0.5)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
        e.currentTarget.style.color = 'var(--text-muted)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      ↑
    </button>
  )
}
