import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Waves } from 'lucide-react';

const WhyChooseHiveSurf = () => {
  const [headingFx, setHeadingFx] = React.useState({ x: 0, y: 0, active: false });
  const highlights = [
    'No long-term contracts',
    'Performance-focused campaigns',
    'Campaigns launched in 7 days, not weeks',
    'Direct creator network (no middle layers)',
  ];
  const relatableImages = [
    {
      src: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80',
      alt: 'Influencer content creator recording short video',
      className: '',
    },
  ];
  const onHeadingMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setHeadingFx({ x: e.clientX - r.left, y: e.clientY - r.top, active: true });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <Waves className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 opacity-5 text-[var(--primary)]" />
        
        {/* Abstract wavy shapes */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#004396" stopOpacity="0.1"/>
                <stop offset="100%" stopColor="#004396" stopOpacity="0.3"/>
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#004396" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="#004396" stopOpacity="0.4"/>
              </linearGradient>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#004396" stopOpacity="0.15"/>
                <stop offset="100%" stopColor="#004396" stopOpacity="0.35"/>
              </linearGradient>
              <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#004396" stopOpacity="0.1"/>
                <stop offset="100%" stopColor="#004396" stopOpacity="0.25"/>
              </linearGradient>
              <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#004396" stopOpacity="0.05"/>
                <stop offset="100%" stopColor="#004396" stopOpacity="0.2"/>
              </linearGradient>
            </defs>
            <path d="M0,200 Q300,100 600,200 T1200,200 L1200,0 L0,0 Z" fill="url(#gradient1)" opacity="0.3"/>
            <path d="M0,400 Q400,300 800,400 T1200,400 L1200,200 L0,200 Z" fill="url(#gradient2)" opacity="0.2"/>
            <path d="M0,600 Q200,500 400,600 T800,600 Q1000,500 1200,600 L1200,400 L0,400 Z" fill="url(#gradient3)" opacity="0.25"/>
            <path d="M0,100 Q150,50 300,100 T600,100 Q900,50 1200,100 L1200,0 L0,0 Z" fill="url(#gradient4)" opacity="0.15"/>
            <path d="M0,500 Q500,400 1000,500 T1200,500 L1200,300 L0,300 Z" fill="url(#gradient5)" opacity="0.1"/>
          </svg>
        </div>
        
        {/* Organic blob shapes */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-[var(--primary)]/10 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-32 h-32 bg-[var(--primary)]/15 rounded-full blur-lg"></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-[var(--primary)]/8 rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 right-1/3 w-36 h-36 bg-[var(--primary)]/12 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/2 w-44 h-44 bg-[var(--primary)]/6 rounded-full blur-xl"></div>
        <div className="absolute top-20 right-1/4 w-28 h-28 bg-[var(--primary)]/10 rounded-full blur-lg"></div>
        <div className="absolute bottom-10 left-1/2 w-32 h-32 bg-[var(--primary)]/8 rounded-full blur-xl"></div>
        <div className="absolute top-3/4 left-1/6 w-24 h-24 bg-[var(--primary)]/12 rounded-full blur-lg"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[2.25rem] border border-white/80 bg-white/80 backdrop-blur-sm shadow-[0_30px_70px_-40px_rgba(15,23,42,0.45)]"
        >
          <div className="grid lg:grid-cols-[1.1fr_1fr]">
            <div className="p-8 md:p-10 lg:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">What makes us different</p>
              <div
                className="relative mt-3 inline-block"
                onMouseMove={onHeadingMove}
                onMouseEnter={() => setHeadingFx((v) => ({ ...v, active: true }))}
                onMouseLeave={() => setHeadingFx((v) => ({ ...v, active: false }))}
              >
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                  What Makes Us Different
                </h3>
                <motion.h3
                  aria-hidden="true"
                  animate={{ opacity: headingFx.active ? 1 : 0 }}
                  transition={{ duration: 0.15 }}
                  className="pointer-events-none absolute inset-0 text-3xl md:text-4xl font-bold leading-tight bg-[linear-gradient(90deg,#ef4444,#f59e0b,#eab308,#22c55e,#3b82f6,#a855f7,#ef4444)] bg-[length:220%_100%] bg-clip-text text-transparent"
                  style={{
                    WebkitMaskImage: `radial-gradient(100px circle at ${headingFx.x}px ${headingFx.y}px, #000 0%, rgba(0,0,0,0.82) 40%, transparent 75%)`,
                    maskImage: `radial-gradient(100px circle at ${headingFx.x}px ${headingFx.y}px, #000 0%, rgba(0,0,0,0.82) 40%, transparent 75%)`,
                  }}
                >
                  What Makes Us Different
                </motion.h3>
              </div>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl">
                Why brands switch to Hivesurf.
              </p>

              <ul className="mt-8 space-y-4">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative p-4 md:p-6 bg-gradient-to-br from-slate-100 to-blue-100/70">
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -top-2 -right-2 h-28 w-28 rounded-full bg-cyan-300/35 blur-2xl"
                animate={{ scale: [0.9, 1.12, 0.9], opacity: [0.25, 0.5, 0.25] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
              {relatableImages.map((image) => (
                <motion.div
                  key={image.alt}
                  className={`relative overflow-hidden rounded-2xl ${image.className}`}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <motion.img
                    src={image.src}
                    alt={image.alt}
                    className="h-[300px] md:h-[380px] w-full object-cover"
                    loading="lazy"
                    animate={{ scale: [1, 1.06, 1], x: [0, -6, 0], y: [0, 4, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/28 via-transparent to-transparent" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-10 rounded-2xl border-2 border-cyan-300 bg-gradient-to-br from-cyan-50 to-blue-50 p-9 shadow-[0_16px_38px_-26px_rgba(14,116,144,0.45)]"
        >
          <h3 className="inline-flex items-center gap-2 text-2xl font-bold text-slate-900">
            <ShieldCheck className="h-6 w-6 text-cyan-700" />
            Risk-Free Start
          </h3>
          <ul className="mt-4 space-y-2 text-slate-700">
            <li>No long-term contracts</li>
            <li>Transparent reporting</li>
            <li>You approve influencers before campaign</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseHiveSurf;
