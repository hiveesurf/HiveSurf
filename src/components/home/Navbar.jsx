import { useEffect, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import useReducedMotion from '../../hooks/useReducedMotion'
import { entranceEase } from '../../lib/motionConfig'

const sectionLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Features', href: '#features' },
  { label: 'Impact', href: '#impact' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Get Started', href: '#get-started' },
]

const Navbar = () => {
  const reduced = useReducedMotion()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      data-scrolled={scrolled ? 'true' : 'false'}
      className="fixed inset-x-0 top-0 z-[60] h-[80px] border-b border-transparent backdrop-blur-[30px] data-[scrolled=true]:border-offline-30/50"
      style={{ background: 'hsla(20, 60%, 99%, 0.25)' }}
      initial={reduced ? false : { y: -80, opacity: 0 }}
      animate={reduced ? {} : { y: 0, opacity: 1 }}
      transition={reduced ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}
    >
      <div
        className="mx-auto grid h-full w-full max-w-[1400px] items-center px-5 lg:px-10"
        style={{ gridTemplateColumns: '1fr auto 1fr' }}
      >
        <a href="/" className="flex items-center gap-2.5 text-offline">
          <img src="/logo.svg" alt="HiveSurf" className="h-9 w-9" />
          <span className="font-heading text-[24px] font-extrabold tracking-tight">HiveSurf</span>
        </a>

        <nav className="hidden lg:block">
          <ul
            className="flex items-center gap-1 rounded-[var(--radius-l)] border border-offline/10 px-3 py-2.5"
            style={{
              background: 'hsla(20, 60%, 99%, 0.55)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              boxShadow: '0 0 24px rgba(0,0,0,0.08)',
            }}
          >
            {sectionLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="group rounded-md px-4 py-2.5 text-[15px] font-medium text-offline tr-ease hover:bg-offline/[0.06] hover:text-hottake"
                  style={{ '--duration': '250ms' }}
                >
                  <span className="relative">
                    {item.label}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 -bottom-1 h-[2px] bg-hottake scale-x-0 origin-left tr-ease group-hover:scale-x-100"
                      style={{ '--duration': '300ms' }}
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-3 lg:gap-5">
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-l)] border border-offline/20 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="overflow-hidden border-t border-offline/10 bg-gridglow lg:hidden"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={reduced ? {} : { height: 'auto', opacity: 1 }}
            exit={reduced ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: entranceEase }}
          >
            <div className="space-y-2 px-5 py-5">
              {sectionLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-[var(--radius-l)] border border-offline/10 bg-white/70 px-4 py-3 text-sm font-semibold text-offline tr-ease hover:bg-offline/[0.04] hover:text-hottake"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
