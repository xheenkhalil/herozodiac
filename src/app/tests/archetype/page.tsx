'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ARCHETYPE_QUESTIONS,
  calculateArchetypeScores,
  ARCHETYPES_DATA,
  Archetype
} from '@/data/archetypes-data';
import {
  FontAwesomeIcon,
  faShieldHalved,
  faArrowLeft,
  faRotateRight,
  faCheck,
  faStar,
  faCrown
} from '@/components/ui/Icons';

export default function ArchetypeTestPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<{ primary: Archetype; secondary: Archetype } | null>(null);

  const totalQuestions = ARCHETYPE_QUESTIONS.length;
  const currentQ = ARCHETYPE_QUESTIONS[currentStep];

  const handleSelectOption = (archetypeId: string) => {
    const updated = { ...answers, [currentQ.id]: archetypeId };
    setAnswers(updated);

    if (currentStep + 1 < totalQuestions) {
      setCurrentStep(currentStep + 1);
    } else {
      const scores = calculateArchetypeScores(updated);
      setResult({ primary: scores.primary, secondary: scores.secondary });
      // Persist in localStorage for profile
      try {
        localStorage.setItem('hz_archetype_result', JSON.stringify({
          primary: scores.primary.name,
          secondary: scores.secondary.name,
          date: new Date().toISOString()
        }));
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
          <span className="text-[#7B1123] font-bold">Archetype Assessment</span>
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
                <FontAwesomeIcon icon={faShieldHalved} className="w-3 h-3" />
                <span>Mythic & Instinctual Drive</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-snug">
                {currentQ.question}
              </h1>
            </div>

            {/* OPTIONS */}
            <div className="space-y-4 mb-10">
              {currentQ.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectOption(opt.archetypeId)}
                  className={`w-full p-5 rounded-xl border text-left transition-all flex items-center justify-between group ${
                    answers[currentQ.id] === opt.archetypeId
                      ? 'border-[#7B1123] bg-[#7B1123]/10 text-stone-900 shadow-sm'
                      : 'border-stone-200 bg-stone-50/50 hover:border-[#7B1123]/40'
                  }`}
                >
                  <span className="text-base text-stone-800 font-medium leading-relaxed pr-4">
                    {opt.text}
                  </span>
                  <div className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 ${
                    answers[currentQ.id] === opt.archetypeId
                      ? 'border-[#7B1123] bg-[#7B1123] text-white'
                      : 'border-stone-300'
                  }`}>
                    {answers[currentQ.id] === opt.archetypeId && (
                      <FontAwesomeIcon icon={faCheck} className="w-3 h-3" />
                    )}
                  </div>
                </button>
              ))}
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
                Select your instinctual response
              </span>
            </div>

          </div>
        ) : (
          /* RESULT PROFILE STATE */
          <div className="space-y-10 animate-fade-in">
            
            {/* HERO RESULT CARD */}
            <div className="bg-white border border-stone-200 rounded-2xl p-8 sm:p-12 shadow-sm text-center relative overflow-hidden">
              <div className="inline-block px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest bg-[#7B1123]/10 text-[#7B1123] border border-[#7B1123]/20 mb-4">
                Dominant Archetype Result
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#7B1123] mb-2 tracking-tight">
                {result.primary.name}
              </h1>

              <div className="text-sm font-sans font-medium text-stone-500 mb-6">
                {result.primary.tagline}
              </div>

              <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed max-w-2xl mx-auto mb-8">
                {result.primary.description}
              </p>

              {/* SECONDARY ARCHETYPE PILL */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-100 text-xs text-stone-700 mb-8 border border-stone-200">
                <FontAwesomeIcon icon={faCrown} className="w-3 h-3 text-[#7B1123]" />
                <span>Supporting Wing: <strong className="text-stone-900">{result.secondary.name}</strong> ({result.secondary.tagline})</span>
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
                    Save to Profile
                  </button>
                </Link>
              </div>
            </div>

            {/* CORE DRIVERS MATRIX */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-white border border-stone-200 shadow-sm">
                <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-[#7B1123] mb-2">Core Desire</h3>
                <p className="text-sm text-stone-700 leading-relaxed font-sans">{result.primary.coreDesire}</p>
              </div>

              <div className="p-6 rounded-xl bg-white border border-stone-200 shadow-sm">
                <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-[#7B1123] mb-2">Primary Goal</h3>
                <p className="text-sm text-stone-700 leading-relaxed font-sans">{result.primary.goal}</p>
              </div>

              <div className="p-6 rounded-xl bg-white border border-stone-200 shadow-sm">
                <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-rose-700 mb-2">Greatest Fear</h3>
                <p className="text-sm text-stone-700 leading-relaxed font-sans">{result.primary.greatestFear}</p>
              </div>
            </div>

            {/* STRENGTHS & TALENT */}
            <div className="bg-white border border-stone-200 rounded-2xl p-8 space-y-8">
              <div>
                <h3 className="font-serif font-bold text-xl text-stone-900 mb-4">
                  Signature Strengths & Gifts
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-stone-700 font-sans">
                  {result.primary.strengths.map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faStar} className="w-3 h-3 text-[#7B1123] shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-stone-100">
                <h3 className="font-serif font-bold text-xl text-stone-900 mb-3">
                  Career & Vocational Tendencies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.primary.careerTendencies.map((c) => (
                    <span
                      key={c}
                      className="px-3.5 py-1.5 rounded-lg bg-stone-100 text-xs font-semibold text-stone-800 border border-stone-200"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-stone-100">
                <h3 className="font-serif font-bold text-xl text-stone-900 mb-3">
                  Relationship Dynamics
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed font-sans">
                  {result.primary.relationshipStyle}
                </p>
              </div>
            </div>

            {/* EXPLORE ALL 12 ARCHETYPES */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8">
              <h3 className="font-serif font-bold text-xl text-stone-900 mb-6 text-center">
                The 12 Classical Archetypes Directory
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {ARCHETYPES_DATA.map((arch) => (
                  <div
                    key={arch.id}
                    className={`p-4 rounded-xl border text-center transition ${
                      arch.id === result.primary.id
                        ? 'bg-[#7B1123]/10 border-[#7B1123]'
                        : 'bg-white border-stone-200 shadow-sm'
                    }`}
                  >
                    <div className="font-serif font-bold text-sm text-stone-900 mb-1">
                      {arch.name}
                    </div>
                    <div className="text-[10px] text-stone-500 leading-tight">
                      {arch.tagline}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
