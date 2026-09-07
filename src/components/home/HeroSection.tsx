'use client';

import Link from 'next/link';
import { FontAwesomeIcon, faUser } from '@/components/ui/Icons';
import { CelestialWheel } from '@/components/astro/CelestialWheel';

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden pt-28 pb-20 bg-[#070306] text-white">
      {/* BACKGROUND AMBIENCE & COSMIC NEBULA */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Deep red/burgundy nebula gradient */}
        <div 
          className="absolute inset-0 opacity-80"
          style={{
            background: 'radial-gradient(ellipse 75% 65% at 50% 50%, rgba(123, 17, 35, 0.42) 0%, rgba(74, 11, 21, 0.28) 45%, rgba(7, 3, 6, 0.95) 80%, #070306 100%)'
          }}
        />

        {/* Central starburst / lens flare glow - DESKTOP ONLY */}
        <div 
          className="hidden lg:block absolute inset-0 opacity-90"
          style={{
            background: 'radial-gradient(circle at 49% 68%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 210, 220, 0.7) 1.5%, rgba(190, 40, 65, 0.45) 5%, transparent 16%)'
          }}
        />

        {/* Star dust field */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(1px 1px at 25px 35px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 75px 95px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 140px 160px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 230px 85px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 360px 240px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 500px 340px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 680px 140px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 860px 270px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 980px 90px, #ffffff, rgba(0,0,0,0))`,
            backgroundSize: '600px 600px'
          }}
        />

        {/* AUTHENTIC CELESTIAL ASTROLABE ZODIAC WHEEL - DESKTOP FIXED ON RIGHT */}
        <div className="hidden lg:block absolute lg:right-[6%] xl:right-[8%] top-[55%] -translate-y-1/2 lg:w-[460px] lg:h-[460px] xl:w-[490px] xl:h-[490px] max-h-[72vh] pointer-events-none select-none">
          <div className="w-full h-full opacity-85">
            <CelestialWheel className="w-full h-full text-[#D4AF37]" />
          </div>
        </div>
      </div>

      {/* HERO CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-2xl text-left py-6 sm:py-8 lg:py-10">
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-light tracking-wide mb-1">
            Welcome to
          </h2>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-[#A82238] mb-4 sm:mb-5 tracking-tight drop-shadow-sm">
            HeroZodiac
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-stone-300 font-sans leading-relaxed mb-6 sm:mb-8 max-w-xl font-normal">
            Explore yourself through astrology, personality, numerology, archetypes and more.
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link href="/zodiac">
              <button className="h-11 sm:h-12 px-6 sm:px-7 rounded-lg bg-[#7B1123] hover:bg-[#9E1B32] text-white font-medium text-xs sm:text-sm flex items-center gap-2.5 transition-all shadow-lg hover:shadow-[#7B1123]/40 cursor-pointer">
                <FontAwesomeIcon icon={faUser} className="w-3.5 h-3.5 text-white" />
                <span>Explore Now</span>
              </button>
            </Link>

            <Link href="/login">
              <button className="h-11 sm:h-12 px-6 sm:px-7 rounded-lg bg-transparent hover:bg-white/10 text-white font-medium text-xs sm:text-sm border border-stone-400 hover:border-white flex items-center gap-2.5 transition-all cursor-pointer">
                <FontAwesomeIcon icon={faUser} className="w-3.5 h-3.5 text-white" />
                <span>Create Your Profile</span>
              </button>
            </Link>
          </div>

          {/* MOBILE CELESTIAL ASTROLABE WHEEL - CENTERED & PROUDLY DISPLAYED BELOW BUTTONS */}
          <div className="block lg:hidden relative mx-auto mt-8 sm:mt-10 mb-2 w-[270px] h-[270px] sm:w-[320px] sm:h-[320px] select-none pointer-events-none">
            {/* Ambient golden & crimson aura */}
            <div className="absolute inset-[-10%] rounded-full bg-gradient-to-tr from-[#7B1123]/35 via-[#D4AF37]/15 to-transparent blur-2xl pointer-events-none" />
            <div className="relative w-full h-full opacity-90 drop-shadow-2xl">
              <CelestialWheel className="w-full h-full text-[#D4AF37]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

