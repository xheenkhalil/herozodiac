// src/lib/horoscope-engine.ts
import { calculateChart } from './astrology';
import { HOUSE_THEMES, ZODIAC_SIGNS } from './horoscope-content';

export function getDailyHoroscopes() {
  // 1. Get Current Moon Position
  const now = new Date();
  const chart = calculateChart({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
    hour: now.getHours(),
    minute: now.getMinutes(),
    latitude: 0, longitude: 0
  });

  // e.g. "Taurus"
  const moonSign = chart.moon.sign;
  const moonSignIndex = ZODIAC_SIGNS.indexOf(moonSign);

  // 2. Generate Horoscope for all 12 Signs
  return ZODIAC_SIGNS.map((userSign, userIndex) => {
    // Calculate the "Solar House"
    // Logic: If I am Aries (0) and Moon is Taurus (1), diff is 1. That's 2nd House.
    // If I am Pisces (11) and Moon is Aries (0), diff is 1. That's 2nd House.
    
    let houseDiff = moonSignIndex - userIndex;
    if (houseDiff < 0) houseDiff += 12;
    
    // House is 1-based (0 index = 1st house)
    const houseNumber = houseDiff + 1; 
    
    // @ts-ignore
    const content = HOUSE_THEMES[houseNumber];

    return {
      sign: userSign,
      house: houseNumber,
      theme: content.title,
      prediction: content.advice,
      currentMoon: moonSign
    };
  });
}