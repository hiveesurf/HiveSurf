import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion'
import { FiPlay, FiChevronDown } from 'react-icons/fi'
import { tabs } from '../../data/hivesurfHome'
import useReducedMotion from '../../hooks/useReducedMotion'
import { entranceEase } from '../../lib/motionConfig'

const TabsSection = () => {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(tabs[0].id)
  const [mobileOpen, setMobileOpen] = useState(tabs[0].id)

  const activeTab = tabs.find((t) => t.id === active) || tabs[0]

  return (
    <section className="purple-wood-bg relative w-full py-20 lg:min-h-[100vh] lg:py-28">
      <div className="mx-auto w-full max-w-[1400px] px-5 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-peachfuzz">Everything you need</p>
          <h2 className="mt-4 font-heading text-h1 font-black text-gridglow">
            One connected workflow,<br />
            zero tool-hopping.
          </h2>
        </div>

        <div className="mt-12 hidden lg:block">
          <div className="flex flex-wrap items-end gap-0">
            {tabs.map((t) => {
              const isActive = t.id === active
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActive(t.id)}
                  className={
                    'relative h-14 px-8 text-base font-semibold tr-ease ' +
                    (isActive
                      ? 'bg-gridglow text-offline hs-clip-tab-active'
                      : 'bg-transparent text-gridglow/80 hover:text-gridglow')
                  }
                  style={{ '--duration': '200ms' }}
                >
                  {t.label}
                </button>
              )
            })}
          </div>

          <div className="relative overflow-hidden rounded-b-[var(--radius-l)] rounded-tr-[var(--radius-l)] bg-gridglow p-8 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={reduced ? false : { opacity: 0, y: -20 }}
                animate={reduced ? {} : { opacity: 1, y: 0 }}
                exit={reduced ? {} : { opacity: 0, y: 20 }}
                transition={{ duration: 0.35, ease: entranceEase }}
                className="grid grid-cols-1 gap-10 lg:grid-cols-2"
              >
                <div>
                  <h3 className="font-heading text-h2 font-black text-offline">{activeTab.title}</h3>
                  <p className="mt-5 text-xl-fluid text-offline/70">{activeTab.copy}</p>

                  <ul className="mt-8 grid grid-cols-1 gap-2 text-base md:grid-cols-2">
                    {activeTab.features.map((f, i) => (
                      <motion.li
                        key={f}
                        initial={reduced ? false : { opacity: 0, y: 12 }}
                        animate={reduced ? {} : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: entranceEase, delay: 0.05 + i * 0.07 }}
                        className="flex items-center gap-2 rounded-2xl border border-offline/10 bg-white/70 px-4 py-3 font-medium text-offline"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-hottake" />
                        {f}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="group relative flex h-[385px] items-center justify-center overflow-hidden rounded-[var(--radius-l)] bg-white">
                  <img
                    src={activeTab.image}
                    alt={activeTab.title}
                    className="max-h-full w-auto object-contain tr-ease group-hover:scale-[1.03]"
                    style={{ '--duration': '400ms' }}
                  />
                  <button
                    type="button"
                    aria-label="Play"
                    className="absolute flex h-16 w-16 items-center justify-center rounded-full bg-hottake text-white opacity-0 tr-ease group-hover:opacity-100"
                    style={{ '--duration': '300ms' }}
                  >
                    <FiPlay />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-10 space-y-3 lg:hidden">
          {tabs.map((t) => {
            const isOpen = mobileOpen === t.id
            return (
              <div key={t.id} className="overflow-hidden rounded-[var(--radius-l)] border border-gridglow/15 bg-gridglow">
                <button
                  type="button"
                  onClick={() => setMobileOpen(isOpen ? null : t.id)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left text-base font-semibold text-offline"
                >
                  {t.label}
                  <FiChevronDown
                    className="tr-ease"
                    style={{ '--duration': '300ms', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={reduced ? {} : { height: 'auto', opacity: 1 }}
                      exit={reduced ? {} : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: entranceEase }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-4 px-5 pb-6">
                        <h3 className="font-heading text-xl font-extrabold">{t.title}</h3>
                        <p className="text-base text-offline/70">{t.copy}</p>
                        <div className="overflow-hidden rounded-xl bg-white">
                          <img src={t.image} alt="" className="w-full object-contain" />
                        </div>
                        <ul className="grid grid-cols-1 gap-2 text-sm">
                          {t.features.map((f) => (
                            <li key={f} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 font-medium">
                              <span className="h-1.5 w-1.5 rounded-full bg-hottake" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
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

export default TabsSection
