import { useRef } from 'react'
import { useReducedMotion } from '../../hooks/useClock'
import { EscWheelArt, Jewel, PinionArt, WheelArt } from './GearArt'
import { beatSteps } from './geometry'
import MeshReveal from './MeshReveal'
import { C, M1, M2, M3, T3, T4, TE, TRAIN_VIEWBOX, tf, trainAngles } from './train'
import { useFrame } from './useFrame'
import './gears.css'

// See train.js for the layout.

/*
  Runs on the visitor's clock: the center wheel turns once an hour, the fourth once a minute.
  scrollFactor: extra beats per pixel scrolled, so scrolling winds the train forward
  and scrolling back runs it backward. 0 = clock only.
*/
export default function GearTrain({ scrollFactor = 0.3, className = '' }) {
  const reduce = useReducedMotion()
  const svg = useRef(null)
  const parts = useRef(null)

  useFrame(({ scrollY }) => {
    const d = new Date()
    const S = d.getMinutes() * 60 + d.getSeconds() + d.getMilliseconds() / 1000
    const u = 6 * S + scrollY * scrollFactor
    const steps = reduce ? Math.floor(u) : beatSteps(u)
    const { thC, th3, th4, thE } = trainAngles(steps)
    if (!parts.current && svg.current) {
      parts.current = Object.fromEntries([...svg.current.querySelectorAll('[data-k]')].map((el) => [el.dataset.k, el]))
    }
    const r = parts.current ?? {}
    r.c?.setAttribute('transform', tf(C, thC))
    r.c_m?.setAttribute('transform', tf(C, thC))
    r.pc?.setAttribute('transform', tf(C, thC))
    r.w3?.setAttribute('transform', tf(T3, th3))
    r.w3_m?.setAttribute('transform', tf(T3, th3))
    r.p3?.setAttribute('transform', tf(T3, th3))
    r.w4?.setAttribute('transform', tf(T4, th4))
    r.w4_m?.setAttribute('transform', tf(T4, th4))
    r.p4?.setAttribute('transform', tf(T4, th4))
    r.we?.setAttribute('transform', tf(TE, thE))
    r.pe?.setAttribute('transform', tf(TE, thE))
  })

  return (
    <svg ref={svg} className={`gears ${className}`.trim()} viewBox={TRAIN_VIEWBOX} aria-hidden="true">
      <g data-k="c"><WheelArt N={80} m={M1} /></g>
      <g data-k="w3"><WheelArt N={75} m={M2} /></g>
      <g data-k="w4"><WheelArt N={72} m={M3} /></g>
      <g data-k="we"><EscWheelArt rt={12.5} rr={9.6} ri={7} hub={2} w={1.2} /></g>
      <MeshReveal />
      <g data-k="pc"><PinionArt N={12} m={M1} /></g>
      <g data-k="p3"><PinionArt N={10} m={M1} /></g>
      <g data-k="p4"><PinionArt N={10} m={M2} /></g>
      <g data-k="pe"><PinionArt N={6} m={M3} /></g>
      {[C, T3, T4, TE].map((p, i) => <Jewel key={i} x={p.x} y={p.y} />)}
    </svg>
  )
}
