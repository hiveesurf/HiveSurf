import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, Users } from 'lucide-react';
import ServiceFormModal from './ServiceFormModal';

const SERVICE_SECTIONS = [
  {
    title: 'Influencer Growth Engine',
    label: 'Primary service',
    icon: Users,
    description:
      'We run end-to-end influencer campaigns focused on ROI, not just reach. 100+ creators across niches with fast execution in 7 days.',
    features: [
      'Creator selection based on your target audience',
      'Campaign execution within 7 days',
      'Performance tracking (reach, clicks, conversions)',
      'ROI-focused content strategy',
    ],
    buttonText: 'Start Influencer Campaign',
    metric: 'Campaign-ready in 7 days',
    accent: 'from-cyan-500/20 via-blue-500/10 to-purple-500/20',
    videos: [
      'https://cdn.jsdelivr.net/gh/theoderiic/adc-ugc-videos@main/_F_YYMTbd5dbWzaX81sEo_output.webm',
      'https://cdn.jsdelivr.net/gh/theoderiic/adc-ugc-videos@main/_Q6Cd9JCUoLshrLu5xH0Z_output.webm',
      'https://cdn.jsdelivr.net/gh/theoderiic/adc-ugc-videos@main/output%20(16).webm',
    ],
  },
];

function VideoReel({ src }) {
  const [showFallback, setShowFallback] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-300/70 bg-white shadow-[0_18px_45px_-24px_rgba(15,23,42,0.5)]">
      {!showFallback ? (
        <video
          src={src}
          className="h-full w-full aspect-[9/16] object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setShowFallback(true)}
        />
      ) : (
        <div className="h-full w-full aspect-[9/16] bg-gradient-to-br from-slate-200 via-slate-100 to-white flex items-center justify-center">
          <span className="text-xs uppercase tracking-widest text-slate-500">Video</span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 to-transparent" />
    </div>
  );
}

function Drip({ left, height, delay, color = '#ffffff', width = 10 }) {
  const clipId = React.useId();

  return (
    <motion.div
      className="absolute top-[99%] origin-top pointer-events-none"
      style={{ left }}
      initial={{ scaleY: 0.75 }}
      animate={{ scaleY: [0.75, 1, 0.75] }}
      transition={{
        duration: 2.4,
        times: [0, 0.25, 1],
        delay,
        ease: 'easeIn',
        repeat: Infinity,
      }}
    >
      <div
        style={{ height, width, background: color }}
        className="rounded-b-full transition-colors"
      />
      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-full top-0"
      >
        <g clipPath={`url(#${clipId}-left)`}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.2 0H0V7.2C0 3.22353 3.22353 0 7.2 0Z"
            style={{ fill: color }}
            className="transition-colors"
          />
        </g>
        <defs>
          <clipPath id={`${clipId}-left`}>
            <rect width="8" height="8" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-full top-0 rotate-90"
      >
        <g clipPath={`url(#${clipId}-right)`}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.2 0H0V7.2C0 3.22353 3.22353 0 7.2 0Z"
            style={{ fill: color }}
            className="transition-colors"
          />
        </g>
        <defs>
          <clipPath id={`${clipId}-right`}>
            <rect width="8" height="8" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <motion.div
        initial={{ y: -8, opacity: 1 }}
        animate={{ y: [-8, 50], opacity: [1, 0] }}
        transition={{
          duration: 2.2,
          times: [0, 1],
          delay: delay + 0.15,
          ease: 'easeIn',
          repeat: Infinity,
        }}
        style={{ background: color }}
        className="absolute top-full left-1/2 -translate-x-1/2 h-3 w-3 rounded-full transition-colors"
      />
    </motion.div>
  );
}

function ButtonDrip({ left, height, delay, color = '#ffffff' }) {
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
      <div
        style={{ height, background: color }}
        className="w-2 rounded-b-full transition-colors"
      />
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-full top-0"
      >
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
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-full top-0 rotate-90"
      >
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
        style={{ background: color }}
        className="absolute top-full h-2 w-2 rounded-full transition-colors"
      />
    </motion.div>
  );
}

function MetricRibbon({ text }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-700 shadow-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
      <span>{text}</span>
    </div>
  );
}

