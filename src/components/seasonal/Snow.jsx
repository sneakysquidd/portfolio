import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useClock'
import { useFrame } from '../gears/useFrame'
import './Snow.css'

const DENSITY = 1 / 9000 // flakes per square pixel

// z is depth: nearer flakes are bigger, brighter and fall faster.
function flake(w, h) {
  const z = Math.random()
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    z,
    r: 0.7 + z * 1.9,
    v: 14 + z * 34,
    a: 0.3 + z * 0.5,
    drift: 6 + z * 10,
    sway: 0.4 + Math.random() * 0.8,
    phase: Math.random() * Math.PI * 2,
  }
}

// Advance every flake by dt seconds and paint the frame. velocity: the page's scroll speed, px/s.
function step(ctx, flakes, { w, h, dpr }, t, dt, velocity) {
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = '#fff'
  const s = t / 1000
  for (const f of flakes) {
    f.y += (f.v - velocity * 0.04 * f.z) * dt
    f.x += Math.sin(s * f.sway + f.phase) * f.drift * dt
    if (f.y > h + 4) {
      f.y = -4
      f.x = Math.random() * w
    } else if (f.y < -6) {
      f.y = h + 4
      f.x = Math.random() * w
    }
    if (f.x < -4) f.x += w + 8
    else if (f.x > w + 4) f.x -= w + 8
    ctx.globalAlpha = f.a
    ctx.beginPath()
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)
    ctx.fill()
  }
}

/*
  Light snow falling over the plate, behind the name and photo. Scrolling lifts it a little,
  as if the page moved through it. Off entirely with reduced motion.
*/
export default function Snow() {
  const reduce = useReducedMotion()
  const canvas = useRef(null)
  const flakes = useRef([])
  const size = useRef({ w: 0, h: 0, dpr: 1 })

  useEffect(() => {
    const el = canvas.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      const { width: w, height: h } = el.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      el.width = Math.round(w * dpr)
      el.height = Math.round(h * dpr)
      size.current = { w, h, dpr }
      const want = Math.round(w * h * DENSITY)
      const f = flakes.current
      while (f.length < want) f.push(flake(w, h))
      f.length = want
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [reduce])

  useFrame(({ t, dt, velocity }) => {
    const ctx = canvas.current?.getContext('2d')
    if (ctx) step(ctx, flakes.current, size.current, t, dt, velocity)
  })

  if (reduce) return null
  return <canvas ref={canvas} className="xm-snow" aria-hidden="true" />
}
