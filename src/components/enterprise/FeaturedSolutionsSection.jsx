import { useRef } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import {
  featuredSolutionThemes,
  featuredSolutions,
} from '../../data/enterpriseHome'
import useReducedMotion from '../../hooks/useReducedMotion'

const themeClasses = {
  light: 'bg-white text-[#0b0b0b]',
  muted: 'bg-[#f4f6fb] text-[#0b0b0b]',
}

const SCREEN_CLASS =
  'relative w-full aspect-[16/10] min-h-[260px] overflow-hidden sm:min-h-[300px] lg:min-h-[400px]'

const DeviceMockup = ({ image, alt, device, reduced, isDark }) => {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 24 })
  const py = useSpring(useTransform(my, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 24 })

  const onMove = (e) => {
    if (reduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const screen = (
    <div className="relative h-full w-full overflow-hidden bg-[#0a0a0a]">
      <img src={image} alt={alt} className="h-full w-full object-cover object-center" loading="lazy" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
    </div>
  )

  const glow = isDark
    ? 'shadow-[0_32px_80px_rgba(0,0,0,0.45)]'
    : 'shadow-[0_24px_64px_rgba(0,0,0,0.14)]'

  let frame
  if (device === 'tablet') {
    frame = (
      <div className={`w-full rounded-[1.5rem] border-[10px] border-[#1a1a1a] bg-[#1a1a1a] ${glow}`}>
        <div className={`${SCREEN_CLASS} rounded-lg`}>{screen}</div>
      </div>
    )
  } else if (device === 'desktop') {
    frame = (
      <div className={`w-full ${glow}`}>
        <div className="overflow-hidden rounded-t-xl border border-black/10 bg-[#1a1a1a] p-2.5 pb-0">
          <div className="mb-2.5 flex gap-1.5 px-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className={SCREEN_CLASS}>{screen}</div>
        </div>
        <div className="mx-auto h-3 w-[42%] rounded-b-md bg-[#2a2a2a]" />
        <div className="mx-auto mt-1 h-1 w-[30%] rounded-full bg-[#333]" />
      </div>
    )
  } else if (device === 'glass') {
    frame = (
      <div
        className={`relative w-full overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-white/80 to-white/40 p-3 shadow-inner backdrop-blur-sm ${glow}`}
      >
        <div className={`${SCREEN_CLASS} rounded-xl border border-white/40 shadow-lg`}>{screen}</div>
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[var(--ent-primary)]/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-[var(--ent-secondary)]/10 blur-2xl" />
      </div>
    )
  } else {
    frame = (
      <div className={`w-full ${glow}`}>
        <div className="overflow-hidden rounded-t-2xl border border-black/10 bg-[#1a1a1a] p-3 pb-0">
          <div className="mb-2.5 h-2 w-12 rounded-full bg-[#333]" />
          <div className={SCREEN_CLASS}>{screen}</div>
        </div>
        <div className="h-4 rounded-b-2xl bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]" />
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduced ? undefined : { x: px, y: py }}
      className="group w-full"
      whileHover={reduced ? undefined : { scale: 1.02 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {frame}
    </motion.div>
  )
}

const SolutionRow = ({ solution, index, theme, reduced }) => {
  const imageRight = index % 2 === 1
  const mutedText = 'text-[#555]'
  const headlineColor = 'text-[#0b0b0b]'
  const highlightText = 'text-[#333]'

  return (
    <div className={`relative ${themeClasses[theme] || themeClasses.light}`}>
      {theme === 'muted' && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-[var(--ent-primary)]/5 blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-[var(--ent-secondary)]/5 blur-[80px]" />
        </div>
      )}

      <div className="ent-container relative z-10 py-20 lg:py-28">
        <div className="flex flex-col items-center gap-12 lg:gap-20 lg:flex-row lg:items-center">
          {/* Image — 58% on desktop */}
          <motion.div
            className={`w-full min-w-0 shrink-0 lg:w-[58%] ${imageRight ? 'lg:order-2' : 'lg:order-1'}`}
            initial={reduced ? false : { opacity: 0, scale: 0.95 }}
            whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <DeviceMockup
              image={solution.image}
              alt={solution.imageAlt}
              device={solution.device}
              reduced={reduced}
              isDark={false}
            />
          </motion.div>

          {/* Content — 42% on desktop */}
          <div
            className={`w-full min-w-0 lg:w-[42%] ${imageRight ? 'lg:order-1' : 'lg:order-2'}`}
          >
            <motion.p
              className="ent-kicker"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.05 }}
            >
              {solution.category}
            </motion.p>

            <motion.h3
              className={`ent-display mt-3 text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em] ${headlineColor}`}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {solution.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </motion.h3>

            <motion.p
              className={`mt-5 text-base leading-[1.75] lg:text-[17px] ${mutedText}`}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {solution.description}
            </motion.p>

            <ul className="mt-8 flex flex-col gap-3">
              {solution.highlights.map((item, hi) => (
                <motion.li
                  key={item}
                  className={`flex items-center gap-3 text-[15px] font-medium ${highlightText}`}
                  initial={reduced ? false : { opacity: 0, x: -12 }}
                  whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.2 + hi * 0.04 }}
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--ent-primary)]/15 text-[var(--ent-primary)]">
                    <Check className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                  <span className="min-w-0">{item}</span>
                </motion.li>
              ))}
            </ul>

            <motion.a
              href="#contact"
              className="group/cta mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-[var(--ent-primary)]"
              initial={reduced ? false : { opacity: 0 }}
              whileInView={reduced ? undefined : { opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.45 }}
            >
              Explore Solution
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  )
}

const FeaturedSolutionsSection = () => {
  const reduced = useReducedMotion()

  return (
    <section id="technologies" className="scroll-mt-24 overflow-hidden">
      <div className="bg-white py-20 lg:py-28">
        <div className="ent-container">
          <motion.div
            className="max-w-[720px]"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="ent-kicker">Featured Solutions</p>
            <h2 className="ent-display mt-4 text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[var(--ent-text-heading)]">
              Digital Products Built for Modern Businesses
            </h2>
            <p className="mt-5 text-base leading-[1.75] text-[#555] lg:text-lg">
              We engineer scalable platforms, enterprise software, AI-powered applications, and digital
              products that solve complex business challenges and create measurable impact.
            </p>
          </motion.div>
        </div>
      </div>

      {featuredSolutions.map((solution, i) => (
        <div key={solution.id}>
          {i > 0 && <div className="h-px bg-gradient-to-r from-transparent via-black/8 to-transparent" />}
          <SolutionRow
            solution={solution}
            index={i}
            theme={featuredSolutionThemes[i]}
            reduced={reduced}
          />
        </div>
      ))}
    </section>
  )
}

export default FeaturedSolutionsSection
