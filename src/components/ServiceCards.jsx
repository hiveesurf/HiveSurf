import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, TrendingUp, Smartphone, Palette, Globe, Users, Crown, Sparkles } from 'lucide-react';
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
        className="w-2 rounded-b-full bg-[var(--primary)] transition-colors group-hover:bg-[var(--primary)]"
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
            className="fill-[var(--primary)] transition-colors group-hover:fill-[var(--primary)]"
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
            className="fill-[var(--primary)] transition-colors group-hover:fill-[var(--primary)]"
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
        className="absolute top-full h-2 w-2 rounded-full bg-[var(--primary)] transition-colors group-hover:bg-[var(--primary)]"
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

// Service Card Component
const ServiceCard = ({ icon: Icon, title, description, features, buttonText, buttonIcon, onClick, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
    >
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-6">
          <Icon className="w-8 h-8 text-white" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
        
        <ul className="text-left space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-600">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
              {feature}
            </li>
          ))}
        </ul>
        
        <AnimatedButton
          icon={buttonIcon}
          onClick={onClick}
        >
          {buttonText}
        </AnimatedButton>
      </div>
    </motion.div>
  );
};

// Main Service Cards Component
const ServiceCards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  
  console.log('ServiceCards component loaded with services:', services.length);

  const handleTryFree = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const services = [
    {
      icon: Sparkles,
      title: "3-Day Free Trial",
      description: "Experience our premium services risk-free with 3 free posts designed to grow your business.",
      features: [
        "3 free social media posts",
        "Professional content creation",
        "Real results in 3 days"
      ],
      buttonText: "Try It Free",
      buttonIcon: Sparkles,
      onClick: () => handleTryFree({
        title: "3-Day Free Trial",
        description: "Experience our premium services risk-free with 3 free posts designed to grow your business."
      })
    },
    {
      icon: TrendingUp,
      title: "Monthly Subscription",
      description: "Flexible monthly plans that grow with your business and adapt to your changing needs.",
      features: [
        "Cancel anytime",
        "Scalable services",
        "Monthly performance reviews"
      ],
      buttonText: "Scale Your Growth",
      buttonIcon: TrendingUp,
      onClick: () => handleTryFree({
        title: "Monthly Subscription",
        description: "Flexible monthly plans that grow with your business and adapt to your changing needs."
      })
    },
    {
      icon: Smartphone,
      title: "Social Media Management",
      description: "Build your brand presence and engage with your audience across all social platforms.",
      features: [
        "Platform-specific strategies",
        "Content creation and curation",
        "Community management"
      ],
      buttonText: "Boost Your Reach",
      buttonIcon: Smartphone,
      onClick: () => handleTryFree({
        title: "Social Media Management",
        description: "Build your brand presence and engage with your audience across all social platforms."
      })
    },
    {
      icon: TrendingUp,
      title: "Social Media Marketing",
      description: "Turn engagement into measurable growth with powerful ad campaigns and strategic targeting.",
      features: [
        "Paid advertising & promotions",
        "Audience segmentation & analytics",
        "Influencer & trend marketing"
      ],
      buttonText: "Amplify Your Growth",
      buttonIcon: TrendingUp,
      onClick: () => handleTryFree({
        title: "Social Media Marketing",
        description: "Turn engagement into measurable growth with powerful ad campaigns and strategic targeting."
      })
    },
    {
      icon: Palette,
      title: "Logo Design",
      description: "Create a memorable and professional logo that represents your brand identity and values.",
      features: [
        "Custom logo concepts",
        "Multiple design variations",
        "Brand guideline development"
      ],
      buttonText: "Design Your Brand",
      buttonIcon: Palette,
      onClick: () => handleTryFree({
        title: "Logo Design",
        description: "Create a memorable and professional logo that represents your brand identity and values."
      })
    },
    {
      icon: Globe,
      title: "Website Building",
      description: "Build a stunning, responsive website that converts visitors into customers.",
      features: [
        "Responsive design",
        "Fast loading speeds",
        "Mobile-friendly interface"
      ],
      buttonText: "Build Your Site",
      buttonIcon: Globe,
      onClick: () => handleTryFree({
        title: "Website Building",
        description: "Build a stunning, responsive website that converts visitors into customers."
      })
    },
    {
      icon: Users,
      title: "Influencer Marketing",
      description: "Connect with the right influencers to amplify your brand message and reach new audiences.",
      features: [
        "Influencer identification",
        "Campaign strategy development",
        "Content collaboration"
      ],
      buttonText: "Amplify Your Reach",
      buttonIcon: Users,
      onClick: () => handleTryFree({
        title: "Influencer Marketing",
        description: "Connect with the right influencers to amplify your brand message and reach new audiences."
      })
    },
    {
      icon: Crown,
      title: "Brand Building",
      description: "Develop a strong, cohesive brand identity that resonates with your target audience.",
      features: [
        "Brand strategy development",
        "Visual identity creation",
        "Brand messaging"
      ],
      buttonText: "Build Your Empire",
      buttonIcon: Crown,
      onClick: () => handleTryFree({
        title: "Brand Building",
        description: "Develop a strong, cohesive brand identity that resonates with your target audience."
      })
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We will propose to your business innovative marketing strategies, engaging, diverse, and tailored to your goals. Our comprehensive digital marketing services help you ride the wave of innovation with confidence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              buttonText={service.buttonText}
              buttonIcon={service.buttonIcon}
              onClick={service.onClick}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>

      {/* Form Modal */}
      <ServiceFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedService={selectedService}
      />
    </section>
  );
};

export default ServiceCards;
