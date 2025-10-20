import { useState } from 'react';
import {
  Check, X, Zap, Award, Rocket, Crown,
  Globe, Code, Database, Shield
} from 'lucide-react';

export default function ServiceCategories() {
  const [activeCategory, setActiveCategory] = useState('social');
  const [hoveredTier, setHoveredTier] = useState(null);

  const socialMediaPackages = [
    {
      name: "Essential Package",
      description: "Perfect for brands starting their social media journey",
      icon: <Zap className="text-[var(--primary)]" size={28} />,
      color: "bg-[var(--primary)]/10 border-[var(--primary)] hover:border-[var(--primary)]/80",
      shadowColor: "shadow-[var(--primary)]/50",
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
      icon: <Award className="text-[var(--primary)]" size={28} />,
      popular: true,
      color: "bg-[var(--primary)]/10 border-[var(--primary)] hover:border-[var(--primary)]/80",
      shadowColor: "shadow-[var(--primary)]/50",
      features: [
        "20 professionally designed posts (carousels, informative content, promotional graphics)",
        "8 engaging reels/videos",
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
      icon: <Rocket className="text-[var(--primary)]" size={28} />,
      color: "bg-[var(--primary)]/10 border-[var(--primary)] hover:border-[var(--primary)]/80",
      shadowColor: "shadow-[var(--primary)]/50",
      features: [
        "30 high-quality posts (mix of promotional, informative, and engaging content)",
        "12 professional reels/videos",
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
      icon: <Crown className="text-[var(--accent)]" size={28} />,
      color: "bg-[var(--accent)]/10 border-[var(--accent)] hover:border-[var(--accent)]/80",
      shadowColor: "shadow-[var(--accent)]/50",
      features: [
        "Customizable social media management package",
        "Flexible service options",
        "Social media audit & competitive analysis",
        "Content creation for specific platforms",
        "Tailored to your brand's specific needs",
        "Scalable services",
        "Performance tracking & reporting"
      ],
      notIncluded: [
        "Specific details to be discussed during consultation",
        "Services vary based on selected package components"
      ]
    }
  ];

  const websiteDevelopmentPackages = [
    {
      name: "Basic Website",
      description: "Perfect for small businesses getting started online",
      icon: <Globe className="text-[var(--primary)]" size={28} />,
      color: "bg-[var(--primary)]/10 border-[var(--primary)] hover:border-[var(--primary)]/80",
      shadowColor: "shadow-[var(--primary)]/50",
      features: [
        "5-page responsive website",
        "Mobile-friendly design",
        "Contact form integration",
        "Basic SEO setup",
        "Social media integration",
        "Google Analytics setup",
        "1 round of revisions"
      ],
      notIncluded: [
        "Content creation",
        "E-commerce functionality",
        "Custom animations"
      ]
    },
    {
      name: "Business Website",
      description: "Professional website for established businesses",
      icon: <Code className="text-[var(--primary)]" size={28} />,
      popular: true,
      color: "bg-[var(--primary)]/10 border-[var(--primary)] hover:border-[var(--primary)]/80",
      shadowColor: "shadow-[var(--primary)]/50",
      features: [
        "10-page responsive website",
        "Advanced design elements",
        "Content Management System",
        "Blog setup & integration",
        "Advanced contact forms",
        "Comprehensive SEO optimization",
        "Google Business profile setup",
        "2 rounds of revisions"
      ],
      notIncluded: [
        "E-commerce functionality",
        "Custom web applications",
        "Ongoing maintenance"
      ]
    },
    {
      name: "E-commerce Website",
      description: "Complete online store solution",
      icon: <Database className="text-[var(--primary)]" size={28} />,
      color: "bg-[var(--primary)]/10 border-[var(--primary)] hover:border-[var(--primary)]/80",
      shadowColor: "shadow-[var(--primary)]/50",
      features: [
        "Full e-commerce functionality",
        "Product catalog setup (up to 50 products)",
        "Secure payment gateway integration",
        "Inventory management system",
        "Order processing & tracking",
        "Customer account creation",
        "Product search & filtering",
        "Mobile-optimized shopping experience",
        "3 rounds of revisions"
      ],
      notIncluded: [
        "Product photography",
        "Custom product descriptions",
        "Marketplace integrations"
      ]
    },
    {
      name: "Custom Website Solution",
      description: "Tailored website development for unique requirements",
      icon: <Shield className="text-[var(--accent)]" size={28} />,
      color: "bg-[var(--accent)]/10 border-[var(--accent)] hover:border-[var(--accent)]/80",
      shadowColor: "shadow-[var(--accent)]/50",
      features: [
        "Custom web development",
        "Tailored functionality",
        "Advanced integrations",
        "Complex web applications",
        "Custom database design",
        "API development",
        "Progressive Web App capabilities",
        "Comprehensive technical support"
      ],
      notIncluded: [
        "Specific details to be discussed during consultation",
        "Features vary based on project requirements"
      ]
    }
  ];

  const packages = activeCategory === 'social' ? socialMediaPackages : websiteDevelopmentPackages;

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto px-4 py-8 text-gray-800">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">Our Service Packages</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose the perfect package that suits your business needs and goals.
        </p>
        <div className="flex items-center justify-center mt-8 border border-gray-200 rounded-lg p-1 bg-white shadow-sm">
          <button
            onClick={() => setActiveCategory('social')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeCategory === 'social'
                ? 'bg-[var(--primary)] text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Social Media
          </button>
          <button
            onClick={() => setActiveCategory('website')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeCategory === 'website'
                ? 'bg-[var(--primary)] text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Website Development
          </button>
        </div>
      </div>

      <div className="w-full text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">
          {activeCategory === 'social' ? 'Social Media Management' : 'Website Development'} Packages
        </h3>
        <p className="text-gray-600 max-w-3xl mx-auto">
          {activeCategory === 'social'
            ? 'Elevate your brand presence with our comprehensive social media management solutions.'
            : 'Establish your online presence with our professional website development services.'}
        </p>
      </div>

      <div className="w-full space-y-8">
        {packages.map((tier, index) => (
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
                <div className="bg-[var(--primary)] text-white text-xs font-medium px-3 py-1 rounded-full">
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
                      ? 'bg-white border-2 border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/10'
                      : 'bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white'
                  }`}
                >
                  {index === 3 ? 'Book Consultation' : `Get ${tier.name}`}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full mt-16 text-center">
        <h3 className="text-xl font-bold mb-2">Have questions about our packages?</h3>
        <p className="text-gray-600">Reach out to our team for personalized solutions</p>
        <button className="mt-4 px-6 py-2 border-2 border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">
          <a href="/contact">Contact Us</a>
        </button>
      </div>
    </div>
  );
}
