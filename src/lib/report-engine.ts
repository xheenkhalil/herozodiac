import { ChartResult, PlanetPosition, Aspect } from './astrology';
import { getInterpretation, ASPECT_MEANINGS } from '@/data/interpretations';

export interface ReportSection {
  title: string;
  content: string;
  type: 'intro' | 'big-three' | 'planet' | 'aspect';
  planet?: string; // For grouping
}

export interface FullReport {
  summary: string;
  sections: ReportSection[];
}

export class ReportEngine {
  /*
    Generates a full textual report from the chart data.
  */
  static generate(chart: ChartResult): FullReport {
    const sections: ReportSection[] = [];

    // 1. INTRODUCTION
    sections.push({
      title: "Introduction",
      content: `Your natal chart is a map of the sky at the exact moment you were born. It reveals the unique energetic blueprint that influences your personality, potential, and life path.`,
      type: 'intro'
    });

    // 2. THE BIG THREE (Sun, Moon, Ascendant)
    const bigThree = [chart.sun, chart.moon, chart.rising];
    bigThree.forEach(p => {
       const { signText, houseText } = getInterpretation(p.name === 'Asc' ? 'Sun' : p.name, p.sign, p.house); 
       // Note: Ascendant strictly uses Sign text usually, house is always 1.
       // Re-using Sun text for Ascendant fallback for now if specific Asc text missing.
       
       let text = signText;
       if (p.name !== 'Asc') text += ` ${houseText}`;

       sections.push({
         title: `${p.name} in ${p.sign}`,
         content: text,
         type: 'big-three',
         planet: p.name
       });
    });

    // 3. PLANETS IN SIGNS & HOUSES
    // Filter out Sun/Moon to avoid duplication? Or Include detailed analysis?
    // Let's include all main planets.
    const details = chart.planets.filter(p => !['Asc', 'MC', 'North Node', 'Chiron'].includes(p.name));
    
    details.forEach(p => {
       // Skip if already covered in Big Three? Maybe keep distinct sections.
       if (['Sun', 'Moon'].includes(p.name)) return;

       const { signText, houseText } = getInterpretation(p.name, p.sign, p.house);
       sections.push({
          title: `${p.name} in ${p.sign}`,
          content: `${signText} ${houseText}`,
          type: 'planet',
          planet: p.name
       });
    });

    // 4. ASPECTS
    // Sort by orb strength?
    const majorAspects = chart.aspects.filter(a => ['Conjunction', 'Opposition', 'Square', 'Trine'].includes(a.type));
    
    majorAspects.forEach(a => {
       const key1 = `${a.planet1}_${a.planet2}_${a.type}`;
       const key2 = `${a.planet2}_${a.planet1}_${a.type}`; // Aspect order can vary
       
       const text = ASPECT_MEANINGS[key1] || ASPECT_MEANINGS[key2] || 
         `${a.planet1} ${a.type} ${a.planet2} represents a dynamic interaction between these two energies.`;

       sections.push({
          title: `${a.planet1} ${a.type} ${a.planet2}`,
          content: text,
          type: 'aspect'
       });
    });

    return {
      summary: `A chart driven by ${chart.sun.sign} vitality and ${chart.moon.sign} emotional needs.`,
      sections
    };
  }
}
