import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ZODIAC_SIGNS_DATA, getZodiacBySlug } from '@/data/zodiac-data';
import { getDailyHoroscopes } from '@/lib/horoscope-engine';
import {
  FontAwesomeIcon,
  faSun,
  faMoon,
  faHeart,
  faArrowRight,
  faStar,
  faCompass
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
  if (!data) return { title: 'Horoscope Not Found | HeroZodiac' };

  return {
    title: `${data.name} Daily Horoscope Today | HeroZodiac`,
    description: `Read today's free horoscope for ${data.name} (${data.dates}). Daily predictions for love, career, money, and personal energy.`,
  };
}

export default async function SignHoroscopePage({ params }: Props) {
  const { sign } = await params;
  const data = getZodiacBySlug(sign);

  if (!data) {
    notFound();
  }

  const allHoroscopes = getDailyHoroscopes();
  const currentPrediction = allHoroscopes.find(h => h.sign.toLowerCase() === data.name.toLowerCase());
  const currentMoon = allHoroscopes[0]?.currentMoon || 'Celestial';

  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-background text-foreground pt-28 pb-24 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-8">
          <Link href="/" className="hover:text-stone-900 transition">Home</Link>
          <span>/</span>
          <Link href="/horoscope" className="hover:text-stone-900 transition">Horoscope</Link>
          <span>/</span>
          <span className="text-[#7B1123] font-semibold">{data.name}</span>
        </nav>

        {/* HERO CARD */}
        <div className="bg-white border border-stone-200 rounded-2xl p-8 sm:p-10 shadow-sm mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-stone-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-[#7B1123] text-white flex items-center justify-center p-3">
                <ZodiacGlyph sign={data.slug} className="w-10 h-10 text-white" strokeWidth={2.4} />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#7B1123]">
                  Daily Guidance • {todayDate}
                </span>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
                  {data.name} Daily Horoscope
                </h1>
              </div>
            </div>

            <Link href={`/zodiac/${data.slug}`}>
              <button className="text-xs font-semibold px-4 py-2 rounded-lg border border-stone-300 hover:bg-stone-100 transition cursor-pointer text-stone-800">
                View Sign Profile →
              </button>
            </Link>
          </div>

          {/* MAIN PREDICTION */}
          <div className="py-8">
            <div className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-[#7B1123]/10 text-[#7B1123] mb-4">
              Focus Area: House {currentPrediction?.house} — {currentPrediction?.theme}
            </div>

            <h2 className="font-serif font-bold text-2xl text-stone-900 mb-4">
              Today&apos;s Cosmic Weather
            </h2>

            <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-sans mb-6">
              {currentPrediction?.prediction || data.horoscopeSnippet}
            </p>

            <p className="text-sm text-stone-600 leading-relaxed font-sans">
              With the transiting Moon activating your {currentPrediction?.house || 1}th house in {currentMoon}, emotional sensitivity shifts toward your immediate environment. Trust your instinctual timing and avoid forcing conclusions before conversations organically unfold.
            </p>
          </div>

          {/* COSMIC SNAPSHOT DETAILS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-stone-200">
            <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 text-center">
              <div className="text-[10px] uppercase font-bold text-stone-400">Current Moon</div>
              <div className="text-sm font-serif font-bold text-stone-900 mt-0.5">{currentMoon}</div>
            </div>
            <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 text-center">
              <div className="text-[10px] uppercase font-bold text-stone-400">Lucky Numbers</div>
              <div className="text-sm font-serif font-bold text-stone-900 mt-0.5">{data.luckyNumbers.slice(0, 3).join(', ')}</div>
            </div>
            <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 text-center">
              <div className="text-[10px] uppercase font-bold text-stone-400">Power Color</div>
              <div className="text-sm font-serif font-bold text-stone-900 mt-0.5">{data.colors[0]}</div>
            </div>
            <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 text-center">
              <div className="text-[10px] uppercase font-bold text-stone-400">Element Tone</div>
              <div className="text-sm font-serif font-bold text-stone-900 mt-0.5">{data.element}</div>
            </div>
          </div>

        </div>

        {/* SWITCH TO OTHER SIGNS */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 mb-12 shadow-sm">
          <h3 className="font-serif font-bold text-base text-stone-900 mb-4">
            Check Another Sign&apos;s Horoscope
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {ZODIAC_SIGNS_DATA.map((s) => (
              <Link
                key={s.slug}
                href={`/horoscope/${s.slug}`}
                className={`p-2.5 rounded-lg border text-center transition-all ${
                  s.slug === data.slug
                    ? 'bg-[#7B1123] text-white border-[#7B1123]'
                    : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-800'
                }`}
              >
                <div className="flex justify-center mb-1">
                  <ZodiacGlyph
                    sign={s.slug}
                    className={`w-6 h-6 ${s.slug === data.slug ? 'text-white' : 'text-[#7B1123]'}`}
                    strokeWidth={2.2}
                  />
                </div>
                <div className="text-xs font-semibold">{s.name}</div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
