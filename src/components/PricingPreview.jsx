import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, CalendarDays, Mail, MessageCircle, Phone, Rocket, Target } from 'lucide-react';

const PLANS = [
  {
    name: 'Starter',
    price: '₹49,999',
    tag: 'Best for testing influencer marketing',
    cta: 'Start Small Campaign',
    enquiryKey: 'starter',
    points: [
      '5 niche-matched influencers',
      'Up to 100K followers each',
      '1 high-converting reel per creator',
      'Campaign goes live in 7 days',
    ],
  },
  {
    name: 'Growth',
    price: '₹1,49,999',
    tag: 'Most Popular',
    cta: 'Scale My Campaign',
    enquiryKey: 'growth',
    points: [
      '15 niche-matched influencers',
      'Reels + stories for higher reach',
      'Campaign strategy included',
      'Performance tracking (reach + engagement)',
      'Live in 7 days',
    ],
    featured: true,
  },
  {
    name: 'Scale',
    price: '₹4,99,999+',
    tag: 'For serious brands',
    cta: 'Book Strategy Call',
    enquiryKey: 'scale',
    points: [
      '50+ influencers across categories',
      'Full campaign execution',
      'Dedicated campaign manager',
      'Advanced ROI tracking',
      'Priority launch and support',
    ],
  },
];

function ButtonDrip({ left, height, delay, color = '#3b82f6' }) {
  const clipId = React.useId();

  return (
    <motion.div
      className="absolute top-[99%] origin-top pointer-events-none"
      style={{ left }}
      initial={{ scaleY: 0.75 }}
      animate={{ scaleY: [0.75, 1, 0.75] }}
      transition={{
        duration: 2,
        times: [0, 0.25, 1],
        delay,
        ease: 'easeIn',
        repeat: Infinity,
        repeatDelay: 2,
      }}
    >
      <div style={{ height, background: color }} className="w-2 rounded-b-full transition-colors" />
      <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-full top-0">
        <g clipPath={`url(#${clipId}-left)`}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
            style={{ fill: color }}
            className="transition-colors"
          />
        </g>
        <defs>
          <clipPath id={`${clipId}-left`}>
            <rect width="6" height="6" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-full top-0 rotate-90">
        <g clipPath={`url(#${clipId}-right)`}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
            style={{ fill: color }}
            className="transition-colors"
          />
        </g>
        <defs>
          <clipPath id={`${clipId}-right`}>
            <rect width="6" height="6" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <motion.div
        initial={{ y: -8, opacity: 1 }}
        animate={{ y: [-8, 50], opacity: [1, 0] }}
        transition={{
          duration: 2,
          times: [0, 1],
          delay,
          ease: 'easeIn',
          repeat: Infinity,
          repeatDelay: 2,
        }}
        className="absolute top-full h-2 w-2 rounded-full transition-colors"
        style={{ background: color }}
      />
    </motion.div>
  );
}

