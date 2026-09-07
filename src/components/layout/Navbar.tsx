'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FontAwesomeIcon,
  faCompass,
  faBars,
  faXmark,
  faUser
} from '@/components/ui/Icons';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/', hasDropdown: false },
    { name: 'Horoscope', href: '/horoscope', hasDropdown: false },
    { 
      name: 'Astrology', 
      href: '/zodiac', 
      hasDropdown: true,
      items: [
        { name: '12 Zodiac Signs', href: '/zodiac' },
        { name: 'Natal Birth Chart', href: '/calculator' },
        { name: 'Love Compatibility', href: '/compatibility' },
        { name: 'Planetary Transits', href: '/transits' },
      ]
    },
    { 
      name: 'Tests', 
      href: '/tests', 
      hasDropdown: true,
      items: [
        { name: 'MBTI Personality Test', href: '/tests/mbti' },
        { name: 'Archetype Discovery', href: '/tests/archetype' },
      ]
    },
    { 
      name: 'Guides', 
      href: '/tarot', 
      hasDropdown: true,
      items: [
        { name: 'Tarot Card Readings', href: '/tarot' },
        { name: 'Numerology Calculator', href: '/numerology' },
        { name: 'Palmistry & Hand Analysis', href: '/palmistry' },
      ]
    },
    { 
      name: 'Tools', 
      href: '/calculator', 
      hasDropdown: true,
      items: [
        { name: 'Birth Chart Calculator', href: '/calculator' },
        { name: 'Compatibility Matcher', href: '/compatibility' },
        { name: 'Transit Radar', href: '/transits' },
      ]
    },
    { name: 'Blog', href: '/blog', hasDropdown: false },
  ];

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090507]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-lg'
          : 'bg-[#090507] border-b border-white/5 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#9E1B32]/60 shadow-md relative group-hover:scale-105 transition-transform bg-[#090507] shrink-0">
            <Image
              src="/logo.jpg"
              alt="HeroZodiac Logo"
              width={32}
              height={32}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <span className="font-serif font-bold text-lg sm:text-xl tracking-[0.18em] text-white">
            HEROZODIAC
          </span>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

            return (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`text-[13px] font-medium transition-colors flex items-center gap-1.5 py-1 ${
                    isActive
                      ? 'text-[#D9536F] border-b border-[#D9536F] pb-0.5'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <span className="text-[9px] opacity-70">∨</span>
                  )}
                </Link>

                {/* DROPDOWN MENU */}
                {item.hasDropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-52 py-2 bg-[#140B10] border border-white/10 rounded-lg shadow-xl z-50 animate-fade-in">
                    {item.items?.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="block px-4 py-2 text-xs text-stone-300 hover:text-white hover:bg-[#7B1123]/30 transition"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* RIGHT CTA & MOON ICON */}
        <div className="hidden lg:flex items-center gap-5">
          {/* Moon Icon */}
          <button className="text-stone-300 hover:text-white transition p-1 cursor-pointer" aria-label="Theme">
            <span className="text-sm">☾</span>
          </button>

          {/* Sign In Button */}
          <Link href="/login">
            <button className="bg-[#7B1123] hover:bg-[#9E1B32] text-white px-5 py-2 rounded-lg text-xs sm:text-[13px] font-semibold transition shadow-md cursor-pointer">
              Sign In
            </button>
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="lg:hidden text-stone-200 p-2 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          <FontAwesomeIcon icon={isOpen ? faXmark : faBars} className="w-5 h-5" />
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0B080A] border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-3">
              {navItems.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-medium py-1.5 ${
                    pathname.startsWith(link.href) ? 'text-[#D9536F]' : 'text-stone-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <button className="w-full bg-[#7B1123] hover:bg-[#9E1B32] text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition">
                    Sign In
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
