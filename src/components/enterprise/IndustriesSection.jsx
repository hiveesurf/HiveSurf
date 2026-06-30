import SectionReveal from './SectionReveal'
import { industries } from '../../data/enterpriseHome'

const IndustriesSection = () => (
  <section id="industries" className="ent-section-dark scroll-mt-24 py-20 lg:py-28">
    <div className="ent-container">
      <SectionReveal>
        <p className="ent-kicker">Industries</p>
        <h2 className="ent-heading-lg mt-4">Domain expertise across sectors</h2>
        <p className="ent-body-lg mt-4 max-w-2xl">
          Real teams, real workplaces — we build software where people and operations meet every day.
        </p>
      </SectionReveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((ind, i) => (
          <SectionReveal key={ind.id} delay={i * 0.05}>
            <article className="group ent-card-hover relative aspect-[4/5] overflow-hidden rounded-2xl border border-[var(--ent-border)] sm:aspect-[5/6] lg:h-[340px] lg:aspect-auto">
              <img
                src={ind.image}
                alt={`${ind.name} — ${ind.caption}`}
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 transition-opacity duration-300 group-hover:via-black/45" />
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ent-primary)]">
                  Industry
                </p>
                <h3 className="ent-display mt-2 text-2xl font-bold text-white">{ind.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{ind.caption}</p>
              </div>
            </article>
          </SectionReveal>
        ))}
      </div>
    </div>
  </section>
)

export default IndustriesSection
