import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Copy, CheckCircle, Star } from 'lucide-react';

const FinalRewardModal = ({ onClose, onClaimReward }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    services: []
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const [copied, setCopied] = useState(false);

  const discountCode = "HIVEMASTER";

  // Services list: try to read from window.__HIVESURF_SERVICES__ injected by Services.jsx, fallback to defaults
  const serviceOptions = (typeof window !== 'undefined' && window.__HIVESURF_SERVICES__)
    ? window.__HIVESURF_SERVICES__
    : [
        '7-Day Free Trial',
        'Monthly Subscription',
        'Social Media Management',
        'Logo Design',
        'Website Building',
        'Influencer Marketing',
        'Brand Building'
      ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Stronger international phone validation: allows +country codes, spaces, dashes
    const normalizedPhone = formData.phone.replace(/[^\d+]/g, '');
    if (!normalizedPhone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[1-9]\d{6,14}$/.test(normalizedPhone)) {
      newErrors.phone = 'Please enter a valid phone number with country code';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.services || formData.services.length === 0) {
      newErrors.services = 'Please select at least one service to purchase with discount';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Send form data to backend (Formspree)
      const response = await fetch('https://formspree.io/f/mnnzwzqk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          services: formData.services,
          formType: 'easter_egg_reward',
          easterEggsFound: 3,
          discountCode: discountCode,
          source: 'Easter Egg Reward Toast',
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        onClaimReward({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          services: formData.services
        });
        setIsSubmitted(true);
        setShowDiscount(true);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const toggleService = (title) => {
    setFormData(prev => {
      const exists = prev.services.includes(title);
      const next = exists ? prev.services.filter(s => s !== title) : [...prev.services, title];
      return { ...prev, services: next };
    });
    if (errors.services) setErrors(prev => ({ ...prev, services: '' }));
  };

  const copyDiscountCode = () => {
    navigator.clipboard.writeText(discountCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        className="fixed bottom-6 right-6 z-[10001] w-[92vw] max-w-md"
      >
        <div className="bg-neutral-100 rounded-2xl shadow-2xl border" style={{ borderColor: 'var(--primary)' }}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(90deg, var(--accent), #ffb300)' }}>
                <Gift className="w-5 h-5 text-black" />
              </div>
              <div className="text-lg font-bold" style={{ color: 'var(--primary)' }}>
                🎉 Congratulations!
              </div>
            </div>
            <button onClick={onClose} className="text-gray-600 hover:text-black">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body (scrollable if tall) */}
          <div className="max-h-[65vh] overflow-y-auto p-4">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="text-gray-700 text-sm">
                  You've completed all 3 games and unlocked the special reward! Fill the form to claim your discount.
                </div>

                {/* Fields */}
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--primary)' }}>Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} className={`w-full px-3 py-2 rounded-lg border-2 text-black ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white focus:border-[var(--primary)]'}`} placeholder="Enter your full name" />
                  {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--primary)' }}>Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={`w-full px-3 py-2 rounded-lg border-2 text-black ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white focus:border-[var(--primary)]'}`} placeholder="e.g., +1 555 123 4567" />
                  {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--primary)' }}>Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={`w-full px-3 py-2 rounded-lg border-2 text-black ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white focus:border-[var(--primary)]'}`} placeholder="Enter your email address" />
                  {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Services Multi-Select */}
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--primary)' }}>Select services to purchase with discount *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {serviceOptions.map(title => (
                      <label key={title} className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-black">
                        <input type="checkbox" checked={formData.services.includes(title)} onChange={() => toggleService(title)} />
                        <span>{title}</span>
                      </label>
                    ))}
                  </div>
                  {errors.services && <p className="text-red-600 text-xs mt-2">{errors.services}</p>}
                </div>

                <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full text-white py-3 rounded-lg font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" style={{ background: 'linear-gradient(90deg, var(--primary), #022f6f)' }}>
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Claiming Reward...</span>
                    </div>
                  ) : (
                    'Claim My Reward! 🎁'
                  )}
                </motion.button>
              </form>
            ) : (
              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center" style={{ background: '#22c55e' }}>
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <div className="text-lg font-bold" style={{ color: 'var(--primary)' }}>Reward Claimed Successfully!</div>
                <div className="text-gray-700 text-sm">Use this exclusive discount code:</div>
                <div className="rounded-xl p-4 text-black" style={{ background: 'linear-gradient(90deg, var(--accent), #ffb300)' }}>
                  <div className="text-2xl font-bold">{discountCode}</div>
                  <div className="text-sm font-semibold">20% OFF - Use this code at checkout!</div>
                </div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={copyDiscountCode} className="px-5 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2 mx-auto text-white" style={{ background: 'linear-gradient(90deg, var(--primary), #022f6f)' }}>
                  {copied ? (<><CheckCircle className="w-4 h-4" /><span>Copied!</span></>) : (<><Copy className="w-4 h-4" /><span>Copy Code</span></>)}
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FinalRewardModal;
