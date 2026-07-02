import { hiveContactHref } from '../lib/leadActions'

export const company = {
  name: 'HiveSurf',
  tagline: 'Engineering the Future of Digital Business',
  description:
    'HiveSurf is a digital engineering and growth company specializing in custom software, enterprise applications, AI solutions, cloud engineering, microcontroller and IoT systems, social media marketing, and influencer marketing.',
}

export const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services', mega: 'services' },
  { label: 'Industries', href: '#industries', mega: 'industries' },
  { label: 'Technologies', href: '#technologies', mega: 'technologies' },
  { label: 'Case Studies', href: '#case-studies', showFrom: 'xl' },
  { label: 'Insights', href: '#insights', showFrom: 'xl' },
  { label: 'About', href: '#about', showFrom: 'xl' },
]

export const megaMenus = {
  services: {
    title: 'Services',
    tagline: 'Explore our services',
    description:
      'End-to-end engineering and growth capabilities — from custom platforms, connected devices, and AI to social and influencer marketing.',
    cta: { label: 'View all services', href: '#services' },
    categories: [
      {
        label: 'Software Engineering',
        items: [
          'Custom Software Development',
          'Enterprise Applications',
          'Web Application Development',
          'Mobile App Development',
          'Cloud Engineering',
        ],
      },
      {
        label: 'Digital & AI',
        items: [
          'AI Solutions',
          'Digital Transformation',
          'API Development',
          'UI/UX Design',
          'Maintenance & Support',
        ],
      },
      {
        label: 'Growth & Marketing',
        items: [
          'Social Media Marketing',
          'Influencer Marketing',
          'Content Strategy',
          'Campaign Management',
        ],
        links: {
          'Social Media Marketing': '/marketing#solutions',
          'Influencer Marketing': '/marketing',
        },
      },
      {
        label: 'Microcontroller & IoT',
        items: [
          'Firmware Development',
          'IoT Device Prototyping',
          'Sensor & Gateway Integration',
          'Edge-to-Cloud Connectivity',
          'Remote Monitoring Dashboards',
          'OTA Updates & Device Management',
        ],
      },
    ],
  },
  industries: {
    title: 'Industries',
    tagline: 'Explore our industries',
    description:
      'Domain-aware delivery across regulated and high-growth sectors — with solutions shaped to your operating model.',
    cta: { label: 'View all industries', href: '#industries' },
    categories: [
      {
        label: 'Manufacturing',
        items: ['Production Systems', 'Inventory & SCM', 'Quality Analytics', 'Supplier Integration'],
      },
      {
        label: 'Healthcare',
        items: ['Patient Portals', 'Clinical Workflows', 'HIPAA Compliance', 'Care Coordination'],
      },
      {
        label: 'Finance',
        items: ['Digital Lending', 'Risk & Compliance', 'Payment Integrations', 'Reporting Dashboards'],
      },
      {
        label: 'Education',
        items: ['Learning Platforms', 'Student Portals', 'LMS Integration', 'Analytics'],
      },
      {
        label: 'Retail',
        items: ['E-commerce Platforms', 'Inventory Sync', 'Customer Engagement', 'Omnichannel'],
      },
      {
        label: 'Real Estate',
        items: ['Property Portals', 'Lead Management', 'Virtual Tours', 'CRM Integration'],
      },
      {
        label: 'Logistics',
        items: ['Fleet Tracking', 'Route Optimization', 'Warehouse Systems', 'Last-mile Delivery'],
      },
      {
        label: 'Travel & Hospitality',
        items: ['Booking Engines', 'Guest Experience', 'Revenue Management', 'Loyalty Programs'],
      },
      {
        label: 'Startups',
        items: ['MVP Development', 'Growth Marketing', 'Cloud Setup', 'Scale Architecture'],
      },
    ],
  },
  technologies: {
    title: 'Technologies',
    tagline: 'Explore our stack',
    description:
      'Modern, proven technologies across frontend, backend, cloud, data, and AI — chosen for reliability at scale.',
    cta: { label: 'View full stack', href: '#technologies' },
    categories: [
      {
        label: 'Frontend',
        items: ['React', 'Next.js', 'Angular', 'Vue'],
      },
      {
        label: 'Backend',
        items: ['Java', 'Spring Boot', 'Node.js', 'Python', '.NET'],
      },
      {
        label: 'Mobile',
        items: ['Flutter', 'React Native'],
      },
      {
        label: 'Cloud',
        items: ['AWS', 'Azure', 'Docker', 'Kubernetes'],
      },
      {
        label: 'Databases',
        items: ['PostgreSQL', 'MongoDB', 'Redis'],
      },
      {
        label: 'AI',
        items: ['OpenAI', 'LangChain', 'Vector Databases', 'Prompt Engineering'],
      },
      {
        label: 'Embedded & IoT',
        items: ['ESP32', 'Arduino', 'Raspberry Pi', 'STM32', 'MQTT', 'BLE', 'AWS IoT Core', 'FreeRTOS'],
      },
    ],
  },
}

