// src/data/testimonials-data.ts

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
  verified: boolean;
  avatarText: string;
  date: string;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah J.',
    role: 'Verified User',
    rating: 5,
    quote: "HeroZodiac has become my daily companion. The insights are incredibly accurate, grounded, and genuinely helpful for navigating daily decisions.",
    verified: true,
    avatarText: 'SJ',
    date: 'May 2025'
  },
  {
    id: '2',
    name: 'Daniel K.',
    role: 'Verified User',
    rating: 5,
    quote: "The compatibility report helped me understand my relationship so much better. It avoided clichés and provided deep psychological synastry. Highly recommended!",
    verified: true,
    avatarText: 'DK',
    date: 'April 2025'
  },
  {
    id: '3',
    name: 'Maya L.',
    role: 'Verified User',
    rating: 5,
    quote: "I love the combination of astrology, numerology, and personality tests. Everything in one beautiful, elegant platform without any cheesy fluff.",
    verified: true,
    avatarText: 'ML',
    date: 'June 2025'
  },
  {
    id: '4',
    name: 'Elena R.',
    role: 'Verified User',
    rating: 5,
    quote: "The Natal Chart calculator is scientifically precise down to the degree. Having Placidus house breakdowns with clear interpretations is unmatched.",
    verified: true,
    avatarText: 'ER',
    date: 'March 2025'
  }
];
