import Link from 'next/link';
import { Metadata } from 'next';
import {
  FontAwesomeIcon,
  faBrain,
  faShieldHalved,
  faCalculator,
  faArrowRight,
  faStar
} from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Self-Discovery Tests & Personality Assessments | HeroZodiac',
  description: 'Explore psychological and mythic assessments including the 16-Personalities MBTI test, 12 Archetypes test, and Pythagorean Numerology.',
};

export default function TestsHubPage() {
  const tests = [
    {
      title: 'MBTI Personality Test',
      tagline: '16 Personalities Assessment',
      desc: 'Discover your cognitive function preferences across Introversion/Extraversion, Sensing/Intuition, Thinking/Feeling, and Judging/Perceiving.',
      href: '/tests/mbti',
      icon: faBrain,
      time: '5 min'
    },
    {
      title: 'The 12 Archetypes Test',
      tagline: 'Mythic & Psychological Identity',
      desc: 'Identify whether you operate primarily as The Sage, The Hero, The Explorer, The Creator, The Caregiver, or one of the twelve timeless Jungian archetypes.',
      href: '/tests/archetype',
      icon: faShieldHalved,
      time: '5 min'
    },
    {
      title: 'Numerology Life Path',
      tagline: 'Pythagorean Blueprint',
      desc: 'Calculate your Life Path Number, Expression Number, and Soul Urge to reveal the vibrational frequency guiding your life’s destiny.',
      href: '/numerology',
      icon: faCalculator,
      time: '2 min'
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pt-28 pb-24 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#7B1123]/10 text-[#7B1123] text-xs font-bold mb-4 border border-[#7B1123]/20">
            <FontAwesomeIcon icon={faStar} className="w-3 h-3" />
            <span>Self-Discovery Suite</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 mb-4">
            Personality & Archetype Tests
          </h1>

          <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed">
            Gain profound insight into your psychological architecture, subconscious motivations, and relational dynamics through our verified assessments.
          </p>
        </div>

        {/* TESTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {tests.map((test) => (
            <Link
              key={test.title}
              href={test.href}
              className="bg-white border border-stone-200 rounded-xl p-7 flex flex-col justify-between hover:border-[#7B1123]/50 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-lg bg-[#7B1123]/10 flex items-center justify-center text-[#7B1123]">
                    <FontAwesomeIcon icon={test.icon} className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-stone-100 text-stone-600">
                    {test.time}
                  </span>
                </div>

                <div className="text-xs uppercase tracking-wider font-bold text-[#7B1123] mb-1">
                  {test.tagline}
                </div>

                <h2 className="font-serif font-bold text-2xl text-stone-900 mb-3 group-hover:text-[#7B1123] transition-colors">
                  {test.title}
                </h2>

                <p className="text-sm text-stone-600 leading-relaxed font-sans mb-6">
                  {test.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#7B1123]">
                <span>Start Assessment</span>
                <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