export const trustStats = [
  { value: '120+', label: 'Projects Delivered' },
  { value: '12+', label: 'Industries Served' },
  { value: '15+', label: 'Years Combined Experience' },
  { value: '8+', label: 'Countries Supported' },
  { value: '98%', label: 'Client Satisfaction' },
]

export const services = [
  {
    id: 'custom-software',
    title: 'Custom Software',
    description: 'Tailored platforms engineered for your unique workflows, integrations, and growth trajectory.',
    capabilities: ['Product discovery', 'Modular architecture', 'Legacy modernization', 'Scalable backends'],
    image: '/services/custom-software.jpg',
    imageAlt: 'Engineering team collaborating on custom software',
  },
  {
    id: 'enterprise-apps',
    title: 'Enterprise Applications',
    description: 'Mission-critical systems with security, compliance, and performance at the core.',
    capabilities: ['ERP extensions', 'Role-based access', 'Audit trails', 'High availability'],
    image: '/services/enterprise-apps.jpg',
    imageAlt: 'Enterprise stakeholders in a strategy meeting',
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'High-performance web platforms built for conversion, reliability, and global scale.',
    capabilities: ['SPA & SSR', 'Design systems', 'Accessibility', 'Performance tuning'],
    image: '/services/web-development.jpg',
    imageAlt: 'Developers building web applications',
  },
  {
    id: 'mobile',
    title: 'Mobile Apps',
    description: 'Native-quality mobile experiences for iOS and Android with unified product logic.',
    capabilities: ['Cross-platform', 'Offline-first', 'Push & analytics', 'App store readiness'],
    image: '/services/mobile-apps.jpg',
    imageAlt: 'Professional using mobile technology in office',
  },
  {
    id: 'cloud',
    title: 'Cloud Engineering',
    description: 'Cloud-native infrastructure designed for resilience, observability, and cost efficiency.',
    capabilities: ['AWS & Azure', 'Kubernetes', 'CI/CD pipelines', 'Infrastructure as code'],
    image: '/services/cloud-engineering.jpg',
    imageAlt: 'Cloud infrastructure and digital connectivity',
  },
  {
    id: 'ai',
    title: 'AI Solutions',
    description: 'Production-grade AI embedded into products — not demos — with measurable business outcomes.',
    capabilities: ['LLM integration', 'RAG pipelines', 'Automation', 'Model evaluation'],
    image: '/services/ai-solutions.jpg',
    imageAlt: 'Team exploring AI and data-driven solutions',
  },
  {
    id: 'api',
    title: 'API Development',
    description: 'Robust APIs and microservices that connect systems and unlock new digital capabilities.',
    capabilities: ['REST & GraphQL', 'Event-driven', 'API gateways', 'Documentation'],
    image: '/services/api-development.jpg',
    imageAlt: 'Technical team reviewing system architecture',
  },
  {
    id: 'design',
    title: 'Product Design',
    description: 'Enterprise UX that reduces friction for complex workflows and decision-heavy users.',
    capabilities: ['Research & personas', 'Wireframes', 'Prototyping', 'Design ops'],
    image: '/services/product-design.jpg',
    imageAlt: 'Product design workshop with cross-functional team',
  },
  {
    id: 'iot',
    title: 'Microcontroller & IoT',
    description:
      'Connected devices and embedded systems — firmware, sensor networks, edge logic, and cloud dashboards for real-time monitoring and control.',
    capabilities: [
      'Firmware development',
      'ESP32 / Arduino / STM32',
      'Sensor & actuator integration',
      'MQTT / BLE / Wi-Fi',
      'IoT cloud dashboards',
      'OTA firmware updates',
    ],
    image: '/services/microcontroller-iot.jpg',
    imageAlt: 'Engineer working on embedded IoT hardware and microcontroller systems',
  },
]

