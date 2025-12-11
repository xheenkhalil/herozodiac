'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-8 text-slate-400 font-sans">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 1. BRAND COLUMN */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-maroon-600 to-maroon-900 rounded-lg flex items-center justify-center border border-white/10 group-hover:border-gold-500/50 transition">
                <span className="font-serif font-bold text-white">H</span>
              </div>
              <span className="font-serif font-bold text-xl text-white tracking-tight">
                Hero<span className="text-gold-500">Zodiac</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500">
              Unveiling the hidden mechanics of your destiny through scientific-grade astrology and modern cosmic insights.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-gold-500 hover:text-slate-900 transition border border-white/5"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-gold-500 hover:text-slate-900 transition border border-white/5"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-gold-500 hover:text-slate-900 transition border border-white/5"><Facebook className="w-4 h-4" /></a>
            </div>
          </div>

          {/* 2. FEATURES LINKS */}
          <div>
            <h4 className="text-white font-serif font-bold mb-6">Tools & Features</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/calculator" className="hover:text-gold-400 transition flex items-center gap-2"><ArrowRight className="w-3 h-3 text-maroon-500" /> Natal Chart Calculator</Link></li>
              <li><Link href="/compatibility" className="hover:text-gold-400 transition flex items-center gap-2"><ArrowRight className="w-3 h-3 text-maroon-500" /> Synastry (Love Match)</Link></li>
              <li><Link href="/transits" className="hover:text-gold-400 transition flex items-center gap-2"><ArrowRight className="w-3 h-3 text-maroon-500" /> Daily Transits</Link></li>
              <li><Link href="/blog" className="hover:text-gold-400 transition flex items-center gap-2"><ArrowRight className="w-3 h-3 text-maroon-500" /> Cosmic Blog</Link></li>
            </ul>
          </div>

          {/* 3. LEGAL & COMPANY (Crucial for AdSense) */}
          <div>
            <h4 className="text-white font-serif font-bold mb-6">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact Support</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* 4. NEWSLETTER */}
          <div>
            <h4 className="text-white font-serif font-bold mb-6">Cosmic Inbox</h4>
            <p className="text-sm text-slate-500 mb-4">
              Get your daily horoscope and major transit alerts delivered to your inbox.
            </p>
            <form className="flex flex-col gap-3">
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500 transition"
                />
              </div>
              <button className="w-full bg-white text-slate-900 font-bold text-xs uppercase tracking-widest py-3 rounded-lg hover:bg-gold-400 transition">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-800" />
            <span>Secure SSL Encrypted Connection</span>
          </div>
          
          <div className="text-center md:text-right">
            <p>&copy; {currentYear} HeroZodiac Inc. All rights reserved.</p>
            <p className="mt-1">
              Disclaimer: Astrology is for entertainment and personal growth purposes only.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}