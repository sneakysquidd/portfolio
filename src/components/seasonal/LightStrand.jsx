import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useClock'
import { useFrame } from '../gears/useFrame'
import { BULBS } from './seasons'
import './LightStrand.css'

const SWAG = 60 // width of one swag of wire, at natural size
const H = 34
const GLASS_D = 'M-2.5 4.2C-5.6 7.2-4.4 13.2 0 17.5 4.4 13.2 5.6 7.2 2.5 4.2Z'

/*
  A strand of bulbs swagged along the top of the plate. It keeps the movement's time: one bulb
  burns bright, and the brightness steps one bulb along each second on the same beat count as the
  gears, so scrolling winds it forward or back too. With reduced motion every bulb burns steady.
*/
export default function LightStrand({ scrollFactor = 0.3 }) {
  const reduce = useReducedMotion()
  const box = useRef(null)
  const [n, setN] = useState(0)

  // As many swags as fit the plate's width at about their natural size.
  useEffect(() => {
    const el = box.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setN(Math.max(3, Math.round(e.contentRect.width / SWAG))))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useFrame(({ scrollY }) => {
    const bulbs = box.current?.querySelectorAll('.xm-sb')
    if (reduce || !bulbs?.length) return
    const d = new Date()
    const S = d.getMinutes() * 60 + d.getSeconds() + d.getMilliseconds() / 1000
    const beats = 6 * S + scrollY * scrollFactor // GearTrain's count: six beats a second
    const k = bulbs.length
    const lit = ((Math.floor(beats / 6) % k) + k) % k
    if (bulbs[lit].classList.contains('is-lit')) return
    bulbs.forEach((b, i) => b.classList.toggle('is-lit', i === lit))
  })

  return (
    <div ref={box} className={`xm-strand${reduce ? ' is-steady' : ''}`} aria-hidden="true">
      {n > 0 && (
        <svg viewBox={`0 0 ${n * SWAG} ${H}`}>
          <path
            className="xm-strand-wire"
            d={Array.from({ length: n }, (_, i) => `M${i * SWAG} 3Q${i * SWAG + SWAG / 2} 21 ${(i + 1) * SWAG} 3`).join('')}
          />
          {Array.from({ length: n }, (_, i) => (
            <g
              key={i}
              className="xm-sb"
              transform={`translate(${i * SWAG + SWAG / 2} 12)`}
              style={{ '--c': BULBS[i % BULBS.length] }}
            >
              <path className="xm-sb-glass" d={GLASS_D} />
              <rect className="xm-sb-socket" x="-2.1" y="-0.8" width="4.2" height="5" rx="0.8" />
            </g>
          ))}
        </svg>
      )}
    </div>
  )
}
