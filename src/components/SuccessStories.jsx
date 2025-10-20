import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, ShoppingCart, Heart, Rocket, Star, TrendingUp, MessageCircle, Waves } from 'lucide-react';

const SuccessStories = () => {
  const stories = [
    {
      icon: ShoppingCart,
      company: "Retail Brand",
      result: "5x conversions in 60 days",
      industry: "Retail",
      description: "HiveSurf restructured ad funnels and boosted revenue by 320% in just two months.",
      color: "from-[var(--accent)] to-yellow-500",
      type: "success"
    },
    {
      icon: Monitor,
      company: "Tech Platform",
      result: "280% organic traffic growth",
      industry: "Technology",
      description: "Our data-driven SEO and content strategy built sustainable visibility and long-term leads.",
      color: "from-[var(--primary)] to-blue-600",
      type: "success"
    },
    {
      icon: Heart,
      company: "Healthcare Startup",
      result: "$2M growth in 6 months",
      industry: "Healthcare",
      description: "Targeted PPC and brand storytelling brought exponential engagement and trust.",
      color: "from-[var(--primary)] to-blue-700",
      type: "success"
    }
  ];

  const stats = [
    {
      icon: Star,
      number: "4.9★",
      label: "Client Trust Score",
      color: "from-[var(--accent)] to-yellow-500"
    },
    {
      icon: Rocket,
      number: "350+",
      label: "Campaigns",
      color: "from-[var(--primary)] to-blue-600"
    },
    {
      icon: TrendingUp,
      number: "3.2x",
      label: "ROI",
      color: "from-[var(--primary)] to-blue-700"
    },
    {
      icon: MessageCircle,
      number: "Global",
      label: "Support",
      color: "from-[var(--accent)] to-yellow-600"
    }
  ];

  return (
    <section className="py-8 bg-[var(--primary)] text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <Waves className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 opacity-5" />
        
        {/* Organic blob shapes - more visible */}
        <div className="absolute top-16 left-16 w-40 h-40 bg-white/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-16 w-44 h-44 bg-white/25 rounded-full blur-lg"></div>
        <div className="absolute bottom-24 left-1/3 w-48 h-48 bg-white/18 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 right-1/4 w-36 h-36 bg-white/22 rounded-full blur-lg"></div>
        <div className="absolute top-1/3 left-2/3 w-42 h-42 bg-white/15 rounded-full blur-xl"></div>
        <div className="absolute top-24 right-1/3 w-32 h-32 bg-white/20 rounded-full blur-lg"></div>
        <div className="absolute bottom-16 left-1/2 w-38 h-38 bg-white/16 rounded-full blur-xl"></div>
        <div className="absolute top-2/3 left-1/5 w-30 h-30 bg-white/18 rounded-full blur-lg"></div>
        <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-white/12 rounded-full blur-lg"></div>
        <div className="absolute bottom-1/3 right-1/6 w-28 h-28 bg-white/14 rounded-full blur-lg"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Real Results, Real Impact
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-4">
            Growth That Speaks for Itself
          </p>
          <p className="text-lg text-white/80 max-w-4xl mx-auto mb-8">
            Numbers tell our story. Every campaign we craft turns clicks into conversions and data into lasting growth.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 shadow-lg hover:shadow-2xl transition-all duration-300 text-center group border border-white/20 relative overflow-hidden"
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Floating particles effect */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-[var(--primary)]/20 rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-[var(--accent)]/30 rounded-full animate-ping"></div>
                
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${stat.color} mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Animated counter */}
                  <motion.div 
                    className="text-3xl md:text-4xl font-bold mb-2 text-white"
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  >
                    {stat.number}
                  </motion.div>
                  
                  <div className="text-white/80 text-lg group-hover:text-[var(--accent)] transition-colors duration-300">
                    {stat.label}
                  </div>
                  
                  {/* Progress bar animation */}
                  <div className="mt-4 w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: "85%" }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    ></motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Success Stories Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-4">
            <h3 className="text-3xl font-bold text-white mb-4">Client Wins That Define Our Work</h3>
            <p className="text-lg text-white/80">From emerging startups to global brands — HiveSurf delivers measurable growth that speaks for itself.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -15,
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 shadow-lg hover:shadow-2xl transition-all duration-300 group border border-white/20 relative overflow-hidden"
            >
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/30 via-transparent to-yellow-50/20"></div>
                <div className="absolute top-4 right-4 w-20 h-20 bg-[var(--primary)]/5 rounded-full blur-xl"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-[var(--accent)]/5 rounded-full blur-lg"></div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute top-3 right-3 w-3 h-3 bg-[var(--primary)]/20 rounded-full animate-bounce"></div>
              <div className="absolute bottom-3 left-3 w-2 h-2 bg-[var(--accent)]/30 rounded-full animate-pulse"></div>
              
              <div className="relative z-10">
                <motion.div 
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${story.color} mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg group-hover:shadow-xl`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <story.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <div className="mb-4">
                  <motion.h3 
                    className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--accent)] transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    {story.company}
                  </motion.h3>
                  <p className="text-white/70 text-sm uppercase tracking-wide group-hover:text-[var(--accent)] transition-colors duration-300">
                    {story.industry}
                  </p>
                </div>
                
                <motion.div 
                  className="text-3xl font-bold text-white mb-3 group-hover:text-[var(--accent)] transition-colors duration-300"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                >
                  {story.result}
                </motion.div>
                
                <p className="text-white/70 text-sm leading-relaxed mb-4 group-hover:text-white/90 transition-colors duration-300">
                  {story.description}
                </p>
                
                {/* Enhanced progress bar with animation */}
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full bg-gradient-to-r ${story.color} rounded-full relative`}
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    transition={{ duration: 1.5, delay: index * 0.2 + 0.5 }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </motion.div>
                </div>
                
                {/* Success indicator */}
                <div className="mt-4 flex items-center justify-center">
                  <div className="flex items-center space-x-2 text-sm text-green-600 font-medium">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Success Story</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessStories;
