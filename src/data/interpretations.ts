// Basic Interpretation Data Structure
// In a real app, this would likely be fetched from a database or CMS.

export type PlanetSignKey = `${string}_${string}`; // e.g. "Sun_Aries"
export type PlanetHouseKey = `${string}_${number}`; // e.g. "Sun_1"
export type AspectKey = `${string}_${string}_${string}`; // e.g. "Sun_Moon_Square"

export const PLANET_IN_SIGN: Record<string, string> = {
  // SUN
  'Sun_Aries': "With the Sun in Aries, you possess a bold, pioneering spirit. You are direct, energetic, and often take the initiative. Your journey is about discovering who you are through action and independence.",
  'Sun_Taurus': "Your Sun in Taurus gifts you with patience, stability, and a love for the sensory world. You value security and are willing to work hard to build a comfortable life.",
  'Sun_Gemini': "With the Sun in Gemini, you are curious, adaptable, and communicative. You thrive on variety and intellectual stimulation, often serving as a bridge between different ideas and people.",
  'Sun_Cancer': "Your Sun in Cancer highlights your emotional depth and protective nature. You are deeply connected to home and family, finding strength in your roots and caring for others.",
  'Sun_Leo': "With the Sun in Leo, you shine with creativity, warmth, and a desire for self-expression. You have a natural regal quality and a need to be recognized for your unique talents.",
  'Sun_Virgo': "Your Sun in Virgo drives you toward improvement, service, and analysis. You have a keen eye for detail and find fulfillment in being useful and creating order.",
  'Sun_Libra': "With the Sun in Libra, you seek harmony, balance, and partnership. You are naturally diplomatic and find your sense of self through your relationships with others.",
  'Sun_Scorpio': "Your Sun in Scorpio indicates a life of intensity, transformation, and deep emotional power. You are not afraid to explore the mysteries of life and possess great resilience.",
  'Sun_Sagittarius': "With the Sun in Sagittarius, you are an explorer at heart. You value freedom, truth, and wisdom, constantly seeking to expand your horizons through travel or philosophy.",
  'Sun_Capricorn': "Your Sun in Capricorn bestows you with ambition, discipline, and a sense of responsibility. You are building a legacy, willing to climb the mountain step by step to achieve your goals.",
  'Sun_Aquarius': "With the Sun in Aquarius, you are innovative, forward-thinking, and value individuality. You often look to the future and are concerned with the betterment of society.",
  'Sun_Pisces': "Your Sun in Pisces suggests a compassionate, intuitive, and imaginative nature. You are deeply connected to the unseen worlds and often feel the emotions of those around you.",

  // Templates for others (Populate as needed)
  'Moon_Aries': "Your emotional nature is spontaneous and fiery. You react quickly and honestly to feelings.",
  'Moon_Taurus': "You find emotional security in stability, comfort, and tangible surroundings.",
  // ... (Can be expanded)
};

export const PLANET_IN_HOUSE: Record<string, string> = {
  // SUN
  'Sun_1': "The Sun in the 1st House places a strong emphasis on your personal identity and self-image. You are here to lead and make a visible impact.",
  'Sun_10': "With the Sun in the 10th House, your career and public reputation are central to your identity. You strive for recognition and achievement in the world.",
};

// Simplified Aspects for Demo
export const ASPECT_MEANINGS: Record<string, string> = {
  'Sun_Moon_Conjunction': "Your ego and emotions are aligned, giving you a focused and singular approach to life.",
  'Sun_Moon_Opposition': "You may feel pulled between your outer goals and your inner needs, seeking balance.",
  'Sun_Moon_Square': "Internal tension between what you want and what you need drives you to achieve great things.",
  'Sun_Moon_Trine': "A natural harmony exists between your conscious will and your emotional habits.",
};

// Fallback Generator
export function getInterpretation(planet: string, sign: string, house: number): { signText: string, houseText: string } {
  const signKey = `${planet}_${sign}`;
  const houseKey = `${planet}_${house}`;

  return {
    signText: PLANET_IN_SIGN[signKey] || `${planet} in ${sign} adds a specific flavor to your ${planet === 'Sun' ? 'core identity' : planet === 'Moon' ? 'emotional world' : 'life'}.`,
    houseText: PLANET_IN_HOUSE[houseKey] || `${planet} in the ${house}${getOrdinal(house)} House focuses this energy into the area of life related to ${getHouseKeywords(house)}.`
  };
}

function getOrdinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

function getHouseKeywords(h: number) {
  const k = [
    "self and identity", "values and possessions", "communication and learning", "home and roots",
    "creativity and romance", "daily work and health", "partnerships and marriage", "transformation and shared resources",
    "philosophy and travel", "career and reputation", "community and hopes", "spirituality and the subconscious"
  ];
  return k[h-1] || "life";
}
