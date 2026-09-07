'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  calculateLifePath,
  calculateExpressionNumber,
  calculateSoulUrgeNumber,
  calculatePersonalityNumber,
  NUMEROLOGY_PROFILES,
  NumerologyMeaning
} from '@/data/numerology-data';
import {
  FontAwesomeIcon,
  faCalculator,
  faStar,
  faArrowRight,
  faCheck,
  faRotateRight
} from '@/components/ui/Icons';

export default function NumerologyPage() {
  const [day, setDay] = useState(15);
  const [month, setMonth] = useState(8);
  const [year, setYear] = useState(1994);
  const [fullName, setFullName] = useState('');

  const [lifePathResult, setLifePathResult] = useState<NumerologyMeaning | null>(null);
  const [expressionNum, setExpressionNum] = useState<number | null>(null);
  const [soulUrgeNum, setSoulUrgeNum] = useState<number | null>(null);
  const [personalityNum, setPersonalityNum] = useState<number | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const lp = calculateLifePath(year, month, day);
    const profile = NUMEROLOGY_PROFILES[lp] || NUMEROLOGY_PROFILES[1];
    setLifePathResult(profile);

    if (fullName.trim()) {
      setExpressionNum(calculateExpressionNumber(fullName));
      setSoulUrgeNum(calculateSoulUrgeNumber(fullName));
      setPersonalityNum(calculatePersonalityNumber(fullName));
    } else {
      setExpressionNum(null);
      setSoulUrgeNum(null);
      setPersonalityNum(null);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pt-28 pb-24 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-8">
          <Link href="/" className="hover:text-stone-900 transition">Home</Link>
          <span>/</span>
          <span className="text-[#7B1123] font-bold">Numerology Calculator</span>
        </nav>

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#7B1123]/10 text-[#7B1123] text-xs font-bold mb-4 border border-[#7B1123]/20">
            <FontAwesomeIcon icon={faCalculator} className="w-3 h-3" />
            <span>Pythagorean Numerology</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 mb-4">
            Numerology Calculator
          </h1>

          <p className="text-base text-stone-600 font-sans leading-relaxed">
            Uncover the sacred geometric numbers encoded into your birth date and full birth name, including your Life Path, Expression, and Soul Urge frequencies.
          </p>
        </div>

        {/* INPUT CALCULATOR FORM */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-10 shadow-sm mb-12">
          <form onSubmit={handleCalculate} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                Date of Birth (For Life Path Number)
              </label>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] text-stone-400 block mb-1">Month</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={month}
                    onChange={(e) => setMonth(parseInt(e.target.value) || 1)}
                    className="w-full bg-white border border-stone-300 rounded-lg px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-[#7B1123]"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] text-stone-400 block mb-1">Day</label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={day}
                    onChange={(e) => setDay(parseInt(e.target.value) || 1)}
                    className="w-full bg-white border border-stone-300 rounded-lg px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-[#7B1123]"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] text-stone-400 block mb-1">Year</label>
                  <input
                    type="number"
                    min="1900"
                    max="2099"
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value) || 1990)}
                    className="w-full bg-white border border-stone-300 rounded-lg px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-[#7B1123]"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                Full Birth Name (Optional — For Expression & Soul Urge)
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Eleanor Rose Vance"
                className="w-full bg-white border border-stone-300 rounded-lg px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-[#7B1123]"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#7B1123] hover:bg-[#9E1B32] text-white font-bold text-sm shadow-md transition"
            >
              Calculate Numerology Blueprint
            </button>
          </form>
        </div>

        {/* RESULTS SECTION */}
        {lifePathResult && (
          <div className="space-y-10 animate-fade-in">
            
            {/* HERO LIFE PATH RESULT CARD */}
            <div className="bg-white border border-stone-200 rounded-2xl p-8 sm:p-12 shadow-sm text-center relative overflow-hidden">
              <div className="inline-block px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest bg-[#7B1123]/10 text-[#7B1123] border border-[#7B1123]/20 mb-4">
                Life Path Assessment
              </div>

              <div className="text-6xl sm:text-7xl font-serif font-bold text-[#7B1123] mb-2">
                {lifePathResult.number}
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-2">
                {lifePathResult.title}
              </h2>

              <div className="text-sm text-stone-500 mb-6 font-sans">
                {lifePathResult.tagline}
              </div>

              <p className="text-base text-stone-600 leading-relaxed max-w-2xl mx-auto font-sans">
                {lifePathResult.lifePathDescription}
              </p>
            </div>

            {/* ADDITIONAL NUMBERS SNAPSHOT (IF NAME PROVIDED) */}
            {expressionNum && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl bg-white border border-stone-200 text-center shadow-sm">
                  <div className="text-[10px] uppercase font-bold text-stone-400 mb-1">Destiny / Expression</div>
                  <div className="text-4xl font-serif font-bold text-[#7B1123] mb-2">{expressionNum}</div>
                  <p className="text-xs text-stone-500 font-sans">Your natural talents and vocational potential.</p>
                </div>

                <div className="p-6 rounded-xl bg-white border border-stone-200 text-center shadow-sm">
                  <div className="text-[10px] uppercase font-bold text-stone-400 mb-1">Soul Urge (Vowels)</div>
                  <div className="text-4xl font-serif font-bold text-[#7B1123] mb-2">{soulUrgeNum}</div>
                  <p className="text-xs text-stone-500 font-sans">Your innermost desires and subconscious longings.</p>
                </div>

                <div className="p-6 rounded-xl bg-white border border-stone-200 text-center shadow-sm">
                  <div className="text-[10px] uppercase font-bold text-stone-400 mb-1">Personality (Consonants)</div>
                  <div className="text-4xl font-serif font-bold text-[#7B1123] mb-2">{personalityNum}</div>
                  <p className="text-xs text-stone-500 font-sans">How others perceive you upon initial meeting.</p>
                </div>
              </div>
            )}

            {/* STRENGTHS & CAREER */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-7 rounded-xl bg-white border border-stone-200 shadow-sm">
                <h3 className="font-serif font-bold text-lg text-emerald-800 mb-4 flex items-center gap-2">
                  <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-emerald-600" />
                  <span>Vibrational Strengths</span>
                </h3>
                <ul className="space-y-2.5 text-sm text-stone-700 font-sans">
                  {lifePathResult.strengths.map((s) => (
                    <li key={s} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-7 rounded-xl bg-white border border-stone-200 shadow-sm">
                <h3 className="font-serif font-bold text-lg text-stone-900 mb-4">
                  Harmonious Career Callings
                </h3>
                <div className="flex flex-wrap gap-2">
                  {lifePathResult.careerFields.map((c) => (
                    <span
                      key={c}
                      className="px-3.5 py-1.5 rounded-lg bg-stone-100 text-xs font-semibold text-stone-800 border border-stone-200"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ALL NUMBERS QUICK DIRECTORY */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8">
              <h3 className="font-serif font-bold text-xl text-stone-900 mb-6 text-center">
                Pythagorean Life Path Frequencies
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33].map((n) => {
                  const p = NUMEROLOGY_PROFILES[n];
                  const isCurrent = lifePathResult.number === n;
                  return (
                    <button
                      key={n}
                      onClick={() => setLifePathResult(p)}
                      className={`p-3 rounded-lg border text-center transition ${
                        isCurrent
                          ? 'bg-[#7B1123] text-white border-[#7B1123]'
                          : 'bg-white border-stone-200 hover:border-[#7B1123]/40 text-stone-900'
                      }`}
                    >
                      <div className="text-xl font-serif font-bold">{n}</div>
                      <div className="text-[10px] truncate">{p.archetype}</div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
