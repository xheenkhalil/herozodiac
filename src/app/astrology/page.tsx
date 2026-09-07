import Link from 'next/link';
import { Metadata } from 'next';
import {
  FontAwesomeIcon,
  faCompass,
  faHeart,
  faSun,
  faStar,
  faArrowRight
} from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Astrology Hub & Astronomical Calculators | HeroZodiac',
  description: 'Explore scientific-grade natal charts, synastry love compatibility, transit trackers, and traditional astrological planetary systems.',
};

export default function AstrologyHubPage() {
  const tools = [
    {
      title: 'Natal Chart Calculator',
      desc: 'Calculate your exact planetary positions, houses, and aspects using accurate ephemerides and Placidus cusps.',
      href: '/calculator',
      badge: 'Scientific Precision',
      icon: faCompass
    },
    {
      title: 'Synastry Compatibility',
      desc: 'Compare two birth charts to evaluate emotional safety, sexual chemistry, communication, and long-term soul connection.',
      href: '/compatibility',
      badge: 'Love Synastry',
      icon: faHeart
    },
    {
      title: 'Daily Sky Transits',
      desc: 'Track current planetary positions, retrograde planets, moon phases, and real-time cosmic weather.',
      href: '/transits',
      badge: 'Live Ephemeris',
      icon: faSun
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pt-28 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#7B1123]/10 text-[#7B1123] text-xs font-bold mb-4 border border-[#7B1123]/20">
            <FontAwesomeIcon icon={faStar} className="w-3 h-3" />
            <span>HeroZodiac Astrology Platform</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 mb-4">
            Astrology Systems
          </h1>

          <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed">
            Astrology is the timeless study of geometric relationships between celestial bodies and psychological consciousness. Explore our suite of calculators and astrological guides.
          </p>
        </div>

        {/* PRIMARY ASTROLOGY TOOLS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {tools.map((t) => (
            <Link
              key={t.title}
              href={t.href}
              className="bg-white border border-stone-200 rounded-xl p-8 flex flex-col justify-between hover:border-[#7B1123]/50 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-lg bg-[#7B1123]/10 flex items-center justify-center text-[#7B1123]">
                    <FontAwesomeIcon icon={t.icon} className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-stone-100 text-stone-600">
                    {t.badge}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-2xl text-stone-900 mb-3 group-hover:text-[#7B1123] transition-colors">
                  {t.title}
                </h3>

                <p className="text-sm text-stone-600 leading-relaxed font-sans mb-6">
                  {t.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#7B1123]">
                <span>Launch Tool</span>
                <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* CORE CONCEPTS EXPLAINER */}
        <div className="bg-white border border-stone-200 rounded-2xl p-8 sm:p-12 mb-12 shadow-sm">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 mb-6">
            The Three Pillars of Your Birth Chart
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-lg text-[#7B1123]">
                1. The Sun (Core Identity)
              </h3>
              <p className="text-stone-600 leading-relaxed font-sans">
                Your conscious will, ego, vitality, and fundamental life purpose. The Sun sign reveals the hero’s journey you are here to undertake.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif font-bold text-lg text-[#7B1123]">
                2. The Moon (Inner Soul)
              </h3>
              <p className="text-stone-600 leading-relaxed font-sans">
                Your instinctual emotional reactions, subconscious memory, vulnerability, and what makes you feel safe behind closed doors.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif font-bold text-lg text-[#7B1123]">
                3. The Ascendant (Rising Sign)
              </h3>
              <p className="text-stone-600 leading-relaxed font-sans">
                The eastern horizon sign at your exact minute of birth. It defines your physical vessel, outward persona, and the lens through which you meet the world.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
