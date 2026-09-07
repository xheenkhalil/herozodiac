// src/data/archetypes-data.ts

export interface Archetype {
  id: string;
  name: string;
  tagline: string;
  keywords: string[];
  description: string;
  coreDesire: string;
  goal: string;
  greatestFear: string;
  strategy: string;
  weakness: string;
  talent: string;
  strengths: string[];
  careerTendencies: string[];
  relationshipStyle: string;
  iconName: 'owl' | 'shield' | 'compass' | 'pen' | 'heart' | 'crown' | 'bolt' | 'wand' | 'sparkles' | 'masks' | 'users' | 'sun';
}

export const ARCHETYPES_DATA: Archetype[] = [
  {
    id: 'sage',
    name: 'The Sage',
    tagline: 'Wisdom • Truth • Understanding',
    keywords: ['Wisdom', 'Truth', 'Understanding'],
    description: 'The Sage is driven by the quest for truth, understanding, and objective knowledge. They analyze the world through reflection and scholarship.',
    coreDesire: 'To find the truth and understand the fundamental nature of the universe.',
    goal: 'To use intelligence and analysis to illuminate reality for themselves and others.',
    greatestFear: 'Being duped, misled, or remaining ignorant.',
    strategy: 'Seeking out information and knowledge; self-reflection and understanding thought processes.',
    weakness: 'Can study details forever and never act; emotional detachment.',
    talent: 'Wisdom, intelligence, clarity, and philosophical discernment.',
    strengths: ['Analytical rigor', 'Unbiased objectivity', 'Lifelong hunger for wisdom', 'Clarity of thought'],
    careerTendencies: ['Research Science', 'Philosophy', 'Higher Education', 'Intelligence Analysis', 'Data Architecture'],
    relationshipStyle: 'Values deep intellectual intimacy and shared curiosity. They need partners who respect their mental autonomy.',
    iconName: 'owl'
  },
  {
    id: 'hero',
    name: 'The Hero',
    tagline: 'Courage • Growth • Mastery',
    keywords: ['Courage', 'Growth', 'Mastery'],
    description: 'The Hero proves their worth through courageous and difficult action. They rise to meet challenges and conquer obstacles through determination.',
    coreDesire: 'To prove their worth through courageous acts.',
    goal: 'Expert mastery in a way that improves the world.',
    greatestFear: 'Weakness, vulnerability, and being seen as ineffective or cowardly.',
    strategy: 'To be as strong and competent as physically and mentally possible.',
    weakness: 'Arrogance, always needing another battle to fight, burnout.',
    talent: 'Competence and courage, inspiring resilience in others.',
    strengths: ['Unwavering grit', 'Decisive bravery', 'Protective strength', 'High moral drive'],
    careerTendencies: ['Emergency Response', 'Championship Athletics', 'Pioneering Entrepreneurship', 'Military Command', 'Advocacy'],
    relationshipStyle: 'Fiercely loyal and protective. They value a partner who stands beside them through trials and matches their loyalty.',
    iconName: 'shield'
  },
  {
    id: 'explorer',
    name: 'The Explorer',
    tagline: 'Freedom • Discovery • Independence',
    keywords: ['Freedom', 'Discovery', 'Independence'],
    description: 'The Explorer yearns for freedom, novelty, and self-discovery. They push beyond boundaries to experience life directly and authentically.',
    coreDesire: 'The freedom to find out who they are through exploring the world.',
    goal: 'To experience a more authentic, fulfilling life.',
    greatestFear: 'Getting trapped, conformity, inner emptiness.',
    strategy: 'Journey, seeking out and experiencing new things, escape from boredom.',
    weakness: 'Aimless wandering, becoming a misfit, inability to commit to one place or craft.',
    talent: 'Autonomy, ambition, being true to one’s inner soul.',
    strengths: ['Boundless adaptability', 'Pioneering curiosity', 'Authentic independence', 'Broad perspective'],
    careerTendencies: ['Expedition Travel', 'Anthropology', 'Speculative Journalism', 'Freelance Innovation', 'Outdoor Stewardship'],
    relationshipStyle: 'Thrives with a fellow adventurer who grants generous space and joins in journeys rather than binding them down.',
    iconName: 'compass'
  },
  {
    id: 'creator',
    name: 'The Creator',
    tagline: 'Imagination • Expression • Innovation',
    keywords: ['Imagination', 'Expression', 'Innovation'],
    description: 'The Creator transforms imagination into enduring form. If something can be imagined, they believe it can be forged into tangible reality.',
    coreDesire: 'To create things of enduring value.',
    goal: 'To realize a vision.',
    greatestFear: 'Mediocre vision or execution; creative stagnation.',
    strategy: 'Develop artistic control and skill; create culture.',
    weakness: 'Perfectionism, bad solutions, creating drama just to feel inspired.',
    talent: 'Creativity, vision, aesthetic mastery, innovative thinking.',
    strengths: ['Original vision', 'Aesthetic refinement', 'Inventive problem-solving', 'Passionate dedication'],
    careerTendencies: ['Fine Arts', 'Architecture', 'Product Design', 'Music Composition', 'Creative Direction'],
    relationshipStyle: 'Expresses affection through shared art, aesthetic environments, and deep emotional collaboration.',
    iconName: 'pen'
  },
  {
    id: 'caregiver',
    name: 'The Caregiver',
    tagline: 'Compassion • Support • Nurture',
    keywords: ['Compassion', 'Support', 'Nurture'],
    description: 'The Caregiver is moved by compassion and empathy to protect and nourish others. They create sanctuary and relieve suffering wherever they can.',
    coreDesire: 'To protect and care for others.',
    goal: 'To help others thrive and alleviate suffering.',
    greatestFear: 'Selfishness and ingratitude; harm befalling those they love.',
    strategy: 'Doing things for others, providing emotional warmth and physical security.',
    weakness: 'Martyrdom, being taken advantage of, neglecting their own self-care.',
    talent: 'Compassion, generosity, emotional warmth, steadfast care.',
    strengths: ['Unconditional empathy', 'Selfless generosity', 'Exceptional listening', 'Creating safety'],
    careerTendencies: ['Pediatrics & Nursing', 'Counseling & Social Work', 'Non-profit Leadership', 'Early Childhood Education', 'Community Organizing'],
    relationshipStyle: 'Devoted, attentive, and deeply supportive. They flourish when their partner acknowledges and recipocates their generosity.',
    iconName: 'heart'
  },
  {
    id: 'ruler',
    name: 'The Ruler',
    tagline: 'Leadership • Order • Prosperity',
    keywords: ['Leadership', 'Order', 'Prosperity'],
    description: 'The Ruler creates prosperity and order out of chaos. They take responsibility for the collective good and build institutions that last.',
    coreDesire: 'Control and the creation of an enduring, prosperous community.',
    goal: 'Create a prosperous, successful family or organization.',
    greatestFear: 'Chaos, being overthrown, loss of influence.',
    strategy: 'Exercise power and leadership with dignity and structured authority.',
    weakness: 'Being authoritarian, unable to delegate, fear of showing vulnerability.',
    talent: 'Responsibility, leadership, systemic governance, strategic foresight.',
    strengths: ['Decisive governance', 'Long-term planning', 'Calm in crisis', 'Organizational mastery'],
    careerTendencies: ['Executive Management', 'Civic Leadership', 'Judiciary', 'Wealth Stewardship', 'Urban Planning'],
    relationshipStyle: 'Values stability, mutual ambition, and shared respect. They treat their partnership as a noble alliance.',
    iconName: 'crown'
  },
  {
    id: 'rebel',
    name: 'The Rebel',
    tagline: 'Revolution • Freedom • Transformation',
    keywords: ['Revolution', 'Freedom', 'Transformation'],
    description: 'The Rebel challenges outmoded conventions and breaks rules that no longer serve humanity, catalyzing necessary disruption.',
    coreDesire: 'Revenge or revolution; liberating the suppressed.',
    goal: 'To overturn what isn’t working.',
    greatestFear: 'To be powerless or ineffectual.',
    strategy: 'Disrupt, destroy, or shock the status quo.',
    weakness: 'Crossing over into gratuitous rebellion or destructive behavior.',
    talent: 'Risk-taking, progressive vision, authentic candor, catalyzing radical change.',
    strengths: ['Unvarnished authenticity', 'Courage to defy unjust authority', 'Progressive vision', 'Magnetic charisma'],
    careerTendencies: ['Activism', 'Disruptive Technology', 'Avant-Garde Arts', 'Investigative Reform', 'Independent Media'],
    relationshipStyle: 'Cannot abide phoniness or micromanagement. Needs a partner who respects their fire and isn’t afraid of intense dialogue.',
    iconName: 'bolt'
  },
  {
    id: 'magician',
    name: 'The Magician',
    tagline: 'Transformation • Vision • Alchemy',
    keywords: ['Transformation', 'Vision', 'Alchemy'],
    description: 'The Magician understands the fundamental laws of nature and uses them to transform consciousness, situations, and reality.',
    coreDesire: 'To understand the fundamental laws of how the world works.',
    goal: 'To make dreams come true through transformation.',
    greatestFear: 'Unintended negative consequences; manipulation.',
    strategy: 'Develop a vision and live by it.',
    weakness: 'Becoming manipulative or lost in esoteric abstractions.',
    talent: 'Finding win-win solutions, transformative intuition, charismatic vision.',
    strengths: ['Synthesizing opposites', 'Catalyzing breakthroughs', 'Deep intuition', 'Transformative magnetism'],
    careerTendencies: ['Transformational Coaching', 'Strategic Futuring', 'Neuroscience', 'Alchemical Medicine', 'Creative Synthesis'],
    relationshipStyle: 'Seeks spiritual connection, mutual awakening, and intense energetic synchronicity with their beloved.',
    iconName: 'wand'
  },
  {
    id: 'lover',
    name: 'The Lover',
    tagline: 'Passion • Connection • Beauty',
    keywords: ['Passion', 'Connection', 'Beauty'],
    description: 'The Lover seeks intimacy, passionate connection, and sensory bliss. They celebrate romance, friendship, and beauty in all things.',
    coreDesire: 'Attain intimacy and experience pleasure.',
    goal: 'Being in a relationship with the people, work, and surroundings they love.',
    greatestFear: 'Being alone, a wallflower, unwanted, unloved.',
    strategy: 'To become more and more physically and emotionally attractive.',
    weakness: 'Outward-directed desire to please others at risk of losing own identity.',
    talent: 'Passion, gratitude, appreciation, commitment, and aesthetic charm.',
    strengths: ['Emotional depth', 'Radiant sensuality', 'Dedication to beauty', 'Heartfelt generosity'],
    careerTendencies: ['Haute Cuisine', 'Couples Therapy', 'Hospitality & Sanctuary', 'Aesthetic Arts', 'Brand Storytelling'],
    relationshipStyle: 'Intensely romantic, expressive, and dedicated to emotional harmony and continuous courtship.',
    iconName: 'sparkles'
  },
  {
    id: 'jester',
    name: 'The Jester',
    tagline: 'Joy • Playfulness • Presence',
    keywords: ['Joy', 'Playfulness', 'Presence'],
    description: 'The Jester lives in the joy of the present moment. They illuminate life with humor, lightness, and play, puncturing pretension.',
    coreDesire: 'To live in the moment with full enjoyment.',
    goal: 'To have a great time and lighten up the world.',
    greatestFear: 'Being bored or boring others.',
    strategy: 'Play, make jokes, be funny.',
    weakness: 'Frivolity, wasting time, hiding genuine pain behind humor.',
    talent: 'Joy, humor, diffusing tension, present-moment gratitude.',
    strengths: ['Effortless wit', 'Diffusing conflict with humor', 'Uninhibited joy', 'Emotional liberation'],
    careerTendencies: ['Comedy & Satire', 'Creative Marketing', 'Event Production', 'Interactive Entertainment', 'Facilitation'],
    relationshipStyle: 'Playful, spontaneous, and uplifting. They need a partner who can laugh easily and not take life too gravely.',
    iconName: 'masks'
  },
  {
    id: 'everyman',
    name: 'The Everyman',
    tagline: 'Belonging • Empathy • Realism',
    keywords: ['Belonging', 'Empathy', 'Realism'],
    description: 'The Everyman believes all people possess inherent dignity. They value authentic belonging, humility, and grounded human connection.',
    coreDesire: 'Connecting with others and belonging.',
    goal: 'To belong and fit in authentically.',
    greatestFear: 'To be left out or to stand out from the crowd as arrogant.',
    strategy: 'Develop ordinary solid virtues, be down to earth, the common touch.',
    weakness: 'Losing one’s own self to blend in or avoid rocking the boat.',
    talent: 'Realism, empathy, lack of pretense, steadfast camaraderie.',
    strengths: ['Unvarnished honesty', 'Approachable warmth', 'Deep reliability', 'Democratic spirit'],
    careerTendencies: ['Community Advocacy', 'Human Resources', 'Civil Service', 'Cooperative Business', 'Operations'],
    relationshipStyle: 'Down-to-earth, genuine, and deeply loyal. No games or pretension; simple, enduring devotion.',
    iconName: 'users'
  },
  {
    id: 'innocent',
    name: 'The Innocent',
    tagline: 'Hope • Faith • Purity',
    keywords: ['Hope', 'Faith', 'Purity'],
    description: 'The Innocent approaches life with optimism, faith, and purity of heart. They remind the world of goodness, hope, and wonder.',
    coreDesire: 'To experience paradise and maintain innocence.',
    goal: 'To be happy and bring harmony.',
    greatestFear: 'Doing something wrong or bad that will provoke punishment.',
    strategy: 'To do things right; trust in the goodness of life.',
    weakness: 'Boring for all their naive innocence; denial of difficult realities.',
    talent: 'Faith and optimism, seeing the innate good in others.',
    strengths: ['Unshakeable optimism', 'Purity of intent', 'Inspiring hope', 'Wholesome trust'],
    careerTendencies: ['Ethical Non-Profits', 'Holistic Wellness', 'Inspirational Writing', 'Ecological Education', 'Pastoral Care'],
    relationshipStyle: 'Gentle, sincere, and trusting. They need a gentle partner who protects their heart and shares their values.',
    iconName: 'sun'
  }
];

