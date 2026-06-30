import { Link, useLocation } from 'react-router-dom'
import { company, footerColumns } from '../../data/enterpriseHome'
import { isInternalNavHref, resolveEnterpriseNavHref } from '../../lib/enterpriseNav'
import HiveLogo from '../HiveLogo'

const EnterpriseFooter = () => {
  const { pathname } = useLocation()

  return (
  <footer className="border-t border-[var(--ent-border)] bg-white py-16 lg:py-20">
    <div className="ent-container">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <HiveLogo variant="light" className="h-9 w-auto max-w-[260px] object-contain object-left" />
          <p className="mt-4 text-sm leading-relaxed text-[var(--ent-text-muted)]">{company.description}</p>
          <form className="mt-6 flex max-w-sm gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Work email"
              aria-label="Newsletter email"
              className="flex-1 rounded-lg border border-[var(--ent-border)] bg-[#f4f6fb] px-4 py-2.5 text-sm text-[var(--ent-text)] placeholder:text-[var(--ent-text-muted)] outline-none focus:border-[var(--ent-primary)]"
            />
            <button type="submit" className="ent-btn-primary !px-4 !py-2.5 !text-sm shrink-0">
              Subscribe
            </button>
          </form>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-5">
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ent-text-heading)]">{col.heading}</p>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => {
                  const label = typeof link === 'string' ? link : link.label
                  const rawHref = typeof link === 'string' ? '#services' : link.href
                  const href = resolveEnterpriseNavHref(rawHref, pathname)
                  const isInternal = isInternalNavHref(href)
                  return (
                    <li key={label}>
                      {isInternal ? (
                        <Link to={href} className="text-sm text-[var(--ent-text-muted)] hover:text-[var(--ent-primary)]">
                          {label}
                        </Link>
                      ) : (
                        <a href={href} className="text-sm text-[var(--ent-text-muted)] hover:text-[var(--ent-primary)]">
                          {label}
                        </a>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--ent-border)] pt-8 sm:flex-row">
        <p className="text-xs text-[var(--ent-text-muted)]">
          &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
        </p>
        <div className="flex gap-6 text-xs text-[var(--ent-text-muted)]">
          <a href="#" className="hover:text-[var(--ent-primary)]">
            Privacy
          </a>
          <a href="#" className="hover:text-[var(--ent-primary)]">
            Terms
          </a>
          <a href="#" className="hover:text-[var(--ent-primary)]">
            Legal
          </a>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default EnterpriseFooter
