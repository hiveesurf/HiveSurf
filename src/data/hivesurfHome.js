import { HIVE_LEAD_WHATSAPP_E164, hiveContactHref, hiveWhatsAppHref } from '../lib/leadActions'

const CONNECT_EMAIL = 'connect@hivesurf.com'

export const navItems = [
  {
    label: 'For enterprise brands',
    items: ['Campaign Studio', 'Creator Matching', 'Brand Safety', 'Enterprise API'],
  },
  {
    label: 'For social media managers',
    items: ['Scheduling', 'Content Library', 'Analytics Suite', 'Collaboration'],
  },
  {
    label: 'For creators',
    items: ['Creator Portal', 'Offers Inbox', 'Global Payouts', 'Media Kit'],
  },
  {
    label: 'Resources',
    items: ['Blog', 'Guides', 'Case Studies', 'Help Center'],
  },
]

export const heroReelCards = [
  { handle: '@abhijeet', image: '/abhijeet.jpg', gradient: 'from-indigo-500 to-fuchsia-500' },
  { handle: '@kaibalya', image: '/kaibalya.jpg', gradient: 'from-rose-500 to-amber-500' },
  { handle: '@studio.hive', image: '/image.png', gradient: 'from-emerald-500 to-cyan-500' },
  { handle: '@contentlab', image: '/ContentCreation.png', gradient: 'from-purple-500 to-pink-500' },
  { handle: '@brandwave', image: '/ContentMarketing.png', gradient: 'from-orange-500 to-red-500' },
  { handle: '@analyst', image: '/Analytics.png', gradient: 'from-sky-500 to-indigo-500' },
]

export const proofLogos = [
  '/logo.png', '/logoblue.png', '/logobrown.png', '/logogreen.png', '/logored.png',
  '/logo.svg', '/logoblue.png', '/logobrown.png', '/logogreen.png', '/logored.png',
  '/logo.png', '/logo.svg', '/logoblue.png', '/logobrown.png', '/logogreen.png',
]

export const proofRows = [
  proofLogos.slice(0, 5),
  proofLogos.slice(5, 10),
  proofLogos.slice(10, 15),
]

export const videoStrips = [
  {
    title: 'Campaign reels',
    gradient: 'linear-gradient(120deg, #fe3f00 0%, #ff8a3d 45%, #cb8aff 100%)',
    image: '/ContentCreation.png',
    widthOffset: 135,
  },
  {
    title: 'Creator storytelling',
    gradient: 'linear-gradient(120deg, #5124c1 0%, #cb8aff 50%, #f8f2ea 100%)',
    image: '/ContentMarketing.png',
    widthOffset: 270,
  },
  {
    title: 'Always-on analytics',
    gradient: 'linear-gradient(120deg, #000 0%, #5124c1 55%, #fe3f00 100%)',
    image: '/Analytics.png',
    widthOffset: 135,
  },
]

export const rotatingWords = ['campaign', 'creator', 'community']

export const tabs = [
  {
    id: 'plan',
    label: 'Plan',
    title: 'Plan every campaign with clarity',
    copy: 'Map out launches, briefs, approvals, and go-live dates on a collaborative canvas your whole team can see.',
    image: '/ContentStrategy.png',
    features: ['Briefs & moodboards', 'Creator shortlists', 'Approval workflows', 'Launch calendar'],
  },
  {
    id: 'create',
    label: 'Create',
    title: 'Create content creators actually love',
    copy: 'Match with vetted creators, co-author briefs, and spin up assets that feel native to every platform.',
    image: '/ContentCreation.png',
    features: ['Creator matching', 'Brief templates', 'Asset library', 'On-brand guardrails'],
  },
  {
    id: 'schedule',
    label: 'Schedule',
    title: 'Schedule anywhere your audience is',
    copy: 'Queue, auto-publish, and cross-post to Instagram, TikTok, YouTube, LinkedIn, and Pinterest from one place.',
    image: '/ContentScheduling.png',
    features: ['Cross-platform queue', 'Best-time suggestions', 'Bulk upload', 'First comment automation'],
  },
  {
    id: 'analyze',
    label: 'Analyze',
    title: 'Analyze every dollar and every post',
    copy: 'Track earned reach, attributed revenue, and creator performance with dashboards your CFO will trust.',
    image: '/Analytics.png',
    features: ['Creator ROI', 'Attributed revenue', 'Audience insights', 'Exportable reports'],
  },
]

export const stats = [
  { value: 16, prefix: '', suffix: 'M+', label: 'Creators matched with brands' },
  { value: 136, prefix: '', suffix: 'B', label: 'Content impressions delivered' },
  { value: 1, prefix: '', suffix: 'B+', label: 'Posts scheduled and shipped' },
  { value: 2, prefix: '$', suffix: 'B+', label: 'Revenue influenced for brands' },
]

