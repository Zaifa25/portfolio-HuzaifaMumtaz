import React, { useEffect, useRef } from 'react'
import '../styles/professionalBg.css'

export default function ProfessionalBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Particle constellation configuration
    const particleCount = Math.min(Math.floor(width / 22), 55)
    const particles = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 1,
        alpha: Math.random() * 0.5 + 0.25,
      })
    }

    // Mouse tracking for interactive connection
    let mouse = { x: null, y: null, maxDist: 150 }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        // Bounce off canvas edges
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        // Render particle dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(214, 199, 178, ${p.alpha})`
        ctx.shadowBlur = 8
        ctx.shadowColor = 'rgba(214, 199, 178, 0.4)'
        ctx.fill()

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 115) {
            const lineAlpha = (1 - dist / 115) * 0.18
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(214, 199, 178, ${lineAlpha})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }

        // Connect to mouse cursor
        if (mouse.x !== null && mouse.y !== null) {
          const mdx = p.x - mouse.x
          const mdy = p.y - mouse.y
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy)

          if (mdist < mouse.maxDist) {
            const mLineAlpha = (1 - mdist / mouse.maxDist) * 0.35
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(214, 199, 178, ${mLineAlpha})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="professional-bg-container" aria-hidden="true">
      {/* Ambient background light gradients */}
      <div className="bg-glow-orb orb-top-left" />
      <div className="bg-glow-orb orb-bottom-right" />

      {/* Interactive canvas particle constellation */}
      <canvas ref={canvasRef} className="particle-canvas" />

      {/* Floating glass code emblems */}
      <div className="floating-emblem emblem-1">{'</>'}</div>
      <div className="floating-emblem emblem-2">{'01'}</div>
      <div className="floating-emblem emblem-3">{'{ }'}</div>
      <div className="floating-emblem emblem-4">{'⚡'}</div>
      <div className="floating-emblem emblem-5">{'AI'}</div>
    </div>
  )
}
