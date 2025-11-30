import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, Sparkles, ArrowRight } from 'lucide-react';
import ServiceFormModal from './ServiceFormModal';

// Drip Component from Wet Paint Button
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
        className="absolute left-full top-10 p-2"
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

// Animated Button Component with Wet Paint Effect
const AnimatedButton = ({ children, icon: Icon, onClick, className = "" }) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`group relative bg-[var(--primary)] hover:bg-[var(--primary)] text-[var(--accent)] font-semibold py-3 px-6 rounded-lg shadow-md flex items-center justify-center mx-auto mt-6 transition-colors duration-300 ${className}`}
      onClick={onClick}
    >
      {Icon && <Icon className="mr-2" size={20} />}
      {children}
      
      {/* Wet Paint Drips */}
      <Drip left="10%" height={24} delay={0.5} />
      <Drip left="30%" height={20} delay={3} />
      <Drip left="57%" height={10} delay={4.25} />
      <Drip left="85%" height={16} delay={1.5} />
    </motion.button>
  );
};

const ServiceDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const features = [
    "Custom strategy development",
    "Regular performance reports",
    "Dedicated account manager",
    "24/7 support"
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
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-300 rounded-full translate-y-40 -translate-x-40"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                3-Day Free Trial
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Experience our premium services risk-free with 3 free posts designed to grow your business.
              </p>
          </motion.div>

          {/* Image and Content Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-8">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/ContentCreation.png" 
                  alt="3-Day Free Trial" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/50 to-transparent"></div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
                <div className="space-y-8">
                  {/* Features Section */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center">
                      <Check className="w-6 h-6 text-green-400 mr-3" />
                      What's Included
                    </h3>
                    <ul className="space-y-4">
                      {features.map((feature, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center text-white"
                        >
                          <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Timeline Section */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center">
                      <Clock className="w-6 h-6 text-blue-400 mr-3" />
                      Timeline
                    </h3>
                    <div className="bg-white/10 rounded-xl p-6">
                        <p className="text-white/90 text-lg">
                          First results typically seen within <span className="font-bold text-white">3 days</span>
                        </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTryFree}
              className="group relative inline-flex items-center space-x-3 bg-white text-blue-600 font-bold py-4 px-8 rounded-xl text-xl hover:bg-gray-100 transition-colors duration-300 shadow-lg overflow-visible"
            >
              <span>✨ Try It Free</span>
              <ArrowRight className="w-6 h-6" />
              
              {/* Animated Paint Drips */}
              <Drip left="20%" height={24} delay={0.5} />
              <Drip left="35%" height={20} delay={3} />
              <Drip left="50%" height={16} delay={4.25} />
              <Drip left="65%" height={20} delay={1.5} />
              <Drip left="80%" height={24} delay={2.5} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      <ServiceFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
          selectedService={{
            title: "3-Day Free Trial",
            description: "Experience our premium services risk-free with 3 free posts designed to grow your business."
          }}
      />
    </section>
  );
};

export default ServiceDetails;
