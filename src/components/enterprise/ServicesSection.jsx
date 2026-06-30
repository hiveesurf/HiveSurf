import { Link } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { ArrowUpRight, Bot, Cloud, Code2, Cpu, Layers, Megaphone, Palette, Server, Smartphone, Users } from 'lucide-react'
import SectionReveal from './SectionReveal'
import { growthServices, services } from '../../data/enterpriseHome'
import useReducedMotion from '../../hooks/useReducedMotion'

const iconMap = {
  'custom-software': Code2,
  'enterprise-apps': Layers,
  'web-dev': Server,
  mobile: Smartphone,
  cloud: Cloud,
  ai: Bot,
  api: Server,
  design: Palette,
  iot: Cpu,
  'social-media': Megaphone,
  influencer: Users,
}

/** Bento grid spans — asymmetric, editorial layout */
const bentoLayout = [
  'sm:col-span-2 lg:col-span-7 lg:row-span-2',
  'sm:col-span-2 lg:col-span-5',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-6',
  'lg:col-span-3',
  'lg:col-span-3',
  'lg:col-span-6',
]

const gridContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}

const gridItem = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

const growthServiceLinks = {
  'social-media': '/marketing#solutions',
  influencer: '/marketing',
}

const ServiceCard = ({ service, index, layout, featured, reduced, compact }) => {
  const Icon = iconMap[service.id] || Code2
  const num = String(index + 1).padStart(2, '0')
  const serviceHref = growthServiceLinks[service.id]
  const cardClassName = `group relative flex min-h-[300px] flex-col overflow-hidden rounded-[28px] border border-[var(--ent-border)] bg-[#0b0b0b] shadow-[0_8px_30px_rgba(8,8,80,0.08)] ${layout} ${featured ? 'min-h-[420px] lg:min-h-full' : ''} ${compact ? 'min-h-[280px] lg:min-h-[320px]' : ''} ${serviceHref ? 'cursor-pointer' : ''}`

  const cardBody = (
    <>
      <img
        src={service.image}
        alt={service.imageAlt || service.title}
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] ${service.imagePosition || 'object-center'}`}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/75 to-[#0b0b0b]/25 transition-opacity duration-500 group-hover:via-[#0b0b0b]/85" />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--ent-primary)] to-transparent" />
      </div>

      <div className="relative mt-auto flex flex-1 flex-col p-6 lg:p-8">
        <div className="mb-auto flex items-start justify-between gap-3">
          <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-[var(--ent-primary)]">
            {num}
          </span>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/90 backdrop-blur-sm transition-all duration-400 group-hover:border-[var(--ent-primary)]/40 group-hover:bg-[var(--ent-primary)]/15 group-hover:text-[var(--ent-primary)]">
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </div>
        </div>

        <h3
          className={`ent-display font-bold tracking-tight text-white ${featured ? 'mt-6 text-2xl lg:text-3xl' : 'mt-4 text-xl'}`}
        >
          {service.title}
        </h3>
        <p
          className={`mt-2 leading-relaxed text-white/65 ${featured ? 'text-sm lg:text-[15px] lg:leading-[1.7]' : 'line-clamp-2 text-sm'}`}
        >
          {service.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {service.capabilities.slice(0, featured ? 4 : 2).map((cap) => (
            <span
              key={cap}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/75 backdrop-blur-sm"
            >
              {cap}
            </span>
          ))}
          {!featured && service.capabilities.length > 2 && (
            <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/50">
              +{service.capabilities.length - 2}
            </span>
          )}
        </div>

        {serviceHref ? (
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--ent-primary)] opacity-0 transition-all duration-300 group-hover:opacity-100">
            Explore service
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        ) : (
          <a
            href="#contact"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--ent-primary)] opacity-0 transition-all duration-300 group-hover:opacity-100"
          >
            Discuss this service
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        )}
      </div>
    </>
  )

  if (serviceHref) {
    return (
      <motion.article
        variants={reduced ? undefined : gridItem}
        whileHover={reduced ? undefined : { y: -6 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className={cardClassName}
      >
        <Link to={serviceHref} className="absolute inset-0 z-10" aria-label={`Explore ${service.title}`} />
        {cardBody}
      </motion.article>
    )
  }

  return (
    <motion.article
      variants={reduced ? undefined : gridItem}
      whileHover={reduced ? undefined : { y: -6 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={cardClassName}
    >
      {cardBody}
    </motion.article>
  )
}

const ServicesSection = () => {
  const reduced = useReducedMotion()

  return (
    <section id="services" className="relative scroll-mt-24 overflow-hidden bg-[#f4f4f6] py-20 lg:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="ent-container relative z-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionReveal className="max-w-2xl">
            <p className="ent-kicker">Services</p>
            <h2 className="ent-heading-lg mt-4">Engineering & growth, under one roof</h2>
            <p className="ent-body-lg mt-4">
              Custom software, cloud, AI, and IoT — plus social media and influencer marketing to help you
              build products and grow your brand.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.1} className="shrink-0">
            <a href="#contact" className="ent-btn-primary inline-flex">
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </SectionReveal>
        </div>

        <SectionReveal className="mt-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ent-primary)]">
            Software & Engineering
          </p>
        </SectionReveal>

        <motion.div
          className="mt-6 grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5"
          variants={reduced ? undefined : gridContainer}
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, margin: '-60px' }}
        >
          {services.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              layout={bentoLayout[i]}
              featured={i === 0}
              reduced={reduced}
            />
          ))}
        </motion.div>

        <SectionReveal className="mt-16 lg:mt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ent-primary)]">
            Growth & Marketing
          </p>
          <p className="mt-2 max-w-xl text-sm text-[var(--ent-text-muted)]">
            Social and creator-led campaigns for brands that want reach, engagement, and measurable ROI.
          </p>
        </SectionReveal>

        <motion.div
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:gap-5"
          variants={reduced ? undefined : gridContainer}
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, margin: '-60px' }}
        >
          {growthServices.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={services.length + i}
              layout=""
              featured={false}
              reduced={reduced}
              compact
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection
