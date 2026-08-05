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

    // Pure Constellation Particle Configuration
    const particleCount = Math.min(Math.floor(width / 40), 32)
    const particles = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 1,
        alpha: Math.random() * 0.45 + 0.35,
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

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true })

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Render interactive mouse spotlight aura (Linear/Vercel luxury spotlight effect)
      if (mouse.x !== null && mouse.y !== null) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 250)
        gradient.addColorStop(0, 'rgba(214, 199, 178, 0.09)')
        gradient.addColorStop(0.5, 'rgba(214, 199, 178, 0.025)')
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)
      }

      // Update & render constellation particles & thread connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        // Bounce off screen edges
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        // Render micro particle node
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(214, 199, 178, ${p.alpha})`
        ctx.fill()

        // Connect nearby particles with subtle threads
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.28
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(214, 199, 178, ${lineAlpha})`
            ctx.lineWidth = 0.85
            ctx.stroke()
          }
        }

        // Interactive mouse cursor connection
        if (mouse.x !== null && mouse.y !== null) {
          const mdx = p.x - mouse.x
          const mdy = p.y - mouse.y
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy)

          if (mdist < mouse.maxDist) {
            const mLineAlpha = (1 - mdist / mouse.maxDist) * 0.5
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(214, 199, 178, ${mLineAlpha})`
            ctx.lineWidth = 1.1
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
      {/* Ambient background aurora light waves */}
      <div className="bg-glow-orb orb-top-left" />
      <div className="bg-glow-orb orb-center-right" />
      <div className="bg-glow-orb orb-bottom-left" />

      {/* Pure interactive constellation canvas */}
      <canvas ref={canvasRef} className="particle-canvas" />
    </div>
  )
}
