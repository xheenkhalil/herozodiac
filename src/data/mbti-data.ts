// src/data/mbti-data.ts

export interface MBTIType {
  type: string;
  name: string;
  category: 'Analysts' | 'Diplomats' | 'Sentinels' | 'Explorers';
  tagline: string;
  description: string;
  traits: string[];
  cognitiveFunctions: string[];
  strengths: string[];
  blindSpots: string[];
  careerPaths: string[];
  relationshipTraits: string;
  astrologicalResonance: string[];
}

export const MBTI_TYPES_DATA: Record<string, MBTIType> = {
  'INTJ': {
    type: 'INTJ',
    name: 'The Architect',
    category: 'Analysts',
    tagline: 'Imaginative and strategic thinkers with a plan for everything.',
    description: 'INTJs are brilliant strategists who view life as a giant chess game. They synthesize complex data, identify patterns, and relentlessly optimize systems toward higher mastery.',
    traits: ['Strategic', 'Independent', 'Analytical', 'Determined', 'Innovative'],
    cognitiveFunctions: ['Ni (Introverted Intuition)', 'Te (Extraverted Thinking)', 'Fi (Introverted Feeling)', 'Se (Extraverted Sensing)'],
    strengths: ['High intellectual autonomy', 'Strategic vision', 'Decisive execution', 'High standards'],
    blindSpots: ['Impatience with inefficiency', 'Emotional aloofness', 'Over-intellectualizing feelings'],
    careerPaths: ['Systems Architect', 'Quantitative Strategist', 'Research Director', 'Biotech Executive', 'Data Scientist'],
    relationshipTraits: 'Values loyalty, intellectual depth, and independent partners. Slow to warm up, but steadfast once committed.',
    astrologicalResonance: ['Capricorn', 'Scorpio', 'Virgo']
  },
  'INTP': {
    type: 'INTP',
    name: 'The Logician',
    category: 'Analysts',
    tagline: 'Innovative inventors with an unquenchable thirst for knowledge.',
    description: 'INTPs are philosophers of pure logic. They dissect ideas with laser precision, seeking underlying principles that govern the cosmos.',
    traits: ['Inventive', 'Curious', 'Objective', 'Theoretical', 'Open-minded'],
    cognitiveFunctions: ['Ti (Introverted Thinking)', 'Ne (Extraverted Intuition)', 'Si (Introverted Sensing)', 'Fe (Extraverted Feeling)'],
    strengths: ['Genius analytical clarity', 'Original problem-solving', 'Intellectual honesty', 'Abstract thinking'],
    blindSpots: ['Analysis paralysis', 'Procrastination on routine tasks', 'Social awkwardness'],
    careerPaths: ['Theoretical Physicist', 'Software Engineer', 'Mathematician', 'Philosopher', 'Systems Analyst'],
    relationshipTraits: 'Appreciates intellectual sparring, gentle patience, and someone who gives them quiet thinking space.',
    astrologicalResonance: ['Aquarius', 'Gemini', 'Virgo']
  },
  'ENTJ': {
    type: 'ENTJ',
    name: 'The Commander',
    category: 'Analysts',
    tagline: 'Bold, imaginative, and strong-willed leaders, always finding a way.',
    description: 'ENTJs are natural-born executives. They formulate visionary objectives and assemble the people, resources, and systems required to conquer them.',
    traits: ['Commanding', 'Visionary', 'Decisive', 'Efficient', 'Charismatic'],
    cognitiveFunctions: ['Te (Extraverted Thinking)', 'Ni (Introverted Intuition)', 'Se (Extraverted Sensing)', 'Fi (Introverted Feeling)'],
    strengths: ['Natural authority', 'High drive', 'Strategic execution', 'Confidence under pressure'],
    blindSpots: ['Intolerance of perceived incompetence', 'Dominating conversations', 'Neglect of emotional subtleties'],
    careerPaths: ['Chief Executive Officer', 'Corporate Litigator', 'Venture Capitalist', 'Management Consultant'],
    relationshipTraits: 'Values mutual ambition, honest debate, and an equal partner who stands firm in their own convictions.',
    astrologicalResonance: ['Aries', 'Capricorn', 'Leo']
  },
  'ENTP': {
    type: 'ENTP',
    name: 'The Debater',
    category: 'Analysts',
    tagline: 'Smart and curious thinkers who cannot resist an intellectual challenge.',
    description: 'ENTPs are catalytic thinkers who challenge conventional wisdom with playful irreverence. They thrive on ideas, debate, and novel possibilities.',
    traits: ['Quick-witted', 'Stimulating', 'Resourceful', 'Non-conformist', 'Inspiring'],
    cognitiveFunctions: ['Ne (Extraverted Intuition)', 'Ti (Introverted Thinking)', 'Fe (Extraverted Feeling)', 'Si (Introverted Sensing)'],
    strengths: ['Razor-sharp wit', 'Creative brainstormer', 'Fearless challenger of dogma', 'Charismatic communicator'],
    blindSpots: ['Easily bored by follow-through', 'Argumentative for its own sake', 'Insensitivity in heated debates'],
    careerPaths: ['Startup Founder', 'Creative Strategist', 'Investigative Journalist', 'Political Analyst'],
    relationshipTraits: 'Needs lively banter, unpredictable adventures, and a partner who enjoys mental agility and independence.',
    astrologicalResonance: ['Gemini', 'Aquarius', 'Sagittarius']
  },
  'INFJ': {
    type: 'INFJ',
    name: 'The Advocate',
    category: 'Diplomats',
    tagline: 'Quiet and mystical, yet very inspiring and tireless idealists.',
    description: 'INFJs are rare, deeply empathetic visionaries. They understand human nature intuitively and dedicate their lives to lifting up humanity and transforming society.',
    traits: ['Insightful', 'Principled', 'Passionate', 'Altruistic', 'Mystical'],
    cognitiveFunctions: ['Ni (Introverted Intuition)', 'Fe (Extraverted Feeling)', 'Ti (Introverted Thinking)', 'Se (Extraverted Sensing)'],
    strengths: ['Profound emotional insight', 'Tireless idealism', 'Creative eloquence', 'Compassionate purpose'],
    blindSpots: ['Prone to severe burnout', 'Over-idealizing others', 'Extreme private perfectionism'],
    careerPaths: ['Clinical Psychologist', 'Writer & Essayist', 'Human Rights Advocate', 'Spiritual Director', 'Holistic Physician'],
    relationshipTraits: 'Seeks rare soulmate connections. Deeply devoted, affectionate, and requires total emotional honesty.',
    astrologicalResonance: ['Pisces', 'Cancer', 'Scorpio']
  },
  'INFP': {
    type: 'INFP',
    name: 'The Mediator',
    category: 'Diplomats',
    tagline: 'Poetic, kind, and altruistic people, always eager to help a good cause.',
    description: 'INFPs are guided by deep personal values and authentic truth. They see beauty in melancholy and seek meaning, poetry, and authentic self-expression in all things.',
    traits: ['Empathetic', 'Idealistic', 'Artistic', 'Authentic', 'Gentle'],
    cognitiveFunctions: ['Fi (Introverted Feeling)', 'Ne (Extraverted Intuition)', 'Si (Introverted Sensing)', 'Te (Extraverted Thinking)'],
    strengths: ['Unconditional empathy', 'Creative depth', 'Dedication to authenticity', 'Deep listening'],
    blindSpots: ['Overly sensitive to criticism', 'Tendency to withdraw into fantasy', 'Difficulty setting boundaries'],
    careerPaths: ['Poet / Novelist', 'Art Therapist', 'Counselor', 'Graphic Illustrator', 'Conservationist'],
    relationshipTraits: 'Romantic, loyal, and deeply tender. Thrives with a partner who cherishes their rich inner world.',
    astrologicalResonance: ['Pisces', 'Cancer', 'Libra']
  },
  'ENFJ': {
    type: 'ENFJ',
    name: 'The Protagonist',
    category: 'Diplomats',
    tagline: 'Charismatic and inspiring leaders, able to mesmerize their listeners.',
    description: 'ENFJs are radiant mentors who draw out the latent potential in everyone around them. They lead with warmth, emotional resonance, and unshakeable conviction.',
    traits: ['Charismatic', 'Empathetic', 'Inspiring', 'Reliable', 'Natural Mentor'],
    cognitiveFunctions: ['Fe (Extraverted Feeling)', 'Ni (Introverted Intuition)', 'Se (Extraverted Sensing)', 'Ti (Introverted Thinking)'],
    strengths: ['Magnetic leadership', 'Profound social intelligence', 'Inspiring communicator', 'Selfless generosity'],
    blindSpots: ['Neglecting own needs', 'Over-involvement in others’ lives', 'Struggling with conflict'],
    careerPaths: ['Educational Dean', 'Leadership Coach', 'Public Speaker', 'Community Director', 'Non-profit Executive'],
    relationshipTraits: 'Expressive, romantic, and deeply supportive. Desires emotional reciprocity and shared humanitarian values.',
    astrologicalResonance: ['Leo', 'Libra', 'Sagittarius']
  },
  'ENFP': {
    type: 'ENFP',
    name: 'The Campaigner',
    category: 'Diplomats',
    tagline: 'Enthusiastic, creative, and sociable free spirits, who can always find a reason to smile.',
    description: 'ENFPs are magnetic champions of human potential. They experience life as a rich web of possibilities, connecting with people on emotional and intellectual planes.',
    traits: ['Enthusiastic', 'Imaginative', 'Spontaneous', 'Sociable', 'Visionary'],
    cognitiveFunctions: ['Ne (Extraverted Intuition)', 'Fi (Introverted Feeling)', 'Te (Extraverted Thinking)', 'Si (Introverted Sensing)'],
    strengths: ['Boundless enthusiasm', 'Infectious optimism', 'Deep interpersonal empathy', 'Creative originality'],
    blindSpots: ['Struggles with follow-through', 'Overthinking interpersonal cues', 'Easily stressed by micromanagement'],
    careerPaths: ['Creative Director', 'Brand Evangelist', 'Documentary Maker', 'Human Potential Coach', 'Journalist'],
    relationshipTraits: 'Playful, passionate, and open-hearted. Craves emotional intimacy paired with spontaneous adventure.',
    astrologicalResonance: ['Sagittarius', 'Gemini', 'Pisces']
  },
  'ISTJ': {
    type: 'ISTJ',
    name: 'The Logistician',
    category: 'Sentinels',
    tagline: 'Practical and fact-minded individuals, whose reliability cannot be doubted.',
    description: 'ISTJs are the bedrock of any organization. Grounded, dutiful, and methodical, they uphold integrity and maintain societal structures with quiet dignity.',
    traits: ['Responsible', 'Organized', 'Direct', 'Loyal', 'Calm'],
    cognitiveFunctions: ['Si (Introverted Sensing)', 'Te (Extraverted Thinking)', 'Fi (Introverted Feeling)', 'Ne (Extraverted Intuition)'],
    strengths: ['Unflinching reliability', 'Sharp factual memory', 'Dutiful integrity', 'Practical capability'],
    blindSpots: ['Resistance to unconventional changes', 'Judgmental of disorganization', 'Difficulty expressing tenderness'],
    careerPaths: ['Chief Financial Officer', 'Judicial Magistrate', 'Civil Engineer', 'Auditor', 'Military Officer'],
    relationshipTraits: 'Steadfast and devoted. Shows love through dependable actions, stability, and enduring loyalty.',
    astrologicalResonance: ['Capricorn', 'Taurus', 'Virgo']
  },
  'ISFJ': {
    type: 'ISFJ',
    name: 'The Defender',
    category: 'Sentinels',
    tagline: 'Very dedicated and warm protectors, always ready to defend their loved ones.',
    description: 'ISFJs are quiet guardians of hearth and home. Generous, detail-oriented, and profoundly loyal, they remember every detail about those they care for.',
    traits: ['Supportive', 'Reliable', 'Patient', 'Observant', 'Loyal'],
    cognitiveFunctions: ['Si (Introverted Sensing)', 'Fe (Extraverted Feeling)', 'Ti (Introverted Thinking)', 'Ne (Extraverted Intuition)'],
    strengths: ['Devoted warmth', 'Practical caregiving', 'Reliable loyalty', 'Respect for tradition'],
    blindSpots: ['Reluctance to accept change', 'Bottling up grievances', 'Overworking themselves for others'],
    careerPaths: ['Healthcare Specialist', 'Elementary Educator', 'Library Director', 'Social Worker', 'Office Administrator'],
    relationshipTraits: 'Attentive, gentle, and deeply dedicated. Needs a partner who recognizes their quiet sacrifices.',
    astrologicalResonance: ['Cancer', 'Taurus', 'Virgo']
  },
  'ESTJ': {
    type: 'ESTJ',
    name: 'The Executive',
    category: 'Sentinels',
    tagline: 'Excellent administrators, unsurpassed at managing things or people.',
    description: 'ESTJs are pillars of community order. They lead from the front, bringing clarity, accountability, and strong ethical standards to their teams.',
    traits: ['Dedicated', 'Strong-willed', 'Direct', 'Organized', 'Loyal'],
    cognitiveFunctions: ['Te (Extraverted Thinking)', 'Si (Introverted Sensing)', 'Ne (Extraverted Intuition)', 'Fi (Introverted Feeling)'],
    strengths: ['Superb administrative order', 'Direct honesty', 'Tireless work ethic', 'Clear leadership'],
    blindSpots: ['Inflexibility', 'Difficulty with unconventional feelings', 'Over-focus on social status'],
    careerPaths: ['Operations Director', 'Judge', 'Hospital Administrator', 'Project Manager', 'Law Enforcement Chief'],
    relationshipTraits: 'Direct, stable, and protective. Values shared commitment, family traditions, and open accountability.',
    astrologicalResonance: ['Aries', 'Capricorn', 'Leo']
  },
  'ESFJ': {
    type: 'ESFJ',
    name: 'The Consul',
    category: 'Sentinels',
    tagline: 'Extraordinarily caring, social, and popular people, always eager to help.',
    description: 'ESFJs are the heart of community gatherings. Attentive, empathetic, and organized, they foster harmony and ensure everyone is cared for.',
    traits: ['Loyal', 'Warmhearted', 'Organized', 'Sociable', 'Harmonious'],
    cognitiveFunctions: ['Fe (Extraverted Feeling)', 'Si (Introverted Sensing)', 'Ne (Extraverted Intuition)', 'Ti (Introverted Thinking)'],
    strengths: ['Unmatched hospitality', 'Practical community support', 'Reliable loyalty', 'Creating connection'],
    blindSpots: ['Vulnerable to criticism', 'Needing social validation', 'Reluctance to face unpleasant conflicts'],
    careerPaths: ['Public Relations Director', 'Nurse Practitioner', 'School Principal', 'Hospitality Director', 'Event Planner'],
    relationshipTraits: 'Warm, attentive, and dedicated to domestic harmony. Cherishes traditional milestones and verbal appreciation.',
    astrologicalResonance: ['Taurus', 'Cancer', 'Libra']
  },
  'ISTP': {
    type: 'ISTP',
    name: 'The Virtuoso',
    category: 'Explorers',
    tagline: 'Bold and practical experimenters, masters of all kinds of tools.',
    description: 'ISTPs explore ideas through tangible mechanics. Cool under pressure, observant, and independent, they solve real-world problems with effortless grace.',
    traits: ['Practical', 'Spontaneous', 'Rational', 'Independent', 'Adaptable'],
    cognitiveFunctions: ['Ti (Introverted Thinking)', 'Se (Extraverted Sensing)', 'Ni (Introverted Intuition)', 'Fe (Extraverted Feeling)'],
    strengths: ['Crisis composure', 'Mastery of physical tools', 'Pragmatic logic', 'Adaptable resilience'],
    blindSpots: ['Insensitivity to emotional nuance', 'Risk-seeking boredom', 'Commitment skepticism'],
    careerPaths: ['Aviation Pilot', 'Mechanical Engineer', 'Forensic Investigator', 'Emergency Surgeon', 'Software Artisan'],
    relationshipTraits: 'Values freedom, quiet camaraderie, and physical adventures. Prefers actions over long emotional declarations.',
    astrologicalResonance: ['Aries', 'Scorpio', 'Virgo']
  },
  'ISFP': {
    type: 'ISFP',
    name: 'The Adventurer',
    category: 'Explorers',
    tagline: 'Flexible and charming artists, always ready to explore and experience something new.',
    description: 'ISFPs live in an aesthetic world of sensory beauty. Gentle, modest, and deeply principled, they express their rich inner spirit through quiet art and heartfelt living.',
    traits: ['Charming', 'Sensitive', 'Artistic', 'Spontaneous', 'Imaginative'],
    cognitiveFunctions: ['Fi (Introverted Feeling)', 'Se (Extraverted Sensing)', 'Ni (Introverted Intuition)', 'Te (Extraverted Thinking)'],
    strengths: ['Aesthetic genius', 'Deep gentle empathy', 'Living in the present', 'Authentic humility'],
    blindSpots: ['Avoidance of competitive conflict', 'Fluctuating self-esteem', 'Difficulty with rigid planning'],
    careerPaths: ['Visual Artist', 'Fashion Designer', 'Landscape Architect', 'Veterinary Doctor', 'Chef'],
    relationshipTraits: 'Tender, deeply loyal, and supportive. Shows love through personalized gifts, affection, and gentle presence.',
    astrologicalResonance: ['Taurus', 'Libra', 'Pisces']
  },
  'ESTP': {
    type: 'ESTP',
    name: 'The Entrepreneur',
    category: 'Explorers',
    tagline: 'Smart, energetic, and very perceptive people, who truly enjoy living on the edge.',
    description: 'ESTPs are dynamic dynamos of the physical realm. They assess the room in seconds, negotiate deals effortlessly, and thrive in fast-paced action.',
    traits: ['Bold', 'Perceptive', 'Direct', 'Sociable', 'Resourceful'],
    cognitiveFunctions: ['Se (Extraverted Sensing)', 'Ti (Introverted Thinking)', 'Fe (Extraverted Feeling)', 'Ni (Introverted Intuition)'],
    strengths: ['Fearless opportunist', 'Rapid crisis reaction', 'Charismatic influence', 'Street-smart acumen'],
    blindSpots: ['Impulsiveness', 'Impatience with theory', 'Overlooking emotional long-term consequences'],
    careerPaths: ['Venture Entrepreneur', 'High-Stakes Broker', 'Professional Athlete', 'Crisis Negotiator', 'Commercial Developer'],
    relationshipTraits: 'Spontaneous, exciting, and generous. Needs an energetic partner who enjoys spontaneity and lively experiences.',
    astrologicalResonance: ['Aries', 'Leo', 'Gemini']
  },
  'ESFP': {
    type: 'ESFP',
    name: 'The Entertainer',
    category: 'Explorers',
    tagline: 'Spontaneous, energetic, and enthusiastic people – life is never boring around them.',
    description: 'ESFPs are vibrant performers who turn life into a joyous celebration. Warm, generous, and aesthetically attuned, they make everyone around them feel alive.',
    traits: ['Spontaneous', 'Playful', 'Enthusiastic', 'Generous', 'Warm'],
    cognitiveFunctions: ['Se (Extraverted Sensing)', 'Fi (Introverted Feeling)', 'Te (Extraverted Thinking)', 'Ni (Introverted Intuition)'],
    strengths: ['Radiant social warmth', 'Natural performance charisma', 'Sensory taste', 'Uplifting optimism'],
    blindSpots: ['Difficulty with long-term abstract duties', 'Impulsive splurging', 'Conflict avoidance'],
    careerPaths: ['Stage Performer', 'Event Producer', 'Luxury Stylist', 'Travel Creator', 'Recreational Therapist'],
    relationshipTraits: 'Affectionate, expressive, and playful. Brings warmth, fun, and spontaneous romance to everyday life.',
    astrologicalResonance: ['Leo', 'Libra', 'Sagittarius']
  }
};

