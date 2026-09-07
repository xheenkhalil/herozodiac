'use client';

import Link from 'next/link';
import { ZODIAC_SIGNS_DATA } from '@/data/zodiac-data';
import { ZodiacGlyph } from '@/components/astro/ZodiacGlyph';

interface HoroscopeItem {
  sign: string;
  snippet: string;
  slug: string;
}

export function DailyHoroscopeRibbon() {
  const horoscopes: HoroscopeItem[] = ZODIAC_SIGNS_DATA.map((z) => ({
    sign: z.name,
    snippet: z.horoscopeSnippet,
    slug: z.slug,
  }));

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

        {/* 12 SIGNS HORIZONTAL GRID / SCROLL */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-3 sm:gap-4">
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
