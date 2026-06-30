import '../styles/enterprise.css'
import SmoothScroll from '../components/enterprise/SmoothScroll'
import EnterpriseHeader from '../components/enterprise/EnterpriseHeader'
import EnterpriseHero from '../components/enterprise/EnterpriseHero'
import TrustSection from '../components/enterprise/TrustSection'
import ServicesSection from '../components/enterprise/ServicesSection'
import IndustriesSection from '../components/enterprise/IndustriesSection'
import WhyChooseHiveSurfSection from '../components/enterprise/WhyChooseHiveSurfSection'
import FeaturedSolutionsSection from '../components/enterprise/FeaturedSolutionsSection'
import EnterpriseCaseStudies from '../components/enterprise/EnterpriseCaseStudies'
import { AISolutionsSection } from '../components/enterprise/AIAndWhySection'
import { TestimonialsSection, InsightsSection } from '../components/enterprise/TestimonialsInsights'
import { FAQSection, ExtrasSection } from '../components/enterprise/FAQAndExtras'
import FinalCTASection from '../components/enterprise/FinalCTASection'
import EnterpriseFooter from '../components/enterprise/EnterpriseFooter'

const LandingPage = () => {
  return (
    <div className="enterprise-theme min-h-screen">
      <SmoothScroll>
        <EnterpriseHeader />
        <main>
          <EnterpriseHero />
          <TrustSection />
          <ServicesSection />
          <IndustriesSection />
          <WhyChooseHiveSurfSection />
          <FeaturedSolutionsSection />
          <EnterpriseCaseStudies />
          <AISolutionsSection />
          <TestimonialsSection />
          <InsightsSection />
          <FAQSection />
          <ExtrasSection />
          <FinalCTASection />
        </main>
        <EnterpriseFooter />
      </SmoothScroll>
    </div>
  )
}

export default LandingPage
