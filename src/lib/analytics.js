/**
 * Google Analytics 4 (gtag) — SPA-friendly helpers.
 * Set VITE_GA_MEASUREMENT_ID at build time (e.g. G-XXXXXXXXXX). If unset or invalid, no scripts load.
 */

const ID_PATTERN = /^G-[A-Z0-9]+$/i

export function getGaMeasurementId() {
  const id = import.meta.env.VITE_GA_MEASUREMENT_ID
  return typeof id === 'string' && ID_PATTERN.test(id.trim()) ? id.trim() : ''
}

let initialized = false

export function initGa4() {
  if (typeof window === 'undefined' || initialized) return
  const measurementId = getGaMeasurementId()
  if (!measurementId) return

  initialized = true

  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', measurementId, { send_page_view: false })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)
}

/**
 * SPA virtual page views (call on route changes).
 * @param {string} path e.g. /contact?foo=1
 */
export function trackPageView(path) {
  if (typeof window === 'undefined' || !window.gtag) return
  const measurementId = getGaMeasurementId()
  if (!measurementId) return

  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.origin + path,
    page_title: document.title,
    send_to: measurementId,
  })
}

export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined' || !window.gtag) return
  const measurementId = getGaMeasurementId()
  if (!measurementId) return
  window.gtag('event', eventName, { send_to: measurementId, ...params })
}
