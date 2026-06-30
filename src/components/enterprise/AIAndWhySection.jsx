// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { aiSolutions } from '../../data/enterpriseHome'
import useReducedMotion from '../../hooks/useReducedMotion'
import SectionReveal from './SectionReveal'

const gridContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
}

const gridItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

const AISolutionsSection = () => {
  const reduced = useReducedMotion()

  return (
    <section id="ai-solutions" className="ent-section-light scroll-mt-24 py-20 lg:py-28">
      <div className="ent-container">
        <SectionReveal>
          <p className="ent-kicker">AI Solutions</p>
          <h2 className="ent-heading-lg mt-4">Intelligence engineered for production</h2>
        </SectionReveal>

        <motion.div
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          variants={reduced ? undefined : gridContainer}
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
        >
          {aiSolutions.map((item) => (
            <motion.article
              key={item.title}
              variants={reduced ? undefined : gridItem}
              whileHover={reduced ? undefined : { y: -4, transition: { duration: 0.25 } }}
              className="group relative overflow-hidden rounded-[28px] border border-black/[0.06] bg-white px-8 py-9 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[box-shadow,border-color] duration-300 hover:border-[var(--ent-primary)]/20 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
            >
              <div
                className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[var(--ent-primary)]/0 transition-[background-color,transform] duration-500 group-hover:scale-110 group-hover:bg-[var(--ent-primary)]/[0.06]"
                aria-hidden
              />
              <h3 className="ent-display relative text-lg font-bold tracking-tight text-[var(--ent-text-heading)] lg:text-xl">
                {item.title}
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-[#555] lg:text-[15px]">
                {item.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export { AISolutionsSection }
