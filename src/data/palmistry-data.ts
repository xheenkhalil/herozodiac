// src/data/palmistry-data.ts

export interface PalmLine {
  id: string;
  name: string;
  location: string;
  significance: string;
  variations: {
    type: string;
    meaning: string;
  }[];
  advice: string;
}

export interface HandShape {
  id: string;
  name: string;
  element: 'Earth' | 'Air' | 'Fire' | 'Water';
  visualCharacteristics: string;
  personalityTraits: string[];
  careerResonance: string;
  relationshipApproach: string;
}

export interface PalmMount {
  id: string;
  name: string;
  location: string;
  planet: string;
  qualities: string;
  prominentMeaning: string;
  underdevelopedMeaning: string;
}

export const PALM_LINES: PalmLine[] = [
  {
    id: 'heart-line',
    name: 'Heart Line',
    location: 'Horizontal line running along the upper palm directly below the fingers.',
    significance: 'Governs emotional nature, romantic style, empathy, relationship devotion, and cardiovascular vitality.',
    variations: [
      {
        type: 'Starts directly beneath the Index Finger (Jupiter)',
        meaning: 'Deeply idealistic in love; generous, romantic, and seeks honorable, high-standard partnerships.'
      },
      {
        type: 'Starts beneath the Middle Finger (Saturn)',
        meaning: 'Pragmatic, sensual, and reserved; views relationships through a grounded, self-protective lens.'
      },
      {
        type: 'Starts between Index and Middle Finger',
        meaning: 'The golden balance; warm, realistic, capable of deep devotion while maintaining healthy boundaries.'
      },
      {
        type: 'Curved and clearly etched',
        meaning: 'Warm, expressive, and outwardly communicative about affection and romantic enthusiasm.'
      },
      {
        type: 'Straight and horizontal across the palm',
        meaning: 'Rational and composed; processes emotions internally and prefers quiet, predictable harmony.'
      }
    ],
    advice: 'Honor your emotional vulnerability. A clear heart line flourishes when you communicate honestly rather than retreating into protective aloofness.'
  },
  {
    id: 'head-line',
    name: 'Head Line',
    location: 'Starts between the thumb and index finger, running horizontally across the mid-palm.',
    significance: 'Reveals intellectual processing style, psychological focus, memory, creative imagination, and problem-solving.',
    variations: [
      {
        type: 'Long and straight across toward the percussion',
        meaning: 'Logical, analytical, and fact-focused; approaches complex dilemmas with cool objectivity.'
      },
      {
        type: 'Gently sloping downward toward the Mount of the Moon',
        meaning: 'Rich creative imagination, artistic flair, intuitive insight, and appreciation of poetry and symbols.'
      },
      {
        type: 'Deep fork at the end (Writer’s Fork)',
        meaning: 'Gift of persuasion, duality of logic and imagination, talent in debate, writing, and strategic communication.'
      },
      {
        type: 'Joined with the Life Line at the start',
        meaning: 'Cautious, thoughtful, respectful of tradition, and careful before initiating major endeavors.'
      },
      {
        type: 'Separated from the Life Line at the start',
        meaning: 'Fiercely independent, decisive, adventurous, and comfortable taking early risks.'
      }
    ],
    advice: 'Exercise both analytical discipline and creative daydreaming. Balance rigorous logic with open-minded curiosity.'
  },
  {
    id: 'life-line',
    name: 'Life Line',
    location: 'Arcs around the base of the thumb (Mount of Venus) toward the wrist.',
    significance: 'Does NOT predict the length of your life; it reflects physical vitality, stamina, lifestyle vitality, and major life crossroads.',
    variations: [
      {
        type: 'Wide, generous sweep into the center of the palm',
        meaning: 'Abundant physical stamina, warm enthusiasm, hospitality, and energetic vitality.'
      },
      {
        type: 'Curves closely hugging the thumb',
        meaning: 'Homebody energy, introverted recuperation, conservative with physical reserves.'
      },
      {
        type: 'Deep, clear, and unbroken channel',
        meaning: 'Consistent physical resilience, steady nervous system, and strong constitutional health.'
      },
      {
        type: 'Chained or faint texture',
        meaning: 'Fluctuating vitality; highly responsive to stress, requiring intentional rest, nutrition, and pacing.'
      }
    ],
    advice: 'Cultivate restorative daily rituals. Your life line shows that consistent self-care and peaceful surroundings preserve physical vitality.'
  },
  {
    id: 'fate-line',
    name: 'Fate Line (Line of Destiny)',
    location: 'Vertical line ascending through the center of the palm toward the middle finger (Saturn).',
    significance: 'Governs vocational career trajectory, life purpose, sense of duty, and external environmental influences.',
    variations: [
      {
        type: 'Originates from the base of the palm (Wrist/Neptune)',
        meaning: 'Early clarity of vocational purpose; self-made determination shaping career from youth.'
      },
      {
        type: 'Originates from the Mount of the Moon (Luna)',
        meaning: 'Career influenced by public favor, creative arts, overseas opportunities, or unexpected benefactors.'
      },
      {
        type: 'Starts later in life (mid-palm or above the Head Line)',
        meaning: 'Finding your true vocational calling in mature adulthood after trying various experimental paths.'
      },
      {
        type: 'Faint or absent',
        meaning: 'Complete freedom from rigid career scripts; adaptable nomad who creates their own unconventional journey.'
      }
    ],
    advice: 'Your career is an evolving masterpiece. When the fate line pauses or shifts, it signifies a liberating invitation to redefine your priorities.'
  }
];

