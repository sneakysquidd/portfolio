import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useClock'
import { useFrame } from '../gears/useFrame'
import './names.css'

const MIN = 200
const MAX = 800
const RAMP = 0.65 // heaviest ramp letter as a share of the MIN..MAX range, about weight 590
const REACH = 55 // px, spread of the pointer's bold

/*
  The name as weight-animated letters, counted as one run across all lines.
  At rest each line holds a weight ramp, opposed line to line: the first builds light to heavy,
  the next heavy to light. As the pointer reaches the name the ramp clears to plain weight and
  the letters nearest the pointer thicken instead.
*/
export default function NameMotion({ lines, className = '' }) {
  const root = useRef(null)
  const weights = useRef([])
  const pointer = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const move = (e) => {
      pointer.current = { x: e.clientX, y: e.clientY }
    }
    const leave = () => {
      pointer.current = null
    }
    window.addEventListener('pointermove', move)
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [])

  useFrame(({ dt }) => {
    const els = root.current?.querySelectorAll('[data-i]')
    if (!els?.length) return
    if (reduce && weights.current.length) return

    const ramp = lines.flatMap((line, li) =>
      [...line].map((_, j) => {
        const t = line.length > 1 ? j / (line.length - 1) : 0
        return RAMP * (li % 2 ? 1 - t : t)
      }),
    )
    const p = pointer.current
    const hover = p
      ? [...els].map((el) => {
          const r = el.getBoundingClientRect()
          const dx = p.x - (r.left + r.width / 2)
          const dy = p.y - (r.top + r.height / 2)
          return Math.exp(-(dx * dx + dy * dy) / (2 * REACH * REACH))
        })
      : null
    // The ramp fades out as the pointer reaches the name, so the hover takes over.
    const nearest = hover ? Math.max(...hover) : 0

    const k = Math.min(1, dt * 8)
    els.forEach((el, i) => {
      const goal = MIN + (MAX - MIN) * Math.max(hover ? hover[i] : 0, ramp[i] * (1 - nearest))
      const w = weights.current[i] ?? goal
      const next = w + (goal - w) * k
      weights.current[i] = next
      el.style.fontWeight = Math.round(next)
    })
  })

  let n = 0
  return (
    <span ref={root} className={`n-motion n-tick ${className}`.trim()} aria-label={lines.join(' ')}>
      {lines.map((line, li) => (
        <span key={li} className="n-motion__line" aria-hidden="true">
          {[...line].map((c, ci) => {
            const i = n++
            return (
              <span key={ci} data-i={i} style={{ fontWeight: MIN, animationDelay: `${(i * 1000) / 6}ms` }}>
                {c === ' ' ? ' ' : c}
              </span>
            )
          })}
        </span>
      ))}
    </span>
  )
}
