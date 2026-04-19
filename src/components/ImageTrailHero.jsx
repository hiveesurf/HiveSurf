import React from "react";
import { motion } from "framer-motion";

export const ImageTrailHero = () => {
  return (
    <section className="relative h-screen overflow-hidden bg-slate-200">
      <Copy />
      <WatermarkWrapper />
    </section>
  );
};

const Copy = () => {
  return (
  <div className="absolute top-36 md:top-44 left-0 right-0 z-10">

      <div className="mx-auto grid max-w-7xl items-end gap-8 p-4 md:grid-cols-[minmax(0,1fr)_390px] md:p-8">
        <div>
          <h1 className="mb-6 max-w-5xl text-5xl font-black leading-[1.05] text-slate-900 md:text-7xl">
            Launch Influencer Campaigns in 7 Days. Drive Real ROI.
          </h1>
          <p className="max-w-xl text-slate-700 md:text-lg">
            We don&apos;t chase views. We run performance-driven campaigns that generate reach, engagement, and real conversions.
          </p>
          <div className="mt-15 flex flex-wrap gap-3">
            <a
              href="#our-services"
              className="group relative inline-flex items-center space-x-2 overflow-visible rounded-xl bg-blue-600 px-6 py-3.5 text-lg font-semibold text-white shadow-md transition-colors duration-300 hover:bg-blue-700"
            >
              Get Free Influencer Plan
              <ButtonDrip left="20%" height={24} delay={0.5} />
              <ButtonDrip left="35%" height={20} delay={3} />
              <ButtonDrip left="50%" height={16} delay={4.25} />
              <ButtonDrip left="65%" height={20} delay={1.5} />
              <ButtonDrip left="80%" height={24} delay={2.5} />
            </a>
            <a
              href="/contact"
              className="group relative inline-flex items-center space-x-2 overflow-visible rounded-xl bg-blue-600 px-6 py-3.5 text-lg font-semibold text-white shadow-md transition-colors duration-300 hover:bg-blue-700"
            >
              Book Free Strategy Call
              <ButtonDrip left="20%" height={24} delay={0.5} />
              <ButtonDrip left="35%" height={20} delay={3} />
              <ButtonDrip left="50%" height={16} delay={4.25} />
              <ButtonDrip left="65%" height={20} delay={1.5} />
              <ButtonDrip left="80%" height={24} delay={2.5} />
            </a>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
          className="hidden rounded-2xl border border-slate-300/80 bg-white/80 p-5 shadow-[0_18px_45px_-28px_rgba(15,23,42,0.45)] backdrop-blur-sm md:block"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Campaign analytics preview</p>
          <h3 className="mt-2 text-lg font-bold text-slate-900">Launch Snapshot</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-100 p-3">
              <p className="text-[11px] uppercase tracking-wide text-slate-500">Reach</p>
              <p className="mt-1 text-xl font-bold text-slate-900">2.1M</p>
            </div>
            <div className="rounded-xl bg-slate-100 p-3">
              <p className="text-[11px] uppercase tracking-wide text-slate-500">Engagement</p>
              <p className="mt-1 text-xl font-bold text-slate-900">95K</p>
            </div>
            <div className="rounded-xl bg-slate-100 p-3">
              <p className="text-[11px] uppercase tracking-wide text-slate-500">ROI</p>
              <p className="mt-1 text-xl font-bold text-emerald-600">2.4x</p>
            </div>
            <div className="rounded-xl bg-slate-100 p-3">
              <p className="text-[11px] uppercase tracking-wide text-slate-500">Go Live</p>
              <p className="mt-1 text-xl font-bold text-blue-700">7 days</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

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

const WatermarkWrapper = () => {
  return (
    <>
      <Watermark text="Social Media" />
      <Watermark text="Content Creation" reverse />
      <Watermark text="Digital Marketing" />
      <Watermark text="Brand Strategy" reverse />
      <Watermark text="Innovation" />
      <Watermark text="Your Social Hive" reverse />
    </>
  );
};

const Watermark = ({ reverse, text }) => (
  <div className="flex -translate-y-12 select-none overflow-hidden">
    <TranslateWrapper reverse={reverse}>
      <span className="w-fit whitespace-nowrap text-[20vmax] font-black uppercase leading-[0.75] text-slate-300">
        {text}
      </span>
    </TranslateWrapper>
    <TranslateWrapper reverse={reverse}>
      <span className="ml-48 w-fit whitespace-nowrap text-[20vmax] font-black uppercase leading-[0.75] text-slate-300">
        {text}
      </span>
    </TranslateWrapper>
  </div>
);

const TranslateWrapper = ({ children, reverse }) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
      className="flex"
    >
      {children}
    </motion.div>
  );
};