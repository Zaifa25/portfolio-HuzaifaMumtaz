import React, { useEffect, useRef } from 'react'
import '../styles/professionalBg.css'

export default function ProfessionalBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    let animationFrameId
    let resizeTimeout

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        width = canvas.width = window.innerWidth
        height = canvas.height = window.innerHeight
      }, 100)
    }

    window.addEventListener('resize', handleResize, { passive: true })

    // Particle constellation configuration (featherweight pool)
    const particleCount = Math.min(Math.floor(width / 45), 28)
    const particles = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 1,
        alpha: Math.random() * 0.4 + 0.35,
      })
    }

    // Floating professional geometric shapes (Hexagons, Diamonds, Orbits)
    const shapes = [
      { xRatio: 0.08, yRatio: 0.18, radius: 36, type: 'hexagon', speed: 0.003, alpha: 0.28, angle: 0 },
      { xRatio: 0.90, yRatio: 0.25, radius: 48, type: 'diamond', speed: -0.002, alpha: 0.22, angle: 0 },
      { xRatio: 0.06, yRatio: 0.55, radius: 42, type: 'orbit', speed: 0.0025, alpha: 0.25, angle: 0 },
      { xRatio: 0.92, yRatio: 0.68, radius: 52, type: 'hexagon', speed: -0.003, alpha: 0.24, angle: 0 },
      { xRatio: 0.12, yRatio: 0.85, radius: 38, type: 'diamond', speed: 0.0035, alpha: 0.26, angle: 0 },
      { xRatio: 0.86, yRatio: 0.92, radius: 44, type: 'orbit', speed: -0.002, alpha: 0.2, angle: 0 },
    ]

    // Mouse tracking for interactive connection
    let mouse = { x: null, y: null, maxDist: 140 }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true })

    // Helper functions for drawing shapes
    const drawHexagon = (x, y, radius, angle, alpha) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(angle)
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3
        const px = radius * Math.cos(a)
        const py = radius * Math.sin(a)
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.strokeStyle = `rgba(214, 199, 178, ${alpha})`
      ctx.lineWidth = 1.2
      ctx.stroke()
      ctx.restore()
    }

    const drawDiamond = (x, y, size, angle, alpha) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(angle)
      ctx.beginPath()
      ctx.moveTo(0, -size)
      ctx.lineTo(size, 0)
      ctx.lineTo(0, size)
      ctx.lineTo(-size, 0)
      ctx.closePath()
      ctx.strokeStyle = `rgba(214, 199, 178, ${alpha})`
      ctx.lineWidth = 1.2
      ctx.stroke()
      ctx.restore()
    }

    const drawOrbit = (x, y, radius, angle, alpha) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(angle)
      ctx.beginPath()
      ctx.arc(0, 0, radius, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(214, 199, 178, ${alpha * 0.7})`
      ctx.lineWidth = 1
      ctx.setLineDash([4, 6])
      ctx.stroke()
      ctx.setLineDash([])
      // Inner glowing core dot
      ctx.beginPath()
      ctx.arc(0, 0, 3, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(214, 199, 178, ${alpha * 1.2})`
      ctx.fill()
      ctx.restore()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // 1. Draw rotating geometric shapes
      for (let i = 0; i < shapes.length; i++) {
        const s = shapes[i]
        s.angle += s.speed
        const sx = s.xRatio * width
        const sy = s.yRatio * height

        if (s.type === 'hexagon') drawHexagon(sx, sy, s.radius, s.angle, s.alpha)
        else if (s.type === 'diamond') drawDiamond(sx, sy, s.radius, s.angle, s.alpha)
        else if (s.type === 'orbit') drawOrbit(sx, sy, s.radius, s.angle, s.alpha)
      }

      // 2. Update & render particles constellation
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        // Core dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(214, 199, 178, ${p.alpha})`
        ctx.fill()

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 100) {
            const lineAlpha = (1 - dist / 100) * 0.25
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
            const mLineAlpha = (1 - mdist / mouse.maxDist) * 0.45
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
      clearTimeout(resizeTimeout)
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

      {/* Interactive canvas particle & geometric shape constellation */}
      <canvas ref={canvasRef} className="particle-canvas" />
    </div>
  )
}
