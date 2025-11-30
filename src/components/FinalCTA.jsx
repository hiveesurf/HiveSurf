import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Waves } from 'lucide-react';
import JourneyFormModal from './JourneyFormModal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartJourney = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="py-20 bg-[var(--primary)] text-white relative overflow-hidden">
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Surf the Digital Wave?
          </h2>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
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
          <div className="relative inline-block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartJourney}
              className="group relative inline-flex items-center space-x-3 bg-white text-blue-600 font-bold py-4 px-8 rounded-xl text-xl hover:bg-gray-100 transition-colors duration-300 shadow-lg overflow-visible"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-6 h-6" />
              
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

      {/* Journey Form Modal */}
      <JourneyFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default FinalCTA;