export interface ArchetypeQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    archetypeId: string;
  }[];
}

export const ARCHETYPE_QUESTIONS: ArchetypeQuestion[] = [
  {
    id: 1,
    question: "When faced with an unexpected crisis, what is your immediate instinct?",
    options: [
      { text: "Analyze the root cause and research the facts before taking action.", archetypeId: 'sage' },
      { text: "Step up, take charge, and courageously tackle the challenge head-on.", archetypeId: 'hero' },
      { text: "Ensure everyone is emotionally safe, cared for, and comforted.", archetypeId: 'caregiver' },
      { text: "Look for an innovative, unconventional way to transform the entire situation.", archetypeId: 'creator' }
    ]
  },
  {
    id: 2,
    question: "What core belief drives your everyday decisions most deeply?",
    options: [
      { text: "Freedom and discovering new horizons are essential to a fulfilled life.", archetypeId: 'explorer' },
      { text: "Mastery, discipline, and building an enduring legacy matter most.", archetypeId: 'ruler' },
      { text: "Deep connection, love, and intimacy are what make life magical.", archetypeId: 'lover' },
      { text: "Life shouldn't be taken too seriously; laughter and joy are medicine.", archetypeId: 'jester' }
    ]
  },
  {
    id: 3,
    question: "How do you respond when you witness an unfair, outmoded rule?",
    options: [
      { text: "Challenge and disrupt it openly—rules meant to control deserve to be broken.", archetypeId: 'rebel' },
      { text: "Formulate a systematic, lawful plan to reform the system from within.", archetypeId: 'ruler' },
      { text: "Explain the logical inconsistencies objectively to educate the public.", archetypeId: 'sage' },
      { text: "Rally everyday people together through shared empathy and solidarity.", archetypeId: 'everyman' }
    ]
  },
  {
    id: 4,
    question: "What brings you the deepest sense of creative fulfillment?",
    options: [
      { text: "Making a tangible, original piece of art, music, or design.", archetypeId: 'creator' },
      { text: "Uncovering a hidden truth or solving a complex intellectual riddle.", archetypeId: 'sage' },
      { text: "Helping someone overcome pain and watching them flourish.", archetypeId: 'caregiver' },
      { text: "Experiencing a magical breakthrough that transforms how someone sees the world.", archetypeId: 'magician' }
    ]
  },
  {
    id: 5,
    question: "Which setting feels most like your natural sanctuary?",
    options: [
      { text: "A quiet study or library filled with profound books and research tools.", archetypeId: 'sage' },
      { text: "A rugged wilderness trail or an unfamiliar foreign city with no itinerary.", archetypeId: 'explorer' },
      { text: "A warm, beautifully appointed home filled with loved ones and wholesome food.", archetypeId: 'caregiver' },
      { text: "A vibrant studio filled with creative tools, canvases, and sketches.", archetypeId: 'creator' }
    ]
  },
  {
    id: 6,
    question: "What is your greatest personal fear?",
    options: [
      { text: "Being trapped in routine conformity or losing personal freedom.", archetypeId: 'explorer' },
      { text: "Being powerless, weak, or failing when someone depends on my strength.", archetypeId: 'hero' },
      { text: "Being deceived, living in ignorance, or misunderstanding reality.", archetypeId: 'sage' },
      { text: "Being isolated, unloved, or unable to experience passionate connection.", archetypeId: 'lover' }
    ]
  },
  {
    id: 7,
    question: "In a collaborative team, what role do you naturally assume?",
    options: [
      { text: "The visionary strategist who establishes order, goals, and standards.", archetypeId: 'ruler' },
      { text: "The honest, dependable team player who ensures everyone feels included.", archetypeId: 'everyman' },
      { text: "The inventive spark who comes up with fresh, outside-the-box concepts.", archetypeId: 'creator' },
      { text: "The playful catalyst who keeps spirits high and cuts through stuffy tension.", archetypeId: 'jester' }
    ]
  },
  {
    id: 8,
    question: "When you contemplate the meaning of a good life, what resonates most?",
    options: [
      { text: "Living with pure optimism, faith, and simple harmony.", archetypeId: 'innocent' },
      { text: "Mastering complex forces to turn visionary dreams into reality.", archetypeId: 'magician' },
      { text: "Standing up for justice and conquering worthy obstacles.", archetypeId: 'hero' },
      { text: "Deepening your mind until you see through the illusions of the world.", archetypeId: 'sage' }
    ]
  }
];

export function calculateArchetypeScores(answers: Record<number, string>): { primary: Archetype; secondary: Archetype; scores: Record<string, number> } {
  const tally: Record<string, number> = {};
  ARCHETYPES_DATA.forEach(a => tally[a.id] = 0);

  Object.values(answers).forEach(archId => {
    if (tally[archId] !== undefined) {
      tally[archId] += 1;
    }
  });

  const sorted = Object.entries(tally).sort((a, b) => b[1] - a[1]);
  const primaryId = sorted[0]?.[0] || 'sage';
  const secondaryId = sorted[1]?.[0] || 'hero';

  const primary = ARCHETYPES_DATA.find(a => a.id === primaryId) || ARCHETYPES_DATA[0];
  const secondary = ARCHETYPES_DATA.find(a => a.id === secondaryId) || ARCHETYPES_DATA[1];

  return { primary, secondary, scores: tally };
}
