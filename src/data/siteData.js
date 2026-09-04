const logo = new URL('../../assets/logo.jpg', import.meta.url).href

const eventImages = [
  new URL('../../events/IMG-20260624-WA0010.jpg', import.meta.url).href,
  new URL('../../events/IMG-20260625-WA0050.jpg', import.meta.url).href,
  new URL('../../events/IMG-20260826-WA0008.jpg', import.meta.url).href,
  new URL('../../events/IMG-20260826-WA0011.jpg', import.meta.url).href,
  new URL('../../events/IMG-20260826-WA0013.jpg', import.meta.url).href,
  new URL('../../events/IMG-20260826-WA0014.jpg', import.meta.url).href,
  new URL('../../events/IMG-20260826-WA0017.jpg', import.meta.url).href,
  new URL('../../events/IMG-20260826-WA0020.jpg', import.meta.url).href,
  new URL('../../events/IMG-20260826-WA0021.jpg', import.meta.url).href,
  new URL('../../events/IMG-20260826-WA0024.jpg', import.meta.url).href,
]

export const siteConfig = {
  brandName: 'Pen-Power Initiative',
  tagline: 'Raising a Conscious Generation',
  logo,
  primaryColor: '#0E7C72',
  accentColor: '#F4B942',
  textColor: '#17312F',
  email: 'hello@penpowerinitiative.org',
  phone: '+234 (0) 800 000 0000',
  address: '12 Community Outreach Lane, Lagos, Nigeria',
  socialLinks: {
    facebook: 'https://facebook.com/penpowerinitiative',
    instagram: 'https://instagram.com/penpowerinitiative',
    twitter: 'https://x.com/penpowerinitiative',
    linkedin: 'https://linkedin.com/company/penpowerinitiative',
  },
}

export const stats = [
  { label: 'Young people reached', value: '12k+' },
  { label: 'Community programs', value: '48' },
  { label: 'Volunteers mobilized', value: '860+' },
  { label: 'Literacy packs donated', value: '5.8k' },
]

export const programCards = [
  {
    icon: 'BookOpen',
    title: 'Literacy & Educational Support',
    description:
      'We provide books, writing materials, and learning support to children and teens with limited access to learning resources.',
  },
  {
    icon: 'Users',
    title: 'Mentorship & Personal Development',
    description:
      'Our mentorship model nurtures confidence, purpose, and self-awareness in young people through guided support.',
  },
  {
    icon: 'Sparkles',
    title: 'Leadership Development',
    description:
      'We prepare young people to become ethical, thoughtful leaders who can lead with empathy and responsibility.',
  },
  {
    icon: 'BrainCircuit',
    title: 'Critical Thinking & Consciousness',
    description:
      'We encourage independent thinking, reflection, and awareness of personal and social responsibility.',
  },
]

export const values = [
  'Every child carries potential.',
  'Every young person deserves an opportunity.',
  'Every voice deserves to be heard.',
  'Every generation can be better prepared than the one before it.',
]

export const galleryItems = [
  { title: 'School outreach', image: eventImages[0], alt: 'Students in a school mentorship session' },
  { title: 'Reading club', image: eventImages[1], alt: 'Children reading together' },
  { title: 'Community seminar', image: eventImages[2], alt: 'A seminar for youth development' },
  { title: 'Leadership training', image: eventImages[3], alt: 'Leadership workshop for teenagers' },
  { title: 'Mentorship circle', image: eventImages[4], alt: 'Young people in mentorship discussion' },
  { title: 'Youth impact event', image: eventImages[5], alt: 'Youth participation in community impact event' },
]

export const eventTimeline = [
  {
    date: 'Jan 2024',
    title: 'School Reading Campaign',
    description: 'Distributed reading packs and facilitated literacy sessions in underserved schools.',
    image: eventImages[6],
  },
  {
    date: 'Apr 2024',
    title: 'Mentorship Bootcamp',
    description: 'Built confidence and guidance plans for teenagers preparing for leadership roles.',
    image: eventImages[7],
  },
  {
    date: 'Aug 2024',
    title: 'Community Outreach Week',
    description: 'Worked with parents, educators, and volunteers to reach more young people with support.',
    image: eventImages[8],
  },
  {
    date: 'Nov 2024',
    title: 'Youth Leadership Seminar',
    description: 'Brought together speakers, mentors, and learners to inspire purpose-driven leadership.',
    image: eventImages[9],
  },
]

export const events = [
  {
    id: 'conscious-leadership-forum',
    slug: 'conscious-leadership-forum',
    title: 'Conscious Leadership Forum',
    description: 'An open conversation on purpose, empathy, and responsible leadership for the next generation.',
    image: eventImages[2],
    startsAt: '2026-10-17T10:00:00+01:00',
    endsAt: '2026-10-17T13:00:00+01:00',
    timezone: 'WAT',
    meetingLink: 'https://meet.google.com/pen-power-forum',
    host: { name: 'Ada Okafor', image: eventImages[3] },
    guests: [{ name: 'Samuel Adebayo', image: eventImages[4] }],
    capacity: 120,
    reservedSeats: 0,
    featured: true,
    status: 'upcoming',
  },
  ...eventTimeline.map((event, index) => ({
    id: `past-${index + 1}`,
    slug: `past-${index + 1}`,
    ...event,
    startsAt: `2024-${String([1, 4, 8, 11][index]).padStart(2, '0')}-15T10:00:00+01:00`,
    endsAt: `2024-${String([1, 4, 8, 11][index]).padStart(2, '0')}-15T13:00:00+01:00`,
    timezone: 'WAT',
    meetingLink: '',
    host: { name: 'Pen-Power team', image: event.image },
    guests: [],
    capacity: 0,
    reservedSeats: 0,
    featured: false,
    status: 'past',
  })),
]