function ServiceShowcaseSection({ section, index, onOpenModal }) {
  const Icon = section.icon;
  const [activeImage, setActiveImage] = useState(0);
  const [activeVideo, setActiveVideo] = useState(0);

  const hasImages = Array.isArray(section.images) && section.images.length > 0;
  const hasVideos = Array.isArray(section.videos) && section.videos.length > 0;
  const nextImage = () => {
    if (!hasImages) return;
    setActiveImage((i) => (i + 1) % section.images.length);
  };
  const prevImage = () => {
    if (!hasImages) return;
    setActiveImage((i) => (i - 1 + section.images.length) % section.images.length);
  };
  const isInfluencer = section.title === 'Influencer Growth Engine';
  const buttonDripColor = '#3b82f6';

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
      className={`relative overflow-hidden rounded-3xl p-6 md:p-8 lg:p-10 ${
        isInfluencer
          ? 'border border-slate-400 bg-[#eef1f5] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_22px_50px_-30px_rgba(15,23,42,0.35)]'
          : 'border border-slate-200 bg-white shadow-[0_20px_60px_-30px_rgba(15,23,42,0.16)]'
      }`}
    >
      {isInfluencer && (
        <>
          <Drip left="8%" height={34} delay={0.35} color="#f8fafc" width={12} />
          <Drip left="24%" height={22} delay={1.15} color="#f8fafc" width={10} />
          <Drip left="41%" height={30} delay={0.75} color="#f8fafc" width={11} />
          <Drip left="57%" height={20} delay={1.65} color="#f8fafc" width={10} />
          <Drip left="73%" height={28} delay={1.3} color="#f8fafc" width={11} />
          <Drip left="89%" height={24} delay={0.55} color="#f8fafc" width={10} />
        </>
      )}
      <div
        className={`relative grid gap-8 items-center ${
          isInfluencer
            ? 'lg:grid-cols-[minmax(0,68%)_1fr]'
            : 'lg:grid-cols-[minmax(0,32%)_1fr]'
        }`}
      >
        {isInfluencer ? (
          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="relative h-[500px] sm:h-[590px]">
              {hasVideos &&
                section.videos.length > 0 &&
                [0, 1, 2].map((slot) => {
                  const videoCount = section.videos.length;
                  const slotOffsets = [-1, 0, 1];
                  const targetIndex =
                    (activeVideo + slotOffsets[slot] + videoCount) % videoCount;
                  const slotStyles = [
                    {
                      className:
                        'left-4 sm:left-10 top-36 z-10 w-[40%] rotate-[-10deg] cursor-pointer',
                      scale: 0.92,
                    },
                    {
                      className:
                        'left-1/2 -translate-x-1/2 top-16 z-20 w-[48%]',
                      scale: 1,
                    },
                    {
                      className:
                        'right-4 sm:right-10 top-36 z-10 w-[40%] rotate-[10deg] cursor-pointer',
                      scale: 0.92,
                    },
                  ];
                  const style = slotStyles[slot];

                  return (
                    <motion.div
                      key={`slot-${slot}`}
                      layout
                      initial={false}
                      animate={{ scale: style.scale, y: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className={`absolute ${style.className}`}
                      onClick={() => setActiveVideo(targetIndex)}
                    >
                      <VideoReel src={section.videos[targetIndex]} />
                    </motion.div>
                  );
                })}
            </div>
            {hasVideos && section.videos.length > 1 && (
              <>
                <div className="mt-4 flex justify-center gap-2">
                  {section.videos.map((_, dotIndex) => (
                    <span
                      key={dotIndex}
                      className={`h-1.5 rounded-full transition-all ${dotIndex === activeVideo ? 'w-5 bg-slate-800' : 'w-1.5 bg-slate-300'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="relative mx-auto w-full max-w-[500px]">
            <motion.img
              key={section.images?.[activeImage] || 'software-image'}
              src={section.images?.[activeImage]}
              alt={`Software visual ${activeImage + 1}`}
              loading="lazy"
              initial={{ opacity: 0.5, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="aspect-square w-full rounded-2xl border border-slate-200 bg-white object-cover shadow-[0_24px_60px_-30px_rgba(15,23,42,0.35)]"
            />

            {hasImages && section.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-md transition hover:bg-white"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-md transition hover:bg-white"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
                <div className="mt-4 flex justify-center gap-2">
                  {section.images.map((_, dotIndex) => (
                    <span
                      key={dotIndex}
                      className={`h-1.5 rounded-full transition-all ${dotIndex === activeImage ? 'w-5 bg-slate-800' : 'w-1.5 bg-slate-300'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/35 bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-wider text-cyan-700">
            <Sparkles className="h-3.5 w-3.5" />
            {section.label}
          </div>
          <div className="relative mt-4 flex items-center gap-3">
            <Icon className="h-7 w-7 text-cyan-600" />
            <h3 className="text-[2rem] md:text-[2.35rem] font-bold tracking-tight text-slate-900 whitespace-nowrap leading-none">
              {section.title}
            </h3>
          </div>
          <p className="mt-4 max-w-2xl text-slate-600 leading-relaxed">
            {section.description}
          </p>
          <ul className="mt-6 space-y-3">
            {section.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-slate-700 whitespace-nowrap">
                <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-cyan-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-5 md:gap-7">
            <MetricRibbon text={section.metric} />
            <button
              onClick={() => onOpenModal({ title: section.title, description: section.description })}
              className="group relative inline-flex items-center space-x-2 overflow-visible rounded-xl bg-blue-600 px-6 py-3.5 text-lg font-semibold text-white shadow-md transition-colors duration-300 hover:bg-blue-700"
            >
              {section.buttonText}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              <>
                <ButtonDrip left="20%" height={24} delay={0.5} color={buttonDripColor} />
                <ButtonDrip left="35%" height={20} delay={3} color={buttonDripColor} />
                <ButtonDrip left="50%" height={16} delay={4.25} color={buttonDripColor} />
                <ButtonDrip left="65%" height={20} delay={1.5} color={buttonDripColor} />
                <ButtonDrip left="80%" height={24} delay={2.5} color={buttonDripColor} />
              </>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [headingFx, setHeadingFx] = useState({ x: 0, y: 0, active: false });

  if (typeof window !== 'undefined') {
    window.__HIVESURF_SERVICES__ = SERVICE_SECTIONS.map((s) => s.title);
  }

  const handleOpenModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const onHeadingMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setHeadingFx({ x: e.clientX - r.left, y: e.clientY - r.top, active: true });
  };

  return (
    <section className="relative py-20 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:56px_56px]" />
      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center mb-14"
        >
          <div
            className="relative inline-block"
            onMouseMove={onHeadingMove}
            onMouseEnter={() => setHeadingFx((v) => ({ ...v, active: true }))}
            onMouseLeave={() => setHeadingFx((v) => ({ ...v, active: false }))}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">What We Actually Do</h2>
            <motion.h2
              aria-hidden="true"
              animate={{ opacity: headingFx.active ? 1 : 0 }}
              transition={{ duration: 0.15 }}
              className="pointer-events-none absolute inset-0 text-4xl md:text-5xl font-bold tracking-tight bg-[linear-gradient(90deg,#ef4444,#f59e0b,#eab308,#22c55e,#3b82f6,#a855f7,#ef4444)] bg-[length:220%_100%] bg-clip-text text-transparent"
              style={{
                WebkitMaskImage: `radial-gradient(100px circle at ${headingFx.x}px ${headingFx.y}px, #000 0%, rgba(0,0,0,0.8) 40%, transparent 75%)`,
                maskImage: `radial-gradient(100px circle at ${headingFx.x}px ${headingFx.y}px, #000 0%, rgba(0,0,0,0.8) 40%, transparent 75%)`,
              }}
            >
              What We Actually Do
            </motion.h2>
          </div>
          <p className="mt-4 text-lg text-slate-600">
            Clear execution services built to drive measurable growth, not vanity metrics.
          </p>
        </motion.div>

        <div className="space-y-10">
          {SERVICE_SECTIONS.map((section, index) => (
            <ServiceShowcaseSection
              key={section.title}
              section={section}
              index={index}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>
      </div>

      <ServiceFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedService={selectedService}
      />
    </section>
  );
};

export default Services;