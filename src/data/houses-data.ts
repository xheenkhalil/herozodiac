// src/data/houses-data.ts

export interface HouseInfo {
  number: number;
  roman: string;
  name: string;
  latinName: string;
  domain: string;
  type: 'Angular' | 'Succedent' | 'Cadent';
  typeDescription: string;
  naturalSign: string;
  naturalRuler: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  keywords: string[];
  summary: string;
  focusArea: string;
}

export const HOUSES_METADATA: HouseInfo[] = [
  {
    number: 1,
    roman: 'I',
    name: 'First House of Self & Identity',
    latinName: 'Vita (Life)',
    domain: 'Ascendant, physical body, temperament, vitality, first impressions, outward demeanor',
    type: 'Angular',
    typeDescription: 'Angular houses are pivotal action portals. Placements here express immediately and visibly in your life.',
    naturalSign: 'Aries',
    naturalRuler: 'Mars',
    element: 'Fire',
    keywords: ['Identity', 'Physical Body', 'Vitality', 'Selfhood', 'Instinct', 'First Impression'],
    summary: 'The First House marks the eastern horizon at the exact minute of birth (Ascendant). It is your cosmic lens, determining how you meet the world, your physical vitality, and how others perceive you.',
    focusArea: 'Personal Presence & Physical Energy'
  },
  {
    number: 2,
    roman: 'II',
    name: 'Second House of Values & Worth',
    latinName: 'Lucrum (Wealth)',
    domain: 'Personal finances, material possessions, self-esteem, earning potential, core principles',
    type: 'Succedent',
    typeDescription: 'Succedent houses provide grounding and resources to sustain what the angular houses initiate.',
    naturalSign: 'Taurus',
    naturalRuler: 'Venus',
    element: 'Earth',
    keywords: ['Finances', 'Self-Worth', 'Possessions', 'Resourcefulness', 'Sensory World'],
    summary: 'The Second House governs what you own and how you value yourself. It defines your relationship with money, material abundance, personal security, and the unique skills you leverage to thrive.',
    focusArea: 'Financial Security & Self-Worth'
  },
  {
    number: 3,
    roman: 'III',
    name: 'Third House of Mind & Communication',
    latinName: 'Fratres (Brothers)',
    domain: 'Intellect, speech, writing, early education, siblings, neighborhood, short travel',
    type: 'Cadent',
    typeDescription: 'Cadent houses facilitate learning, mental processing, adaptability, and synthesis.',
    naturalSign: 'Gemini',
    naturalRuler: 'Mercury',
    element: 'Air',
    keywords: ['Communication', 'Intellect', 'Siblings', 'Local Travel', 'Curiosity', 'Writing'],
    summary: 'The Third House rules how you process and transmit ideas. It oversees everyday exchanges, short-distance journeys, sibling bonds, and your curiosity about your immediate environment.',
    focusArea: 'Mental Agility & Expression'
  },
  {
    number: 4,
    roman: 'IV',
    name: 'Fourth House of Home & Ancestry',
    latinName: 'Genitor (Parents)',
    domain: 'Imum Coeli (IC), roots, domestic sanctuary, private life, ancestral heritage, inner security',
    type: 'Angular',
    typeDescription: 'Angular houses represent foundational anchors where planetary energy initiates immediate action.',
    naturalSign: 'Cancer',
    naturalRuler: 'Moon',
    element: 'Water',
    keywords: ['Home', 'Ancestry', 'Sanctuary', 'Mother/Father', 'Emotional Security', 'Lineage'],
    summary: 'The Fourth House is the bedrock of your psyche (IC). It reflects your ancestral heritage, childhood foundation, private domestic sanctuary, and where you return to recharge your soul.',
    focusArea: 'Domestic Foundation & Roots'
  },
  {
    number: 5,
    roman: 'V',
    name: 'Fifth House of Pleasure & Passion',
    latinName: 'Nati (Children)',
    domain: 'Creative self-expression, romance, dating, artistry, children, recreation, joyful risks',
    type: 'Succedent',
    typeDescription: 'Succedent houses provide grounding and resources to sustain what the angular houses initiate.',
    naturalSign: 'Leo',
    naturalRuler: 'Sun',
    element: 'Fire',
    keywords: ['Romance', 'Creativity', 'Artistry', 'Joy', 'Children', 'Self-Expression'],
    summary: 'The Fifth House is where your creative inner child plays. It rules dating, falling in love, artistic hobbies, spontaneous play, and the joyful creations you gift to the universe.',
    focusArea: 'Creative Fire & Romance'
  },
  {
    number: 6,
    roman: 'VI',
    name: 'Sixth House of Wellness & Service',
    latinName: 'Valetudo (Health)',
    domain: 'Daily routines, somatic wellness, diet, workplace habits, duty, mastery of craft, pets',
    type: 'Cadent',
    typeDescription: 'Cadent houses facilitate learning, mental processing, adaptability, and synthesis.',
    naturalSign: 'Virgo',
    naturalRuler: 'Mercury',
    element: 'Earth',
    keywords: ['Routines', 'Physical Health', 'Service', 'Organization', 'Craftsmanship', 'Wellness'],
    summary: 'The Sixth House governs the maintenance of daily life. It oversees your physical health habits, nutrition, workplace ethics, devotion to craft, and how you provide service to others.',
    focusArea: 'Daily Habits & Health'
  },
  {
    number: 7,
    roman: 'VII',
    name: 'Seventh House of Partnership & Union',
    latinName: 'Uxor (Spouse)',
    domain: 'Descendant, marriage, committed business partnerships, contracts, open adversaries',
    type: 'Angular',
    typeDescription: 'Angular houses represent foundational anchors where planetary energy initiates immediate action.',
    naturalSign: 'Libra',
    naturalRuler: 'Venus',
    element: 'Air',
    keywords: ['Partnership', 'Marriage', 'Contracts', 'Diplomacy', 'Mutual Growth', 'Shadow Self'],
    summary: 'Positioned opposite the Ascendant, the Seventh House governs one-on-one commitments. It details what you look for in a soulmate, how you balance give-and-take, and what you project onto partners.',
    focusArea: 'Committed Relationships & Contracts'
  },
  {
    number: 8,
    roman: 'VIII',
    name: 'Eighth House of Transformation & Mystery',
    latinName: 'Mors (Death & Rebirth)',
    domain: 'Shared assets, inheritance, deep intimacy, psychological evolution, taboos, regeneration',
    type: 'Succedent',
    typeDescription: 'Succedent houses provide grounding and resources to sustain what the angular houses initiate.',
    naturalSign: 'Scorpio',
    naturalRuler: 'Pluto & Mars',
    element: 'Water',
    keywords: ['Rebirth', 'Shared Assets', 'Intimacy', 'Alchemy', 'Psychology', 'Transformation'],
    summary: 'The Eighth House is the realm of profound merging. It governs emotional vulnerability, joint investments, sexual intimacy, occult research, and the powerful cycles of rebirth through crisis.',
    focusArea: 'Intimacy & Rebirth'
  },
  {
    number: 9,
    roman: 'IX',
    name: 'Ninth House of Philosophy & Expansion',
    latinName: 'Iter (Journeys)',
    domain: 'Higher education, world travel, spirituality, philosophy, publishing, foreign cultures, law',
    type: 'Cadent',
    typeDescription: 'Cadent houses facilitate learning, mental processing, adaptability, and synthesis.',
    naturalSign: 'Sagittarius',
    naturalRuler: 'Jupiter',
    element: 'Fire',
    keywords: ['Wisdom', 'Pilgrimage', 'Higher Learning', 'Publishing', 'Philosophy', 'Worldview'],
    summary: 'The Ninth House governs the expansion of consciousness. It drives your desire for truth through long voyages, higher academia, philosophical inquiry, spiritual study, and cross-cultural wisdom.',
    focusArea: 'Higher Wisdom & Exploration'
  },
  {
    number: 10,
    roman: 'X',
    name: 'Tenth House of Career & Legacy',
    latinName: 'Regnum (Kingdom)',
    domain: 'Midheaven (MC), public reputation, vocational calling, authority, achievements, status',
    type: 'Angular',
    typeDescription: 'Angular houses represent foundational anchors where planetary energy initiates immediate action.',
    naturalSign: 'Capricorn',
    naturalRuler: 'Saturn',
    element: 'Earth',
    keywords: ['Career', 'Midheaven', 'Legacy', 'Public Standing', 'Authority', 'Achievement'],
    summary: 'The Tenth House sits at the apex of the sky (Midheaven/MC). It embodies your life vocation, public reputation, professional stature, and the enduring architectural legacy you leave behind.',
    focusArea: 'Public Calling & Mastery'
  },
  {
    number: 11,
    roman: 'XI',
    name: 'Eleventh House of Community & Vision',
    latinName: 'Benefacta (Good Deeds)',
    domain: 'Friendship networks, collective movements, humanitarian ideals, aspirations, allies',
    type: 'Succedent',
    typeDescription: 'Succedent houses provide grounding and resources to sustain what the angular houses initiate.',
    naturalSign: 'Aquarius',
    naturalRuler: 'Uranus & Saturn',
    element: 'Air',
    keywords: ['Community', 'Alliances', 'Future Vision', 'Humanitarianism', 'Friendship', 'Hopes'],
    summary: 'The Eleventh House governs your chosen community and hopes for humanity. It represents collaborative endeavors, networking, forward-thinking social movements, and lifelong friendships.',
    focusArea: 'Social Tribe & Aspirations'
  },
  {
    number: 12,
    roman: 'XII',
    name: 'Twelfth House of the Unconscious & Spirit',
    latinName: 'Carcer (Solitude)',
    domain: 'Subconscious mind, dreams, karma, spiritual retreat, hidden strengths, transcendence',
    type: 'Cadent',
    typeDescription: 'Cadent houses facilitate learning, mental processing, adaptability, and synthesis.',
    naturalSign: 'Pisces',
    naturalRuler: 'Neptune & Jupiter',
    element: 'Water',
    keywords: ['Spirituality', 'Solitude', 'Unconscious', 'Dreams', 'Karmic Release', 'Transcendence'],
    summary: 'The Twelfth House is the mystical sanctuary of your chart. It governs the subconscious realm, dream states, spiritual liberation, meditation, and the hidden inner strengths unlocked in quiet solitude.',
    focusArea: 'Subconscious Mind & Spirituality'
  }
];

