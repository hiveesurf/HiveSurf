import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SectionReveal from './SectionReveal'
import { faqs, extras } from '../../data/enterpriseHome'

const FAQSection = () => {
  const [open, setOpen] = useState(0)

  return (
    <section className="ent-section-light py-20 lg:py-28">
      <div className="ent-container">
        <SectionReveal>
          <p className="ent-kicker">FAQ</p>
          <h2 className="ent-heading-lg mt-4">Common questions</h2>
        </SectionReveal>
        <div className="mt-14 mx-auto max-w-3xl space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} className="overflow-hidden rounded-xl border border-[var(--ent-border)] bg-white">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-[var(--ent-text-heading)]">{item.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-[var(--ent-text-muted)] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="border-t border-[var(--ent-border)] px-6 py-5 text-sm leading-relaxed text-[var(--ent-text-muted)]">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const ExtrasSection = () => (
  <section id="culture" className="ent-section-dark scroll-mt-24 border-t border-[var(--ent-border)] py-20 lg:py-28">
    <div className="ent-container grid gap-12 lg:grid-cols-2">
      <SectionReveal>
        <p className="ent-kicker">Awards & Recognition</p>
        <ul className="mt-4 space-y-2">
          {extras.awards.map((a) => (
            <li key={a} className="text-sm text-[var(--ent-text-muted)]">
              {a}
            </li>
          ))}
        </ul>
      </SectionReveal>
      <SectionReveal delay={0.1}>
        <p className="ent-kicker">Engineering Culture</p>
        <ul className="mt-4 space-y-2">
          {extras.culture.map((c) => (
            <li key={c} className="text-sm text-[var(--ent-text-muted)]">
              {c}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-[var(--ent-text-muted)]">
          Innovation Lab · Technology Research · Open Source contributions
        </p>
      </SectionReveal>
    </div>
  </section>
)

export { FAQSection, ExtrasSection }
