'use client';

import Link from 'next/link';
import {
  FontAwesomeIcon,
  faShieldHalved,
  faCompass,
  faFeatherPointed,
  faHeart,
  faArrowRight
} from '@/components/ui/Icons';
import { ARCHETYPES_DATA } from '@/data/archetypes-data';

// Custom Owl Icon for The Sage
const OwlIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-6 h-6">
    <circle cx="9" cy="9" r="2.5" />
    <circle cx="15" cy="9" r="2.5" />
    <path d="M12 11.5 L12 14.5" />
    <path d="M4 19 C4 14 6 5 12 5 C18 5 20 14 20 19" />
    <path d="M7 21 L17 21" />
  </svg>
);

export function ArchetypeSection() {
  // 5 primary archetypes from new_layout.png
  const featuredArchetypes = ARCHETYPES_DATA.slice(0, 5);

  const getArchetypeIcon = (id: string) => {
    switch (id) {
      case 'sage':
        return <OwlIcon />;
      case 'hero':
        return <FontAwesomeIcon icon={faShieldHalved} className="w-6 h-6 text-[#7B1123]" />;
      case 'explorer':
        return <FontAwesomeIcon icon={faCompass} className="w-6 h-6 text-[#7B1123]" />;
      case 'creator':
        return <FontAwesomeIcon icon={faFeatherPointed} className="w-6 h-6 text-[#7B1123]" />;
      case 'caregiver':
        return <FontAwesomeIcon icon={faHeart} className="w-6 h-6 text-[#7B1123]" />;
      default:
        return <FontAwesomeIcon icon={faCompass} className="w-6 h-6 text-[#7B1123]" />;
    }
  };

  return (
    <section className="py-20 bg-white text-stone-900 border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-sm font-bold tracking-[0.25em] text-stone-900 uppercase font-serif">
            <span className="text-[#7B1123] mr-2">✦</span>
            WHAT IS YOUR ARCHETYPE?
            <span className="text-[#7B1123] ml-2">✦</span>
          </h2>
        </div>

        {/* MAIN LAYOUT: LEFT CALLOUT + RIGHT 5 CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
          
          {/* LEFT SIDE: COPY & TEST CTA */}
          <div className="lg:col-span-4 space-y-6">
            <p className="text-base sm:text-lg text-stone-700 font-sans leading-relaxed">
              Discover the archetype that shapes your personality, motivations and life path.
            </p>
            <div>
              <Link href="/tests/archetype">
                <button className="h-11 px-6 rounded-lg bg-[#7B1123] hover:bg-[#9E1B32] text-white text-sm font-semibold flex items-center gap-2.5 transition-all shadow-md hover:shadow-[#7B1123]/30 cursor-pointer">
                  <FontAwesomeIcon icon={faShieldHalved} className="w-3.5 h-3.5" />
                  <span>Take the Archetype Test</span>
                </button>
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE: 5 ARCHETYPE PREVIEW CARDS */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
              {featuredArchetypes.map((arch) => (
                <div
                  key={arch.id}
                  className="bg-white border border-stone-200 rounded-xl p-4 sm:p-5 text-center flex flex-col items-center justify-between min-h-[160px] hover:border-[#7B1123]/50 shadow-sm transition-all group"
                >
                  <div className="text-[#7B1123] mb-3 group-hover:scale-110 transition-transform">
                    {getArchetypeIcon(arch.id)}
                  </div>
                  
                  <h3 className="font-serif font-bold text-sm sm:text-base text-stone-900 mb-1.5">
                    {arch.name}
                  </h3>

                  <p className="text-[11px] text-stone-500 leading-tight">
                    {arch.tagline}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* BOTTOM LINK */}
        <div className="text-center pt-4">
          <Link
            href="/tests/archetype"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#7B1123] hover:underline"
          >
            <span>Explore all archetypes</span>
            <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
          </Link>
        </div>

      </div>
    </section>
  );
}