export default function PricingPreview() {
  const [headingFx, setHeadingFx] = React.useState({ x: 0, y: 0, active: false });
  const [selectedPlan, setSelectedPlan] = React.useState(null);
  const onHeadingMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setHeadingFx({ x: e.clientX - r.left, y: e.clientY - r.top, active: true });
  };
  const closeContactPopup = () => setSelectedPlan(null);

  const openContactOption = (type) => {
    if (!selectedPlan) return;

    const planDetails = selectedPlan.points.map((point) => `- ${point}`).join('\n');
    const planMessage = `Hi Hivesurf, I want to discuss your ${selectedPlan.name} plan (${selectedPlan.price}).

Plan details:
${planDetails}`;
    const encodedMessage = encodeURIComponent(planMessage);

    if (type === 'whatsapp') {
      window.open(`https://wa.me/919148561949?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
      closeContactPopup();
      return;
    }

    if (type === 'email') {
      window.location.href = `mailto:connect@hivesurf.com?subject=${encodeURIComponent(`${selectedPlan.name} Plan Enquiry`)}&body=${encodedMessage}`;
      closeContactPopup();
      return;
    }

    if (type === 'phone') {
      window.location.href = `tel:+919148561949`;
      closeContactPopup();
      return;
    }

    if (type === 'meeting') {
      window.location.href = `/contact?enquiry=pricing&plan=${selectedPlan.enquiryKey}&channel=meeting&price=${encodeURIComponent(selectedPlan.price)}`;
      closeContactPopup();
    }
  };

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center mb-12"
        >
          <div
            className="relative inline-block"
            onMouseMove={onHeadingMove}
            onMouseEnter={() => setHeadingFx((v) => ({ ...v, active: true }))}
            onMouseLeave={() => setHeadingFx((v) => ({ ...v, active: false }))}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Pricing</h2>
            <motion.h2
              aria-hidden="true"
              animate={{ opacity: headingFx.active ? 1 : 0 }}
              transition={{ duration: 0.15 }}
              className="pointer-events-none absolute inset-0 text-3xl md:text-4xl font-bold bg-[linear-gradient(90deg,#ef4444,#f59e0b,#eab308,#22c55e,#3b82f6,#a855f7,#ef4444)] bg-[length:220%_100%] bg-clip-text text-transparent"
              style={{
                WebkitMaskImage: `radial-gradient(100px circle at ${headingFx.x}px ${headingFx.y}px, #000 0%, rgba(0,0,0,0.82) 40%, transparent 75%)`,
                maskImage: `radial-gradient(100px circle at ${headingFx.x}px ${headingFx.y}px, #000 0%, rgba(0,0,0,0.82) 40%, transparent 75%)`,
              }}
            >
              Pricing
            </motion.h2>
          </div>
          <p className="mt-3 text-slate-600">Simple packages to match your growth stage.</p>
          <p className="mt-2 text-sm font-medium text-slate-700">
            Most campaigns fall between ₹50K-₹5L depending on scale.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              className={`rounded-2xl border p-6 transition-all ${
                plan.featured
                  ? 'scale-[1.03] border-blue-400 bg-blue-50 shadow-[0_28px_60px_-30px_rgba(37,99,235,0.6)]'
                  : 'border-slate-200 bg-white shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)] hover:shadow-[0_26px_55px_-28px_rgba(15,23,42,0.45)]'
              }`}
            >
              <div className="mb-3 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                {plan.tag}
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{plan.name}</h3>
              <p className="mt-2 text-2xl font-bold text-slate-900">{plan.price}</p>
              <ul className="mt-5 space-y-3 text-sm text-slate-700">
                {plan.points.map((point, pointIndex) => (
                  <li key={point} className="flex items-start gap-2">
                    {pointIndex % 3 === 0 ? (
                      <Target className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                    ) : pointIndex % 3 === 1 ? (
                      <BarChart3 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                    ) : (
                      <Rocket className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                    )}
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setSelectedPlan(plan)}
                className="group relative mt-6 inline-flex w-full items-center justify-center gap-2 overflow-visible rounded-xl bg-[#1d63ff] px-4 py-3 text-base font-semibold text-white shadow-[0_10px_24px_-16px_rgba(29,99,255,0.75)] transition-colors duration-300 hover:bg-[#1457f0]"
              >
                {plan.cta}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                <ButtonDrip left="20%" height={24} delay={0.5} />
                <ButtonDrip left="35%" height={20} delay={3} />
                <ButtonDrip left="50%" height={16} delay={4.25} />
                <ButtonDrip left="65%" height={20} delay={1.5} />
                <ButtonDrip left="80%" height={24} delay={2.5} />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-center text-sm font-medium text-emerald-900"
        >
          No long-term contracts. Transparent reporting. You approve influencers before launch.
        </motion.div>
      </div>

      {selectedPlan && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-900/45 px-4" onClick={closeContactPopup}>
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.22 }}
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-slate-900">Contact for {selectedPlan.name} Plan</h3>
            <p className="mt-2 text-sm text-slate-600">
              Choose one option and we will continue with your {selectedPlan.name.toLowerCase()} plan enquiry.
            </p>
            <div className="mt-5 grid gap-3">
              <button
                type="button"
                onClick={() => openContactOption('whatsapp')}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </button>
              <button
                type="button"
                onClick={() => openContactOption('email')}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-200"
              >
                <Mail className="h-4 w-4" />
                Email
              </button>
              <button
                type="button"
                onClick={() => openContactOption('phone')}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-200"
              >
                <Phone className="h-4 w-4" />
                Phone
              </button>
              <button
                type="button"
                onClick={() => openContactOption('meeting')}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                <CalendarDays className="h-4 w-4" />
                Set Up Meeting
              </button>
            </div>
            <button
              type="button"
              onClick={closeContactPopup}
              className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
}
