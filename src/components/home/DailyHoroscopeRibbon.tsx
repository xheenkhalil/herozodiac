'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ZODIAC_SIGNS_DATA } from '@/data/zodiac-data';
import { ZodiacGlyph } from '@/components/astro/ZodiacGlyph';
import { FontAwesomeIcon, faArrowRight } from '@/components/ui/Icons';

interface HoroscopeItem {
  sign: string;
  snippet: string;
  slug: string;
}

export function DailyHoroscopeRibbon() {
  const [showAllMobile, setShowAllMobile] = useState(false);

  const horoscopes: HoroscopeItem[] = ZODIAC_SIGNS_DATA.map((z) => ({
    sign: z.name,
    snippet: z.horoscopeSnippet,
    slug: z.slug,
  }));

  // On mobile (< sm): Show first 3 horoscopes if not expanded
  // On desktop (sm+): All 12 horoscopes are always displayed
  const mobileHoroscopes = showAllMobile ? horoscopes : horoscopes.slice(0, 3);

  return (
    <section className="bg-[#4A0B15] text-white py-10 px-4 sm:px-6 lg:px-8 border-y border-[#7B1123]">
      <div className="max-w-7xl mx-auto">
        
        {/* RIBBON HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xs sm:text-sm font-bold tracking-[0.25em] text-white uppercase flex items-center gap-2">
            <span>TODAY&apos;S HOROSCOPE</span>
            <span className="text-white/80">✦</span>
          </h2>

          <Link
            href="/horoscope"
            className="text-xs text-white/80 hover:text-white underline underline-offset-4"
          >
            Full Daily Forecast →
          </Link>
        </div>

        {/* MOBILE GRID (< sm: 2 cols, showing 1-3 + Catchy 4th Card) */}
        <div className="grid grid-cols-2 gap-3 sm:hidden">
          {mobileHoroscopes.map((h) => (
            <Link
              key={h.slug}
              href={`/horoscope/${h.slug}`}
              className="p-3.5 rounded-lg bg-black/25 hover:bg-black/40 border border-white/10 hover:border-white/25 transition-all text-center flex flex-col items-center justify-between group min-h-[140px]"
            >
              <div className="mb-1 text-white group-hover:scale-110 transition-transform">
                <ZodiacGlyph sign={h.slug} className="w-7 h-7 text-white" strokeWidth={2.4} />
              </div>

              <h3 className="font-serif font-bold text-xs sm:text-sm mb-1 text-white">
                {h.sign}
              </h3>

              <p className="text-[11px] text-white/80 leading-snug line-clamp-3">
                {h.snippet}
              </p>
            </Link>
          ))}

          {/* 4TH CARD ON MOBILE (When collapsed: Catchy "9 More Signs" Card) */}
          {!showAllMobile && (
            <button
              onClick={() => setShowAllMobile(true)}
              className="p-3.5 rounded-lg bg-black/35 hover:bg-black/50 border border-white/25 hover:border-white/40 transition-all text-center flex flex-col items-center justify-center group cursor-pointer min-h-[140px]"
            >
              <div className="w-8 h-8 rounded-full bg-white/15 text-white flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                <span className="font-serif font-bold text-xs">+9</span>
              </div>
              <h3 className="font-serif font-bold text-xs text-white mb-1">
                More Signs
              </h3>
              <p className="text-[10px] text-white/80 leading-tight flex items-center gap-1">
                <span>View All 12</span>
                <FontAwesomeIcon icon={faArrowRight} className="w-2 h-2" />
              </p>
            </button>
          )}
        </div>

        {/* CATCHY MOBILE EXPAND TOGGLE BUTTON */}
        <div className="mt-4 sm:hidden text-center">
          <button
            onClick={() => setShowAllMobile(!showAllMobile)}
            className="w-full py-2.5 px-4 rounded-lg bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-bold uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{showAllMobile ? 'Show Less ∧' : '✦ Read All 12 Daily Horoscopes (9 More) ∨'}</span>
          </button>
        </div>

        {/* DESKTOP GRID (sm and above: always displays all 12 signs) */}
        <div className="hidden sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-3 sm:gap-4">
          {horoscopes.map((h) => (
            <Link
              key={h.slug}
              href={`/horoscope/${h.slug}`}
              className="p-3.5 rounded-lg bg-black/20 hover:bg-black/35 border border-white/10 hover:border-white/25 transition-all text-center flex flex-col items-center justify-between group"
            >
              <div className="mb-1 text-white group-hover:scale-110 transition-transform">
                <ZodiacGlyph sign={h.slug} className="w-7 h-7 text-white" strokeWidth={2.4} />
              </div>

              <h3 className="font-serif font-bold text-xs sm:text-sm mb-1 text-white">
                {h.sign}
              </h3>

              <p className="text-[11px] text-white/80 leading-snug line-clamp-3">
                {h.snippet}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
