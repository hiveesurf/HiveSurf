import { useEffect, useRef, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from 'framer-motion'
import HeroSection from './HeroSection'
import IndustryLeaders from './IndustryLeaders'
import useReducedMotion from '../../hooks/useReducedMotion'

const leadersSection = (
  <section className="gridglow-bg relative w-full">
    <IndustryLeaders />
  </section>
)

const HeroScrollSequence = () => {
  const reduced = useReducedMotion()
  const containerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(max-width: 1023px)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(max-width: 1023px)')
    const sync = () => setIsMobile(mq.matches)
    sync()
    mq.addEventListener?.('change', sync)
    return () => mq.removeEventListener?.('change', sync)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Desktop only: crossfade hero → industry leaders while pinned
  const heroOpacity = useTransform(scrollYProgress, [0, 0.48, 0.72], [1, 1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.72], [1, 0.96])
  const heroY = useTransform(scrollYProgress, [0, 0.72], [0, -48])
  const heroPointer = useTransform(scrollYProgress, (v) => (v > 0.68 ? 'none' : 'auto'))

  const leadersOpacity = useTransform(scrollYProgress, [0.5, 0.68, 0.95, 1], [0, 1, 1, 1])
  const leadersY = useTransform(scrollYProgress, [0.5, 0.72], [60, 0])
  const leadersScale = useTransform(scrollYProgress, [0.5, 0.72], [0.97, 1])
  const leadersPointer = useTransform(scrollYProgress, (v) => (v > 0.52 ? 'auto' : 'none'))

  if (reduced || isMobile) {
    return (
      <>
        <HeroSection />
        {leadersSection}
      </>
    )
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ height: '220vh' }}
      aria-label="Hero sequence"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: heroOpacity,
            scale: heroScale,
            y: heroY,
            pointerEvents: heroPointer,
            willChange: 'transform, opacity',
          }}
        >
          <HeroSection />
        </motion.div>

        <motion.div
          className="gridglow-bg absolute inset-0 flex items-center justify-center"
          style={{
            opacity: leadersOpacity,
            y: leadersY,
            scale: leadersScale,
            pointerEvents: leadersPointer,
            willChange: 'transform, opacity',
          }}
        >
          <IndustryLeaders />
        </motion.div>
      </div>
    </section>
  )
}

export default HeroScrollSequence
