import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, Mail, MessageCircle, Phone, Waves } from 'lucide-react';

// Animated Drip Component
const Drip = ({ left, height, delay }) => {
  return (
    <motion.div
      className="absolute top-[99%] origin-top"
      style={{ left }}
      initial={{ scaleY: 0.75 }}
      animate={{ scaleY: [0.75, 1, 0.75] }}
      transition={{
        duration: 2,
        times: [0, 0.25, 1],
        delay,
        ease: "easeIn",
        repeat: Infinity,
        repeatDelay: 2,
      }}
    >
      <div
        style={{ height }}
        className="w-2 rounded-b-full bg-white transition-colors"
      />
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-full top-0"
      >
        <g clipPath="url(#clip0_1077_28)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
            className="fill-white transition-colors"
          />
        </g>
        <defs>
          <clipPath id="clip0_1077_28">
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
        <g clipPath="url(#clip0_1077_28)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
            className="fill-white transition-colors"
          />
        </g>
        <defs>
          <clipPath id="clip0_1077_28">
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
          ease: "easeIn",
          repeat: Infinity,
          repeatDelay: 2,
        }}
        className="absolute top-full h-2 w-2 rounded-full bg-white transition-colors"
      />
    </motion.div>
  );
};

const FinalCTA = () => {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [activeOptionIndex, setActiveOptionIndex] = useState(0);

  const sectionTitle = 'Ready to Surf the Digital Wave?';
  const sectionDetails = [
    'Get started today and transform your business with our innovative digital marketing strategies.',
  ];

  const handleStartJourney = () => {
    setIsContactPopupOpen(true);
  };

  const closePopup = () => {
    setIsContactPopupOpen(false);
  };

  const contactOptions = [
    { key: 'whatsapp', label: 'WhatsApp', Icon: MessageCircle, baseClass: 'bg-emerald-500 text-white hover:bg-emerald-600' },
    { key: 'email', label: 'Email', Icon: Mail, baseClass: 'bg-slate-100 text-slate-800 hover:bg-slate-200' },
    { key: 'phone', label: 'Phone', Icon: Phone, baseClass: 'bg-slate-100 text-slate-800 hover:bg-slate-200' },
    { key: 'meeting', label: 'Set Up Meeting', Icon: CalendarDays, baseClass: 'bg-blue-600 text-white hover:bg-blue-700' },
  ];

  useEffect(() => {
    if (!isContactPopupOpen) return undefined;
    const timer = setInterval(() => {
      setActiveOptionIndex((prev) => (prev + 1) % contactOptions.length);
    }, 1800);
    return () => clearInterval(timer);
  }, [isContactPopupOpen, contactOptions.length]);

  const openContactOption = (type) => {
    const detailsText = sectionDetails.map((item) => `- ${item}`).join('\n');
    const message = `Hi Hivesurf, I want to know more about this section:
"${sectionTitle}"

Details:
${detailsText}`;
    const encodedMessage = encodeURIComponent(message);

    if (type === 'whatsapp') {
      window.open(`https://wa.me/919148561949?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
      closePopup();
      return;
    }

    if (type === 'email') {
      window.location.href = `mailto:connect@hivesurf.com?subject=${encodeURIComponent('Final CTA Enquiry')}&body=${encodedMessage}`;
      closePopup();
      return;
    }

    if (type === 'phone') {
      window.location.href = 'tel:+919148561949';
      closePopup();
      return;
    }

    if (type === 'meeting') {
      window.location.href = `/contact?enquiry=final-cta&channel=meeting&topic=${encodeURIComponent(sectionTitle)}`;
      closePopup();
    }
  };

  return (
    <section className="py-14 md:py-20 bg-[var(--primary)] text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <Waves className="absolute top-0 left-0 w-full h-full opacity-10" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl leading-tight md:text-5xl font-bold mb-5 md:mb-6 px-1">
            Ready to Surf the Digital Wave?
          </h2>
          
          <p className="text-base md:text-xl text-white/90 max-w-3xl mx-auto mb-6 md:mb-8">
            Get started today and transform your business with our innovative digital marketing strategies.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="relative inline-block w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartJourney}
              className="group relative inline-flex w-full sm:w-auto justify-center items-center space-x-3 bg-white text-blue-600 font-bold py-3.5 px-6 md:py-4 md:px-8 rounded-xl text-base md:text-xl hover:bg-gray-100 transition-colors duration-300 shadow-lg overflow-visible"
            >
              <span>Get Free Plan</span>
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              
              {/* Animated Paint Drips */}
              <Drip left="20%" height={24} delay={0.5} />
              <Drip left="35%" height={20} delay={3} />
              <Drip left="50%" height={16} delay={4.25} />
              <Drip left="65%" height={20} delay={1.5} />
              <Drip left="80%" height={24} delay={2.5} />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {isContactPopupOpen && (
        <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center bg-slate-900/45 px-3 py-3 sm:px-4" onClick={closePopup}>
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.22 }}
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 text-slate-900 shadow-2xl max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg sm:text-xl font-bold">Know More About This Offer</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Choose one option and we will continue with your campaign enquiry.
            </p>
            <div className="mt-5 relative h-[172px]">
              {contactOptions.map((option, index) => {
                const len = contactOptions.length;
                const rel = (index - activeOptionIndex + len) % len;
                const visible = rel < 3;
                const layerStyles = [
                  { y: 0, scale: 1, opacity: 1, z: 30 },
                  { y: 16, scale: 0.98, opacity: 0.78, z: 20 },
                  { y: 30, scale: 0.96, opacity: 0.56, z: 10 },
                ];
                const style = layerStyles[rel] || { y: 36, scale: 0.95, opacity: 0, z: 0 };
                const Icon = option.Icon;

                return (
                  <motion.button
                    key={option.key}
                    type="button"
                    initial={false}
                    animate={{
                      y: style.y,
                      scale: style.scale,
                      opacity: visible ? style.opacity : 0,
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => openContactOption(option.key)}
                    className={`absolute inset-x-0 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${option.baseClass}`}
                    style={{ zIndex: style.z }}
                  >
                    <Icon className="h-4 w-4" />
                    {option.label}
                  </motion.button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={closePopup}
              className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default FinalCTA;