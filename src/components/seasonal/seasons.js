import { circleD, clubPath, fx } from '../gears/geometry'

// Small escape wheel used as the section-heading icon. It advances one tooth per entry revealed.
// extra: more SVG drawn over the wheel.
const wrapIcon = (d, color, extra = '') => `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='-16 -16 32 32'><path d='${d}' fill='none' stroke='${color}' stroke-width='1.1' fill-rule='evenodd'/><circle r='2' fill='none' stroke='${color}' stroke-width='1.1'/>${extra}</svg>`,
)}")`

const pt = (a, r) => `${fx(r * Math.sin((a * Math.PI) / 180))} ${fx(-r * Math.cos((a * Math.PI) / 180))}`

// Fifteen pointed leaf tips in place of club teeth, so it still steps 24° a tooth.
function leafRosette(N, rt, rr) {
  const p = 360 / N
  let d = `M${pt(-p / 2, rr)}`
  for (let k = 0; k < N; k++) {
    const c = k * p
    d += `Q${pt(c - 0.42 * p, rt * 0.9)} ${pt(c, rt)}Q${pt(c + 0.42 * p, rt * 0.9)} ${pt(c + p / 2, rr)}`
  }
  return d + 'Z'
}

// Fifteen holly leaves, each a point with a spine to either side: a wreath that still steps 24° a tooth.
function hollyRing(N, rt, rr) {
  const p = 360 / N
  const h = rt - rr
  let d = `M${pt(-p / 2, rr)}`
  for (let k = 0; k < N; k++) {
    const c = k * p
    d += `L${pt(c - 0.3 * p, rr + 0.62 * h)}L${pt(c - 0.14 * p, rr + 0.42 * h)}L${pt(c, rt)}`
    d += `L${pt(c + 0.14 * p, rr + 0.42 * h)}L${pt(c + 0.3 * p, rr + 0.62 * h)}L${pt(c + p / 2, rr)}`
  }
  return d + 'Z'
}

// Three berries clustered at the foot of the wreath.
const BERRIES = [[170, 9.2], [190, 9.2], [180, 7.3]]
  .map(([a, r]) => {
    const [x, y] = pt(a, r).split(' ')
    return `<circle cx='${x}' cy='${y}' r='1.55' fill='#c8313b'/>`
  })
  .join('')

export const ESC_ICON = wrapIcon(clubPath(15, 14.5, 10.5) + circleD(6), '#2a47a3')
export const ESC_ICON_HALLOWEEN = wrapIcon(clubPath(15, 14.5, 10.5) + circleD(6), '#c4520c')
export const ESC_ICON_HARVEST = wrapIcon(leafRosette(15, 14.5, 10) + circleD(6), '#a8441a')
export const ESC_ICON_WREATH = wrapIcon(hollyRing(15, 14.5, 10.4) + circleD(6.4), '#2f6b47', BERRIES)

export const HARVEST = ['#b5441b', '#e0952b', '#c9a227', '#8a4b22', '#c8312b']

// Vintage Christmas bulb colors: red, amber, green, blue.
export const BULBS = ['#ff4d55', '#ffbe3b', '#3fd27f', '#55a8ff']

// US Thanksgiving: the fourth Thursday of November.
export function thanksgivingDay(year) {
  const firstDow = new Date(year, 10, 1).getDay()
  return 1 + ((4 - firstDow + 7) % 7) + 21
}

/*
  Which holiday's toggle to offer on a given (local) date: the pumpkin through October,
  the turkey from November 1 to Thanksgiving Day, Christmas from the day after through
  December 31, and none the rest of the year.
  A ?season=halloween|thanksgiving|christmas|none query overrides it, for previewing.
*/
export function seasonFor(date = new Date(), search = globalThis.location?.search ?? '') {
  const forced = new URLSearchParams(search).get('season')
  if (forced === 'halloween' || forced === 'thanksgiving' || forced === 'christmas') return forced
  if (forced === 'none') return null
  const month = date.getMonth()
  if (month === 9) return 'halloween'
  if (month === 10) return date.getDate() <= thanksgivingDay(date.getFullYear()) ? 'thanksgiving' : 'christmas'
  if (month === 11) return 'christmas'
  return null
}

// Colors the name's letters take on under the pointer, by season ('default' outside one).
export const NAME_HUES = {
  default: ['#5cbcff', '#2ff2c8', '#a98cff'], // aqua, mint, lavender
  halloween: ['#ff8a28', '#ffcf4a', '#ff7518'],
  thanksgiving: ['#f0a43a', '#d9b23a', '#e0525a'], // amber, ochre, cranberry
  christmas: ['#ff5a64', '#ffd25e', '#7fdc9a'], // cranberry, gold, holly
}
