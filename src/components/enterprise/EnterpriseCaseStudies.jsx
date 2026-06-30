import { ArrowRight } from 'lucide-react'
import SectionReveal from './SectionReveal'
import { caseStudies } from '../../data/enterpriseHome'

const EnterpriseCaseStudies = () => (
  <section id="case-studies" className="ent-section-dark scroll-mt-24 py-20 lg:py-28">
    <div className="ent-container">
      <SectionReveal>
        <p className="ent-kicker">Case Studies</p>
        <h2 className="ent-heading-lg mt-4">Proven outcomes across industries</h2>
      </SectionReveal>

      <div className="mt-14 space-y-8">
        {caseStudies.map((cs, i) => (
          <SectionReveal key={cs.id} delay={i * 0.08}>
            <article className="ent-card-hover overflow-hidden rounded-2xl border border-[var(--ent-border)] bg-white lg:grid lg:grid-cols-12">
              <div className="relative min-h-[220px] overflow-hidden lg:col-span-4 lg:min-h-full">
                <img
                  src={cs.image}
                  alt={cs.imageAlt || cs.title}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-black/30 lg:bg-gradient-to-t lg:from-black/40 lg:via-black/20 lg:to-transparent" />
                <p className="absolute bottom-4 left-4 rounded-md bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--ent-primary)] backdrop-blur-sm lg:hidden">
                  {cs.industry}
                </p>
              </div>
              <div className="p-8 lg:col-span-8 lg:p-10">
                <p className="hidden text-xs font-semibold uppercase tracking-wider text-[var(--ent-primary)] lg:block">
                  {cs.industry}
                </p>
                <h3 className="ent-display mt-2 text-2xl font-bold text-[var(--ent-text-heading)]">{cs.title}</h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase text-[var(--ent-text-muted)]">Challenge</p>
                    <p className="mt-1 text-sm text-[var(--ent-text)]">{cs.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-[var(--ent-text-muted)]">Solution</p>
                    <p className="mt-1 text-sm text-[var(--ent-text)]">{cs.solution}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cs.tech.map((t) => (
                    <span key={t} className="rounded-md bg-[#eef2fa] px-2.5 py-1 text-xs text-[var(--ent-text-muted)]">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm font-medium text-[var(--ent-primary)]">{cs.impact}</p>
                <button
                  type="button"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--ent-primary)]"
                >
                  Read Case Study <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          </SectionReveal>
        ))}
      </div>
    </div>
  </section>
)

export default EnterpriseCaseStudies