export const SIGN_RULERS: Record<string, string> = {
  'Aries': 'Mars',
  'Taurus': 'Venus',
  'Gemini': 'Mercury',
  'Cancer': 'Moon',
  'Leo': 'Sun',
  'Virgo': 'Mercury',
  'Libra': 'Venus',
  'Scorpio': 'Pluto & Mars',
  'Sagittarius': 'Jupiter',
  'Capricorn': 'Saturn',
  'Aquarius': 'Uranus & Saturn',
  'Pisces': 'Neptune & Jupiter'
};

export const SIGN_HOUSE_MEANINGS: Record<string, Record<number, string>> = {
  'Aries': {
    1: 'Assertive, dynamic presence with direct initiative and courageous outward energy.',
    2: 'Fast-paced earning, entrepreneurial drive, and spontaneous financial initiative.',
    3: 'Direct, candid communication and quick intellectual breakthroughs.',
    4: 'Dynamic or energetic home life, with a need for personal autonomy within the family.',
    5: 'Passionate romantic pursuits and bold creative projects.',
    6: 'High physical stamina in work; best suited for self-directed, active daily routines.',
    7: 'Attracted to confident, assertive partners who challenge and ignite your fire.',
    8: 'Fearless exploration of personal transformation and courageous emotional healing.',
    9: 'Spontaneous quest for adventure, bold philosophies, and pioneering travels.',
    10: 'Pioneering career ambitions, leadership, and a desire to be first in your vocation.',
    11: 'Active instigator in social groups, leading humanitarian causes with vigor.',
    12: 'Private passions and deep spiritual courage developed through solitude.'
  },
  'Taurus': {
    1: 'Calm, grounded aura radiating reliability, stability, and sensory grace.',
    2: 'Natural financial prudence, steady wealth accumulation, and deep appreciation for material security.',
    3: 'Deliberate, thoughtful speaking style with practical, long-lasting intellect.',
    4: 'Peaceful, beautiful domestic sanctuary filled with comfort and earthly abundance.',
    5: 'Sensual romance, artistic hobbies, and deep appreciation for musical or visual arts.',
    6: 'Steady, methodical work ethic with great attention to physical wellness and nourishment.',
    7: 'Seeking loyal, dependable partners who offer steadfast emotional and material grounding.',
    8: 'Prudent shared investments and deep, enduring loyalty in intimate unions.',
    9: 'Philosophies rooted in natural law, sustainable wisdom, and pragmatic values.',
    10: 'Steady ascent to career prominence, recognized for enduring excellence and dependability.',
    11: 'Loyal, lifelong friendships built on shared tangible values and mutual support.',
    12: 'Subconscious desire for inner stillness and grounding through nature.'
  },
  'Gemini': {
    1: 'Expressive, youthful, intellectually curious persona with quick wit and communicative charm.',
    2: 'Multiple income streams, monetization of ideas, and dynamic financial versatility.',
    3: 'Vibrant, witty communicative power with an insatiable appetite for facts and news.',
    4: 'Active, book-filled domestic life with frequent changes or two residential hubs.',
    5: 'Playful flirtation, intellectual banter in dating, and versatile creative hobbies.',
    6: 'Fast-paced work environment requiring multitasking, research, and communication.',
    7: 'Craving mental stimulation and witty conversation as the core foundation of romance.',
    8: 'Analytical approach to psychological mysteries and inquisitive research into the unknown.',
    9: 'Broad, eclectic philosophical views and love for foreign languages and literature.',
    10: 'Public career in media, journalism, education, or communication-centric fields.',
    11: 'Broad and diverse social circle connecting people across varied cultural domains.',
    12: 'Active mental dreamlife and subconscious synthesis of varied perspectives.'
  },
  'Cancer': {
    1: 'Nurturing, intuitive, emotionally receptive presence that makes others feel instantly safe.',
    2: 'Emotional attachment to security, intuitive financial saving, and care for family assets.',
    3: 'Empathetic communication, storytelling gift, and deep memory retention.',
    4: 'Deeply cherished family roots, emotional sanctuary, and ancestral pride.',
    5: 'Heartfelt, sentimental romance and protective devotion to children and creative crafts.',
    6: 'Need for an emotionally supportive work atmosphere with nurturing daily routines.',
    7: 'Seeking deep emotional safety, empathy, and protective devotion in lifelong partners.',
    8: 'Profound emotional intuition and psychic sensitivity to shared psychological energies.',
    9: 'Spiritual beliefs centered on ancestral wisdom, intuitive ethics, and soul pilgrimage.',
    10: 'Vocation tied to public caretaking, hospitality, history, or community stewardship.',
    11: 'Viewing close friendship groups as an extended emotional family.',
    12: 'Rich imaginative sanctuary and potent spiritual sensitivity to collective emotions.'
  },
  'Leo': {
    1: 'Warm, charismatic, regal aura with natural dramatic flair and generous warmth.',
    2: 'Generous spending, pride in earning power, and ability to monetize creative talents.',
    3: 'Warm, enthusiastic speech and dramatic storytelling that captivates listeners.',
    4: 'A home that serves as your royal castle—grand, welcoming, and creatively styled.',
    5: 'Grand, dramatic romances and exuberant artistic talents that demand the spotlight.',
    6: 'Pride in personal craftsmanship and leadership within everyday work settings.',
    7: 'Attracted to vibrant, charismatic partners who celebrate and elevate your inner light.',
    8: 'Transformational growth through cultivating authentic emotional generosity.',
    9: 'Passionate commitment to noble life philosophies and inspiring mentorship.',
    10: 'Prominent, visible leadership career commanding authority and public acclaim.',
    11: 'The heart and champion of social networks, organizing inspiring collective events.',
    12: 'Secret creative genius and private spiritual connection to higher divine courage.'
  },
  'Virgo': {
    1: 'Refined, observant, analytical demeanour with an understated, graceful precision.',
    2: 'Careful financial bookkeeping, practical resource stewardship, and pragmatic values.',
    3: 'Sharp critical intellect, precise syntax, and meticulous analytical thinking.',
    4: 'Organized, clean domestic environment functioning with clockwork harmony.',
    5: 'Discerning romantic tastes, refined crafts, and dedication to creative mastery.',
    6: 'Exceptional productivity, somatic wellness focus, and devotion to service excellence.',
    7: 'Attracted to intelligent, supportive partners who share your standard of integrity.',
    8: 'Detailed analysis of psychological motives and methodical healing of past patterns.',
    9: 'Philosophical pursuit of practical wisdom, holistic health, and empirical truth.',
    10: 'Reputation for unimpeachable competence, specialized mastery, and analytical rigor.',
    11: 'Reliable, helpful contribution to organizations and practical humanitarian causes.',
    12: 'Private practice of meditative purification and quiet, selfless service behind the scenes.'
  },
  'Libra': {
    1: 'Charming, diplomatic, aesthetically balanced persona that naturally fosters harmony.',
    2: 'Values oriented toward beauty, art, design, and partnership-based investments.',
    3: 'Tactful, considerate communication style that naturally resolves conflicts.',
    4: 'Serene, tastefully decorated home focused on aesthetic grace and peaceful hospitality.',
    5: 'Refined romantic courtship, love for the arts, and balanced creative partnerships.',
    6: 'Thriving in collaborative, harmonious work environments with aesthetic or social focus.',
    7: 'Central focus on egalitarian partnership, mutual devotion, and legal integrity.',
    8: 'Graceful handling of shared resources and finding peace through emotional compromise.',
    9: 'Philosophies of justice, human rights, cultural diplomacy, and universal harmony.',
    10: 'Career in law, diplomacy, public relations, arts, or high-level mediation.',
    11: 'Social bridge-builder uniting diverse groups into mutually respectful alliances.',
    12: 'Subconscious longing for ideal beauty and peace, accessed through art and meditation.'
  },
  'Scorpio': {
    1: 'Intense, magnetic, perceptive gaze with a powerful aura of mystery and depth.',
    2: 'Resourceful financial instincts, secretive investments, and deep inner wealth.',
    3: 'Penetrating intellect that sees right through surface pretense to hidden truths.',
    4: 'Deeply private domestic stronghold where emotional trust is strictly guarded.',
    5: 'All-consuming romantic passions and deeply transformative creative obsessions.',
    6: 'Relentless work ethic, exceptional investigative capacity, and crisis management.',
    7: 'Craving profound, unshakeable soul intimacy with total emotional authenticity.',
    8: 'Mastery over psychological regeneration, occult mysteries, and financial alchemy.',
    9: 'Relentless quest for hidden metaphysical truths, deep research, and esoteric wisdom.',
    10: 'Formidable career authority, wielding transformative power and strategic command.',
    11: 'Small, fiercely loyal circle of trusted allies dedicated to meaningful change.',
    12: 'Immense psychic depth and natural ability to transmute shadow into spiritual gold.'
  },
  'Sagittarius': {
    1: 'Optimistic, adventurous, candid demeanor with an infectious enthusiasm for life.',
    2: 'Generous financial optimism, abundance mindset, and speculative luck.',
    3: 'Broad, philosophical communication with honesty, humor, and big-picture synthesis.',
    4: 'Spacious, culturally rich home or a nomadic lifestyle spanning multiple lands.',
    5: 'Joyful, spontaneous dating adventures and celebratory creative exploration.',
    6: 'Desire for freedom and purpose in daily work, allergic to micromanagement.',
    7: 'Seeking partners who are fellow wanderers, philosophers, and intellectual companions.',
    8: 'Optimistic navigation of life transitions and faith in ultimate rebirth.',
    9: 'Natural domain of higher philosophy, world exploration, spirituality, and publishing.',
    10: 'Vocation in academia, international law, publishing, or cross-cultural leadership.',
    11: 'Expansive global network of visionary friends and international alliances.',
    12: 'Innately guided by deep philosophical faith, prophetic dreams, and universal trust.'
  },
  'Capricorn': {
    1: 'Composed, disciplined, authoritative presence radiating mature competence.',
    2: 'Long-term financial strategy, conservative investing, and enduring material legacy.',
    3: 'Pragmatic, structured communicative style with authoritative, measured speech.',
    4: 'Strong sense of family duty, respect for heritage, and establishing a lasting estate.',
    5: 'Disciplined creative crafts, traditional courtship, and taking passions seriously.',
    6: 'Flawless professional routine, dedication to duty, and mastery of administrative systems.',
    7: 'Seeking stable, ambitious partners with whom to build an enduring societal monument.',
    8: 'Prudent, structured stewardship of generational wealth and joint financial contracts.',
    9: 'Rigorous philosophical frameworks grounded in history, tradition, and empirical law.',
    10: 'Natural home of ambition—achieving peak vocational prestige and organizational authority.',
    11: 'Strategic networking with respected mentors, professional guilds, and institutions.',
    12: 'Quiet self-mastery, stoic spiritual fortitude, and private dedication to duty.'
  },
  'Aquarius': {
    1: 'Original, eccentric, intellectual aura that values individuality and progressive ideas.',
    2: 'Unconventional income sources, tech-enabled wealth, and humanitarian financial values.',
    3: 'Inventive, unconventional thinking with rapid flashes of conceptual genius.',
    4: 'Unique, communal, or technologically progressive domestic living environment.',
    5: 'Unconventional romantic dynamics, eclectic creative hobbies, and playful nonconformity.',
    6: 'Innovative workplace practices, embracing automation, progressive tools, and autonomy.',
    7: 'Seeking intellectual equality, mutual freedom, and friendship-first companionship.',
    8: 'Objective psychological insight and innovative approaches to shared resources.',
    9: 'Visionary, reformist philosophies exploring the future of humanity and cosmic science.',
    10: 'Career in technology, humanitarian causes, science, or progressive social disruption.',
    11: 'Natural home of community—orchestrating movements, collective dreams, and chosen tribes.',
    12: 'Deep connection to the collective unconscious and intuitive future forecasting.'
  },
  'Pisces': {
    1: 'Mystical, empathetic, poetic aura with an ethereal, dreamlike magnetism.',
    2: 'Intuitive relationship with money, prioritizing spiritual alignment over raw materialism.',
    3: 'Poetic, metaphorical speech with deep intuitive and non-verbal comprehension.',
    4: 'Peaceful, sanctuary-like home near water or filled with art, music, and spiritual refuge.',
    5: 'Romantic idealism, musical or theatrical talent, and soulful artistic creations.',
    6: 'Need for compassionate work environments; gifted in holistic and healing arts.',
    7: 'Seeking unconditional soulmate love and spiritual communion with a romantic partner.',
    8: 'Psychic boundary merging, karmic financial healing, and spiritual rebirth.',
    9: 'Mystical spirituality, pilgrimages to sacred places, and universal compassion.',
    10: 'Vocation in cinema, arts, healing professions, psychology, or spiritual leadership.',
    11: 'Compassionate friendship network united by spiritual ideals and creative solidarity.',
    12: 'Natural sanctuary of boundless cosmic oneness, lucid dreams, and transcendent wisdom.'
  }
};

export function getHouseCuspInterpretation(houseNumber: number, sign: string): string {
  const signMap = SIGN_HOUSE_MEANINGS[sign];
  if (signMap && signMap[houseNumber]) {
    return signMap[houseNumber];
  }
  const houseMeta = HOUSES_METADATA.find(h => h.number === houseNumber);
  return `${sign} on the ${houseNumber}${getOrdinalSuffix(houseNumber)} House cusp directs its energy into ${houseMeta ? houseMeta.focusArea.toLowerCase() : 'this life sphere'}.`;
}

function getOrdinalSuffix(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}