export const growthServices = [
  {
    id: 'social-media',
    title: 'Social Media Marketing',
    description:
      'Build brand presence, engage audiences, and drive measurable growth across Instagram, LinkedIn, YouTube, and more.',
    capabilities: ['Content calendars', 'Community management', 'Paid social', 'Analytics & reporting'],
    image: '/growth/social-media.jpg',
    imageAlt: 'Creator taking a mirror selfie for social media content',
    imagePosition: 'object-[center_20%]',
  },
  {
    id: 'influencer',
    title: 'Influencer Marketing',
    description:
      'End-to-end creator campaigns — from niche matching and outreach to content production and performance tracking.',
    capabilities: ['Creator matching', 'Campaign strategy', 'UGC production', 'ROI reporting'],
    image: '/growth/influencer-marketing.jpg',
    imageAlt: 'Influencer presenting a product in lifestyle content',
    imagePosition: 'object-[center_25%]',
  },
]

export const industries = [
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    caption: 'Engineering teams on the plant floor',
    image: '/industries/manufacturing.jpg',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    caption: 'Clinical & care coordination platforms',
    image: '/industries/healthcare.jpg',
  },
  {
    id: 'finance',
    name: 'Finance',
    caption: 'Secure fintech & enterprise banking',
    image: '/industries/finance.jpg',
  },
  {
    id: 'retail',
    name: 'Retail',
    caption: 'Omnichannel commerce experiences',
    image: '/industries/retail.jpg',
  },
  {
    id: 'education',
    name: 'Education',
    caption: 'Learning platforms at scale',
    image: '/industries/education.jpg',
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    caption: 'Property & portfolio management',
    image: '/industries/real-estate.jpg',
  },
  {
    id: 'logistics',
    name: 'Logistics',
    caption: 'Supply chain visibility & ops',
    image: '/industries/logistics.jpg',
  },
  {
    id: 'travel',
    name: 'Travel',
    caption: 'Booking & hospitality systems',
    image: '/industries/travel.jpg',
  },
  {
    id: 'startups',
    name: 'Startups',
    caption: 'Product teams shipping fast',
    image: '/industries/startups.jpg',
  },
]

export const deliveryTimeline = [
  'Discover',
  'Strategy',
  'Design',
  'Development',
  'Testing',
  'Deployment',
  'Support',
]

export const devProcess = [
  'Discovery',
  'Planning',
  'Architecture',
  'Design',
  'Development',
  'QA',
  'Deployment',
  'Optimization',
]

export const techCategories = [
  { name: 'Frontend', items: ['React', 'Next.js', 'Angular', 'Vue'] },
  { name: 'Backend', items: ['Java', 'Spring Boot', 'Node.js', 'Python', '.NET'] },
  { name: 'Cloud', items: ['AWS', 'Azure', 'Docker', 'Kubernetes'] },
  { name: 'Database', items: ['PostgreSQL', 'MongoDB', 'Redis'] },
  { name: 'DevOps', items: ['GitHub Actions', 'Terraform', 'Grafana', 'Jenkins'] },
  { name: 'AI', items: ['OpenAI', 'LangChain', 'Vector DB', 'RAG'] },
  { name: 'Embedded & IoT', items: ['ESP32', 'Arduino', 'Raspberry Pi', 'STM32', 'MQTT', 'BLE', 'AWS IoT Core', 'FreeRTOS'] },
]

