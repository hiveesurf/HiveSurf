import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';

const Testimonials = () => {
  const [headingFx, setHeadingFx] = React.useState({ x: 0, y: 0, active: false });
  const [activeIndex, setActiveIndex] = React.useState(0);
  const caseStudies = [
    {
      brand: 'D2C Skincare',
      campaign: 'Instagram Campaign',
      spend: '₹80,000',
      reach: '2.1M',
      engagement: '95K',
      result: '2.4x ROI',
      timeline: 'Results achieved in 14 days',
    },
    {
      brand: 'Fit Nutrition Brand',
      campaign: 'Reels Campaign',
      spend: '₹1.2L',
      reach: '3.5M',
      engagement: '132K',
      result: '2.1x ROI',
      timeline: 'Results achieved in 14 days',
    },
    {
      brand: 'Beauty Commerce Label',
      campaign: 'Creator Mix Campaign',
      spend: '₹95,000',
      reach: '2.8M',
      engagement: '110K',
      result: '2.0x ROI',
      timeline: 'Results achieved in 14 days',
    },
  ];

  const onHeadingMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setHeadingFx({ x: e.clientX - r.left, y: e.clientY - r.top, active: true });
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % caseStudies.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [caseStudies.length]);

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div
            className="relative inline-block mb-6"
            onMouseMove={onHeadingMove}
            onMouseEnter={() => setHeadingFx((v) => ({ ...v, active: true }))}
            onMouseLeave={() => setHeadingFx((v) => ({ ...v, active: false }))}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              What Our Clients Say
            </h2>
            <motion.h2
              aria-hidden="true"
              animate={{ opacity: headingFx.active ? 1 : 0 }}
              transition={{ duration: 0.15 }}
              className="pointer-events-none absolute inset-0 text-4xl md:text-5xl font-bold bg-[linear-gradient(90deg,#ef4444,#f59e0b,#eab308,#22c55e,#3b82f6,#a855f7,#ef4444)] bg-[length:220%_100%] bg-clip-text text-transparent"
              style={{
                WebkitMaskImage: `radial-gradient(100px circle at ${headingFx.x}px ${headingFx.y}px, #000 0%, rgba(0,0,0,0.82) 40%, transparent 75%)`,
                maskImage: `radial-gradient(100px circle at ${headingFx.x}px ${headingFx.y}px, #000 0%, rgba(0,0,0,0.82) 40%, transparent 75%)`,
              }}
            >
              What Our Clients Say
            </motion.h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real campaign snapshots. Metrics first, opinions second.
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          <div className="relative h-[370px] sm:h-[360px]">
            {caseStudies.map((study, index) => {
              const len = caseStudies.length;
              const rel = (index - activeIndex + len) % len;
              const visible = rel < 3;
              const layerStyles = [
                { y: 0, scale: 1, opacity: 1, z: 30 },
                { y: 14, scale: 0.97, opacity: 0.7, z: 20 },
                { y: 26, scale: 0.94, opacity: 0.45, z: 10 },
              ];
              const style = layerStyles[rel] || { y: 32, scale: 0.92, opacity: 0, z: 0 };

              return (
                <motion.article
                  key={study.brand}
                  initial={false}
                  animate={{
                    y: style.y,
                    scale: style.scale,
                    opacity: visible ? style.opacity : 0,
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-purple-50 p-6 shadow-lg"
                  style={{ zIndex: style.z }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-semibold uppercase tracking-wider text-blue-700">Case Study</span>
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">{study.brand}</h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">{study.campaign}</p>
                  <div className="mt-5 space-y-2 text-sm text-slate-700">
                    <div className="flex items-center justify-between">
                      <span>Spend</span>
                      <span className="font-semibold text-slate-900">{study.spend}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Reach</span>
                      <span className="font-semibold text-slate-900">{study.reach}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Engagement</span>
                      <span className="font-semibold text-slate-900">{study.engagement}</span>
                    </div>
                    <div className="mt-4 rounded-lg bg-white/80 p-3 text-center">
                      <span className="text-xs uppercase tracking-wide text-slate-500">Result</span>
                      <p className="text-lg font-bold text-blue-700">{study.result}</p>
                    </div>
                    <p className="pt-1 text-xs text-slate-500">{study.timeline}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
          <div className="mt-5 flex justify-center gap-2">
            {caseStudies.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all ${index === activeIndex ? 'w-6 bg-blue-600' : 'w-2 bg-slate-300'}`}
                aria-label={`Show case study ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