// Each card links to Instagram; `image` is a portrait asset (IG avatars need Meta API to serve officially).
export const creatorCards = [
  {
    instagramHandle: 'muskaan.bedi07',
    instagramHref: 'https://www.instagram.com/muskaan.bedi07?igsh=YzJhaWNkcjdiczJw',
    niche: 'Fashion & lifestyle',
    image: '/jayde-laws-22DvVQ5o_II-unsplash.jpg',
    gradient: 'from-rose-400 to-amber-400',
  },
  {
    instagramHandle: 'gaurikatandon',
    instagramHref: 'https://www.instagram.com/gaurikatandon?igsh=dms4ZGR1Z2llY3d5',
    niche: 'Beauty & UGC',
    image: '/laura-chouette-cZL3VBRvpmQ-unsplash.jpg',
    gradient: 'from-indigo-400 to-purple-500',
  },
  {
    instagramHandle: 'dhruvii.trikaa',
    instagramHref: 'https://www.instagram.com/dhruvii.trikaa?igsh=c3ZhcTN6amRlMjY1',
    niche: 'Lifestyle reels',
    image: '/laura-chouette-j2Fxgt0-ilw-unsplash.jpg',
    gradient: 'from-emerald-400 to-cyan-500',
  },
  {
    instagramHandle: 'bhumika_nagpal13',
    instagramHref: 'https://www.instagram.com/bhumika_nagpal13?igsh=cW8ydnY2dXFhYTVq',
    niche: 'Creator content',
    image: '/dj-tears-plk-c3SdoJDyJ0k-unsplash.jpg',
    gradient: 'from-fuchsia-500 to-pink-500',
  },
  {
    instagramHandle: 'gul.slayz',
    instagramHref: 'https://www.instagram.com/gul.slayz?igsh=MTJweDNtYm03NHFoNg==',
    niche: 'Style & collabs',
    image: '/gul-slayz-portrait.jpg',
    gradient: 'from-orange-400 to-red-500',
  },
]

export const caseStudies = [
  {
    id: 'cs1',
    brand: 'UGC Style',
    style: 'ugc',
    metric: '4.2x ROAS',
    quote: 'HiveSurf turned a one-off creator push into a repeatable engine that scales with us every quarter.',
    author: 'Priya Shah, Head of Growth',
    image: '/kaibalya.jpg',
    gradient: 'linear-gradient(135deg, #fe3f00, #cb8aff)',
  },
  {
    id: 'cs2',
    brand: 'Influencer Style',
    style: 'influencer',
    metric: '+212% UGC',
    quote: 'We replaced three tools with HiveSurf and shipped our biggest launch in company history in 30 days.',
    author: 'Marcus Lee, Brand Director',
    image: '/abhijeet.jpg',
    gradient: 'linear-gradient(135deg, #5124c1, #cb8aff)',
  },
  {
    id: 'cs3',
    brand: 'Lifestyle Reels',
    style: 'lifestyle',
    metric: '38% lower CAC',
    quote: 'The creator intelligence is unreal. We finally know which creators move the needle and which ones do not.',
    author: 'Ana Kovacs, CMO',
    image: '/image.png',
    gradient: 'linear-gradient(135deg, #000, #5124c1)',
  },
  {
    id: 'cs4',
    brand: 'Product Reels',
    style: 'product',
    metric: '12M organic reach',
    quote: 'HiveSurf is the only platform that understands brand, creator, and analytics as one connected story.',
    author: 'Jordan Park, Social Lead',
    image: '/ContentMarketing.png',
    gradient: 'linear-gradient(135deg, #fe3f00, #5124c1)',
  },
]

export const contentGridCards = [
  { title: 'The 2026 creator economy report', tag: 'Report', image: '/Analytics.png' },
  { title: 'How to brief creators that actually convert', tag: 'Guide', image: '/ContentStrategy.png' },
  { title: 'Inside our TikTok ship rate playbook', tag: 'Playbook', image: '/ContentPosting.png' },
  { title: 'Building an always-on UGC engine', tag: 'Framework', image: '/ContentMarketing.png' },
  { title: 'Scheduling benchmarks from 10k brands', tag: 'Data', image: '/ContentScheduling.png' },
  { title: 'Measuring revenue from creators', tag: 'Deep dive', image: '/AccountCreation.png' },
]

export const badgeTicker = [
  'Creator matching',
  'Campaign planning',
  'Cross-platform scheduling',
  'Brand safety',
  'Attributed revenue',
  'Approval workflows',
  'Always-on analytics',
  'UGC engine',
  'Agency collaboration',
  'Global payouts',
]

export const footerColumns = [
  {
    heading: 'Navigate',
    links: [
      { label: 'Home', href: '/#hero' },
      { label: 'Solutions', href: '/#solutions' },
      { label: 'Features', href: '/#features' },
      { label: 'Impact', href: '/#impact' },
      { label: 'Showcase', href: '/#showcase' },
      { label: 'Case studies', href: '/#case-studies' },
      { label: 'Get started', href: '/#get-started' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { label: 'Book a strategy call', href: hiveContactHref({ intent: 'meeting', source: 'footer' }) },
      {
        label: 'Email',
        href: `mailto:${CONNECT_EMAIL}?subject=${encodeURIComponent('HiveSurf enquiry')}&body=${encodeURIComponent('Hi HiveSurf,\n\n')}`,
      },
      { label: 'WhatsApp', href: hiveWhatsAppHref('footerContact') },
      { label: 'Call', href: `tel:+${HIVE_LEAD_WHATSAPP_E164}` },
    ],
  },
]
