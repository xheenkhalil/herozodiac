'use client';

import { useState, useEffect } from 'react';
import { calculateChart } from '@/lib/astrology';
import { NatalWheel } from '@/components/astro/NatalWheel';
import { PlanetGlyph } from '@/components/astro/PlanetGlyph';
import { AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';

// Note: Revalidate export is not supported in Client Components, moving to layout or ignoring (since it's live).
// export const revalidate = 3600; 

// --- 1. REFINED PHASE LOGIC ---
function getMoonPhase(sunDeg: number, moonDeg: number) {
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

// --- 2. NEW COMPONENT: DYNAMIC MOON VISUAL ---
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

// --- HELPER 3: RETROGRADE CHECKER ---
function checkRetrogrades(baseData: any): string[] {
  const retrogrades: string[] = [];
  const now = calculateChart(baseData);
  
  const oneHourAgo = new Date();
  oneHourAgo.setHours(oneHourAgo.getHours() - 1);
  const pastData = { ...baseData, hour: oneHourAgo.getHours() };
  const past = calculateChart(pastData);

  now.planets.forEach(p => {
    if (['Sun', 'Moon', 'Asc', 'MC'].includes(p.name)) return;
    const pPast = past.planets.find(pp => pp.name === p.name);
    if (!pPast) return;

    let diff = p.absoluteDegree - pPast.absoluteDegree;
    if (diff < -300) diff += 360; 
    if (diff > 300) diff -= 360;

    if (diff < 0) retrogrades.push(p.name);
  });
  return retrogrades;
}

export default function TransitsPage() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    // Optional: Update every minute for "Live" feel? 
    // For now, just fix hydration by setting state once mounted.
    // Actually, to avoid hydration mismatch, we render null or a loader until mounted, 
    // OR we use a fixed seed initial state if possible?
    // "Now" changes, so we must wait for mount.
    setNow(new Date());
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center">
         <Loader2 className="w-8 h-8 text-gold-500 animate-spin" />
      </div>
    );
  }

  // Calculation happens only on client after mount
  const birthData = {
    year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate(),
    hour: now.getHours(), minute: now.getMinutes(), latitude: 0, longitude: 0
  };

  const chart = calculateChart(birthData);
  const moonPhase = getMoonPhase(chart.sun.absoluteDegree, chart.moon.absoluteDegree);
  const retrogrades = checkRetrogrades(birthData);

  const keyPlanets = chart.planets.filter(p => ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars'].includes(p.name));
  const outerPlanets = chart.planets.filter(p => !['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Asc', 'MC', 'Chiron', 'North Node'].includes(p.name));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <header className="py-20 text-center px-6 border-b border-white/5 bg-slate-900/50">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
          Daily <span className="text-gold-500">Cosmic Weather</span>
        </h1>
        <p className="text-slate-400">Current planetary positions and retrograde status.</p>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* UPDATED MOON WIDGET */}
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 flex items-center justify-between relative overflow-hidden group">
             {/* Glow effect based on fullness */}
             <div className={`absolute inset-0 bg-blue-500/5 transition duration-700 ${moonPhase.type === 'full' ? 'opacity-100' : 'opacity-20'}`} />
             
             <div>
                <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Current Phase</div>
                <h3 className="text-3xl font-serif font-bold text-white mb-2">{moonPhase.name}</h3>
                <p className="text-sm text-slate-400 max-w-[200px]">
                  {moonPhase.type.includes('waxing') ? 'Energy is building. Good for taking action.' : 
                   moonPhase.type.includes('waning') ? 'Energy is fading. Good for release and rest.' :
                   moonPhase.type === 'full' ? 'Peak energy. High emotion and realization.' : 
                   'Low energy. Set intentions for the cycle ahead.'}
                </p>
             </div>
             
             <div className="w-24 h-24 shrink-0">
                {/* THIS IS THE NEW DYNAMIC VISUAL */}
                <MoonVisual type={moonPhase.type} />
             </div>
          </div>

          {/* Retrograde Monitor (Unchanged) */}
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-8">
             <div className="flex items-center justify-between mb-6">
               <div className="text-xs font-bold text-red-400 uppercase tracking-widest">Retrograde Monitor</div>
               <span className="text-xs font-mono text-slate-500">{new Date().toLocaleDateString()}</span>
             </div>
             {retrogrades.length === 0 ? (
               <div className="flex items-center gap-3 text-green-400">
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-bold">All major planets are Direct.</span>
               </div>
             ) : (
               <div className="space-y-3">
                 <p className="text-sm text-slate-400 mb-2">Caution advised. The following planets are currently retrograde:</p>
                 <div className="flex flex-wrap gap-2">
                    {retrogrades.map(name => (
                      <span key={name} className="flex items-center gap-2 px-3 py-2 bg-slate-950 rounded-lg border border-red-500/20 text-red-200 text-sm font-bold">
                        <AlertTriangle className="w-3 h-3" /> {name}
                      </span>
                    ))}
                 </div>
               </div>
             )}
          </div>
        </div>

        {/* Live Wheel & Tables (Unchanged) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           <div className="lg:col-span-5 flex flex-col items-center">
              <div className="bg-white/5 rounded-full p-4 mb-4">
                 <NatalWheel planets={chart.planets} aspects={chart.aspects} />
              </div>
              <p className="text-xs text-slate-500 mt-4">Chart calculated for UTC (Universal Time)</p>
           </div>

           <div className="lg:col-span-7 space-y-8">
              <div>
                 <h3 className="font-serif font-bold text-xl text-white mb-4 border-b border-white/10 pb-2">Personal Planets</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {keyPlanets.map((p) => (
                      <div key={p.name} className="flex items-center justify-between bg-slate-900/50 p-4 rounded-xl border border-white/5">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-white/5">
                               <PlanetGlyph name={p.name} className="w-5 h-5 text-gold-400" />
                            </div>
                            <span className="font-bold text-slate-200">{p.name}</span>
                         </div>
                         <div className="text-right">
                            <div className="text-maroon-400 font-serif font-medium">{p.sign}</div>
                            <div className="text-[10px] text-slate-500">{p.degree.toFixed(1)}°</div>
                         </div>
                       </div>
                    ))}
                 </div>
              </div>
              <div>
                 <h3 className="font-serif font-bold text-xl text-white mb-4 border-b border-white/10 pb-2">Outer Planets</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {outerPlanets.map((p) => (
                      <div key={p.name} className="bg-slate-900/30 p-3 rounded-lg border border-white/5 text-sm flex items-center justify-between gap-2">
                         <div className="flex items-center gap-2">
                            <PlanetGlyph name={p.name} className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-400">{p.name}</span>
                         </div>
                         <div className="flex items-center gap-2">
                            {retrogrades.includes(p.name) && <span className="text-[10px] text-red-400 font-bold">Rx</span>}
                            <div className="font-bold text-white">{p.sign}</div>
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