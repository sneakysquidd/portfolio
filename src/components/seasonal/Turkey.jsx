import { HARVEST } from './seasons'
import './Turkey.css'

// Seven tail feathers fanned about the hub at (24, 30).
const FEATHERS = [-75, -50, -25, 0, 25, 50, 75].map((a, i) => ({ a, color: HARVEST[i % HARVEST.length] }))
const FEATHER_D = 'M21.6 23L20.6 10Q24 7 27.4 10L26.4 23Z'

// A turkey that switches Thanksgiving mode. The tail folds behind the body; switched on,
// it fans open a feather at a time like an advancing wheel.
export default function Turkey({ on, onToggle, className = '' }) {
  return (
    <button
      type="button"
      className={`turkey ${className}`.trim()}
      aria-pressed={on}
      aria-label="Thanksgiving mode"
      onClick={onToggle}
    >
      <svg viewBox="0 0 48 48" aria-hidden="true">
        {FEATHERS.map((f, i) => (
          <path
            key={i}
            className="tk-feather"
            d={FEATHER_D}
            style={{ '--a': `${f.a}deg`, '--c': f.color, '--d': `${i * 45}ms` }}
          />
        ))}
        <path className="tk-feet" d="M21 42.5v3.5M27 42.5v3.5M19.6 46h2.8M25.6 46h2.8" />
        <ellipse className="tk-body" cx="24" cy="34" rx="10" ry="9.5" />
        <circle className="tk-hub" cx="24" cy="34" r="3" />
        <circle className="tk-hub" cx="24" cy="34" r="1" />
        <circle className="tk-body" cx="24" cy="22.5" r="4.6" />
        <circle className="tk-eye" cx="22.3" cy="21.8" r="0.7" />
        <circle className="tk-eye" cx="25.7" cy="21.8" r="0.7" />
        <path className="tk-beak" d="M23 23.4h2l-1 1.9Z" />
        <path className="tk-wattle" d="M24.7 24.6q1.4 1.7.2 3.5q-1.5-.6-1-2.5Z" />
      </svg>
    </button>
  )
}
