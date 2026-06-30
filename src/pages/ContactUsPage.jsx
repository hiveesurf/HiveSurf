import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { InlineWidget } from 'react-calendly'
import { FiPhone, FiMail, FiArrowUpRight, FiCheckCircle, FiCalendar } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import '../styles/enterprise.css'
import EnterpriseHeader from '../components/enterprise/EnterpriseHeader'
import EnterpriseFooter from '../components/enterprise/EnterpriseFooter'
import { entranceEase, inViewConfig } from '../lib/motionConfig'
import { HIVE_CALENDLY_URL, HIVE_LEAD_WHATSAPP_E164, hiveWhatsAppHref } from '../lib/leadActions'

const PHONE_DISPLAY = '+91 70083 10868'
const PHONE_DIAL = `+${HIVE_LEAD_WHATSAPP_E164}`
const EMAIL = 'connect@hivesurf.com'
const CALENDLY_MIN_HEIGHT = 720

const intentTitles = {
  meeting: {
    eyebrow: 'Set up meeting',
    heading: 'Pick a time that works.',
    body: "Grab a 30-minute slot and we'll map out your roadmap, deliverables, and next steps together.",
  },
  demo: {
    eyebrow: 'Book a demo',
    heading: 'See HiveSurf in action.',
    body: 'Walk through our engineering process, platform capabilities, and delivery model — tailored to your brief.',
  },
  default: {
    eyebrow: 'Contact HiveSurf',
    heading: 'Ready to Surf the Digital Wave?',
    body: "Let's connect and build your digital future together. Call, email, or book a discovery call below.",
  },
}

