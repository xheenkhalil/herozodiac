import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-serif font-bold text-white mb-4">Hero<span className="text-maroon-500">Zodiac</span></h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Merging ancient wisdom with modern technology to help you navigate your destiny.
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-maroon-900 hover:text-white transition"><Twitter className="w-4 h-4"/></a>
              <a href="#" className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-maroon-900 hover:text-white transition"><Instagram className="w-4 h-4"/></a>
              <a href="#" className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-maroon-900 hover:text-white transition"><Facebook className="w-4 h-4"/></a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-white font-bold mb-6">Features</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/calculator" className="hover:text-gold-400 transition">Birth Chart</Link></li>
              <li><Link href="/compatibility" className="hover:text-gold-400 transition">Love Match</Link></li>
              <li><Link href="/palmistry" className="hover:text-gold-400 transition">AI Palm Reading</Link></li>
              <li><Link href="/transits" className="hover:text-gold-400 transition">Daily Transits</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-white font-bold mb-6">Learn</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/blog/signs" className="hover:text-gold-400 transition">Zodiac Signs</Link></li>
              <li><Link href="/blog/houses" className="hover:text-gold-400 transition">The 12 Houses</Link></li>
              <li><Link href="/blog/planets" className="hover:text-gold-400 transition">Planetary Meanings</Link></li>
              <li><Link href="/glossary" className="hover:text-gold-400 transition">Astrology Glossary</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-white font-bold mb-6">Cosmic Inbox</h4>
            <p className="text-slate-500 text-sm mb-4">Get your daily horoscope delivered to you.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter email" 
                className="bg-slate-900 border border-slate-800 rounded-md px-3 py-2 text-sm w-full text-white focus:outline-none focus:border-maroon-600"
              />
              <button className="bg-maroon-700 hover:bg-maroon-600 text-white px-3 py-2 rounded-md transition">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
          <p>&copy; 2025 HeroZodiac Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-slate-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-400">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}