export const HAND_SHAPES: HandShape[] = [
  {
    id: 'earth-hand',
    name: 'Earth Hand',
    element: 'Earth',
    visualCharacteristics: 'Square palm with short, sturdy fingers; few but deep, distinct palm lines.',
    personalityTraits: ['Pragmatic', 'Steadfast', 'Grounded', 'Nature-loving', 'Dependable'],
    careerResonance: 'Craftsmanship, agriculture, construction, veterinary medicine, physical sciences, and forestry.',
    relationshipApproach: 'Demonstrates devotion through tangible presence, domestic loyalty, and dependable support.'
  },
  {
    id: 'air-hand',
    name: 'Air Hand',
    element: 'Air',
    visualCharacteristics: 'Square palm with long, slender fingers; finely textured web of palm lines.',
    personalityTraits: ['Intellectual', 'Articulate', 'Inquisitive', 'Socially agile', 'Objective'],
    careerResonance: 'Journalism, software architecture, higher education, legal advocacy, and strategic research.',
    relationshipApproach: 'Requires mental stimulation, witty dialogue, and mutual independence.'
  },
  {
    id: 'fire-hand',
    name: 'Fire Hand',
    element: 'Fire',
    visualCharacteristics: 'Long rectangular palm with short, energetic fingers; prominent warm mounts.',
    personalityTraits: ['Charismatic', 'Passionate', 'Spontaneous', 'Action-oriented', 'Bold'],
    careerResonance: 'Entrepreneurship, competitive athletics, stage performance, emergency rescue, and venture leadership.',
    relationshipApproach: 'Electric, romantic, and seeks dynamic passion with a partner who embraces adventure.'
  },
  {
    id: 'water-hand',
    name: 'Water Hand',
    element: 'Water',
    visualCharacteristics: 'Long rectangular palm with long, elegant, tapering fingers; delicate network of fine lines.',
    personalityTraits: ['Intuitive', 'Empathetic', 'Imaginative', 'Melodious', 'Deeply sensitive'],
    careerResonance: 'Poetry, clinical psychology, sound composition, spiritual healing, and fine art creation.',
    relationshipApproach: 'Yearns for deep soulmate connection, tender vulnerability, and sacred mutual devotion.'
  }
];

export const PALM_MOUNTS: PalmMount[] = [
  {
    id: 'mount-of-venus',
    name: 'Mount of Venus',
    location: 'The fleshy cushion at the base of the thumb.',
    planet: 'Venus',
    qualities: 'Vitality, sensuality, passion, capacity for love, and aesthetic appreciation.',
    prominentMeaning: 'Warm-hearted, deeply sensual, highly creative, and generously affectionate.',
    underdevelopedMeaning: 'Calm, private, detached from sensory overindulgence, and conservative with energy.'
  },
  {
    id: 'mount-of-moon',
    name: 'Mount of the Moon (Luna)',
    location: 'The base of the palm opposite the thumb.',
    planet: 'Moon',
    qualities: 'Imagination, psychic intuition, subconscious dreams, and love of travel.',
    prominentMeaning: 'Vivid daydreamer, visionary artist, empathic sensitivity, and affinity for water.',
    underdevelopedMeaning: 'Realistic, grounded in the concrete present, and suspicious of mere fantasy.'
  },
  {
    id: 'mount-of-jupiter',
    name: 'Mount of Jupiter',
    location: 'Directly at the base of the index finger.',
    planet: 'Jupiter',
    qualities: 'Leadership, ambition, nobility, self-respect, and spiritual philosophy.',
    prominentMeaning: 'Natural executive commander, generous mentor, high ideals, and dignified presence.',
    underdevelopedMeaning: 'Humility, preferring quiet collaboration over commanding the spotlight.'
  },
  {
    id: 'mount-of-saturn',
    name: 'Mount of Saturn',
    location: 'Directly beneath the middle finger.',
    planet: 'Saturn',
    qualities: 'Discipline, solitude, philosophical depth, research, and sober responsibility.',
    prominentMeaning: 'Serious scholar, thoughtful strategist, comfortable in solitude, and respectful of time.',
    underdevelopedMeaning: 'Easygoing, light-hearted, and avoids brooding on existential gloom.'
  },
  {
    id: 'mount-of-apollo',
    name: 'Mount of Apollo (Sun)',
    location: 'Directly beneath the ring finger.',
    planet: 'Sun',
    qualities: 'Creativity, radiant joy, public recognition, artistic genius, and personal magnetism.',
    prominentMeaning: 'Celebrated artist, charming communicator, good fortune, and magnetic presence.',
    underdevelopedMeaning: 'Modest, practical, content to work behind the scenes without fanfare.'
  },
  {
    id: 'mount-of-mercury',
    name: 'Mount of Mercury',
    location: 'Directly beneath the pinky finger.',
    planet: 'Mercury',
    qualities: 'Communication, business acumen, quick wit, negotiation, and scientific intellect.',
    prominentMeaning: 'Persuasive speaker, shrewd entrepreneur, clever humor, and sharp numerical agility.',
    underdevelopedMeaning: 'Guarded in speech, honest to a fault, and unconcerned with commercial games.'
  }
];
