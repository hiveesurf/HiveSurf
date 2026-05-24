import { useEffect, useRef, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import useReducedMotion from '../../hooks/useReducedMotion'
import { entranceEase, springSoft } from '../../lib/motionConfig'
import HiveContactLink from '../HiveContactLink'
import { hiveWhatsAppHref } from '../../lib/leadActions'

const headingLines = ['Unforgettable', 'campaigns start', 'with HiveSurf.']
const HERO_FLIP_INTERVAL_MS = 5000
const heroFlipImages = [
  {
    src: '/hero-flip-newyear.webp',
    alt: 'New Year celebration crowd scene',
  },
  {
    src: '/hero-flip-bengal.jpg',
    alt: 'Bengal campaign performance moment',
  },
]
const heroCardShapes = [
  '20% 80% 22% 78% / 28% 22% 78% 72%',
  '74% 26% 66% 34% / 30% 70% 30% 70%',
  '16% 84% 30% 70% / 72% 30% 70% 28%',
  '60% 40% 22% 78% / 24% 72% 28% 76%',
]

const HeroSection = () => {
  const reduced = useReducedMotion()
  const sectionRef = useRef(null)
  const [isLg, setIsLg] = useState(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [activeShapeIndex, setActiveShapeIndex] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(min-width: 1024px)')
    const sync = () => setIsLg(mq.matches)
    sync()
    mq.addEventListener?.('change', sync)
    return () => mq.removeEventListener?.('change', sync)
  }, [])

  useEffect(() => {
    if (reduced) return

    const timer = window.setInterval(() => {
      setActiveImageIndex((current) => (current + 1) % heroFlipImages.length)
      setActiveShapeIndex((current) => (current + 1) % heroCardShapes.length)
    }, HERO_FLIP_INTERVAL_MS)

    return () => window.clearInterval(timer)
  }, [reduced])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-60, 90])

  const lineParent = {
    animate: {
      transition: {
        staggerChildren: reduced ? 0 : 0.08,
        delayChildren: reduced ? 0 : 0.05,
      },
    },
  }

  const lineChild = {
    initial: reduced ? {} : { opacity: 0, y: 40 },
    animate: reduced ? {} : { opacity: 1, y: 0, transition: { duration: 0.6, ease: entranceEase } },
  }

  const ctaParent = {
    animate: {
      transition: {
        staggerChildren: reduced ? 0 : 0.12,
        delayChildren: reduced ? 0 : 0.65,
      },
    },
  }

  const ctaChild = {
    initial: reduced ? {} : { opacity: 0, y: 30 },
    animate: reduced ? {} : { opacity: 1, y: 0, transition: { duration: 0.5, ease: entranceEase } },
  }

  return (
    <section
      ref={sectionRef}
      className="gridglow-bg relative min-h-[100svh] w-full overflow-visible pt-[96px] pb-16 max-lg:pb-20 sm:pt-[104px] lg:overflow-hidden lg:pt-[140px] lg:pb-28"
    >
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-8 px-5 sm:gap-10 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <div className="lg:col-span-7">
          <motion.h1
            data-hero-heading
            className="mt-2 font-heading font-black text-h1xl text-offline lg:mt-0"
            style={{ willChange: 'transform' }}
            variants={lineParent}
            initial="initial"
            animate="animate"
          >
            {headingLines.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span className="line block" variants={lineChild}>
                  {i === 2 ? (
                    <>
                      with <span className="chromeflow-text">HiveSurf.</span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            className="mt-8 max-w-xl text-2xl-fluid text-offline/70"
            initial={reduced ? false : { opacity: 0, y: 30 }}
            animate={reduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: entranceEase, delay: 0.45 }}
          >
            Influencer marketing built for creators, trusted by brands, and designed for results.
          </motion.p>

          <motion.div className="mt-10 flex flex-wrap items-center gap-4" variants={ctaParent} initial="initial" animate="animate">
            <motion.a
              href={hiveWhatsAppHref('heroCampaign')}
              target="_blank"
              rel="noopener noreferrer"
              variants={ctaChild}
              whileHover={reduced ? {} : { scale: 1.03 }}
              transition={springSoft}
              className="group relative inline-flex items-center gap-2 overflow-hidden bg-hottake px-8 py-4 text-base font-semibold text-gridglow hs-clip-cta"
            >
              Start your campaign
              <FiArrowRight className="tr-ease group-hover:translate-x-1" style={{ '--duration': '300ms' }} />
            </motion.a>
            <motion.div variants={ctaChild} whileHover={reduced ? {} : { scale: 1.03 }} transition={springSoft}>
              <HiveContactLink
                intent="meeting"
                source="hero-start-campaign"
                className="group relative inline-flex items-center gap-2 overflow-hidden border-2 border-offline bg-gridglow px-8 py-4 text-base font-semibold text-offline hs-clip-cta"
              >
                Set up meeting
                <FiArrowRight className="tr-ease group-hover:translate-x-1" style={{ '--duration': '300ms' }} />
              </HiveContactLink>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          data-scale-item
          className={
            'relative w-full max-lg:mx-auto max-lg:min-h-[280px] max-lg:max-w-[min(100%,420px)] ' +
            'max-lg:aspect-[3/4] max-lg:max-h-none lg:col-span-5 lg:aspect-auto lg:h-[620px] lg:max-h-none'
          }
          initial={reduced ? false : { opacity: 0, scale: 0.96, rotate: -1 }}
          animate={reduced ? {} : { opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: entranceEase, delay: 0.25 }}
          whileHover={reduced || isLg !== true ? {} : { scale: 1.02 }}
          style={{ willChange: 'transform' }}
        >
          <motion.div
            className="relative h-full w-full overflow-hidden hs-clip-hero-image"
            animate={reduced ? undefined : { borderRadius: heroCardShapes[activeShapeIndex] }}
            transition={reduced ? undefined : { duration: 0.8, ease: entranceEase }}
            style={reduced || isLg !== true ? undefined : { y: parallaxY }}
          >
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, #5124c1, #fe3f00)' }}
              aria-hidden
            />
            <AnimatePresence mode="wait">
              <motion.img
                key={heroFlipImages[activeImageIndex].src}
                src={heroFlipImages[activeImageIndex].src}
                alt={heroFlipImages[activeImageIndex].alt}
                className="absolute inset-0 h-full w-full object-cover object-center"
                initial={
                  reduced || isLg !== true
                    ? { opacity: 0, scale: 0.98 }
                    : { opacity: 0, rotateY: -95, scale: 0.96 }
                }
                animate={
                  reduced || isLg !== true
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 1, rotateY: 0, scale: 1 }
                }
                exit={
                  reduced || isLg !== true
                    ? { opacity: 0, scale: 0.98 }
                    : { opacity: 0, rotateY: 95, scale: 0.96 }
                }
                transition={reduced ? { duration: 0.2 } : { duration: 0.65, ease: entranceEase }}
                style={
                  isLg === true
                    ? { transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }
                    : undefined
                }
              />
            </AnimatePresence>
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
              aria-hidden
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
