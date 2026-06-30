import SectionReveal from './SectionReveal'
import { techCategories } from '../../data/enterpriseHome'

const TechStackSection = () => (
  <section id="technologies" className="ent-section-light scroll-mt-24 py-20 lg:py-28">
    <div className="ent-container">
      <SectionReveal>
        <p className="ent-kicker">Technologies</p>
        <h2 className="ent-heading-lg mt-4 text-[#0b0b0b]">Modern stack, proven at scale</h2>
      </SectionReveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {techCategories.map((cat, i) => (
          <SectionReveal key={cat.name} delay={i * 0.06}>
            <div className="ent-card-hover rounded-2xl border border-black/8 bg-white p-6 shadow-sm">
              <h3 className="ent-display text-lg font-bold text-[#0b0b0b]">{cat.name}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg bg-[#f8f8f8] px-3 py-1.5 text-sm font-medium text-[#333] transition-colors hover:bg-[var(--ent-primary)]/10 hover:text-[var(--ent-primary)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </SectionReveal>
        ))}
      </div>
    </div>
  </section>
)

export default TechStackSection
