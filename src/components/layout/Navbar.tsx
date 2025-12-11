'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Calculator', href: '/calculator' },
    { name: 'Blog', href: '/blog' },
    // Placeholder for Categories Dropdown later
    { name: 'About', href: '/about' }, 
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/10 py-5' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* 1. LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-maroon-600 to-maroon-900 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-gold-500/50 transition shadow-lg shadow-maroon-900/20">
            <span className="font-serif font-bold text-white text-lg">H</span>
          </div>
          <span className="font-serif font-bold text-2xl text-white tracking-tight">
            Hero<span className="text-gold-500">Zodiac</span>
          </span>
        </Link>

        {/* 2. DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`text-base font-medium transition-colors hover:text-gold-400 ${
                pathname === link.href ? 'text-white' : 'text-slate-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* 3. CTA BUTTON */}
        <div className="hidden md:block">
          <Link href="/calculator">
            <button className="bg-white text-slate-950 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-gold-400 transition flex items-center gap-2 shadow-lg hover:shadow-gold-500/20">
              <Sparkles className="w-4 h-4" /> Get Chart
            </button>
          </Link>
        </div>

        {/* 4. MOBILE MENU TOGGLE */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950 border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-serif text-slate-300 hover:text-gold-400"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-white/10 my-4" />
              <Link href="/contact" onClick={() => setIsOpen(false)} className="text-sm text-slate-500">Contact Support</Link>
              <Link href="/privacy" onClick={() => setIsOpen(false)} className="text-sm text-slate-500">Privacy Policy</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}