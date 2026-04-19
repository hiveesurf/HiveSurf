/** HiveSurf lead actions — WhatsApp + contact / meeting deep links */

export const HIVE_LEAD_WHATSAPP_E164 = '917008310868'

export const hiveLeadMessages = {
  heroCampaign:
    "Hi HiveSurf,\n\nI'm writing from your website hero — I'd like to start a campaign.\n\nPlease share the next steps.\n\nThanks!",
  videoStartFree:
    "Hi HiveSurf,\n\nI'd like to start free / get access (from “Your next big campaign starts today.”).\n\nThanks!",
  badgeTrial:
    "Hi HiveSurf,\n\nI'd like to start a free trial (from “Ready to Surf the Digital Wave?”).\n\nThanks!",
  badgeSales:
    "Hi HiveSurf,\n\nI'd like to talk to sales (from “Ready to Surf the Digital Wave?”).\n\nThanks!",
  floatWidget:
    "Hi HiveSurf,\n\nI'm messaging from the floating WhatsApp button on your website.\n\nThanks!",
  footerContact:
    "Hi HiveSurf,\n\nI'm reaching out from the website footer.\n\nThanks!",
}

export function hiveWhatsAppHref(messageKey) {
  const body = hiveLeadMessages[messageKey] || hiveLeadMessages.floatWidget
  return `https://wa.me/${HIVE_LEAD_WHATSAPP_E164}?text=${encodeURIComponent(body)}`
}

export function hiveContactHref({ intent = 'meeting', source = 'website' }) {
  const q = new URLSearchParams()
  q.set('intent', intent)
  q.set('source', source)
  return `/contact?${q.toString()}`
}
