import { useEffect, useRef } from 'react'

const DigitalGlobe = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let frame
    let w = 0
    let h = 0
    const dots = Array.from({ length: 48 }, (_, i) => ({
      lat: (i / 48) * Math.PI * 2,
      lng: ((i * 7) % 24) / 24 * Math.PI,
      speed: 0.003 + (i % 5) * 0.0008,
    }))

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * devicePixelRatio
      canvas.height = h * devicePixelRatio
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h)
      const cx = w / 2
      const cy = h / 2
      const r = Math.min(w, h) * 0.38

      const grad = ctx.createRadialGradient(cx, cy, r * 0.2, cx, cy, r * 1.2)
      grad.addColorStop(0, 'rgba(8, 8, 80, 0.2)')
      grad.addColorStop(0.5, 'rgba(30, 58, 138, 0.12)')
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      ctx.strokeStyle = 'rgba(8, 8, 80, 0.08)'
      ctx.lineWidth = 1
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath()
        ctx.ellipse(cx, cy, r, r * (i / 5), 0, 0, Math.PI * 2)
        ctx.stroke()
      }

      dots.forEach((d, i) => {
        d.lng += d.speed
        const x = cx + Math.cos(d.lat + t * 0.0003) * Math.cos(d.lng) * r
        const y = cy + Math.sin(d.lng) * r * 0.85
        const alpha = 0.35 + ((i % 3) + 1) * 0.15
        ctx.beginPath()
        ctx.arc(x, y, 2.2, 0, Math.PI * 2)
        ctx.fillStyle = i % 2 === 0 ? `rgba(8, 8, 80, ${alpha})` : `rgba(37, 99, 235, ${alpha})`
        ctx.fill()
      })

      for (let i = 0; i < dots.length; i += 3) {
        const a = dots[i]
        const b = dots[(i + 7) % dots.length]
        const ax = cx + Math.cos(a.lat + t * 0.0003) * Math.cos(a.lng) * r
        const ay = cy + Math.sin(a.lng) * r * 0.85
        const bx = cx + Math.cos(b.lat + t * 0.0003) * Math.cos(b.lng) * r
        const by = cy + Math.sin(b.lng) * r * 0.85
        ctx.beginPath()
        ctx.moveTo(ax, ay)
        ctx.lineTo(bx, by)
        ctx.strokeStyle = 'rgba(8, 8, 80, 0.06)'
        ctx.stroke()
      }

      frame = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  )
}

export default DigitalGlobe
