import React from 'react'
import '../styles/triangles.css'

// Vibrant set of floating geometric triangles with bright warm gold/cream strokes
const TRIANGLES = [
  { id: 1, top: '6%', left: '5%', size: 70, delay: '0s', duration: '16s', fill: 'rgba(214,199,178,0.06)', strokeWidth: 2, opacity: 0.55, rotate: 15 },
  { id: 2, top: '15%', right: '8%', size: 100, delay: '2s', duration: '22s', fill: 'none', strokeWidth: 2.2, opacity: 0.6, rotate: 45 },
  { id: 3, top: '28%', left: '88%', size: 50, delay: '4s', duration: '15s', fill: 'rgba(214,199,178,0.08)', strokeWidth: 1.8, opacity: 0.5, rotate: -20 },
  { id: 4, top: '35%', left: '4%', size: 120, delay: '1s', duration: '26s', fill: 'none', strokeWidth: 1.5, opacity: 0.45, rotate: 60 },
  { id: 5, top: '45%', right: '12%', size: 80, delay: '3s', duration: '18s', fill: 'rgba(214,199,178,0.07)', strokeWidth: 2, opacity: 0.65, rotate: -40 },
  { id: 6, top: '55%', left: '10%', size: 65, delay: '5s', duration: '17s', fill: 'none', strokeWidth: 2, opacity: 0.55, rotate: 30 },
  { id: 7, top: '68%', right: '5%', size: 90, delay: '2.5s', duration: '20s', fill: 'rgba(214,199,178,0.05)', strokeWidth: 2.2, opacity: 0.6, rotate: 10 },
  { id: 8, top: '78%', left: '80%', size: 110, delay: '6s', duration: '24s', fill: 'none', strokeWidth: 1.8, opacity: 0.5, rotate: -50 },
  { id: 9, top: '85%', left: '6%', size: 75, delay: '1.5s', duration: '19s', fill: 'rgba(214,199,178,0.08)', strokeWidth: 2, opacity: 0.6, rotate: 75 },
  { id: 10, top: '92%', right: '15%', size: 85, delay: '4.5s', duration: '21s', fill: 'none', strokeWidth: 2, opacity: 0.55, rotate: -15 },
  { id: 11, top: '20%', left: '48%', size: 60, delay: '3.5s', duration: '19s', fill: 'rgba(214,199,178,0.05)', strokeWidth: 1.8, opacity: 0.45, rotate: 35 },
  { id: 12, top: '60%', left: '46%', size: 95, delay: '0.5s', duration: '23s', fill: 'none', strokeWidth: 2, opacity: 0.5, rotate: -70 },
]

export default function TriangleBackground() {
  return (
    <div className="triangle-bg-wrapper" aria-hidden="true">
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
              filter: 'drop-shadow(0 0 14px rgba(214, 199, 178, 0.45))',
            }}
          >
            <polygon
              points="50,10 90,90 10,90"
              fill={t.fill}
              stroke="#D6C7B2"
              strokeWidth={t.strokeWidth}
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ))}
    </div>
  )
}
