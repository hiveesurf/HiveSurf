import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle } from 'lucide-react';

const ServiceFormModal = ({ isOpen, onClose, selectedService }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    description: '',
    service: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Update form data when selectedService changes
  useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({
        ...prev,
        service: selectedService.title || ''
      }));
    }
  }, [selectedService]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Lock body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      // Handle escape key
      const handleEscape = (e) => {
        if (e.key === 'Escape' && !isSubmitting) {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        // Restore scroll position when modal closes
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
        
        // Remove escape key listener
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mnnzwzqk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
            company: '',
            description: '',
            service: selectedService?.title || ''
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
        company: '',
        description: '',
        service: ''
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
            {/* Header with gradient and better spacing */}
            <div className="bg-gradient-to-br from-[var(--primary)] to-[#003a7a] text-white p-8 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
              </div>
              
              <div className="flex items-start justify-between relative z-10">
                <div className="flex-1 pr-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-2xl">✨</span>
                    </div>
                    <h2 className="text-3xl font-bold">
                      {selectedService?.title || 'Start Free Trial'}
                    </h2>
                  </div>
                  <p className="text-white/90 text-lg leading-relaxed">
                    {selectedService?.description || 'Experience our premium services risk-free for 7 days.'}
                  </p>
                </div>
                
                {/* Logo on the right side with close button */}
                <div className="flex-shrink-0 ml-4 relative">
                  <img 
                    src="/logo.svg" 
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
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h3>
                  <p className="text-gray-600 text-lg">
                    We've received your request and will contact you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Selected Service (Read-only) */}
                  <div className="bg-gradient-to-r from-[var(--primary)]/5 to-[var(--accent)]/5 p-4 rounded-xl border border-[var(--primary)]/20">
                    <label className="block text-sm font-semibold text-[var(--primary)] mb-3 flex items-center">
                      <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-2"></span>
                      Selected Service
                    </label>
                    <input
                      type="text"
                      value={formData.service}
                      readOnly
                      className="w-full px-4 py-3 bg-white/80 border border-[var(--primary)]/30 rounded-lg text-[var(--primary)] font-medium cursor-not-allowed"
                    />
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

                    {/* Company */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-2"></span>
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all duration-300 bg-white shadow-sm hover:shadow-md text-gray-900 placeholder-gray-500"
                        placeholder="Enter your company name"
                      />
                    </div>
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
                      placeholder="Tell us about your project goals and requirements..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[var(--primary)] to-[#003a7a] text-white font-bold py-4 px-8 rounded-xl hover:from-[#003a7a] hover:to-[var(--primary)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl relative overflow-hidden group"
                  >
                    {/* Button background effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        <span className="text-lg">Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6 mr-3" />
                        <span className="text-lg">Submit Request</span>
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

export default ServiceFormModal;
