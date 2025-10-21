import React from 'react'
import { ImageTrailHero } from '../components/ImageTrailHero'
import Services from '../components/Services'
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
        <Services/>
        <ServiceDetails/>
        <div style={{padding: '20px', background: 'white', margin: '20px', borderRadius: '10px'}}>
          <h3>Social Media Marketing</h3>
          <p>Turn engagement into measurable growth with powerful ad campaigns and strategic targeting.</p>
        </div>
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