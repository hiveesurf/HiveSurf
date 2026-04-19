import { useRef, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { caseStudies } from '../../data/hivesurfHome'
import useReducedMotion from '../../hooks/useReducedMotion'
import { entranceEase, inViewConfig } from '../../lib/motionConfig'

const ugcTopics = {
  cs1: ['Morning routine reels', 'Cafe b-roll', 'Story poll swipe-ups'],
  cs2: ['Try-on transitions', 'Outfit hooks', 'UGC stitching'],
  cs3: ['Money tips shorts', 'Explainer snippets', 'Trust-building testimonials'],
  cs4: ['Workout challenge clips', 'Gym UGC duets', 'Transformation reels'],
}

// UGC-style reels (webm) hosted on jsDelivr
const UGC_REELS = [
  'https://cdn.jsdelivr.net/gh/theoderiic/adc-ugc-videos@main/_F_YYMTbd5dbWzaX81sEo_output.webm',
  'https://cdn.jsdelivr.net/gh/theoderiic/adc-ugc-videos@main/_Q6Cd9JCUoLshrLu5xH0Z_output.webm',
  'https://cdn.jsdelivr.net/gh/theoderiic/adc-ugc-videos@main/output%20(16).webm',
]

// Influencer-style reels (public sample videos as placeholders)
const INFLUENCER_REELS = [
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  'https://www.w3schools.com/html/mov_bbb.mp4',
  'https://www.w3schools.com/html/movie.mp4',
]

// Pick a reel pool per case style so each section feels unique.
const getReelPool = (style) => {
  switch (style) {
    case 'ugc':
      return UGC_REELS
    case 'influencer':
      return INFLUENCER_REELS
    case 'lifestyle':
      // Mix: influencer feel with UGC intro
      return [INFLUENCER_REELS[1], UGC_REELS[0], INFLUENCER_REELS[2]]
    case 'product':
      // Mix: UGC feel with influencer bookend
      return [UGC_REELS[2], INFLUENCER_REELS[0], UGC_REELS[1]]
    default:
      return UGC_REELS
  }
}

// Short human label used on the top-right reel pill.
const getReelLabel = (style, isFeatured) => {
  if (style === 'ugc') return isFeatured ? 'UGC Reel' : 'UGC Clip'
  if (style === 'influencer') return isFeatured ? 'Influencer Reel' : 'Creator POV'
  if (style === 'lifestyle') return isFeatured ? 'Lifestyle Reel' : 'Creator Cut'
  if (style === 'product') return isFeatured ? 'Product Reel' : 'Demo Clip'
  return isFeatured ? 'UGC Reel' : 'Creator Reel'
}

const slideVariants = {
  initial: (dir) => ({ opacity: 0, y: dir > 0 ? 26 : -26 }),
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: entranceEase } },
  exit: (dir) => ({ opacity: 0, y: dir > 0 ? -24 : 24, transition: { duration: 0.35, ease: entranceEase } }),
}

const columnEntrance = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: entranceEase, delay },
  }),
}

// Fanned stack positions: left-back, center-front, right-back.
const stackLayout = [
  { rotate: -12, x: -170, y: 28, z: 1, scale: 0.92, label: 'Influencer Reel' },
  { rotate: 0, x: 0, y: 0, z: 3, scale: 1, label: 'UGC Reel', featured: true },
  { rotate: 12, x: 170, y: 28, z: 2, scale: 0.92, label: 'Influencer Reel' },
]

