'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  PALM_LINES,
  HAND_SHAPES,
  PALM_MOUNTS,
  PalmLine,
  HandShape,
  PalmMount
} from '@/data/palmistry-data';
import {
  FontAwesomeIcon,
  faHand,
  faStar,
  faCompass,
  faArrowRight
} from '@/components/ui/Icons';

export default function PalmistryPage() {
  const [activeTab, setActiveTab] = useState<'lines' | 'shapes' | 'mounts'>('lines');
  const [selectedLine, setSelectedLine] = useState<PalmLine>(PALM_LINES[0]);
  const [selectedShape, setSelectedShape] = useState<HandShape>(HAND_SHAPES[0]);
  const [selectedMount, setSelectedMount] = useState<PalmMount>(PALM_MOUNTS[0]);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pt-28 pb-24 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-8">
          <Link href="/" className="hover:text-stone-900 transition">Home</Link>
          <span>/</span>
          <span className="text-[#7B1123] font-bold">Palmistry Guide</span>
        </nav>

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#7B1123]/10 text-[#7B1123] text-xs font-bold mb-4 border border-[#7B1123]/20">
            <FontAwesomeIcon icon={faHand} className="w-3 h-3" />
            <span>Chirognomy & Palm Reading</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 mb-4">
            The Palmistry Guide
          </h1>

          <p className="text-base text-stone-600 font-sans leading-relaxed">
            Learn the traditional art of palm reading. Discover what the four major lines, the elemental hand shapes, and the planetary mounts reveal about your destiny.
          </p>
        </div>

        {/* SECTION NAV TABS */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-xl bg-stone-100 border border-stone-200">
            <button
              onClick={() => setActiveTab('lines')}
              className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                activeTab === 'lines'
                  ? 'bg-[#7B1123] text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              The 4 Major Lines
            </button>
            <button
              onClick={() => setActiveTab('shapes')}
              className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                activeTab === 'shapes'
                  ? 'bg-[#7B1123] text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Elemental Hand Shapes
            </button>
            <button
              onClick={() => setActiveTab('mounts')}
              className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                activeTab === 'mounts'
                  ? 'bg-[#7B1123] text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Planetary Mounts
            </button>
          </div>
        </div>

        {/* TAB 1: THE 4 MAJOR LINES */}
        {activeTab === 'lines' && (
          <div className="space-y-8 animate-fade-in">
            {/* LINE SELECTOR BUTTONS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PALM_LINES.map((line) => (
                <button
                  key={line.id}
                  onClick={() => setSelectedLine(line)}
                  className={`p-4 rounded-xl border text-center font-serif font-bold text-sm sm:text-base transition ${
                    selectedLine.id === line.id
                      ? 'bg-[#7B1123] text-white border-[#7B1123] shadow-md'
                      : 'bg-white border-stone-200 text-stone-800 hover:border-[#7B1123]/40'
                  }`}
                >
                  {line.name}
                </button>
              ))}
            </div>

            {/* SELECTED LINE DETAIL CARD */}
            <div className="bg-white border border-stone-200 rounded-2xl p-8 sm:p-12 shadow-sm">
              <div className="inline-block px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#7B1123]/10 text-[#7B1123] border border-[#7B1123]/20 mb-3">
                Major Palm Line Analysis
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mb-2">
                {selectedLine.name}
              </h2>

              <div className="text-sm text-stone-500 font-sans mb-6">
                <strong>Anatomical Position:</strong> {selectedLine.location}
              </div>

              <p className="text-base text-stone-700 leading-relaxed font-sans mb-8">
                {selectedLine.significance}
              </p>

              <h3 className="font-serif font-bold text-xl text-stone-900 mb-4">
                Common Variations & Interpretations
              </h3>

              <div className="space-y-4 mb-8">
                {selectedLine.variations.map((v, i) => (
                  <div key={i} className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                    <div className="text-sm font-bold text-[#7B1123] mb-1 font-serif">
                      {v.type}
                    </div>
                    <div className="text-sm text-stone-600 font-sans leading-relaxed">
                      {v.meaning}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-amber-900 leading-relaxed">
                <strong>Traditional Wisdom:</strong> {selectedLine.advice}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ELEMENTAL HAND SHAPES */}
        {activeTab === 'shapes' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {HAND_SHAPES.map((shape) => (
                <button
                  key={shape.id}
                  onClick={() => setSelectedShape(shape)}
                  className={`p-4 rounded-xl border text-center font-serif font-bold text-sm sm:text-base transition ${
                    selectedShape.id === shape.id
                      ? 'bg-[#7B1123] text-white border-[#7B1123] shadow-md'
                      : 'bg-white border-stone-200 text-stone-800 hover:border-[#7B1123]/40'
                  }`}
                >
                  {shape.name}
                </button>
              ))}
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-8 sm:p-12 shadow-sm">
              <div className="inline-block px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#7B1123]/10 text-[#7B1123] border border-[#7B1123]/20 mb-3">
                Element: {selectedShape.element}
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mb-2">
                {selectedShape.name}
              </h2>

              <p className="text-base text-stone-700 leading-relaxed font-sans mb-8">
                <strong>Physical Features:</strong> {selectedShape.visualCharacteristics}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-5 rounded-xl bg-stone-50 border border-stone-200">
                  <h4 className="font-serif font-bold text-sm text-[#7B1123] mb-2 uppercase tracking-wider">
                    Core Traits
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedShape.personalityTraits.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-md bg-white border border-stone-200 text-xs font-semibold text-stone-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-stone-50 border border-stone-200">
                  <h4 className="font-serif font-bold text-sm text-[#7B1123] mb-2 uppercase tracking-wider">
                    Career Calling
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {selectedShape.careerResonance}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-stone-50 border border-stone-200">
                  <h4 className="font-serif font-bold text-sm text-[#7B1123] mb-2 uppercase tracking-wider">
                    Relational Style
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {selectedShape.relationshipApproach}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PLANETARY MOUNTS */}
        {activeTab === 'mounts' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {PALM_MOUNTS.map((mount) => (
                <button
                  key={mount.id}
                  onClick={() => setSelectedMount(mount)}
                  className={`p-3 rounded-xl border text-center font-serif font-bold text-xs sm:text-sm transition ${
                    selectedMount.id === mount.id
                      ? 'bg-[#7B1123] text-white border-[#7B1123] shadow-md'
                      : 'bg-white border-stone-200 text-stone-800 hover:border-[#7B1123]/40'
                  }`}
                >
                  {mount.name.split(' (')[0]}
                </button>
              ))}
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-8 sm:p-12 shadow-sm">
              <div className="inline-block px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#7B1123]/10 text-[#7B1123] border border-[#7B1123]/20 mb-3">
                Ruling Body: {selectedMount.planet}
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mb-2">
                {selectedMount.name}
              </h2>

              <div className="text-sm text-stone-500 font-sans mb-6">
                <strong>Location:</strong> {selectedMount.location}
              </div>

              <p className="text-base text-stone-700 leading-relaxed font-sans mb-8">
                <strong>Energetic Archetype:</strong> {selectedMount.qualities}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-stone-50 border border-stone-200">
                  <h4 className="font-serif font-bold text-sm text-[#7B1123] mb-2 uppercase tracking-wider">
                    Prominent / Well-Developed
                  </h4>
                  <p className="text-sm text-stone-600 font-sans leading-relaxed">
                    {selectedMount.prominentMeaning}
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-stone-50 border border-stone-200">
                  <h4 className="font-serif font-bold text-sm text-stone-500 mb-2 uppercase tracking-wider">
                    Flat / Underdeveloped
                  </h4>
                  <p className="text-sm text-stone-600 font-sans leading-relaxed">
                    {selectedMount.underdevelopedMeaning}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
