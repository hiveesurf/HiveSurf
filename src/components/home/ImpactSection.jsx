import { useEffect, useRef, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, useInView, useScroll, useTransform, useMotionTemplate } from 'framer-motion'
import { FiEye, FiZap, FiLink, FiDollarSign } from 'react-icons/fi'
import { stats, creatorCards } from '../../data/hivesurfHome'
import useReducedMotion from '../../hooks/useReducedMotion'
import useCountUp from '../../hooks/useCountUp'

const icons = [FiEye, FiZap, FiLink, FiDollarSign]

const BG_GRADIENT =
  'linear-gradient(180deg, #d7a3f3 0%, #e18adb 28%, #ed7a9b 55%, #fe3f00 100%)'

const statParallax = [-260, -180, -110, -50]
const statFadeOutStart = [0.48, 0.5, 0.52, 0.54]
const statFadeOutEnd = [0.58, 0.6, 0.62, 0.64]

const StatBox = ({ stat, i, inView, progress, desktop, reduced }) => {
  const animated = useCountUp(stat.value, 1800, inView && !reduced)
  const value = reduced ? stat.value : animated
  const Icon = icons[i]

  const yAmp = desktop ? statParallax[i] : 0

  const y = useTransform(
    progress,
    [0, 0.45, 0.62],
    [0, 0, yAmp],
  )
  const opacity = useTransform(
    progress,
    [0, statFadeOutStart[i], statFadeOutEnd[i]],
    [1, 1, 0],
  )

  return (
    <motion.div
      className="relative"
      style={reduced ? undefined : { y, opacity, willChange: 'transform, opacity' }}
    >
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 translate-x-[10px] translate-y-[12px] bg-offline"
        />
        <div className="relative min-h-[240px] border-[3px] border-offline bg-gridglow">
          <div className="relative z-10 flex h-full flex-col p-6 pb-8">
            <Icon className="text-[28px] text-offline" aria-hidden />
            <div className="mt-6 font-heading text-[clamp(2.75rem,4.5vw+1rem,4.5rem)] font-black leading-[0.95] tracking-tight text-offline">
              {stat.prefix}
              {value}
              {stat.suffix}
            </div>
            <p className="mt-auto pt-6 text-[15px] font-medium leading-snug text-offline/75">
              {stat.label}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const creatorWidths = [
  'w-[140px] md:w-[180px] lg:w-[180px]',
  'w-[160px] md:w-[210px] lg:w-[210px]',
  'w-[200px] md:w-[260px] lg:w-[280px]',
  'w-[160px] md:w-[210px] lg:w-[210px]',
  'w-[140px] md:w-[180px] lg:w-[180px]',
]
const creatorHeights = [
  'h-[220px] md:h-[260px] lg:h-[260px]',
  'h-[250px] md:h-[300px] lg:h-[300px]',
  'h-[300px] md:h-[360px] lg:h-[380px]',
  'h-[250px] md:h-[300px] lg:h-[300px]',
  'h-[220px] md:h-[260px] lg:h-[260px]',
]
const creatorHides = [
  'hidden md:block',
  'block',
  'block',
  'block',
  'hidden md:block',
]

const getCreatorWidth = (i) => creatorWidths[i] || 'w-[160px] md:w-[210px] lg:w-[210px]'
const getCreatorHeight = (i) => creatorHeights[i] || 'h-[250px] md:h-[300px] lg:h-[300px]'
const getCreatorHide = (i) => creatorHides[i] || 'block'

const CreatorCardItem = ({ card, i, progress, reduced }) => {
  const start = 0.74 + i * 0.035
  const end = Math.min(start + 0.12, 0.97)

  const x = useTransform(progress, [start, end], [260, 0])
  const y = useTransform(progress, [start, end], [40, 0])
  const opacity = useTransform(progress, [start, end], [0, 1])
  const scale = useTransform(progress, [start, end], [0.94, 1])

  return (
    <motion.div
      className={`relative shrink-0 ${getCreatorWidth(i)} ${getCreatorHeight(i)} ${getCreatorHide(i)}`}
      style={reduced ? undefined : { x, y, opacity, scale, willChange: 'transform, opacity' }}
    >
      <a
        href={card.instagramHref}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block h-full w-full overflow-hidden rounded-[var(--radius-l)] outline-none ring-offline/20 focus-visible:ring-2"
        style={{ boxShadow: '0 14px 28px rgba(0,0,0,0.28)' }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`} />
        <img
          src={card.image}
          alt={`@${card.instagramHandle} on Instagram`}
          className="absolute inset-0 h-full w-full object-cover mix-blend-overlay opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute inset-x-3 bottom-3 text-white">
          <p className="text-sm font-semibold">@{card.instagramHandle}</p>
          <p className="text-xs opacity-80">{card.niche}</p>
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-offline">
          Matched
        </span>
      </a>
    </motion.div>
  )
}

const ImpactSection = () => {
  const reduced = useReducedMotion()
  const sectionRef = useRef(null)
  const pinnedRef = useRef(null)
  const inView = useInView(pinnedRef, { once: true, margin: '-100px' })
  const [desktop, setDesktop] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(min-width: 1024px)')
    setDesktop(mq.matches)
    const handle = (e) => setDesktop(e.matches)
    mq.addEventListener?.('change', handle)
    return () => mq.removeEventListener?.('change', handle)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const sceneAOpacity = useTransform(scrollYProgress, [0, 0.58, 0.66], [1, 1, 0])
  const sceneAX = useTransform(scrollYProgress, [0.52, 0.64], [0, -40])

  const kickerAOpacity = useTransform(scrollYProgress, [0, 0.28, 0.36], [1, 1, 0])

  const h1Opacity = useTransform(scrollYProgress, [0, 0.28, 0.4], [1, 1, 0])
  const h1Y = useTransform(scrollYProgress, [0, 0.4], [0, -30])
  const h1Scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.96])

  const h2Opacity = useTransform(scrollYProgress, [0.32, 0.42, 0.54, 0.6], [0, 1, 1, 0])
  const h2Y = useTransform(scrollYProgress, [0.32, 0.42, 0.6], [36, 0, -30])
  const h2Scale = useTransform(scrollYProgress, [0.32, 0.42], [0.94, 1])

  const sceneBOpacity = useTransform(scrollYProgress, [0.56, 0.66], [0, 1])
  const sceneBX = useTransform(scrollYProgress, [0.54, 0.68], [80, 0])

  const creatorKickerOpacity = useTransform(scrollYProgress, [0.58, 0.68], [0, 1])
  const creatorKickerY = useTransform(scrollYProgress, [0.58, 0.68], [16, 0])

  const creatorHeadingInset = useTransform(scrollYProgress, [0.62, 0.74], [100, 0])
  const creatorHeadingClip = useMotionTemplate`inset(0 ${creatorHeadingInset}% 0 0)`
  const creatorHeadingY = useTransform(scrollYProgress, [0.62, 0.74], [24, 0])
  const creatorHeadingOpacity = useTransform(scrollYProgress, [0.62, 0.66], [0, 1])

  const creatorParaOpacity = useTransform(scrollYProgress, [0.7, 0.78], [0, 1])
  const creatorParaY = useTransform(scrollYProgress, [0.7, 0.78], [24, 0])

  if (reduced) {
    return (
      <>
        <section
          className="relative w-full overflow-hidden py-28 lg:py-36"
          style={{ background: BG_GRADIENT }}
        >
          <div className="relative mx-auto w-full max-w-[1400px] px-5 lg:px-10">
            <div ref={pinnedRef} className="text-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-offline/70">
                By the numbers
              </p>
              <h2 className="mx-auto max-w-[20ch] font-heading text-[clamp(3rem,6vw+1rem,6rem)] font-black leading-[1] tracking-tight text-offline">
                The hype is real.
              </h2>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-7">
              {stats.map((stat, i) => (
                <StatBox
                  key={stat.label}
                  stat={stat}
                  i={i}
                  inView={inView}
                  progress={scrollYProgress}
                  desktop={false}
                  reduced
                />
              ))}
            </div>
          </div>
        </section>

        <section
          className="relative w-full overflow-hidden py-24 lg:py-32"
          style={{ background: BG_GRADIENT }}
        >
          <div className="mx-auto w-full max-w-[1400px] px-5 lg:px-10">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-offline/70">
                Creator matching
              </p>
              <h2 className="mx-auto mt-4 max-w-[22ch] font-heading text-[clamp(2.5rem,5vw+1rem,5rem)] font-black leading-[1.02] tracking-tight text-offline">
                Match with the right creators for every brief.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-xl-fluid text-offline/80">
                Our matching engine scores 2M+ vetted creators on audience, content fit, and past performance — so your shortlist is ready in minutes, not weeks.
              </p>
            </div>
            <div className="relative mt-12 flex items-end justify-center gap-3 lg:mt-16 lg:gap-6">
              <div
                className="pointer-events-none absolute -left-5 bottom-4 hidden h-[210px] w-[140px] rounded-[var(--radius-l)] border border-offline/25 bg-offline/10 md:block lg:-left-12"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -right-5 bottom-10 hidden h-[245px] w-[150px] rounded-[var(--radius-l)] border border-offline/25 bg-offline/10 md:block lg:-right-12"
                aria-hidden
              />
              {creatorCards.map((card, i) => (
                <CreatorCardItem
                  key={card.instagramHandle}
                  card={card}
                  i={i}
                  progress={scrollYProgress}
                  reduced
                />
              ))}
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: '440vh' }}
      aria-label="HiveSurf impact and creator matching"
    >
      <div
        ref={pinnedRef}
        className="sticky top-0 h-[100svh] w-full overflow-hidden"
        style={{ background: BG_GRADIENT }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              'repeating-radial-gradient(circle at 50% 50%, rgba(0,0,0,0.25) 0 1px, transparent 1px 3px)',
          }}
          aria-hidden
        />

        <motion.div
          className="absolute inset-0 flex items-center justify-center px-5 lg:px-10"
          style={{ opacity: sceneAOpacity, x: sceneAX, willChange: 'transform, opacity' }}
        >
          <div className="flex w-full max-w-[1400px] flex-col items-center">
            <motion.p
              className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-offline/70"
              style={{ opacity: kickerAOpacity }}
            >
              By the numbers
            </motion.p>

            <div className="relative h-[clamp(140px,18vh,240px)] w-full">
              <motion.h2
                style={{ opacity: h1Opacity, y: h1Y, scale: h1Scale, willChange: 'transform, opacity' }}
                className="absolute inset-0 flex items-center justify-center text-center"
              >
                <span className="mx-auto block max-w-[22ch] font-heading text-[clamp(2rem,4vw+1rem,4.5rem)] font-black leading-[1.02] tracking-tight text-offline">
                  HiveSurf is how creator marketing gets done.
                </span>
              </motion.h2>

              <motion.h2
                style={{ opacity: h2Opacity, y: h2Y, scale: h2Scale, willChange: 'transform, opacity' }}
                className="absolute inset-0 flex items-center justify-center text-center"
              >
                <span className="mx-auto block font-heading text-[clamp(3rem,7vw+1rem,7rem)] font-black leading-[1] tracking-tight text-offline">
                  The hype is real.
                </span>
              </motion.h2>
            </div>

            <div className="mt-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-7">
              {stats.map((stat, i) => (
                <StatBox
                  key={stat.label}
                  stat={stat}
                  i={i}
                  inView={inView}
                  progress={scrollYProgress}
                  desktop={desktop}
                  reduced={false}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center px-5 lg:px-10"
          style={{ opacity: sceneBOpacity, x: sceneBX, willChange: 'transform, opacity' }}
        >
          <div className="w-full max-w-[1400px]">
            <motion.p
              style={{ opacity: creatorKickerOpacity, y: creatorKickerY, willChange: 'transform, opacity' }}
              className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.24em] text-offline/80"
            >
              Creator matching
            </motion.p>

            <motion.h2
              style={{
                opacity: creatorHeadingOpacity,
                y: creatorHeadingY,
                clipPath: creatorHeadingClip,
                WebkitClipPath: creatorHeadingClip,
                willChange: 'transform, opacity',
              }}
              className="mx-auto max-w-[22ch] text-center font-heading text-[clamp(2.5rem,5vw+1rem,5rem)] font-black leading-[1.02] tracking-tight text-offline"
            >
              Match with the right creators for every brief.
            </motion.h2>

            <motion.p
              style={{ opacity: creatorParaOpacity, y: creatorParaY, willChange: 'transform, opacity' }}
              className="mx-auto mt-6 max-w-2xl text-center text-xl-fluid text-offline/85"
            >
              Our matching engine scores 2M+ vetted creators on audience, content fit, and past performance — so your shortlist is ready in minutes, not weeks.
            </motion.p>

            <div className="relative mt-10 flex items-end justify-center gap-3 lg:mt-14 lg:gap-6">
              <div
                className="pointer-events-none absolute -left-5 bottom-4 hidden h-[210px] w-[140px] rounded-[var(--radius-l)] border border-offline/25 bg-offline/10 md:block lg:-left-12"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -right-5 bottom-10 hidden h-[245px] w-[150px] rounded-[var(--radius-l)] border border-offline/25 bg-offline/10 md:block lg:-right-12"
                aria-hidden
              />
              {creatorCards.map((card, i) => (
                <CreatorCardItem
                  key={card.instagramHandle}
                  card={card}
                  i={i}
                  progress={scrollYProgress}
                  reduced={false}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ImpactSection