export interface MBTIQuestion {
  id: number;
  question: string;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  optionA: { text: string; value: 'E' | 'S' | 'T' | 'J' };
  optionB: { text: string; value: 'I' | 'N' | 'F' | 'P' };
}

export const MBTI_QUESTIONS: MBTIQuestion[] = [
  {
    id: 1,
    question: "After a demanding week, how do you most effectively recharge?",
    dimension: 'EI',
    optionA: { text: "Surrounding myself with friends or lively social gatherings.", value: 'E' },
    optionB: { text: "Enjoying quiet solitude, reading, or relaxing in private space.", value: 'I' }
  },
  {
    id: 2,
    question: "When processing information, what catches your attention first?",
    dimension: 'SN',
    optionA: { text: "Tangible facts, practical realities, and direct sensory details.", value: 'S' },
    optionB: { text: "Underlying patterns, symbolic meanings, and future possibilities.", value: 'N' }
  },
  {
    id: 3,
    question: "When making tough decisions, what carries the greatest weight?",
    dimension: 'TF',
    optionA: { text: "Objective logic, fairness, principles, and rational consistency.", value: 'T' },
    optionB: { text: "Personal values, empathy, and how the decision affects people.", value: 'F' }
  },
  {
    id: 4,
    question: "How do you prefer to manage your daily schedule and commitments?",
    dimension: 'JP',
    optionA: { text: "Structured planning, clear timelines, and checking off checklists.", value: 'J' },
    optionB: { text: "Flexible spontaneity, keeping options open, and adapting as I go.", value: 'P' }
  },
  {
    id: 5,
    question: "In conversations, which dynamic do you find most natural?",
    dimension: 'EI',
    optionA: { text: "Speaking out thoughts aloud to brainstorm and discover what I think.", value: 'E' },
    optionB: { text: "Formulating thoughts carefully internally before sharing them.", value: 'I' }
  },
  {
    id: 6,
    question: "When learning a new discipline, what resonates most with you?",
    dimension: 'SN',
    optionA: { text: "Concrete examples, real-world case studies, and step-by-step applications.", value: 'S' },
    optionB: { text: "Overarching theories, philosophical concepts, and novel paradigms.", value: 'N' }
  },
  {
    id: 7,
    question: "In a disagreement, what is your primary concern?",
    dimension: 'TF',
    optionA: { text: "Finding the factual truth and establishing what is technically correct.", value: 'T' },
    optionB: { text: "Preserving relationship harmony and ensuring all voices feel validated.", value: 'F' }
  },
  {
    id: 8,
    question: "When embarking on a vacation, which approach do you naturally choose?",
    dimension: 'JP',
    optionA: { text: "Researched itineraries, confirmed bookings, and clear daily milestones.", value: 'J' },
    optionB: { text: "A broad destination idea, wandering intuitively, and discovering gems freely.", value: 'P' }
  }
];

export function calculateMBTIResult(answers: Record<number, string>): MBTIType {
  let eCount = 0, iCount = 0;
  let sCount = 0, nCount = 0;
  let tCount = 0, fCount = 0;
  let jCount = 0, pCount = 0;

  MBTI_QUESTIONS.forEach(q => {
    const chosen = answers[q.id];
    if (chosen === 'E') eCount++;
    if (chosen === 'I') iCount++;
    if (chosen === 'S') sCount++;
    if (chosen === 'N') nCount++;
    if (chosen === 'T') tCount++;
    if (chosen === 'F') fCount++;
    if (chosen === 'J') jCount++;
    if (chosen === 'P') pCount++;
  });

  const letter1 = eCount >= iCount ? 'E' : 'I';
  const letter2 = sCount >= nCount ? 'S' : 'N';
  const letter3 = tCount >= fCount ? 'T' : 'F';
  const letter4 = jCount >= pCount ? 'J' : 'P';

  const typeCode = `${letter1}${letter2}${letter3}${letter4}`;
  return MBTI_TYPES_DATA[typeCode] || MBTI_TYPES_DATA['INFJ'];
}
