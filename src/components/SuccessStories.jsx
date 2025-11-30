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
      type: "success",
      image: "/ContentMarketing.png"
    },
    {
      icon: Monitor,
      company: "Tech Platform",
      result: "280% organic traffic growth",
      industry: "Technology",
      description: "Our data-driven SEO and content strategy built sustainable visibility and long-term leads.",
      color: "from-[var(--primary)] to-blue-600",
      type: "success",
      image: "/WebDevelopment.png"
    },
    {
      icon: Heart,
      company: "Healthcare Startup",
      result: "$2M growth in 6 months",
      industry: "Healthcare",
      description: "Targeted PPC and brand storytelling brought exponential engagement and trust.",
      color: "from-[var(--primary)] to-blue-700",
      type: "success",
      image: "/ContentStrategy.png"
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
        {/* Image and Header Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
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
                src="/Analytics.png" 
                alt="Real Results, Real Impact" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/50 to-transparent"></div>
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Real Results, Real Impact
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto lg:mx-0 mb-4">
              Growth That Speaks for Itself
            </p>
            <p className="text-lg text-white/80 max-w-4xl mx-auto lg:mx-0">
              Numbers tell our story. Every campaign we craft turns clicks into conversions and data into lasting growth.
            </p>
          </motion.div>
        </div>

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
                
                <div className="relative z-10">
                  {/* Icon with gradient background */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
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
                  
                  <div className="text-white/80 text-lg group-hover:text-[var(--accent)] transition-colors duration-300 mb-4">
                    {stat.label}
                  </div>
                  
                  {/* Progress bar animation */}
                  <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
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
          
          <div className="grid md:grid-cols-3 gap-6">
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
              className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group border border-white/20 relative overflow-hidden flex flex-col"
            >
              {/* Image Section - Top 30% */}
              <div className="w-full h-[30%] min-h-[150px] relative overflow-hidden">
                <img 
                  src={story.image} 
                  alt={story.company}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/60 to-transparent"></div>
                {/* Industry Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/30">
                    {story.industry}
                  </span>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                  <motion.h3 
                    className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--accent)] transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    {story.company}
                  </motion.h3>
                </div>
                
                <motion.div 
                  className="text-3xl font-bold text-white mb-3 group-hover:text-[var(--accent)] transition-colors duration-300"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                >
                  {story.result}
                </motion.div>
                
                <p className="text-white/70 text-sm leading-relaxed mb-4 group-hover:text-white/90 transition-colors duration-300 flex-1">
                  {story.description}
                </p>
                
                {/* Enhanced progress bar with animation */}
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mb-4">
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
                <div className="flex items-center justify-center">
                  <div className="flex items-center space-x-2 text-sm text-green-400 font-medium">
                    <span>✓ Success Story</span>
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
