// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import useReducedMotion from '../../hooks/useReducedMotion'

const SectionReveal = ({ children, className = '', delay = 0 }) => {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

export default SectionReveal