export const blogPosts = [
  {
    id: 'building-confidence-through-mentorship',
    title: 'Building Confidence Through Mentorship',
    excerpt:
      'Young people often grow when they are seen, challenged, and encouraged by trusted mentors who believe in their potential.',
    author: 'Ada Okafor',
    readTime: '4 min read',
    publishedAt: '2026-08-12',
    category: 'Mentorship',
    image: eventImages[2],
    content: [
      'Mentorship is one of the most powerful tools available to young people. It gives them direction, stability, and a model of what purposeful growth looks like.',
      'At Pen-Power Initiative, we believe that young people need more than access to information. They need guidance, accountability, and people who will challenge them to become more resilient and more self-aware.',
      'The result is not only confidence but clarity. Youth who are mentored become better able to make informed choices, speak with courage, and pursue meaningful opportunities with purpose.',
      'A generation is shaped by the people who show up in its life at the right time. We are proud to be part of that process.',
    ],
  },
  {
    id: 'why-literacy-goes-beyond-books',
    title: 'Why Literacy Goes Beyond Books',
    excerpt:
      'Literacy is not only about reading words. It is about understanding identity, thinking critically, and participating fully in society.',
    author: 'Bola Ojo',
    readTime: '5 min read',
    publishedAt: '2026-07-18',
    category: 'Education',
    image: eventImages[0],
    content: [
      'When we talk about literacy, many people think only of reading and writing. But the deeper value of literacy is the ability to think clearly, question the world, and participate in community life with confidence.',
      'For children and young adults, literacy is a gateway to self-expression. It enables them to articulate ideas, speak up for themselves, and engage critically with their environment.',
      'This is why Pen-Power Initiative integrates literacy support with mentorship, leadership, and values development. We want our beneficiaries to read and reason, write and reflect, and grow into conscious members of society.',
      'A literate generation is not only informed; it is empowered.',
    ],
  },
  {
    id: 'purpose-driven-leadership',
    title: 'Purpose-Driven Leadership for the Next Generation',
    excerpt:
      'Leadership today requires character, empathy, and a sense of responsibility more than popularity or status.',
    author: 'Samuel Adebayo',
    readTime: '6 min read',
    publishedAt: '2026-06-30',
    category: 'Leadership',
    image: eventImages[9],
    content: [
      'Leadership is often misunderstood as influence alone. Real leadership involves responsibility, service, and the willingness to act with integrity even when no one is watching.',
      'Our programmes aim to help young people see leadership as a commitment to their communities rather than a personal title or spotlight.',
      'When young leaders learn empathy, self-discipline, and critical thinking, they become not just confident personalities but trusted agents of positive change.',
      'That is the type of future we are trying to build at Pen-Power Initiative.',
    ],
  },
]

export const homePageSections = [
  {
    type: 'hero',
    eyebrow: 'Raising a conscious generation',
    title: 'Empowering children, teens, and young adults to grow with purpose.',
    description:
      'We work with young people to strengthen literacy, leadership, values, and confidence so they can become thoughtful contributors to their communities.',
    ctaPrimary: 'Support a young person',
    ctaSecondary: 'Read our story',
    image: eventImages[2],
  },
  {
    type: 'stats',
    items: stats,
  },
  {
    type: 'mission',
    title: 'What we stand for',
    content:
      'We believe education should not end at examinations. Every child should understand who they are, what they can become, and how they can contribute to society.',
    items: values,
  },
  {
    type: 'programs',
    title: 'Our focus areas',
    items: programCards,
  },
  {
    type: 'featuredBlog',
    title: 'Featured insight',
    item: blogPosts[0],
  },
  {
    type: 'gallery',
    title: 'Community moments',
    items: galleryItems,
  },
  {
    type: 'timeline',
    title: 'Impact timeline',
    items: eventTimeline,
  },
]

export const defaultAdminData = {
  siteSettings: {
    siteName: 'Pen-Power Initiative',
    tagline: 'Raising a Conscious Generation',
    primaryColor: '#0E7C72',
    accentColor: '#F4B942',
    email: 'hello@penpowerinitiative.org',
    phone: '+234 (0) 800 000 0000',
    address: '12 Community Outreach Lane, Lagos, Nigeria',
  },
  pages: [
    { slug: 'home', title: 'Home', status: 'published' },
    { slug: 'about', title: 'About', status: 'published' },
    { slug: 'blog', title: 'Blog', status: 'published' },
    { slug: 'events', title: 'Events', status: 'published' },
    { slug: 'contact', title: 'Contact', status: 'published' },
  ],
  sections: [
    { name: 'Hero Section', type: 'hero', visible: true },
    { name: 'Stats Section', type: 'stats', visible: true },
    { name: 'Programs Section', type: 'programs', visible: true },
    { name: 'Gallery Section', type: 'gallery', visible: true },
    { name: 'Timeline Section', type: 'timeline', visible: true },
  ],
  blogPosts,
  events,
}
