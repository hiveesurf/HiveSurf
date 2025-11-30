import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle, Waves, ArrowRight, Zap } from 'lucide-react';

const ContactUsPage = () => {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-100 relative overflow-hidden">
      {/* Background Wave Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <Waves className="absolute top-0 left-0 w-full h-full opacity-5" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-cyan-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-blue-100 rounded-full opacity-25 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 pt-24">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl w-full"
        >
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12 mt-8"
          >
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
              Ready to <span className="text-[#004396]">Ride the Wave</span>?
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Let's connect and build your social hive together. Get in touch with our digital marketing experts and start your journey to success.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Section - Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#004396] to-blue-600 rounded-full mb-4">
                  <Waves className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Connect with HiveSurf</h2>
                <p className="text-slate-600">Your social hive awaits - let's make waves together!</p>
              </div>

              <div className="space-y-6">
                <motion.div 
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('tel:+919148561949', '_self')}
                  className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#004396] to-blue-600 rounded-full mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Phone Number</p>
                    <p className="text-slate-600">+91 91 485 619 49</p>
                    <p className="text-sm text-blue-600">Call us for immediate assistance</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('mailto:connect@hivesurf.com?subject=Inquiry from HiveSurf Website&body=Hello HiveSurf Team,%0D%0A%0D%0AI am interested in your digital marketing services. Please contact me to discuss how we can work together.%0D%0A%0D%0AThank you!', '_self')}
                  className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Email</p>
                    <p className="text-slate-600">connect@hivesurf.com</p>
                    <p className="text-sm text-green-600">Drop us a line anytime</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('https://wa.me/919148561949?text=Hello%20HiveSurf%20Team!%20I%20am%20interested%20in%20your%20digital%20marketing%20services.%20Please%20let%20me%20know%20how%20we%20can%20work%20together.', '_blank')}
                  className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mr-4 group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">WhatsApp</p>
                    <p className="text-slate-600">+91 91 485 619 49</p>
                    <p className="text-sm text-green-600">Quick chat available</p>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="mt-8 p-6 bg-gradient-to-r from-[#004396] to-blue-600 rounded-xl text-white text-center"
              >
                <Zap className="w-8 h-8 mx-auto mb-3" />
                <h3 className="text-xl font-bold mb-2">Ready to Make Waves?</h3>
                <p className="text-blue-100 mb-4">Join hundreds of businesses already surfing the digital wave with us!</p>
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span className="ml-2">5.0 Rating</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Section - Calendly Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mb-4">
                  <ArrowRight className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Book Your Wave Session</h2>
                <p className="text-slate-600">Schedule a 30-minute strategy session and let's plan your digital journey together.</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 mb-6 border border-blue-100">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">What to Expect:</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#004396] rounded-full mr-3"></div>
                    Free digital marketing audit
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#004396] rounded-full mr-3"></div>
                    Custom strategy recommendations
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#004396] rounded-full mr-3"></div>
                    Growth opportunities discussion
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#004396] rounded-full mr-3"></div>
                    No-obligation consultation
                  </li>
                </ul>
              </div>

              <div className="calendly-inline-widget" data-url="https://calendly.com/hivesurf/30min" style={{ minWidth: '320px', height: '630px' }}></div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUsPage;