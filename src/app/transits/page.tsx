'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { calculateChart } from '@/lib/astrology';
import { NatalWheel } from '@/components/astro/NatalWheel';
import { PlanetGlyph } from '@/components/astro/PlanetGlyph';
import {
  FontAwesomeIcon,
  faRotateRight,
  faCircleCheck,
  faInfoCircle,
  faSun
} from '@/components/ui/Icons';

interface MoonPhase {
  name: string;
  type: string;
}

function getMoonPhase(sunDeg: number, moonDeg: number): MoonPhase {
  let diff = moonDeg - sunDeg;
  if (diff < 0) diff += 360;

  if (diff < 22.5) return { name: "New Moon", type: 'new' };
  if (diff < 67.5) return { name: "Waxing Crescent", type: 'waxing-crescent' };
  if (diff < 112.5) return { name: "First Quarter", type: 'first-quarter' };
  if (diff < 157.5) return { name: "Waxing Gibbous", type: 'waxing-gibbous' };
  if (diff < 202.5) return { name: "Full Moon", type: 'full' };
  if (diff < 247.5) return { name: "Waning Gibbous", type: 'waning-gibbous' };
  if (diff < 292.5) return { name: "Last Quarter", type: 'last-quarter' };
  if (diff < 337.5) return { name: "Waning Crescent", type: 'waning-crescent' };
  return { name: "New Moon", type: 'new' };
}

const MoonVisual = ({ type }: { type: string }) => {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
      <circle cx="50" cy="50" r="48" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      {type === 'waxing-crescent' && <path d="M 50 2 A 48 48 0 0 1 50 98 A 40 48 0 0 0 50 2" fill="#e2e8f0" />}
      {type === 'first-quarter' && <path d="M 50 2 A 48 48 0 0 1 50 98 Z" fill="#e2e8f0" />}
      {type === 'waxing-gibbous' && <path d="M 50 2 A 48 48 0 0 1 50 98 A 40 48 0 0 1 50 2" fill="#e2e8f0" />}
      {type === 'full' && <circle cx="50" cy="50" r="48" fill="#e2e8f0" />}
      {type === 'waning-gibbous' && <path d="M 50 2 A 48 48 0 0 0 50 98 A 40 48 0 0 0 50 2" fill="#e2e8f0" />}
      {type === 'last-quarter' && <path d="M 50 2 A 48 48 0 0 0 50 98 Z" fill="#e2e8f0" />}
      {type === 'waning-crescent' && <path d="M 50 2 A 48 48 0 0 0 50 98 A 40 48 0 0 1 50 2" fill="#e2e8f0" />}
    </svg>
  );
};

function checkRetrogrades(baseData: any): string[] {
  const retrogrades: string[] = [];
  const nowChart = calculateChart(baseData);
  
  const currentDateObj = new Date(baseData.year, baseData.month - 1, baseData.day, baseData.hour, baseData.minute);
  const pastDateObj = new Date(currentDateObj);
  pastDateObj.setHours(pastDateObj.getHours() - 24); 

  const pastData = { 
    year: pastDateObj.getFullYear(),
    month: pastDateObj.getMonth() + 1,
    day: pastDateObj.getDate(),
    hour: pastDateObj.getHours(),
    minute: pastDateObj.getMinutes(),
    latitude: baseData.latitude,
    longitude: baseData.longitude,
    timezone: baseData.timezone
  };

  const pastChart = calculateChart(pastData);

  const majorBodies = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];

  majorBodies.forEach(name => {
    const currentPlanet = nowChart.planets.find((p: any) => p.name === name);
    const pastPlanet = pastChart.planets.find((p: any) => p.name === name);

    if (currentPlanet && pastPlanet) {
      let diff = currentPlanet.absoluteDegree - pastPlanet.absoluteDegree;
      if (diff < -180) diff += 360;
      if (diff > 180) diff -= 360;

      if (diff < 0) {
        retrogrades.push(name);
      }
    }
  });

  return retrogrades;
}

