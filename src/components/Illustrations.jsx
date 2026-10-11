import { useId, useMemo } from 'react'

/* ───────────────────────────────────────────────────────────
   Media: თუ site.images-ში მითითებულია რეალური ფოტო, გამოჩნდება ის.
   წინააღმდეგ შემთხვევაში SVG placeholder (children).
   ─────────────────────────────────────────────────────────── */
export function Media({ image, alt, priority = false, className = '', children }) {
  if (image?.src) {
    return (
      <img
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }
  return children
}

/* ───── დახმარე ფუნქციები: დეტერმინისტული "შემთხვევითობა" ───── */
function rng(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function makeGrains(seed, count, box, colors, size = [0.7, 2.5]) {
  const r = rng(seed)
  return Array.from({ length: count }, () => {
    const rx = size[0] + r() * (size[1] - size[0])
    return {
      cx: box[0] + r() * (box[2] - box[0]),
      cy: box[1] + r() * (box[3] - box[1]),
      rx,
      ry: rx * (0.55 + r() * 0.45),
      rot: Math.round(r() * 180),
      fill: colors[Math.floor(r() * colors.length)],
      o: +(0.45 + r() * 0.5).toFixed(2),
    }
  })
}

function makeFibers(seed, count, box) {
  const r = rng(seed)
  return Array.from({ length: count }, () => {
    const x = box[0] + r() * (box[2] - box[0])
    const y = box[1] + r() * (box[3] - box[1])
    const len = 6 + r() * 12
    const ang = r() * Math.PI
    const dx = Math.cos(ang) * len
    const dy = Math.sin(ang) * len * 0.6
    return `M${x.toFixed(1)} ${y.toFixed(1)}q${(dx / 2 + (r() - 0.5) * 4).toFixed(1)} ${(
      dy / 2 +
      (r() - 0.5) * 4
    ).toFixed(1)} ${dx.toFixed(1)} ${dy.toFixed(1)}`
  })
}

const GROUNDS = ['#1b110b', '#2a1c14', '#3b2a20', '#4a3626', '#5e4532', '#725744']
const SOIL = ['#35241a', '#4a3322', '#5d3f2a', '#7a5638', '#8a6544']
const BALL = ['#2a1c14', '#4a3322', '#5d3f2a', '#7a5638', '#9a6b47', '#b08258']

function Grains({ items }) {
  return (
    <g>
      {items.map((g, i) => (
        <ellipse
          key={i}
          cx={g.cx}
          cy={g.cy}
          rx={g.rx}
          ry={g.ry}
          fill={g.fill}
          opacity={g.o}
          transform={`rotate(${g.rot} ${g.cx} ${g.cy})`}
        />
      ))}
    </g>
  )
}

/* ნერგი: ღერო და ორი ფოთოლი. (0,0) = ღეროს ფუძე */
function Sprout({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M0 0C-1 -20 2 -44 1 -64" fill="none" stroke="#3f7a3b" strokeWidth="4" strokeLinecap="round" />
      <path d="M1 -62C-20 -84 -46 -84 -58 -72C-42 -56 -18 -52 1 -62Z" fill="#4e8b47" />
      <path d="M2 -66C22 -92 50 -94 62 -82C48 -62 22 -56 2 -66Z" fill="#5a9a50" />
      <path d="M1 -62C-18 -68 -36 -71 -52 -72" fill="none" stroke="#2f6b3a" strokeWidth="1.2" opacity=".6" />
      <path d="M2 -66C22 -72 42 -78 56 -82" fill="none" stroke="#2f6b3a" strokeWidth="1.2" opacity=".6" />
    </g>
  )
}

/* ზედაპირი და ფონის განათება, საერთო ყველა სცენისთვის */
function Backdrop({ uid, w, h, floorY }) {
  return (
    <g>
      <defs>
        <radialGradient id={`${uid}-light`} cx="32%" cy="18%" r="85%">
          <stop offset="0" stopColor="#fffbf4" />
          <stop offset="1" stopColor="#e6dac5" />
        </radialGradient>
        <linearGradient id={`${uid}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dccfb8" />
          <stop offset="1" stopColor="#cdbfa4" />
        </linearGradient>
      </defs>
      <rect x="-200" y="-200" width={w + 400} height={h + 400} fill={`url(#${uid}-light)`} />
      <rect x="-200" y={floorY} width={w + 400} height={h + 400} fill={`url(#${uid}-floor)`} />
      <line x1="-200" x2={w + 400} y1={floorY} y2={floorY} stroke="#bcae92" strokeWidth="1.5" />
    </g>
  )
}

/* ქოთანი + მიწა + ნერგი. კოორდინატები: ქოთნის ღერძი x=290, ფუძე y=432 */
function Pot({ uid, grow = false }) {
  const body = 'M196 252L384 252L360 418Q358 432 344 432L236 432Q222 432 220 418Z'
  const grains = useMemo(() => makeGrains(11, 360, [190, 252, 390, 434], GROUNDS, [0.7, 2.3]), [])
  const fibers = useMemo(() => makeFibers(23, 46, [200, 262, 380, 426]), [])
  const soilGrains = useMemo(() => makeGrains(37, 90, [206, 241, 374, 263], SOIL, [0.6, 2]), [])

  return (
    <g>
      <defs>
        <clipPath id={`${uid}-body`}><path d={body} /></clipPath>
        <clipPath id={`${uid}-soil`}><ellipse cx="290" cy="252" rx="84" ry="12" /></clipPath>
        <linearGradient id={`${uid}-shade`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5a4434" />
          <stop offset=".42" stopColor="#3b2a20" />
          <stop offset="1" stopColor="#1f140d" />
        </linearGradient>
        <linearGradient id={`${uid}-hi`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity=".16" />
          <stop offset=".35" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id={`${uid}-blur`} x="-20%" y="-100%" width="140%" height="300%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id={`${uid}-grain`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4" />
          <feColorMatrix values="0 0 0 0 .08  0 0 0 0 .05  0 0 0 0 .03  1.5 0 0 0 -.5" />
        </filter>
      </defs>

      {/* ჩრდილი ზედაპირზე */}
      <ellipse cx="296" cy="437" rx="112" ry="10" fill="#2a1c14" opacity=".35" filter={`url(#${uid}-blur)`} />

      {/* ქოთნის კორპუსი */}
      <path d={body} fill={`url(#${uid}-shade)`} />
      <g clipPath={`url(#${uid}-body)`}>
        <Grains items={grains} />
        <g fill="none" stroke="#9a8068" strokeWidth=".9" strokeLinecap="round" opacity=".5">
          {fibers.map((d, i) => <path key={i} d={d} />)}
        </g>
        <rect x="190" y="252" width="200" height="182" filter={`url(#${uid}-grain)`} opacity=".5" />
        <rect x="190" y="252" width="200" height="182" fill={`url(#${uid}-hi)`} />
        {/* ქვედა კიდის დაბნელება */}
        <rect x="190" y="400" width="200" height="34" fill="#140b06" opacity=".22" />
      </g>

      {/* პირი + მიწა */}
      <ellipse cx="290" cy="252" rx="96" ry="17" fill="#53402f" stroke="#7a6350" strokeWidth="1.5" />
      <ellipse cx="290" cy="252" rx="84" ry="12" fill="#3a281c" />
      <g clipPath={`url(#${uid}-soil)`}>
        <Grains items={soilGrains} />
        <ellipse cx="290" cy="248" rx="84" ry="6" fill="#000" opacity=".16" />
      </g>

      {/* ნერგი */}
      <g className={grow ? 'sprout-grow' : undefined}>
        <Sprout x={290} y={252} />
      </g>
    </g>
  )
}

/* ───── 1. Hero სცენა ───── */
export function HeroScene({ label }) {
  const uid = useId().replace(/:/g, '')
  const pile = 'M30 434C52 432 66 414 88 398C102 388 118 382 134 386C156 392 172 414 196 434Z'
  const soilPile = 'M392 434C410 428 424 414 442 404C456 396 472 396 486 404C504 414 516 428 534 434Z'
  const pileGrains = useMemo(() => makeGrains(5, 240, [28, 380, 198, 436], GROUNDS, [0.7, 2.6]), [])
  const loose = useMemo(
    () => makeGrains(8, 46, [18, 434, 250, 452], GROUNDS.slice(1), [0.8, 2.2]),
    [],
  )
  const soilGrains = useMemo(() => makeGrains(9, 150, [390, 394, 536, 436], SOIL, [0.7, 2.4]), [])

  return (
    <svg
      viewBox="0 0 560 520"
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <Backdrop uid={uid} w={560} h={520} floorY={432} />
      <defs>
        <clipPath id={`${uid}-pile`}><path d={pile} /></clipPath>
        <clipPath id={`${uid}-spile`}><path d={soilPile} /></clipPath>
      </defs>

      {/* ყავის ნალექის გროვა */}
      <path d={pile} fill="#33231a" />
      <g clipPath={`url(#${uid}-pile)`}>
        <Grains items={pileGrains} />
        <path d="M30 434C52 432 66 414 88 398C102 388 118 382 134 386C122 400 90 420 60 434Z" fill="#fff" opacity=".07" />
      </g>
      <Grains items={loose} />

      {/* მიწის გროვა */}
      <path d={soilPile} fill="#6a4b35" />
      <g clipPath={`url(#${uid}-spile)`}>
        <Grains items={soilGrains} />
      </g>

      <Pot uid={`${uid}p`} grow />
    </svg>
  )
}

/* ───── 2. პროდუქტი: სანერგე ქოთანი ───── */
export function PotScene({ label }) {
  const uid = useId().replace(/:/g, '')
  return (
    <svg
      viewBox="70 140 440 330"
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <Backdrop uid={uid} w={560} h={520} floorY={432} />
      <Pot uid={`${uid}p`} />
    </svg>
  )
}

/* ───── 3. პროდუქტი: ნერგის ბურთულა ───── */
export function BallScene({ label }) {
  const uid = useId().replace(/:/g, '')
  const grains = useMemo(() => makeGrains(71, 330, [118, 108, 282, 264], BALL, [0.8, 2.6]), [])
  const fibers = useMemo(() => makeFibers(73, 34, [124, 114, 276, 258]), [])

  return (
    <svg
      viewBox="0 0 400 300"
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <Backdrop uid={uid} w={400} h={300} floorY={252} />
      <defs>
        <clipPath id={`${uid}-ball`}><circle cx="200" cy="174" r="76" /></clipPath>
        <radialGradient id={`${uid}-sph`} cx="34%" cy="28%" r="80%">
          <stop offset="0" stopColor="#7d5c42" />
          <stop offset=".5" stopColor="#3f2d21" />
          <stop offset="1" stopColor="#1c110a" />
        </radialGradient>
        <filter id={`${uid}-blur`} x="-20%" y="-100%" width="140%" height="300%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id={`${uid}-grain`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="9" />
          <feColorMatrix values="0 0 0 0 .08  0 0 0 0 .05  0 0 0 0 .03  1.5 0 0 0 -.5" />
        </filter>
      </defs>

      <ellipse cx="206" cy="256" rx="76" ry="8" fill="#2a1c14" opacity=".38" filter={`url(#${uid}-blur)`} />

      <circle cx="200" cy="174" r="76" fill={`url(#${uid}-sph)`} />
      <g clipPath={`url(#${uid}-ball)`}>
        <Grains items={grains} />
        <g fill="none" stroke="#a58a6e" strokeWidth=".9" strokeLinecap="round" opacity=".5">
          {fibers.map((d, i) => <path key={i} d={d} />)}
        </g>
        <rect x="120" y="96" width="160" height="160" filter={`url(#${uid}-grain)`} opacity=".5" />
        <ellipse cx="170" cy="132" rx="30" ry="16" fill="#fff" opacity=".1" transform="rotate(-28 170 132)" />
        <circle cx="200" cy="174" r="76" fill="none" stroke="#000" strokeWidth="26" opacity=".12" />
      </g>

      {/* ნერგი ბურთულის თავზე */}
      <ellipse cx="200" cy="100" rx="9" ry="3" fill="#1c110a" />
      <Sprout x={200} y={102} scale={0.72} />
    </svg>
  )
}
