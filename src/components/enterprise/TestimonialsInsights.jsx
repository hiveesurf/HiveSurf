import { ArrowUpRight, Quote } from 'lucide-react'
import SectionReveal from './SectionReveal'
import { testimonials, insights } from '../../data/enterpriseHome'

const tagThemes = {
  AI: 'from-[#080850] via-[#1e3a8a] to-[#2563eb]',
  Cloud: 'from-[#1e3a8a] via-[#2563eb] to-[#3b82f6]',
  Architecture: 'from-[#0f172a] via-[#1e3a8a] to-[#334155]',
  Engineering: 'from-[#080850] via-[#312e81] to-[#4338ca]',
}

const industryThemes = {
  'Industrial SaaS': 'from-[#080850] via-[#1e3a8a] to-[#2563eb]',
  FinTech: 'from-[#0f172a] via-[#1e3a8a] to-[#0ea5e9]',
  Healthcare: 'from-[#080850] via-[#312e81] to-[#6366f1]',
}

const DotPattern = () => (
  <div
    className="absolute inset-0 opacity-20"
    style={{
      backgroundImage:
        'radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
      backgroundSize: '24px 24px',
    }}
  />
)

const TestimonialCard = ({ testimonial }) => {
  const gradient = industryThemes[testimonial.industry] || industryThemes['Industrial SaaS']

  return (
    <blockquote className="group flex h-full flex-col overflow-hidden rounded-xl border border-[var(--ent-border)] bg-white shadow-[0_1px_3px_rgba(8,8,80,0.06)] transition-[box-shadow,border-color] duration-300 hover:border-[var(--ent-primary)]/20 hover:shadow-[0_12px_40px_rgba(8,8,80,0.1)]">
      <div className={`relative bg-gradient-to-br ${gradient} px-6 py-5`}>
        <DotPattern />
        <div className="relative flex items-start justify-between gap-4">
          <span className="rounded-md bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
            {testimonial.industry}
          </span>
          <Quote className="h-8 w-8 shrink-0 text-white/30" strokeWidth={1.5} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <p className="flex-1 text-[15px] leading-[1.75] text-[var(--ent-text)]">
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        <footer className="mt-6 border-t border-[var(--ent-border)] pt-6">
          <p className="font-semibold text-[var(--ent-text-heading)]">{testimonial.name}</p>
          <p className="mt-0.5 text-sm text-[var(--ent-text-muted)]">{testimonial.company}</p>
          <div className="mt-4 rounded-lg bg-[#eef2fa] px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ent-primary)]">Outcome</p>
            <p className="mt-1 text-sm font-medium leading-snug text-[var(--ent-text-heading)]">
              {testimonial.result}
            </p>
          </div>
        </footer>
      </div>
    </blockquote>
  )
}

const TestimonialsSection = () => (
  <section className="ent-section-light py-20 lg:py-28">
    <div className="ent-container">
      <SectionReveal>
        <p className="ent-kicker">Testimonials</p>
        <h2 className="ent-heading-lg mt-4">Trusted by technology leaders</h2>
        <p className="ent-body-lg mt-4 max-w-2xl">
          What engineering and digital leaders say about partnering with HiveSurf on complex delivery.
        </p>
      </SectionReveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8">
        {testimonials.map((t, i) => (
          <SectionReveal key={t.company} delay={i * 0.08}>
            <TestimonialCard testimonial={t} />
          </SectionReveal>
        ))}
      </div>
    </div>
  </section>
)

const InsightCard = ({ post }) => {
  const gradient = tagThemes[post.tag] || tagThemes.Engineering

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[var(--ent-border)] bg-white shadow-[0_1px_3px_rgba(8,8,80,0.06)] transition-[box-shadow,border-color] duration-300 hover:border-[var(--ent-primary)]/20 hover:shadow-[0_12px_40px_rgba(8,8,80,0.1)]">
      <div className={`relative h-36 bg-gradient-to-br ${gradient} px-6 py-5`}>
        <DotPattern />
        <div className="relative flex items-start justify-between">
          <span className="rounded-md bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
            {post.tag}
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 group-hover:bg-white group-hover:text-[var(--ent-primary)]">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <h3 className="ent-display text-lg font-bold leading-snug text-[var(--ent-text-heading)] transition-colors group-hover:text-[var(--ent-primary)] lg:text-[1.125rem]">
          {post.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--ent-text-muted)] line-clamp-3">
          {post.excerpt}
        </p>
        <div className="mt-5 flex items-center gap-2 text-xs text-[var(--ent-text-muted)]">
          <time>{post.date}</time>
          <span aria-hidden>·</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </article>
  )
}

const InsightsSection = () => (
  <section id="insights" className="ent-section-dark scroll-mt-24 py-20 lg:py-28">
    <div className="ent-container">
      <SectionReveal>
        <p className="ent-kicker">Insights</p>
        <h2 className="ent-heading-lg mt-4">Engineering perspectives</h2>
        <p className="ent-body-lg mt-4 max-w-2xl">
          Practical thinking on architecture, cloud, AI, and delivery — from teams building in production.
        </p>
      </SectionReveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:gap-8">
        {insights.map((post, i) => (
          <SectionReveal key={post.title} delay={i * 0.06}>
            <InsightCard post={post} />
          </SectionReveal>
        ))}
      </div>
    </div>
  </section>
)

export { TestimonialsSection, InsightsSection }
