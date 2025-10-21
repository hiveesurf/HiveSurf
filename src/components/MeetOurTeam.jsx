import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Target, Waves } from 'lucide-react';

const MeetOurTeam = () => {
  const teamMembers = [
    {
      name: "Kaibalya Mohanty",
      role: "Founder",
      description: "Passionate about digital innovation and strategic growth.",
      icon: Award,
      color: "from-[var(--primary)] to-blue-600",
      image: "/kaibalya.jpg"
    },
    {
      name: "Abhijeet Chaturvedi", 
      role: "Founder",
      description: "Specialist in social media and content marketing strategies.",
      icon: Target,
      color: "from-[var(--accent)] to-yellow-500",
      image: "/abhijeet.jpg"
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
            <path d="M0,220 Q280,120 560,220 T1120,220 Q1400,120 1200,220 L1200,0 L0,0 Z" fill="url(#gradient1)" opacity="0.3"/>
            <path d="M0,420 Q380,320 760,420 T1200,420 L1200,220 L0,220 Z" fill="url(#gradient2)" opacity="0.2"/>
            <path d="M0,620 Q220,520 440,620 T880,620 Q1180,520 1200,620 L1200,420 L0,420 Z" fill="url(#gradient3)" opacity="0.25"/>
            <path d="M0,140 Q180,90 360,140 T720,140 Q900,90 1200,140 L1200,0 L0,0 Z" fill="url(#gradient4)" opacity="0.15"/>
            <path d="M0,520 Q520,420 1040,520 T1200,520 L1200,320 L0,320 Z" fill="url(#gradient5)" opacity="0.1"/>
          </svg>
        </div>
        
        {/* Organic blob shapes */}
        <div className="absolute top-14 left-14 w-36 h-36 bg-[var(--primary)]/10 rounded-full blur-xl"></div>
        <div className="absolute top-38 right-18 w-40 h-40 bg-[var(--primary)]/15 rounded-full blur-lg"></div>
        <div className="absolute bottom-18 left-1/6 w-44 h-44 bg-[var(--primary)]/8 rounded-full blur-2xl"></div>
        <div className="absolute bottom-38 right-1/5 w-34 h-34 bg-[var(--primary)]/12 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/2 w-42 h-42 bg-[var(--primary)]/6 rounded-full blur-xl"></div>
        <div className="absolute top-1/4 right-1/3 w-30 h-30 bg-[var(--primary)]/10 rounded-full blur-lg"></div>
        <div className="absolute bottom-14 left-1/3 w-38 h-38 bg-[var(--primary)]/8 rounded-full blur-xl"></div>
        <div className="absolute top-3/4 right-1/4 w-28 h-28 bg-[var(--primary)]/12 rounded-full blur-lg"></div>
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-[var(--primary)]/7 rounded-full blur-lg"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our team is composed of experienced digital marketing professionals who are passionate about helping your business succeed.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 group"
            >
              <div className="text-center">
                {/* Profile Image */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full overflow-hidden mb-4 group-hover:scale-110 transition-transform duration-300 ring-3 ring-[var(--primary)]/20 group-hover:ring-[var(--primary)]/40">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to icon if image fails to load
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className={`w-full h-full bg-gradient-to-r ${member.color} items-center justify-center hidden`}>
                    <member.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                {/* Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[var(--primary)] transition-colors duration-300">
                  {member.name}
                </h3>
                
                {/* Role */}
                <p className="text-base font-semibold text-[var(--primary)] mb-3">
                  {member.role}
                </p>
                
                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {member.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto border border-gray-100">
            <div className="flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-[var(--primary)] mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Our Commitment</h3>
            </div>
            <p className="text-gray-600 text-lg">
            We Believe every Business deserves to grow to it's fullest potential and HiveSurf is here to make it possible.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MeetOurTeam;
