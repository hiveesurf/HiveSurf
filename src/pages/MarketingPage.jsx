import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar, { marketingSectionLinks } from '../components/home/Navbar'
import HeroScrollSequence from '../components/home/HeroScrollSequence'
import RotatingWordSection from '../components/home/RotatingWordSection'
import TabsSection from '../components/home/TabsSection'
import ImpactSection from '../components/home/ImpactSection'
import CaseStudiesSection from '../components/home/CaseStudiesSection'
import QuoteSection from '../components/QuoteSection'
import VideoCtaSection from '../components/home/VideoCtaSection'
import Footer from '../components/home/Footer'

const AnchorSection = ({ id, children, className = '' }) => (
  <div id={id} className={`scroll-mt-24 ${className}`.trim()}>
    {children}
  </div>
)

const MarketingPage = () => {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return undefined

    const scrollToHash = () => {
      const id = hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    const timer = window.setTimeout(scrollToHash, 120)
    return () => window.clearTimeout(timer)
  }, [hash])

  return (
    <div className="min-h-screen bg-gridglow">
      <Navbar links={marketingSectionLinks} />

      <main>
        <AnchorSection id="hero">
          <HeroScrollSequence />
        </AnchorSection>

        <RotatingWordSection />

        <AnchorSection id="solutions">
          <TabsSection />
        </AnchorSection>

        <AnchorSection id="impact">
          <ImpactSection />
        </AnchorSection>

        <AnchorSection id="case-studies">
          <CaseStudiesSection />
        </AnchorSection>

        <QuoteSection />

        <AnchorSection id="get-started">
          <VideoCtaSection />
        </AnchorSection>
      </main>

      <Footer />
    </div>
  )
}

export default MarketingPage
