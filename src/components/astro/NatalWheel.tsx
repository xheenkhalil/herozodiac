'use client';

import { useState } from 'react';
import { PlanetPosition, Aspect } from '@/lib/astrology';
import { Download, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface NatalWheelProps {
  planets: PlanetPosition[];
  aspects: Aspect[];
  cusps?: number[]; // Optional prop for Placidus cusps (if available from props, calculateChart logic provides 'houses' which are cusps)
}

export function NatalWheel({ planets, aspects, cusps }: NatalWheelProps) {
  const [showLegend, setShowLegend] = useState(false);

  // Dimensions
  const size = 500;
  const center = 250;
  
  // Radial Settings
  const radius = 180;        
  const zodiacDepth = 30;    
  const houseRingR = 140;    
  const planetR = 115;       

  // FIXED HOUSE GRID LOGIC
  // Requirement: House 1 (Ascendant Cusp) is ALWAYS at 9 o'clock (Left, 180 deg).
  // The Zodiac Ring rotates to match this.
  
  // 1. Find Ascendant Degree
  const asc = planets.find(p => p.name === 'Asc')?.absoluteDegree || 0;
  
  // 2. Determine "Chart Rotation"
  // We want Ascendant (Degree X) to appear at SVG Angle 180.
  // Standard CCW Plotting: Angle = CHART_OFFSET - Degree.
  // 180 = CHART_OFFSET - AscDegree
  // CHART_OFFSET = 180 + AscDegree.
  const CHART_OFFSET = 180 + asc;
  
  // 3. House Cusps (Visualization)
  // If we have dynamic cusps (Placidus), we plot lines at their degrees.
  // If "Fixed Grid", House 1 Cusp (Asc) is at 180 visual.
  // House 2 Cusp (say Asc + 30) is at CHART_OFFSET - (Asc+30) = (180+Asc) - (Asc+30) = 150.
  // This means House 1 spans 180 -> 150 (CCW sector from 9 to 8 o'clock).
  // This is correct standard visualization.
  
  const houseCusps = cusps || Array.from({length: 12}, (_, i) => (asc + i * 30) % 360);

  const getCoords = (degree: number, r: number) => {
    // CCW Formula with Fixed Grid Offset
    const rad = ((CHART_OFFSET - degree) * Math.PI) / 180; 
    return {
      x: center + r * Math.cos(rad),
      y: center + r * Math.sin(rad),
    };
  };

  const ZODIAC_SIGNS = [
    'ARIES', 'TAURUS', 'GEMINI', 'CANCER', 
    'LEO', 'VIRGO', 'LIBRA', 'SCORPIO', 
    'SAGITTARIUS', 'CAPRICORN', 'AQUARIUS', 'PISCES'
  ];

  const PLANET_GLYPHS: Record<string, string> = {
    'Sun': '☉', 'Moon': '☽', 'Mercury': '☿', 'Venus': '♀', 'Mars': '♂',
    'Jupiter': '♃', 'Saturn': '♄', 'Uranus': '♅', 'Neptune': '♆', 'Pluto': '♇',
    'Asc': 'ASC', 'Ascendant': 'ASC', 'MC': 'MC', 'Chiron': '⚷', 'North Node': '☊'
  };

  const ASPECT_COLORS: Record<string, string> = {
     'Square': '#ef4444',      // Red
     'Trine': '#22c5e0',       // Green
     'Opposition': '#3b82f6',  // Blue
     'Sextile': '#a855f7',     // Purple
     'Quincunx': '#eab308',    // Yellow
     'Conjunction': '#f59e0b', // Gold
     'Semi-sextile': '#94a3b8', 
     'Quintile': '#14b8a6',    
     'Bi-Quintile': '#14b8a6',
     'Sesquiquadrate': '#f43f5e',
     'Semi-square': '#f43f5e',
     'Septile': '#8b5cf6',
     'Novile': '#8b5cf6'
  };

  // Helper: circular arc path (CCW logic)
  const createArc = (startDeg: number, endDeg: number, innerR: number, outerR: number) => {
    // In our CHART_OFFSET logic:
    // Visual Start Angle = CHART_OFFSET - startDeg
    // Visual End Angle = CHART_OFFSET - endDeg
    // Since SVG Y is down, increasing angle goes CW visually.
    // CHART_OFFSET - start -> CHART_OFFSET - end. 
    // Example: Start=0, End=30. Asc=0 (CHART_OFFSET=180).
    // Angle1 = 180. Angle2 = 150.
    // Path moves 180 -> 150. This is "Backwards" in standard SVG angles? 
    // 180 is Left. 150 is "Up/Left"? No. 
    // 0=Right, 90=Down, 180=Left. 
    // 150 is "Left-Down" (Lower Left quadrant).
    // So 180 -> 150 is valid arc.
    
    // BUT ZODIAC band logic:
    // StartDeg is smaller (e.g. 0). EndDeg is larger (30).
    // We want to fill the wedge from 0 to 30.
    // So we draw arc from Angle(0) to Angle(30).
    
    const startRad = ((CHART_OFFSET - startDeg) * Math.PI) / 180;
    const endRad = ((CHART_OFFSET - endDeg) * Math.PI) / 180;

    const x1 = center + outerR * Math.cos(startRad);
    const y1 = center + outerR * Math.sin(startRad);
    const x2 = center + outerR * Math.cos(endRad);
    const y2 = center + outerR * Math.sin(endRad);

    const x3 = center + innerR * Math.cos(endRad);
    const y3 = center + innerR * Math.sin(endRad);
    const x4 = center + innerR * Math.cos(startRad);
    const y4 = center + innerR * Math.sin(startRad);

    // From 0 deg to 30 deg (Aries). 
    // Visual: 180 -> 150.
    // SVG Sweep flag: 0 (Counter-Clockwise relative to center? No, 180->150 is CW visual? No.)
    // SVG Angle increases CW. 180 -> 150 is decreasing angle => Counter-Clockwise.
    // So sweep flag 0 seems correct for "CCW" arc?
    // Actually, usually easier to test. Defaulting to 0.
    return `M ${x1} ${y1} A ${outerR} ${outerR} 0 0 0 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 0 1 ${x4} ${y4} Z`;
  };

  const handleDownload = async () => {
    try {
        const { default: html2canvas } = await import('html2canvas');
        const element = document.querySelector('.natal-wheel-container') as HTMLElement;
        if (!element) return;
        
        // Temporarily hide toolbar for capture if data-ignore doesn't catch everything
        // But data-html2canvas-ignore should work.
        
        const canvas = await html2canvas(element, { 
            backgroundColor: '#020617', 
            scale: 2,
            logging: false,
            ignoreElements: (element) => element.hasAttribute('data-html2canvas-ignore') 
        });
        
        const link = document.createElement('a');
        link.download = 'my-natal-chart.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        toast.success("Chart Image downloaded");
    } catch (e) { 
        console.error(e);
        toast.error("Error saving image"); 
    }
  };

  return (
    <div className="natal-wheel-container relative w-full aspect-square max-w-[600px] mx-auto group" style={{ color: '#ffffff' }}>
      
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full font-serif rounded-full shadow-2xl border" style={{ backgroundColor: '#020617', borderColor: '#1e293b' }}>
        
        {/* 1. OUTER ZODIAC RING (Rotates relative to Fixed Axis) */}
        {ZODIAC_SIGNS.map((sign, i) => {
           const start = i * 30; // 0 Aries
           const end = (i + 1) * 30; 
           const isOdd = i % 2 !== 0; 
           
           return (
             <g key={sign}>
               <path 
                 d={createArc(start, end, radius - zodiacDepth, radius)} 
                 fill={isOdd ? '#1e293b' : '#334155'} 
                 stroke="#0f172a" 
                 strokeWidth="1"
               />
               
               {/* Label */}
               {(() => {
                 const mid = start + 15;
                 const textCoords = getCoords(mid, radius - zodiacDepth / 2);
                 const angleInDeg = CHART_OFFSET - mid;
                 // Keep text readable: Tangent logic
                 // If at Left (180), text horizontal (0). 180 -180 = 0?
                 // ChartOffset=180. Mid=0 (Aries). Angle=180.
                 // We want this text vertical (-90) or Horizontal (0)?
                 // Usually radial label or tangential. Tangential is nicer.
                 // At left (Angle 180), Tangent is vertical? No, circle edge is vertical. 
                 // We want text to follow curve.
                 // Let's use Angle + 90? 180+90 = 270.
                 return (
                    <text 
                      x={textCoords.x} 
                      y={textCoords.y} 
                      dy="3"
                      textAnchor="middle"
                      fill="#e2e8f0"
                      fontSize="9" 
                      fontWeight="bold"
                      className="tracking-widest uppercase font-sans"
                      transform={`rotate(${angleInDeg + 90}, ${textCoords.x}, ${textCoords.y})`}
                    >
                      {sign}
                    </text>
                 );
               })()}
             </g>
           );
        })}

        {/* 2. INNER HOUSE RING (Variable Wedges) */}
        {/* We draw wedges based on houseCusps prop */}
        <circle cx={center} cy={center} r={houseRingR} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        
        {houseCusps.map((cuspDeg, i) => {
           // Line for Cusp i (Start of House i+1)
           // e.g. Cusp 0 is House 1 Start.
           const coords = getCoords(cuspDeg, houseRingR);
           const outer = getCoords(cuspDeg, radius - zodiacDepth);
           return <line key={`line-${i}`} x1={center} y1={center} x2={outer.x} y2={outer.y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />;
        })}
        
        {/* House Numbers (Centered in Wedges) */}
        {houseCusps.map((cusp, i) => {
           const nextCusp = houseCusps[(i + 1) % 12];
           let mid = (cusp + nextCusp) / 2;
           if (nextCusp < cusp) mid = (cusp + nextCusp + 360) / 2; // Handle wrap
           
           const numCoords = getCoords(mid, houseRingR - 15);
           return (
             <text 
                key={`num-${i}`} 
                x={numCoords.x} y={numCoords.y} 
                dy="3" textAnchor="middle" 
                fill="rgba(255,255,255,0.4)" fontSize="8" fontWeight="bold"
             >
               {i + 1}
             </text>
           );
        })}

        {/* 3. ASPECT LINES (ALL) */}
        {aspects.map((aspect, i) => {
          const p1 = planets.find(p => p.name === aspect.planet1);
          const p2 = planets.find(p => p.name === aspect.planet2);
          if (!p1 || !p2) return null;

          const c1 = getCoords(p1.absoluteDegree, planetR - 10);
          const c2 = getCoords(p2.absoluteDegree, planetR - 10);
          
          let color = ASPECT_COLORS[aspect.type] || '#94a3b8';
          let width = '0.5';

          // Thicker lines for major aspects
          if (['Conjunction', 'Square', 'Trine', 'Opposition'].includes(aspect.type)) {
             width = '1';
          }
          
          return <line key={i} x1={c1.x} y1={c1.y} x2={c2.x} y2={c2.y} stroke={color} strokeWidth={width} opacity="0.7" />;
        })}

        {/* 4. PLANETS (Glyphs) */}
        {planets.map((planet, i) => {
          const coords = getCoords(planet.absoluteDegree, planetR);
          return (
            <g key={i}>
              <line 
                x1={getCoords(planet.absoluteDegree, radius - zodiacDepth).x} 
                y1={getCoords(planet.absoluteDegree, radius - zodiacDepth).y} 
                x2={coords.x} y2={coords.y} 
                stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" strokeDasharray="2 2" 
              />
              <text 
                x={coords.x} y={coords.y} 
                dy="4" 
                textAnchor="middle" 
                fill={['Sun', 'North Node', 'South Node', 'Asc', 'MC'].includes(planet.name) ? '#fcd34d' : '#ffffff'} 
                fontSize="14" 
                style={{ filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.8))' }}
              >
                {PLANET_GLYPHS[planet.name] || planet.name.substring(0,2)}
              </text>
            </g>
          );
        })}
      </svg>

      {/* CONTROLS (Moved below chart for better mobile UX) */}
      <div className="mt-6 flex justify-center gap-4 py-2" data-html2canvas-ignore="true">
         <div className="relative">
            <button 
              onClick={() => setShowLegend(!showLegend)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 rounded-full hover:bg-slate-700 hover:text-white transition shadow-lg border border-slate-700 text-xs font-bold uppercase tracking-wider"
              title="View Legend"
            >
               <Eye className="w-4 h-4" /> Legend
            </button>
            {showLegend && (
               <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 bg-white p-4 rounded-xl shadow-xl border border-slate-200 w-48 text-slate-800 animate-in fade-in slide-in-from-bottom-2 z-50">
                  <h4 className="border-b border-slate-100 pb-2 mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Aspect Legend</h4>
                  <div className="space-y-2 text-xs font-medium max-h-60 overflow-y-auto custom-scrollbar">
                     {Object.entries(ASPECT_COLORS).map(([name, color]) => (
                        <div key={name} className="flex items-center gap-2">
                           <span className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: color }}></span> 
                           <span>{name}</span>
                        </div>
                     ))}
                  </div>
               </div>
            )}
         </div>

         <button 
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-gold-400 rounded-full hover:bg-slate-700 hover:text-gold-300 transition shadow-lg border border-slate-700 text-xs font-bold uppercase tracking-wider"
            title="Download Chart"
         >
            <Download className="w-4 h-4" /> Save
         </button>
      </div>
    </div>
  );
}