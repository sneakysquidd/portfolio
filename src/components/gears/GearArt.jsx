import { memo } from 'react'
import { circleD, clubPath, fx, gearPath } from './geometry'

const spoke = (w, len) => `M${fx(-w / 2)} 0L${fx(-w / 2)} ${fx(-len)}L${fx(w / 2)} ${fx(-len)}L${fx(w / 2)} 0Z`

// Wheel with crossings (spokes), so wheels underneath show through.
export const WheelArt = memo(function WheelArt({ N, m = 1, spokes = 4, sw = 0.22 }) {
  const rp = (m * N) / 2
  const rr = rp - 1.25 * m
  const ri = rr - Math.max(2, rp * 0.09)
  const hub = Math.max(2.4, rp * 0.13)
  const w = Math.max(1.4, rp * 0.075)
  return (
    <g>
      {Array.from({ length: spokes }, (_, i) => (
        <path key={i} transform={`rotate(${(i * 360) / spokes + 45})`} d={spoke(w, ri + 0.8)} className="g-fill" style={{ strokeWidth: sw }} />
      ))}
      <path d={gearPath(N, m) + circleD(ri)} fillRule="evenodd" className="g-fill" style={{ strokeWidth: sw }} />
      <circle r={hub} className="g-fill" style={{ strokeWidth: sw }} />
    </g>
  )
})

export const PinionArt = memo(function PinionArt({ N, m = 1, sw = 0.22 }) {
  return (
    <g>
      <path d={gearPath(N, m, { add: 0.95, ded: 1.25, tip: 0.2, flank: 0.3 })} className="g-fill" style={{ strokeWidth: sw }} />
      <circle r={((m * N) / 2) * 0.4} className="g-mute" style={{ strokeWidth: sw * 0.8 }} />
    </g>
  )
})

export const EscWheelArt = memo(function EscWheelArt({ rt, rr, ri, hub, w, sw = 0.22 }) {
  return (
    <g>
      {Array.from({ length: 5 }, (_, i) => (
        <path key={i} transform={`rotate(${i * 72})`} d={spoke(w, ri + 0.8)} className="g-fill" style={{ strokeWidth: sw }} />
      ))}
      <path d={clubPath(15, rt, rr) + circleD(ri)} fillRule="evenodd" className="g-fill" style={{ strokeWidth: sw }} />
      <circle r={hub} className="g-fill" style={{ strokeWidth: sw }} />
    </g>
  )
})

export function Jewel({ x = 0, y = 0, r = 1.1 }) {
  return <circle cx={x} cy={y} r={r} className="g-jewel" style={{ strokeWidth: 0.2 }} />
}
