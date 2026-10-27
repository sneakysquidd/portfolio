import { at, mesh } from './geometry'

// Going-train layout shared by every gear drawing. Real tooth counts:
// center 80 → third pinion 10, third 75 → fourth pinion 10, fourth 72 → escape pinion 6.
// Each mesh uses a slightly finer tooth size (module) than the one before, as real trains do.
// That keeps every wheel's rim clear of the previous arbor's pinion, so no rim appears to
// slide across a pinion it doesn't drive. Ratios are set by tooth counts, so timing is unchanged.
export const M1 = 1 // center wheel ↔ third pinion
export const M2 = 0.9 // third wheel ↔ fourth pinion
export const M3 = 0.8 // fourth wheel ↔ escape pinion

const A1 = 105
const A2 = 70
const A3 = 110
export const C = { x: 0, y: 0 }
export const T3 = at(C, (M1 * (80 + 10)) / 2, A1)
export const T4 = at(T3, (M2 * (75 + 10)) / 2, A2)
export const TE = at(T4, (M3 * (72 + 6)) / 2, A3)
const TH4_ZERO = mesh(mesh(0, 80, 10, A1), 75, 10, A2)

// Extents: x -41..121, y -41..46.3, plus a margin for strokes.
export const TRAIN_VIEWBOX = '-44 -45 168 94'

export const tf = (p, a, dx = 0, dy = 0) => `translate(${(p.x + dx).toFixed(3)} ${(p.y + dy).toFixed(3)}) rotate(${a.toFixed(3)})`

// steps = degrees of the fourth (seconds) wheel. Everything else follows by meshing.
export function trainAngles(steps) {
  const thC = steps / 60
  return {
    thC,
    th3: mesh(thC, 80, 10, A1),
    th4: TH4_ZERO + steps,
    thE: mesh(TH4_ZERO + steps, 72, 6, A3),
  }
}
