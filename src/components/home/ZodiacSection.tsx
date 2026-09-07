'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ZODIAC_SIGNS_DATA } from '@/data/zodiac-data';
import { ZodiacGlyph } from '@/components/astro/ZodiacGlyph';

export function ZodiacSection() {
  // Default selected to 'cancer' as shown in the reference image
  const [selectedSign, setSelectedSign] = useState<string>('cancer');

  return (
    <section className="py-16 sm:py-20 bg-white text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADING */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-xs sm:text-sm font-bold tracking-[0.25em] text-stone-900 uppercase font-serif flex items-center justify-center gap-3">
            <span className="text-[#7B1123] text-sm sm:text-base">✦</span>
            <span>DISCOVER YOUR ZODIAC</span>
            <span className="text-[#7B1123] text-sm sm:text-base">✦</span>
          </h2>
        </div>

        {/* 12-SIGN CARD GRID (6 per row on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
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

