export const openRoles = [
  {
    id: 'junior-digital-marketer',
    title: 'Junior Digital Marketer / Intern',
    department: 'Marketing & Growth',
    category: 'Social Media Marketing',
    location: 'Work from Home',
    type: 'Full-time',
    experience: '0–1 Year',
    salary: '₹1.2 LPA',
    status: 'open',
    overview: `We are looking for a hands-on Digital Marketing Intern / Junior Marketer who wants to learn real growth, not theory.

This role is for people who want to execute, test, fail fast, and learn fast across content, social media, SEO, and paid campaigns.

You will work directly with founders and the core team, not be parked under layers of management. If you're looking for "just certificates," this is not for you.`,
    responsibilities: [
      'Create, edit, and publish short-form videos (Reels, Shorts, YouTube clips) for brand growth',
      'Use AI tools to speed up content creation (scripts, captions, thumbnails, hooks)',
      'Experiment with AI-based video editing, subtitles, voiceovers, and content repurposing',
      'Manage and grow content on Instagram',
      'Research trends, competitors, viral formats, and growth experiments',
      'Work closely with founders to test new ideas fast and double down on what works',
    ],
    offers: [
      'Work from Home',
      'Growth & startup culture',
      'A chance to grow with a vision and become a core member',
    ],
    requirements: [
      'English & Hindi communication is mandatory',
      'Basic understanding of digital marketing concepts (SEO, social media, ads)',
      'Ability to write clear, simple content (no fancy jargon)',
      'Comfortable using tools like Canva, Google Docs, basic Excel',
      'Pune-based candidates preferred (not mandatory)',
    ],
  },
]

export function getOpenRole(id) {
  return openRoles.find((role) => role.id === id) ?? null
}

export function getOpenRoles() {
  return openRoles.filter((role) => role.status === 'open')
}
