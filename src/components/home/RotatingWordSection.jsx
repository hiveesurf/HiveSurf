// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { rotatingWords } from '../../data/hivesurfHome'
import useReducedMotion from '../../hooks/useReducedMotion'
import { entranceEase, inViewConfig } from '../../lib/motionConfig'
import RotatingWordGlyphs from './RotatingWordGlyphs'

const RotatingWordSection = () => {
  const reduced = useReducedMotion()

  return (
    <section className="gridglow-bg relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden py-24">
      <RotatingWordGlyphs />
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 text-center lg:px-10">
        <motion.p
          className="text-xs font-semibold uppercase tracking-[0.22em] text-offline/60"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={reduced ? {} : { opacity: 1, y: 0 }}
          viewport={inViewConfig}
          transition={{ duration: 0.5, ease: entranceEase }}
        >
          One platform. Every motion.
        </motion.p>

        <motion.h2
          className="mt-6 font-heading text-[clamp(3.125rem,8vw+1rem,6rem)] font-extrabold leading-[1.05] tracking-[-0.02em]"
          initial={reduced ? false : { opacity: 0, y: 40 }}
          whileInView={reduced ? {} : { opacity: 1, y: 0 }}
          viewport={inViewConfig}
          transition={{ duration: 0.7, ease: entranceEase }}
        >
          Run your next{' '}
          <span
            className="inline-block align-baseline overflow-hidden"
            style={{ height: '1.15em', verticalAlign: 'bottom' }}
          >
            <motion.span
              className="flex flex-col chromeflow-text"
              style={{ willChange: 'transform' }}
              animate={
                reduced
                  ? { y: '0%' }
                  : { y: ['0%', '-33.333%', '-66.666%', '-33.333%', '0%'] }
              }
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 6, repeat: Infinity, ease: 'easeInOut', times: [0, 0.3, 0.6, 0.8, 1] }
              }
            >
              {rotatingWords.map((w) => (
                <span
                  key={w}
                  className="block"
                  style={{ height: '1.15em', lineHeight: '1.15em' }}
                >
                  {w}
                </span>
              ))}
            </motion.span>
          </span>
          <br />
          with HiveSurf.
        </motion.h2>

        <motion.p
          className="mx-auto mt-8 max-w-2xl text-2xl-fluid text-offline/70"
          initial={reduced ? false : { opacity: 0, y: 30 }}
          whileInView={reduced ? {} : { opacity: 1, y: 0 }}
          viewport={inViewConfig}
          transition={{ duration: 0.6, ease: entranceEase, delay: 0.2 }}
        >
          From the first brief to the final report, HiveSurf is the end-to-end operating system for modern creator marketing.
        </motion.p>
      </div>
    </section>
  )
}

export default RotatingWordSection
