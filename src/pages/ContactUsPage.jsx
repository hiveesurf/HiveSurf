import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { InlineWidget } from 'react-calendly'
import { FiPhone, FiMail, FiArrowUpRight, FiCheckCircle, FiCalendar } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import Navbar from '../components/home/Navbar'
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
    body: "Grab a 30-minute slot and we'll map out your campaign, deliverables, and next steps together.",
  },
  demo: {
    eyebrow: 'Book a demo',
    heading: 'See HiveSurf in action.',
    body: 'Walk through our workspace, matching engine, and the full creator pipeline — tailored to your brief.',
  },
  default: {
    eyebrow: 'Contact HiveSurf',
    heading: 'Ready to Surf the Digital Wave?',
    body: "Let's connect and build your social hive together. Call, DM, or book a strategy call below.",
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
      // Calendly needs ~700px+ for date picker; don't shrink below that
      const h = Math.max(CALENDLY_MIN_HEIGHT, Math.min(920, Math.round(window.innerHeight * 0.72)))
      setCalHeight(h)
    }
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [])

  return (
    <div className="gridglow-bg relative min-h-screen w-full overflow-x-hidden">
      <Navbar />

      {/* Soft atmospheric accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-viralcrush/10 blur-3xl" />
        <div className="absolute top-10 right-0 h-64 w-64 rounded-full bg-hottake/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-peachfuzz/15 blur-3xl" />
      </div>

      <main
        className={
          'relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-16 pt-[120px] lg:px-10 ' +
          (bookingIntent ? 'pb-20 lg:pb-16 lg:pt-28' : 'lg:pb-28 lg:pt-36')
        }
      >
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: entranceEase }}
          className={bookingIntent ? 'max-w-3xl lg:max-w-4xl' : 'max-w-3xl'}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-offline/55">
            {copy.eyebrow}
            {source && source !== 'contact-page' ? (
              <span className="ml-2 rounded-full border border-offline/15 bg-white/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-offline/65">
                from {source}
              </span>
            ) : null}
          </p>
          <h1
            className={
              'mt-3 font-heading font-black text-offline ' +
              (bookingIntent ? 'text-[clamp(1.75rem,4vw+0.5rem,2.75rem)] lg:mt-2' : 'mt-4 text-h1l')
            }
          >
            {copy.heading}
          </h1>
          <p
            className={
              'mt-3 max-w-2xl text-offline/75 ' +
              (bookingIntent ? 'text-base lg:mt-2 lg:text-[17px]' : 'mt-5 text-lg lg:text-xl')
            }
          >
            {copy.body}
          </p>
        </motion.header>

        <div
          className={
            'grid gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-8 ' +
            (bookingIntent ? 'mt-8 lg:mt-8 lg:items-start' : 'mt-12 lg:mt-16 lg:min-h-0')
          }
        >
          {/* Contact channels */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewConfig}
            transition={{ duration: 0.7, ease: entranceEase, delay: 0.1 }}
            className={bookingIntent ? 'lg:col-span-5 lg:flex lg:min-h-0 lg:flex-col' : 'lg:col-span-5'}
          >
            <div
              className={
                'rounded-[var(--radius-l)] border border-offline/10 bg-white/70 shadow-[0_20px_50px_rgba(0,0,0,0.06)] backdrop-blur-[6px] ' +
                (bookingIntent
                  ? 'flex flex-col p-5 lg:min-h-0 lg:flex-1 lg:self-stretch lg:p-6'
                  : 'p-6 lg:p-8')
              }
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-offline/55">
                Direct line
              </p>
              <h2 className="mt-2 font-heading text-h2 font-black text-offline lg:mt-2">
                Talk to a human.
              </h2>
              <p
                className={
                  'mt-2 text-offline/70 ' +
                  (bookingIntent ? 'line-clamp-2 text-sm' : 'text-base')
                }
              >
                Prefer a quick reply? Every option below lands in the same inbox and usually gets answered within the hour.
              </p>

              <ul className={`${bookingIntent ? 'mt-5 space-y-2.5' : 'mt-8 space-y-4'}`}>
                <li>
                  <a
                    href={`tel:${PHONE_DIAL}`}
                    className={`group flex items-center gap-4 rounded-[var(--radius-l)] border border-offline/10 bg-gridglow tr-ease hover:-translate-y-0.5 hover:border-offline/30 hover:bg-white ${bookingIntent ? 'p-3' : 'p-4'}`}
                    style={{ '--duration': '250ms' }}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-offline text-gridglow">
                      <FiPhone className="text-xl" aria-hidden />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-semibold uppercase tracking-[0.14em] text-offline/55">
                        Phone
                      </span>
                      <span className="block text-base font-semibold text-offline">
                        {PHONE_DISPLAY}
                      </span>
                      <span className="block text-sm text-offline/60">
                        Call us for immediate assistance
                      </span>
                    </span>
                    <FiArrowUpRight className="text-xl text-offline/50 tr-ease group-hover:text-hottake" style={{ '--duration': '250ms' }} />
                  </a>
                </li>

                <li>
                  <a
                    href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                      'HiveSurf enquiry',
                    )}&body=${encodeURIComponent(
                      'Hi HiveSurf,\n\nI found you via the website and would like to discuss working together.\n\nThanks!',
                    )}`}
                    className={`group flex items-center gap-4 rounded-[var(--radius-l)] border border-offline/10 bg-gridglow tr-ease hover:-translate-y-0.5 hover:border-offline/30 hover:bg-white ${bookingIntent ? 'p-3' : 'p-4'}`}
                    style={{ '--duration': '250ms' }}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-hottake text-gridglow">
                      <FiMail className="text-xl" aria-hidden />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-semibold uppercase tracking-[0.14em] text-offline/55">
                        Email
                      </span>
                      <span className="block text-base font-semibold text-offline">{EMAIL}</span>
                      <span className="block text-sm text-offline/60">Drop us a line anytime</span>
                    </span>
                    <FiArrowUpRight className="text-xl text-offline/50 tr-ease group-hover:text-hottake" style={{ '--duration': '250ms' }} />
                  </a>
                </li>

                <li>
                  <a
                    href={hiveWhatsAppHref(intent === 'demo' ? 'videoStartFree' : 'heroCampaign')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-4 rounded-[var(--radius-l)] border border-[#25D366]/40 bg-[#25D366]/10 tr-ease hover:-translate-y-0.5 hover:border-[#25D366] hover:bg-[#25D366]/15 ${bookingIntent ? 'p-3' : 'p-4'}`}
                    style={{ '--duration': '250ms' }}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366] text-white">
                      <FaWhatsapp className="text-2xl" aria-hidden />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-semibold uppercase tracking-[0.14em] text-offline/60">
                        WhatsApp
                      </span>
                      <span className="block text-base font-semibold text-offline">
                        {PHONE_DISPLAY}
                      </span>
                      <span className="block text-sm text-offline/60">
                        Quick chat with prefilled message
                      </span>
                    </span>
                    <FiArrowUpRight className="text-xl text-offline/50 tr-ease group-hover:text-[#128C7E]" style={{ '--duration': '250ms' }} />
                  </a>
                </li>
              </ul>

              <div
                className={
                  'rounded-[var(--radius-l)] border border-offline/15 bg-offline text-gridglow ' +
                  (bookingIntent ? 'mt-4 p-4 lg:mt-5' : 'mt-8 p-6')
                }
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gridglow/60">
                  Why teams pick HiveSurf
                </p>
                <p className={`font-heading font-black ${bookingIntent ? 'mt-2 text-base lg:text-lg' : 'mt-3 text-xl'}`}>
                  Creator-first. Measurement native. Zero fluff.
                </p>
                <p className={`text-gridglow/75 ${bookingIntent ? 'mt-1 text-xs' : 'mt-2 text-sm'}`}>
                  Rated 5.0 by the brands shipping campaigns with us this quarter.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Calendly panel */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewConfig}
            transition={{ duration: 0.7, ease: entranceEase, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div
              className={
                'relative rounded-[var(--radius-l)] border border-offline/10 bg-white/75 shadow-[0_20px_50px_rgba(0,0,0,0.06)] backdrop-blur-[6px] ' +
                (bookingIntent ? 'p-5 lg:p-6' : 'overflow-hidden p-6 lg:p-8')
              }
            >
              <div className={`flex shrink-0 items-start justify-between gap-4 ${bookingIntent ? '' : 'gap-6'}`}>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-offline/55">
                    Book your strategy call
                  </p>
                  <h2
                    className={
                      'font-heading font-black text-offline ' +
                      (bookingIntent ? 'mt-1.5 text-xl lg:text-2xl' : 'mt-3 text-h2')
                    }
                  >
                    30-minute meeting.
                  </h2>
                  <p
                    className={
                      'max-w-xl text-offline/70 ' +
                      (bookingIntent ? 'mt-2 line-clamp-2 text-sm lg:text-[15px]' : 'mt-3 text-base')
                    }
                  >
                    Schedule a session to plan your Influencer Marketing or Software Development roadmap.
                  </p>
                </div>
                <span className="hidden h-12 w-12 flex-none items-center justify-center rounded-xl bg-hottake text-gridglow sm:flex">
                  <FiCalendar className="text-xl" aria-hidden />
                </span>
              </div>

              {!bookingIntent && (
                <ul className="mt-6 grid shrink-0 gap-3 sm:grid-cols-2">
                  {[
                    'Influencer campaign or product scope review',
                    'Creator-fit & feature-priority recommendations',
                    'Timeline, budget, and delivery plan',
                    'No-obligation consultation',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-[var(--radius-l)] border border-offline/10 bg-gridglow p-3"
                    >
                      <FiCheckCircle className="mt-0.5 flex-none text-hottake" aria-hidden />
                      <span className="text-sm text-offline/75">{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div
                className={
                  'calendly-booking-widget mt-4 w-full min-w-[280px] rounded-[var(--radius-l)] border border-offline/10 bg-white sm:min-w-[320px] ' +
                  (bookingIntent ? 'lg:mt-5' : 'mt-6')
                }
                style={{ minWidth: 280, minHeight: CALENDLY_MIN_HEIGHT, height: calHeight }}
              >
                <InlineWidget
                  url={HIVE_CALENDLY_URL}
                  styles={{ height: `${calHeight}px`, width: '100%', minWidth: '280px' }}
                  pageSettings={{
                    backgroundColor: 'ffffff',
                    hideEventTypeDetails: false,
                    hideLandingPageDetails: false,
                    primaryColor: 'fe3f00',
                    textColor: '000000',
                  }}
                />
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  )
}

export default ContactUsPage
