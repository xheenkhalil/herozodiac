'use client';

import Link from 'next/link';
import { FontAwesomeIcon, faUser } from '@/components/ui/Icons';

export function FinalCTASection() {
  return (
    <section className="relative py-24 bg-[#4A0B15] text-white overflow-hidden border-t border-[#7B1123]">
      {/* CELESTIAL BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-20">
        
        {/* Left Wheel Artwork */}
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-80 h-80">
          <svg viewBox="0 0 200 200" className="w-full h-full text-white">
            <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="100" cy="100" r="75" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="1" />
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1={100 + 50 * Math.cos((i * 30 * Math.PI) / 180)}
                y1={100 + 50 * Math.sin((i * 30 * Math.PI) / 180)}
                x2={100 + 75 * Math.cos((i * 30 * Math.PI) / 180)}
                y2={100 + 75 * Math.sin((i * 30 * Math.PI) / 180)}
                stroke="currentColor"
                strokeWidth="1"
              />
            ))}
          </svg>
        </div>

        {/* Right Crescent Moon & Stars Artwork */}
        <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-80 h-80">
          <svg viewBox="0 0 200 200" className="w-full h-full text-white">
            <path
              d="M 120 40 A 60 60 0 1 0 120 160 A 45 45 0 0 1 120 40 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="60" cy="60" r="1.5" fill="currentColor" />
            <circle cx="80" cy="40" r="2" fill="currentColor" />
            <circle cx="140" cy="140" r="1.5" fill="currentColor" />
            <circle cx="50" cy="120" r="2" fill="currentColor" />
            <line x1="60" y1="60" x2="80" y2="40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 2" />
          </svg>
        </div>

      </div>

      {/* CALLOUT CONTENT */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4 tracking-tight">
          Ready to Discover More About Yourself?
        </h2>

        <p className="text-sm sm:text-base text-white/80 font-sans max-w-xl mx-auto mb-8 font-light">
          Your journey of self-discovery starts with a single step.
        </p>

        <div>
          <Link href="/login">
            <button className="h-12 px-8 rounded-lg bg-white text-[#4A0B15] hover:bg-stone-100 font-bold text-sm tracking-wide inline-flex items-center gap-2.5 transition-all shadow-xl cursor-pointer">
              <FontAwesomeIcon icon={faUser} className="w-3.5 h-3.5 text-[#4A0B15]" />
              <span>Create Your HeroZodiac Profile</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
