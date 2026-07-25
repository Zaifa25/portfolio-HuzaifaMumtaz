import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Services from './components/Services'
import Experience from './components/Experience'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ChatBot from './components/ChatBot'

const NAV_LINKS = ['Home', 'About', 'Experience', 'Achievements', 'Skills', 'Projects', 'Services', 'Contact']

export default function App() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const observers = []
    NAV_LINKS.forEach(link => {
      const el = document.getElementById(link.toLowerCase())
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(link.toLowerCase()) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <>
      <Navbar active={active} navLinks={NAV_LINKS} />
      <main>
        {/* ── Hero ── */}
        <Hero />
        {/* ── About ── */}
        <About />
        {/* ── Experience ── */}
        <Experience />
        {/* ── Achievements ── */}
        <Achievements />
        {/* ── Skills ── */}
        <Skills />
        {/* ── Projects ── */}
        <Projects />
        {/* ── Services ── */}
        <Services />
        {/* ── Contact ── */}
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <ChatBot />
    </>
  )
}