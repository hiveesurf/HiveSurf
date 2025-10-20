import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  FileText, 
  Instagram, 
  BarChart, 
  Globe, 
  Target,
  Waves,
  Sparkles
} from 'lucide-react';
import ServiceFormModal from './ServiceFormModal';

// Service card component with animation
const ServiceCard = ({ icon: Icon, title, description, onTryFree }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white/10 backdrop-blur-sm shadow-lg rounded-lg p-6 border border-white/20 hover:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      <div className="flex items-center mb-4">
        <Icon className="text-white mr-4" size={40} />
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="text-white/80 mb-6 flex-grow">{description}</p>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onTryFree({ icon: Icon, title, description })}
        className="bg-[var(--accent)] text-[var(--primary)] font-semibold py-2 px-4 rounded-lg hover:bg-yellow-300 transition-colors duration-300 flex items-center justify-center"
      >
        <Sparkles className="w-4 h-4 mr-2" />
        Try for Free
      </motion.button>
    </motion.div>
  );
};



// Main Services Component
const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      icon: Instagram,
      title: "Social Media Management",
      description: "Comprehensive social media strategy and management across all platforms to build your social hive and engage your community."
    },
    {
      icon: FileText,
      title: "Content Creation",
      description: "High-quality, engaging content that tells your brand story and connects with your target audience across all digital channels."
    },
    {
      icon: Target,
      title: "Digital Marketing Strategy",
      description: "Data-driven marketing strategies that ride the wave of innovation and deliver measurable results for your business growth."
    },
    {
      icon: BarChart,
      title: "Analytics & Insights",
      description: "Deep analytics and performance insights to optimize your digital presence and maximize your marketing ROI."
    },
    {
      icon: Globe,
      title: "Brand Development",
      description: "Build a strong, recognizable brand identity that stands out in the digital landscape and resonates with your audience."
    },
    {
      icon: Palette,
      title: "Creative Design",
      description: "Stunning visual designs and creative assets that capture attention and communicate your brand message effectively."
    }
  ];

  // Expose titles globally for other components (e.g., reward form)
  if (typeof window !== 'undefined') {
    window.__HIVESURF_SERVICES__ = services.map(s => s.title);
  }

  const handleTryFree = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <section className="py-8 bg-[var(--primary)] text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <Waves className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 opacity-20 text-white" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center text-white mb-4">
          Your Social Hive Solutions
        </h2>
        <p className="text-center text-white/90 mb-12 max-w-3xl mx-auto">
          Ride the wave of innovation with our expert digital marketing solutions designed to build and nurture your social community.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              onTryFree={handleTryFree}
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

export default Services;