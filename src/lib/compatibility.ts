import { calculateChart, BirthData, PlanetPosition, Aspect } from './astrology';

export interface CompatibilityResult {
  score: number; 
  verdict: string; 
  details: {
    category: string;
    score: number;
    description: string;
  }[];
  aspects: Aspect[]; 
}

// Weights for different connections
const SCORING = {
  SunSun: { weight: 15, label: "Core Identity" },
  MoonMoon: { weight: 20, label: "Emotional Safety" }, 
  MercuryMercury: { weight: 10, label: "Communication" },
  VenusMars: { weight: 25, label: "Physical Chemistry" }, 
  AscDesc: { weight: 30, label: "Soulmate Potential" },
};

function getAspectScore(angle: number): number {
  if (Math.abs(angle - 0) < 8) return 10; 
  if (Math.abs(angle - 120) < 8) return 10; 
  if (Math.abs(angle - 60) < 6) return 6; 
  if (Math.abs(angle - 180) < 8) return -5; 
  if (Math.abs(angle - 90) < 8) return -8; 
  return 0;
}

function getAngularDistance(deg1: number, deg2: number) {
  let diff = Math.abs(deg1 - deg2);
  if (diff > 180) diff = 360 - diff;
  return diff;
}

export function calculateSynastry(p1Data: BirthData, p2Data: BirthData): CompatibilityResult {
  const chart1 = calculateChart(p1Data);
  const chart2 = calculateChart(p2Data);

  let totalScore = 50; // Start neutral
  const details = [];
  const aspects: Aspect[] = [];

  // 1. SUN CONNECTION (Ego)
  const sunDiff = getAngularDistance(chart1.sun.absoluteDegree, chart2.sun.absoluteDegree);
  const sunScore = getAspectScore(sunDiff);
  totalScore += sunScore;
  details.push({
    category: "Ego Match",
    score: 50 + (sunScore * 5),
    description: sunScore > 0 ? "Your core personalities flow easily together." : "You have distinct styles that may clash without compromise."
  });

  // 2. MOON CONNECTION (Emotions)
  const moonDiff = getAngularDistance(chart1.moon.absoluteDegree, chart2.moon.absoluteDegree);
  const moonScore = getAspectScore(moonDiff);
  totalScore += moonScore * 1.5; // Moons matter more
  details.push({
    category: "Emotional Safety",
    score: 50 + (moonScore * 5),
    description: moonScore > 0 ? "You intuitively understand each other's feelings." : "Emotional misunderstandings are likely; patience is required."
  });

  // 3. VENUS/MARS (Chemistry)
  // Check P1 Venus vs P2 Mars AND P2 Venus vs P1 Mars
  const vm1 = getAngularDistance(chart1.planets.find(p=>p.name==='Venus')!.absoluteDegree, chart2.planets.find(p=>p.name==='Mars')!.absoluteDegree);
  const vm2 = getAngularDistance(chart2.planets.find(p=>p.name==='Venus')!.absoluteDegree, chart1.planets.find(p=>p.name==='Mars')!.absoluteDegree);
  const chemistryScore = getAspectScore(vm1) + getAspectScore(vm2);
  totalScore += chemistryScore;
  details.push({
    category: "Sexual Chemistry",
    score: 50 + (chemistryScore * 5),
    description: chemistryScore > 5 ? "Magnetic, intense physical attraction." : "A slower burn; friendship may come first."
  });

  // Clamp Score 0-100
  totalScore = Math.min(100, Math.max(0, totalScore));

  let verdict = "Complex Connection";
  if (totalScore > 85) verdict = "Cosmic Soulmates";
  else if (totalScore > 70) verdict = "Excellent Match";
  else if (totalScore > 50) verdict = "Good Potential";
  else if (totalScore > 30) verdict = "Challenging";
  else verdict = "Karmic Lesson";

  return {
    score: Math.round(totalScore),
    verdict,
    details,
    aspects // We could fill this with specific inter-aspects later
  };
}