import Navbar from '../components/home/Navbar'
import HeroScrollSequence from '../components/home/HeroScrollSequence'
import RotatingWordSection from '../components/home/RotatingWordSection'
import TabsSection from '../components/home/TabsSection'
import ImpactSection from '../components/home/ImpactSection'
import VideoCtaSection from '../components/home/VideoCtaSection'
import CaseStudiesSection from '../components/home/CaseStudiesSection'
import BadgeTicker from '../components/home/BadgeTicker'
import Footer from '../components/home/Footer'

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <section id="hero" className="scroll-mt-[88px]">
          <HeroScrollSequence />
        </section>
        <section id="solutions" className="scroll-mt-[88px]">
          <RotatingWordSection />
        </section>
        <section id="features" className="scroll-mt-[88px]">
          <TabsSection />
        </section>
        <section id="impact" className="scroll-mt-[88px]">
          <ImpactSection />
        </section>
        <section id="showcase" className="scroll-mt-[88px]">
          <VideoCtaSection />
        </section>
        <section id="case-studies" className="scroll-mt-[88px]">
          <CaseStudiesSection />
        </section>
        <section id="get-started" className="scroll-mt-[88px]">
          <BadgeTicker />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default LandingPage
