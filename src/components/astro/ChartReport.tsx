'use client';

import { useState, useMemo } from 'react';
import { ChartResult, PlanetPosition, Aspect, getZodiacInfo } from '@/lib/astrology';
import { NatalWheel } from './NatalWheel';
import {
  FontAwesomeIcon,
  faFileLines,
  faChartPie,
  faCompass,
  faDownload,
  faStar,
  faArrowRight,
  faCircleCheck,
  faRotateRight
} from '@/components/ui/Icons';
import { PlanetGlyph } from './PlanetGlyph';
import { ZodiacGlyph } from './ZodiacGlyph';
import { ReportEngine } from '@/lib/report-engine';
import { HOUSES_METADATA, SIGN_RULERS, getHouseCuspInterpretation } from '@/data/houses-data';
import { getInterpretation } from '@/data/interpretations';

interface ChartReportProps {
  data: ChartResult;
  userProfile?: {
    name: string;
    location: string;
    date: string;
  };
  initialTab?: 'chart' | 'houses' | 'report';
}

// Helpers
const isMajorAspect = (type: string) => ['Conjunction', 'Opposition', 'Square', 'Trine', 'Sextile'].includes(type);

const AspectIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'Square':
      return (
        <svg className="w-4 h-4 text-red-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="4" width="16" height="16" rx="1.5" />
        </svg>
      );
    case 'Trine':
      return (
        <svg className="w-4 h-4 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12,3 22,21 2,21" />
        </svg>
      );
    case 'Sextile':
      return (
        <svg className="w-4 h-4 text-sky-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12,2 20,7 20,17 12,22 4,17 4,7" />
        </svg>
      );
    case 'Opposition':
      return (
        <svg className="w-4 h-4 text-rose-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="3" x2="12" y2="21" strokeWidth="2" />
          <circle cx="12" cy="5" r="2.5" fill="currentColor" />
          <circle cx="12" cy="19" r="2.5" fill="currentColor" />
        </svg>
      );
    case 'Conjunction':
      return (
        <svg className="w-4 h-4 text-amber-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="12" r="5" strokeWidth="2" />
          <circle cx="15" cy="12" r="5" strokeWidth="2" />
        </svg>
      );
    default:
      return (
        <svg className="w-4 h-4 text-stone-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="7" strokeWidth="2" />
        </svg>
      );
  }
};

const BigThreeItem = ({ label, value, degree, sign }: { label: string; value: string; degree: number; sign: string }) => (
  <div className="flex flex-col items-center text-center p-5 bg-white border border-stone-200 rounded-xl shadow-sm hover:border-[#7B1123]/30 transition group">
    <span className="text-[11px] font-bold tracking-[0.2em] text-stone-500 uppercase mb-2 group-hover:text-[#7B1123] transition flex items-center gap-1.5">
      <ZodiacGlyph sign={sign} className="w-3.5 h-3.5 text-[#7B1123]" />
      <span>{label}</span>
    </span>
    <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-1">
      {value}
    </span>
    <span className="text-xs font-mono text-stone-500">
      {degree.toFixed(2)}° in {sign}
    </span>
  </div>
);

