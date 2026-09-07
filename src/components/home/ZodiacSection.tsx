'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ZODIAC_SIGNS_DATA } from '@/data/zodiac-data';
import { ZodiacGlyph } from '@/components/astro/ZodiacGlyph';
import { FontAwesomeIcon, faArrowRight } from '@/components/ui/Icons';

export function ZodiacSection() {
  // Default selected to 'cancer' as shown in the reference image
  const [selectedSign, setSelectedSign] = useState<string>('cancer');
  const [showAllMobile, setShowAllMobile] = useState(false);

  // On mobile (< sm): Show first 3 signs if not expanded
  // On desktop (sm+): All 12 signs are always displayed
  const mobileSigns = showAllMobile ? ZODIAC_SIGNS_DATA : ZODIAC_SIGNS_DATA.slice(0, 3);

  return (
    <section className="py-14 sm:py-20 bg-white text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADING */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xs sm:text-sm font-bold tracking-[0.25em] text-stone-900 uppercase font-serif flex items-center justify-center gap-3">
            <span className="text-[#7B1123] text-sm sm:text-base">✦</span>
            <span>DISCOVER YOUR ZODIAC</span>
            <span className="text-[#7B1123] text-sm sm:text-base">✦</span>
          </h2>
        </div>

        {/* MOBILE GRID (< sm: 2 cols, showing 1-3 + Catchy 4th Card) */}
        <div className="grid grid-cols-2 gap-3 sm:hidden">
          {mobileSigns.map((sign) => {
            const isSelected = selectedSign === sign.slug;

            return (
              <Link
                key={sign.slug}
                href={`/zodiac/${sign.slug}`}
                onClick={() => setSelectedSign(sign.slug)}
                className={`group relative p-4 rounded-xl text-center transition-all duration-200 border flex flex-col items-center justify-center min-h-[140px] shadow-sm ${
                  isSelected
                    ? 'bg-[#600816] text-white border-[#600816] shadow-md shadow-[#600816]/25'
                    : 'bg-white border-stone-200 text-stone-900 hover:border-[#7B1123]/50'
                }`}
              >
                <div className="mb-2 transition-transform duration-200 group-hover:scale-105">
                  <ZodiacGlyph
                    sign={sign.slug}
                    className={`w-9 h-9 ${isSelected ? 'text-white' : 'text-[#7B1123]'}`}
                    strokeWidth={2.4}
                  />
                </div>
                <h3 className={`font-serif font-bold text-base mb-0.5 tracking-tight ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                  {sign.name}
                </h3>
                <span className={`text-[11px] font-sans ${isSelected ? 'text-white/85' : 'text-stone-500'}`}>
                  {sign.dates}
                </span>
              </Link>
            );
          })}

          {/* 4TH CARD ON MOBILE (When collapsed: Catchy "9 More Signs" Card) */}
          {!showAllMobile && (
            <button
              onClick={() => setShowAllMobile(true)}
              className="p-4 rounded-xl border-2 border-dashed border-[#7B1123]/30 bg-gradient-to-br from-[#7B1123]/5 via-[#7B1123]/10 to-amber-500/5 text-center flex flex-col items-center justify-center min-h-[140px] transition-all hover:bg-[#7B1123]/15 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-[#7B1123] text-white flex items-center justify-center mb-1.5 shadow-sm group-hover:scale-110 transition-transform">
                <span className="font-serif font-bold text-sm">+9</span>
              </div>
              <h3 className="font-serif font-bold text-sm text-stone-900 mb-0.5">
                More Signs
              </h3>
              <span className="text-[10px] font-bold text-[#7B1123] uppercase tracking-wider flex items-center gap-1">
                <span>View All 12</span>
                <FontAwesomeIcon icon={faArrowRight} className="w-2 h-2" />
              </span>
            </button>
          )}
        </div>

        {/* CATCHY MOBILE EXPAND TOGGLE BUTTON */}
        <div className="mt-4 sm:hidden text-center">
          <button
            onClick={() => setShowAllMobile(!showAllMobile)}
            className="w-full py-3 px-4 rounded-lg bg-[#7B1123] hover:bg-[#9E1B32] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{showAllMobile ? 'Show Less ∧' : '✦ Explore All 12 Zodiac Signs (9 More) ∨'}</span>
          </button>
        </div>

        {/* DESKTOP GRID (sm and above: always displays all 12 signs) */}
        <div className="hidden sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {ZODIAC_SIGNS_DATA.map((sign) => {
            const isSelected = selectedSign === sign.slug;

            return (
              <Link
                key={sign.slug}
                href={`/zodiac/${sign.slug}`}
                onMouseEnter={() => setSelectedSign(sign.slug)}
                className={`group relative p-4 sm:p-5 rounded-xl sm:rounded-2xl text-center transition-all duration-200 border flex flex-col items-center justify-center min-h-[145px] shadow-sm ${
                  isSelected
                    ? 'bg-[#600816] text-white border-[#600816] shadow-md shadow-[#600816]/25 -translate-y-0.5'
                    : 'bg-white border-stone-200 text-stone-900 hover:border-[#7B1123]/50 hover:shadow-md hover:-translate-y-0.5'
                }`}
              >
                {/* ZODIAC VECTOR GLYPH */}
                <div className="mb-2 transition-transform duration-200 group-hover:scale-105">
                  <ZodiacGlyph
                    sign={sign.slug}
                    className={`w-10 h-10 sm:w-11 sm:h-11 ${
                      isSelected ? 'text-white' : 'text-[#7B1123]'
                    }`}
                    strokeWidth={2.4}
                  />
                </div>

                {/* SIGN NAME */}
                <h3 className={`font-serif font-bold text-base sm:text-[17px] mb-1 tracking-tight ${
                  isSelected ? 'text-white' : 'text-stone-900'
                }`}>
                  {sign.name}
                </h3>

                {/* DATE RANGE */}
                <span className={`text-[11px] sm:text-xs font-sans ${
                  isSelected ? 'text-white/85' : 'text-stone-500'
                }`}>
                  {sign.dates}
                </span>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
