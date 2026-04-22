// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import useReducedMotion from '../../hooks/useReducedMotion'
import { entranceEase } from '../../lib/motionConfig'

const logoRows = [
  [
    { name: 'Funky-lil-munchkins-pro', className: 'font-black text-[28px] tracking-tight lowercase' },
    { name: 'Vmmetals', className: 'font-semibold text-[30px] tracking-tight lowercase' },
    { name: 'Carnalysys', className: 'font-bold text-[30px] tracking-tight lowercase' },
  ],
  [
    { name: 'Uniliver', className: 'font-medium text-[30px] tracking-tight' },
    { name: 'wayfair', className: 'font-semibold text-[30px] tracking-tight lowercase' },
    { name: 'crumbl', className: 'font-light text-[30px] tracking-tight italic lowercase' },
    { name: 'Nike', className: 'font-black italic text-[34px] tracking-tight' },
  ],
  [
    { name: 'Southwest', className: 'font-black text-[30px] tracking-tight' },
    { name: 'KiwiCo', className: 'font-bold text-[28px] tracking-tight' },
    { name: 'el Pollo Loco', className: 'font-extrabold text-[26px] tracking-tight italic' },
    { name: 'chewy', className: 'font-black text-[32px] tracking-tight italic' },
  ],
  [
    { name: 'Habit', className: 'font-black text-[22px] uppercase tracking-wide' },
    { name: 'Make\u00B7A\u00B7Wish', className: 'font-serif font-semibold text-[22px] italic' },
    { name: 'at home', className: 'font-medium text-[24px] tracking-tight' },
    { name: 'McKenzie-Childs', className: 'font-serif font-semibold text-[22px]' },
    { name: 'Tapatio', className: 'font-black text-[20px] uppercase tracking-widest italic' },
  ],
]

const rowVariants = {
  initial: { opacity: 0, y: 24 },
  animate: (delay) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: entranceEase, delay } }),
}

const IndustryLeaders = () => {
  const reduced = useReducedMotion()

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-6 py-16 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(1200px 600px at 50% 10%, rgba(81,36,193,0.06) 0%, transparent 60%), var(--color-gridglow)',
        }}
        aria-hidden
      />

      <motion.p
        className="relative z-10 text-center text-base font-bold text-offline"
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={reduced ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: entranceEase }}
      >
        Trusted by industry leaders
      </motion.p>

      <div className="relative z-10 mt-12 flex w-full max-w-[1100px] flex-col gap-10 lg:mt-14 lg:gap-12">
        {logoRows.map((row, rowIdx) => (
          <motion.div
            key={rowIdx}
            className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 sm:gap-x-16 lg:gap-x-24"
            variants={rowVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
            custom={reduced ? 0 : 0.1 + rowIdx * 0.15}
          >
            {row.map((logo) => (
              <motion.span
                key={logo.name}
                className={`text-offline ${logo.className} select-none`}
                whileHover={reduced ? {} : { scale: 1.05, color: 'var(--color-viralcrush)' }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                {logo.name}
              </motion.span>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default IndustryLeaders
