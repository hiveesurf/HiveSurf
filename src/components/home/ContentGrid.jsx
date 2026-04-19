// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { contentGridCards } from '../../data/hivesurfHome'
import useReducedMotion from '../../hooks/useReducedMotion'
import { entranceEase, inViewConfig } from '../../lib/motionConfig'

const ContentGrid = () => {
  const reduced = useReducedMotion()

  return (
    <section className="gridglow-bg relative w-full py-24 lg:min-h-[100vh] lg:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 lg:px-10">
        <motion.div
          className="flex flex-wrap items-end justify-between gap-6"
          initial={reduced ? false : { opacity: 0, y: 50 }}
          whileInView={reduced ? {} : { opacity: 1, y: 0 }}
          viewport={inViewConfig}
          transition={{ duration: 0.7, ease: entranceEase }}
        >
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-offline/60">From the HiveSurf desk</p>
            <h2 className="mt-4 font-heading text-h1 font-black">
              Fresh thinking for <span className="chromeflow-text">modern marketers</span>.
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-base font-semibold text-offline underline underline-offset-4 decoration-offline/30 tr-ease hover:decoration-hottake hover:text-hottake"
            style={{ '--duration': '250ms' }}
          >
            View all resources <FiArrowUpRight />
          </a>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contentGridCards.map((card, i) => (
            <motion.a
              key={card.title}
              href="#"
              className="group relative block overflow-hidden rounded-[var(--radius-l)] p-6 purple-wood-bg"
              style={{ minHeight: 380 }}
              initial={reduced ? false : { opacity: 0, y: 50 }}
              whileInView={reduced ? {} : { opacity: 1, y: 0 }}
              viewport={inViewConfig}
              transition={{ duration: 0.6, ease: entranceEase, delay: (i % 3) * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-gridglow backdrop-blur-sm">
                  {card.tag}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-gridglow tr-ease group-hover:bg-gridglow group-hover:text-offline">
                  <FiArrowUpRight />
                </span>
              </div>

              <div className="relative mt-10 overflow-hidden rounded-xl" style={{ minHeight: 205 }}>
                <div className="hs-clip-hex relative h-[205px] w-full overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover tr-ease group-hover:scale-[1.05]"
                    style={{ '--duration': '400ms' }}
                  />
                </div>
              </div>

              <h3
                className="mt-6 font-heading text-2xl font-extrabold text-gridglow underline decoration-transparent underline-offset-4 tr-ease group-hover:decoration-current"
                style={{ '--duration': '300ms' }}
              >
                {card.title}
              </h3>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ContentGrid
