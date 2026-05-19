// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import useReducedMotion from '../../hooks/useReducedMotion'
import { entranceEase, inViewConfig } from '../../lib/motionConfig'
import HiveContactLink from '../HiveContactLink'
import { hiveWhatsAppHref } from '../../lib/leadActions'

const VideoCtaSection = () => {
  const reduced = useReducedMotion()

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-offline">
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(120deg, #5124c1 0%, #000 40%, #fe3f00 100%), url(/image.png)',
          backgroundBlendMode: 'overlay',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        animate={reduced ? {} : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={reduced ? { duration: 0 } : { duration: 24, repeat: Infinity, ease: 'linear' }}
        aria-hidden
      />

      <div
        data-clip-path
        className="absolute inset-0 hs-clip-video-desk hidden lg:block"
        style={{
          background: 'linear-gradient(180deg, #FE3F00 0%, #CB8AFF 100%)',
          opacity: 0.9,
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 hs-clip-video-mob lg:hidden"
        style={{
          background: 'linear-gradient(180deg, #FE3F00 0%, #CB8AFF 100%)',
          opacity: 0.9,
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1400px] items-center px-5 py-24 lg:px-10">
        <div className="max-w-3xl">
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80"
            initial={reduced ? false : { opacity: 0 }}
            whileInView={reduced ? {} : { opacity: 1 }}
            viewport={inViewConfig}
            transition={{ duration: 0.6, ease: entranceEase }}
            data-heading
          >
            Get started in minutes
          </motion.p>
          <motion.h2
            className="mt-4 font-heading text-h1xl font-black text-white"
            initial={reduced ? false : { opacity: 0 }}
            whileInView={reduced ? {} : { opacity: 1 }}
            viewport={inViewConfig}
            transition={{ duration: 0.8, ease: entranceEase, delay: 0.1 }}
            data-content
          >
            Your next big campaign starts today.
          </motion.h2>
          <motion.p
            className="mt-6 max-w-xl text-xl-fluid text-white/85"
            initial={reduced ? false : { opacity: 0 }}
            whileInView={reduced ? {} : { opacity: 1 }}
            viewport={inViewConfig}
            transition={{ duration: 0.8, ease: entranceEase, delay: 0.2 }}
          >
            Spin up your workspace, invite your team, and ship your first creator campaign this week.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={reduced ? {} : { opacity: 1, y: 0 }}
            viewport={inViewConfig}
            transition={{ duration: 0.6, ease: entranceEase, delay: 0.3 }}
          >
            <a
              href={hiveWhatsAppHref('videoStartFree')}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-white px-8 py-4 text-base font-semibold text-offline hs-clip-cta tr-ease hover:bg-neutral-100"
            >
              Start free <FiArrowRight className="tr-ease group-hover:translate-x-1" style={{ '--duration': '300ms' }} />
            </a>
            <HiveContactLink
              intent="demo"
              source="video-next-campaign"
              className="rounded-full border border-white/40 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm tr-ease hover:bg-white/20"
              style={{ '--duration': '250ms' }}
            >
              Book a demo
            </HiveContactLink>
            <HiveContactLink
              intent="meeting"
              source="video-next-campaign"
              className="rounded-full border border-white/40 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm tr-ease hover:bg-white/20"
              style={{ '--duration': '250ms' }}
            >
              Set up meeting
            </HiveContactLink>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default VideoCtaSection
