// Everything on the page reads from this file.
// Experience, education and certifications are from LinkedIn.

export const profile = {
  name: 'Gavin Thomas',
  first: 'Gavin',
  last: 'Thomas',
  title: 'Data Scientist & Software Developer',
  location: 'Salt Lake City, Utah',
  email: 'gsct2002@gmail.com',
  summary:
    'I care about the details most people never see and the ones everyone feels. Every interface I build starts with design and ends with engineering I can stand behind.',
  links: [
    { label: 'More', href: 'https://www.linkedin.com/in/gavin-thomas-821b341b0/' },
  ],
}

// Dates are "Mon YYYY"; `end: 'Now'` for a current role. `place` is optional.
export const experience = [
  {
    start: 'Dec 2024',
    end: 'Now',
    role: 'Data Scientist',
    org: 'Zions Bancorporation',
    place: 'Hybrid',
    points: [
      'Built and designed document review tool now used by teams across all seven Zions affiliate banks. Python and React, deployed on Google Cloud Run.',
      'Design and build AI-powered tools and workflows for bankers.',
      'Develop predictive models and machine learning solutions that turn bank data into business decisions.',
    ],
  },
  {
    start: 'Jan 2024',
    end: 'Nov 2024',
    role: 'Software Developer',
    org: 'Devote',
    points: [
      'Helped build Devote’s financial management platform: mobile and web apps in React and React Native, backed by Supabase.',
      'Contributed to the design of the app and the company website.',
    ],
  },
  {
    start: 'Aug 2023',
    end: 'Apr 2024',
    role: 'Development Intern',
    org: 'Zions Bancorporation',
    points: [
      'Built ETL pipelines to extract, transform and load data across a large enterprise data system.',
      'Partnered with teammates to design internal tools that streamlined workflows and made data easier to access.',
    ],
  },
]

export const skills = [
  'Python',
  'JavaScript',
  'SQL',
  'Machine learning',
  'Predictive modeling',
  'ETL pipelines',
  'React',
  'React Native',
  'Supabase',
  'Google Cloud Platform',
  'SVG',
  'Three.js',
]

export const education = [
  { start: '2020', end: '2024', school: 'University of Utah', degree: 'Data Science', place: 'Salt Lake City, Utah' },
]

export const certifications = [
  {
    name: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI · Stanford University',
    issued: 'Jan 2024',
    id: 'N4S3VDM3WR28',
  },
]

// "Org · Place", leaving out whichever is missing.
export const orgLine = (e) => [e.org ?? e.school, e.place].filter(Boolean).join(' · ')
