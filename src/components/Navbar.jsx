import React, { useState, useEffect } from 'react'
import '../styles/navbar.css'
import '../styles/components.css'

export default function Navbar({ active, navLinks }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <div className="navbar-logo" onClick={() => scrollTo('home')} title="Go to top" role="button" tabIndex={0}>
          <span className="bracket"></span>
          <span className="name">Huzaifa</span>
          <span className="accent">Mumtaz</span>
          <span className="bracket"></span>
        </div>

        <div className="navbar-links">
          {navLinks.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className={`nav-link ${active === link.toLowerCase() ? 'active' : ''}`}
            >
              {link}
            </button>
          ))}
        </div>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className={`mobile-nav-link ${active === link.toLowerCase() ? 'active' : ''}`}
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
