// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { Brain, Cloud, Layers, Shield, Sparkles } from 'lucide-react'
import useReducedMotion from '../../hooks/useReducedMotion'

const layers = [
  {
    id: 'experience',
    label: 'Experience',
    detail: 'Web · Mobile · Portals',
    icon: Sparkles,
  },
  {
    id: 'intelligence',
    label: 'Intelligence',
    detail: 'AI · RAG · Analytics',
    icon: Brain,
  },
  {
    id: 'integration',
    label: 'Integration',
    detail: 'APIs · Events · Data',
    icon: Layers,
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    detail: 'Cloud · DevOps · Security',
    icon: Cloud,
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const PlatformOverview = () => {
  const reduced = useReducedMotion()

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 rounded-full bg-[var(--ent-accent)]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-8 -left-6 h-32 w-32 rounded-full bg-[var(--ent-primary)]/8 blur-2xl" />

      <div className="ent-glass relative overflow-hidden rounded-3xl p-6 lg:p-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--ent-primary)]/30 to-transparent" />

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="ent-kicker !tracking-[0.16em]">Platform Overview</p>
            <p className="mt-2 text-sm font-medium text-[var(--ent-text-heading)]">
              Full-stack delivery architecture
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--ent-border)] bg-[#eef2fa] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--ent-primary)]">
            <Shield className="h-3 w-3" />
            Enterprise ready
          </span>
        </div>

        <motion.div
          className="mt-8 space-y-3"
          variants={reduced ? undefined : container}
          initial={reduced ? false : 'hidden'}
          animate={reduced ? undefined : 'visible'}
        >
          {layers.map((layer, i) => {
            const Icon = layer.icon
            return (
              <motion.div
                key={layer.id}
                variants={reduced ? undefined : item}
                className="group flex w-full items-center gap-4 rounded-2xl border border-[var(--ent-border)] bg-white px-4 py-3.5 shadow-sm transition-all duration-300 hover:border-[var(--ent-primary)]/25 hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef2fa] text-[var(--ent-primary)] transition-colors group-hover:bg-[var(--ent-primary)] group-hover:text-white">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[var(--ent-text-heading)]">{layer.label}</p>
                  <p className="text-[11px] text-[var(--ent-text-muted)]">{layer.detail}</p>
                </div>
                <span className="font-mono text-[10px] text-[var(--ent-text-muted)]">L{i + 1}</span>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

export default PlatformOverview
