import './Pumpkin.css'

// A solid jack-o'-lantern that switches Halloween mode. Lit, its cut-out face glows and flickers.
export default function Pumpkin({ on, onToggle, className = '' }) {
  return (
    <button
      type="button"
      className={`pumpkin ${className}`.trim()}
      aria-pressed={on}
      aria-label="Halloween mode"
      onClick={onToggle}
    >
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path className="pk-stem" d="M24 12.5C24 8.5 25 6 28.5 4" />
        <path className="pk-body" d="M24 12C12 12 5 19 5 28.5S13 44 24 44s19-6 19-15.5S36 12 24 12Z" />
        <g className="pk-face">
          <path d="M13 26.5 18.5 19.5l3 7.5Z" />
          <path d="M35 26.5 29.5 19.5l-3 7.5Z" />
          <path d="M11.5 32.5c6.5 7.5 18.5 7.5 25 0l-3.5 1.6-2-2.2-2.6 3-2.4-2.6-2 3-2-3-2.4 2.6-2.6-3-2 2.2Z" />
        </g>
      </svg>
    </button>
  )
}