export const featuredSolutions = [
  {
    id: 'marketplace',
    category: 'Marketplace Platform',
    headline: ['Digital Commerce', 'Reimagined.'],
    description:
      'Helping businesses build scalable online marketplaces with secure payments, vendor onboarding, inventory management, and seamless customer experiences that drive digital growth.',
    highlights: [
      'Vendor Management',
      'Product Catalog',
      'Payment Gateway',
      'Inventory',
      'Order Tracking',
      'Analytics',
    ],
    image: '/featured-solutions/marketplace.jpg',
    imageAlt: 'Digital commerce marketplace platform',
    device: 'laptop',
  },
  {
    id: 'restaurant',
    category: 'Restaurant Platform',
    headline: ['Transforming', 'Restaurant Operations.'],
    description:
      'An integrated restaurant ecosystem that streamlines online ordering, kitchen workflows, inventory, POS, table management, and customer engagement from one intelligent platform.',
    highlights: ['Online Ordering', 'Kitchen Display', 'POS', 'Reservations', 'Billing', 'Inventory'],
    image: '/featured-solutions/restaurant.jpg',
    imageAlt: 'Restaurant operations and dining platform',
    device: 'tablet',
  },
  {
    id: 'erp',
    category: 'Enterprise ERP',
    headline: ['One Platform.', 'Every Business Process.'],
    description:
      'A centralized ERP solution connecting finance, HR, inventory, procurement, operations, reporting, and decision-making into one scalable enterprise platform.',
    highlights: ['Finance', 'Procurement', 'HR', 'Inventory', 'Reports', 'Operations'],
    image: '/featured-solutions/erp.jpg',
    imageAlt: 'Enterprise resource planning dashboard',
    device: 'desktop',
  },
  {
    id: 'crm',
    category: 'CRM Platform',
    headline: ['Smarter Customer', 'Relationships.'],
    description:
      'Helping sales teams manage leads, automate workflows, improve customer engagement, and close more deals through one intelligent CRM platform.',
    highlights: [
      'Lead Management',
      'Sales Pipeline',
      'Automation',
      'Reports',
      'Customer Portal',
      'Analytics',
    ],
    image: '/featured-solutions/crm.jpg',
    imageAlt: 'CRM analytics and sales pipeline',
    device: 'laptop',
  },
  {
    id: 'manufacturing',
    category: 'Manufacturing Dashboard',
    headline: ['Real-Time Manufacturing', 'Intelligence.'],
    description:
      'Production monitoring, operational analytics, inventory visibility, and factory performance insights—all from one centralized digital dashboard.',
    highlights: ['Production', 'Inventory', 'Machine Monitoring', 'Reports', 'KPIs', 'Analytics'],
    image: '/featured-solutions/manufacturing.jpg',
    imageAlt: 'Manufacturing intelligence dashboard',
    device: 'desktop',
  },
  {
    id: 'ai-knowledge',
    category: 'AI Knowledge Assistant',
    headline: ['Enterprise Knowledge,', 'Powered by AI.'],
    description:
      'Transform company knowledge into intelligent conversations using AI-powered search, document understanding, workflow automation, and enterprise assistants.',
    highlights: ['AI Search', 'RAG', 'Knowledge Base', 'Automation', 'Document AI', 'AI Assistant'],
    image: '/featured-solutions/ai-knowledge.jpg',
    imageAlt: 'AI knowledge assistant interface',
    device: 'glass',
  },
]

/** Background theme per featured solution row */
export const featuredSolutionThemes = [
  'light',
  'muted',
  'light',
  'muted',
  'light',
  'muted',
]

export const caseStudies = [
  {
    id: 'cs-erp',
    title: 'Enterprise Operations Platform',
    industry: 'Manufacturing',
    challenge: 'Legacy systems fragmented production, inventory, and supplier workflows across regions.',
    solution: 'Unified cloud-native platform with real-time dashboards and API integrations.',
    tech: ['Java', 'Spring Boot', 'React', 'AWS', 'PostgreSQL'],
    impact: 'Reduced operational reporting time by 60% and improved cross-team visibility.',
    image: '/case-studies/manufacturing-platform.jpg',
    imageAlt: 'Engineer working on production systems in a manufacturing facility',
  },
  {
    id: 'cs-health',
    title: 'Patient Engagement Portal',
    industry: 'Healthcare',
    challenge: 'Clinic network needed secure digital intake, scheduling, and care coordination.',
    solution: 'HIPAA-aware web and mobile portal with role-based workflows and analytics.',
    tech: ['Node.js', 'React Native', 'Azure', 'MongoDB'],
    impact: 'Increased digital appointment bookings and lowered front-desk load.',
    image: '/case-studies/healthcare-portal.jpg',
    imageAlt: 'Healthcare professional using digital tools for patient care',
  },
  {
    id: 'cs-fintech',
    title: 'Digital Lending Engine',
    industry: 'Finance',
    challenge: 'Manual underwriting slowed loan approvals and limited product scalability.',
    solution: 'Automated decisioning pipeline with audit logs and partner API layer.',
    tech: ['Python', '.NET', 'React', 'Redis', 'Kubernetes'],
    impact: 'Accelerated approval cycles while maintaining compliance controls.',
    image: '/case-studies/fintech-lending.jpg',
    imageAlt: 'Financial analytics and digital banking',
  },
]

