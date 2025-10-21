import React from 'react'
import { ImageTrailHero } from '../components/ImageTrailHero'
import ServiceCards from '../components/ServiceCards'
import ServiceDetails from '../components/ServiceDetails'
import Testimonials from '../components/Testimonials'
import MeetOurTeam from '../components/MeetOurTeam'
import SuccessStories from '../components/SuccessStories'
import WhyChooseHiveSurf from '../components/WhyChooseHiveSurf'
import QuoteSection from '../components/QuoteSection'
import FinalCTA from '../components/FinalCTA'

const LandingPage = () => {
  return (
    <>
      <ImageTrailHero/>
      <div id="our-services">
        <ServiceCards/>
        <ServiceDetails/>
      </div>
      <div id="testimonials">
        <Testimonials/>
      </div>
      <div id="meet-our-team">
        <MeetOurTeam/>
      </div>
      <SuccessStories/>
      <WhyChooseHiveSurf/>
      <QuoteSection/>
      <FinalCTA/>
    </>
  )
}

export default LandingPage