export default function TransitsPage() {
  const [chartData, setChartData] = useState<any>(null);
  const [moonPhase, setMoonPhase] = useState<MoonPhase>({ name: "Loading...", type: "new" });
  const [retrogrades, setRetrogrades] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const now = new Date();
    
    const birthData = {
      year: now.getUTCFullYear(), 
      month: now.getUTCMonth() + 1, 
      day: now.getUTCDate(),
      hour: now.getUTCHours(), 
      minute: now.getUTCMinutes(), 
      latitude: 0, 
      longitude: 0
    };

    const calculatedChart = calculateChart(birthData);
    setChartData(calculatedChart);
    
    setMoonPhase(getMoonPhase(calculatedChart.sun.absoluteDegree, calculatedChart.moon.absoluteDegree));
    setRetrogrades(checkRetrogrades(birthData));
  }, []);

  if (!mounted || !chartData) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
         <FontAwesomeIcon icon={faRotateRight} className="w-8 h-8 text-[#7B1123] animate-spin" />
      </div>
    );
  }

  const keyPlanets = chartData.planets.filter((p: any) => ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars'].includes(p.name));
  const outerPlanets = chartData.planets.filter((p: any) => !['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Asc', 'MC', 'Chiron', 'North Node'].includes(p.name));

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pt-28 pb-24 font-sans">
      
      {/* BREADCRUMB */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-8">
          <Link href="/" className="hover:text-stone-900 transition">Home</Link>
          <span>/</span>
          <Link href="/astrology" className="hover:text-stone-900 transition">Astrology</Link>
          <span>/</span>
          <span className="text-[#7B1123] font-bold">Daily Sky Transits</span>
        </nav>
      </div>

      {/* HEADER */}
      <header className="text-center px-4 sm:px-6 max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#7B1123]/10 text-[#7B1123] text-xs font-bold mb-4 border border-[#7B1123]/20">
          <FontAwesomeIcon icon={faSun} className="w-3.5 h-3.5" />
          <span>Real-Time Astronomical Ephemeris</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 mb-3">
          Daily <span className="text-[#7B1123]">Cosmic Weather</span>
        </h1>
        <p className="text-sm sm:text-base text-stone-600">
          Current planetary sky positions, lunar phases, and retrograde status calculated for Universal Time.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP ROW: MOON & RETROGRADES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* MOON WIDGET */}
          <div className="bg-white border border-stone-200 rounded-2xl p-8 flex items-center justify-between shadow-sm relative overflow-hidden">
             <div>
                <div className="text-xs font-bold text-[#7B1123] uppercase tracking-widest mb-2">Current Lunar Phase</div>
                <h3 className="text-3xl font-serif font-bold text-stone-900 mb-2">{moonPhase.name}</h3>
                <p className="text-xs text-stone-600 max-w-[220px] leading-relaxed">
                  {moonPhase.type.includes('waxing') ? 'Energy is building. Ideal for taking bold action.' : 
                   moonPhase.type.includes('waning') ? 'Energy is fading. Favorable for release and rest.' :
                   moonPhase.type === 'full' ? 'Peak illumination. High emotion and realization.' : 
                   'Low light. Set clear intentions for the cycle ahead.'}
                </p>
             </div>
             
             <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0">
                <MoonVisual type={moonPhase.type} />
             </div>
          </div>

          {/* Retrograde Monitor */}
          <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
             <div className="flex items-center justify-between mb-6">
               <div className="text-xs font-bold text-[#7B1123] uppercase tracking-widest">Retrograde Monitor</div>
               <span className="text-xs font-mono text-stone-400">{new Date().toLocaleDateString()}</span>
             </div>
             
             {retrogrades.length === 0 ? (
               <div className="flex items-center gap-3 text-emerald-700">
                  <FontAwesomeIcon icon={faCircleCheck} className="w-5 h-5" />
                  <span className="font-serif font-bold text-base">All major planets are currently Direct.</span>
               </div>
             ) : (
               <div className="space-y-3">
                 <p className="text-xs text-stone-600 mb-2">The following planets are in apparent retrograde motion:</p>
                 <div className="flex flex-wrap gap-2">
                    {retrogrades.map(name => (
                      <span key={name} className="flex items-center gap-2 px-3 py-1.5 bg-[#7B1123]/10 rounded-lg border border-[#7B1123]/20 text-[#7B1123] text-xs font-bold">
                        <FontAwesomeIcon icon={faInfoCircle} className="w-3 h-3" />
                        <span>{name} (Rx)</span>
                      </span>
                    ))}
                 </div>
               </div>
             )}
          </div>
        </div>

        {/* MIDDLE ROW: LIVE CHART & PLANETS LIST */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
           
           {/* Live Wheel */}
           <div className="lg:col-span-5 flex flex-col items-center bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="p-2 mb-2">
                 <NatalWheel planets={chartData.planets} aspects={chartData.aspects} />
              </div>
              <p className="text-xs text-stone-500 mt-2">Current Sky Wheel (Universal Time)</p>
           </div>

           {/* Planets List */}
           <div className="lg:col-span-7 space-y-8">
              
              {/* Personal Planets */}
              <div>
                 <h3 className="font-serif font-bold text-xl text-stone-900 mb-4 border-b border-stone-200 pb-2">Personal Planets</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {keyPlanets.map((p: any) => (
                      <div key={p.name} className="flex items-center justify-between bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
                         <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-[#7B1123]/10 flex items-center justify-center">
                               <PlanetGlyph name={p.name} className="w-5 h-5 text-[#7B1123]" />
                            </div>
                            <span className="font-serif font-bold text-sm text-stone-900">{p.name}</span>
                         </div>
                         <div className="text-right">
                            <div className="text-[#7B1123] font-serif font-bold text-sm">{p.sign}</div>
                            <div className="text-[10px] text-stone-500">{p.degree.toFixed(1)}°</div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Outer Planets */}
              <div>
                 <h3 className="font-serif font-bold text-xl text-stone-900 mb-4 border-b border-stone-200 pb-2">Outer Planets</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {outerPlanets.map((p: any) => (
                      <div key={p.name} className="bg-white p-3.5 rounded-xl border border-stone-200 text-xs flex items-center justify-between gap-2 shadow-sm">
                         <div className="flex items-center gap-2">
                            <PlanetGlyph name={p.name} className="w-4 h-4 text-stone-400" />
                            <span className="text-stone-700 font-medium">{p.name}</span>
                         </div>
                         <div className="flex items-center gap-1.5">
                            {retrogrades.includes(p.name) && <span className="text-[10px] text-[#7B1123] font-bold">Rx</span>}
                            <div className="font-serif font-bold text-stone-900">{p.sign}</div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

           </div>
        </div>

      </main>
    </div>
  );
}