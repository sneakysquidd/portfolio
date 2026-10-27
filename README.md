<div align="center">

# Gavin Thomas

**Data Scientist & Software Developer** · Salt Lake City, Utah

*I care about the details most people never see and the ones everyone feels.*

`React 19` · `Vite` · `Hand-drawn SVG` · `No animation libraries`

</div>

<br>


## ⚙ Details worth noticing

### The name has weight, not color

The name is set in a variable font, and each letter carries its own weight. At rest, **Gavin** builds from light to heavy and **Thomas** falls from heavy to light, so the two lines meet in a diagonal of thick strokes.

Move the pointer onto the name and the ramp clears to an even weight. Then the letters nearest the cursor thicken as it passes, like ink pooling under a fingertip. Move away and the ramp settles back in.

### The gears keep your time

The gear train runs on the visitor's own clock. The center wheel turns once an hour, the fourth wheel once a minute, and the escape wheel ticks in beats with a brief stop at each one, not a smooth spin. Every tooth is generated in SVG from real gear geometry, so the wheels actually mesh.

Scrolling winds the movement forward, and scrolling back runs it in reverse.

### Motion is optional

With **reduce motion** turned on in the visitor's system settings, entries appear in place, the name holds still and the gears step once a second without easing. The layout and content stay the same.

<br>

## ⚙ Palette

| Swatch | Token | Hex | Used for |
| :-: | :-- | :-- | :-- |
| 🟦 | `--blue` | `#2a47a3` | The plate, labels, the escape-wheel icons |
| ⬜ | `--white` | `#f2f5ff` | Type and gear lines on the plate |
| ⬜ | `--paper` | `#f3f5f9` | The spec sheet |
| ⬛ | `--ink` | `#141b2b` | Body text and rules |
| ⬛ | `--ink-2` | `#566079` | Secondary text and dotted dividers |
| 🟨 | `--gear-accent` | `#ffb400` | Accents in the movement |
| 🟥 | `--gear-jewel` | `#ff7a85` | Jewel bearings at each pivot |

## ⚙ Type

| Face | Role |
| :-- | :-- |
| **Jost** | The name, headings and body. A geometric sans in the Futura tradition, used across its full weight range for the name animation. |
| **JetBrains Mono** | Labels, dates and metadata. The spec-sheet voice. |

<br>

## ⚙ Inside

```
src/
├── App.jsx                 the page: plate on the left, spec sheet on the right
├── App.css                 layout, palette and the tick-in motion
├── content/
│   └── resume.js           every word on the page lives here
├── components/
│   ├── names/NameMotion    the weight-ramped name
│   ├── gears/              gear geometry, the train layout and the SVG parts
│   ├── Resume.jsx          one semantic résumé, styled by the page around it
│   └── Portrait.jsx
└── hooks/useClock.js       respects the reduced-motion setting
```

The name and the gears each run on a small `requestAnimationFrame` hook that writes straight to the DOM, so React doesn't re-render once per frame.

<br>

## ⚙ Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build in dist/
```

To update the content, edit [`src/content/resume.js`](src/content/resume.js). The page reads everything from that file.

<br>

<div align="center">

**[gsct2002@gmail.com](mailto:gsct2002@gmail.com)** · **[LinkedIn](https://www.linkedin.com/in/gavin-thomas-821b341b0/)**

<sub>Designed and built by Gavin Thomas</sub>

</div>
