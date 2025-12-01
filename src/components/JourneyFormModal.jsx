import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, ChevronDown } from 'lucide-react';

const JourneyFormModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    description: '',
    selectedServices: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const services = [
    "Social Media Management",
    "Content Creation", 
    "Digital Marketing Strategy",
    "Analytics & Insights",
    "Brand Development",
    "Creative Design",
    "Website Building",
    "Influencer Marketing"
  ];

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      const handleEscape = (e) => {
        if (e.key === 'Escape' && !isSubmitting) {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, isSubmitting, onClose]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceToggle = (service) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(service)
        ? prev.selectedServices.filter(s => s !== service)
        : [...prev.selectedServices, service]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mnnzwzqk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          selectedServices: formData.selectedServices.join(', ')
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
          setFormData({
            name: '',
            phone: '',
            email: '',
            description: '',
            selectedServices: []
          });
        }, 2000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setIsSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        description: '',
        selectedServices: []
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-[var(--primary)] to-[#003a7a] text-white p-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
              </div>
              
              <div className="flex items-start justify-between relative z-10">
                <div className="flex-1 pr-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <h2 className="text-3xl font-bold">Start Your Journey</h2>
                  </div>
                  <p className="text-white/90 text-lg leading-relaxed">
                    Ready to transform your business? Select your services and let's begin this exciting journey together.
                  </p>
                </div>
                
                {/* Logo */}
                <div className="flex-shrink-0 ml-4 relative">
                  <img 
                    src="logo.svg" 
                    alt="HiveSurf Logo" 
                    className="w-20 h-20 object-contain rounded-lg bg-white/10 p-2"
                  />
                  {/* Close button positioned relative to logo */}
                  <button
                    onClick={handleClose}
                    className="absolute -top-2 -right-2 text-white/80 hover:text-white transition-all duration-300 hover:scale-110 z-20 bg-black/20 hover:bg-black/30 rounded-full p-1.5"
                    disabled={isSubmitting}
                    type="button"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-8 bg-gradient-to-b from-gray-50 to-white flex-1 overflow-y-auto">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">Journey Started!</h3>
                  <p className="text-gray-600 text-lg">
                    We've received your information and will contact you within 24 hours to begin your digital transformation.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Services Dropdown */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-2"></span>
                      Select Services *
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all duration-300 bg-white shadow-sm hover:shadow-md text-gray-900 text-left flex items-center justify-between"
                      >
                        <span>
                          {formData.selectedServices.length === 0 
                            ? "Choose your services..." 
                            : `${formData.selectedServices.length} service(s) selected`
                          }
                        </span>
                        <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isDropdownOpen && (
                        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                          {services.map((service, index) => (
                            <label
                              key={index}
                              className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={formData.selectedServices.includes(service)}
                                onChange={() => handleServiceToggle(service)}
                                className="w-4 h-4 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)] mr-3"
                              />
                              <span className="text-gray-900">{service}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Two-column layout for form fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-2"></span>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all duration-300 bg-white shadow-sm hover:shadow-md text-gray-900 placeholder-gray-500"
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-2"></span>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all duration-300 bg-white shadow-sm hover:shadow-md text-gray-900 placeholder-gray-500"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-2"></span>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all duration-300 bg-white shadow-sm hover:shadow-md text-gray-900 placeholder-gray-500"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    {/* Empty div for spacing */}
                    <div></div>
                  </div>

                  {/* Description - Full width */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-2"></span>
                      Project Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all duration-300 bg-white shadow-sm hover:shadow-md resize-none text-gray-900 placeholder-gray-500"
                      placeholder="Tell us about your project goals and what you hope to achieve..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || formData.selectedServices.length === 0}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[var(--primary)] to-[#003a7a] text-white font-bold py-4 px-8 rounded-xl hover:from-[#003a7a] hover:to-[var(--primary)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        <span className="text-lg">Starting Your Journey...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6 mr-3" />
                        <span className="text-lg">Start Your Journey</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JourneyFormModal;
