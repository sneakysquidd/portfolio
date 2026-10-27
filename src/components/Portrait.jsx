import { useState } from 'react'
import './Portrait.css'

// Drop your photo at public/portrait.jpg. Until then an outline placeholder is drawn.
export default function Portrait({ src = '/portrait.jpg', alt = 'Portrait of Gavin Thomas', shape = 'rect', className = '' }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={`portrait portrait--${shape} ${className}`.trim()}>
      {failed ? (
        <svg className="portrait__placeholder" viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet" role="img" aria-label="Portrait placeholder">
          <circle cx="50" cy="42" r="15" />
          <path d="M20 100 C20 74 34 63 50 63 C66 63 80 74 80 100" />
          <text x="50" y={shape === 'circle' ? 86 : 92} textAnchor="middle">portrait.jpg</text>
        </svg>
      ) : (
        <img src={src} alt={alt} onError={() => setFailed(true)} />
      )}
    </div>
  )
}
