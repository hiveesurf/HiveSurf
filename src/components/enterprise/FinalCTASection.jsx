import { ArrowRight } from 'lucide-react'
import SectionReveal from './SectionReveal'
import HiveContactLink from '../HiveContactLink'
import { Link } from 'react-router-dom'

const FinalCTASection = () => (
  <section id="contact" className="relative scroll-mt-24 overflow-hidden bg-[#eef2fa] py-24 ent-mesh lg:py-32">
    <div className="ent-container relative z-10 text-center">
      <SectionReveal>
        <h2 className="ent-heading-xl">
          Let&apos;s Build Something
          <br />
          <span className="ent-gradient-text">Exceptional Together</span>
        </h2>
        <p className="ent-body-lg mx-auto mt-6 max-w-2xl">
          Whether you&apos;re building a new digital product, modernizing existing systems, or accelerating
          innovation with AI, HiveSurf is ready to help.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <HiveContactLink intent="meeting" source="enterprise-final-cta" className="ent-btn-primary">
            Book Discovery Call
            <ArrowRight className="h-4 w-4" />
          </HiveContactLink>
          <Link to="/contact" className="ent-btn-outline">
            Contact Us
          </Link>
        </div>
      </SectionReveal>
    </div>
  </section>
)

export default FinalCTASection
