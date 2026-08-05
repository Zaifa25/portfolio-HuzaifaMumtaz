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

    // Balanced Micro-Star Constellation Pool (56 particles)
    const particleCount = Math.min(Math.floor(width / 24), 56)
    const particles = []

    for (let i = 0; i < particleCount; i++) {
      const isGlowing = i % 5 === 0
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.42,
        vy: (Math.random() - 0.5) * 0.42,
        radius: isGlowing ? Math.random() * 2.2 + 1.3 : Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.4 + 0.3,
        glow: isGlowing,
        pulseAngle: Math.random() * Math.PI * 2,
      })
    }

    // Mouse tracking for interactive connection
    let mouse = { x: null, y: null, maxDist: 160 }

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

      const isLight = document.documentElement.getAttribute('data-theme') === 'light'
      const rgb = isLight ? '180, 83, 9' : '214, 199, 178'

      // Render interactive mouse spotlight aura
      if (mouse.x !== null && mouse.y !== null) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 260)
        gradient.addColorStop(0, `rgba(${rgb}, 0.09)`)
        gradient.addColorStop(0.5, `rgba(${rgb}, 0.025)`)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)
      }

      // Update & render expanded constellation dot particles & thread connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.pulseAngle += 0.03

        // Bounce off screen edges
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        // Core dot node
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb}, ${p.alpha})`
        ctx.fill()

        // Outer soft glow halo for pulse nodes
        if (p.glow) {
          const pulseScale = 1 + Math.sin(p.pulseAngle) * 0.35
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius * 2.4 * pulseScale, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${rgb}, ${p.alpha * 0.22})`
          ctx.fill()
        }

        // Connect nearby particles with subtle threads
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 105) {
            const lineAlpha = (1 - dist / 105) * 0.25
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(${rgb}, ${lineAlpha})`
            ctx.lineWidth = 0.8
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
            ctx.strokeStyle = `rgba(${rgb}, ${mLineAlpha})`
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
