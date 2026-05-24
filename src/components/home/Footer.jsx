import { useState } from 'react'
import { Link } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'
import { footerColumns } from '../../data/hivesurfHome'
import useReducedMotion from '../../hooks/useReducedMotion'
import { entranceEase, inViewConfig } from '../../lib/motionConfig'
import HiveLogo from '../HiveLogo'

const linkProps = (href) =>
  href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}

const isInternalHref = (href) => href.startsWith('/') && !href.startsWith('//')

const FooterLink = ({ href, className, children, style }) =>
  isInternalHref(href) ? (
    <Link to={href} className={className} style={style}>
      {children}
    </Link>
  ) : (
    <a href={href} {...linkProps(href)} className={className} style={style}>
      {children}
    </a>
  )

const Footer = () => {
  const reduced = useReducedMotion()
  const [openColumn, setOpenColumn] = useState(null)

  return (
    <footer className="relative w-full overflow-hidden bg-offline text-gridglow">
      <div className="mx-auto w-full max-w-[1400px] px-5 pt-20 pb-10 lg:px-10 lg:pt-28">
        <motion.div
          className="grid grid-cols-1 gap-10 lg:grid-cols-12"
          initial={reduced ? false : { opacity: 0, y: 30 }}
          whileInView={reduced ? {} : { opacity: 1, y: 0 }}
          viewport={inViewConfig}
          transition={{ duration: 0.6, ease: entranceEase }}
        >
          <div className="lg:col-span-5">
            <div className="flex items-center">
              <HiveLogo variant="dark" className="h-12 w-auto max-w-[240px] object-contain object-left" />
            </div>
            <p className="mt-6 max-w-md text-base text-gridglow/70">
              The creator marketing OS — plan, match, schedule, analyze. All in one place.
            </p>
          </div>

          <div className="hidden grid-cols-2 gap-10 sm:gap-12 lg:col-span-7 lg:grid">
            {footerColumns.map((col) => (
              <div key={col.heading}>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gridglow/60">{col.heading}</p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink
                        href={link.href}
                        className="text-sm text-gridglow/80 tr-ease hover:text-hottake"
                        style={{ '--duration': '250ms' }}
                      >
                        {link.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="space-y-3 lg:hidden">
            {footerColumns.map((col) => {
              const isOpen = openColumn === col.heading
              return (
                <div key={col.heading} className="overflow-hidden border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setOpenColumn(isOpen ? null : col.heading)}
                    className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold uppercase tracking-[0.18em] text-gridglow"
                  >
                    {col.heading}
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
                        transition={{ duration: 0.35, ease: entranceEase }}
                        className="overflow-hidden"
                      >
                        <ul className="space-y-3 pb-4">
                          {col.links.map((link) => (
                            <li key={link.label}>
                              <FooterLink href={link.href} className="text-sm text-gridglow/80">
                                {link.label}
                              </FooterLink>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </motion.div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="text-xs text-gridglow/50">&copy; {new Date().getFullYear()} HiveSurf. All rights reserved.</p>
        </div>
      </div>

      <div className="relative overflow-hidden pb-6">
        <svg viewBox="0 0 1400 220" className="mx-auto block w-full" preserveAspectRatio="xMidYMid meet">
          <text
            x="50%"
            y="75%"
            textAnchor="middle"
            fontFamily="Inter Tight, Helvetica Neue, Arial, sans-serif"
            fontWeight="900"
            fontSize="260"
            letterSpacing="-8"
            fill="currentColor"
            className="text-gridglow/90"
          >
            HiveSurf
          </text>
        </svg>
      </div>
    </footer>
  )
}

export default Footer
