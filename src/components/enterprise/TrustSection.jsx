import SectionReveal from './SectionReveal'
import { trustStats } from '../../data/enterpriseHome'

const TrustSection = () => (
  <section className="ent-section-dark border-t border-[var(--ent-border)] py-20 lg:py-28">
    <div className="ent-container">
      <SectionReveal>
        <p className="ent-kicker text-center lg:text-left">Trusted Technology Partner</p>
        <h2 className="ent-heading-lg mt-4 text-center lg:text-left">Built for enterprise expectations</h2>
      </SectionReveal>
      <div className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
        {trustStats.map((stat, i) => (
          <SectionReveal key={stat.label} delay={i * 0.06}>
            <div className="text-center lg:text-left">
              <p className="ent-display text-3xl font-bold text-[var(--ent-text-heading)] lg:text-4xl">{stat.value}</p>
              <p className="mt-2 text-sm text-[var(--ent-text-muted)]">{stat.label}</p>
            </div>
          </SectionReveal>
        ))}
      </div>
    </div>
  </section>
)

export default TrustSection
