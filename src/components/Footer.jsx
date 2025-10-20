import React, { useState } from 'react';
import { ArrowUp, Target, BarChart2, Rocket, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

// Footer Component
function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      alert('Thank you for subscribing!');
      setEmail('');
    } else {
      alert('Please enter a valid email address.');
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">HiveSurf</h3>
            <p className="text-gray-400 mb-4">
              Your Social Hive - Riding the wave of innovation with expert digital marketing solutions that build and nurture your social community.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={24} />
              </a>
              {/* <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={24} />
              </a> */}
              <a href="https://www.instagram.com/" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={24} />
              </a>
              {/* <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={24} />
              </a> */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'Home', link: '/' },
                { name: 'Our Services', link: '#our-services' },
                { name: 'Meet Our Team', link: '#meet-our-team' },
                { name: 'Success Stories', link: '#success-stories' },
                { name: 'Why Choose Us', link: '#why-choose-hivesurf' },
                { name: 'Contact', link: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.link} 
                    className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              {[
                { name: 'Social Media Management', link: '#our-services' },
                { name: 'Content Creation', link: '#our-services' },
                { name: 'Digital Marketing Strategy', link: '#our-services' },
                { name: 'Analytics & Insights', link: '#our-services' },
                { name: 'Brand Development', link: '#our-services' },
                { name: 'Creative Design', link: '#our-services' }
              ].map((service) => (
                <li key={service.name}>
                  <a 
                    href={service.link} 
                    className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 cursor-pointer"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
            
            <div className="space-y-2">
              <div className="flex items-center text-gray-400">
                <Phone size={16} className="mr-2" />
                <span>+91 91 485 619 49</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2" />
                <span>contact@hivesurf.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-500">
            © {currentYear} HiveSurf. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function AboutUs() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <Footer />
    </>
  );
}

// Custom animations for Tailwind
const styles = `
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-in-right {
  from { 
    opacity: 0;
    transform: translateX(-20px);
  }
  to { 
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-in-up {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce-in {
  0% { 
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

.animate-fade-in { animation: fade-in 1s ease-out; }
.animate-slide-in-right { animation: slide-in-right 1s ease-out; }
.animate-fade-in-up { animation: fade-in-up 1s ease-out; }
.animate-bounce-in { animation: bounce-in 1s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
`;