import React, { useState } from 'react'
import useInView from '../hooks/useInView'
import SectionTitle from './SectionTitle'
import SERVICES from '../data/services'

export default function Services() {
  const [ref, inView] = useInView()

  return (
    <section id="services" style={{ padding: '7rem 2rem', position: 'relative', background: 'var(--bg-surface)' }} ref={ref}>
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0,
        width: '100%', height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(214,199,178,0.1), transparent)',
      }} />

      <div className="container">
        <SectionTitle title="My Services" sub="What I offer" />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.2rem',
        }}>
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service, index, inView }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: hovered ? 'rgba(255,255,255,0.045)' : 'var(--bg-card)',
        border: `1px solid ${hovered ? 'rgba(214,199,178,0.18)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 8,
        padding: '2.2rem',
        overflow: 'hidden',
        cursor: 'default',
        transform: inView ? (hovered ? 'translateY(-5px)' : 'translateY(0)') : 'translateY(28px)',
        opacity: inView ? 1 : 0,
        transition: `opacity 0.55s ease ${index * 0.1}s, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)`,
        backdropFilter: 'blur(8px)',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      {/* Soft corner glow on hover */}
      <div style={{
        position: 'absolute',
        top: -60, right: -60,
        width: 160, height: 160,
        background: 'radial-gradient(circle, rgba(214,199,178,0.07), transparent)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.45s ease',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />

      {/* Icon box */}
      <div style={{
        width: 52, height: 52, borderRadius: 6,
        background: 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? 'rgba(214,199,178,0.2)' : 'rgba(255,255,255,0.08)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22, marginBottom: '1.4rem',
        transition: 'all 0.35s ease',
        opacity: 0.85,
      }}>
        {service.icon}
      </div>

      <h3 style={{
        color: 'var(--cream)',
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 600,
        fontSize: '0.95rem',
        marginBottom: '0.75rem',
        letterSpacing: '-0.01em',
      }}>
        {service.title}
      </h3>

      <p style={{
        color: 'var(--text-muted)',
        fontSize: '0.875rem',
        lineHeight: 1.9,
        fontWeight: 300,
      }}>
        {service.desc}
      </p>

      {/* Bottom accent line */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0,
        height: 1,
        width: hovered ? '100%' : 0,
        background: 'linear-gradient(to right, rgba(214,199,178,0.4), rgba(168,162,158,0.2))',
        transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }} />
    </div>
  )
}