export const aiSolutions = [
  { title: 'AI Chatbots', description: 'Context-aware assistants for support, sales, and internal ops.' },
  { title: 'Knowledge Assistants', description: 'Enterprise search across documents, wikis, and ticket history.' },
  { title: 'Workflow Automation', description: 'Intelligent routing and task automation across business systems.' },
  { title: 'Document Intelligence', description: 'Extract, classify, and summarize unstructured business data.' },
  { title: 'AI Agents', description: 'Autonomous agents for multi-step operational workflows.' },
  { title: 'Predictive Analytics', description: 'Forecast demand, risk, and performance with ML pipelines.' },
]

export const whyChoosePremium = [
  {
    icon: 'search',
    title: 'Business First',
    description:
      'Every successful digital product begins with understanding your business—not just your technical requirements. We invest time in learning your goals, challenges, users, and growth plans before proposing any solution.',
    points: [
      'Business Discovery Workshops',
      'Requirement Analysis',
      'Product Strategy',
      'Solution Consulting',
    ],
    tag: 'Business Driven',
    image: '/why-choose/business-first.jpg',
    imageAlt: 'Executive strategy session and business discovery workshop',
  },
  {
    icon: 'layers',
    title: 'Engineering Excellence',
    description:
      'Our engineering team builds secure, scalable, and maintainable software using modern architecture, clean code principles, and industry best practices. Every solution is designed for long-term growth rather than short-term delivery.',
    points: ['Scalable Architecture', 'Clean Code', 'Secure Development', 'Modern Technologies'],
    tag: 'Built to Scale',
    image: '/why-choose/engineering.jpg',
    imageAlt: 'Software engineers reviewing architecture and code quality',
  },
  {
    icon: 'shield-check',
    title: 'Transparent Delivery',
    description:
      'We believe successful projects are built through clear communication, predictable milestones, and complete visibility throughout the development lifecycle. Clients always know what is being built, when it will be delivered, and what comes next.',
    points: [
      'Weekly Progress Updates',
      'Agile Methodology',
      'Dedicated Project Management',
      'Clear Milestones',
    ],
    tag: 'No Surprises',
    image: '/why-choose/delivery.jpg',
    imageAlt: 'Agile sprint planning and transparent project delivery',
  },
  {
    icon: 'handshake',
    title: 'Long-Term Partnership',
    description:
      "Our relationship doesn't end at deployment. We continue supporting, improving, and evolving your digital products as your business grows. We're invested in your long-term success.",
    points: [
      'Continuous Support',
      'Performance Optimization',
      'Feature Enhancements',
      'Technology Roadmap',
    ],
    tag: 'Built for the Future',
    image: '/why-choose/partnership.jpg',
    imageAlt: 'Client partnership handshake and long-term collaboration',
  },
]

export const whyChoose = [
  { title: 'Enterprise Architecture', description: 'Systems designed for scale, security, and long-term maintainability.' },
  { title: 'Scalable Solutions', description: 'Modular platforms that grow with users, data, and market expansion.' },
  { title: 'Agile Development', description: 'Transparent sprints with measurable milestones and stakeholder visibility.' },
  { title: 'Transparent Communication', description: 'Dedicated channels, status reporting, and executive-ready updates.' },
  { title: 'Modern Technology', description: 'Current stacks chosen for performance, talent availability, and longevity.' },
  { title: 'Long-Term Partnership', description: 'Beyond launch — optimization, support, and continuous improvement.' },
]

