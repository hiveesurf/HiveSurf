import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Code, ArrowRight, Target, Palette, Zap, Shield, Rocket } from 'lucide-react';
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

const SoftwareDevelopmentDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const processSteps = [
    {
      icon: Target,
      title: "Requirement Analysis & Strategy Development",
      description: "We conduct an in-depth analysis of your business needs, industry trends, and goals to craft a custom software development strategy."
    },
    {
      icon: Palette,
      title: "Design & Development",
      description: "Our team designs user-friendly interfaces and develops scalable, robust software tailored to your specific requirements."
    },
    {
      icon: Zap,
      title: "Testing & Quality Assurance",
      description: "We ensure flawless performance through rigorous testing, identifying and resolving any issues for a seamless user experience."
    },
    {
      icon: Rocket,
      title: "Deployment & Ongoing Support",
      description: "We manage smooth deployment and provide continuous maintenance to keep your software updated and optimized."
    }
  ];

  const whyChoosePoints = [
    "We deliver customized software solutions tailored to your business goals.",
    "User-centric design and robust development for seamless experiences.",
    "Scalable, secure, and future-ready applications using the latest technologies.",
    "End-to-end support from ideation to deployment and maintenance.",
    "Continuous performance monitoring and optimization for long-term success."
  ];

  const services = [
    {
      title: "Custom Software Development",
      description: "Drive organic traffic"
    },
    {
      title: "Software Maintenance",
      description: "Maximize ROI with targeted"
    },
    {
      title: "IT Product Development",
      description: "Content marketing services"
    }
  ];

  const handleGetStarted = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500 rounded-full translate-y-40 -translate-x-40"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Innovative Solutions & Seamless Development
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              HiveSurf delivers result-driven software solutions tailored to streamline processes, enhance user experiences, and drive business growth. Our expert team specializes in custom software development, from concept to deployment, ensuring innovative, scalable, and efficient solutions that keep you ahead of the competition.
            </p>
          </motion.div>

          {/* Image and Content Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center">
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
                  src="/WebDevelopment.png" 
                  alt="Software Development" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
              </div>
            </motion.div>

            {/* Our Process */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-8 flex items-center">
                <Code className="w-8 h-8 text-blue-400 mr-4" />
                Our Process
              </h3>
              <div className="space-y-6">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold mb-2 text-white">{step.title}</h4>
                        <p className="text-white/80 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Why Choose Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20 mb-16"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Why Choose HiveSurf for Software Development
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {whyChoosePoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <Check className="w-6 h-6 text-green-400 mr-4 flex-shrink-0 mt-1" />
                  <p className="text-white/90 text-lg leading-relaxed">{point}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Services List */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Our Software Development Services
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-white">{service.title}</h4>
                  <p className="text-white/70">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Button */}
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="group relative inline-flex items-center space-x-3 bg-white text-blue-600 font-bold py-4 px-8 rounded-xl text-xl hover:bg-gray-100 transition-colors duration-300 shadow-lg overflow-visible"
            >
              <span>🚀 Get Started</span>
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
          title: "Software Development",
          description: "Build custom software solutions tailored to your business needs with modern technologies and best practices."
        }}
      />
    </section>
  );
};

export default SoftwareDevelopmentDetails;

