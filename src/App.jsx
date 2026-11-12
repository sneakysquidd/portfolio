import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Portrait from './components/Portrait'
import Resume from './components/Resume'
import GearTrain from './components/gears/GearTrain'
import NameMotion from './components/names/NameMotion'
import LightStrand from './components/seasonal/LightStrand'
import Pumpkin from './components/seasonal/Pumpkin'
import Snow from './components/seasonal/Snow'
import Tree from './components/seasonal/Tree'
import Turkey from './components/seasonal/Turkey'
import {
  ESC_ICON,
  ESC_ICON_HALLOWEEN,
  ESC_ICON_HARVEST,
  ESC_ICON_WREATH,
  NAME_HUES,
  seasonFor,
} from './components/seasonal/seasons'
import { profile } from './content/resume'
import './App.css'

// Which holiday's toggle sits in the left panel, by today's date:
// 'halloween' (pumpkin), 'thanksgiving' (turkey), 'christmas' (tree) or null.
const SEASON_BUTTON = seasonFor()

const SEASON_ICONS = { halloween: ESC_ICON_HALLOWEEN, thanksgiving: ESC_ICON_HARVEST, christmas: ESC_ICON_WREATH }

// Extra beats per pixel scrolled, shared by the gears and the light strand so they stay in step.
const SCROLL_FACTOR = 0.5

// Entries tick into place as they scroll into view; each one advances the heading wheels by a tooth.
function useRevealTicks(rootRef) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const els = root.querySelectorAll('.rs-entry, .rs-tags li')
    let count = 0
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          e.target.classList.add('is-in')
          io.unobserve(e.target)
          count += 1
          root.style.setProperty('--esc-steps', count)
        })
      },
      { threshold: 0.2 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [rootRef])
}

/*
  The gears live in the panel's own layer (not inside the portrait) so they can be stacked
  in front of or behind the name and the photo independently. They are placed relative to the
  portrait, so measure it and expose --px, --py (top-left, relative to the panel) and --pw (width).
*/
function usePortraitBox(panelRef, bodyRef, portraitRef) {
  useLayoutEffect(() => {
    const panel = panelRef.current
    const body = bodyRef.current
    const portrait = portraitRef.current
    if (!panel || !body || !portrait) return
    const update = () => {
      panel.style.setProperty('--px', `${body.offsetLeft + portrait.offsetLeft}px`)
      panel.style.setProperty('--py', `${body.offsetTop + portrait.offsetTop}px`)
      panel.style.setProperty('--pw', `${portrait.offsetWidth}px`)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(panel)
    ro.observe(body)
    ro.observe(portrait)
    return () => ro.disconnect()
  }, [panelRef, bodyRef, portraitRef])
}

// Display just the domain, e.g. linkedin.com
const short = (href) => new URL(href).hostname.replace(/^www\./, '')

// Details and contact as one list. A single profile link gets its own labelled row;
// several share an "Elsewhere" row.
function Meta() {
  const links = profile.links
  return (
    <dl className="wd-meta">
      <div><dt>Role</dt><dd>{profile.title}</dd></div>
      <div><dt>Based in</dt><dd>{profile.location}</dd></div>
      <div><dt>Email</dt><dd><span className="wd-email">{profile.email}</span></dd></div>
      {links.length === 1 ? (
        <div><dt>{links[0].label}</dt><dd><a href={links[0].href} target="_blank" rel="noreferrer">{short(links[0].href)} ↗</a></dd></div>
      ) : links.length > 1 ? (
        <div>
          <dt>Elsewhere</dt>
          <dd className="wd-elsewhere">
            {links.map((l) => <a key={l.label} href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>)}
          </dd>
        </div>
      ) : null}
    </dl>
  )
}

function SeasonButton({ season, onToggle }) {
  if (SEASON_BUTTON === 'halloween') return <Pumpkin on={season === 'halloween'} onToggle={onToggle} className="wd-season" />
  if (SEASON_BUTTON === 'thanksgiving') return <Turkey on={season === 'thanksgiving'} onToggle={onToggle} className="wd-season" />
  if (SEASON_BUTTON === 'christmas') return <Tree on={season === 'christmas'} onToggle={onToggle} className="wd-season" />
  return null
}

// Gear size, tilt, position and opacity are set in App.css (.wv-gears).
function Left({ season, onToggle, hues }) {
  const panel = useRef(null)
  const body = useRef(null)
  const portrait = useRef(null)
  usePortraitBox(panel, body, portrait)
  const christmas = season === 'christmas'

  return (
    <div ref={panel} className="mv-sticky wd-left wv-corner">
      <h1 className="mv-name">
        {/* A fixed weight ramp; letters thicken near the pointer, and the ramp clears while it's on the name */}
        <NameMotion lines={[profile.first, profile.last]} hues={hues} />
      </h1>
      <div ref={body} className="wd-body">
        <div ref={portrait} className="wd-portrait"><Portrait /></div>
        <div className="wd-side">
          <SeasonButton season={season} onToggle={onToggle} />
          <Meta />
        </div>
      </div>
      <div className="wv-gears" aria-hidden="true"><GearTrain scrollFactor={SCROLL_FACTOR} /></div>
      {christmas && <Snow />}
      {christmas && <LightStrand scrollFactor={SCROLL_FACTOR} />}
    </div>
  )
}

export default function App() {
  const rootRef = useRef(null)
  useRevealTicks(rootRef)
  const [season, setSeason] = useState(null)
  const hues = NAME_HUES[season] ?? NAME_HUES.default

  return (
    <div
      className={`L-move L-wound${season ? ` is-${season}` : ''}`}
      ref={rootRef}
      style={{ '--esc-icon': SEASON_ICONS[season] ?? ESC_ICON }}
    >
      <aside className="mv-left">
        <Left season={season} onToggle={() => setSeason((s) => (s ? null : SEASON_BUTTON))} hues={hues} />
      </aside>

      <main className="mv-main">
        <header>
          <p className="mv-label">Specification</p>
          <p className="mv-summary">{profile.summary}</p>
        </header>
        <Resume />
      </main>
    </div>
  )
}
