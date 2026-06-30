import { useRef } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Handshake, Layers, Search, ShieldCheck } from 'lucide-react'
import { whyChoosePremium } from '../../data/enterpriseHome'
import useReducedMotion from '../../hooks/useReducedMotion'

const iconMap = {
  search: Search,
  layers: Layers,
  'shield-check': ShieldCheck,
  handshake: Handshake,
}

const cardDelays = [0.1, 0.15, 0.2, 0.25]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
      delay: cardDelays[i] || 0,
    },
  }),
}

const PremiumCard = ({ card, index, reduced }) => {
  const ref = useRef(null)
  const Icon = iconMap[card.icon] || Layers
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 260, damping: 22 })
  const springY = useSpring(rotateY, { stiffness: 260, damping: 22 })

  const handleMove = (e) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    rotateX.set(-y * 6)
    rotateY.set(x * 6)
  }

  const handleLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.article
      ref={ref}
      custom={index}
      variants={reduced ? undefined : cardVariants}
      initial={reduced ? false : 'hidden'}
      whileInView={reduced ? undefined : 'visible'}
      viewport={{ once: true, margin: '-60px' }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={
        reduced
          ? undefined
          : {
              rotateX: springX,
              rotateY: springY,
              transformPerspective: 900,
            }
      }
      whileHover={reduced ? undefined : { y: -8 }}
      transition={{ type: 'tween', duration: 0.4, ease: 'easeOut' }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-[var(--ent-border)] bg-white shadow-[0_4px_24px_rgba(8,8,80,0.06)] duration-[400ms] ease-out hover:border-[var(--ent-primary)]/25 hover:shadow-[0_24px_56px_rgba(8,8,80,0.1)]"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px origin-left scale-x-0 bg-gradient-to-r from-[var(--ent-primary)] to-[var(--ent-secondary)] transition-transform duration-[400ms] ease-out group-hover:scale-x-100"
        aria-hidden
      />

      <div className="relative h-48 shrink-0 overflow-hidden lg:h-52">
        <img
          src={card.image}
          alt={card.imageAlt || card.title}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent" />
        <motion.div
          className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--ent-border)] bg-white/95 text-[var(--ent-primary)] shadow-sm backdrop-blur-sm transition-[border-color,background-color] duration-[400ms] group-hover:border-[var(--ent-primary)]/40 group-hover:bg-[var(--ent-primary)]/8"
          animate={reduced ? undefined : { y: [0, -3, 0] }}
          transition={reduced ? undefined : { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
          whileHover={reduced ? undefined : { rotate: 8, scale: 1.05 }}
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </motion.div>
        <span className="absolute bottom-4 right-4 rounded-full border border-[var(--ent-border)] bg-white/90 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--ent-text-muted)] shadow-sm backdrop-blur-sm transition-[color,border-color,box-shadow] duration-[400ms] group-hover:border-[var(--ent-primary)]/45 group-hover:text-[var(--ent-primary)]">
          {card.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-8 lg:p-10">
      <motion.h3
        className="ent-display text-xl font-bold tracking-tight text-[var(--ent-text-heading)] lg:text-[22px]"
        initial={reduced ? false : { opacity: 0 }}
        whileInView={reduced ? undefined : { opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: (cardDelays[index] || 0) + 0.15, duration: 0.5 }}
      >
        {card.title}
      </motion.h3>

      <motion.p
        className="mt-4 flex-1 text-sm leading-relaxed text-[var(--ent-text-muted)] lg:text-[15px] lg:leading-[1.7]"
        initial={reduced ? false : { opacity: 0, y: 12 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: (cardDelays[index] || 0) + 0.22, duration: 0.55 }}
      >
        {card.description}
      </motion.p>

      <ul className="mt-6 space-y-2.5">
        {card.points.map((point, pi) => (
          <motion.li
            key={point}
            className="flex items-start gap-2.5 text-sm text-[var(--ent-text-muted)]"
            initial={reduced ? false : { opacity: 0, x: -8 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (cardDelays[index] || 0) + 0.3 + pi * 0.06, duration: 0.4 }}
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--ent-primary)]" />
            {point}
          </motion.li>
        ))}
      </ul>
      </div>
    </motion.article>
  )
}

const WhyChooseHiveSurfSection = () => {
  const reduced = useReducedMotion()

  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden bg-[#f4f6fb] py-[60px] lg:py-[140px]">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div className="absolute left-1/2 top-0 h-[480px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(8,8,80,0.08)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(30,58,138,0.06)_0%,transparent_70%)]" />
        {[...Array(6)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[var(--ent-primary)]/20"
            style={{ left: `${12 + i * 14}%`, top: `${20 + (i % 3) * 22}%` }}
            animate={reduced ? undefined : { y: [0, -12, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={
              reduced
                ? undefined
                : { duration: 5 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }
            }
          />
        ))}
        <motion.div
          className="absolute left-[8%] top-[30%] h-px w-[200px] bg-gradient-to-r from-transparent via-[rgba(8,8,80,0.12)] to-transparent"
          animate={reduced ? undefined : { opacity: [0.3, 0.7, 0.3], x: [0, 20, 0] }}
          transition={reduced ? undefined : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[25%] right-[10%] h-px w-[160px] bg-gradient-to-r from-transparent via-[rgba(30,58,138,0.12)] to-transparent"
          animate={reduced ? undefined : { opacity: [0.2, 0.6, 0.2], x: [0, -16, 0] }}
          transition={reduced ? undefined : { duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 lg:px-10">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 32 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[700px]"
        >
          <p className="ent-kicker">Why HiveSurf</p>
          <h2 className="ent-display mt-4 text-[clamp(2.25rem,4.5vw,4.25rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[var(--ent-text-heading)]">
            Why Companies Choose HiveSurf
          </h2>
          <p className="mt-6 text-base leading-[1.75] text-[#555] lg:text-lg">
            We don&apos;t just build software. We become your long-term technology partner by combining
            strategic thinking, engineering excellence, and scalable digital solutions that help
            businesses grow with confidence.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:gap-8">
          {whyChoosePremium.map((card, i) => (
            <PremiumCard key={card.title} card={card} index={i} reduced={reduced} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseHiveSurfSection
