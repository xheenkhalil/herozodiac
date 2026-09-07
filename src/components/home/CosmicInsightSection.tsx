'use client';

import Link from 'next/link';
import { FontAwesomeIcon, faStar, faArrowRight } from '@/components/ui/Icons';

export function CosmicInsightSection() {
  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <section className="py-12 bg-stone-50 border-t border-b border-stone-200 text-stone-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#7B1123]/10 border border-[#7B1123]/20 text-[#7B1123] text-xs font-semibold mb-4">
          <FontAwesomeIcon icon={faStar} className="w-3 h-3 text-[#7B1123]" />
          <span>Cosmic Transit of the Day • {todayDate}</span>
        </div>

        <h3 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 mb-3">
          Mercury Trines Uranus in Earth Signs
        </h3>

        <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-6 max-w-2xl mx-auto">
          Brilliant flashes of practical insight emerge today. A favorable angle between Mercury and Uranus illuminates solutions to lingering puzzles. Trust unconventional ideas that possess real-world viability.
        </p>

        <Link
          href="/transits"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#7B1123] hover:underline"
        >
          <span>Read Full Planetary Transits Report</span>
          <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
        </Link>

      </div>
    </section>
  );
}
