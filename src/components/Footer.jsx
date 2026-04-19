import { Mail, MessageCircle, Phone } from 'lucide-react'
import { HIVE_LEAD_WHATSAPP_E164, hiveWhatsAppHref } from '../lib/leadActions'

function Footer() {
  const currentYear = new Date().getFullYear()
  const phoneDisplay = '+91 70083 10868'
  const waHref = hiveWhatsAppHref('footerContact')

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="text-2xl font-bold">HiveSurf</h3>
            <p className="mt-3 text-sm text-gray-400">
              Creator marketing OS — plan, match, schedule, and measure campaigns in one place.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold">On this site</h4>
            <ul className="mt-3 space-y-2 text-gray-400">
              <li>
                <a href="/" className="transition-colors hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/contact" className="transition-colors hover:text-white">
                  Contact &amp; book a call
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Reach us</h4>
            <ul className="mt-3 space-y-2 text-gray-400">
              <li>
                <a href={`tel:+${HIVE_LEAD_WHATSAPP_E164}`} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                  <Phone size={16} aria-hidden />
                  {phoneDisplay}
                </a>
              </li>
              <li>
                <a href="mailto:connect@hivesurf.com" className="inline-flex items-center gap-2 transition-colors hover:text-white">
                  <Mail size={16} aria-hidden />
                  connect@hivesurf.com
                </a>
              </li>
              <li>
                <a href={waHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-white">
                  <MessageCircle size={16} aria-hidden />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          © {currentYear} HiveSurf. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
