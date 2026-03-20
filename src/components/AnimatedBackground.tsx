'use client'

import { useEffect, useRef } from 'react'

interface Orb {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  hue: number
  opacity: number
  phase: number
  speed: number
}

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  twinkleSpeed: number
  twinklePhase: number
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let w = window.innerWidth
    let h = window.innerHeight
    canvas.width = w
    canvas.height = h

    // Aurora orbs — slow drifting nebula blobs
    const orbs: Orb[] = [
      { x: w * 0.1,  y: h * 0.2, vx: 0.18, vy: 0.10, radius: w * 0.38, hue: 160, opacity: 0.18, phase: 0,    speed: 0.0008 },
      { x: w * 0.85, y: h * 0.15, vx: -0.12, vy: 0.14, radius: w * 0.32, hue: 220, opacity: 0.14, phase: 2.1, speed: 0.0006 },
      { x: w * 0.5,  y: h * 0.75, vx: 0.08, vy: -0.16, radius: w * 0.42, hue: 270, opacity: 0.12, phase: 4.2, speed: 0.0007 },
      { x: w * 0.7,  y: h * 0.5,  vx: -0.15, vy: -0.09, radius: w * 0.28, hue: 190, opacity: 0.10, phase: 1.0, speed: 0.0009 },
      { x: w * 0.2,  y: h * 0.8,  vx: 0.14, vy: 0.08,  radius: w * 0.25, hue: 140, opacity: 0.09, phase: 3.3, speed: 0.001  },
    ]

    // Subtle star field
    const stars: Star[] = Array.from({ length: 120 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.6 + 0.1,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
    }))

    // Grid dots
    const gridSpacing = 80
    const gridDots: { x: number; y: number }[] = []
    for (let gx = 0; gx <= w; gx += gridSpacing) {
      for (let gy = 0; gy <= h; gy += gridSpacing) {
        gridDots.push({ x: gx, y: gy })
      }
    }

    let t = 0

    const draw = () => {
      t++
      ctx.clearRect(0, 0, w, h)

      // Deep space base — very dark navy
      ctx.fillStyle = '#020610'
      ctx.fillRect(0, 0, w, h)

      // Aurora blobs
      for (const orb of orbs) {
        orb.phase += orb.speed
        const pulse = Math.sin(orb.phase) * 0.06
        const r = orb.radius * (1 + pulse)
        const nx = Math.sin(orb.phase * 1.3) * w * 0.08
        const ny = Math.cos(orb.phase * 0.9) * h * 0.06
        orb.x += orb.vx
        orb.y += orb.vy
        if (orb.x < -r) orb.x = w + r
        if (orb.x > w + r) orb.x = -r
        if (orb.y < -r) orb.y = h + r
        if (orb.y > h + r) orb.y = -r

        const grd = ctx.createRadialGradient(orb.x + nx, orb.y + ny, 0, orb.x + nx, orb.y + ny, r)
        grd.addColorStop(0, `hsla(${orb.hue}, 80%, 60%, ${orb.opacity})`)
        grd.addColorStop(0.5, `hsla(${orb.hue + 20}, 70%, 50%, ${orb.opacity * 0.5})`)
        grd.addColorStop(1, `hsla(${orb.hue + 40}, 60%, 40%, 0)`)
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.ellipse(orb.x + nx, orb.y + ny, r, r * 0.65, orb.phase * 0.3, 0, Math.PI * 2)
        ctx.fill()
      }

      // Grid dots overlay
      ctx.fillStyle = 'rgba(74,222,128,0.06)'
      for (const dot of gridDots) {
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2)
        ctx.fill()
      }

      // Twinkling stars
      for (const star of stars) {
        star.twinklePhase += star.twinkleSpeed
        const alpha = star.opacity * (0.5 + 0.5 * Math.sin(star.twinklePhase))
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      }

      // Subtle horizontal scan line shimmer
      const scanY = ((t * 0.5) % (h + 60)) - 30
      const scanGrd = ctx.createLinearGradient(0, scanY, 0, scanY + 60)
      scanGrd.addColorStop(0, 'rgba(74,222,128,0)')
      scanGrd.addColorStop(0.5, 'rgba(74,222,128,0.015)')
      scanGrd.addColorStop(1, 'rgba(74,222,128,0)')
      ctx.fillStyle = scanGrd
      ctx.fillRect(0, scanY, w, 60)

      animId = requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w
      canvas.height = h
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
