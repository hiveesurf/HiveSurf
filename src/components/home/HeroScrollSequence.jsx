import { useRef } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from 'framer-motion'
import HeroSection from './HeroSection'
import IndustryLeaders from './IndustryLeaders'
import useReducedMotion from '../../hooks/useReducedMotion'

const HeroScrollSequence = () => {
  const reduced = useReducedMotion()
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.38, 0.58], [1, 1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.58], [1, 0.94])
  const heroY = useTransform(scrollYProgress, [0, 0.58], [0, -80])
  const heroPointer = useTransform(scrollYProgress, (v) => (v > 0.55 ? 'none' : 'auto'))

  const leadersOpacity = useTransform(scrollYProgress, [0.42, 0.6, 0.95, 1], [0, 1, 1, 1])
  const leadersY = useTransform(scrollYProgress, [0.42, 0.62], [80, 0])
  const leadersScale = useTransform(scrollYProgress, [0.42, 0.62], [0.96, 1])
  const leadersPointer = useTransform(scrollYProgress, (v) => (v > 0.45 ? 'auto' : 'none'))

  if (reduced) {
    return (
      <>
        <HeroSection />
        <section className="gridglow-bg relative w-full">
          <IndustryLeaders />
        </section>
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
