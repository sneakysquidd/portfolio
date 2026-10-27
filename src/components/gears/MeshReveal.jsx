import { useId } from 'react'
import { WheelArt } from './GearArt'
import { C, M1, M2, M3, T3, T4, TE, tf } from './train'

// Each pinion sits at the center of its own wheel, whose spokes and hub would otherwise cover the
// driving wheel's teeth right where they mesh. These are copies of each driving wheel, clipped to a
// small circle around the pinion it drives, drawn above the wheels and below the pinions, so the
// teeth visibly interlock. Radii: pinion tip plus a little margin.
const R3 = M1 * 5.95 + 1.6
const R4 = M2 * 5.95 + 1.6
const RE = M3 * 3.95 + 1.4

/*
  angles: { thC, th3, th4 } to pose the copies declaratively. Leave it out when a parent sets
  transforms itself; the copies carry data-k="c_m", "w3_m" and "w4_m" for that.
*/
export default function MeshReveal({ angles }) {
  const id = 'mr' + useId().replace(/[^a-zA-Z0-9]/g, '')
  const pose = (p, a) => (angles ? tf(p, a) : undefined)
  return (
    <>
      <defs>
        <clipPath id={`${id}a`}><circle cx={T3.x} cy={T3.y} r={R3} /></clipPath>
        <clipPath id={`${id}b`}><circle cx={T4.x} cy={T4.y} r={R4} /></clipPath>
        <clipPath id={`${id}c`}><circle cx={TE.x} cy={TE.y} r={RE} /></clipPath>
      </defs>
      <g clipPath={`url(#${id}a)`}>
        <g data-k="c_m" transform={pose(C, angles?.thC)}><WheelArt N={80} m={M1} /></g>
      </g>
      <g clipPath={`url(#${id}b)`}>
        <g data-k="w3_m" transform={pose(T3, angles?.th3)}><WheelArt N={75} m={M2} /></g>
      </g>
      <g clipPath={`url(#${id}c)`}>
        <g data-k="w4_m" transform={pose(T4, angles?.th4)}><WheelArt N={72} m={M3} /></g>
      </g>
    </>
  )
}
