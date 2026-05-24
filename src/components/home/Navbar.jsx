import { useEffect, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import useReducedMotion from '../../hooks/useReducedMotion'
import { entranceEase } from '../../lib/motionConfig'
import HiveLogo from '../HiveLogo'

const sectionLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Features', href: '#features' },
  { label: 'Impact', href: '#impact' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Get Started', href: '#get-started' },
]

const navPillStyle = {
  background: 'hsla(20, 60%, 99%, 0.55)',
  backdropFilter: 'blur(30px)',
  WebkitBackdropFilter: 'blur(30px)',
  boxShadow: '0 0 24px rgba(0,0,0,0.08)',
}

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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <motion.header
      data-scrolled={scrolled ? 'true' : 'false'}
      className="fixed inset-x-0 top-0 z-[60] border-b border-transparent backdrop-blur-[30px] data-[scrolled=true]:border-offline-30/50"
      style={{ background: 'hsla(20, 60%, 99%, 0.25)' }}
      initial={reduced ? false : { y: -80, opacity: 0 }}
      animate={reduced ? {} : { y: 0, opacity: 1 }}
      transition={reduced ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}
    >
      <motion.div className="relative mx-auto flex h-[72px] w-full max-w-[1400px] items-center px-4 sm:h-[80px] sm:px-5 lg:px-10">
        {/* Logo — left, vertically centered with nav / menu */}
        <a href="/" className="relative z-[2] flex h-full shrink-0 items-center">
          <HiveLogo
            variant="light"
            className="block h-8 w-auto max-w-[min(42vw,128px)] object-contain object-left sm:h-9 sm:max-w-[min(44vw,152px)] lg:h-10 lg:max-w-[190px]"
          />
        </a>

        {/* Desktop nav — true center of header bar */}
        <nav className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
          <ul
            className="pointer-events-auto flex items-center gap-0.5 rounded-[var(--radius-l)] border border-offline/10 px-2 py-1.5 xl:gap-1 xl:px-3 xl:py-2"
            style={navPillStyle}
          >
            {sectionLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="group rounded-md px-3 py-2 text-[14px] font-medium text-offline tr-ease hover:bg-offline/[0.06] hover:text-hottake xl:px-4 xl:py-2.5 xl:text-[15px]"
                  style={{ '--duration': '250ms' }}
                >
                  <span className="relative whitespace-nowrap">
                    {item.label}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 -bottom-1 h-[2px] origin-left scale-x-0 bg-hottake tr-ease group-hover:scale-x-100"
                      style={{ '--duration': '300ms' }}
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right slot — balances logo width on desktop; menu button on mobile */}
        <div className="relative z-[2] ml-auto flex h-full shrink-0 items-center justify-end lg:min-w-[190px]">
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-l)] border border-offline/20 text-offline sm:h-11 sm:w-11 lg:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              className="fixed inset-0 z-[55] bg-offline/20 lg:hidden"
              initial={reduced ? false : { opacity: 0 }}
              animate={reduced ? {} : { opacity: 1 }}
              exit={reduced ? {} : { opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="relative z-[61] overflow-hidden border-t border-offline/10 bg-gridglow lg:hidden"
              initial={reduced ? false : { height: 0, opacity: 0 }}
              animate={reduced ? {} : { height: 'auto', opacity: 1 }}
              exit={reduced ? {} : { height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: entranceEase }}
            >
              <nav className="max-h-[min(70svh,520px)] overflow-y-auto px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-5">
                <ul className="space-y-2">
                  {sectionLinks.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex min-h-[48px] items-center rounded-[var(--radius-l)] border border-offline/10 bg-white/80 px-4 text-[15px] font-semibold text-offline tr-ease hover:bg-offline/[0.04] hover:text-hottake active:bg-offline/[0.06]"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
