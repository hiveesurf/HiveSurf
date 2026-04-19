import { useRef } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { FiArrowRight, FiZap } from 'react-icons/fi'
import { badgeTicker } from '../../data/hivesurfHome'
import useReducedMotion from '../../hooks/useReducedMotion'
import { entranceEase, inViewConfig } from '../../lib/motionConfig'
import { hiveContactHref, hiveWhatsAppHref } from '../../lib/leadActions'
import { gsap } from '../../lib/gsapSetup'

const BadgeTicker = () => {
  const reduced = useReducedMotion()
  const innerRef = useRef(null)
  const items = [...badgeTicker, ...badgeTicker]

  useGSAP(
    () => {
      if (reduced || !innerRef.current) return
      const tween = gsap.to(innerRef.current, {
        xPercent: -50,
        duration: 20,
        ease: 'none',
        repeat: -1,
      })
      return () => tween.kill()
    },
    { dependencies: [reduced] },
  )

  return (
    <section className="gridglow-bg relative w-full overflow-hidden text-offline">
      <div
        className="relative z-10 overflow-hidden border-y border-offline/10 bg-offline py-5"
      >
        <div
          ref={innerRef}
          className="flex w-max items-center gap-14 whitespace-nowrap pl-14 will-change-transform"
        >
          {items.map((item, i) => (
            <div key={`${item}-${i}`} className="flex items-center gap-4 text-gridglow">
              <FiZap className="text-hottake" />
              <span className="font-heading text-lg font-extrabold uppercase tracking-[0.18em]">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 py-28 lg:px-10 lg:py-36">
        <motion.p
          className="text-xs font-semibold uppercase tracking-[0.22em] text-offline/55"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={reduced ? {} : { opacity: 1, y: 0 }}
          viewport={inViewConfig}
          transition={{ duration: 0.5, ease: entranceEase }}
        >
          Let&apos;s make it happen
        </motion.p>

        <motion.h2
          className="mt-4 max-w-3xl font-heading text-h1l font-black text-offline"
          initial={reduced ? false : { opacity: 0, y: 80 }}
          whileInView={reduced ? {} : { opacity: 1, y: 0 }}
          viewport={inViewConfig}
          transition={{ duration: 0.8, ease: entranceEase, delay: 0.1 }}
        >
          Ready to Surf the Digital Wave?
        </motion.h2>

        <motion.p
          className="mt-5 max-w-2xl text-lg text-offline/75 lg:text-xl"
          initial={reduced ? false : { opacity: 0, y: 36 }}
          whileInView={reduced ? {} : { opacity: 1, y: 0 }}
          viewport={inViewConfig}
          transition={{ duration: 0.6, ease: entranceEase, delay: 0.2 }}
        >
          Get started today and transform your business with our innovative digital marketing strategies.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
          initial={reduced ? false : { opacity: 0, y: 40 }}
          whileInView={reduced ? {} : { opacity: 1, y: 0 }}
          viewport={inViewConfig}
          transition={{ duration: 0.6, ease: entranceEase, delay: 0.3 }}
        >
          <a
            href={hiveWhatsAppHref('badgeTrial')}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-hottake px-8 py-4 text-base font-semibold text-gridglow hs-clip-cta tr-ease hover:brightness-110"
            style={{ '--duration': '250ms' }}
          >
            Start your free trial
            <FiArrowRight className="tr-ease group-hover:translate-x-1" style={{ '--duration': '300ms' }} />
          </a>
          <a
            href={hiveWhatsAppHref('badgeSales')}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-offline/30 bg-transparent px-8 py-4 text-base font-semibold text-offline tr-ease hover:bg-offline hover:text-gridglow"
            style={{ '--duration': '250ms' }}
          >
            Talk to sales
          </a>
          <a
            href={hiveContactHref({ intent: 'meeting', source: 'badge-ready-to-surf' })}
            className="rounded-full border border-offline/30 bg-transparent px-8 py-4 text-base font-semibold text-offline tr-ease hover:bg-offline hover:text-gridglow"
            style={{ '--duration': '250ms' }}
          >
            Set up meeting
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default BadgeTicker
