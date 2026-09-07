'use client';

import Link from 'next/link';
import {
  FontAwesomeIcon,
  faSun,
  faBrain,
  faCalculator,
  faHand,
  faBookOpen,
  faHeart,
  faArrowRight
} from '@/components/ui/Icons';

// Planet Orbit Outline Icon for Astrology
const PlanetOrbitIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-6 h-6">
    <circle cx="12" cy="12" r="5" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-25 12 12)" />
  </svg>
);

interface SystemItem {
  title: string;
  desc: string;
  href: string;
  icon: React.ReactNode;
}

export function ExploreSystemsSection() {
  const systems: SystemItem[] = [
    {
      title: 'Astrology',
      desc: 'Dive deeper with natal charts, transits, aspects and more.',
      href: '/calculator',
      icon: <PlanetOrbitIcon />
    },
    {
      title: 'Horoscope',
      desc: 'Get daily, weekly and monthly horoscopes for guidance.',
      href: '/horoscope',
      icon: <FontAwesomeIcon icon={faSun} className="w-5 h-5 text-[#7B1123]" />
    },
    {
      title: 'Personality',
      desc: 'Take the MBTI test and discover your true personality type.',
      href: '/tests/mbti',
      icon: <FontAwesomeIcon icon={faBrain} className="w-5 h-5 text-[#7B1123]" />
    },
    {
      title: 'Numerology',
      desc: 'Reveal the secrets in numbers and your life path.',
      href: '/numerology',
      icon: <FontAwesomeIcon icon={faCalculator} className="w-5 h-5 text-[#7B1123]" />
    },
    {
      title: 'Palmistry',
      desc: 'Learn the art of palm reading and what your hands reveal.',
      href: '/palmistry',
      icon: <FontAwesomeIcon icon={faHand} className="w-5 h-5 text-[#7B1123]" />
    },
    {
      title: 'Tarot',
      desc: 'Draw cards and explore their meanings and insights.',
      href: '/tarot',
      icon: <FontAwesomeIcon icon={faBookOpen} className="w-5 h-5 text-[#7B1123]" />
    },
    {
      title: 'Compatibility',
      desc: 'Check love and friendship compatibility with anyone.',
      href: '/compatibility',
      icon: <FontAwesomeIcon icon={faHeart} className="w-5 h-5 text-[#7B1123]" />
    },
  ];

  return (
    <section className="py-20 bg-white text-stone-900 border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-sm font-bold tracking-[0.25em] text-stone-900 uppercase font-serif">
            <span className="text-[#7B1123] mr-2">✦</span>
            EXPLORE MORE ABOUT YOURSELF
            <span className="text-[#7B1123] ml-2">✦</span>
          </h2>
        </div>

        {/* 7 FEATURE CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
          {systems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="bg-white border border-stone-200 rounded-xl p-5 flex flex-col justify-between hover:border-[#7B1123]/50 transition-all shadow-sm hover:shadow-md hover:-translate-y-1 group"
            >
              <div>
                <div className="text-[#7B1123] mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>

                <h3 className="font-serif font-bold text-base text-stone-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7B1123] group-hover:underline pt-2 border-t border-stone-100">
                <span>Explore</span>
                <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