const CaseStudiesSection = () => {
  const reduced = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const scrollerRef = useRef(null)
  const desktopRef = useRef(null)
  const prevProgress = useRef(0)

  const { scrollYProgress } = useScroll({
    target: desktopRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (reduced) return
    const prev = prevProgress.current
    const dir = latest >= prev ? 1 : -1
    prevProgress.current = latest
    if (dir !== direction) setDirection(dir)

    const mapped = Math.min(latest / 0.9, 1)
    const idx = Math.max(
      0,
      Math.min(caseStudies.length - 1, Math.floor(mapped * caseStudies.length)),
    )
    if (idx !== activeIndex) setActiveIndex(idx)
  })

  const shellY = useTransform(scrollYProgress, [0, 1], [0, -20])
  const stackSpread = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.85])
  const stackRotate = useTransform(scrollYProgress, [0, 1], [-1.5, 1.5])
  const stackXLeft = useTransform(stackSpread, (s) => -170 * s)
  const stackXCenter = useTransform(stackSpread, (s) => 0 * s)
  const stackXRight = useTransform(stackSpread, (s) => 170 * s)

  const onScroll = () => {
    const el = scrollerRef.current
    if (!el) return
    const idx = Math.round(el.scrollLeft / el.clientWidth)
    if (idx >= 0 && idx < caseStudies.length && idx !== activeIndex) setActiveIndex(idx)
  }

  const scrollTo = (i) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }

  const activeCase = caseStudies[activeIndex]
  const activeTopics = ugcTopics[activeCase.id] || []

  return (
    <>
      <section className="gridglow-bg relative w-full overflow-hidden text-offline lg:hidden">
        <div className="relative mx-auto flex w-full max-w-[1400px] flex-col gap-12 px-5 py-24 lg:px-10">
          <div>
            <motion.p
              className="text-xs font-semibold uppercase tracking-[0.22em] text-offline/60"
              initial={reduced ? false : { opacity: 0, y: 30 }}
              whileInView={reduced ? {} : { opacity: 1, y: 0 }}
              viewport={inViewConfig}
              transition={{ duration: 0.6, ease: entranceEase }}
            >
              Real brands. Real results.
            </motion.p>
            <motion.h2
              className="mt-4 font-heading text-h1 font-black text-offline"
              initial={reduced ? false : { opacity: 0, y: 60 }}
              whileInView={reduced ? {} : { opacity: 1, y: 0 }}
              viewport={inViewConfig}
              transition={{ duration: 0.7, ease: entranceEase, delay: 0.1 }}
            >
              Proof you can feel.
            </motion.h2>
          </div>

          <div>
            <div
              ref={scrollerRef}
              onScroll={onScroll}
              className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-webkit-overflow-scrolling:touch]"
            >
              {caseStudies.map((c, idx) => {
                const pool = getReelPool(c.style)
                // Same center-slot reel as desktop stack (i === 1): pool[(1 + activeIndex) % len]
                const videoSrc = pool[(1 + idx) % pool.length]
                const topics = ugcTopics[c.id] || []
                const reelLabel = getReelLabel(c.style, true)

                return (
                  <div
                    key={c.id}
                    className="flex w-full flex-shrink-0 snap-center justify-center px-3 sm:px-6"
                    style={{ flex: '0 0 100%' }}
                  >
                    <div className="flex w-full max-w-[min(100%,420px)] flex-col items-center sm:max-w-[460px]">
                      <div
                        className="relative w-full overflow-hidden rounded-[28px] border-[5px] border-white bg-black shadow-[0_24px_60px_rgba(0,0,0,0.2)]"
                        style={{
                          aspectRatio: '9 / 16',
                          maxHeight: 'min(70svh, 620px)',
                          width: 'min(100%, min(70svh * 9 / 16, 420px))',
                        }}
                      >
                        {reduced ? (
                          <img src={c.image} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <video
                            className="h-full w-full object-cover"
                            src={videoSrc}
                            poster={c.image}
                            muted
                            autoPlay
                            loop
                            playsInline
                          />
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/10" />
                        <span className="absolute right-3 top-3 rounded-full bg-gridglow/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-offline">
                          {reelLabel}
                        </span>
                        <span className="absolute left-3 top-3 rounded-lg bg-black/65 px-2.5 py-1 text-[11px] font-semibold text-gridglow backdrop-blur-sm">
                          01:48
                        </span>
                        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2">
                          <span className="h-1 flex-1 rounded-full bg-white/30">
                            <span className="block h-full w-[62%] rounded-full bg-white" />
                          </span>
                        </div>
                        <div className="absolute inset-x-4 bottom-10 text-white">
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] opacity-85">{c.brand}</p>
                          <p className="mt-2 font-heading text-2xl font-extrabold sm:text-3xl">{c.metric}</p>
                          <p className="mt-3 text-sm leading-snug opacity-92">&ldquo;{c.quote}&rdquo;</p>
                          <p className="mt-2 text-xs opacity-75">{c.author}</p>
                          {topics.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-1.5">
                              {topics.map((topic) => (
                                <span
                                  key={topic}
                                  className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 text-[10px] font-medium backdrop-blur-sm sm:text-xs"
                                >
                                  {topic}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
              {caseStudies.map((c, i) => {
                const isActive = i === activeIndex
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => scrollTo(i)}
                    aria-label={`Go to case study ${c.brand}`}
                    className="h-2 tr-ease"
                    style={{
                      '--duration': '300ms',
                      width: isActive ? '1.5rem' : '0.5rem',
                      borderRadius: isActive ? '0.25rem' : '50%',
                      background: isActive ? 'var(--color-offline)' : 'rgba(0,0,0,0.25)',
                    }}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section
        ref={desktopRef}
        className="gridglow-bg relative hidden w-full text-offline lg:block"
        style={{ height: reduced ? 'auto' : '320vh' }}
      >
        <motion.div
          className="relative sticky top-0 h-[100svh] overflow-hidden"
          style={reduced ? undefined : { y: shellY, willChange: 'transform' }}
        >
          <div className="mx-auto grid h-full w-full max-w-[1400px] grid-cols-12 items-center gap-10 px-10 py-20">
            <motion.div
              className="col-span-5"
              variants={columnEntrance}
              initial={reduced ? false : 'hidden'}
              whileInView={reduced ? {} : 'visible'}
              viewport={{ once: true, margin: '-100px' }}
              custom={0}
            >
              <motion.p
                className="text-xs font-semibold uppercase tracking-[0.22em] text-offline/60"
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={reduced ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, ease: entranceEase, delay: 0.1 }}
              >
                Real brands. Real results.
              </motion.p>

              <motion.h2
                className="mt-4 font-heading text-h1 font-black text-offline"
                initial={reduced ? false : { opacity: 0, y: 40 }}
                whileInView={reduced ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, ease: entranceEase, delay: 0.2 }}
              >
                Proof you can feel.
              </motion.h2>

              <motion.ul
                className="mt-10 flex flex-col gap-4"
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={reduced ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, ease: entranceEase, delay: 0.35 }}
              >
                {caseStudies.map((c, i) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      className={
                        'text-left font-heading text-h2 font-extrabold tr-ease ' +
                        (i === activeIndex ? 'opacity-100 text-offline' : 'opacity-30 text-offline hover:opacity-70')
                      }
                      style={{ '--duration': '260ms' }}
                    >
                      {c.brand}
                    </button>
                  </li>
                ))}
              </motion.ul>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeCase.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="mt-10"
                >
                  <p className="font-heading text-h2 font-black text-hottake">{activeCase.metric}</p>
                  <p className="mt-4 max-w-lg text-xl-fluid text-offline/85">&ldquo;{activeCase.quote}&rdquo;</p>
                  <p className="mt-3 text-sm text-offline/60">{activeCase.author}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {activeTopics.map((topic) => (
                      <span key={topic} className="rounded-full border border-offline/20 bg-offline/[0.04] px-3 py-1 text-xs font-medium text-offline/75">
                        {topic}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.div
              className="col-span-7"
              variants={columnEntrance}
              initial={reduced ? false : 'hidden'}
              whileInView={reduced ? {} : 'visible'}
              viewport={{ once: true, margin: '-100px' }}
              custom={0.25}
            >
              <motion.div
                className="relative mx-auto flex aspect-[10/7] w-full max-w-[760px] items-center justify-center"
                style={reduced ? undefined : { rotate: stackRotate }}
              >
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeCase.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="relative flex h-full w-full items-center justify-center"
                    style={{ perspective: 1400 }}
                  >
                    {stackLayout.map((pos, i) => {
                      const pool = getReelPool(activeCase.style)
                      // Rotate which pool item occupies which slot per active case,
                      // so each section brings a different reel to the front.
                      const videoSrc = pool[(i + activeIndex) % pool.length]
                      const xMotion = i === 0 ? stackXLeft : i === 2 ? stackXRight : stackXCenter
                      const label = getReelLabel(activeCase.style, pos.featured)
                      return (
                        <motion.div
                          key={`${activeCase.id}-stack-${i}`}
                          className="absolute"
                          initial={reduced ? false : { opacity: 0, y: 80, rotate: pos.rotate * 1.4, scale: pos.scale * 0.85 }}
                          animate={reduced ? {} : { opacity: 1, y: pos.y, rotate: pos.rotate, scale: pos.scale }}
                          transition={{ duration: 0.9, ease: entranceEase, delay: 0.15 + i * 0.14 }}
                          style={reduced ? undefined : { zIndex: pos.z, x: xMotion }}
                        >
                          <div
                            className={
                              'relative aspect-[9/16] w-[210px] overflow-hidden rounded-[28px] border-[6px] border-white bg-black shadow-[0_30px_70px_rgba(0,0,0,0.25)] ' +
                              (pos.featured ? 'ring-1 ring-offline/5' : '')
                            }
                          >
                            <video
                              className="h-full w-full object-cover"
                              src={videoSrc}
                              poster={activeCase.image}
                              muted
                              autoPlay
                              loop
                              playsInline
                            />

                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

                            {pos.featured && (
                              <span className="absolute left-3 top-3 rounded-lg bg-black/65 px-2.5 py-1 text-[11px] font-semibold text-gridglow backdrop-blur-sm">
                                01:48
                              </span>
                            )}

                            <span className="absolute right-3 top-3 rounded-full bg-gridglow/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-offline">
                              {label}
                            </span>

                            <div className="absolute inset-x-3 bottom-3 flex items-center gap-2">
                              <span className="h-1 flex-1 rounded-full bg-white/30">
                                <span
                                  className="block h-full rounded-full bg-white"
                                  style={{ width: pos.featured ? '62%' : '40%' }}
                                />
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}

                    <div className="pointer-events-none absolute bottom-0 left-1/2 h-6 w-[70%] -translate-x-1/2 rounded-full bg-offline/10 blur-2xl" />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  )
}

export default CaseStudiesSection
