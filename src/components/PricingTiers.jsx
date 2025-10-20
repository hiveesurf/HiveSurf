import { useState } from 'react';
import { Check, X, Zap, Award, Rocket, Crown } from 'lucide-react';

export default function PricingTiers() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [hoveredTier, setHoveredTier] = useState(null);
  
  const pricingTiers = [
    {
      name: "Essential Package",
      description: "Perfect for brands starting their social media journey",
      price: { monthly: 10000, annual: 108000 },
      icon: <Zap className="text-blue-500" size={28} />,
      color: "bg-blue-50 border-blue-200 hover:border-blue-400",
      shadowColor: "shadow-blue-200/50",
      features: [
        "12 high-quality static posts (carousels, infographics, posters)",
        "4 engaging reels (short-form video content)",
        "Creative and engaging captions",
        "Profile optimization (bio, highlights, overall aesthetics)",
        "Daily story updates",
        "Hashtag research",
        "Monthly performance report and content strategy recommendations"
      ],
      notIncluded: [
        "Active community management",
        "Press releases",
        "Collaboration coordination"
      ]
    },
    {
      name: "Growth Package",
      description: "Elevate your social media presence",
      price: { monthly: 30000, annual: 324000 },
      icon: <Award className="text-green-500" size={28} />,
      popular: true,
      color: "bg-green-50 border-green-200 hover:border-green-400",
      shadowColor: "shadow-green-200/50",
      features: [
        "20 professionally designed posts (carousels, informative content, promotional graphics)",
        "Monthly performance report with insights",
        "Growth strategy suggestions",
        "Enhanced profile optimization",
        "Hashtag research",
        "Daily story updates"
      ],
      notIncluded: [
        "Active community management",
        "Press releases",
        "Collaboration coordination"
      ]
    },
    {
      name: "Premium Package",
      description: "Comprehensive social media management",
      price: { monthly: 50000, annual: 540000 },
      icon: <Rocket className="text-purple-500" size={28} />,
      color: "bg-purple-50 border-purple-200 hover:border-purple-400", 
      shadowColor: "shadow-purple-200/50",
      features: [
        "30 high-quality posts (mix of promotional, informative, and engaging content)",
        "Active community management (comments & DMs)",
        "Press releases & collaborations for credibility",
        "Monthly content review & planning",
        "Comprehensive performance insights",
        "Strategic growth recommendations",
        "Advanced profile optimization"
      ],
      notIncluded: [
        "Fully custom content strategy",
        "Dedicated account manager"
      ]
    },
    {
      name: "Custom Package",
      description: "Tailored social media management for unique needs",
      price: { monthly: 10000, annual: 108000 },
      icon: <Crown className="text-amber-500" size={28} />,
      color: "bg-amber-50 border-amber-200 hover:border-amber-400",
      shadowColor: "shadow-amber-200/50",
      features: [
        "Customizable social media management package",
        "Base package at ₹10,000/month",
        "Flexible service options",
        "Transparent pricing",
        "Tailored to your brand's specific needs",
        "Scalable services",
        "Clear breakdown of additional costs"
      ],
      notIncluded: [
        "Specific details to be discussed",
        "Pricing varies based on selected services"
      ]
    }
  ];

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto px-4 py-8 text-gray-800">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">Social Media Management Packages</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose the perfect package to elevate your social media presence and brand growth.
        </p>
        
        {/* Toggle */}
        <div className="flex items-center justify-center mt-8">
          <span className={`mr-3 ${!isAnnual ? 'font-medium' : 'text-gray-500'}`}>Monthly</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none"
          >
            <div className={`flex h-6 w-12 items-center rounded-full p-1 transition-colors ${isAnnual ? 'bg-blue-600' : 'bg-gray-300'}`}>
              <div 
                className={`h-4 w-4 transform rounded-full bg-white transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`}
              />
            </div>
          </button>
          <span className={`ml-3 flex items-center ${isAnnual ? 'font-medium' : 'text-gray-500'}`}>
            Yearly <span className="ml-1 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">Save 8%</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="w-full space-y-8">
        {pricingTiers.map((tier, index) => (
          <div 
            key={tier.name}
            className={`relative w-full rounded-xl border-2 transition-all duration-300 ${tier.color} ${
              hoveredTier === index ? `${tier.shadowColor} shadow-lg transform -translate-y-1` : 'shadow'
            }`}
            onMouseEnter={() => setHoveredTier(index)}
            onMouseLeave={() => setHoveredTier(null)}
          >
            {tier.popular && (
              <div className="absolute -top-3 right-6">
                <div className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </div>
              </div>
            )}
            
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="p-2 rounded-full bg-white mr-4">
                    {tier.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{tier.name}</h3>
                    <p className="text-gray-600">{tier.description}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-end justify-end">
                    <span className="text-3xl font-bold">
                      ₹{isAnnual ? tier.price.annual : tier.price.monthly}
                    </span>
                    <span className="text-gray-600 ml-1 mb-1">
                      {tier.price.monthly === 0 ? '' : `/${isAnnual ? 'year' : 'month'}`}
                    </span>
                  </div>
                  {isAnnual && tier.price.monthly > 0 && (
                    <div className="text-sm text-green-700">
                      Save ₹{(tier.price.monthly * 12) - tier.price.annual}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-8 grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">What's included:</h4>
                  <ul className="space-y-3">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {tier.notIncluded.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Not included:</h4>
                    <ul className="space-y-3">
                      {tier.notIncluded.map((feature, i) => (
                        <li key={i} className="flex items-start text-gray-500">
                          <X className="text-gray-400 mr-2 mt-0.5 flex-shrink-0" size={18} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="mt-8">
                <button 
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                    index === 3 
                      ? 'bg-white border-2 border-amber-500 text-amber-700 hover:bg-amber-50' 
                      : 'bg-gradient-to-r from-blue-600 to-[var(--primary)] hover:from-blue-700 hover:to-indigo-700 text-white'
                  }`}
                >
                  {index === 3 ? 'Book Consultation' : `Get ${tier.name}`}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Contact Section */}
      <div className="w-full mt-16 text-center">
        <h3 className="text-xl font-bold mb-2">Have questions about our packages?</h3>
        <p className="text-gray-600">Reach out to our team for personalized social media management solutions</p>
        <button className="mt-4 px-6 py-2 border-2 border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">
          <a href='/contact'>Contact Us</a>
        </button>
      </div>
    </div>
  );
}