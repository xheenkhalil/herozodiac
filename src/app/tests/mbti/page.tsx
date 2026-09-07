'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MBTI_QUESTIONS, calculateMBTIResult, MBTIType } from '@/data/mbti-data';
import {
  FontAwesomeIcon,
  faBrain,
  faArrowRight,
  faArrowLeft,
  faRotateRight,
  faCheck,
  faStar
} from '@/components/ui/Icons';

export default function MBTITestPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<MBTIType | null>(null);

  const totalQuestions = MBTI_QUESTIONS.length;
  const currentQ = MBTI_QUESTIONS[currentStep];

  const handleSelectOption = (value: string) => {
    const updated = { ...answers, [currentQ.id]: value };
    setAnswers(updated);

    if (currentStep + 1 < totalQuestions) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate final result
      const res = calculateMBTIResult(updated);
      setResult(res);
      // Persist in localStorage for profile
      try {
        localStorage.setItem('hz_mbti_result', JSON.stringify({ type: res.type, name: res.name, date: new Date().toISOString() }));
      } catch (e) {}
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pt-28 pb-24 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-8">
          <Link href="/" className="hover:text-stone-900 transition">Home</Link>
          <span>/</span>
          <Link href="/tests" className="hover:text-stone-900 transition">Tests</Link>
          <span>/</span>
          <span className="text-[#7B1123] font-bold">MBTI Personality Test</span>
        </nav>

        {!result ? (
          /* QUESTIONNAIRE STATE */
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-12 shadow-sm">
            
            {/* PROGRESS BAR */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-semibold text-stone-500 mb-2">
                <span>Question {currentStep + 1} of {totalQuestions}</span>
                <span>{Math.round(((currentStep + 1) / totalQuestions) * 100)}% Completed</span>
              </div>
              <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#7B1123] rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* QUESTION TITLE */}
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#7B1123]/10 text-[#7B1123] text-xs font-bold uppercase tracking-wider mb-4 border border-[#7B1123]/20">
                <FontAwesomeIcon icon={faBrain} className="w-3 h-3" />
                <span>Cognitive Preference</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-snug">
                {currentQ.question}
              </h1>
            </div>

            {/* OPTIONS */}
            <div className="space-y-4 mb-10">
              <button
                onClick={() => handleSelectOption(currentQ.optionA.value)}
                className={`w-full p-5 rounded-xl border text-left transition-all flex items-center justify-between group ${
                  answers[currentQ.id] === currentQ.optionA.value
                    ? 'border-[#7B1123] bg-[#7B1123]/10 text-stone-900 shadow-sm'
                    : 'border-stone-200 bg-stone-50/50 hover:border-[#7B1123]/40'
                }`}
              >
                <span className="text-base text-stone-800 font-medium leading-relaxed pr-4">
                  {currentQ.optionA.text}
                </span>
                <div className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 ${
                  answers[currentQ.id] === currentQ.optionA.value
                    ? 'border-[#7B1123] bg-[#7B1123] text-white'
                    : 'border-stone-300'
                }`}>
                  {answers[currentQ.id] === currentQ.optionA.value && (
                    <FontAwesomeIcon icon={faCheck} className="w-3 h-3" />
                  )}
                </div>
              </button>

              <button
                onClick={() => handleSelectOption(currentQ.optionB.value)}
                className={`w-full p-5 rounded-xl border text-left transition-all flex items-center justify-between group ${
                  answers[currentQ.id] === currentQ.optionB.value
                    ? 'border-[#7B1123] bg-[#7B1123]/10 text-stone-900 shadow-sm'
                    : 'border-stone-200 bg-stone-50/50 hover:border-[#7B1123]/40'
                }`}
              >
                <span className="text-base text-stone-800 font-medium leading-relaxed pr-4">
                  {currentQ.optionB.text}
                </span>
                <div className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 ${
                  answers[currentQ.id] === currentQ.optionB.value
                    ? 'border-[#7B1123] bg-[#7B1123] text-white'
                    : 'border-stone-300'
                }`}>
                  {answers[currentQ.id] === currentQ.optionB.value && (
                    <FontAwesomeIcon icon={faCheck} className="w-3 h-3" />
                  )}
                </div>
              </button>
            </div>

            {/* CONTROLS */}
            <div className="flex items-center justify-between pt-6 border-t border-stone-100">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-stone-500 hover:text-stone-900 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="w-3 h-3" />
                <span>Previous</span>
              </button>

              <span className="text-xs text-stone-400">
                Select an answer to advance
              </span>
            </div>

          </div>
        ) : (
          /* RESULT PROFILE STATE */
          <div className="space-y-10 animate-fade-in">
            
            {/* HERO RESULT CARD */}
            <div className="bg-white border border-stone-200 rounded-2xl p-8 sm:p-12 shadow-sm text-center relative overflow-hidden">
              <div className="inline-block px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest bg-[#7B1123]/10 text-[#7B1123] border border-[#7B1123]/20 mb-4">
                {result.category} • Personality Result
              </div>

              <h1 className="text-5xl sm:text-6xl font-serif font-bold text-[#7B1123] mb-2 tracking-tight">
                {result.type}
              </h1>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-4">
                {result.name}
              </h2>

              <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed max-w-2xl mx-auto mb-8">
                {result.description}
              </p>

              {/* COGNITIVE TRAITS PILLS */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {result.traits.map((t) => (
                  <span
                    key={t}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 text-stone-800 border border-stone-200"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-lg border border-stone-300 hover:bg-stone-100 text-xs font-semibold flex items-center gap-2 transition"
                >
                  <FontAwesomeIcon icon={faRotateRight} className="w-3 h-3" />
                  <span>Retake Test</span>
                </button>
                <Link href="/profile">
                  <button className="px-6 py-2.5 rounded-lg bg-[#7B1123] hover:bg-[#9E1B32] text-white text-xs font-bold shadow transition">
                    View in Profile Dashboard
                  </button>
                </Link>
              </div>
            </div>

            {/* COGNITIVE FUNCTIONS STACK */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8">
              <h3 className="font-serif font-bold text-xl text-stone-900 mb-6">
                Cognitive Function Architecture
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {result.cognitiveFunctions.map((func, i) => (
                  <div key={func} className="p-4 rounded-xl bg-white border border-stone-200 text-center shadow-sm">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                      {i === 0 ? 'Dominant' : i === 1 ? 'Auxiliary' : i === 2 ? 'Tertiary' : 'Inferior'}
                    </div>
                    <div className="text-sm font-serif font-bold text-stone-900">
                      {func}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* STRENGTHS & BLIND SPOTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-7 rounded-xl bg-white border border-stone-200 shadow-sm">
                <h3 className="font-serif font-bold text-lg text-emerald-800 mb-4 flex items-center gap-2">
                  <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-emerald-600" />
                  <span>Key Strengths</span>
                </h3>
                <ul className="space-y-2.5 text-sm text-stone-700">
                  {result.strengths.map((s) => (
                    <li key={s} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-7 rounded-xl bg-white border border-stone-200 shadow-sm">
                <h3 className="font-serif font-bold text-lg text-amber-800 mb-4 flex items-center gap-2">
                  <FontAwesomeIcon icon={faBrain} className="w-4 h-4 text-amber-600" />
                  <span>Potential Blind Spots</span>
                </h3>
                <ul className="space-y-2.5 text-sm text-stone-700">
                  {result.blindSpots.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CAREER & RELATIONSHIPS */}
            <div className="bg-white border border-stone-200 rounded-2xl p-8 space-y-8">
              <div>
                <h3 className="font-serif font-bold text-xl text-stone-900 mb-3">
                  Ideal Career Environments
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.careerPaths.map((c) => (
                    <span
                      key={c}
                      className="px-3 py-1.5 rounded-lg bg-stone-100 text-xs font-semibold text-stone-800 border border-stone-200"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-stone-100">
                <h3 className="font-serif font-bold text-xl text-stone-900 mb-3">
                  Romantic & Interpersonal Dynamics
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed font-sans">
                  {result.relationshipTraits}
                </p>
              </div>

              <div className="pt-6 border-t border-stone-100">
                <h3 className="font-serif font-bold text-xl text-stone-900 mb-3">
                  Astrological Sign Resonance
                </h3>
                <p className="text-xs text-stone-500 mb-3 font-sans">
                  In psychological astrology, {result.type} frequently resonates with archetypal placements in:
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.astrologicalResonance.map((sign) => (
                    <Link
                      key={sign}
                      href={`/zodiac/${sign.toLowerCase()}`}
                      className="px-3.5 py-1.5 rounded-lg bg-[#7B1123]/10 text-[#7B1123] text-xs font-bold hover:bg-[#7B1123] hover:text-white transition border border-[#7B1123]/20"
                    >
                      {sign}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
