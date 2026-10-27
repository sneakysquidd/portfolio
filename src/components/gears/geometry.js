// Shared drawing math for wheels, pinions and the escapement. Angles are clock angles:
// 0° at 12 o'clock, positive clockwise (SVG rotate direction).

const D2R = Math.PI / 180
export const fx = (n) => Math.round(n * 1000) / 1000
const polar = (a, r) => [fx(r * Math.sin(a * D2R)), fx(-r * Math.cos(a * D2R))]
export const circleD = (r, cx = 0, cy = 0) =>
  `M${fx(cx + r)} ${fx(cy)}A${fx(r)} ${fx(r)} 0 1 0 ${fx(cx - r)} ${fx(cy)}A${fx(r)} ${fx(r)} 0 1 0 ${fx(cx + r)} ${fx(cy)}Z`
export const at = (from, dist, ang) => ({
  x: fx(from.x + dist * Math.sin(ang * D2R)),
  y: fx(from.y - dist * Math.cos(ang * D2R)),
})

// Simple trapezoid-tooth gear. Negative add/ded flips the teeth inward (an internal ring).
export function gearPath(N, m, { add = 1, ded = 1.25, tip = 0.14, flank = 0.32 } = {}) {
  const rp = (m * N) / 2
  const ra = rp + m * add
  const rr = rp - m * ded
  const p = 360 / N
  let d = ''
  for (let k = 0; k < N; k++) {
    const c = k * p
    ;[[c - flank * p, rr], [c - tip * p, ra], [c + tip * p, ra], [c + flank * p, rr]].forEach(([a, r], j) => {
      const [x, y] = polar(a, r)
      d += (k || j ? 'L' : 'M') + x + ' ' + y
    })
  }
  return d + 'Z'
}

// Swiss lever escape wheel with club teeth.
export function clubPath(N, rt, rr) {
  const p = 360 / N
  const h = rt - rr
  let d = ''
  for (let k = 0; k < N; k++) {
    const c = k * p
    ;[[c - 0.46 * p, rr], [c - 0.03 * p, rt], [c + 0.12 * p, rt - 0.18 * h], [c + 0.05 * p, rt - 0.42 * h], [c + 0.08 * p, rr]].forEach(
      ([a, r], j) => {
        const [x, y] = polar(a, r)
        d += (k || j ? 'L' : 'M') + x + ' ' + y
      },
    )
  }
  return d + 'Z'
}

// Angle of a driven gear so its teeth sit in the driver's gaps. alpha: clock angle from driver to driven.
export function mesh(theta1, N1, N2, alpha) {
  const p1 = 360 / N1
  const p2 = 360 / N2
  return alpha + 180 - p2 / 2 + (p2 / p1) * (alpha - theta1)
}

/* Swiss lever escapement kinematics */
const AMP = 250 // balance amplitude, degrees
const LEVER = 56 // fork notch radius from the pallet pivot
const ROLL = 6 // impulse pin radius
const FMAX = 4.5 // fork swing between banking pins, degrees
const TH0 = Math.asin((LEVER * Math.sin(FMAX * D2R)) / ROLL) / D2R
const DELTA = Math.asin(TH0 / AMP) / Math.PI

const easeInOut = (p) => (p < 0.5 ? 2 * p * p : 1 - 2 * (1 - p) * (1 - p))

// Escape wheel advance in beats: still while locked, quick ease through each impulse.
export function beatSteps(u) {
  const n = Math.round(u)
  const d = u - n
  if (Math.abs(d) < DELTA) return n + easeInOut((d + DELTA) / (2 * DELTA))
  return Math.floor(u - DELTA) + 1
}
