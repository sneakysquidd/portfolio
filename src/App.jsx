import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Portrait from './components/Portrait'
import Pumpkin from './components/Pumpkin'
import Resume from './components/Resume'
import GearTrain from './components/gears/GearTrain'
import { circleD, clubPath } from './components/gears/geometry'
import NameMotion from './components/names/NameMotion'
import { profile } from './content/resume'
import './App.css'

// Small escape wheel used as the section-heading icon. It advances one tooth per entry revealed.
const escIcon = (color) => `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='-16 -16 32 32'><path d='${clubPath(15, 14.5, 10.5)}${circleD(6)}' fill='none' stroke='${color}' stroke-width='1.1' fill-rule='evenodd'/><circle r='2' fill='none' stroke='${color}' stroke-width='1.1'/></svg>`,
)}")`
const ESC_ICON = escIcon('#2a47a3')
const ESC_ICON_HALLOWEEN = escIcon('#c4520c')

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

// Gear size, tilt, position and opacity are set in App.css (.wv-gears).
function Left({ halloween, onToggle }) {
  const panel = useRef(null)
  const body = useRef(null)
  const portrait = useRef(null)
  usePortraitBox(panel, body, portrait)

  return (
    <div ref={panel} className="mv-sticky wd-left wv-corner">
      <h1 className="mv-name">
        {/* A fixed weight ramp; letters thicken near the pointer, and the ramp clears while it's on the name */}
        <NameMotion lines={[profile.first, profile.last]} />
      </h1>
      <div ref={body} className="wd-body">
        <div ref={portrait} className="wd-portrait"><Portrait /></div>
        <div className="wd-side">
          <Pumpkin on={halloween} onToggle={onToggle} className="wd-pumpkin" />
          <Meta />
        </div>
      </div>
      <div className="wv-gears" aria-hidden="true"><GearTrain scrollFactor={0.5} /></div>
    </div>
  )
}

export default function App() {
  const rootRef = useRef(null)
  useRevealTicks(rootRef)
  const [halloween, setHalloween] = useState(false)

  return (
    <div
      className={`L-move L-wound${halloween ? ' is-halloween' : ''}`}
      ref={rootRef}
      style={{ '--esc-icon': halloween ? ESC_ICON_HALLOWEEN : ESC_ICON }}
    >
      <aside className="mv-left">
        <Left halloween={halloween} onToggle={() => setHalloween((h) => !h)} />
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
