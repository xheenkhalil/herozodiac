'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ZODIAC_SIGNS_DATA, ZodiacSign } from '@/data/zodiac-data';
import { FontAwesomeIcon, faCompass, faArrowRight } from '@/components/ui/Icons';
import { ZodiacGlyph } from '@/components/astro/ZodiacGlyph';

export default function ZodiacIndexPage() {
  const [filterElement, setFilterElement] = useState<string>('All');

  const filteredSigns = filterElement === 'All'
    ? ZODIAC_SIGNS_DATA
    : ZODIAC_SIGNS_DATA.filter(s => s.element === filterElement);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#7B1123]/10 text-[#7B1123] text-xs font-semibold mb-4 border border-[#7B1123]/20">
            <FontAwesomeIcon icon={faCompass} className="w-3 h-3" />
            <span>The 12 Zodiac Signs</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 mb-4">
            Zodiac Encyclopedia
          </h1>
          <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed">
            Explore deep astrological profiles, elemental rulerships, psychological archetypes, and relationship dynamics for each of the twelve signs.
          </p>
        </div>

        {/* ELEMENT FILTER TABS */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {['All', 'Fire', 'Earth', 'Air', 'Water'].map((elem) => (
            <button
              key={elem}
              onClick={() => setFilterElement(elem)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                filterElement === elem
                  ? 'bg-[#7B1123] text-white shadow-sm'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              {elem} Signs
            </button>
          ))}
        </div>

        {/* 12 SIGNS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSigns.map((sign) => (
            <Link
              key={sign.slug}
              href={`/zodiac/${sign.slug}`}
              className="bg-white border border-stone-200 rounded-xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#7B1123]/50 transition-all shadow-sm hover:shadow-md hover:-translate-y-1 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="group-hover:scale-110 transition-transform">
                    <ZodiacGlyph sign={sign.slug} className="w-10 h-10 text-[#7B1123]" strokeWidth={2.4} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-700">
                      {sign.element}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-700">
                      {sign.modality}
                    </span>
                  </div>
                </div>

                <h2 className="font-serif font-bold text-2xl text-stone-900 mb-1 group-hover:text-[#7B1123] transition-colors">
                  {sign.name} <span className="text-sm font-sans font-normal text-stone-500">({sign.symbol})</span>
                </h2>

                <div className="text-xs text-stone-500 mb-3 font-sans">
                  {sign.dates}
                </div>

                <p className="text-sm text-stone-600 leading-relaxed line-clamp-3 mb-6 font-sans">
                  {sign.overview}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#7B1123]">
                <span>Read Complete Profile</span>
                <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
