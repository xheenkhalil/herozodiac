'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  FontAwesomeIcon,
  faCompass,
  faFacebook,
  faInstagram,
  faYoutube,
  faPinterest
} from '@/components/ui/Icons';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050508] border-t border-white/10 pt-16 pb-12 text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP ROW: 5 COLUMNS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          
          {/* BRAND COLUMN (2 Cols on large screens) */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#9E1B32]/60 shadow-md relative group-hover:scale-105 transition-transform bg-[#090507] shrink-0">
                <Image
                  src="/logo.jpg"
                  alt="HeroZodiac Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-serif font-bold text-xl tracking-wider text-white">
                HERO<span className="text-[#9E1B32]">ZODIAC</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Explore yourself. Understand yourself. Discover more through astrology, archetypes, numerology, palmistry, and Tarot.
            </p>
            
            {/* SOCIAL ICONS */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#7B1123]/40 hover:border-[#7B1123] transition"
              >
                <FontAwesomeIcon icon={faFacebook} className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#7B1123]/40 hover:border-[#7B1123] transition"
              >
                <FontAwesomeIcon icon={faInstagram} className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#7B1123]/40 hover:border-[#7B1123] transition"
              >
                <FontAwesomeIcon icon={faYoutube} className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#7B1123]/40 hover:border-[#7B1123] transition"
              >
                <FontAwesomeIcon icon={faPinterest} className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 1. EXPLORE */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Explore</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/astrology" className="hover:text-white transition">Astrology</Link></li>
              <li><Link href="/horoscope" className="hover:text-white transition">Horoscope</Link></li>
              <li><Link href="/numerology" className="hover:text-white transition">Numerology</Link></li>
              <li><Link href="/tests/mbti" className="hover:text-white transition">MBTI Test</Link></li>
              <li><Link href="/tests/archetype" className="hover:text-white transition">Archetypes</Link></li>
              <li><Link href="/palmistry" className="hover:text-white transition">Palmistry</Link></li>
              <li><Link href="/tarot" className="hover:text-white transition">Tarot</Link></li>
              <li><Link href="/compatibility" className="hover:text-white transition">Compatibility</Link></li>
            </ul>
          </div>

          {/* 2. RESOURCES */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
              <li><Link href="/zodiac" className="hover:text-white transition">Guides</Link></li>
              <li><Link href="/zodiac" className="hover:text-white transition">Zodiac Signs</Link></li>
              <li><Link href="/tarot" className="hover:text-white transition">Tarot Cards</Link></li>
              <li><Link href="/palmistry" className="hover:text-white transition">Palm Reading</Link></li>
              <li><Link href="/about" className="hover:text-white transition">Glossary</Link></li>
            </ul>
          </div>

          {/* 3. TOOLS */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Tools</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/calculator" className="hover:text-white transition">Natal Chart Calculator</Link></li>
              <li><Link href="/compatibility" className="hover:text-white transition">Love Compatibility</Link></li>
              <li><Link href="/horoscope" className="hover:text-white transition">Daily Horoscope</Link></li>
              <li><Link href="/palmistry" className="hover:text-white transition">Palm Reading Guide</Link></li>
              <li><Link href="/numerology" className="hover:text-white transition">Numerology Calculator</Link></li>
              <li><Link href="/tarot" className="hover:text-white transition">Tarot Reading</Link></li>
            </ul>
          </div>

          {/* 4. COMPANY & LEGAL */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/about" className="hover:text-white transition">Our Mission</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Careers</Link></li>
            </ul>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white pt-3">Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Disclaimer</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition">Cookie Policy</Link></li>
            </ul>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} HeroZodiac. All rights reserved.</p>
          <p className="text-center md:text-right max-w-lg text-[11px] text-slate-600">
            Astrology, Tarot, numerology, and archetype assessments are designed for personal growth, self-reflection, and entertainment.
          </p>
        </div>

      </div>
    </footer>
  );
}