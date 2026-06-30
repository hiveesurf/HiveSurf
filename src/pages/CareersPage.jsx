import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Briefcase, ChevronRight, Clock, IndianRupee, MapPin, X, Mail, MessageCircle } from 'lucide-react'
import '../styles/enterprise.css'
import EnterpriseHeader from '../components/enterprise/EnterpriseHeader'
import EnterpriseFooter from '../components/enterprise/EnterpriseFooter'
import { getOpenRole, getOpenRoles } from '../data/careers'
import {
  buildApplicationSubject,
  buildCareerApplicationMessage,
  CV_ATTACH_NOTE,
  submitViaEmailWithCv,
  submitViaWhatsAppWithCv,
} from '../lib/careerApplication'

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  experience: '0–1 Year',
  bilingual: false,
  about: '',
}

const JobStatusBadge = ({ status }) => {
  if (status === 'open') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
        Open
      </span>
    )
  }

  return (
    <span className="inline-flex items-center rounded-md border border-[var(--ent-border)] bg-[var(--ent-bg-alt)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--ent-text-muted)]">
      Closed
    </span>
  )
}

const JobMeta = ({ icon: Icon, label, value }) => (
  <div className="rounded-lg border border-[var(--ent-border)] bg-[var(--ent-bg-alt)]/60 px-3 py-2.5">
    <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ent-text-muted)]">{label}</p>
    <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold leading-snug text-[var(--ent-text-heading)]">
      <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--ent-accent)]" />
      <span>{value}</span>
    </p>
  </div>
)

const CareersIntro = () => (
  <motion.header
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="max-w-3xl"
  >
    <p className="ent-kicker">Careers at HiveSurf</p>
    <h1 className="ent-heading-lg mt-3">Build with us. Grow with us.</h1>
    <p className="ent-body-lg mt-4">
      Join a small, fast-moving team where you work directly with founders and learn real digital growth — not theory.
    </p>
  </motion.header>
)

const JobListView = ({ jobs, onSelectJob }) => (
  <motion.section
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-10"
  >
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-[var(--ent-text-heading)]">Open positions</h2>
      <p className="mt-1 text-sm text-[var(--ent-text-muted)]">
        {jobs.length} {jobs.length === 1 ? 'role' : 'roles'} currently hiring
      </p>
    </div>

    <ul className="grid max-w-3xl gap-5">
      {jobs.map((job) => (
        <li key={job.id}>
          <button
            type="button"
            onClick={() => onSelectJob(job.id)}
            className="group block w-full overflow-hidden rounded-xl border border-[var(--ent-border)] bg-white text-left shadow-[0_2px_12px_rgba(8,8,80,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--ent-primary)]/25 hover:shadow-[0_12px_32px_rgba(8,8,80,0.08)]"
          >
            <div className="border-l-4 border-l-emerald-500 px-5 py-5 sm:px-6 sm:py-6">
              <div className="flex flex-wrap items-center gap-2">
                <JobStatusBadge status={job.status} />
                <span className="rounded-md bg-[var(--ent-bg-alt)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--ent-primary)]">
                  {job.category}
                </span>
              </div>

              <h3 className="ent-display mt-4 text-xl font-bold leading-snug text-[var(--ent-text-heading)] sm:text-[1.35rem]">
                {job.title}
              </h3>
              <p className="mt-1.5 text-sm text-[var(--ent-text-muted)]">{job.department}</p>

              <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {[
                  { icon: MapPin, label: 'Location', value: job.location },
                  { icon: Briefcase, label: 'Type', value: job.type },
                  { icon: Clock, label: 'Experience', value: job.experience },
                  { icon: IndianRupee, label: 'Salary', value: job.salary },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="rounded-lg border border-[var(--ent-border)] bg-[var(--ent-bg-alt)]/60 px-3 py-2.5"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ent-text-muted)]">
                      {label}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs font-semibold leading-snug text-[var(--ent-text-heading)] sm:text-sm">
                      <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--ent-accent)]" />
                      <span className="line-clamp-2">{value}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-[var(--ent-border)] bg-[var(--ent-bg-alt)]/40 px-5 py-3.5 sm:px-6">
              <span className="text-xs text-[var(--ent-text-muted)]">Click to read full job description</span>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--ent-primary)]">
                View job
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </button>
        </li>
      ))}
    </ul>
  </motion.section>
)

