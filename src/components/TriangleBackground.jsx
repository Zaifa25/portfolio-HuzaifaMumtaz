import React from 'react'
import '../styles/triangles.css'

// Pre-defined set of decorative background triangles with varying sizes, positions, and speeds
const TRIANGLES = [
  { id: 1, top: '5%', left: '8%', size: 60, delay: '0s', duration: '18s', fill: 'none', strokeWidth: 1.5, opacity: 0.25, rotate: 15 },
  { id: 2, top: '12%', right: '10%', size: 90, delay: '2s', duration: '24s', fill: 'rgba(214,199,178,0.04)', strokeWidth: 1, opacity: 0.3, rotate: 45 },
  { id: 3, top: '22%', left: '85%', size: 45, delay: '4s', duration: '16s', fill: 'none', strokeWidth: 1.5, opacity: 0.2, rotate: -20 },
  { id: 4, top: '30%', left: '5%', size: 110, delay: '1s', duration: '28s', fill: 'rgba(214,199,178,0.03)', strokeWidth: 1, opacity: 0.22, rotate: 60 },
  { id: 5, top: '38%', right: '15%', size: 70, delay: '3s', duration: '20s', fill: 'none', strokeWidth: 2, opacity: 0.35, rotate: -40 },
  { id: 6, top: '48%', left: '12%', size: 55, delay: '5s', duration: '19s', fill: 'rgba(214,199,178,0.05)', strokeWidth: 1, opacity: 0.28, rotate: 30 },
  { id: 7, top: '56%', right: '6%', size: 85, delay: '2.5s', duration: '22s', fill: 'none', strokeWidth: 1.5, opacity: 0.25, rotate: 10 },
  { id: 8, top: '65%', left: '78%', size: 100, delay: '6s', duration: '26s', fill: 'rgba(214,199,178,0.03)', strokeWidth: 1, opacity: 0.2, rotate: -50 },
  { id: 9, top: '74%', left: '6%', size: 65, delay: '1.5s', duration: '21s', fill: 'none', strokeWidth: 1.5, opacity: 0.3, rotate: 75 },
  { id: 10, top: '82%', right: '12%', size: 80, delay: '4.5s', duration: '25s', fill: 'rgba(214,199,178,0.04)', strokeWidth: 1, opacity: 0.25, rotate: -15 },
  { id: 11, top: '90%', left: '20%', size: 50, delay: '3.5s', duration: '17s', fill: 'none', strokeWidth: 2, opacity: 0.35, rotate: 35 },
  { id: 12, top: '95%', right: '25%', size: 95, delay: '0.5s', duration: '23s', fill: 'rgba(214,199,178,0.03)', strokeWidth: 1, opacity: 0.2, rotate: -70 },
]

export default function TriangleBackground() {
  return (
    <div className="triangle-bg-wrapper" aria-hidden="true">
      {/* Ambient background glow grid */}
      <div className="triangle-grid-overlay" />

      {TRIANGLES.map(t => (
        <div
          key={t.id}
          className="triangle-item"
          style={{
            top: t.top,
            left: t.left,
            right: t.right,
            width: t.size,
            height: t.size,
            animationDelay: t.delay,
            animationDuration: t.duration,
            opacity: t.opacity,
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            style={{
              transform: `rotate(${t.rotate}deg)`,
              filter: 'drop-shadow(0 0 10px rgba(214, 199, 178, 0.2))',
            }}
          >
            <polygon
              points="50,10 90,90 10,90"
              fill={t.fill}
              stroke="var(--accent)"
              strokeWidth={t.strokeWidth}
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ))}
    </div>
  )
}
