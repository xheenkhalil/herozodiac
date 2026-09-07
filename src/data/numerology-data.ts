// src/data/numerology-data.ts

export interface NumerologyMeaning {
  number: number;
  isMaster: boolean;
  title: string;
  archetype: string;
  tagline: string;
  traits: string[];
  strengths: string[];
  challenges: string[];
  lifePathDescription: string;
  careerFields: string[];
  relationshipStyle: string;
}

export const NUMEROLOGY_PROFILES: Record<number, NumerologyMeaning> = {
  1: {
    number: 1,
    isMaster: false,
    title: "The Leader & Innovator",
    archetype: "The Pioneer",
    tagline: "Independence, original invention, and pioneering courage.",
    traits: ['Independent', 'Ambitious', 'Courageous', 'Pioneering', 'Self-reliant'],
    strengths: ['Fearless initiative', 'Natural executive command', 'Innovative vision', 'Self-starting drive'],
    challenges: ['Impatience', 'Stubborn pride', 'Difficulty asking for help', 'Intolerance of delays'],
    lifePathDescription: "Life Path 1 individuals are born to lead, invent, and blaze fresh trails. You walk to the beat of your own drum, often feeling compelled to build things that did not exist prior to your arrival.",
    careerFields: ['Entrepreneurship', 'Executive Management', 'Venture Technology', 'Independent Consulting', 'Creative Direction'],
    relationshipStyle: "Needs an independent, self-assured partner who respects their drive without demanding they shrink their ambitions."
  },
  2: {
    number: 2,
    isMaster: false,
    title: "The Peacemaker & Diplomat",
    archetype: "The Harmonizer",
    tagline: "Diplomacy, intuitive empathy, and cooperative grace.",
    traits: ['Diplomatic', 'Sensitive', 'Patient', 'Cooperative', 'Intuitive'],
    strengths: ['Emotional sensitivity', 'Conflict resolution', 'Quiet loyalty', 'Aesthetic discernment'],
    challenges: ['Hypersensitivity to criticism', 'Fear of confrontation', 'Over-subordinating own needs'],
    lifePathDescription: "Life Path 2 is the quiet power behind the throne. You are gifted with acute sensitivity, diplomacy, and the capacity to unite polarized perspectives into harmonious accords.",
    careerFields: ['Diplomacy & Mediation', 'Counseling', 'Human Resources', 'Aesthetic Arts', 'Holistic Healthcare'],
    relationshipStyle: "Profoundly romantic, tender, and dedicated. You thrive in equal, loving partnerships built on mutual kindness."
  },
  3: {
    number: 3,
    isMaster: false,
    title: "The Creative Communicator",
    archetype: "The Artist",
    tagline: "Self-expression, charismatic wit, and joyful inspiration.",
    traits: ['Expressive', 'Charismatic', 'Imaginative', 'Optimistic', 'Sociable'],
    strengths: ['Verbal & artistic eloquence', 'Infectious optimism', 'Social charm', 'Creative abundance'],
    challenges: ['Scattered energies', 'Superficial distractions', 'Mood swings', 'Difficulty finishing projects'],
    lifePathDescription: "Life Path 3 carries the spark of divine joy and creative expression. You inspire the world through words, art, laughter, and an uncanny ability to find beauty in everyday life.",
    careerFields: ['Creative Writing', 'Performance & Acting', 'Design & Marketing', 'Journalism', 'Public Speaking'],
    relationshipStyle: "Playful, affectionate, and spontaneous. Needs a partner who enjoys lively banter and celebrates their artistic spirit."
  },
  4: {
    number: 4,
    isMaster: false,
    title: "The Master Builder & Anchor",
    archetype: "The Foundation",
    tagline: "Stability, tireless perseverance, and structured order.",
    traits: ['Disciplined', 'Methodical', 'Loyal', 'Practical', 'Enduring'],
    strengths: ['Exceptional reliability', 'Systemic organization', 'Ironclad integrity', 'Patience with detail'],
    challenges: ['Rigidity', 'Fear of chaotic change', 'Pessimistic worry', 'Workaholic tendencies'],
    lifePathDescription: "Life Path 4 is the foundation upon which communities are built. You value hard work, honesty, and enduring systems that protect future generations.",
    careerFields: ['Architecture & Civil Engineering', 'Enterprise Finance', 'System Administration', 'Legal Compliance', 'Operations'],
    relationshipStyle: "Dependable, steadfast, and fiercely protective. You demonstrate love through tangible security and lifelong loyalty."
  },
  5: {
    number: 5,
    isMaster: false,
    title: "The Adventurer & Catalyst",
    archetype: "The Free Spirit",
    tagline: "Freedom, dynamic versatility, and multisensory exploration.",
    traits: ['Adventurous', 'Versatile', 'Dynamic', 'Curious', 'Unconventional'],
    strengths: ['Rapid adaptability', 'Cross-cultural charisma', 'Fearless risk-taking', 'High resilience'],
    challenges: ['Restless inconsistency', 'Impatience with routine', 'Escapist indulgence', 'Commitment skepticism'],
    lifePathDescription: "Life Path 5 experiences the universe as a vast sensory tapestry awaiting exploration. You are an agent of dynamic change, breaking stagnancy wherever you tread.",
    careerFields: ['International Travel & Media', 'Speculative Investing', 'Public Relations', 'Documentary Production', 'Freelance Innovation'],
    relationshipStyle: "Exciting, spontaneous, and passionate. Needs a partner who honors personal space and joins in unexpected journeys."
  },
  6: {
    number: 6,
    isMaster: false,
    title: "The Nurturer & Guardian",
    archetype: "The Healer",
    tagline: "Unconditional compassion, domestic harmony, and ethical duty.",
    traits: ['Nurturing', 'Responsible', 'Compassionate', 'Protective', 'Harmonious'],
    strengths: ['Creating sanctuary', 'Selfless service', 'Emotional generosity', 'Artistic balance'],
    challenges: ['Martyr complex', 'Controlling through caretaking', 'Difficulty accepting imperfections in others'],
    lifePathDescription: "Life Path 6 is the cosmic caregiver. Governed by harmonious balance, you possess a sacred duty to heal, protect, and beautify your home, family, and community.",
    careerFields: ['Healthcare & Nursing', 'Family Counseling', 'Interior Architecture', 'Child Development', 'Community Advocacy'],
    relationshipStyle: "Deeply dedicated, affectionate, and family-centered. You view loving partnership as sacred sanctuary."
  },
  7: {
    number: 7,
    isMaster: false,
    title: "The Seeker & Mystic",
    archetype: "The Philosopher",
    tagline: "Introspection, analytical depth, and spiritual revelation.",
    traits: ['Analytical', 'Intuitive', 'Introspective', 'Philosophical', 'Discerning'],
    strengths: ['Penetrating intellect', 'Mystical intuition', 'Uncompromising truth-seeking', 'Solitary focus'],
    challenges: ['Social cynicism', 'Intellectual arrogance', 'Emotional aloofness', 'Excessive secrecy'],
    lifePathDescription: "Life Path 7 is the intellectual and spiritual investigator of reality. You look beneath surface illusions to uncover the timeless scientific and esoteric laws governing existence.",
    careerFields: ['Scientific Research', 'Philosophy & Theology', 'Data Intelligence', 'Esoteric Studies', 'Psychological Analysis'],
    relationshipStyle: "Values deep mental and soul connection. Requires considerable quiet solitude and an intellectually agile partner."
  },
  8: {
    number: 8,
    isMaster: false,
    title: "The Master of Manifestation",
    archetype: "The Sovereign",
    tagline: "Authority, material abundance, and karmic empowerment.",
    traits: ['Authoritative', 'Ambitious', 'Strategic', 'Practical', 'Resilient'],
    strengths: ['Executive command', 'Financial acumen', 'Crisis leadership', 'Magnanimous generosity'],
    challenges: ['Obsession with status', 'Intolerance of vulnerability', 'Materialistic exhaustion'],
    lifePathDescription: "Life Path 8 understands the mechanics of material power and karmic balance. You are called to master finance, governance, and tangible resources in service of higher collective prosperity.",
    careerFields: ['Venture Capital & Banking', 'Corporate Governance', 'Real Estate Development', 'High-Stakes Law', 'Philanthropy'],
    relationshipStyle: "Proud, loyal, and supportive of shared ambition. Wants an equal partner who commands self-respect."
  },
  9: {
    number: 9,
    isMaster: false,
    title: "The Humanitarian & Sage",
    archetype: "The Universal Soul",
    tagline: "Universal empathy, artistic wisdom, and selfless global service.",
    traits: ['Humanitarian', 'Generous', 'Artistic', 'Idealistic', 'Compassionate'],
    strengths: ['Panoramic empathy', 'Creative mastery', 'Broad philosophical vision', 'Inspiring generosity'],
    challenges: ['Difficulty letting go of past hurts', 'Disillusionment with humanity', 'Financial neglect'],
    lifePathDescription: "Life Path 9 has journeyed through the wisdom of all preceding numbers. You are a universal citizen called to elevate humanity through compassionate art, philosophy, and selfless service.",
    careerFields: ['International NGOs', 'Fine Arts & Film', 'Environmental Defense', 'Spiritual Mentorship', 'Civil Rights Advocacy'],
    relationshipStyle: "Open-hearted, romantic, and noble. You flourish with someone who shares your global compassion."
  },
  11: {
    number: 11,
    isMaster: true,
    title: "The Master Illuminator",
    archetype: "The Intuitive Visionary",
    tagline: "High spiritual frequency, prophetic intuition, and inspirational leadership.",
    traits: ['Prophetic', 'Charismatic', 'High-Frequency', 'Inspirational', 'Empathic'],
    strengths: ['Direct channel of spiritual insight', 'Inspiring millions', 'Electric charisma', 'Deep empathy'],
    challenges: ['Nervous tension & anxiety', 'Imposter syndrome', 'Overwhelmed by energetic noise'],
    lifePathDescription: "Master Number 11 is the psychic bridge between divine realms and earthly reality. You carry an intense intuitive charge designed to awaken consciousness in others through your presence.",
    careerFields: ['Spiritual Teaching', 'Visionary Media', 'Transformational Psychology', 'Inspirational Arts', 'Cutting-edge Research'],
    relationshipStyle: "Intense, soul-level intimacy. Needs an emotionally grounded partner who calms their nervous system."
  },
  22: {
    number: 22,
    isMaster: true,
    title: "The Master Builder",
    archetype: "The Architect of Destiny",
    tagline: "Manifesting grand humanitarian ideals into permanent physical reality.",
    traits: ['Visionary', 'Practical', 'Commanding', 'Systemic', 'Unstoppable'],
    strengths: ['Uniting grand ideals with practical execution', 'Massive scale planning', 'Enduring legacy creation'],
    challenges: ['Crushing self-imposed pressure', 'Fear of falling short of potential', 'Inflexibility'],
    lifePathDescription: "Master Number 22 possesses both the spiritual vision of the 11 and the grounded discipline of the 4. You are destined to construct institutions, infrastructure, or movements that bless generations.",
    careerFields: ['Global Infrastructure', 'International Statesmanship', 'Pioneering Foundations', 'Megaproject Architecture'],
    relationshipStyle: "Enduring, noble, and deeply supportive. Values a steadfast partner who stands beside them through monumental tasks."
  },
  33: {
    number: 33,
    isMaster: true,
    title: "The Master Teacher & Avatar",
    archetype: "The Universal Healer",
    tagline: "Pure spiritual devotion, boundless compassion, and uplifting consciousness.",
    traits: ['Altruistic', 'Enlightened', 'Loving', 'Devoted', 'Transformational'],
    strengths: ['Unconditional spiritual love', 'profound healing presence', 'Tireless devotion to human welfare'],
    challenges: ['Carrying the weight of world suffering', 'Exhaustion from self-sacrifice'],
    lifePathDescription: "Master Number 33 is the highest frequency of compassion and spiritual teaching. Your life is an offering of selfless service, healing the broken-hearted and guiding souls toward divine light.",
    careerFields: ['Global Humanitarian Leadership', 'Holistic Master Healer', 'Spiritual Luminaries', 'Worldwide Education Reform'],
    relationshipStyle: "Profoundly sacred and devoted. Gives immense love, flourishing when met with tender reverence."
  }
};