export function ChartReport({ data, userProfile, initialTab = 'chart' }: ChartReportProps) {
  const [viewMode, setViewMode] = useState<'chart' | 'houses' | 'report'>(initialTab);
  const [selectedHouseFilter, setSelectedHouseFilter] = useState<number | 'all'>('all');
  
  const report = useMemo(() => ReportEngine.generate(data), [data]);
  const majorAspects = data.aspects.filter(a => isMajorAspect(a.type));
  const minorAspects = data.aspects.filter(a => !isMajorAspect(a.type));

  const { generatePDF, isGenerating } = usePDFGenerator(data, report, userProfile);

  // Compute 12 Houses Data
  const housesDetail = useMemo(() => {
    return HOUSES_METADATA.map((meta) => {
      const cuspDeg = data.houses[meta.number - 1] ?? ((meta.number - 1) * 30);
      const cuspInfo = getZodiacInfo(cuspDeg);
      const residentPlanets = data.planets.filter(p => p.house === meta.number);
      const cuspSign = cuspInfo.sign;
      const cuspRuler = SIGN_RULERS[cuspSign] || 'Unknown';
      const cuspInterpretation = getHouseCuspInterpretation(meta.number, cuspSign);

      // Find where the ruler planet is located in the chart
      const rulerPlanetName = cuspRuler.split(' ')[0]; // Handle 'Pluto & Mars' -> 'Pluto'
      const rulerPlacement = data.planets.find(p => p.name.toLowerCase() === rulerPlanetName.toLowerCase());

      return {
        ...meta,
        cuspDeg,
        cuspInfo,
        cuspSign,
        cuspRuler,
        rulerPlacement,
        residentPlanets,
        cuspInterpretation
      };
    });
  }, [data]);

  const filteredHouses = selectedHouseFilter === 'all' 
    ? housesDetail 
    : housesDetail.filter(h => h.number === selectedHouseFilter);

  return (
    <div className="w-full bg-stone-50 min-h-screen pb-32 animate-fade-in text-stone-900 font-sans">
      
      {/* 1. REPORT HERO: Centered Title & Overview */}
      <section className="pt-10 pb-8 text-center max-w-5xl mx-auto px-4 sm:px-6 relative">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[#7B1123]/20 bg-[#7B1123]/10 text-[#7B1123] text-xs font-bold tracking-wider uppercase mb-3">
          <FontAwesomeIcon icon={faStar} className="w-3 h-3" />
          <span>{userProfile?.name ? `Natal Chart for ${userProfile.name}` : 'Personalized Astrological Blueprint'}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 mb-3 tracking-tight">
          Your <span className="text-[#7B1123]">Cosmic Blueprint</span>
        </h1>

        {userProfile?.date && (
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto mb-8 font-sans">
            Born <strong className="text-stone-900">{userProfile.date}</strong> in <strong className="text-stone-900">{userProfile.location}</strong>. Ephemeris calculated using astronomical algorithms with Placidus quadrant houses.
          </p>
        )}
        
        {/* 3-WAY VIEW TOGGLE */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          <button 
            onClick={() => setViewMode('chart')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold tracking-wider transition cursor-pointer ${
              viewMode === 'chart' 
                ? 'bg-[#7B1123] text-white shadow-md' 
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            <FontAwesomeIcon icon={faChartPie} className="w-4 h-4" />
            <span>Interactive Wheel</span>
          </button>

          <button 
            onClick={() => setViewMode('houses')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold tracking-wider transition cursor-pointer ${
              viewMode === 'houses' 
                ? 'bg-[#7B1123] text-white shadow-md' 
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            <FontAwesomeIcon icon={faCompass} className="w-4 h-4" />
            <span>12 Astrological Houses</span>
          </button>

          <button 
            onClick={() => setViewMode('report')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold tracking-wider transition cursor-pointer ${
              viewMode === 'report' 
                ? 'bg-[#7B1123] text-white shadow-md' 
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            <FontAwesomeIcon icon={faFileLines} className="w-4 h-4" />
            <span>Full Written Report</span>
          </button>
        </div>

      </section>

      {/* ========================================================= */}
      {/* MODE 1: CHART & WHEEL VIEW */}
      {/* ========================================================= */}
      {viewMode === 'chart' && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
          
          {/* THE BIG THREE CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <BigThreeItem label="Sun Sign (Core Will)" value={data.sun.sign} degree={data.sun.degree} sign={data.sun.sign} />
            <BigThreeItem label="Moon Sign (Inner Soul)" value={data.moon.sign} degree={data.moon.degree} sign={data.moon.sign} />
            <BigThreeItem label="Rising / Ascendant" value={data.rising.sign} degree={data.rising.degree} sign={data.rising.sign} />
          </div>

          {/* THE WHEEL CONTAINER */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-10 shadow-sm text-center">
            <div className="mb-4">
              <h2 className="font-serif font-bold text-2xl text-stone-900">Geocentric Natal Wheel</h2>
              <p className="text-xs text-stone-500 mt-0.5">Fixed 1st House Ascendant Axis at 9 o&apos;clock with Placidus house sectors.</p>
            </div>
            
            <div className="relative w-full max-w-[520px] mx-auto aspect-square my-4">
              <NatalWheel planets={data.planets} aspects={data.aspects} cusps={data.houses} />
            </div>

            <div className="mt-6 pt-6 border-t border-stone-100 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-500">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span>Trine (120°)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                <span>Square (90°)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span>Conjunction (0°)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                <span>Opposition (180°)</span>
              </div>
            </div>
          </div>

          {/* JUMP BANNER TO 12 HOUSES */}
          <div className="p-6 bg-gradient-to-r from-[#7B1123]/10 via-amber-500/10 to-[#7B1123]/10 border border-[#7B1123]/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#7B1123] mb-1">
                <FontAwesomeIcon icon={faCompass} className="w-3.5 h-3.5" />
                <span>Placidus Quadrants</span>
              </div>
              <h3 className="font-serif font-bold text-xl text-stone-900">Explore Your 12 Astrological Houses</h3>
              <p className="text-xs text-stone-600 mt-0.5">Discover how your planets activate career (House 10), relationships (House 7), and hidden potential.</p>
            </div>
            <button
              onClick={() => setViewMode('houses')}
              className="px-5 py-2.5 rounded-lg bg-[#7B1123] hover:bg-[#9E1B32] text-white text-xs font-bold transition shadow-sm flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>View 12 Houses</span>
              <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
            </button>
          </div>

          {/* PLANETARY POSITIONS TABLE */}
          <section className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
              <div>
                <h3 className="font-serif font-bold text-xl text-stone-900">Planetary Positions & Placements</h3>
                <p className="text-xs text-stone-500 mt-0.5">Exact degrees and Placidus house assignments.</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-stone-100 text-stone-700">
                {data.planets.length} Points Calculated
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {data.planets.map((planet, idx) => (
                <div 
                  key={idx} 
                  className="p-3.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-white hover:border-[#7B1123]/30 transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#7B1123]/10 text-[#7B1123] flex items-center justify-center shrink-0">
                      <PlanetGlyph name={planet.name} className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-serif font-bold text-sm text-stone-900 flex items-center gap-1.5">
                        <span>{planet.name}</span>
                        {planet.retrograde && (
                          <span className="text-[10px] font-mono px-1 rounded bg-rose-100 text-rose-700 font-bold">℞</span>
                        )}
                      </div>
                      <div className="text-xs text-stone-500 flex items-center gap-1">
                        <ZodiacGlyph sign={planet.sign} className="w-3 h-3 text-[#7B1123]" />
                        <span>{planet.sign} {planet.degree.toFixed(1)}°</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedHouseFilter(planet.house);
                      setViewMode('houses');
                    }}
                    className="text-right hover:text-[#7B1123] transition cursor-pointer"
                    title={`Jump to House ${planet.house}`}
                  >
                    <div className="text-[11px] font-bold text-[#7B1123] group-hover:underline">
                      House {planet.house}
                    </div>
                    <div className="text-[10px] text-stone-400">View →</div>
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* GEOMETRIC ANGLES (ASPECTS) */}
          <section className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
              <div>
                <h3 className="font-serif font-bold text-xl text-stone-900">Geometric Angles & Aspects</h3>
                <p className="text-xs text-stone-500 mt-0.5">Energy conduits between planets that shape your psychological wiring.</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#7B1123]/10 text-[#7B1123]">
                {majorAspects.length} Major Aspects
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* MAJOR ASPECTS */}
              <div>
                <h4 className="font-serif font-bold text-sm text-stone-900 uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>Major Aspects</span>
                  <span className="text-[10px] font-normal text-stone-500">Highest Potency</span>
                </h4>
                <div className="space-y-2">
                  {majorAspects.slice(0, 10).map((aspect, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg border border-stone-100 bg-stone-50 text-xs">
                      <div className="flex items-center gap-2.5">
                        <AspectIcon type={aspect.type} />
                        <span className="font-semibold text-stone-900">{aspect.planet1}</span>
                        <span className="text-stone-400 font-serif italic">{aspect.type}</span>
                        <span className="font-semibold text-stone-900">{aspect.planet2}</span>
                      </div>
                      <span className="text-[11px] font-mono text-stone-500">orb {aspect.orb}°</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* MINOR ASPECTS */}
              <div>
                <h4 className="font-serif font-bold text-sm text-stone-900 uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>Harmonic Aspects</span>
                  <span className="text-[10px] font-normal text-stone-500">Subtle Nuances</span>
                </h4>
                <div className="space-y-2">
                  {minorAspects.slice(0, 10).map((aspect, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg border border-stone-100 bg-stone-50 text-xs">
                      <div className="flex items-center gap-2.5">
                        <AspectIcon type={aspect.type} />
                        <span className="font-medium text-stone-800">{aspect.planet1}</span>
                        <span className="text-stone-400 font-serif italic">{aspect.type}</span>
                        <span className="font-medium text-stone-800">{aspect.planet2}</span>
                      </div>
                      <span className="text-[11px] font-mono text-stone-500">orb {aspect.orb}°</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

        </div>
      )}

      {/* ========================================================= */}
      {/* MODE 2: 12 ASTROLOGICAL HOUSES EXPLORER */}
      {/* ========================================================= */}
      {viewMode === 'houses' && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
          
          {/* HOUSES HEADER & EXPLAINER */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-[#7B1123]/10 text-[#7B1123] mb-3">
                <FontAwesomeIcon icon={faCompass} className="w-3.5 h-3.5" />
                <span>The 12 Houses of Life</span>
              </div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 mb-2">
                Your 12 Astrological Houses Breakdown
              </h2>
              <p className="text-sm text-stone-600 font-sans leading-relaxed">
                While signs reveal <em>how</em> planetary energies behave, houses show <em>where</em> they manifest in your everyday life. Below is your complete Placidus house breakdown, calculated from your exact birth coordinates and time.
              </p>
            </div>

            {/* QUICK JUMP PILL BAR */}
            <div className="mt-6 pt-6 border-t border-stone-200">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
                Filter by House:
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                <button
                  onClick={() => setSelectedHouseFilter('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    selectedHouseFilter === 'all'
                      ? 'bg-[#7B1123] text-white'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  All 12 Houses
                </button>
                {HOUSES_METADATA.map((h) => (
                  <button
                    key={h.number}
                    onClick={() => setSelectedHouseFilter(h.number)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                      selectedHouseFilter === h.number
                        ? 'bg-[#7B1123] text-white'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    {h.roman} ({h.name.split(' ')[0]})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 12 HOUSES LIST */}
          <div className="space-y-6">
            {filteredHouses.map((house) => (
              <div 
                key={house.number} 
                className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm hover:border-[#7B1123]/30 transition"
              >
                {/* TOP ROW: TITLE & BADGES */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#7B1123] text-white font-serif font-bold text-base flex items-center justify-center shrink-0 shadow-sm">
                      {house.roman}
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-xl text-stone-900">
                        {house.name}
                      </h3>
                      <div className="text-xs text-stone-500 font-sans mt-0.5">
                        Traditional title: <strong className="text-stone-700">{house.latinName}</strong> • {house.focusArea}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                      house.type === 'Angular' 
                        ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                        : house.type === 'Succedent' 
                        ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                        : 'bg-sky-100 text-sky-800 border border-sky-200'
                    }`}>
                      {house.type} House
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-stone-100 text-stone-700">
                      Element: {house.element}
                    </span>
                  </div>
                </div>

                {/* 2-COLUMN HOUSE CONTENT */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">
                  
                  {/* LEFT: CUSP & GOVERNANCE */}
                  <div className="lg:col-span-5 space-y-4">
                    
                    {/* CUSP SIGN CARD */}
                    <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                      <div className="text-[11px] uppercase tracking-wider font-bold text-stone-500 mb-1.5">
                        House Cusp Sign & Degree
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#7B1123]/10 text-[#7B1123] flex items-center justify-center">
                          <ZodiacGlyph sign={house.cuspSign} className="w-5 h-5 text-[#7B1123]" />
                        </div>
                        <div>
                          <div className="font-serif font-bold text-lg text-stone-900">
                            {house.cuspInfo.degree.toFixed(2)}° {house.cuspSign}
                          </div>
                          <div className="text-xs text-stone-500">
                            Natural Ruler: <strong>{house.naturalRuler}</strong> • Cusp Ruler: <strong>{house.cuspRuler}</strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* KEYWORDS */}
                    <div>
                      <div className="text-[11px] uppercase tracking-wider font-bold text-stone-500 mb-1.5">
                        Core Life Themes
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {house.keywords.map((kw, i) => (
                          <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 font-medium">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* RIGHT: INTERPRETATIONS & RESIDENT PLANETS */}
                  <div className="lg:col-span-7 space-y-4">
                    
                    {/* SUMMARY & DOMAIN */}
                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-bold text-stone-500 mb-1">
                        Domain of the {house.roman} House
                      </h4>
                      <p className="text-sm text-stone-700 font-sans leading-relaxed">
                        {house.summary}
                      </p>
                    </div>

                    {/* CUSP INTERPRETATION */}
                    <div className="p-4 rounded-xl bg-[#7B1123]/5 border border-[#7B1123]/15">
                      <div className="text-xs font-bold text-[#7B1123] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <ZodiacGlyph sign={house.cuspSign} className="w-3.5 h-3.5 text-[#7B1123]" />
                        <span>{house.cuspSign} on the {house.roman} House Cusp</span>
                      </div>
                      <p className="text-sm text-stone-800 leading-relaxed font-sans">
                        {house.cuspInterpretation}
                      </p>
                    </div>

                    {/* RESIDENT PLANETS */}
                    <div>
                      <div className="text-xs uppercase tracking-wider font-bold text-stone-500 mb-2">
                        Planets in this House ({house.residentPlanets.length})
                      </div>

                      {house.residentPlanets.length > 0 ? (
                        <div className="space-y-2.5">
                          {house.residentPlanets.map((planet, pIdx) => {
                            const interp = getInterpretation(planet.name, planet.sign, house.number);
                            return (
                              <div key={pIdx} className="p-3.5 rounded-xl border border-stone-200 bg-stone-50">
                                <div className="flex items-center justify-between mb-1.5">
                                  <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded bg-[#7B1123]/10 text-[#7B1123] flex items-center justify-center">
                                      <PlanetGlyph name={planet.name} className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="font-serif font-bold text-sm text-stone-900">
                                      {planet.name} in {planet.sign}
                                    </span>
                                    {planet.retrograde && (
                                      <span className="text-[10px] px-1 rounded bg-rose-100 text-rose-700 font-bold font-mono">℞</span>
                                    )}
                                  </div>
                                  <span className="text-xs font-mono text-stone-500">
                                    {planet.degree.toFixed(2)}°
                                  </span>
                                </div>
                                <p className="text-xs text-stone-600 font-sans leading-relaxed">
                                  {interp.houseText || `${planet.name} focuses intense cosmic energy into ${house.focusArea.toLowerCase()}.`}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="p-3.5 rounded-xl border border-dashed border-stone-200 bg-stone-50 text-xs text-stone-600 leading-relaxed">
                          <strong className="text-stone-800">Empty House:</strong> No natal planets reside in your {house.name}. This is completely normal and means this life area operates smoothly without acute tension. Its energy is governed by its cusp ruler, <strong className="text-stone-900">{house.cuspRuler}</strong>
                          {house.rulerPlacement ? ` (located in ${house.rulerPlacement.sign}, House ${house.rulerPlacement.house})` : ''}.
                        </div>
                      )}
                    </div>

                  </div>

                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* MODE 3: FULL WRITTEN REPORT VIEW */}
      {/* ========================================================= */}
      {viewMode === 'report' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8 animate-fade-in">
          
          <div className="bg-white border border-stone-200 p-8 sm:p-12 rounded-2xl shadow-sm">
            <div className="border-b border-stone-200 pb-6 mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7B1123]">
                Comprehensive Psychological Synthesis
              </span>
              <h2 className="text-3xl font-serif font-bold text-stone-900 mt-1">
                In-Depth Astrological Analysis
              </h2>
              <p className="text-sm text-stone-500 mt-1">
                A narrative breakdown of your core archetypes, planetary drives, and geometric aspects.
              </p>
            </div>
            
            <div className="space-y-10">
              {report.sections.map((section, idx) => (
                <div key={idx} className="pb-8 border-b border-stone-100 last:border-0 last:pb-0">
                  <h3 className="text-xl font-serif font-bold text-stone-900 mb-3 flex items-center gap-2">
                    <span className="text-[#7B1123]">✦</span>
                    <span>{section.title}</span>
                  </h3>
                  <p className="text-stone-700 leading-relaxed text-sm sm:text-base font-sans">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 4. DOWNLOAD CTA */}
      <div className="text-center pt-16 pb-8">
        <button 
          onClick={generatePDF}
          disabled={isGenerating}
          className="inline-flex items-center gap-2.5 bg-[#7B1123] text-white px-8 py-3.5 rounded-lg uppercase tracking-[0.15em] text-xs font-bold hover:bg-[#9E1B32] transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <FontAwesomeIcon icon={isGenerating ? faRotateRight : faDownload} className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Compiling PDF Report...' : 'Download Full PDF Report'}</span>
        </button>
        <p className="text-xs text-stone-500 mt-2 font-sans">
          Generates high-resolution printable report with Wheel and 12-House placements.
        </p>
      </div>

    </div>
  );
}

// PDF Generator Hook
function usePDFGenerator(data: any, report: any, user: any) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const { jsPDF } = await import('jspdf');
      const html2canvas = (await import('html2canvas')).default;

      const doc = new jsPDF({ format: 'a4', unit: 'mm' });
      const W = doc.internal.pageSize.getWidth();
      const H = doc.internal.pageSize.getHeight();
      const margin = 20;
      let cursorY = margin;

      // 1. COVER / HEADER
      doc.setFillColor(250, 250, 249); // Stone-50
      doc.rect(0, 0, W, H, 'F');
      
      doc.setTextColor(123, 17, 35); // Maroon #7B1123
      doc.setFont('times', 'bold');
      doc.setFontSize(28);
      doc.text("HEROZODIAC // NATAL CHART REPORT", W/2, 40, { align: 'center' });
      
      doc.setTextColor(28, 25, 23); // Stone-900
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      const ownerName = user?.name || "Cosmic Traveler";
      doc.text(`Astrological Blueprint for ${ownerName}`, W/2, 52, { align: 'center' });

      if (user?.date && user?.location) {
        doc.setFontSize(10);
        doc.setTextColor(120, 113, 108); // Stone-500
        doc.setFont('helvetica', 'normal');
        doc.text(`Born: ${user.date} • ${user.location}`, W/2, 60, { align: 'center' });
      }

      // Wheel capture
      const wheelEl = document.querySelector('.natal-wheel-container') as HTMLElement;
      if (wheelEl) {
        const canvas = await html2canvas(wheelEl, {
          scale: 2,
          backgroundColor: '#ffffff',
          logging: false
        });
        const imgData = canvas.toDataURL('image/png');
        const imgW = 120;
        const imgH = (canvas.height * imgW) / canvas.width;
        doc.addImage(imgData, 'PNG', (W - imgW) / 2, 70, imgW, imgH);
      }

      doc.setFontSize(9);
      doc.setTextColor(120, 113, 108);
      doc.text("HeroZodiac Astrology Platform • Placidus House System", W/2, H - 15, { align: 'center' });

      // 2. CONTENT PAGES
      doc.addPage();
      doc.setFillColor(250, 250, 249);
      doc.rect(0, 0, W, H, 'F');
      cursorY = 30;

      const addText = (text: string, size: number, color: [number, number, number], font: string, style: 'bold' | 'normal' = 'normal') => {
        doc.setFont(font, style);
        doc.setFontSize(size);
        doc.setTextColor(...color);
        
        const lines = doc.splitTextToSize(text, W - (margin * 2));
        
        if (cursorY + (lines.length * size * 0.4) > H - margin) {
          doc.addPage();
          doc.setFillColor(250, 250, 249);
          doc.rect(0, 0, W, H, 'F');
          cursorY = 20;
        }

        doc.text(lines, margin, cursorY);
        cursorY += (lines.length * size * 0.4) + 5;
      };

      addText("Cosmic Summary", 18, [123, 17, 35], 'times', 'bold');
      addText(report.summary, 11, [68, 64, 60], 'helvetica', 'normal');
      cursorY += 6;

      report.sections.forEach((section: any) => {
        if (cursorY > H - 40) {
          doc.addPage();
          doc.setFillColor(250, 250, 249);
          doc.rect(0, 0, W, H, 'F');
          cursorY = 25;
        }
        
        doc.setDrawColor(231, 229, 228);
        doc.setLineWidth(0.2);
        doc.line(margin, cursorY, W - margin, cursorY);
        cursorY += 8;

        addText(section.title, 14, [123, 17, 35], 'times', 'bold');
        addText(section.content, 10, [41, 37, 36], 'helvetica', 'normal');
        cursorY += 6;
      });

      doc.save(`HeroZodiac-${ownerName.replace(/\s+/g, '-')}-Natal-Report.pdf`);

    } catch (e) {
      console.error(e);
      alert("Error generating PDF"); 
    } finally {
      setIsGenerating(false);
    }
  };

  return { generatePDF, isGenerating };
}