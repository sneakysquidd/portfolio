import { circleD, clubPath, fx } from '../gears/geometry'

// Small escape wheel used as the section-heading icon. It advances one tooth per entry revealed.
const wrapIcon = (d, color) => `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='-16 -16 32 32'><path d='${d}' fill='none' stroke='${color}' stroke-width='1.1' fill-rule='evenodd'/><circle r='2' fill='none' stroke='${color}' stroke-width='1.1'/></svg>`,
)}")`

// Fifteen pointed leaf tips in place of club teeth, so it still steps 24° a tooth.
function leafRosette(N, rt, rr) {
  const p = 360 / N
  const pt = (a, r) => `${fx(r * Math.sin((a * Math.PI) / 180))} ${fx(-r * Math.cos((a * Math.PI) / 180))}`
  let d = `M${pt(-p / 2, rr)}`
  for (let k = 0; k < N; k++) {
    const c = k * p
    d += `Q${pt(c - 0.42 * p, rt * 0.9)} ${pt(c, rt)}Q${pt(c + 0.42 * p, rt * 0.9)} ${pt(c + p / 2, rr)}`
  }
  return d + 'Z'
}

export const ESC_ICON = wrapIcon(clubPath(15, 14.5, 10.5) + circleD(6), '#2a47a3')
export const ESC_ICON_HALLOWEEN = wrapIcon(clubPath(15, 14.5, 10.5) + circleD(6), '#c4520c')
export const ESC_ICON_HARVEST = wrapIcon(leafRosette(15, 14.5, 10) + circleD(6), '#a8441a')

export const HARVEST = ['#b5441b', '#e0952b', '#c9a227', '#8a4b22', '#c8312b']

// US Thanksgiving: the fourth Thursday of November.
export function thanksgivingDay(year) {
  const firstDow = new Date(year, 10, 1).getDay()
  return 1 + ((4 - firstDow + 7) % 7) + 21
}

/*
  Which holiday's toggle to offer on a given (local) date: the pumpkin through October,
  the turkey from November 1 to Thanksgiving Day, and none the rest of the year.
  A ?season=halloween|thanksgiving|none query overrides it, for previewing.
*/
export function seasonFor(date = new Date(), search = globalThis.location?.search ?? '') {
  const forced = new URLSearchParams(search).get('season')
  if (forced === 'halloween' || forced === 'thanksgiving') return forced
  if (forced === 'none') return null
  const month = date.getMonth()
  if (month === 9) return 'halloween'
  if (month === 10 && date.getDate() <= thanksgivingDay(date.getFullYear())) return 'thanksgiving'
  return null
}

// Colors the name's letters take on under the pointer, by season ('default' outside one).
export const NAME_HUES = {
  default: ['#5cbcff', '#2ff2c8', '#a98cff'], // aqua, mint, lavender
  halloween: ['#ff8a28', '#ffcf4a', '#ff7518'],
  thanksgiving: ['#f0a43a', '#d9b23a', '#e0525a'], // amber, ochre, cranberry
}
