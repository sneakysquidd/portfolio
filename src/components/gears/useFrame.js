import { useEffect, useRef } from 'react'

// Calls `callback` every animation frame with timing and scroll info:
// { t, dt (s), scrollY, velocity (smoothed px/s), progress (0–1 down the page) }.
// Components use it to write SVG attributes directly instead of re-rendering.
export function useFrame(callback) {
  const cb = useRef(callback)
  useEffect(() => {
    cb.current = callback
  })
  useEffect(() => {
    let raf
    let last = performance.now()
    let lastY = window.scrollY
    let velocity = 0
    const loop = (t) => {
      const dt = Math.min(t - last, 100) / 1000
      last = t
      const scrollY = window.scrollY
      const inst = dt > 0 ? (scrollY - lastY) / dt : 0
      lastY = scrollY
      velocity += (inst - velocity) * Math.min(1, dt * 6)
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0
      cb.current({ t, dt, scrollY, velocity, progress })
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])
}
