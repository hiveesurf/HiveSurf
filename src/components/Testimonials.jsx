import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Smith",
      company: "TechStart Inc.",
      quote: "HiveSurf transformed our digital presence. Our organic traffic increased by 300% in just 6 months!",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      company: "Fashion Forward",
      quote: "Their social media marketing strategies helped us reach 50K+ new followers and increase sales by 150%.",
      rating: 5
    },
    {
      name: "Mike Chen",
      company: "Local Restaurant",
      quote: "The local SEO work HiveSurf did for us brought in so many new customers. Highly recommended!",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      company: "E-commerce Plus",
      quote: "Amazing results! Our conversion rate improved by 200% and we saw a 400% increase in online sales within 3 months.",
      rating: 5
    },
    {
      name: "David Thompson",
      company: "HealthCare Solutions",
      quote: "Professional, reliable, and results-driven. HiveSurf helped us establish a strong online presence and attract quality leads.",
      rating: 5
    },
    {
      name: "Lisa Park",
      company: "Creative Agency",
      quote: "Outstanding service! HiveSurf helped us build a robust online presence that doubled our client acquisition rate.",
      rating: 5
    },
    {
      name: "Robert Wilson",
      company: "Tech Solutions",
      quote: "The team's expertise in digital marketing is unmatched. We've seen incredible ROI on all our campaigns.",
      rating: 5
    }
  ];

  // Duplicate testimonials for seamless scrolling
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about our services.
          </p>
        </motion.div>

        {/* Scrolling testimonials container */}
        <div className="relative">
          <div className="flex gap-6 testimonial-scroll">
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="flex-shrink-0 w-80 md:w-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-blue-100"
              >
                <div className="flex items-center mb-4">
                  <Quote className="w-8 h-8 text-blue-500 mr-3" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <blockquote className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="pt-4">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-blue-600 text-sm">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