const JobDetailView = ({ job, onBack, onApply }) => (
  <motion.article
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-8 max-w-3xl"
  >
    <button
      type="button"
      onClick={onBack}
      className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ent-text-muted)] transition-colors hover:text-[var(--ent-primary)]"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to all jobs
    </button>

    <div className="mt-6 overflow-hidden rounded-xl border border-[var(--ent-border)] bg-white shadow-[0_2px_12px_rgba(8,8,80,0.04)]">
      <div className="border-l-4 border-l-emerald-500 px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex flex-wrap items-center gap-2">
          <JobStatusBadge status={job.status} />
          <span className="rounded-md bg-[var(--ent-bg-alt)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--ent-primary)]">
            {job.category}
          </span>
        </div>

        <h2 className="ent-display mt-4 text-2xl font-bold leading-snug text-[var(--ent-text-heading)] sm:text-[1.65rem]">
          {job.title}
        </h2>
        <p className="mt-1.5 text-sm text-[var(--ent-text-muted)]">
          <span className="font-semibold text-[var(--ent-text-heading)]">Department:</span> {job.department}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <JobMeta icon={MapPin} label="Location" value={job.location} />
          <JobMeta icon={Briefcase} label="Job type" value={job.type} />
          <JobMeta icon={Clock} label="Experience" value={job.experience} />
          <JobMeta icon={IndianRupee} label="Salary" value={job.salary} />
        </div>
      </div>

      <div className="space-y-8 border-t border-[var(--ent-border)] px-5 py-6 sm:px-6 sm:py-7">
        <section>
          <h3 className="text-base font-bold text-[var(--ent-text-heading)]">Job overview</h3>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-[var(--ent-text-muted)]">{job.overview}</p>
        </section>

        <section>
          <h3 className="text-base font-bold text-[var(--ent-text-heading)]">What will you do at HiveSurf</h3>
          <ul className="mt-4 space-y-2.5">
            {job.responsibilities.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-[var(--ent-text-muted)]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ent-accent)]" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-base font-bold text-[var(--ent-text-heading)]">What we offer</h3>
          <ul className="mt-4 space-y-2.5">
            {job.offers.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-[var(--ent-text-muted)]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ent-primary)]" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-base font-bold text-[var(--ent-text-heading)]">Requirements</h3>
          <ul className="mt-4 space-y-2.5">
            {job.requirements.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-[var(--ent-text-muted)]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ent-accent)]" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="border-t border-[var(--ent-border)] bg-[var(--ent-bg-alt)]/40 px-5 py-4 sm:px-6">
        <button type="button" onClick={onApply} className="ent-btn-primary w-full sm:w-auto">
          Apply for this role
        </button>
      </div>
    </div>
  </motion.article>
)

