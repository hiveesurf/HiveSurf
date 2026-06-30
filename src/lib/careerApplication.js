import { HIVE_LEAD_WHATSAPP_E164 } from './leadActions'

export const HIVE_CAREERS_EMAIL = 'connect@hivesurf.com'

export const CV_ATTACH_NOTE = 'Please attach your CV with this application.'

export function buildCareerApplicationMessage({ job, form }) {
  const lines = [
    'Hi HiveSurf Team,',
    '',
    `I would like to apply for the ${job.title} role (${job.category}).`,
    '',
    '--- Applicant Details ---',
    `Name: ${form.fullName.trim()}`,
    `Email: ${form.email.trim()}`,
    `Phone: ${form.phone.trim()}`,
    `Location: ${form.location.trim() || '—'}`,
    `Experience: ${form.experience}`,
    `English & Hindi: ${form.bilingual ? 'Yes' : 'No'}`,
    '',
    '--- About Me ---',
    form.about.trim() || '—',
    '',
    '--- Role ---',
    `Department: ${job.department}`,
    `Job Type: ${job.type}`,
    `Location: ${job.location}`,
    '',
    CV_ATTACH_NOTE,
    '',
    'Thanks,',
    form.fullName.trim(),
  ]

  return lines.join('\n')
}

export function buildApplicationSubject(job, fullName) {
  return `Job Application: ${job.title} — ${fullName.trim()}`
}

export function gmailComposeHref({ to, subject, body }) {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to,
    su: subject,
    body,
  })
  return `https://mail.google.com/mail/?${params.toString()}`
}

export function mailtoApplicationHref({ to, subject, body }) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function whatsAppApplicationHref(message) {
  return `https://wa.me/${HIVE_LEAD_WHATSAPP_E164}?text=${encodeURIComponent(message)}`
}

function openInNewTab(url) {
  const opened = window.open(url, '_blank', 'noopener,noreferrer')
  if (!opened) {
    window.location.href = url
  }
}

export async function submitViaEmailWithCv({ subject, message }) {
  const gmailUrl = gmailComposeHref({
    to: HIVE_CAREERS_EMAIL,
    subject,
    body: message,
  })

  openInNewTab(gmailUrl)

  return {
    method: 'gmail',
    gmailUrl,
    mailtoUrl: mailtoApplicationHref({ to: HIVE_CAREERS_EMAIL, subject, body: message }),
    steps: [
      'Gmail should open with your application message prefilled.',
      'Click the paperclip (Attach) icon and add your CV (PDF or Word).',
      `Send the email to ${HIVE_CAREERS_EMAIL}.`,
    ],
  }
}

export async function submitViaWhatsAppWithCv({ message }) {
  openInNewTab(whatsAppApplicationHref(message))

  return {
    method: 'whatsapp',
    steps: [
      'WhatsApp opened with your application message.',
      'Tap the attach (📎) button and add your CV (PDF or Word).',
      'Tap Send in WhatsApp.',
    ],
  }
}