// --- DETERMINISTIC CALCULATION FUNCTIONS ---

export function reduceToNumerology(num: number, allowMaster = true): number {
  if (allowMaster && (num === 11 || num === 22 || num === 33)) {
    return num;
  }
  if (num < 10) return num;

  const sum = String(num).split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  return reduceToNumerology(sum, allowMaster);
}

export function calculateLifePath(year: number, month: number, day: number): number {
  // Method: Reduce month, day, and year individually first (Standard Pythagorean approach)
  const redMonth = reduceToNumerology(month, true);
  const redDay = reduceToNumerology(day, true);
  const redYear = reduceToNumerology(year, true);

  const total = redMonth + redDay + redYear;
  return reduceToNumerology(total, true);
}

const PYTHAGOREAN_MAP: Record<string, number> = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9
};

const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);

export function calculateExpressionNumber(fullName: string): number {
  const letters = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  if (!letters) return 1;

  const sum = letters.split('').reduce((acc, char) => acc + (PYTHAGOREAN_MAP[char] || 0), 0);
  return reduceToNumerology(sum, true);
}

export function calculateSoulUrgeNumber(fullName: string): number {
  const letters = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  if (!letters) return 1;

  const vowelSum = letters.split('').filter(char => VOWELS.has(char)).reduce((acc, char) => acc + (PYTHAGOREAN_MAP[char] || 0), 0);
  return reduceToNumerology(vowelSum || 1, true);
}

export function calculatePersonalityNumber(fullName: string): number {
  const letters = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  if (!letters) return 1;

  const consonantSum = letters.split('').filter(char => !VOWELS.has(char)).reduce((acc, char) => acc + (PYTHAGOREAN_MAP[char] || 0), 0);
  return reduceToNumerology(consonantSum || 1, true);
}