const ContactUsPage = () => {
  const { search } = useLocation()
  const [calHeight, setCalHeight] = useState(CALENDLY_MIN_HEIGHT)

  const { intent, source } = useMemo(() => {
    const params = new URLSearchParams(search)
    return {
      intent: params.get('intent') || 'default',
      source: params.get('source') || 'contact-page',
    }
  }, [search])

  const copy = intentTitles[intent] || intentTitles.default
  const bookingIntent = intent === 'meeting' || intent === 'demo'

  useEffect(() => {
    const sync = () => {
      const h = Math.max(CALENDLY_MIN_HEIGHT, Math.min(920, Math.round(window.innerHeight * 0.72)))
      setCalHeight(h)
    }
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [])

  return (
    <div className="enterprise-theme min-h-screen bg-[var(--ent-bg-alt)]">
      <EnterpriseHeader />

      <main
        className={
          'relative ent-mesh pb-16 pt-[100px] lg:pt-[112px] ' +
          (bookingIntent ? 'pb-20 lg:pb-16' : 'lg:pb-28')
        }
      >
        <div className="ent-container">
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: entranceEase }}
            className={bookingIntent ? 'max-w-3xl lg:max-w-4xl' : 'max-w-3xl'}
          >
            <p className="ent-kicker">
              {copy.eyebrow}
              {source && source !== 'contact-page' ? (
                <span className="ml-2 rounded-full border border-[var(--ent-border)] bg-white px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--ent-text-muted)]">
                  from {source}
                </span>
              ) : null}
            </p>
            <h1
              className={
                'ent-display mt-3 font-bold text-[var(--ent-text-heading)] ' +
                (bookingIntent ? 'text-[clamp(1.75rem,4vw+0.5rem,2.75rem)] lg:mt-2' : 'mt-4 ent-heading-lg')
              }
            >
              {copy.heading}
            </h1>
            <p
              className={
                'mt-3 max-w-2xl text-[var(--ent-text-muted)] ' +
                (bookingIntent ? 'text-base lg:mt-2 lg:text-[17px]' : 'mt-5 ent-body-lg')
              }
            >
              {copy.body}
            </p>
          </motion.header>

          <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-12 lg:items-start lg:gap-8">
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewConfig}
              transition={{ duration: 0.7, ease: entranceEase, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="ent-contact-card p-6 lg:p-8">
                <p className="ent-kicker">Direct line</p>
                <h2 className="ent-display mt-2 text-2xl font-bold text-[var(--ent-text-heading)] lg:mt-2">
                  Talk to a human.
                </h2>
                <p className="mt-2 text-base text-[var(--ent-text-muted)]">
                  Prefer a quick reply? Every option below lands in the same inbox and usually gets answered within the hour.
                </p>

                <ul className="mt-8 space-y-3">
                  <li>
                    <a
                      href={`tel:${PHONE_DIAL}`}
                      className="ent-contact-link group p-4"
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--ent-primary)] text-white">
                        <FiPhone className="text-xl" aria-hidden />
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-semibold uppercase tracking-[0.14em] text-[var(--ent-text-muted)]">
                          Phone
                        </span>
                        <span className="block text-base font-semibold text-[var(--ent-text-heading)]">
                          {PHONE_DISPLAY}
                        </span>
                        <span className="block text-sm text-[var(--ent-text-muted)]">
                          Call us for immediate assistance
                        </span>
                      </span>
                      <FiArrowUpRight className="text-xl text-[var(--ent-text-muted)] transition-colors group-hover:text-[var(--ent-primary)]" />
                    </a>
                  </li>

                  <li>
                    <a
                      href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                        'HiveSurf enquiry',
                      )}&body=${encodeURIComponent(
                        'Hi HiveSurf,\n\nI found you via the website and would like to discuss working together.\n\nThanks!',
                      )}`}
                      className="ent-contact-link group p-4"
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--ent-accent)] text-white">
                        <FiMail className="text-xl" aria-hidden />
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-semibold uppercase tracking-[0.14em] text-[var(--ent-text-muted)]">
                          Email
                        </span>
                        <span className="block text-base font-semibold text-[var(--ent-text-heading)]">{EMAIL}</span>
                        <span className="block text-sm text-[var(--ent-text-muted)]">Drop us a line anytime</span>
                      </span>
                      <FiArrowUpRight className="text-xl text-[var(--ent-text-muted)] transition-colors group-hover:text-[var(--ent-primary)]" />
                    </a>
                  </li>

                  <li>
                    <a
                      href={hiveWhatsAppHref(intent === 'demo' ? 'videoStartFree' : 'heroCampaign')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ent-contact-link ent-contact-link--whatsapp group bg-[#25D366]/[0.06] p-4"
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366] text-white">
                        <FaWhatsapp className="text-2xl" aria-hidden />
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-semibold uppercase tracking-[0.14em] text-[var(--ent-text-muted)]">
                          WhatsApp
                        </span>
                        <span className="block text-base font-semibold text-[var(--ent-text-heading)]">
                          {PHONE_DISPLAY}
                        </span>
                        <span className="block text-sm text-[var(--ent-text-muted)]">
                          Quick chat with prefilled message
                        </span>
                      </span>
                      <FiArrowUpRight className="text-xl text-[var(--ent-text-muted)] transition-colors group-hover:text-[#128C7E]" />
                    </a>
                  </li>
                </ul>

                <div className="mt-8 rounded-xl bg-[var(--ent-gradient)] p-6 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                    Why teams pick HiveSurf
                  </p>
                  <p className="ent-display mt-3 text-xl font-bold">
                    Engineering-first. Measurement native. Zero fluff.
                  </p>
                  <p className="mt-2 text-sm text-white/80">
                    Trusted by brands shipping software and growth programs at scale.
                  </p>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewConfig}
              transition={{ duration: 0.7, ease: entranceEase, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <div className="ent-contact-card p-6 lg:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="ent-kicker">Book your strategy call</p>
                    <h2 className="ent-display mt-3 text-2xl font-bold text-[var(--ent-text-heading)]">
                      30-minute meeting.
                    </h2>
                    <p className="mt-3 max-w-xl text-base text-[var(--ent-text-muted)]">
                      Schedule a session to plan your software roadmap, digital transformation, or marketing strategy.
                    </p>
                  </div>
                  <span className="hidden h-12 w-12 flex-none items-center justify-center rounded-xl border border-[var(--ent-border)] bg-[var(--ent-bg-alt)] text-[var(--ent-primary)] sm:flex">
                    <FiCalendar className="text-xl" aria-hidden />
                  </span>
                </div>

                {!bookingIntent && (
                  <ul className="mt-6 grid shrink-0 gap-3 sm:grid-cols-2">
                    {[
                      'Product scope or campaign review',
                      'Technology & feature-priority recommendations',
                      'Timeline, budget, and delivery plan',
                      'No-obligation consultation',
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 rounded-xl border border-[var(--ent-border)] bg-[var(--ent-bg-alt)] p-3"
                      >
                        <FiCheckCircle className="mt-0.5 flex-none text-[var(--ent-accent)]" aria-hidden />
                        <span className="text-sm text-[var(--ent-text-muted)]">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div
                  className="ent-calendly-embed calendly-booking-widget mt-6 w-full min-w-[280px] sm:min-w-[320px]"
                  style={{ minWidth: 280, minHeight: CALENDLY_MIN_HEIGHT, height: calHeight }}
                >
                  <InlineWidget
                    url={HIVE_CALENDLY_URL}
                    styles={{ height: `${calHeight}px`, width: '100%', minWidth: '280px' }}
                    pageSettings={{
                      backgroundColor: 'ffffff',
                      hideEventTypeDetails: false,
                      hideLandingPageDetails: false,
                      primaryColor: '080850',
                      textColor: '1a1c35',
                    }}
                  />
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </main>

      <EnterpriseFooter />
    </div>
  )
}

export default ContactUsPage
