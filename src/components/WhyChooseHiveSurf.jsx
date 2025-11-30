import React from 'react';
import { motion } from 'framer-motion';
import { Globe, BarChart3, Zap, Waves } from 'lucide-react';

const WhyChooseHiveSurf = () => {
  const features = [
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connect with audiences worldwide through our comprehensive digital marketing strategies.",
      color: "from-[var(--primary)] to-blue-600"
    },
    {
      icon: BarChart3,
      title: "Data-Driven",
      description: "Make informed decisions with our advanced analytics and performance tracking.",
      color: "from-[var(--accent)] to-yellow-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Quick implementation and rapid results with our optimized marketing campaigns.",
      color: "from-[var(--primary)] to-blue-700"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <Waves className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 opacity-5 text-[var(--primary)]" />
        
        {/* Abstract wavy shapes */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#004396" stopOpacity="0.1"/>
                <stop offset="100%" stopColor="#004396" stopOpacity="0.3"/>
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#004396" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="#004396" stopOpacity="0.4"/>
              </linearGradient>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#004396" stopOpacity="0.15"/>
                <stop offset="100%" stopColor="#004396" stopOpacity="0.35"/>
              </linearGradient>
              <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#004396" stopOpacity="0.1"/>
                <stop offset="100%" stopColor="#004396" stopOpacity="0.25"/>
              </linearGradient>
              <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#004396" stopOpacity="0.05"/>
                <stop offset="100%" stopColor="#004396" stopOpacity="0.2"/>
              </linearGradient>
            </defs>
            <path d="M0,200 Q300,100 600,200 T1200,200 L1200,0 L0,0 Z" fill="url(#gradient1)" opacity="0.3"/>
            <path d="M0,400 Q400,300 800,400 T1200,400 L1200,200 L0,200 Z" fill="url(#gradient2)" opacity="0.2"/>
            <path d="M0,600 Q200,500 400,600 T800,600 Q1000,500 1200,600 L1200,400 L0,400 Z" fill="url(#gradient3)" opacity="0.25"/>
            <path d="M0,100 Q150,50 300,100 T600,100 Q900,50 1200,100 L1200,0 L0,0 Z" fill="url(#gradient4)" opacity="0.15"/>
            <path d="M0,500 Q500,400 1000,500 T1200,500 L1200,300 L0,300 Z" fill="url(#gradient5)" opacity="0.1"/>
          </svg>
        </div>
        
        {/* Organic blob shapes */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-[var(--primary)]/10 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-32 h-32 bg-[var(--primary)]/15 rounded-full blur-lg"></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-[var(--primary)]/8 rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 right-1/3 w-36 h-36 bg-[var(--primary)]/12 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/2 w-44 h-44 bg-[var(--primary)]/6 rounded-full blur-xl"></div>
        <div className="absolute top-20 right-1/4 w-28 h-28 bg-[var(--primary)]/10 rounded-full blur-lg"></div>
        <div className="absolute bottom-10 left-1/2 w-32 h-32 bg-[var(--primary)]/8 rounded-full blur-xl"></div>
        <div className="absolute top-3/4 left-1/6 w-24 h-24 bg-[var(--primary)]/12 rounded-full blur-lg"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Image and Header Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
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
                src="/logo.svg" 
                alt="Why Choose HiveSurf" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50/50 to-transparent"></div>
              {/* Logo overlay */}
              
            </div>
          </motion.div>

          {/* Header Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 text-center lg:text-left"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose HiveSurf
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto lg:mx-0">
              Our team is composed of experienced digital marketing professionals who will propose innovative marketing strategies tailored to your goals.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -12,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center group border border-gray-100 relative overflow-hidden"
            >
              {/* Animated background effects */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/40 via-transparent to-yellow-50/30"></div>
                <div className="absolute top-6 right-6 w-24 h-24 bg-[var(--primary)]/8 rounded-full blur-2xl"></div>
                <div className="absolute bottom-6 left-6 w-20 h-20 bg-[var(--accent)]/8 rounded-full blur-xl"></div>
              </div>
              
              {/* Floating animation elements */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-[var(--primary)]/30 rounded-full animate-ping"></div>
              <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-[var(--accent)]/40 rounded-full animate-bounce"></div>
              <div className="absolute top-1/2 right-2 w-1 h-1 bg-[var(--primary)]/20 rounded-full animate-pulse"></div>
              
              <div className="relative z-10">
                <motion.div 
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg group-hover:shadow-xl`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <motion.h3 
                  className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[var(--primary)] transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  {feature.title}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-600 text-lg leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  {feature.description}
                </motion.p>
                
                {/* Feature highlight bar */}
                <motion.div 
                  className={`mt-6 h-1 bg-gradient-to-r ${feature.color} rounded-full`}
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                ></motion.div>
                
                {/* Feature badge */}
                <div className="mt-4 flex items-center justify-center">
                  <div className="flex items-center space-x-2 text-sm text-[var(--primary)] font-medium">
                    <div className="w-2 h-2 bg-[var(--primary)] rounded-full animate-pulse"></div>
                    <span>Key Feature</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseHiveSurf;
