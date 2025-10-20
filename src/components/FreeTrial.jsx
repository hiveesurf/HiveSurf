import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Waves } from 'lucide-react';
import ServiceFormModal from './ServiceFormModal';

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

const FreeTrial = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const features = [
    "All premium services included",
    "Dedicated account manager",
    "See impact in just 7 days"
  ];

  const handleTryFree = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="py-20 bg-[var(--primary)] text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <Waves className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 opacity-20 text-white" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Your 7-Day Free Trial
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Experience our premium digital marketing services risk-free., cancel anytime.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4">7-Day Free Trial</h3>
              <p className="text-white/90 text-lg">
                Get full access to our premium digital marketing services for an entire week. Experience real results with zero commitment.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <Check className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-white">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="relative inline-block w-full">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleTryFree}
                className="group relative w-full bg-white text-yellow-500 font-bold py-4 px-8 rounded-xl text-xl hover:bg-gray-50 transition-colors duration-300 shadow-lg overflow-visible"
              >
                ✨ Try It Free
                
                {/* Animated Paint Drips */}
                <Drip left="15%" height={24} delay={0.2} />
                <Drip left="30%" height={20} delay={2.8} />
                <Drip left="45%" height={16} delay={4.1} />
                <Drip left="60%" height={20} delay={1.2} />
                <Drip left="75%" height={24} delay={3.5} />
                <Drip left="85%" height={18} delay={0.8} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      <ServiceFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedService={{
          title: "7-Day Free Trial",
          description: "Experience our premium digital marketing services risk-free with a full week of professional digital marketing."
        }}
      />
    </section>
  );
};

export default FreeTrial;
