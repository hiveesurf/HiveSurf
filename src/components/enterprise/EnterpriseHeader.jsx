import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown, ChevronRight } from 'lucide-react'
import { megaMenus, navLinks } from '../../data/enterpriseHome'
import { isInternalNavHref, resolveEnterpriseNavHref } from '../../lib/enterpriseNav'
import HiveLogo from '../HiveLogo'
import HiveContactLink from '../HiveContactLink'

const showFromClass = (showFrom, isButton = false) => {
  if (showFrom === 'xl') return isButton ? 'hidden xl:flex' : 'hidden xl:inline-flex'
  if (showFrom === '2xl') return isButton ? 'hidden 2xl:flex' : 'hidden 2xl:inline-flex'
  return isButton ? 'flex' : 'inline-flex'
}

const isRouteActive = (href, pathname) => {
  if (href === '/careers') return pathname.startsWith('/careers')
  return false
}

const defaultItemHref = (menuKey) => {
  if (menuKey === 'services') return '#services'
  if (menuKey === 'industries') return '#industries'
  return '#technologies'
}

const NavItem = ({ href, pathname, onClick, className, children }) => {
  const resolved = resolveEnterpriseNavHref(href, pathname)
  if (isInternalNavHref(resolved)) {
    return (
      <Link to={resolved} onClick={onClick} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <a href={resolved} onClick={onClick} className={className}>
      {children}
    </a>
  )
}

const MegaPanel = ({ menuKey, pathname, onClose }) => {
  const menu = megaMenus[menuKey]
  const [activeCategory, setActiveCategory] = useState(0)

  useEffect(() => {
    setActiveCategory(0)
  }, [menuKey])

  if (!menu) return null

  const category = menu.categories[activeCategory]
  const fallbackHref = defaultItemHref(menuKey)

  return (
    <div className="ent-container py-0">
      <div className="ent-mega-panel">
        <div className="ent-mega-intro">
          <p className="ent-kicker">{menu.title}</p>
          <p className="ent-display mt-2 text-xl font-semibold text-[var(--ent-text-heading)]">{menu.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--ent-text-muted)]">{menu.description}</p>
          {menu.cta && (
            <NavItem
              href={menu.cta.href}
              pathname={pathname}
              onClick={onClose}
              className="ent-mega-cta"
            >
              {menu.cta.label}
              <ArrowRight className="h-4 w-4" />
            </NavItem>
          )}
        </div>

        <div className="ent-mega-categories" role="tablist" aria-label={`${menu.title} categories`}>
          {menu.categories.map((cat, idx) => (
            <button
              key={cat.label}
              type="button"
              role="tab"
              aria-selected={activeCategory === idx}
              className={`ent-mega-category ${activeCategory === idx ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveCategory(idx)}
              onFocus={() => setActiveCategory(idx)}
              onClick={() => setActiveCategory(idx)}
            >
              <span>{cat.label}</span>
              <ChevronRight className="h-4 w-4 shrink-0 opacity-50" />
            </button>
          ))}
        </div>

        <div className="ent-mega-items" role="tabpanel">
          <p className="ent-mega-items-title">{category.label}</p>
          <ul className="ent-mega-items-grid">
            {category.items.map((item) => {
              const href = resolveEnterpriseNavHref(
                category.links?.[item] ?? fallbackHref,
                pathname,
              )
              return (
                <li key={item}>
                  <NavItem
                    href={href}
                    pathname={pathname}
                    onClick={onClose}
                    className="ent-mega-item-link"
                  >
                    {item}
                  </NavItem>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

const MobileMegaSection = ({ link, pathname, onClose }) => {
  const menu = megaMenus[link.mega]
  const [openCategory, setOpenCategory] = useState(null)
  const fallbackHref = defaultItemHref(link.mega)

  if (!menu) return null

  return (
    <div className="border-b border-[var(--ent-border)] pb-2">
      <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--ent-primary)]">
        {link.label}
      </p>
      {menu.categories.map((cat) => {
        const isOpen = openCategory === cat.label
        return (
          <div key={cat.label}>
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left text-sm font-medium text-[var(--ent-text)]"
              onClick={() => setOpenCategory(isOpen ? null : cat.label)}
            >
              {cat.label}
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
              <ul className="space-y-0.5 pb-2 pl-2">
                {cat.items.map((item) => {
                  const href = resolveEnterpriseNavHref(
                    cat.links?.[item] ?? fallbackHref,
                    pathname,
                  )
                  return (
                    <li key={item}>
                      <NavItem
                        href={href}
                        pathname={pathname}
                        onClick={onClose}
                        className="block rounded-lg px-6 py-2 text-sm text-[var(--ent-text-muted)] hover:text-[var(--ent-primary)]"
                      >
                        {item}
                      </NavItem>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )
      })}
    </div>
  )
}

const EnterpriseHeader = () => {
  const { pathname } = useLocation()
  const headerRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [openMega, setOpenMega] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen || openMega ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen, openMega])

  useEffect(() => {
    setOpenMega(null)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!openMega) return undefined

    const closeOnScroll = () => setOpenMega(null)
    const closeOnClickOutside = (event) => {
      if (!headerRef.current?.contains(event.target)) {
        setOpenMega(null)
      }
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpenMega(null)
    }

    window.addEventListener('scroll', closeOnScroll, { passive: true })
    document.addEventListener('mousedown', closeOnClickOutside)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      window.removeEventListener('scroll', closeOnScroll)
      document.removeEventListener('mousedown', closeOnClickOutside)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [openMega])

  const toggleMega = (megaKey) => {
    setOpenMega((current) => (current === megaKey ? null : megaKey))
  }

  const headerBg = scrolled || openMega
    ? 'bg-white/95 border-b border-[var(--ent-border)] shadow-sm shadow-[rgba(8,8,80,0.06)]'
    : 'border-b border-transparent bg-white/80 backdrop-blur-md'

  const linkBase = 'ent-header-link text-[var(--ent-text-muted)]'
  const linkActive = 'is-active'

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${headerBg}`}
    >
      <div className="ent-container ent-header-bar">
        <Link to="/" className="ent-header-brand" onClick={() => setOpenMega(null)}>
          <HiveLogo variant="light" className="h-8 w-auto max-w-[min(42vw,180px)] object-contain object-left lg:h-9 lg:max-w-[200px] xl:max-w-[220px]" />
        </Link>

        <nav className="ent-header-nav">
          {navLinks.map((link) => {
            const hasMega = link.mega
            const isOpen = openMega === link.mega
            const active = isRouteActive(link.href, pathname)
            const visibility = showFromClass(link.showFrom, hasMega)

            if (hasMega) {
              return (
                <button
                  key={link.label}
                  type="button"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={() => toggleMega(link.mega)}
                  className={`${linkBase} ${visibility} ${isOpen ? linkActive : ''}`}
                >
                  {link.label}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
              )
            }

            return (
              <NavItem
                key={link.label}
                href={link.href}
                pathname={pathname}
                onClick={() => setOpenMega(null)}
                className={`${linkBase} ${visibility} ${active ? linkActive : ''}`}
              >
                {link.label}
              </NavItem>
            )
          })}
        </nav>

        <div className="ent-header-actions">
          <span className="ent-header-divider" aria-hidden="true" />
          <HiveContactLink
            intent="meeting"
            source="enterprise-header"
            className="ent-btn-primary ent-btn-header hidden lg:inline-flex"
          >
            <span className="xl:hidden">Book a Call</span>
            <span className="hidden xl:inline">Book Discovery Call</span>
          </HiveContactLink>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--ent-border)] text-[var(--ent-primary)] lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {openMega && (
          <motion.div
            key={openMega}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full z-50 hidden border-t border-[var(--ent-border)] bg-white shadow-xl lg:block"
          >
            <MegaPanel menuKey={openMega} pathname={pathname} onClose={() => setOpenMega(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-[var(--ent-border)] bg-white lg:hidden"
          >
            <nav className="ent-container max-h-[70svh] space-y-1 overflow-y-auto py-4">
              {navLinks.map((link) => {
                if (link.mega) {
                  return (
                    <MobileMegaSection
                      key={link.label}
                      link={link}
                      pathname={pathname}
                      onClose={() => setMobileOpen(false)}
                    />
                  )
                }

                const active = isRouteActive(link.href, pathname)

                return (
                  <NavItem
                    key={link.label}
                    href={link.href}
                    pathname={pathname}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-lg px-4 py-3 text-sm font-medium ${
                      active ? 'bg-[var(--ent-bg-subtle)] text-[var(--ent-primary)]' : 'text-[var(--ent-text)]'
                    }`}
                  >
                    {link.label}
                  </NavItem>
                )
              })}
              <HiveContactLink
                intent="meeting"
                source="enterprise-mobile-nav"
                className="ent-btn-primary mt-4 w-full"
                onClick={() => setMobileOpen(false)}
              >
                Book Discovery Call
              </HiveContactLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default EnterpriseHeader
