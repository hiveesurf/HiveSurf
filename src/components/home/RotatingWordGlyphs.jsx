// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import useReducedMotion from '../../hooks/useReducedMotion'

/**
 * Custom decorative glyphs for the "Run your next … with HiveSurf." section.
 * Each glyph is hand-drawn SVG (not stock / icon-library) and has its own
 * looped Framer Motion animation. Positions are responsive (hidden < md).
 *
 * Colors reference brand tokens via Tailwind text utilities on the wrapping
 * motion.div so the inner SVG can use `currentColor`.
 */

const HiveHex = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%" fill="none" aria-hidden>
    <path
      d="M32 3 57 17.5V46.5L32 61 7 46.5V17.5L32 3Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <circle cx="24" cy="28" r="3.2" fill="currentColor" />
    <circle cx="40" cy="28" r="3.2" fill="currentColor" />
    <circle cx="32" cy="42" r="3.2" fill="currentColor" />
  </svg>
)

const Ribbon = () => (
  <svg viewBox="0 0 80 40" width="100%" height="100%" fill="none" aria-hidden>
    <path
      d="M4 26 C 16 4, 28 4, 40 26 S 64 48, 76 26"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
)

const OrbitSatellite = () => (
  <svg viewBox="0 0 80 80" width="100%" height="100%" fill="none" aria-hidden>
    <circle cx="40" cy="40" r="28" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 6" />
    <circle cx="40" cy="40" r="6" fill="currentColor" />
    <circle cx="68" cy="40" r="4" fill="currentColor" />
  </svg>
)

const Bloom = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%" fill="currentColor" aria-hidden>
    <path d="M32 6c2 12 8 18 20 20-12 2-18 8-20 20-2-12-8-18-20-20 12-2 18-8 20-20Z" />
  </svg>
)

const WaveStack = () => (
  <svg viewBox="0 0 72 48" width="100%" height="100%" fill="none" aria-hidden>
    <path
      d="M4 14 Q 18 2 32 14 T 68 14"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <path
      d="M4 28 Q 18 16 32 28 T 68 28"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      opacity="0.75"
    />
    <path
      d="M4 42 Q 18 30 32 42 T 68 42"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
)

const LoopArrow = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%" fill="none" aria-hidden>
    <path
      d="M48 18 C 64 28, 52 54, 28 52 C 10 50, 4 36, 14 26 C 22 18, 34 20, 40 28"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <path
      d="M36 20 L 44 30 L 32 32"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const CursorPill = () => (
  <svg viewBox="0 0 72 56" width="100%" height="100%" fill="none" aria-hidden>
    <rect x="4" y="10" width="48" height="22" rx="11" fill="currentColor" />
    <path d="M40 28 L 66 48 L 56 38 L 52 52 L 46 34 Z" fill="currentColor" />
  </svg>
)

const DotGrid = () => (
  <svg viewBox="0 0 60 60" width="100%" height="100%" fill="currentColor" aria-hidden>
    {[0, 1, 2].flatMap((row) =>
      [0, 1, 2].map((col) => (
        <circle key={`${row}-${col}`} cx={10 + col * 20} cy={10 + row * 20} r="4" />
      )),
    )}
  </svg>
)

const Cloud = () => (
  <svg viewBox="0 0 80 56" width="100%" height="100%" fill="currentColor" aria-hidden>
    <path d="M20 38c-8 0-14-6-14-13s6-13 14-13c2-7 9-12 17-12 10 0 18 8 18 18h1c7 0 13 6 13 13s-6 13-13 13H20Z" />
  </svg>
)

/** Glyph descriptors: each gets unique position, size, color and motion loop */
const glyphs = [
  {
    id: 'hex',
    Comp: HiveHex,
    color: 'text-hottake',
    style: { left: '6%', top: '16%', width: 56, height: 56 },
    animate: { rotate: [0, 10, -6, 0], y: [0, -10, 0] },
    transition: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    id: 'ribbon',
    Comp: Ribbon,
    color: 'text-viralcrush',
    style: { right: '7%', top: '14%', width: 110, height: 52 },
    animate: { x: [0, 12, -12, 0], rotate: [-6, 6, -6] },
    transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    id: 'orbit',
    Comp: OrbitSatellite,
    color: 'text-offline',
    style: { left: '4%', top: '52%', width: 72, height: 72 },
    animate: { rotate: [0, 360] },
    transition: { duration: 14, repeat: Infinity, ease: 'linear' },
  },
  {
    id: 'wave',
    Comp: WaveStack,
    color: 'text-hottake',
    style: { right: '5%', top: '48%', width: 92, height: 60 },
    animate: { y: [0, -8, 0], scaleX: [1, 1.06, 1] },
    transition: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    id: 'bloom',
    Comp: Bloom,
    color: 'text-viralcrush',
    style: { left: '12%', bottom: '12%', width: 54, height: 54 },
    animate: { scale: [0.9, 1.15, 0.9], rotate: [0, 45, 0] },
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    id: 'loop',
    Comp: LoopArrow,
    color: 'text-offline',
    style: { right: '10%', bottom: '15%', width: 62, height: 62 },
    animate: { rotate: [0, -14, 14, 0] },
    transition: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    id: 'cursor',
    Comp: CursorPill,
    color: 'text-hottake',
    style: { left: '48%', top: '6%', width: 72, height: 56 },
    animate: { rotate: [-4, 8, -4], y: [0, -6, 0] },
    transition: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    id: 'dotgrid',
    Comp: DotGrid,
    color: 'text-viralcrush',
    style: { left: '22%', top: '38%', width: 48, height: 48 },
    animate: { opacity: [0.55, 1, 0.55], rotate: [0, 90, 0] },
    transition: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
  },
  {
    id: 'cloud',
    Comp: Cloud,
    color: 'text-offline',
    style: { right: '22%', bottom: '6%', width: 72, height: 50 },
    animate: { x: [0, 16, 0], y: [0, -6, 0] },
    transition: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
  },
]

const RotatingWordGlyphs = () => {
  const reduced = useReducedMotion()

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
      {glyphs.map(({ id, Comp, color, style, animate, transition }, i) => (
        <motion.div
          key={id}
          className={`absolute ${color}`}
          style={{ ...style, willChange: 'transform' }}
          initial={reduced ? false : { opacity: 0, scale: 0.6, y: 20 }}
          whileInView={
            reduced
              ? { opacity: 0.9 }
              : { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, delay: 0.06 * i, ease: [0.25, 0.46, 0.45, 0.94] } }
          }
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div
            className="h-full w-full"
            animate={reduced ? {} : animate}
            transition={reduced ? { duration: 0 } : transition}
            style={{ willChange: 'transform' }}
          >
            <Comp />
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

export default RotatingWordGlyphs