export const testimonials = [
  {
    quote: 'HiveSurf delivered a production platform our engineering team could extend — not replace.',
    name: 'VP Engineering',
    company: 'Industrial SaaS Client',
    industry: 'Industrial SaaS',
    result: 'Platform live in 16 weeks with zero critical launch defects.',
  },
  {
    quote: 'Their architecture decisions saved us months of rework during our cloud migration.',
    name: 'CTO',
    company: 'FinTech Scale-up',
    industry: 'FinTech',
    result: '40% infrastructure cost reduction post-optimization.',
  },
  {
    quote: 'Professional, structured, and deeply technical — exactly what enterprise procurement expects.',
    name: 'Director of Digital',
    company: 'Healthcare Network',
    industry: 'Healthcare',
    result: 'Unified 3 legacy portals into one secure experience.',
  },
]

export const insights = [
  {
    tag: 'AI',
    title: 'Building Production RAG Systems That Enterprises Can Trust',
    excerpt: 'How to design retrieval pipelines, guardrails, and evaluation loops for mission-critical AI.',
    date: 'Mar 2026',
    readTime: '8 min read',
  },
  {
    tag: 'Cloud',
    title: 'Cloud Migration Patterns for Legacy .NET and Java Estates',
    excerpt: 'Practical patterns for phased migration without disrupting core business operations.',
    date: 'Feb 2026',
    readTime: '6 min read',
  },
  {
    tag: 'Architecture',
    title: 'Modular Monolith vs Microservices: A Decision Framework',
    excerpt: 'A structured approach to choosing the right architecture for your team and scale.',
    date: 'Jan 2026',
    readTime: '7 min read',
  },
  {
    tag: 'Engineering',
    title: 'Platform Engineering for Mid-Market Product Teams',
    excerpt: 'Internal developer platforms that accelerate delivery without enterprise overhead.',
    date: 'Dec 2025',
    readTime: '5 min read',
  },
]

export const faqs = [
  {
    q: 'What types of software projects does HiveSurf take on?',
    a: 'We build custom platforms, enterprise applications, mobile apps, cloud infrastructure, and AI-powered products for startups through large organizations.',
  },
  {
    q: 'How do you approach enterprise security and compliance?',
    a: 'Security is embedded from architecture through deployment — access control, encryption, audit logging, and compliance-aligned delivery practices.',
  },
  {
    q: 'Can HiveSurf work with our existing engineering team?',
    a: 'Yes. We frequently augment internal teams with dedicated squads, architects, and specialists while aligning to your SDLC.',
  },
  {
    q: 'What is your typical engagement model?',
    a: 'Fixed-scope delivery, dedicated teams, and strategic advisory — structured around discovery, roadmap alignment, and transparent milestones.',
  },
  {
    q: 'Do you provide post-launch support?',
    a: 'We offer maintenance, SLA-based support, performance optimization, and continuous feature development.',
  },
  {
    q: 'Do you offer social media and influencer marketing?',
    a: 'Yes. Alongside software engineering, HiveSurf runs social media management, paid social, influencer campaigns, and creator-led content programs with transparent reporting and ROI focus.',
  },
]

export const footerColumns = [
  {
    heading: 'Services',
    links: ['Custom Software', 'Enterprise Apps', 'Cloud Engineering', 'AI Solutions', 'Microcontroller & IoT', 'Social Media Marketing', 'Influencer Marketing'],
  },
  {
    heading: 'Industries',
    links: ['Manufacturing', 'Healthcare', 'Finance', 'Retail', 'Startups'],
  },
  {
    heading: 'Technologies',
    links: ['React & Next.js', 'Java & Spring', 'AWS & Azure', 'PostgreSQL', 'AI & LLMs'],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#about' },
          { label: 'Contact', href: '/contact' },
      { label: 'Insights', href: '#insights' },
    ],
  },
  {
    heading: 'Resources',
    links: ['Case Studies', 'Engineering Blog', 'Open Source', 'Innovation Lab'],
  },
]

export const extras = {
  awards: ['ISO-aligned delivery', 'Cloud partner ecosystem', 'Agile certified teams'],
  culture: ['Engineering excellence', 'Continuous learning', 'Remote-first collaboration'],
}

export const ctaLinks = {
  discovery: hiveContactHref({ intent: 'meeting', source: 'enterprise-discovery' }),
  contact: '/contact',
}
