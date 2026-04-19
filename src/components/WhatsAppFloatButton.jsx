// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { hiveWhatsAppHref } from '../lib/leadActions'

/**
 * Fixed bottom-right WhatsApp launcher (opens chat with prefilled text).
 * `messageKey` maps to copy in `src/lib/leadActions.js`; default is `floatWidget`.
 */
const WhatsAppFloatButton = ({ messageKey = 'floatWidget', className = '' }) => {
  const href = hiveWhatsAppHref(messageKey)

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with HiveSurf on WhatsApp"
      className={
        'fixed bottom-6 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#128C7E] bg-[#25D366] text-white shadow-[0_10px_40px_rgba(37,211,102,0.45)] tr-ease hover:brightness-110 hover:shadow-[0_12px_44px_rgba(37,211,102,0.55)] ' +
        className
      }
      style={{ '--duration': '220ms' }}
      initial={{ opacity: 0, scale: 0.85, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.4 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
    >
      <FaWhatsapp className="text-[30px]" aria-hidden />
    </motion.a>
  )
}

export default WhatsAppFloatButton
