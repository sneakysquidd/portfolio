import { fx } from '../gears/geometry'
import { BULBS } from './seasons'
import './Tree.css'

const TREE_D = 'M24 9.5 31.2 19.5H27.8L35.6 29.5H31.4L40.4 40.5H7.6L16.6 29.5H12.4L20.2 19.5H16.8Z'
const BULB_AT = [[25.2, 16.2], [20.6, 24.6], [28.4, 27.4], [23.6, 33.8], [16.2, 36.4], [31.4, 37.4]]
const STEP = 90 // ms between bulbs lighting

// Five-point star on (24, 6.4), sitting on the tree's tip.
const STAR_D =
  Array.from({ length: 10 }, (_, k) => {
    const a = (k * Math.PI) / 5
    const r = k % 2 ? 1.9 : 4.4
    return `${k ? 'L' : 'M'}${fx(24 + r * Math.sin(a))} ${fx(6.4 - r * Math.cos(a))}`
  }).join('') + 'Z'

// A Christmas tree that switches Christmas mode. Switched on, its bulbs light top to bottom
// a step at a time, like an advancing wheel, and the star comes on last.
export default function Tree({ on, onToggle, className = '' }) {
  return (
    <button
      type="button"
      className={`tree ${className}`.trim()}
      aria-pressed={on}
      aria-label="Christmas mode"
      onClick={onToggle}
    >
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path className="tr-body" d={TREE_D} />
        <path className="tr-trunk" d="M21.6 41.8h4.8v4h-4.8Z" />
        {BULB_AT.map(([x, y], i) => (
          <circle
            key={i}
            className="tr-bulb"
            cx={x}
            cy={y}
            r="1.6"
            style={{ '--c': BULBS[i % BULBS.length], '--d': `${i * STEP}ms`, '--tw': `${-i * 0.7}s` }}
          />
        ))}
        <path className="tr-star" d={STAR_D} style={{ '--d': `${BULB_AT.length * STEP + 60}ms` }} />
      </svg>
    </button>
  )
}
