import { useEffect, useRef, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { company } from '../../data/enterpriseHome'
import PlatformOverview from './PlatformOverview'
import HiveContactLink from '../HiveContactLink'
import useReducedMotion from '../../hooks/useReducedMotion'

const heroBackgroundVideos = [
  { src: '/hero-videos/robotics-iot-lab.mp4', label: 'Engineers working with robotics and IoT systems' },
  { src: '/hero-videos/pcb-soldering-team.mp4', label: 'Technician soldering PCB components' },
  { src: '/hero-videos/software-team-coding.mp4', label: 'Software development team collaborating' },
  { src: '/hero-videos/ai-lab-collaboration.mp4', label: 'AI research team in laboratory' },
  { src: '/hero-videos/engineer-circuit-blueprint.mp4', label: 'Engineer reviewing circuit blueprints' },
]

const EnterpriseHero = () => {
  const reduced = useReducedMotion()
  const videoRefs = useRef([])
  const [activeVideoIdx, setActiveVideoIdx] = useState(0)

  const advanceVideo = () => {
    setActiveVideoIdx((current) => (current + 1) % heroBackgroundVideos.length)
  }

  useEffect(() => {
    if (reduced) return undefined

    videoRefs.current.forEach((video, idx) => {
      if (!video) return
      if (idx === activeVideoIdx) {
        video.currentTime = 0
        video.play().catch(() => {})
      } else {
        video.pause()
        video.currentTime = 0
      }
    })
  }, [activeVideoIdx, reduced])

  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden bg-[#f4f6fb]">
      <div className="absolute inset-0" aria-hidden>
        {reduced ? (
          <div className="ent-mesh h-full w-full" />
        ) : (
          heroBackgroundVideos.map((video, idx) => (
            <video
              key={video.src}
              ref={(el) => {
                videoRefs.current[idx] = el
              }}
              className={`ent-hero-video absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out ${
                idx === activeVideoIdx ? 'opacity-100' : 'opacity-0'
              }`}
              src={video.src}
              muted
              playsInline
              preload={idx <= 1 ? 'auto' : 'metadata'}
              aria-hidden
              onEnded={idx === activeVideoIdx ? advanceVideo : undefined}
            />
          ))
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-white/48" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_15%_20%,rgba(255,255,255,0.92),transparent_55%),radial-gradient(ellipse_70%_50%_at_85%_15%,rgba(255,255,255,0.75),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/88 via-white/58 to-white/28" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-[#f4f6fb]" />
      <div className="pointer-events-none absolute inset-0 ent-mesh opacity-35" />

      <div className="ent-container relative z-10 flex min-h-[100svh] flex-col justify-center pt-24 pb-20 lg:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            className="lg:col-span-7"
            initial={reduced ? false : { opacity: 0, y: 40 }}
            animate={reduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="ent-kicker">{company.tagline}</p>
            <h1 className="ent-heading-xl mt-6">
              Engineering Software
              <br />
              That Powers{' '}
              <span className="ent-gradient-text">Modern Businesses.</span>
            </h1>
            <p className="ent-body-lg mt-6 max-w-xl">
              We design, build, and scale custom software, AI-powered solutions, cloud platforms, and IoT
              systems — and help brands grow through social media and influencer marketing.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <HiveContactLink intent="meeting" source="enterprise-hero" className="ent-btn-primary">
                Start Your Project
                <ArrowRight className="h-4 w-4" />
              </HiveContactLink>
              <a href="#services" className="ent-btn-outline">
                Explore Services
              </a>
            </div>
          </motion.div>

          <motion.div
            className="relative lg:col-span-5"
            initial={reduced ? false : { opacity: 0, scale: 0.96 }}
            animate={reduced ? {} : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <PlatformOverview />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default EnterpriseHero