const CareerApplicationForm = ({ job, onBack }) => {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [successSteps, setSuccessSteps] = useState(null)
  const [submitting, setSubmitting] = useState(null)

  const subject = useMemo(
    () => buildApplicationSubject(job, form.fullName || 'Applicant'),
    [job, form.fullName],
  )

  const message = useMemo(
    () => buildCareerApplicationMessage({ job, form }),
    [job, form],
  )

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setError('')
    setSuccessSteps(null)
  }

  const validate = () => {
    if (!form.fullName.trim()) return 'Please enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email address.'
    const digits = form.phone.replace(/\D/g, '')
    if (digits.length < 10) return 'Please enter a valid phone number.'
    if (!form.bilingual) return 'English & Hindi communication is mandatory for this role.'
    return ''
  }

  const handleEmailSubmit = async () => {
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      setSuccessSteps(null)
      return
    }

    setSubmitting('email')
    setError('')
    try {
      const result = await submitViaEmailWithCv({ subject, message })
      setSuccessSteps(result)
    } catch (submitError) {
      setError(submitError.message || 'Could not open Gmail. Please try again.')
    } finally {
      setSubmitting(null)
    }
  }

  const handleWhatsAppSubmit = async () => {
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      setSuccessSteps(null)
      return
    }

    setSubmitting('whatsapp')
    setError('')
    try {
      const result = await submitViaWhatsAppWithCv({ message })
      setSuccessSteps(result)
    } catch (submitError) {
      setError(submitError.message || 'Could not open WhatsApp. Please try again.')
    } finally {
      setSubmitting(null)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-xl border border-[var(--ent-border)] bg-white p-6 shadow-[0_2px_12px_rgba(8,8,80,0.04)] lg:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="ent-kicker">Apply now</p>
          <h3 className="ent-display mt-2 text-2xl font-bold text-[var(--ent-text-heading)]">{job.title}</h3>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--ent-border)] text-[var(--ent-text-muted)] hover:text-[var(--ent-primary)]"
          aria-label="Back to job details"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-[var(--ent-text-heading)]">Full name *</span>
          <input
            type="text"
            required
            value={form.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            className="w-full rounded-xl border border-[var(--ent-border)] bg-[var(--ent-bg-alt)] px-4 py-3 text-sm outline-none focus:border-[var(--ent-primary)]"
            placeholder="Your full name"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--ent-text-heading)]">Email *</span>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            className="w-full rounded-xl border border-[var(--ent-border)] bg-[var(--ent-bg-alt)] px-4 py-3 text-sm outline-none focus:border-[var(--ent-primary)]"
            placeholder="you@email.com"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--ent-text-heading)]">Phone *</span>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className="w-full rounded-xl border border-[var(--ent-border)] bg-[var(--ent-bg-alt)] px-4 py-3 text-sm outline-none focus:border-[var(--ent-primary)]"
            placeholder="10-digit mobile number"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--ent-text-heading)]">Location</span>
          <input
            type="text"
            value={form.location}
            onChange={(e) => updateField('location', e.target.value)}
            className="w-full rounded-xl border border-[var(--ent-border)] bg-[var(--ent-bg-alt)] px-4 py-3 text-sm outline-none focus:border-[var(--ent-primary)]"
            placeholder="City, state"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--ent-text-heading)]">Experience</span>
          <select
            value={form.experience}
            onChange={(e) => updateField('experience', e.target.value)}
            className="w-full rounded-xl border border-[var(--ent-border)] bg-[var(--ent-bg-alt)] px-4 py-3 text-sm outline-none focus:border-[var(--ent-primary)]"
          >
            <option value="0–1 Year">0–1 Year</option>
            <option value="Fresher">Fresher</option>
            <option value="1+ Year">1+ Year</option>
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-[var(--ent-text-heading)]">Why do you want to join HiveSurf?</span>
          <textarea
            rows={4}
            value={form.about}
            onChange={(e) => updateField('about', e.target.value)}
            className="w-full resize-y rounded-xl border border-[var(--ent-border)] bg-[var(--ent-bg-alt)] px-4 py-3 text-sm outline-none focus:border-[var(--ent-primary)]"
            placeholder="Tell us about your interest in digital marketing and content..."
          />
        </label>

        <label className="flex items-start gap-3 sm:col-span-2">
          <input
            type="checkbox"
            checked={form.bilingual}
            onChange={(e) => updateField('bilingual', e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-[var(--ent-border)] text-[var(--ent-primary)]"
          />
          <span className="text-sm text-[var(--ent-text-muted)]">
            I am comfortable communicating in both English and Hindi (mandatory for this role).
          </span>
        </label>

        <div className="rounded-xl border border-[var(--ent-border)] bg-[var(--ent-bg-alt)] px-4 py-3 sm:col-span-2">
          <p className="text-sm font-medium text-[var(--ent-text-heading)]">CV / Resume</p>
          <p className="mt-1 text-sm leading-relaxed text-[var(--ent-text-muted)]">
            {CV_ATTACH_NOTE} When you submit via Email or WhatsApp, attach your CV (PDF or Word) before sending.
          </p>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      {successSteps && (
        <div className="mt-4 rounded-xl border border-[var(--ent-border)] bg-[var(--ent-bg-alt)] px-4 py-4">
          <p className="text-sm font-semibold text-[var(--ent-text-heading)]">Next steps</p>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[var(--ent-text-muted)]">
            {successSteps.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          {successSteps.gmailUrl && (
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={successSteps.gmailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ent-btn-primary inline-flex !px-4 !py-2 !text-sm"
              >
                Open Gmail again
              </a>
              {successSteps.mailtoUrl && (
                <a href={successSteps.mailtoUrl} className="ent-btn-outline inline-flex !px-4 !py-2 !text-sm">
                  Use default mail app
                </a>
              )}
            </div>
          )}
        </div>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={handleEmailSubmit}
          disabled={submitting !== null}
          className="ent-btn-primary inline-flex w-full items-center justify-center gap-2 !py-3.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Mail className="h-4 w-4" />
          {submitting === 'email' ? 'Preparing email…' : 'Submit via Email'}
        </button>
        <button
          type="button"
          onClick={handleWhatsAppSubmit}
          disabled={submitting !== null}
          className="ent-btn-outline inline-flex w-full items-center justify-center gap-2 !py-3.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <MessageCircle className="h-4 w-4" />
          {submitting === 'whatsapp' ? 'Preparing WhatsApp…' : 'Submit via WhatsApp'}
        </button>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-[var(--ent-text-muted)]">
        Email opens Gmail with your message. WhatsApp opens with the same message. Please attach your CV in both cases before sending.
      </p>
    </motion.div>
  )
}

const CareersPageContent = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const jobs = getOpenRoles()

  const jobId = searchParams.get('job')
  const isApplyView = searchParams.get('apply') !== null
  const selectedJob = jobId ? getOpenRole(jobId) : null

  const view = isApplyView && selectedJob ? 'apply' : selectedJob ? 'detail' : 'list'

  useEffect(() => {
    if (jobId && !selectedJob) {
      navigate('/careers', { replace: true })
    }
  }, [jobId, selectedJob, navigate])

  useEffect(() => {
    if (view !== 'list') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [view, jobId])

  const goToList = () => navigate('/careers')
  const goToJob = (id) => navigate(`/careers?job=${id}`)
  const goToApply = () => navigate(`/careers?job=${jobId}&apply=1`)

  return (
    <>
      <CareersIntro />

      <AnimatePresence mode="wait">
        {view === 'list' && (
          <JobListView key="list" jobs={jobs} onSelectJob={goToJob} />
        )}

        {view === 'detail' && selectedJob && (
          <JobDetailView
            key={`detail-${selectedJob.id}`}
            job={selectedJob}
            onBack={goToList}
            onApply={goToApply}
          />
        )}

        {view === 'apply' && selectedJob && (
          <motion.div
            key={`apply-${selectedJob.id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 max-w-3xl"
          >
            <button
              type="button"
              onClick={() => goToJob(selectedJob.id)}
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ent-text-muted)] transition-colors hover:text-[var(--ent-primary)]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to job details
            </button>
            <div className="mt-6">
              <CareerApplicationForm job={selectedJob} onBack={() => goToJob(selectedJob.id)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const CareersPage = () => (
  <div className="enterprise-theme min-h-screen bg-[var(--ent-bg-alt)]">
    <EnterpriseHeader />
    <main className="ent-mesh ent-container pb-16 pt-[100px] lg:pb-20 lg:pt-[112px]">
      <CareersPageContent />
    </main>
    <EnterpriseFooter />
  </div>
)

export default CareersPage
