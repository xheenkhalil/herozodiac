import Link from 'next/link';
import { Metadata } from 'next';
import { getDailyHoroscopes } from '@/lib/horoscope-engine';
import { ZODIAC_SIGNS_DATA } from '@/data/zodiac-data';
import { FontAwesomeIcon, faSun, faArrowRight, faStar, faMoon } from '@/components/ui/Icons';
import { ZodiacGlyph } from '@/components/astro/ZodiacGlyph';

export const metadata: Metadata = {
  title: "Today's Free Daily Horoscopes for All 12 Signs | HeroZodiac",
  description: "Read your free daily horoscope powered by real-time planetary transits and lunar positions for Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, and Pisces.",
};

export const revalidate = 3600; // Revalidate every hour

export default function HoroscopeHubPage() {
  const horoscopes = getDailyHoroscopes();
  const currentMoon = horoscopes[0]?.currentMoon || 'Celestial';
  
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pt-28 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#7B1123]/10 text-[#7B1123] text-xs font-semibold mb-4 border border-[#7B1123]/20">
            <FontAwesomeIcon icon={faSun} className="w-3.5 h-3.5" />
            <span>Daily Cosmic Weather • {todayFormatted}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 mb-4">
            Daily Horoscopes
          </h1>

          <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed">
            Real-time astrological guidance calculated from current astronomical sky positions and solar houses. Current Moon is transit in <strong className="text-[#7B1123]">{currentMoon}</strong>.
          </p>
        </div>

        {/* LUNAR TRANSIT HIGHLIGHT CARD */}
        <div className="bg-[#4A0B15] text-white p-6 sm:p-8 rounded-xl border border-[#7B1123] mb-12 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-black/30 border border-white/20 flex items-center justify-center text-white shrink-0">
              <FontAwesomeIcon icon={faMoon} className="w-6 h-6 text-[#E6B0AA]" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-[#E6B0AA] font-bold">Lunar Shift</div>
              <h2 className="font-serif font-bold text-xl text-white">Transiting Moon in {currentMoon}</h2>
              <p className="text-xs text-white/80 mt-1">
                The emotional tone of the collective is shaped by {currentMoon} energy today.
              </p>
            </div>
          </div>
          <Link href="/transits">
            <button className="px-5 py-2.5 rounded-lg bg-white text-[#4A0B15] font-bold text-xs hover:bg-stone-100 transition whitespace-nowrap cursor-pointer">
              View Sky Transits
            </button>
          </Link>
        </div>

        {/* 12 HOROSCOPES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {horoscopes.map((item) => {
            const signData = ZODIAC_SIGNS_DATA.find(z => z.name.toLowerCase() === item.sign.toLowerCase());
            const dates = signData?.dates || '';

            return (
              <div
                key={item.sign}
                className="bg-white border border-stone-200 rounded-xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#7B1123]/50 transition-all shadow-sm hover:shadow-md group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <ZodiacGlyph sign={signData?.slug || item.sign} className="w-9 h-9 text-[#7B1123]" strokeWidth={2.4} />
                      <div>
                        <h3 className="font-serif font-bold text-xl text-stone-900 group-hover:text-[#7B1123] transition-colors">
                          {item.sign}
                        </h3>
                        <span className="text-[11px] text-stone-500">{dates}</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-700">
                      House {item.house}
                    </span>
                  </div>

                  <div className="inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#7B1123]/10 text-[#7B1123] mb-3">
                    Focus: {item.theme}
                  </div>

                  <p className="text-sm text-stone-700 leading-relaxed font-sans mb-6">
                    {item.prediction}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold">
                  <Link
                    href={`/horoscope/${item.sign.toLowerCase()}`}
                    className="text-[#7B1123] hover:underline flex items-center gap-1.5"
                  >
                    <span>Read Full Horoscope</span>
                    <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5" />
                  </Link>

                  <Link
                    href={`/zodiac/${item.sign.toLowerCase()}`}
                    className="text-stone-500 hover:text-stone-900"
                  >
                    Profile
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
