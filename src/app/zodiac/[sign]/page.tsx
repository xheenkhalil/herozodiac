import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ZODIAC_SIGNS_DATA, getZodiacBySlug } from '@/data/zodiac-data';
import { getDailyHoroscopes } from '@/lib/horoscope-engine';
import {
  FontAwesomeIcon,
  faCompass,
  faHeart,
  faStar,
  faArrowRight,
  faCheck,
  faXmark
} from '@/components/ui/Icons';
import { ZodiacGlyph } from '@/components/astro/ZodiacGlyph';

type Props = {
  params: Promise<{ sign: string }>;
};

export async function generateStaticParams() {
  return ZODIAC_SIGNS_DATA.map((z) => ({
    sign: z.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sign } = await params;
  const data = getZodiacBySlug(sign);
  if (!data) return { title: 'Zodiac Sign Not Found | HeroZodiac' };

  return {
    title: `${data.name} Zodiac Sign: Dates, Personality, Love & Compatibility | HeroZodiac`,
    description: `Complete guide to ${data.name} (${data.dates}). Discover ${data.name} strengths, weaknesses, love compatibility, career paths, and today's horoscope.`,
    openGraph: {
      title: `${data.name} (${data.glyph}) Zodiac Profile & Horoscopes`,
      description: data.tagline,
      type: 'article',
    },
  };
}

export default async function ZodiacProfilePage({ params }: Props) {
  const { sign } = await params;
  const data = getZodiacBySlug(sign);

  if (!data) {
    notFound();
  }

  // Get today's real astrological horoscope prediction for this sign
  let dailyPrediction = data.horoscopeSnippet;
  try {
    const allHoroscopes = getDailyHoroscopes();
    const signHoroscope = allHoroscopes.find(h => h.sign.toLowerCase() === data.name.toLowerCase());
    if (signHoroscope) {
      dailyPrediction = signHoroscope.prediction;
    }
  } catch (e) {
    // Graceful fallback to static snippet
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pt-28 pb-24 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP BREADCRUMB */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-8">
          <Link href="/" className="hover:text-stone-900 transition">Home</Link>
          <span>/</span>
          <Link href="/zodiac" className="hover:text-stone-900 transition">Zodiac</Link>
          <span>/</span>
          <span className="text-[#7B1123] font-semibold">{data.name}</span>
        </nav>

        {/* HERO CARD FOR SIGN */}
        <div className="bg-white border border-stone-200 rounded-2xl p-8 sm:p-12 shadow-sm mb-12 relative overflow-hidden">
          {/* Subtle Ambient Background */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#7B1123]/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
            
            {/* GLYPH BOX */}
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl bg-[#7B1123] text-white flex flex-col items-center justify-center shadow-lg shadow-[#7B1123]/25 shrink-0 p-3">
              <ZodiacGlyph sign={data.slug} className="w-14 h-14 sm:w-16 sm:h-16 text-white" strokeWidth={2.4} />
              <span className="text-xs uppercase tracking-widest mt-2 text-white/90 font-mono">{data.symbol}</span>
            </div>

            {/* HEADER TEXT & ATTRIBUTES */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-stone-100 text-[#7B1123] mb-3">
                {data.dates}
              </div>

              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 mb-2">
                {data.name}
              </h1>

              <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed mb-6">
                {data.tagline}
              </p>

              {/* QUICK STATS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-center">
                  <div className="text-[10px] uppercase font-bold text-stone-400">Element</div>
                  <div className="text-sm font-serif font-bold text-stone-900 mt-0.5">{data.element}</div>
                </div>
                <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-center">
                  <div className="text-[10px] uppercase font-bold text-stone-400">Modality</div>
                  <div className="text-sm font-serif font-bold text-stone-900 mt-0.5">{data.modality}</div>
                </div>
                <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-center">
                  <div className="text-[10px] uppercase font-bold text-stone-400">Ruling Planet</div>
                  <div className="text-sm font-serif font-bold text-stone-900 mt-0.5">{data.rulingPlanet}</div>
                </div>
                <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-center">
                  <div className="text-[10px] uppercase font-bold text-stone-400">Ruling House</div>
                  <div className="text-sm font-serif font-bold text-stone-900 mt-0.5">{data.house.split(' ')[0]} House</div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* TODAY'S HOROSCOPE BANNER FOR THIS SIGN */}
        <div className="bg-[#4A0B15] text-white p-6 sm:p-8 rounded-xl border border-[#7B1123] mb-12 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E6B0AA] flex items-center gap-2">
              <FontAwesomeIcon icon={faStar} className="w-3 h-3 text-[#E6B0AA]" />
              <span>Today&apos;s Horoscope for {data.name}</span>
            </span>
            <Link href="/horoscope" className="text-xs text-white/80 hover:text-white underline">
              All Horoscopes →
            </Link>
          </div>
          <p className="text-base sm:text-lg leading-relaxed text-white font-sans font-light">
            &ldquo;{dailyPrediction}&rdquo;
          </p>
        </div>

        {/* SECTION 1: IN-DEPTH PERSONALITY & OVERVIEW */}
        <section className="mb-14">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-6 border-b border-stone-200 pb-3">
            The {data.name} Personality
          </h2>
          <div className="max-w-none text-stone-700 leading-relaxed space-y-4 text-base">
            <p>{data.overview}</p>
            <p>{data.personality}</p>
          </div>
        </section>

        {/* SECTION 2: STRENGTHS & WEAKNESSES GRID */}
        <section className="mb-14">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-6 border-b border-stone-200 pb-3">
            Strengths & Challenges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* STRENGTHS */}
            <div className="p-6 rounded-xl bg-emerald-50/70 border border-emerald-200">
              <h3 className="font-serif font-bold text-lg text-emerald-900 mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faCheck} className="w-4 h-4 text-emerald-600" />
                <span>Greatest Strengths</span>
              </h3>
              <ul className="space-y-2.5 text-sm text-stone-700">
                {data.strengths.map((s) => (
                  <li key={s} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* WEAKNESSES */}
            <div className="p-6 rounded-xl bg-rose-50/70 border border-rose-200">
              <h3 className="font-serif font-bold text-lg text-rose-900 mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faXmark} className="w-4 h-4 text-rose-600" />
                <span>Growth Challenges</span>
              </h3>
              <ul className="space-y-2.5 text-sm text-stone-700">
                {data.weaknesses.map((w) => (
                  <li key={w} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-2 shrink-0" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </section>

        {/* SECTION 3: LOVE, FRIENDSHIP & CAREER */}
        <section className="mb-14 space-y-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-4 border-b border-stone-200 pb-3">
              Love & Romantic Relationships
            </h2>
            <p className="text-base text-stone-700 leading-relaxed font-sans">
              {data.love}
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-4 border-b border-stone-200 pb-3">
              Friendship & Social Dynamics
            </h2>
            <p className="text-base text-stone-700 leading-relaxed font-sans">
              {data.friendship}
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-4 border-b border-stone-200 pb-3">
              Career, Purpose & Wealth
            </h2>
            <p className="text-base text-stone-700 leading-relaxed font-sans">
              {data.career}
            </p>
          </div>
        </section>

        {/* SECTION 4: COMPATIBILITY MATRIX */}
        <section className="mb-14">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-6 border-b border-stone-200 pb-3">
            Compatibility Profile
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-6 rounded-xl bg-white border border-stone-200 shadow-sm">
              <h3 className="font-serif font-bold text-base text-stone-900 mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faHeart} className="w-4 h-4 text-[#7B1123]" />
                <span>Most Compatible Signs</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.compatibilityBest.map((c) => (
                  <Link
                    key={c}
                    href={`/zodiac/${c.toLowerCase()}`}
                    className="px-4 py-2 rounded-lg bg-stone-100 hover:bg-[#7B1123] hover:text-white transition-all text-xs font-semibold text-stone-800"
                  >
                    {c}
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white border border-stone-200 shadow-sm">
              <h3 className="font-serif font-bold text-base text-stone-900 mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faCompass} className="w-4 h-4 text-stone-500" />
                <span>Karmic & Challenging Pairs</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.compatibilityChallenging.map((c) => (
                  <Link
                    key={c}
                    href={`/zodiac/${c.toLowerCase()}`}
                    className="px-4 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 transition-all text-xs font-semibold text-stone-700"
                  >
                    {c}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 5: ACTIONABLE TOOLS CALLOUT */}
        <section className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif font-bold text-xl text-stone-900 mb-1">
              Want deeper insights into your sky?
            </h3>
            <p className="text-sm text-stone-600 font-sans">
              Calculate your exact natal chart, houses, and planetary aspects with our astronomical tool.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/calculator">
              <button className="px-6 py-2.5 rounded-lg bg-[#7B1123] hover:bg-[#9E1B32] text-white text-xs font-semibold flex items-center gap-2 shadow transition cursor-pointer">
                <span>Calculate Birth Chart</span>
                <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
              </button>
            </Link>
            <Link href="/compatibility">
              <button className="px-6 py-2.5 rounded-lg border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-semibold transition cursor-pointer">
                Check Synastry Match
              </button>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
